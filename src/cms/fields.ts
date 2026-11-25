import type { Field, GroupField } from "payload";
import { slugify } from "@/lib/format";

export const ICONS = [
  "order", "chain", "box", "shield", "factory", "wallet", "invoice", "cloud", "offline", "spark",
  "chart", "users", "lock", "clock", "target", "truck", "tag", "swatch", "layers", "mobile", "bell", "store",
].map((v) => ({ label: v, value: v }));

/** URL slug, generated from another field when left empty. */
export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description: "Web address of the page. Lowercase words joined by hyphens. Changing it changes the URL; add a redirect from the old one." },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === "string" && value.trim()) return slugify(value);
        const src = data?.[from];
        return typeof src === "string" ? slugify(src) : value;
      },
    ],
  },
});

/** Search engine fields with length guidance shown to editors. */
export const seoGroup = (): GroupField => ({
  name: "seo",
  type: "group",
  label: "Search engines and sharing",
  admin: { description: "Shown in Google results and when the page is shared. Leave blank to use the page's own title and summary." },
  fields: [
    { name: "title", type: "text", label: "Title tag", admin: { description: "Best under 60 characters. Put the main keyword first." } },
    { name: "description", type: "textarea", label: "Meta description", admin: { description: "Best between 120 and 155 characters. Say what the page offers and end with an action." } },
    { name: "image", type: "upload", relationTo: "media", label: "Share image", admin: { description: "1200 × 630 px. Used on LinkedIn, WhatsApp and X." } },
    { name: "noindex", type: "checkbox", label: "Hide from Google", defaultValue: false, admin: { description: "Removes the page from the sitemap and asks search engines not to index it." } },
  ],
});

export const linesField = (name: string, label: string, description = "One item per line."): Field => ({
  name,
  label,
  type: "textarea",
  admin: { description, rows: 5 },
});

export const faqsField = (name = "faqs", label = "Questions and answers"): Field => ({
  name,
  label,
  type: "array",
  admin: { description: "Shown as an FAQ on the page and marked up for Google and AI assistants. Write the answer as a complete sentence.", initCollapsed: true },
  fields: [
    { name: "q", label: "Question", type: "text", required: true },
    { name: "a", label: "Answer", type: "textarea", required: true },
  ],
});

export const featuresField = (name: string, label: string): Field => ({
  name,
  label,
  type: "array",
  admin: { initCollapsed: true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "icon", type: "select", options: ICONS, admin: { width: "30%" } },
        { name: "title", type: "text", required: true, admin: { width: "70%" } },
      ],
    },
    { name: "text", type: "textarea", required: true },
  ],
});

export const answerField = (): Field => ({
  name: "answer",
  label: "Direct answer (40–60 words)",
  type: "textarea",
  required: true,
  admin: {
    description: "Shown near the top of the page. Google and AI assistants often quote this exact paragraph, so answer the page's main question in plain words.",
  },
});

export const relProducts = (name = "products", label = "Related products"): Field => ({
  name,
  label,
  type: "relationship",
  relationTo: "products",
  hasMany: true,
});

export const sortField = (): Field => ({
  name: "order",
  type: "number",
  defaultValue: 100,
  admin: { position: "sidebar", description: "Lower numbers show first." },
});
