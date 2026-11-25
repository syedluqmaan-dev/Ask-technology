import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import type { Payload, Where } from "payload";
import * as D from "@/content";
import type {
  CaseStudy, Category, City, Client, Country, Faq, Feature, GlossaryTerm, IconName, Industry, Job, LegalDoc, Post, Product, Rich, Seo, Settings, Solution, Testimonial,
} from "./types";
import { lines } from "./format";
import type { HomeContent } from "@/content/pages";

/* ───────────────────────── Connection ───────────────────────── */

const client = cache(async (): Promise<Payload | null> => {
  if (!process.env.DATABASE_URI) return null;
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([import("payload"), import("@payload-config")]);
    return await getPayload({ config });
  } catch (e) {
    console.error("[cms] unavailable, using built-in content:", (e as Error).message);
    return null;
  }
});

async function isDraft() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (sitemaps, static params)
  }
}

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

async function find(collection: string, opts: { where?: Where; sort?: string; limit?: number; versioned?: boolean } = {}): Promise<Doc[] | null> {
  const p = await client();
  if (!p) return null;
  const draft = await isDraft();
  const versioned = opts.versioned !== false;
  const where: Where | undefined =
    versioned && !draft ? (opts.where ? { and: [opts.where, { _status: { equals: "published" } }] } : { _status: { equals: "published" } }) : opts.where;
  try {
    const res = await p.find({
      collection: collection as never,
      where,
      sort: opts.sort,
      limit: opts.limit ?? 1000,
      pagination: false,
      depth: 1,
      draft: versioned ? draft : undefined,
      overrideAccess: true,
    });
    return res.docs as Doc[];
  } catch (e) {
    console.error(`[cms] ${collection}:`, (e as Error).message);
    return null;
  }
}

async function global(slug: string): Promise<Doc | null> {
  const p = await client();
  if (!p) return null;
  const draft = await isDraft();
  try {
    const doc = (await p.findGlobal({ slug: slug as never, depth: 1, draft, overrideAccess: true })) as Doc;
    if (!draft && doc?._status === "draft") return null; // never published yet
    return doc;
  } catch (e) {
    console.error(`[cms] global ${slug}:`, (e as Error).message);
    return null;
  }
}

/* ───────────────────────── Mappers ───────────────────────── */

const str = (v: unknown, fb = "") => (typeof v === "string" && v.trim() ? v : fb);
const media = (v: unknown, fb = ""): string => {
  if (v && typeof v === "object") {
    const m = v as { url?: string; sizes?: { hero?: { url?: string } } };
    return m.sizes?.hero?.url || m.url || fb;
  }
  return fb;
};
const mediaAlt = (v: unknown, fb = "") => (v && typeof v === "object" ? str((v as { alt?: string }).alt, fb) : fb);
const slugOf = (v: unknown) => (v && typeof v === "object" ? str((v as { slug?: string }).slug) : "");
const slugs = (v: unknown) => (Array.isArray(v) ? v.map(slugOf).filter(Boolean) : []);
const faqs = (v: unknown): Faq[] => (Array.isArray(v) ? v.map((x) => ({ q: str(x?.q), a: str(x?.a) })).filter((x) => x.q && x.a) : []);
const feats = (v: unknown): Feature[] =>
  Array.isArray(v) ? v.map((x) => ({ title: str(x?.title), text: str(x?.text), icon: (str(x?.icon) || undefined) as IconName | undefined })).filter((x) => x.title) : [];
const seo = (v: unknown): Seo => {
  const s = (v || {}) as Doc;
  return { title: str(s.title) || undefined, description: str(s.description) || undefined, image: media(s.image) || undefined, noindex: Boolean(s.noindex) };
};
const date = (v: unknown, fb = "") => (typeof v === "string" && v ? v.slice(0, 10) : fb);
const pick = <T,>(cms: T | undefined | null, fb: T): T => {
  if (cms === undefined || cms === null) return fb;
  if (typeof cms === "string" && !cms.trim()) return fb;
  if (Array.isArray(cms) && cms.length === 0) return fb;
  return cms;
};

const mapProduct = (d: Doc): Product => ({
  slug: d.slug,
  code: str(d.code),
  name: str(d.name),
  shortName: str(d.shortName, d.name),
  brand: str(d.brand, str(d.shortName, d.name)),
  stage: str(d.stage),
  audience: d.audience === "buyingHouses" ? "buyingHouses" : "manufacturers",
  audienceLabel: str(d.audienceLabel),
  image: media(d.image, str(d.imagePath)),
  headline: str(d.headline),
  tagline: str(d.tagline),
  answer: str(d.answer),
  intro: str(d.intro),
  highlights: lines(d.highlights),
  features: feats(d.features),
  roles: Array.isArray(d.roles) ? d.roles.map((r: Doc) => ({ title: str(r.title), points: lines(r.points) })) : undefined,
  benefits: Array.isArray(d.benefits) ? d.benefits.map((b: Doc) => ({ title: str(b.title), text: str(b.text) })) : undefined,
  steps: lines(d.steps),
  faqs: faqs(d.faqs),
  fit: { manufacturers: !!d.fit?.manufacturers, buyingHouses: !!d.fit?.buyingHouses, exporters: !!d.fit?.exporters, brands: !!d.fit?.brands },
  related: slugs(d.related),
  keywords: lines(d.keywords),
  seo: seo(d.seo),
  ...productSections(d),
});

/** Optional product page sections. A section is left out when its heading or items are empty. */
function productSections(d: Doc): Partial<Product> {
  const out: Partial<Product> = {};
  const tags = lines(d.tags);
  if (tags.length) out.tags = tags;
  if (str(d.heroTitle)) out.heroTitle = str(d.heroTitle);
  if (str(d.heroText)) out.heroText = str(d.heroText);
  const flow = Array.isArray(d.heroFlow) ? d.heroFlow.map((x: Doc) => ({ title: str(x.title), text: str(x.text), highlight: !!x.highlight })).filter((x: { title: string }) => x.title) : [];
  if (flow.length) out.heroFlow = flow;
  if (str(d.heroLink?.label) && str(d.heroLink?.href)) out.heroLink = { label: str(d.heroLink.label), href: str(d.heroLink.href) };
  if (str(d.rolesTitle)) out.rolesTitle = str(d.rolesTitle);
  const quick = Array.isArray(d.quickSteps) ? d.quickSteps.map((x: Doc) => ({ title: str(x.title), text: str(x.text) })).filter((x: { title: string }) => x.title) : [];
  if (str(d.quickStepsTitle) && quick.length) out.quickSteps = { title: str(d.quickStepsTitle), lead: str(d.quickStepsLead) || undefined, items: quick };
  if (str(d.featuresTitle)) {
    out.featuresTitle = str(d.featuresTitle);
    out.featuresLead = str(d.featuresLead) || undefined;
  }
  if (str(d.benefitsTitle)) {
    out.benefitsTitle = str(d.benefitsTitle);
    out.benefitsLead = str(d.benefitsLead) || undefined;
  }
  const stepsImage = media(d.stepsImage, str(d.stepsImagePath));
  if (stepsImage) {
    out.stepsImage = stepsImage;
    out.stepsImageAlt = mediaAlt(d.stepsImage) || str(d.stepsImageAlt) || undefined;
  }
  const problems = Array.isArray(d.problems)
    ? d.problems
        .map((x: Doc) => ({ title: str(x.title), text: str(x.text) || undefined, without: str(x.without) || undefined, with: str(x.with) || undefined, withTitle: str(x.withTitle) || undefined }))
        .filter((x: { title: string }) => x.title)
    : [];
  if (str(d.problemsTitle) && problems.length) out.problems = { title: str(d.problemsTitle), lead: str(d.problemsLead) || undefined, items: problems };
  const modes = Array.isArray(d.modes) ? d.modes.map((x: Doc) => ({ title: str(x.title), points: lines(x.points) })).filter((x: { title: string }) => x.title) : [];
  if (str(d.modesTitle) && modes.length) out.modes = { title: str(d.modesTitle), lead: str(d.modesLead) || undefined, items: modes, flow: lines(d.modesFlow) };
  if (str(d.stepsTitle)) {
    out.stepsTitle = str(d.stepsTitle);
    out.stepsLead = str(d.stepsLead) || undefined;
  }
  const reports = Array.isArray(d.reports)
    ? d.reports.map((r: Doc) => ({
        title: str(r.title),
        text: str(r.text),
        stats: Array.isArray(r.stats) ? r.stats.map((s: Doc) => ({ value: str(s.value), label: str(s.label) })) : [],
        points: lines(r.points),
        image: media(r.image, str(r.imagePath)) || undefined,
        imageAlt: mediaAlt(r.image) || undefined,
      })).filter((r: { title: string }) => r.title)
    : [];
  if (str(d.reportsTitle) && reports.length) out.reports = { title: str(d.reportsTitle), lead: str(d.reportsLead) || undefined, note: str(d.reportsNote) || undefined, items: reports };
  const cmp = Array.isArray(d.compareRows) ? d.compareRows.map((r: Doc) => ({ label: str(r.label), them: str(r.them), us: str(r.us) })).filter((r: { label: string }) => r.label) : [];
  if (str(d.compareTitle) && cmp.length) out.compare = { title: str(d.compareTitle), lead: str(d.compareLead) || undefined, them: str(d.compareThem, "The old way"), rows: cmp };
  if (str(d.ctaTitle)) out.cta = { title: str(d.ctaTitle), text: str(d.ctaText) };
  return out;
}

const mapSolution = (d: Doc): Solution => ({
  slug: d.slug, name: str(d.name), h1: str(d.h1), answer: str(d.answer), intro: str(d.intro),
  problems: lines(d.problems), capabilities: feats(d.capabilities), steps: lines(d.steps), products: slugs(d.products), faqs: faqs(d.faqs), keywords: lines(d.keywords), seo: seo(d.seo),
});

const mapIndustry = (d: Doc): Industry => ({
  slug: d.slug, name: str(d.name), h1: str(d.h1), answer: str(d.answer), intro: str(d.intro),
  pains: feats(d.pains), products: slugs(d.products), solutions: slugs(d.solutions), faqs: faqs(d.faqs), keywords: lines(d.keywords), seo: seo(d.seo),
});

const mapCountry = (d: Doc): Country => ({
  slug: d.slug, name: str(d.name), short: str(d.short, d.name), h1: str(d.h1), answer: str(d.answer), intro: str(d.intro), industry: str(d.industry),
  points: feats(d.points), products: slugs(d.products), caseStudies: slugs(d.caseStudies), faqs: faqs(d.faqs), seo: seo(d.seo),
});

const mapCity = (d: Doc): City => ({
  slug: d.slug, country: slugOf(d.country), name: str(d.name), region: str(d.region), h1: str(d.h1), answer: str(d.answer), cluster: str(d.cluster),
  makes: lines(d.makes), challenges: lines(d.challenges), products: slugs(d.products), faqs: faqs(d.faqs), seo: seo(d.seo),
});

const mapCase = (d: Doc): CaseStudy => ({
  slug: d.slug, legacyId: d.legacyId ?? undefined, client: str(d.client), title: str(d.title), product: slugOf(d.product), productLabel: str(d.productLabel),
  category: str(d.category), date: date(d.date), image: media(d.image, str(d.imagePath)), location: str(d.location) || undefined, about: str(d.about),
  challenges: lines(d.challenges), impact: lines(d.impact),
  results: Array.isArray(d.results) && d.results.length ? d.results.map((r: Doc) => ({ value: str(r.value), label: str(r.label) })) : undefined,
  featured: !!d.featured, seo: seo(d.seo),
});

const mapPost = (d: Doc): Post => {
  const cat = d.category && typeof d.category === "object" ? (d.category as Doc) : null;
  return {
    slug: d.slug, legacyId: d.legacyId ?? undefined, title: str(d.title), excerpt: str(d.excerpt), category: str(cat?.name, "Articles"), categorySlug: str(cat?.slug, ""),
    date: date(d.date), updated: date(d.updated) || undefined, author: str(d.author, "ASK Technology"),
    image: media(d.image) || undefined, imageAlt: mediaAlt(d.image), body: { lexical: d.body },
    faqs: faqs(d.faqs), readMinutes: readMinutes(d.body), seo: seo(d.seo),
  };
};

function readMinutes(lexical: unknown) {
  const text = JSON.stringify(lexical || "").match(/"text":"([^"]*)"/g)?.join(" ") || "";
  return Math.max(2, Math.round(text.split(/\s+/).length / 220));
}

const mapTerm = (d: Doc): GlossaryTerm => ({
  slug: d.slug, term: str(d.term), aka: str(d.aka) || undefined, short: str(d.short), body: lines(d.body), related: slugs(d.related), product: slugOf(d.product) || undefined, seo: seo(d.seo),
});

const mapJob = (d: Doc): Job => ({
  slug: d.slug, title: str(d.title), department: str(d.department), location: str(d.location, "Chennai"), type: str(d.type, "FULL_TIME"), experience: str(d.experience),
  summary: str(d.summary), responsibilities: lines(d.responsibilities), requirements: lines(d.requirements), datePosted: date(d.datePosted), validThrough: date(d.validThrough) || undefined,
});

/* ───────────────────────── Settings and menus ───────────────────────── */

export const getSettings = cache(async (): Promise<Settings> => {
  const d = await global("site-settings");
  const s = D.settings;
  if (!d) return s;
  return {
    ...s,
    name: str(d.name, s.name),
    legalName: str(d.legalName, s.legalName),
    tagline: str(d.tagline, s.tagline),
    description: str(d.description, s.description),
    email: str(d.email, s.email),
    hrEmail: str(d.hrEmail, s.hrEmail),
    phone: str(d.phone, s.phone),
    landline: str(d.landline, s.landline),
    whatsapp: str(d.whatsapp, s.whatsapp),
    address: {
      street: str(d.address?.street, s.address.street),
      city: str(d.address?.city, s.address.city),
      region: str(d.address?.region, s.address.region),
      postalCode: str(d.address?.postalCode, s.address.postalCode),
      country: str(d.address?.country, s.address.country),
    },
    mapUrl: str(d.mapUrl, s.mapUrl),
    hours: str(d.hours, s.hours),
    social: pick(Array.isArray(d.social) ? d.social.map((x: Doc) => ({ label: str(x.label), url: str(x.url) })).filter((x: { url: string }) => x.url) : [], s.social),
    footerAbout: str(d.footerAbout, s.footerAbout),
    footerCountries: pick(Array.isArray(d.footerCountries) ? d.footerCountries.map((x: Doc) => ({ label: str(x.label), href: str(x.href) })) : [], s.footerCountries),
    stats: pick(Array.isArray(d.stats) ? d.stats.map((x: Doc) => ({ value: str(x.value), label: str(x.label) })) : [], s.stats),
    calLink: str(d.calLink, s.calLink),
    gtmId: str(d.gtmId, s.gtmId),
    linkedinPartnerId: str(d.linkedinPartnerId, s.linkedinPartnerId),
    googleVerification: str(d.googleVerification, s.googleVerification),
    bingVerification: str(d.bingVerification, s.bingVerification),
    grievance: { name: str(d.grievance?.name, s.grievance.name), email: str(d.grievance?.email, s.grievance.email), address: str(d.grievance?.address, s.grievance.address) },
    company: { registeredName: str(d.company?.registeredName, s.company.registeredName), cin: str(d.company?.cin, s.company.cin), gstin: str(d.company?.gstin, s.company.gstin) },
    trust: Array.isArray(d.trust)
      ? d.trust.map((x: Doc) => ({ label: str(x.label), text: str(x.text) || undefined, image: media(x.image) || undefined })).filter((x: { label: string }) => x.label)
      : [],
    brochure: (() => {
      const url = (d.brochure?.file && typeof d.brochure.file === "object" ? str(d.brochure.file.url) : "") || str(d.brochure?.fileUrl);
      return url ? { title: str(d.brochure?.title, "Download the TARGET Suite brochure"), text: str(d.brochure?.text), url } : undefined;
    })(),
  };
});

export const getNavigation = cache(async () => {
  const d = await global("navigation");
  return {
    headerCta: { label: str(d?.headerCta?.label, "Book a demo"), href: str(d?.headerCta?.href, "/book-a-demo") },
    footerColumns: Array.isArray(d?.footerColumns)
      ? (d!.footerColumns as Doc[]).map((c) => ({ title: str(c.title), links: Array.isArray(c.links) ? c.links.map((l: Doc) => ({ label: str(l.label), href: str(l.href) })) : [] }))
      : [],
  };
});

/* ───────────────────────── Collections ───────────────────────── */

export const getProducts = cache(async (): Promise<Product[]> => {
  const docs = await find("products", { sort: "order" });
  return docs?.length ? docs.map(mapProduct) : D.products;
});
export const getProduct = async (slug: string) => (await getProducts()).find((p) => p.slug === slug);

export const getSolutions = cache(async (): Promise<Solution[]> => {
  const docs = await find("solutions", { sort: "order" });
  return docs?.length ? docs.map(mapSolution) : D.solutions;
});
export const getSolution = async (slug: string) => (await getSolutions()).find((p) => p.slug === slug);

export const getIndustries = cache(async (): Promise<Industry[]> => {
  const docs = await find("industries", { sort: "order" });
  return docs?.length ? docs.map(mapIndustry) : D.industries;
});
export const getIndustry = async (slug: string) => (await getIndustries()).find((p) => p.slug === slug);

export const getCountries = cache(async (): Promise<Country[]> => {
  const docs = await find("countries", { sort: "order" });
  return docs?.length ? docs.map(mapCountry) : D.countries;
});
export const getCountry = async (slug: string) => (await getCountries()).find((c) => c.slug === slug);

export const getCities = cache(async (): Promise<City[]> => {
  const docs = await find("cities", { sort: "order" });
  return docs?.length ? docs.map(mapCity) : D.cities;
});
export const getCity = async (country: string, slug: string) => (await getCities()).find((c) => c.country === country && c.slug === slug);

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  const docs = await find("case-studies", { sort: "-date" });
  return docs?.length ? docs.map(mapCase) : D.caseStudies;
});
export const getCaseStudy = async (slug: string) => (await getCaseStudies()).find((c) => c.slug === slug);

export const getClients = cache(async (): Promise<Client[]> => {
  const docs = await find("clients", { sort: "order", where: { showOnHome: { equals: true } } });
  return docs?.length
    ? docs.map((d) => ({ name: str(d.name), logo: media(d.logo, str(d.logoPath)) || undefined, caseStudy: slugOf(d.caseStudy) || undefined }))
    : D.clients;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const docs = await find("categories", { sort: "name", versioned: false });
  return docs?.length ? docs.map((d) => ({ slug: d.slug, name: str(d.name), description: str(d.description) })) : D.categories;
});

export const getPosts = cache(async (): Promise<Post[]> => {
  const docs = await find("posts", { sort: "-date" });
  return docs?.length ? docs.map(mapPost) : D.posts;
});
export const getPost = async (slug: string) => (await getPosts()).find((p) => p.slug === slug);
export const getPostByLegacyId = async (id: number) => (await getPosts()).find((p) => p.legacyId === id);

export const getGlossary = cache(async (): Promise<GlossaryTerm[]> => {
  const docs = await find("glossary", { sort: "term" });
  return docs?.length ? docs.map(mapTerm) : D.glossary;
});
export const getTerm = async (slug: string) => (await getGlossary()).find((t) => t.slug === slug);

export const getJobs = cache(async (): Promise<Job[]> => {
  const docs = await find("jobs", { sort: "-datePosted", where: { open: { equals: true } } });
  return (docs || []).map(mapJob);
});
export const getJob = async (slug: string) => (await getJobs()).find((j) => j.slug === slug);

export const getLegal = cache(async (slug: string): Promise<LegalDoc | undefined> => {
  const docs = await find("legal", { where: { slug: { equals: slug } }, limit: 1 });
  const d = docs?.[0];
  if (d) {
    return { slug, title: str(d.title), summary: str(d.summary), updated: date(d.updated), body: { lexical: d.body } as Rich, seo: seo(d.seo) };
  }
  return D.legalDocs.find((x) => x.slug === slug);
});

export const getRedirect = async (from: string) => {
  const docs = await find("redirects", { where: { from: { equals: from } }, limit: 1, versioned: false });
  const d = docs?.[0];
  return d ? { to: str(d.to), permanent: d.permanent !== false } : null;
};

/* ───────────────────────── Page globals ───────────────────────── */

const P = D.pages;

export const getHome = cache(async (): Promise<HomeContent & { showcaseImage?: string; seoImage?: string; noindex?: boolean }> => {
  const d = await global("home-page");
  const h = P.home;
  if (!d) return h;
  const s = seo(d.seo);
  return {
    heroPill: { label: str(d.heroPill?.label, h.heroPill.label), href: str(d.heroPill?.href, h.heroPill.href) },
    heroTitle: str(d.heroTitle, h.heroTitle),
    heroAccent: str(d.heroAccent, d.heroTitle ? "" : h.heroAccent),
    heroLead: str(d.heroLead, h.heroLead),
    heroPoints: pick(lines(d.heroPoints), h.heroPoints),
    routeEyebrow: str(d.routeEyebrow, h.routeEyebrow),
    heroPrimary: { label: str(d.heroPrimary?.label, h.heroPrimary.label), href: str(d.heroPrimary?.href, h.heroPrimary.href) },
    heroSecondary: { label: str(d.heroSecondary?.label, h.heroSecondary.label), href: str(d.heroSecondary?.href, h.heroSecondary.href) },
    heroNote: str(d.heroNote, h.heroNote),
    clientsTitle: str(d.clientsTitle, h.clientsTitle),
    problemTitle: str(d.problemTitle, h.problemTitle || ""),
    problemLead: str(d.problemLead, h.problemLead || ""),
    problemStages: pick(Array.isArray(d.problemStages) ? d.problemStages.map((x: Doc) => ({ stage: str(x.stage), pain: str(x.pain), icon: (str(x.icon) || "layers") as IconName })).filter((x: { stage: string }) => x.stage) : [], h.problemStages || []),
    problemBridge: str(d.problemBridge, h.problemBridge || ""),
    routeTitle: str(d.routeTitle, h.routeTitle),
    routeLead: str(d.routeLead, h.routeLead),
    route: pick(Array.isArray(d.route) ? d.route.map((r: Doc) => ({ stage: str(r.stage), headline: str(r.headline) || undefined, tag: str(r.tag) || undefined, text: str(r.text), product: slugOf(r.product), icon: (str(r.icon) || "layers") as IconName })).filter((r: { product: string }) => r.product) : [], h.route),
    across: pick(Array.isArray(d.across) ? d.across.map((a: Doc) => ({ title: str(a.title), text: str(a.text), href: str(a.href), icon: (str(a.icon) || "spark") as IconName })) : [], h.across),
    showcaseTitle: str(d.showcaseTitle, h.showcaseTitle),
    showcaseLead: str(d.showcaseLead, h.showcaseLead),
    showcaseImage: media(d.showcaseImage) || undefined,
    solutionsTitle: str(d.solutionsTitle, h.solutionsTitle),
    solutionsLead: str(d.solutionsLead, h.solutionsLead),
    aiTitle: str(d.aiTitle, h.aiTitle),
    aiLead: str(d.aiLead, h.aiLead),
    aiPoints: pick(feats(d.aiPoints), h.aiPoints),
    proofQuote: str(d.proofQuote, h.proofQuote),
    proofClient: str(d.proofClient, h.proofClient),
    proofCase: str(slugOf(d.proofCase), h.proofCase),
    storiesTitle: str(d.storiesTitle, h.storiesTitle),
    whyTitle: str(d.whyTitle, h.whyTitle),
    whyLead: str(d.whyLead, h.whyLead || ""),
    why: pick(feats(d.why), h.why),
    ceoQuote: str(d.ceoQuote, h.ceoQuote),
    ceoName: str(d.ceoName, h.ceoName),
    ceoRole: str(d.ceoRole, h.ceoRole),
    faqTitle: str(d.faqTitle, h.faqTitle),
    faqs: pick(faqs(d.faqs), h.faqs),
    insightsTitle: str(d.insightsTitle, h.insightsTitle),
    ctaTitle: str(d.ctaTitle, h.ctaTitle),
    ctaText: str(d.ctaText, h.ctaText),
    seo: { title: s.title || h.seo.title, description: s.description || h.seo.description },
    seoImage: s.image,
    noindex: s.noindex,
  };
});

export const getAbout = cache(async () => {
  const d = await global("about-page");
  const a = P.about;
  if (!d) return { ...a, ceoPhoto: undefined as string | undefined };
  const s = seo(d.seo);
  return {
    title: str(d.title, a.title), accent: str(d.accent, d.title ? "" : a.accent), lead: str(d.lead, a.lead), vision: str(d.vision, a.vision), mission: str(d.mission, a.mission),
    ceoPhoto: media(d.ceoPhoto) || undefined, ceoBio: pick(lines(d.ceoBio), a.ceoBio), practices: pick(feats(d.practices), a.practices) as typeof a.practices, pillars: pick(feats(d.pillars), a.pillars) as typeof a.pillars,
    process: pick(lines(d.process), a.process), engagement: pick(feats(d.engagement), a.engagement) as typeof a.engagement,
    seo: { title: s.title || a.seo.title, description: s.description || a.seo.description },
  };
});

export const getAiPage = cache(async () => {
  const d = await global("ai-page");
  const a = P.ai;
  if (!d) return a;
  const s = seo(d.seo);
  return {
    title: str(d.title, a.title), accent: str(d.accent, d.title ? "" : a.accent), lead: str(d.lead, a.lead),
    benefits: pick(feats(d.benefits), a.benefits) as typeof a.benefits,
    features: pick(Array.isArray(d.features) ? d.features.map((f: Doc) => ({ icon: (str(f.icon) || "spark") as IconName, title: str(f.title), text: str(f.text), points: lines(f.points) })) : [], a.features),
    audiences: pick(feats(d.audiences), a.audiences) as typeof a.audiences,
    faqs: pick(faqs(d.faqs), a.faqs),
    seo: { title: s.title || a.seo.title, description: s.description || a.seo.description },
  };
});

const simple = <T extends { title: string; accent: string; lead: string; seo: { title: string; description: string } }>(slug: string, fb: T, extra?: (d: Doc) => Partial<T>) =>
  cache(async (): Promise<T> => {
    const d = await global(slug);
    if (!d) return fb;
    const s = seo(d.seo);
    return { ...fb, title: str(d.title, fb.title), accent: str(d.accent, d.title ? "" : fb.accent), lead: str(d.lead, fb.lead), ...(extra ? extra(d) : {}), seo: { title: s.title || fb.seo.title, description: s.description || fb.seo.description } };
  });

export const getCareersPage = simple("careers-page", P.careers, (d) => ({ why: pick(lines(d.why), P.careers.why) }));
export const getPartnerPage = simple("partner-page", P.partner, (d) => ({ why: pick(Array.isArray(d.why) ? d.why.map((w: Doc) => ({ title: str(w.title), text: str(w.text) })) : [], P.partner.why) }));
export const getContactPage = simple("contact-page", P.contact);
export const getDemoPage = simple("demo-page", P.bookDemo, (d) => ({ points: pick(lines(d.points), P.bookDemo.points) }));

/* ───────────────────────── Sitemap support ───────────────────────── */

/** Real last-modified dates from the CMS (slug → ISO date). Empty when the CMS is unavailable, so no fake dates are sent. */
export const getLastModified = cache(async (collection: string): Promise<Map<string, string>> => {
  const p = await client();
  const map = new Map<string, string>();
  if (!p) return map;
  try {
    const res = await p.find({ collection: collection as never, limit: 2000, pagination: false, depth: 0, overrideAccess: true, select: { slug: true, updatedAt: true } as never });
    for (const d of res.docs as Doc[]) if (d.slug && d.updatedAt) map.set(d.slug, d.updatedAt);
  } catch {
    /* ignore */
  }
  return map;
});

export const getGlobalModified = cache(async (slug: string): Promise<string | undefined> => {
  const p = await client();
  if (!p) return undefined;
  try {
    const d = (await p.findGlobal({ slug: slug as never, depth: 0, overrideAccess: true })) as Doc;
    return d?.updatedAt;
  } catch {
    return undefined;
  }
});

/* ───────────────────────── Testimonials ───────────────────────── */

/** Customer quotes from CMS → Customers → Testimonials. There is no built-in fallback: nothing shows until real quotes are added. */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const docs = await find("testimonials", { sort: "order" });
  return (docs || [])
    .map((d) => ({
      quote: str(d.quote),
      name: str(d.name),
      role: str(d.role) || undefined,
      company: str(d.company) || undefined,
      photo: media(d.photo) || undefined,
      products: slugs(d.products),
      home: d.showOnHome !== false,
    }))
    .filter((t) => t.quote && t.name);
});
