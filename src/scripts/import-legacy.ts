/**
 * One-time migration of ASK's old website content into the CMS. Everything comes from files in this project,
 * copied from the old asktek.net website manager, so no internet access or browser is needed:
 *
 *   1. client logos and case-study images      public/cms/partner, public/cms/case-study  → media library
 *   2. product screens                          public/images/…                            → media library
 *   3. customer testimonials (with logos)       src/content/testimonials.ts                → Testimonials
 *   4. product brochures (PDF)                  public/brochures                           → Documents
 *   5. the 60 old articles, with their old IDs  src/content/legacyArticles.json            → Blog → Articles
 *      (so old /blog-details?id=… links redirect to the new article pages)
 *
 * Run after `npm run seed`:
 *   npm run import:legacy
 *
 * Re-running skips anything already imported. Review imported articles in CMS → Blog → Articles.
 */
import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { JSDOM } from "jsdom";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { legacyCategoryMap } from "../content/posts";
import { legacyTestimonials, legacyBrochures } from "../content/testimonials";
import legacyArticles from "../content/legacyArticles.json";
import { slugify } from "../lib/format";

const LEGACY = (process.env.LEGACY_ORIGIN || "https://asktek.net").replace(/\/$/, "");
const PUBLIC = path.resolve(process.cwd(), "public");
const payload: Payload = await getPayload({ config });
// A fresh object per call: the storage plugin writes flags into req.context, and a shared object makes later uploads skip storage.
const ctx = () => ({ disableRevalidate: true });
const editorConfig = await editorConfigFactory.default({ config: payload.config });

/* ── Files: read from /public when present, otherwise from the old site ── */

const MIME: Record<string, string> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", jfif: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", svg: "image/svg+xml", pdf: "application/pdf",
};

const legacyUrl = (p: string) => {
  const m1 = p.match(/^\/cms\/partner\/(.+)$/);
  if (m1) return `${LEGACY}/api/partner-image?logoName=${encodeURIComponent(m1[1])}`;
  const m2 = p.match(/^\/cms\/case-study\/(.+)$/);
  if (m2) return `${LEGACY}/api/case-study-image?BlogFileName=${encodeURIComponent(m2[1])}`;
  return p.startsWith("http") ? p : `${LEGACY}${p}`;
};

async function readFile(p: string): Promise<{ data: Buffer; mimetype: string; ext: string }> {
  const local = p.startsWith("/") ? path.join(PUBLIC, decodeURIComponent(p)) : "";
  if (local && local.startsWith(PUBLIC) && fs.existsSync(local)) {
    const ext = path.extname(local).slice(1).toLowerCase();
    return { data: fs.readFileSync(local), mimetype: MIME[ext] || "application/octet-stream", ext: ext === "jfif" ? "jpg" : ext };
  }
  const url = legacyUrl(p);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const mimetype = (res.headers.get("content-type") || "").split(";")[0];
  if (!mimetype.startsWith("image/")) throw new Error(`Not an image: ${url}`);
  return { data: Buffer.from(await res.arrayBuffer()), mimetype, ext: mimetype.split("/")[1].replace("jpeg", "jpg") };
}

async function upload(collection: "media" | "documents", p: string, name: string, data: Record<string, unknown>) {
  const f = await readFile(p);
  // Unique file name per source file. With cloud storage, two uploads with the same name overwrite each other's file.
  const tag = createHash("md5").update(p).digest("hex").slice(0, 6);
  const doc = await payload.create({
    collection,
    data: data as never,
    file: { data: f.data, mimetype: f.mimetype, name: `${slugify(name).slice(0, 56) || "file"}-${tag}.${f.ext}`, size: f.data.length },
    overrideAccess: true,
    context: ctx(),
  });
  return doc.id;
}
const uploadImage = (p: string, alt: string) => upload("media", p, alt, { alt });

/* ── 1–2. Images on existing documents ── */

async function migrateImages(collection: string, pathField: string, imageField: string, altOf: (d: Record<string, unknown>) => string) {
  const { docs } = await payload.find({ collection: collection as never, limit: 500, pagination: false, overrideAccess: true, depth: 0 });
  for (const d of docs as Record<string, unknown>[]) {
    const p = d[pathField] as string | undefined;
    if (!p || d[imageField] || p.startsWith("/images/")) continue;
    try {
      const id = await uploadImage(p, altOf(d));
      await payload.update({ collection: collection as never, id: d.id as string, data: { [imageField]: id, _status: "published" } as never, overrideAccess: true, context: ctx() });
      console.log(`  ✓ ${collection}: ${altOf(d)}`);
    } catch (e) {
      console.warn(`  ✗ ${collection}: ${altOf(d)} (${(e as Error).message})`);
    }
  }
}

console.log("Images");
await migrateImages("products", "imagePath", "image", (d) => `${d.name} screen`);
await migrateImages("clients", "logoPath", "logo", (d) => `${d.name} logo`);
await migrateImages("case-studies", "imagePath", "image", (d) => `${d.client}`);

/* ── 3. Testimonials ── */

console.log("Testimonials");
const products = await payload.find({ collection: "products", limit: 100, overrideAccess: true, depth: 0, draft: true });
const productId = (slug: string) => products.docs.find((p) => (p as { slug?: string }).slug === slug)?.id;

for (const [i, t] of legacyTestimonials.entries()) {
  const exists = await payload.find({ collection: "testimonials", where: { and: [{ name: { equals: t.name } }, { company: { equals: t.company } }] }, limit: 1, overrideAccess: true, draft: true });
  if (exists.docs.length) {
    console.log(`  • skip ${t.company} (already imported)`);
    continue;
  }
  try {
    let photo: string | number | undefined;
    try { photo = await uploadImage(t.logo, `${t.company} logo`); } catch { /* quote without logo */ }
    await payload.create({
      collection: "testimonials",
      overrideAccess: true,
      context: ctx(),
      draft: !!t.draft,
      data: {
        quote: t.quote, name: t.name, role: t.role, company: t.company, photo,
        products: t.products.map(productId).filter(Boolean), showOnHome: t.showOnHome, order: (i + 1) * 10,
        _status: t.draft ? "draft" : "published",
      } as never,
    });
    console.log(`  ✓ ${t.company}${t.draft ? " (draft, for ASK to confirm)" : ""}`);
  } catch (e) {
    console.warn(`  ✗ ${t.company} (${(e as Error).message})`);
  }
}

/* ── 4. Brochures ── */

console.log("Brochures");
for (const b of legacyBrochures) {
  const exists = await payload.find({ collection: "documents", where: { title: { equals: b.title } }, limit: 1, overrideAccess: true });
  if (exists.docs.length) {
    console.log(`  • skip ${b.title}`);
    continue;
  }
  try {
    await upload("documents", b.file, b.title, { title: b.title });
    console.log(`  ✓ ${b.title}`);
  } catch (e) {
    console.warn(`  ✗ ${b.title} (${(e as Error).message})`);
  }
}

/* ── 5. Articles ── */

console.log("Articles");
const cats = await payload.find({ collection: "categories", limit: 50, overrideAccess: true });
const catId = (name: string) => cats.docs.find((c) => (c as { slug?: string }).slug === (legacyCategoryMap[name] || "apparel-erp"))?.id;

type LegacyArticle = { legacyId: number | null; blogId: number; title: string; date: string; category: string; summary: string; image: string; html: string };

for (const a of legacyArticles as LegacyArticle[]) {
  if (a.legacyId !== null) {
    const exists = await payload.find({ collection: "posts", where: { legacyId: { equals: a.legacyId } }, limit: 1, overrideAccess: true, draft: true });
    if (exists.docs.length) {
      console.log(`  • skip ${a.legacyId} (already imported)`);
      continue;
    }
  }
  try {
    const doc = new JSDOM(`<body>${a.html}</body>`).window.document;
    doc.querySelectorAll("script, style, iframe, form, button, nav, header, footer, svg").forEach((n: Element) => n.remove());

    // Images inside the article: upload each one, then point the <img> at the media document.
    for (const img of Array.from(doc.querySelectorAll("img")) as HTMLImageElement[]) {
      const src = img.getAttribute("src") || "";
      try {
        if (!src.startsWith("/cms/")) throw new Error("external");
        const id = await uploadImage(src, img.getAttribute("alt") || a.title);
        for (const attr of Array.from(img.attributes)) img.removeAttribute(attr.name);
        img.setAttribute("data-lexical-upload-relation-to", "media");
        img.setAttribute("data-lexical-upload-id", String(id));
      } catch {
        img.remove();
      }
    }
    // Keep only simple, accessible markup.
    doc.querySelectorAll("*").forEach((el: Element) => {
      for (const attr of Array.from(el.attributes) as Attr[]) {
        const keep = (el.tagName === "A" && attr.name === "href") || (el.tagName === "IMG" && attr.name.startsWith("data-lexical-upload-"));
        if (!keep) el.removeAttribute(attr.name);
      }
    });
    doc.querySelectorAll("h1").forEach((h: Element) => { const h2 = doc.createElement("h2"); h2.innerHTML = h.innerHTML; h.replaceWith(h2); });
    // Empty paragraphs from the old editor.
    doc.querySelectorAll("p").forEach((p: Element) => { if (!(p.textContent || "").trim() && !p.querySelector("img")) p.remove(); });

    const firstP = (Array.from(doc.querySelectorAll("p")) as Element[]).map((p) => (p.textContent || "").replace(/\s+/g, " ").trim()).find((t) => t.length > 60) || a.title;
    const excerpt = firstP.length > 200 ? firstP.slice(0, 197).replace(/\s+\S*$/, "") + "…" : firstP;
    const body = convertHTMLToLexical({ editorConfig, html: doc.body.innerHTML, JSDOM });
    // HTML attributes are strings; upload nodes need the media ID in the database's own type (number on Postgres).
    const fixUploads = (n: { type?: string; value?: unknown; children?: unknown[] }) => {
      if (n.type === "upload" && typeof n.value === "string" && /^\d+$/.test(n.value)) n.value = Number(n.value);
      (n.children as (typeof n)[] | undefined)?.forEach(fixUploads);
    };
    fixUploads(body.root as never);

    let image: string | number | undefined;
    if (a.image) {
      try { image = await uploadImage(a.image, a.title); } catch { /* no cover */ }
    }

    await payload.create({
      collection: "posts",
      overrideAccess: true,
      context: ctx(),
      data: {
        title: a.title, slug: slugify(a.title), excerpt, body, image, legacyId: a.legacyId ?? undefined, date: a.date, author: "ASK Technology",
        category: catId(a.category), _status: "published",
      } as never,
    });
    console.log(`  ✓ ${a.legacyId} ${a.title}`);
  } catch (e) {
    console.warn(`  ✗ ${a.legacyId} ${a.title} (${(e as Error).message})`);
  }
}

console.log("Done. Review the imported articles in CMS → Blog → Articles, and the draft testimonials in CMS → Customers → Testimonials.");
process.exit(0);
