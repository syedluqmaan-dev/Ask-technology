import type { CollectionConfig } from "payload";
import { adminOnly, anyone, canEdit, moduleOnly, publishedOrEditor, type Module } from "../access";
import { answerField, faqsField, featuresField, linesField, relProducts, seoGroup, slugField, sortField } from "../fields";
import { afterChangeRefresh, afterDeleteRefresh } from "../hooks";
import { pathFor } from "../paths";

const drafts = { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 25 } as const;

/** Shared settings for a publishable content collection. */
function content(slug: string, mod: Module, rest: Omit<CollectionConfig, "slug">): CollectionConfig {
  return {
    slug,
    versions: drafts,
    access: { read: publishedOrEditor(mod), create: canEdit(mod), update: canEdit(mod), delete: canEdit(mod) },
    hooks: { afterChange: [afterChangeRefresh((d) => pathFor(slug, d))], afterDelete: [afterDeleteRefresh] },
    ...rest,
    admin: {
      ...rest.admin,
      hidden: ({ user }) => !(user && ((user as { role?: string }).role === "admin" || ((user as { modules?: string[] }).modules || []).includes(mod))),
      preview: (doc) => pathFor(slug, doc as Record<string, unknown>),
    },
  };
}

export const Products = content("products", "products", {
  labels: { singular: "Product", plural: "Products" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "code", "stage", "_status"], group: "Products and solutions" },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { type: "row", fields: [{ name: "name", type: "text", required: true, admin: { width: "60%" } }, { name: "shortName", type: "text", required: true, admin: { width: "40%" } }] },
            { name: "brand", type: "text", admin: { description: "Brand shown on badges, e.g. Target BMS or TARGET 360 ERP." } },
            { type: "row", fields: [{ name: "code", type: "text", required: true, admin: { width: "25%" } }, { name: "stage", type: "text", required: true, admin: { width: "35%" } }, { name: "audience", type: "select", required: true, options: [{ label: "Manufacturers and exporters", value: "manufacturers" }, { label: "Buying houses and brands", value: "buyingHouses" }], admin: { width: "40%" } }] },
            { name: "audienceLabel", type: "text", required: true },
            { name: "headline", type: "text", required: true, label: "Short headline", admin: { description: "Shown on product cards on the home page." } },
            { name: "tagline", type: "text", required: true, label: "One-line summary", admin: { description: "Shown in menus and product lists." } },
            { name: "heroTitle", type: "text", label: "Page heading (H1)", admin: { description: "Optional. Leave empty to use the product name as the heading." } },
            { name: "heroText", type: "textarea", label: "Text under the heading", admin: { description: "Optional. Leave empty to show the short headline and one-line summary." } },
            {
              name: "heroFlow",
              type: "array",
              label: "Flow beside the heading",
              maxRows: 4,
              admin: { initCollapsed: true, description: "Optional. Shown instead of the product screen, e.g. Buyers ⇅ Your buying house ⇅ Factories. Tick “Highlight” on the middle box." },
              fields: [
                { type: "row", fields: [{ name: "title", type: "text", required: true }, { name: "highlight", type: "checkbox" }] },
                { name: "text", type: "text", required: true },
              ],
            },
            {
              name: "heroLink",
              type: "group",
              label: "Second button",
              admin: { description: "Optional. For example “See how it works” linking to #how. Leave empty for the automatic button." },
              fields: [{ type: "row", fields: [{ name: "label", type: "text" }, { name: "href", type: "text" }] }],
            },
            answerField(),
            { name: "intro", type: "textarea", required: true },
            { name: "image", type: "upload", relationTo: "media", label: "Product screen" },
            { name: "imagePath", type: "text", admin: { description: "Used only if no image is uploaded above." } },
            linesField("highlights", "Highlights"),
          ],
        },
        {
          label: "Features",
          fields: [
            { name: "featuresTitle", type: "text", label: "Features heading", admin: { description: "Optional. Default: “Everything <product> covers”." } },
            { name: "featuresLead", type: "textarea", label: "Features intro" },
            featuresField("features", "Features"),
            { name: "rolesTitle", type: "text", label: "Roles heading", admin: { description: "Optional. Default: “One app for everyone on the floor”." } },
            { name: "roles", type: "array", admin: { initCollapsed: true }, fields: [{ name: "title", type: "text", required: true }, linesField("points", "Points")] },
            { name: "benefitsTitle", type: "text", label: "Benefits heading", admin: { description: "Optional. When set, the benefits show near the top of the page under this heading." } },
            { name: "benefitsLead", type: "textarea", label: "Benefits intro" },
            { name: "benefits", type: "array", admin: { initCollapsed: true }, fields: [{ name: "title", type: "text", required: true }, { name: "text", type: "textarea" }] },
            { name: "stepsTitle", type: "text", label: "Steps heading", admin: { description: "Optional. When set, the steps show as a workflow near the top of the page under this heading." } },
            { name: "stepsLead", type: "textarea", label: "Steps intro" },
            { name: "stepsImage", type: "upload", relationTo: "media", label: "Workflow diagram", admin: { description: "Optional image shown above the steps. Write every step in the image description so Google and screen readers can read it." } },
            { name: "stepsImagePath", type: "text", admin: { description: "Used only if no diagram is uploaded above." } },
            { name: "stepsImageAlt", type: "textarea", label: "Diagram description", admin: { description: "Used with the path above. An uploaded diagram uses its own image description." } },
            linesField("steps", "How it works (in order)", "One step per line. To add a short description, write it after a | sign, e.g. Sample created | Raise the request with image, style and supplier."),
            faqsField(),
          ],
        },
        {
          label: "Page sections",
          description: "Optional sections. Each one appears on the page only when it has content.",
          fields: [
            linesField("tags", "Tags above the heading", "One per line, e.g. Online, Offline, PDF reports."),
            {
              type: "collapsible",
              label: "Problems we solve",
              admin: { initCollapsed: true },
              fields: [
                { name: "problemsTitle", type: "text", label: "Heading" },
                { name: "problemsLead", type: "textarea", label: "Intro" },
                {
                  name: "problems",
                  type: "array",
                  label: "Problems",
                  admin: { initCollapsed: true, description: "Write a short text, or fill in the two boxes below it to show a before-and-after." },
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "text", type: "textarea" },
                    { type: "row", fields: [{ name: "without", type: "textarea", label: "Without a system" }, { name: "with", type: "textarea", label: "With TARGET 360" }] },
                    { name: "withTitle", type: "text", label: "Name of the fix", admin: { description: "Optional, e.g. “Live costing with markup control.” Shown in bold before the “With TARGET 360” text." } },
                  ],
                },
              ],
            },
            {
              type: "collapsible",
              label: "Simple steps (e.g. Plan, Enter, See)",
              admin: { initCollapsed: true },
              fields: [
                { name: "quickStepsTitle", type: "text", label: "Heading" },
                { name: "quickStepsLead", type: "textarea", label: "Intro" },
                { name: "quickSteps", type: "array", label: "Steps", maxRows: 4, admin: { initCollapsed: true }, fields: [{ name: "title", type: "text", required: true }, { name: "text", type: "textarea", required: true }] },
              ],
            },
            {
              type: "collapsible",
              label: "Ways of working (e.g. online and offline)",
              admin: { initCollapsed: true },
              fields: [
                { name: "modesTitle", type: "text", label: "Heading" },
                { name: "modesLead", type: "textarea", label: "Intro" },
                { name: "modes", type: "array", label: "Columns", maxRows: 3, admin: { initCollapsed: true }, fields: [{ name: "title", type: "text", required: true }, linesField("points", "Points")] },
                linesField("modesFlow", "Flow line under the columns", "One step per line, e.g. Inspect offline, Auto sync, Report online."),
              ],
            },
            {
              type: "collapsible",
              label: "Reports",
              admin: { initCollapsed: true },
              fields: [
                { name: "reportsTitle", type: "text", label: "Heading" },
                { name: "reportsLead", type: "textarea", label: "Intro" },
                {
                  name: "reports",
                  type: "array",
                  label: "Reports",
                  admin: { initCollapsed: true },
                  fields: [
                    { name: "title", type: "text", required: true },
                    { name: "text", type: "textarea", required: true },
                    { name: "stats", type: "array", label: "Numbers", maxRows: 4, fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }] },
                    linesField("points", "Points"),
                    { name: "image", type: "upload", relationTo: "media", label: "Screenshot" },
                    { name: "imagePath", type: "text", admin: { description: "Used only if no screenshot is uploaded above." } },
                  ],
                },
                { name: "reportsNote", type: "text", label: "Small note under the reports", admin: { description: "For example: Figures shown are from sample data." } },
              ],
            },
            {
              type: "collapsible",
              label: "Comparison table (us vs the old way)",
              admin: { initCollapsed: true },
              fields: [
                { type: "row", fields: [{ name: "compareTitle", type: "text", label: "Heading", admin: { description: "e.g. TARGET 360 vs Excel and WhatsApp" } }, { name: "compareThem", type: "text", label: "Old way column", admin: { description: "e.g. Excel and WhatsApp" } }] },
                { name: "compareLead", type: "textarea", label: "Intro" },
                {
                  name: "compareRows",
                  type: "array",
                  label: "Rows",
                  admin: { initCollapsed: true },
                  fields: [{ name: "label", type: "text", required: true }, { type: "row", fields: [{ name: "them", type: "textarea", required: true, label: "The old way" }, { name: "us", type: "textarea", required: true, label: "With this product" }] }],
                },
              ],
            },
            {
              type: "collapsible",
              label: "Closing call to action",
              admin: { initCollapsed: true },
              fields: [
                { name: "ctaTitle", type: "text", label: "Heading" },
                { name: "ctaText", type: "textarea", label: "Text" },
              ],
            },
          ],
        },
        {
          label: "Fit and links",
          fields: [
            { name: "fit", type: "group", fields: [{ type: "row", fields: [{ name: "manufacturers", type: "checkbox" }, { name: "buyingHouses", type: "checkbox" }, { name: "exporters", type: "checkbox" }, { name: "brands", type: "checkbox" }] }] },
            { name: "related", type: "relationship", relationTo: "products", hasMany: true },
            linesField("keywords", "Target keywords", "One per line. Guides the copy; not shown on the page."),
          ],
        },
        { label: "SEO", fields: [seoGroup()] },
      ],
    },
    slugField("name"),
    sortField(),
  ],
});

export const Solutions = content("solutions", "products", {
  labels: { singular: "Solution page", plural: "Solution pages" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug", "_status"], group: "Products and solutions", description: "One page per job, for example garment costing or SMV calculation." },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "name", type: "text", required: true, admin: { description: "Short name used in menus." } },
            { name: "h1", type: "text", required: true, label: "Page heading (H1)" },
            answerField(),
            { name: "intro", type: "textarea", required: true },
            linesField("problems", "Problems it solves"),
            featuresField("capabilities", "Capabilities"),
            linesField("steps", "How it works (in order)"),
            relProducts(),
            faqsField(),
          ],
        },
        { label: "SEO", fields: [linesField("keywords", "Target keywords"), seoGroup()] },
      ],
    },
    slugField("name"),
    sortField(),
  ],
});

export const Industries = content("industries", "products", {
  labels: { singular: "Industry page", plural: "Industry pages" },
  admin: { useAsTitle: "name", group: "Products and solutions" },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "h1", type: "text", required: true, label: "Page heading (H1)" },
            answerField(),
            { name: "intro", type: "textarea", required: true },
            featuresField("pains", "What matters to this industry"),
            relProducts(),
            { name: "solutions", type: "relationship", relationTo: "solutions", hasMany: true },
            faqsField(),
          ],
        },
        { label: "SEO", fields: [linesField("keywords", "Target keywords"), seoGroup()] },
      ],
    },
    slugField("name"),
    sortField(),
  ],
});

export const Countries = content("countries", "locations", {
  labels: { singular: "Country page", plural: "Country pages" },
  admin: { useAsTitle: "name", group: "Locations", description: "Linked from the footer. Write for that country's garment industry." },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "short", type: "text", required: true, label: "Short name (footer)" }] },
            { name: "h1", type: "text", required: true, label: "Page heading (H1)" },
            answerField(),
            { name: "intro", type: "textarea", required: true },
            { name: "industry", type: "textarea", required: true, label: "About the industry here" },
            featuresField("points", "Why TARGET 360 here"),
            relProducts(),
            { name: "caseStudies", type: "relationship", relationTo: "case-studies", hasMany: true },
            faqsField(),
          ],
        },
        { label: "SEO", fields: [seoGroup()] },
      ],
    },
    slugField("name"),
    sortField(),
  ],
});

export const Cities = content("cities", "locations", {
  labels: { singular: "City page", plural: "City pages" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "country", "_status"], group: "Locations", description: "Each city page must have its own content about that cluster; copied pages are ignored by Google." },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "country", type: "relationship", relationTo: "countries", required: true }, { name: "region", type: "text" }] },
            { name: "h1", type: "text", required: true, label: "Page heading (H1)" },
            answerField(),
            { name: "cluster", type: "textarea", required: true, label: "About the garment cluster" },
            linesField("makes", "What is made here"),
            linesField("challenges", "Common challenges"),
            relProducts(),
            faqsField(),
          ],
        },
        { label: "SEO", fields: [seoGroup()] },
      ],
    },
    slugField("name"),
    sortField(),
  ],
});

export const CaseStudies = content("case-studies", "customers", {
  labels: { singular: "Customer story", plural: "Customer stories" },
  admin: { useAsTitle: "title", defaultColumns: ["client", "title", "date", "_status"], group: "Customers" },
  defaultSort: "-date",
  fields: [
    { type: "row", fields: [{ name: "client", type: "text", required: true }, { name: "location", type: "text" }, { name: "date", type: "date", required: true }] },
    { name: "title", type: "text", required: true },
    { type: "row", fields: [{ name: "product", type: "relationship", relationTo: "products" }, { name: "productLabel", type: "text", label: "Product name as shown" }, { name: "category", type: "text" }] },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "imagePath", type: "text", admin: { description: "Used only if no image is uploaded." } },
    { name: "about", type: "textarea", required: true },
    linesField("challenges", "Challenges"),
    linesField("impact", "What changed"),
    { name: "results", type: "array", labels: { singular: "Result", plural: "Results with numbers" }, admin: { description: "Only numbers the customer stated." }, fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }] },
    { name: "featured", type: "checkbox", admin: { position: "sidebar", description: "Show on the home page." } },
    { name: "legacyId", type: "number", index: true, admin: { position: "sidebar", description: "ID on the old asktek.net, for redirects." } },
    seoGroup(),
    slugField("title"),
  ],
});

export const Clients = content("clients", "customers", {
  labels: { singular: "Client logo", plural: "Client logos" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "showOnHome", "order"], group: "Customers" },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "logoPath", type: "text", admin: { description: "Used only if no logo is uploaded." } },
    { name: "caseStudy", type: "relationship", relationTo: "case-studies" },
    { name: "showOnHome", type: "checkbox", defaultValue: true },
    sortField(),
  ],
});

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Blog category", plural: "Blog categories" },
  admin: { useAsTitle: "name", group: "Blog", hidden: ({ user }) => !(user && ((user as { role?: string }).role === "admin" || ((user as { modules?: string[] }).modules || []).includes("blog"))) },
  access: { read: anyone, create: canEdit("blog"), update: canEdit("blog"), delete: adminOnly },
  hooks: { afterChange: [afterChangeRefresh((d) => pathFor("categories", d))] },
  fields: [{ name: "name", type: "text", required: true }, { name: "description", type: "textarea" }, slugField("name")],
};

export const Posts = content("posts", "blog", {
  labels: { singular: "Article", plural: "Articles" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "category", "date", "_status"], group: "Blog" },
  defaultSort: "-date",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Article",
          fields: [
            { name: "title", type: "text", required: true, label: "Title (H1)" },
            { name: "excerpt", type: "textarea", required: true, admin: { description: "Two sentences shown on article cards and used as the default meta description." } },
            { name: "image", type: "upload", relationTo: "media", label: "Cover image" },
            { name: "body", type: "richText", required: true },
            faqsField("faqs", "FAQs at the end of the article"),
          ],
        },
        { label: "SEO", fields: [seoGroup()] },
      ],
    },
    slugField("title"),
    { name: "category", type: "relationship", relationTo: "categories", required: true, admin: { position: "sidebar" } },
    { name: "date", type: "date", required: true, admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } } },
    { name: "updated", type: "date", label: "Last reviewed", admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" }, description: "Set when you meaningfully update the article." } },
    { name: "author", type: "text", defaultValue: "ASK Technology", admin: { position: "sidebar" } },
    { name: "legacyId", type: "number", index: true, admin: { position: "sidebar", description: "ID on the old asktek.net (/blog-details?id=…)." } },
  ],
});

export const Glossary = content("glossary", "glossary", {
  labels: { singular: "Glossary term", plural: "Glossary" },
  admin: { useAsTitle: "term", group: "Blog" },
  defaultSort: "term",
  fields: [
    { name: "term", type: "text", required: true },
    { name: "aka", type: "text", label: "Also known as" },
    { name: "short", type: "textarea", required: true, label: "Definition (one or two sentences)", admin: { description: "Starts with the term, for example “SMV is…”. This is what Google and AI assistants quote." } },
    linesField("body", "Explanation", "Each line becomes a paragraph."),
    { name: "related", type: "relationship", relationTo: "glossary", hasMany: true },
    { name: "product", type: "relationship", relationTo: "products" },
    seoGroup(),
    slugField("term"),
  ],
});

export const Jobs = content("jobs", "careers", {
  labels: { singular: "Job opening", plural: "Job openings" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "department", "open", "_status"], group: "Careers" },
  defaultSort: "-datePosted",
  fields: [
    { name: "title", type: "text", required: true },
    { type: "row", fields: [{ name: "department", type: "text", required: true }, { name: "location", type: "text", defaultValue: "Chennai" }, { name: "type", type: "select", defaultValue: "FULL_TIME", options: [{ label: "Full time", value: "FULL_TIME" }, { label: "Part time", value: "PART_TIME" }, { label: "Internship", value: "INTERN" }, { label: "Contract", value: "CONTRACTOR" }] }] },
    { name: "experience", type: "text" },
    { name: "summary", type: "textarea", required: true },
    linesField("responsibilities", "Responsibilities"),
    linesField("requirements", "Requirements"),
    { type: "row", fields: [{ name: "datePosted", type: "date", required: true }, { name: "validThrough", type: "date" }] },
    { name: "open", type: "checkbox", defaultValue: true, admin: { position: "sidebar", description: "Untick to close the role. It disappears from the site and Google Jobs." } },
    slugField("title"),
  ],
});

export const Legal = content("legal", "settings", {
  labels: { singular: "Legal page", plural: "Legal pages" },
  admin: { useAsTitle: "title", group: "Settings", description: "Privacy, terms, cookies and other policies. {{company}}, {{email}} and similar tokens are filled from Site settings." },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "summary", type: "textarea" },
    { name: "updated", type: "date", required: true, label: "Last updated" },
    { name: "body", type: "richText", required: true },
    seoGroup(),
    slugField("title"),
  ],
});

export const Redirects: CollectionConfig = {
  slug: "redirects",
  labels: { singular: "Redirect", plural: "Redirects" },
  admin: { useAsTitle: "from", defaultColumns: ["from", "to", "permanent"], group: "Settings", description: "Send an old address to a new one so visitors and Google rankings are not lost.", hidden: ({ user }) => !(user && ((user as { role?: string }).role === "admin" || ((user as { modules?: string[] }).modules || []).includes("settings"))) },
  access: { read: moduleOnly("settings"), create: canEdit("settings"), update: canEdit("settings"), delete: canEdit("settings") },
  fields: [
    { name: "from", type: "text", required: true, unique: true, index: true, admin: { description: "Old address starting with /, for example /old-page" }, validate: (v: unknown) => (typeof v === "string" && v.startsWith("/") ? true : "Must start with /") },
    { name: "to", type: "text", required: true, admin: { description: "New address, for example /products or https://…" } },
    { name: "permanent", type: "checkbox", defaultValue: true, label: "Permanent (301)" },
  ],
};

export const Testimonials = content("testimonials", "customers", {
  labels: { singular: "Testimonial", plural: "Testimonials" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "showOnHome", "_status"],
    group: "Customers",
    description: "Real quotes from customers, with their permission. The testimonials section stays hidden until at least one is published.",
  },
  defaultSort: "order",
  fields: [
    { name: "quote", type: "textarea", required: true, admin: { description: "The customer's own words. Keep it under 50 words." } },
    { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "role", type: "text", admin: { description: "e.g. Managing Director" } }, { name: "company", type: "text" }] },
    { name: "photo", type: "upload", relationTo: "media", admin: { description: "Optional. A square headshot or the company logo." } },
    { name: "products", type: "relationship", relationTo: "products", hasMany: true, admin: { description: "Show this quote on these product pages. Leave empty for a general quote." } },
    { name: "showOnHome", type: "checkbox", defaultValue: true, label: "Show on home page", admin: { position: "sidebar" } },
    sortField(),
  ],
});

/** Public downloads such as the product brochure (PDF). */
export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Document", plural: "Documents" },
  admin: { group: "Settings", description: "PDFs visitors can download, for example the product brochure. Choose it in Site settings → Brochure.", hidden: ({ user }) => !(user && ((user as { role?: string }).role === "admin" || ((user as { modules?: string[] }).modules || []).includes("settings"))) },
  access: { read: anyone, create: canEdit("settings"), update: canEdit("settings"), delete: adminOnly },
  upload: { mimeTypes: ["application/pdf"] },
  fields: [{ name: "title", type: "text", required: true }],
};
