import type { CaseStudy, City, Country, Faq, GlossaryTerm, Job, Post, Product, Settings, Solution } from "./types";
import { isoDate } from "./format";

/**
 * Structured data (JSON-LD) for Google, Bing and AI assistants.
 * Every value comes from the same content the page shows, as Google requires.
 */

const AREAS = [
  { "@type": "Country", name: "India" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "Bangladesh" },
  { "@type": "Country", name: "Sri Lanka" },
];

export const orgId = (s: Settings) => `${s.url}/#organization`;

export function organization(s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(s),
    name: s.name,
    legalName: s.company.registeredName && !s.company.registeredName.startsWith("[") ? s.company.registeredName : undefined,
    url: s.url,
    logo: { "@type": "ImageObject", url: `${s.url}/logo.png`, width: 512, height: 512 },
    description: s.description,
    slogan: s.tagline,
    email: s.email,
    telephone: s.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      addressRegion: s.address.region,
      postalCode: s.address.postalCode,
      addressCountry: s.address.country,
    },
    areaServed: AREAS,
    knowsAbout: ["Garment ERP", "Apparel ERP", "Apparel PLM", "Buying house management", "Garment quality inspection", "Operation bulletin and SMV", "Textile ERP"],
    sameAs: s.social.map((x) => x.url),
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", telephone: s.phone, email: s.email, areaServed: ["IN", "AE", "GB", "BD", "LK"], availableLanguage: ["English"] },
      { "@type": "ContactPoint", contactType: "customer support", telephone: s.landline.replace(/^0/, "+91 "), email: s.email },
    ],
  };
}

export function localBusiness(s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${s.url}/#chennai-office`,
    name: `${s.name}, Chennai`,
    parentOrganization: { "@id": orgId(s) },
    url: `${s.url}/contact`,
    image: `${s.url}/opengraph-image.png`,
    telephone: s.phone,
    email: s.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      addressRegion: s.address.region,
      postalCode: s.address.postalCode,
      addressCountry: s.address.country,
    },
    hasMap: s.mapUrl,
  };
}

export function website(s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${s.url}/#website`,
    url: s.url,
    name: s.name,
    alternateName: ["ASK Tech", "ASKTEK", "TARGET 360"],
    publisher: { "@id": orgId(s) },
    inLanguage: "en",
  };
}

export function breadcrumbs(s: Settings, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${s.url}${it.path === "/" ? "" : it.path}` })),
  };
}

export function faqPage(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function softwareApp(s: Settings, p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${s.url}/products/${p.slug}#software`,
    name: p.name,
    alternateName: p.shortName !== p.name ? p.shortName : undefined,
    description: p.answer || p.intro,
    url: `${s.url}/products/${p.slug}`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Apparel ERP",
    operatingSystem: p.slug === "garment-inspection-software" ? "Web, Android, iOS" : "Web",
    image: p.image ? (p.image.startsWith("http") ? p.image : `${s.url}${p.image}`) : undefined,
    featureList: p.features.map((f) => f.title),
    audience: { "@type": "BusinessAudience", audienceType: p.audienceLabel },
    publisher: { "@id": orgId(s) },
    provider: { "@id": orgId(s) },
    areaServed: AREAS,
  };
}

export function service(s: Settings, opts: { name: string; description: string; path: string; area?: unknown; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${s.url}${opts.path}`,
    provider: { "@id": orgId(s) },
    areaServed: opts.area ?? AREAS,
  };
}

export const solutionService = (s: Settings, x: Solution) =>
  service(s, { name: x.h1, description: x.answer, path: `/solutions/${x.slug}`, serviceType: x.name });

export const countryService = (s: Settings, c: Country) =>
  service(s, { name: c.h1, description: c.answer, path: `/locations/${c.slug}`, serviceType: "Garment ERP software", area: { "@type": "Country", name: c.name } });

export const cityService = (s: Settings, c: City, country: Country) =>
  service(s, {
    name: c.h1,
    description: c.answer,
    path: `/locations/${country.slug}/${c.slug}`,
    serviceType: "Garment ERP software",
    area: { "@type": "City", name: c.name, containedInPlace: { "@type": "Country", name: country.name } },
  });

export function article(s: Settings, p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": p.categorySlug === "guides" ? "TechArticle" : "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `${s.url}/insights/${p.slug}`,
    mainEntityOfPage: `${s.url}/insights/${p.slug}`,
    image: p.image ? (p.image.startsWith("http") ? p.image : `${s.url}${p.image}`) : `${s.url}/opengraph-image.png`,
    datePublished: isoDate(p.date),
    dateModified: isoDate(p.updated || p.date),
    author: p.author === s.name ? { "@id": orgId(s) } : { "@type": "Person", name: p.author },
    publisher: { "@id": orgId(s) },
    articleSection: p.category,
    inLanguage: "en",
  };
}

export function caseStudyArticle(s: Settings, c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.about,
    url: `${s.url}/case-studies/${c.slug}`,
    image: c.image ? (c.image.startsWith("http") ? c.image : `${s.url}${c.image}`) : `${s.url}/opengraph-image.png`,
    datePublished: isoDate(c.date),
    author: { "@id": orgId(s) },
    publisher: { "@id": orgId(s) },
    about: { "@type": "Organization", name: c.client },
  };
}

export function definedTerm(s: Settings, t: GlossaryTerm) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.term,
    alternateName: t.aka,
    description: t.short,
    url: `${s.url}/glossary/${t.slug}`,
    inDefinedTermSet: { "@type": "DefinedTermSet", name: "Garment industry glossary", url: `${s.url}/glossary` },
  };
}

export function jobPosting(s: Settings, j: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: `<p>${j.summary}</p>${j.responsibilities.length ? `<p><b>Responsibilities</b></p><ul>${j.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>` : ""}${j.requirements.length ? `<p><b>Requirements</b></p><ul>${j.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>` : ""}`,
    datePosted: j.datePosted,
    validThrough: j.validThrough,
    employmentType: j.type,
    hiringOrganization: { "@type": "Organization", name: s.name, sameAs: s.url, logo: `${s.url}/logo.png` },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", streetAddress: s.address.street, addressLocality: j.location || s.address.city, addressRegion: s.address.region, postalCode: s.address.postalCode, addressCountry: "IN" },
    },
    directApply: true,
  };
}

export function itemList(s: Settings, name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${s.url}${it.path}` })),
  };
}
