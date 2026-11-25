import "server-only";
import {
  getCaseStudies, getCategories, getCities, getCountries, getGlobalModified, getGlossary, getIndustries, getJobs, getLastModified, getPosts, getProducts, getSettings, getSolutions,
} from "./cms";
import { isoDate } from "./format";

export type Entry = { path: string; lastmod?: string; images?: { url: string; title?: string }[] };

export const SITEMAPS = ["pages", "products", "solutions", "locations", "insights", "glossary", "customers"] as const;
export type SitemapName = (typeof SITEMAPS)[number];

const abs = (base: string, u: string) => (u.startsWith("http") ? u : `${base}${u}`);

/** All indexable URLs, grouped into small sitemaps. Pages marked "Hide from Google" are left out. */
export async function sitemapEntries(name: SitemapName): Promise<Entry[]> {
  const s = await getSettings();
  switch (name) {
    case "pages": {
      const g = async (slug: string) => isoDate((await getGlobalModified(slug)) || "") || undefined;
      return [
        { path: "/", lastmod: await g("home-page"), images: [{ url: abs(s.url, "/images/target-360-dashboard.png"), title: "TARGET 360 dashboard" }] },
        { path: "/about", lastmod: await g("about-page") },
        { path: "/ai-solution", lastmod: await g("ai-page") },
        { path: "/book-a-demo", lastmod: await g("demo-page") },
        { path: "/contact", lastmod: await g("contact-page") },
        { path: "/careers", lastmod: await g("careers-page") },
        { path: "/partner-with-us", lastmod: await g("partner-page") },
        { path: "/faqs" },
        { path: "/products" },
        { path: "/solutions" },
        { path: "/industries" },
        { path: "/locations" },
        { path: "/case-studies" },
        { path: "/insights" },
        { path: "/glossary" },
        ...["privacy-policy", "terms", "cookie-policy", "disclaimer", "grievance-officer", "security", "accessibility"].map((p) => ({ path: `/${p}` })),
      ];
    }
    case "products": {
      const [items, lm] = await Promise.all([getProducts(), getLastModified("products")]);
      return items.filter((p) => !p.seo.noindex).map((p) => ({ path: `/products/${p.slug}`, lastmod: lm.get(p.slug), images: p.image ? [{ url: abs(s.url, p.image), title: p.name }] : undefined }));
    }
    case "solutions": {
      const [sol, ind, lmS, lmI] = await Promise.all([getSolutions(), getIndustries(), getLastModified("solutions"), getLastModified("industries")]);
      return [
        ...sol.filter((x) => !x.seo.noindex).map((x) => ({ path: `/solutions/${x.slug}`, lastmod: lmS.get(x.slug) })),
        ...ind.filter((x) => !x.seo.noindex).map((x) => ({ path: `/industries/${x.slug}`, lastmod: lmI.get(x.slug) })),
      ];
    }
    case "locations": {
      const [countries, cities, lmC, lmCi] = await Promise.all([getCountries(), getCities(), getLastModified("countries"), getLastModified("cities")]);
      return [
        ...countries.filter((c) => !c.seo.noindex).map((c) => ({ path: `/locations/${c.slug}`, lastmod: lmC.get(c.slug) })),
        ...cities.filter((c) => !c.seo.noindex && countries.some((k) => k.slug === c.country)).map((c) => ({ path: `/locations/${c.country}/${c.slug}`, lastmod: lmCi.get(c.slug) })),
      ];
    }
    case "insights": {
      const [posts, cats] = await Promise.all([getPosts(), getCategories()]);
      return [
        ...posts.filter((p) => !p.seo.noindex).map((p) => ({ path: `/insights/${p.slug}`, lastmod: isoDate(p.updated || p.date), images: p.image ? [{ url: abs(s.url, p.image), title: p.title }] : undefined })),
        ...cats.filter((c) => posts.some((p) => p.categorySlug === c.slug)).map((c) => ({ path: `/insights/category/${c.slug}` })),
      ];
    }
    case "glossary": {
      const [terms, lm] = await Promise.all([getGlossary(), getLastModified("glossary")]);
      return terms.filter((t) => !t.seo.noindex).map((t) => ({ path: `/glossary/${t.slug}`, lastmod: lm.get(t.slug) }));
    }
    case "customers": {
      const [cases, jobs] = await Promise.all([getCaseStudies(), getJobs()]);
      return [
        ...cases.filter((c) => !c.seo.noindex).map((c) => ({ path: `/case-studies/${c.slug}`, lastmod: isoDate(c.date), images: c.image ? [{ url: abs(s.url, c.image), title: c.client }] : undefined })),
        ...jobs.map((j) => ({ path: `/careers/${j.slug}`, lastmod: isoDate(j.datePosted) })),
      ];
    }
  }
}

const x = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

export function urlsetXml(base: string, entries: Entry[]) {
  const body = entries
    .map((e) => {
      const imgs = (e.images || []).map((i) => `<image:image><image:loc>${x(i.url)}</image:loc>${i.title ? `<image:title>${x(i.title)}</image:title>` : ""}</image:image>`).join("");
      return `<url><loc>${x(`${base}${e.path === "/" ? "" : e.path}`)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}${imgs}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>`;
}

export async function indexXml(base: string) {
  const parts = await Promise.all(
    SITEMAPS.map(async (n) => {
      const entries = await sitemapEntries(n);
      const last = entries.map((e) => e.lastmod).filter(Boolean).sort().pop();
      return `<sitemap><loc>${base}/sitemaps/${n}.xml</loc>${last ? `<lastmod>${last}</lastmod>` : ""}</sitemap>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${parts.join("\n")}\n</sitemapindex>`;
}
