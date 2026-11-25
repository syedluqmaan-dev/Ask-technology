/** Shared content types. CMS documents are mapped into these shapes in src/lib/cms.ts. */

export type IconName =
  | "order" | "chain" | "box" | "shield" | "factory" | "wallet" | "invoice" | "cloud" | "offline" | "spark"
  | "chart" | "users" | "lock" | "clock" | "target" | "truck" | "tag" | "swatch" | "layers" | "mobile" | "bell" | "store";

export type Faq = { q: string; a: string };
export type Feature = { title: string; text: string; icon?: IconName };
export type Seo = { title?: string; description?: string; image?: string; noindex?: boolean };

/** Rich content: Lexical JSON from the CMS, or HTML from the built-in defaults. */
export type Rich = { lexical?: unknown; html?: string };

export type Product = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  /** Product brand shown on badges, e.g. "Target BMS". */
  brand: string;
  stage: string;
  audience: "manufacturers" | "buyingHouses";
  audienceLabel: string;
  image: string;
  headline: string;
  tagline: string;
  answer: string;
  intro: string;
  highlights: string[];
  features: Feature[];
  roles?: { title: string; points: string[] }[];
  benefits?: { title: string; text: string }[];
  steps?: string[];
  faqs: Faq[];
  fit: { manufacturers: boolean; buyingHouses: boolean; exporters: boolean; brands: boolean };
  related: string[];
  keywords: string[];
  seo: Seo;

  /* Optional page sections. Each one shows only when it has content. */
  /** Short tags above the heading, e.g. "Online", "Offline". */
  tags?: string[];
  /** Page heading and text under it, when they should differ from the product name and headline. */
  heroTitle?: string;
  heroText?: string;
  /**
   * Each problem has a short text, a "without a system" / "with TARGET 360" contrast, or both.
   * With withTitle, the fix shows as a named solution ("Live costing with markup control. Build…").
   */
  problems?: { title: string; lead?: string; items: { title: string; text?: string; without?: string; with?: string; withTitle?: string }[] };
  /** A short stacked flow shown in the hero instead of the screenshot (e.g. Buyers ⇅ Buying house ⇅ Factories). */
  heroFlow?: { title: string; text: string; highlight?: boolean }[];
  /** Second button in the hero. Default: "See the reports", "See what it fixes" or "See features", depending on the page. */
  heroLink?: { label: string; href: string };
  /** A short numbered "how it works" in three or four plain steps (e.g. Plan, Enter, See). */
  quickSteps?: { title: string; lead?: string; items: { title: string; text: string }[] };
  /** Heading for the roles section (default: "One app for everyone on the floor"). */
  rolesTitle?: string;
  /** Heading and intro for the features grid (default: "Everything <product> covers"). */
  featuresTitle?: string;
  featuresLead?: string;
  benefitsTitle?: string;
  benefitsLead?: string;
  /** Workflow diagram shown above the steps. */
  stepsImage?: string;
  stepsImageAlt?: string;
  /** Side-by-side ways of working (e.g. online vs offline) with an optional flow line under them. */
  modes?: { title: string; lead?: string; items: { title: string; points: string[] }[]; flow?: string[] };
  /** Heading and intro for the "How it works" steps. A step can add a description after " | ". */
  stepsTitle?: string;
  stepsLead?: string;
  reports?: { title: string; lead?: string; note?: string; items: ProductReport[] };
  /** "Us vs the old way" table: each row compares how a task is done today with how it works in the product. */
  compare?: { title: string; lead?: string; them: string; rows: { label: string; them: string; us: string }[] };
  /** Closing call to action at the bottom of the page. */
  cta?: { title: string; text: string };
};

export type ProductReport = {
  title: string;
  text: string;
  stats: { value: string; label: string }[];
  points: string[];
  image?: string;
  imageAlt?: string;
};

export type Solution = {
  slug: string;
  name: string;
  h1: string;
  answer: string;
  intro: string;
  problems: string[];
  capabilities: Feature[];
  steps: string[];
  products: string[];
  faqs: Faq[];
  keywords: string[];
  seo: Seo;
};

export type Industry = {
  slug: string;
  name: string;
  h1: string;
  answer: string;
  intro: string;
  pains: Feature[];
  products: string[];
  solutions: string[];
  faqs: Faq[];
  keywords: string[];
  seo: Seo;
};

export type Country = {
  slug: string;
  name: string;
  short: string;
  h1: string;
  answer: string;
  intro: string;
  industry: string;
  points: Feature[];
  products: string[];
  caseStudies: string[];
  faqs: Faq[];
  seo: Seo;
};

export type City = {
  slug: string;
  country: string;
  name: string;
  region: string;
  h1: string;
  answer: string;
  cluster: string;
  makes: string[];
  challenges: string[];
  products: string[];
  faqs: Faq[];
  seo: Seo;
};

export type CaseStudy = {
  slug: string;
  legacyId?: number;
  client: string;
  title: string;
  product: string;
  productLabel: string;
  category: string;
  date: string;
  image: string;
  location?: string;
  about: string;
  challenges: string[];
  impact: string[];
  results?: { value: string; label: string }[];
  featured?: boolean;
  seo: Seo;
};

export type Post = {
  slug: string;
  legacyId?: number;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  updated?: string;
  author: string;
  image?: string;
  imageAlt?: string;
  body: Rich;
  faqs?: Faq[];
  readMinutes: number;
  seo: Seo;
};

export type Category = { slug: string; name: string; description: string };

export type GlossaryTerm = {
  slug: string;
  term: string;
  aka?: string;
  short: string;
  body: string[];
  related: string[];
  product?: string;
  seo: Seo;
};

export type Client = { name: string; logo?: string; caseStudy?: string };

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  datePosted: string;
  validThrough?: string;
};

export type LegalDoc = { slug: string; title: string; summary: string; updated: string; body: Rich; seo: Seo };

export type Settings = {
  name: string;
  legalName: string;
  url: string;
  tagline: string;
  description: string;
  email: string;
  hrEmail: string;
  phone: string;
  landline: string;
  whatsapp: string;
  address: { street: string; city: string; region: string; postalCode: string; country: string };
  mapUrl: string;
  geo?: { lat: number; lng: number };
  hours: string;
  social: { label: string; url: string }[];
  footerAbout: string;
  footerCountries: { label: string; href: string }[];
  stats: { value: string; label: string }[];
  calLink: string;
  gtmId?: string;
  linkedinPartnerId?: string;
  googleVerification?: string;
  bingVerification?: string;
  grievance: { name: string; email: string; address: string };
  company: { registeredName: string; cin?: string; gstin?: string };
  /** Certifications and trust marks. Shown only when filled in, and only with things ASK actually holds. */
  trust: { label: string; text?: string; image?: string }[];
  /** Downloadable brochure. The download block is hidden until a file is set. */
  brochure?: { title: string; text: string; url: string };
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  /** Product slugs this quote is about. Empty means it is a general quote. */
  products: string[];
  home: boolean;
};

export type NavGroup = { label: string; href: string; items: { label: string; href: string; text?: string }[] };
