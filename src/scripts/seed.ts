/**
 * Loads all built-in content into the CMS: products, solutions, industries, locations, customer stories,
 * client logos, glossary, guides, legal pages and every website page.
 * Safe to run more than once: existing documents (matched by slug) are updated, not duplicated.
 *
 *   npm run seed
 */
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { JSDOM } from "jsdom";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import * as D from "../content";

const payload: Payload = await getPayload({ config });
const context = { disableRevalidate: true };
const editorConfig = await editorConfigFactory.default({ config: payload.config });
const lex = (html: string) => convertHTMLToLexical({ editorConfig, html, JSDOM });
const L = (a?: string[]) => (a || []).join("\n");
const log = (m: string) => console.log(`  ${m}`);

type Data = Record<string, unknown>;
const ids: Record<string, Map<string, string | number>> = {};

async function upsert(collection: string, key: string, value: string | number, data: Data, versioned = true) {
  type Row = { id: string | number };
  const found = (await payload.find({ collection: collection as never, where: { [key]: { equals: value } }, limit: 1, overrideAccess: true, draft: versioned || undefined })) as unknown as { docs: Row[] };
  const body = (versioned ? { ...data, _status: "published" } : data) as never;
  const doc = (found.docs[0]
    ? await payload.update({ collection: collection as never, id: found.docs[0].id as never, data: body, overrideAccess: true, context })
    : await payload.create({ collection: collection as never, data: body, overrideAccess: true, context })) as unknown as Row;
  (ids[collection] ||= new Map()).set(String(value), doc.id);
  return doc.id;
}
const ref = (collection: string, slug?: string) => (slug ? ids[collection]?.get(slug) : undefined);
const refs = (collection: string, slugs?: string[]) => (slugs || []).map((s) => ref(collection, s)).filter(Boolean);

console.log("Seeding ASK Technology CMS…");

console.log("Categories");
for (const c of D.categories) await upsert("categories", "slug", c.slug, { name: c.name, description: c.description, slug: c.slug }, false);

console.log("Products");
for (const [i, p] of D.products.entries()) {
  await upsert("products", "slug", p.slug, {
    name: p.name, shortName: p.shortName, brand: p.brand, code: p.code, stage: p.stage, audience: p.audience, audienceLabel: p.audienceLabel,
    headline: p.headline, tagline: p.tagline, answer: p.answer, intro: p.intro, imagePath: p.image, highlights: L(p.highlights),
    features: p.features, roles: p.roles?.map((r) => ({ title: r.title, points: L(r.points) })), benefits: p.benefits, steps: L(p.steps),
    faqs: p.faqs, fit: p.fit, keywords: L(p.keywords), seo: { title: p.seo.title, description: p.seo.description }, slug: p.slug, order: (i + 1) * 10,
    tags: L(p.tags), heroTitle: p.heroTitle, heroText: p.heroText, benefitsTitle: p.benefitsTitle, benefitsLead: p.benefitsLead, featuresTitle: p.featuresTitle, featuresLead: p.featuresLead,
    heroLink: p.heroLink, heroFlow: p.heroFlow, rolesTitle: p.rolesTitle,
    quickStepsTitle: p.quickSteps?.title, quickStepsLead: p.quickSteps?.lead, quickSteps: p.quickSteps?.items,
    stepsTitle: p.stepsTitle, stepsLead: p.stepsLead, stepsImagePath: p.stepsImage, stepsImageAlt: p.stepsImageAlt,
    problemsTitle: p.problems?.title, problemsLead: p.problems?.lead, problems: p.problems?.items,
    modesTitle: p.modes?.title, modesLead: p.modes?.lead, modes: p.modes?.items.map((m) => ({ title: m.title, points: L(m.points) })), modesFlow: L(p.modes?.flow),
    reportsTitle: p.reports?.title, reportsLead: p.reports?.lead, reportsNote: p.reports?.note,
    reports: p.reports?.items.map((r) => ({ title: r.title, text: r.text, stats: r.stats, points: L(r.points), imagePath: r.image })),
    compareTitle: p.compare?.title, compareLead: p.compare?.lead, compareThem: p.compare?.them, compareRows: p.compare?.rows,
    ctaTitle: p.cta?.title, ctaText: p.cta?.text,
  });
  log(p.name);
}
for (const p of D.products) await upsert("products", "slug", p.slug, { related: refs("products", p.related) });

console.log("Customer stories");
for (const c of D.caseStudies) {
  await upsert("case-studies", "slug", c.slug, {
    client: c.client, title: c.title, location: c.location, date: c.date, product: ref("products", c.product), productLabel: c.productLabel, category: c.category,
    imagePath: c.image, about: c.about, challenges: L(c.challenges), impact: L(c.impact), results: c.results, featured: !!c.featured, legacyId: c.legacyId,
    seo: { title: c.seo.title, description: c.seo.description }, slug: c.slug,
  });
}
log(`${D.caseStudies.length} stories`);

console.log("Client logos");
for (const [i, c] of D.clients.entries()) await upsert("clients", "name", c.name, { name: c.name, logoPath: c.logo, caseStudy: ref("case-studies", c.caseStudy), showOnHome: true, order: (i + 1) * 10 });

console.log("Solutions");
for (const [i, x] of D.solutions.entries()) {
  await upsert("solutions", "slug", x.slug, {
    name: x.name, h1: x.h1, answer: x.answer, intro: x.intro, problems: L(x.problems), capabilities: x.capabilities, steps: L(x.steps),
    products: refs("products", x.products), faqs: x.faqs, keywords: L(x.keywords), seo: { title: x.seo.title, description: x.seo.description }, slug: x.slug, order: (i + 1) * 10,
  });
}

console.log("Industries");
for (const [i, x] of D.industries.entries()) {
  await upsert("industries", "slug", x.slug, {
    name: x.name, h1: x.h1, answer: x.answer, intro: x.intro, pains: x.pains, products: refs("products", x.products), solutions: refs("solutions", x.solutions),
    faqs: x.faqs, keywords: L(x.keywords), seo: { title: x.seo.title, description: x.seo.description }, slug: x.slug, order: (i + 1) * 10,
  });
}

console.log("Countries and cities");
for (const [i, c] of D.countries.entries()) {
  await upsert("countries", "slug", c.slug, {
    name: c.name, short: c.short, h1: c.h1, answer: c.answer, intro: c.intro, industry: c.industry, points: c.points, products: refs("products", c.products),
    caseStudies: refs("case-studies", c.caseStudies), faqs: c.faqs, seo: { title: c.seo.title, description: c.seo.description }, slug: c.slug, order: (i + 1) * 10,
  });
}
for (const [i, c] of D.cities.entries()) {
  await upsert("cities", "slug", c.slug, {
    name: c.name, country: ref("countries", c.country), region: c.region, h1: c.h1, answer: c.answer, cluster: c.cluster, makes: L(c.makes), challenges: L(c.challenges),
    products: refs("products", c.products), faqs: c.faqs, seo: { title: c.seo.title, description: c.seo.description }, slug: c.slug, order: (i + 1) * 10,
  });
}
log(`${D.countries.length} countries, ${D.cities.length} cities`);

console.log("Glossary");
for (const t of D.glossary) {
  await upsert("glossary", "slug", t.slug, { term: t.term, aka: t.aka, short: t.short, body: L(t.body), product: ref("products", t.product), seo: { title: t.seo.title, description: t.seo.description }, slug: t.slug });
}
for (const t of D.glossary) await upsert("glossary", "slug", t.slug, { related: refs("glossary", t.related) });
log(`${D.glossary.length} terms`);

console.log("Guides");
for (const p of D.posts) {
  await upsert("posts", "slug", p.slug, {
    title: p.title, excerpt: p.excerpt, body: lex(p.body.html || ""), faqs: p.faqs, category: ref("categories", p.categorySlug), date: p.date, author: p.author,
    seo: { title: p.seo.title, description: p.seo.description }, slug: p.slug,
  });
}

console.log("Legal pages");
for (const d of D.legalDocs) {
  await upsert("legal", "slug", d.slug, { title: d.title, summary: d.summary, updated: d.updated, body: lex(d.body.html || ""), seo: { title: d.seo.title, description: d.seo.description }, slug: d.slug });
}

console.log("Website pages and settings");
const P = D.pages;
const g = (slug: string, data: Data, versioned = true) =>
  payload.updateGlobal({ slug: slug as never, data: (versioned ? { ...data, _status: "published" } : data) as never, overrideAccess: true, context });

await g("home-page", {
  ...P.home,
  heroPoints: L(P.home.heroPoints),
  route: P.home.route.map((r) => ({ stage: r.stage, headline: r.headline, tag: r.tag, icon: r.icon, text: r.text, product: ref("products", r.product) })),
  proofCase: P.home.proofCase ? ref("case-studies", P.home.proofCase) : undefined,
  seo: P.home.seo,
});
await g("about-page", { ...P.about, ceoBio: L(P.about.ceoBio), process: L(P.about.process) });
await g("ai-page", { ...P.ai, features: P.ai.features.map((f) => ({ ...f, points: L(f.points) })) });
await g("careers-page", { ...P.careers, why: L(P.careers.why) });
await g("partner-page", P.partner);
await g("contact-page", P.contact);
await g("demo-page", { ...P.bookDemo, points: L(P.bookDemo.points) });
const { url: _url, geo: _geo, ...settings } = D.settings;
await g("site-settings", settings, false);
await g("navigation", { headerCta: { label: "Book a demo", href: "/book-a-demo" } }, false);

console.log("Done. Open /admin to review, then run `npm run import:legacy` to bring across the old articles and images.");
process.exit(0);
