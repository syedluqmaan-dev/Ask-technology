/**
 * One-time migration from the old asktek.net:
 *   1. downloads product screens, client logos and case-study images into the CMS media library
 *   2. opens each old article (/blog-details?id=…) in a headless browser, extracts the text and cover image,
 *      and creates it as a published article with its old ID (so old links redirect to the new address)
 *
 * Run on your own computer (needs internet), after `npm run seed`:
 *   npx playwright install chromium
 *   npm run import:legacy
 *
 * Re-running skips anything already imported. Review imported articles in CMS → Blog → Articles.
 */
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { JSDOM } from "jsdom";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { legacyPosts, legacyCategoryMap } from "../content/posts";
import { slugify } from "../lib/format";

const LEGACY = (process.env.LEGACY_ORIGIN || "https://asktek.net").replace(/\/$/, "");
const payload: Payload = await getPayload({ config });
const context = { disableRevalidate: true };
const editorConfig = await editorConfigFactory.default({ config: payload.config });

/* ── 1. Images ── */

const legacyUrl = (path: string) => {
  const m1 = path.match(/^\/cms\/partner\/(.+)$/);
  if (m1) return `${LEGACY}/api/partner-image?logoName=${encodeURIComponent(m1[1])}`;
  const m2 = path.match(/^\/cms\/case-study\/(.+)$/);
  if (m2) return `${LEGACY}/api/case-study-image?BlogFileName=${encodeURIComponent(m2[1])}`;
  return path.startsWith("http") ? path : `${LEGACY}${path}`;
};

async function uploadFromUrl(url: string, alt: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const type = res.headers.get("content-type") || "image/png";
  if (!type.startsWith("image/")) throw new Error(`Not an image: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = type.split("/")[1].replace("jpeg", "jpg").split(";")[0];
  const name = `${slugify(alt).slice(0, 60) || "image"}.${ext}`;
  const doc = await payload.create({ collection: "media", data: { alt } as never, file: { data: buf, mimetype: type, name, size: buf.length }, overrideAccess: true, context });
  return doc.id;
}

async function migrateImages(collection: string, pathField: string, imageField: string, altOf: (d: Record<string, unknown>) => string) {
  const { docs } = await payload.find({ collection: collection as never, limit: 500, pagination: false, overrideAccess: true, depth: 0 });
  for (const d of docs as Record<string, unknown>[]) {
    const path = d[pathField] as string | undefined;
    if (!path || d[imageField] || path.startsWith("/images/")) continue;
    try {
      const id = await uploadFromUrl(legacyUrl(path), altOf(d));
      await payload.update({ collection: collection as never, id: d.id as string, data: { [imageField]: id, _status: "published" } as never, overrideAccess: true, context });
      console.log(`  ✓ ${collection}: ${altOf(d)}`);
    } catch (e) {
      console.warn(`  ✗ ${collection}: ${altOf(d)} (${(e as Error).message})`);
    }
  }
}

console.log("Images from the old site");
await migrateImages("products", "imagePath", "image", (d) => `${d.name} screen`);
await migrateImages("clients", "logoPath", "logo", (d) => `${d.name} logo`);
await migrateImages("case-studies", "imagePath", "image", (d) => `${d.client}`);

/* ── 2. Articles ── */

console.log("Articles from the old site");
let chromium: typeof import("playwright").chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is not installed. Run: npx playwright install chromium");
  process.exit(1);
}

const cats = await payload.find({ collection: "categories", limit: 50, overrideAccess: true });
const catId = (name: string) => cats.docs.find((c) => (c as { slug?: string }).slug === (legacyCategoryMap[name] || "apparel-erp"))?.id;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const lp of legacyPosts) {
  const exists = await payload.find({ collection: "posts", where: { legacyId: { equals: lp.id } }, limit: 1, overrideAccess: true, draft: true });
  if (exists.docs.length) {
    console.log(`  • skip ${lp.id} (already imported)`);
    continue;
  }
  try {
    await page.goto(`${LEGACY}/blog-details?id=${lp.id}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    // Pick the element with the most paragraph text: that is the article body.
    const result = await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll("article, main, section, div"));
      let best: Element | null = null;
      let bestScore = 0;
      for (const el of candidates) {
        const ps = Array.from(el.querySelectorAll(":scope > p, :scope > div > p, :scope > h2, :scope > h3, :scope > ul"));
        const score = ps.reduce((n, p) => n + (p.textContent || "").trim().length, 0);
        if (score > bestScore) { best = el; bestScore = score; }
      }
      if (!best) return null;
      const clone = best.cloneNode(true) as Element;
      clone.querySelectorAll("script, style, iframe, form, button, nav, header, footer, svg").forEach((n) => n.remove());
      const img = best.querySelector("img") || document.querySelector("main img, article img");
      clone.querySelectorAll("img").forEach((n) => n.remove());
      return { html: clone.innerHTML, img: img ? (img as HTMLImageElement).src : "" };
    });
    if (!result || result.html.replace(/<[^>]+>/g, "").trim().length < 300) throw new Error("article text not found");

    const dom = new JSDOM(`<body>${result.html}</body>`);
    const doc = dom.window.document;
    // Keep only simple, accessible markup.
    doc.querySelectorAll("*").forEach((el: Element) => {
      for (const a of Array.from(el.attributes) as Attr[]) if (!(el.tagName === "A" && a.name === "href")) el.removeAttribute(a.name);
    });
    doc.querySelectorAll("h1").forEach((h: Element) => { const h2 = doc.createElement("h2"); h2.innerHTML = h.innerHTML; h.replaceWith(h2); });
    const firstP = (Array.from(doc.querySelectorAll("p")) as Element[]).map((p) => (p.textContent || "").trim()).find((t) => t.length > 60) || lp.title;
    const excerpt = firstP.length > 200 ? firstP.slice(0, 197).replace(/\s+\S*$/, "") + "…" : firstP;
    const body = convertHTMLToLexical({ editorConfig, html: doc.body.innerHTML, JSDOM });

    let image: string | number | undefined;
    if (result.img && !result.img.startsWith("data:")) {
      try { image = await uploadFromUrl(result.img, lp.title); } catch { /* no cover */ }
    }

    const title = lp.title.trim();
    await payload.create({
      collection: "posts",
      overrideAccess: true,
      context,
      data: {
        title, slug: slugify(title), excerpt, body, image, legacyId: lp.id, date: lp.date, author: "ASK Technology",
        category: catId(lp.category), _status: "published",
      } as never,
    });
    console.log(`  ✓ ${lp.id} ${title}`);
  } catch (e) {
    console.warn(`  ✗ ${lp.id} ${lp.title} (${(e as Error).message})`);
  }
}

await browser.close();
console.log("Done. Review the imported articles in CMS → Blog → Articles and check each one reads well.");
process.exit(0);
