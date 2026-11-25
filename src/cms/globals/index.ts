import type { Field, GlobalConfig } from "payload";
import { canEdit, hasModule, type Module } from "../access";
import { ICONS, faqsField, featuresField, linesField, seoGroup } from "../fields";
import { globalRefresh } from "../hooks";
import { globalPaths } from "../paths";

const link = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [{ type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "href", type: "text", required: true }] }],
});

function page(slug: string, label: string, fields: Field[], mod: Module = "website"): GlobalConfig {
  return {
    slug,
    label,
    admin: { group: "Website pages", hidden: ({ user }) => !hasModule(user as never, mod), preview: () => globalPaths[slug] ?? "/" },
    versions: { drafts: { autosave: { interval: 1500 } }, max: 25 },
    access: { read: () => true, update: canEdit(mod) },
    hooks: { afterChange: [globalRefresh(globalPaths[slug])] },
    fields,
  };
}

export const HomePage = page("home-page", "Home page", [
  {
    type: "tabs",
    tabs: [
      {
        label: "Hero",
        fields: [
          link("heroPill", "Announcement pill"),
          { name: "heroTitle", type: "text", required: true, label: "Main heading (H1)", admin: { description: "Keep the main keyword, “garment ERP software”, in this heading." } },
          { name: "heroAccent", type: "text", label: "Gradient words in the heading", admin: { description: "Copy the exact words from the heading that should show in blue, e.g. “from enquiry to shipment”." } },
          { name: "heroLead", type: "textarea", required: true },
          linesField("heroPoints", "Ticks under the buttons (one per line)"),
          link("heroPrimary", "Main button"),
          link("heroSecondary", "Second button"),
          { name: "heroNote", type: "text", label: "Text before the phone number" },
          { name: "clientsTitle", type: "text" },
        ],
      },
      {
        label: "The problem",
        description: "Chapter 01 of the home page story: the moments where an order loses time and money without one system. Leave the heading empty to hide it.",
        fields: [
          { name: "problemTitle", type: "text", label: "Heading" },
          { name: "problemLead", type: "textarea", label: "Intro" },
          {
            name: "problemStages",
            type: "array",
            label: "Hand-offs (in order)",
            maxRows: 6,
            admin: { initCollapsed: true },
            fields: [
              { type: "row", fields: [{ name: "stage", type: "text", required: true }, { name: "icon", type: "select", options: ICONS }] },
              { name: "pain", type: "textarea", required: true, label: "What goes wrong", admin: { description: "One sentence, under 20 words." } },
            ],
          },
          { name: "problemBridge", type: "text", label: "Closing line", admin: { description: "Leads into the Target Suite, e.g. TARGET 360 joins every hand-off into one record." } },
        ],
      },
      {
        label: "Products",
        fields: [
          { name: "routeEyebrow", type: "text", label: "Small label above the stages heading" },
          { name: "routeTitle", type: "text", required: true },
          { name: "routeLead", type: "textarea" },
          {
            name: "route",
            type: "array",
            label: "Product flow (in order)",
            fields: [
              { type: "row", fields: [{ name: "stage", type: "text", required: true, label: "Product name on the button", admin: { description: "e.g. Target 360" } }, { name: "icon", type: "text", admin: { description: "tag, swatch, factory, clock, shield…" } }] },
              { type: "row", fields: [{ name: "headline", type: "text", label: "Short promise", admin: { description: "e.g. Win the order. Keep the margin." } }, { name: "tag", type: "text", label: "Stage label", admin: { description: "e.g. Sampling, Quality, Production" } }] },
              { name: "text", type: "textarea", label: "One line" },
              { name: "product", type: "relationship", relationTo: "products", required: true },
            ],
          },
          { name: "across", type: "array", label: "Across every stage", fields: [{ type: "row", fields: [{ name: "title", type: "text", required: true }, { name: "href", type: "text", required: true }, { name: "icon", type: "text" }] }, { name: "text", type: "textarea" }] },
          { name: "showcaseTitle", type: "text", label: "Dashboard showcase heading", admin: { description: "Leave empty to hide the dashboard showcase section on the home page." } },
          { name: "showcaseLead", type: "textarea" },
          { name: "showcaseImage", type: "upload", relationTo: "media", admin: { description: "Product dashboard screenshot. Leave empty to use the default." } },
          { name: "solutionsTitle", type: "text" },
          { name: "solutionsLead", type: "textarea" },
          { name: "aiTitle", type: "text" },
          { name: "aiLead", type: "textarea" },
          featuresField("aiPoints", "AI points"),
        ],
      },
      {
        label: "Proof",
        fields: [
          { name: "proofQuote", type: "textarea" },
          { name: "proofClient", type: "text" },
          { name: "proofCase", type: "relationship", relationTo: "case-studies" },
          { name: "storiesTitle", type: "text" },
          { name: "whyTitle", type: "text" },
          { name: "whyLead", type: "textarea", label: "Why ASK intro", admin: { description: "Two sentences beside the reasons. The rollout steps under it come from About page → How we implement." } },
          featuresField("why", "Why ASK Technology"),
          { type: "row", fields: [{ name: "ceoName", type: "text" }, { name: "ceoRole", type: "text" }] },
          { name: "ceoQuote", type: "textarea" },
        ],
      },
      {
        label: "FAQ and closing",
        fields: [
          { name: "faqTitle", type: "text" },
          faqsField(),
          { name: "insightsTitle", type: "text" },
          { name: "ctaTitle", type: "text" },
          { name: "ctaText", type: "textarea" },
        ],
      },
      { label: "SEO", fields: [seoGroup()] },
    ],
  },
]);

export const AboutPage = page("about-page", "About page", [
  { name: "title", type: "text", required: true, label: "Main heading (H1)" },
  { name: "accent", type: "text", label: "Gradient words in the heading", admin: { description: "Copy the exact words from the heading that should show in blue. Leave empty for none." } },
  { name: "lead", type: "textarea", required: true },
  { type: "row", fields: [{ name: "vision", type: "textarea" }, { name: "mission", type: "textarea" }] },
  { name: "ceoPhoto", type: "upload", relationTo: "media" },
  linesField("ceoBio", "CEO biography", "Each line becomes a paragraph."),
  featuresField("practices", "What we do"),
  featuresField("pillars", "Why choose us"),
  linesField("process", "How we implement (in order)"),
  featuresField("engagement", "Engagement model"),
  seoGroup(),
]);

export const AIPage = page("ai-page", "AI Solution page", [
  { name: "title", type: "text", required: true, label: "Main heading (H1)" },
  { name: "accent", type: "text", label: "Gradient words in the heading", admin: { description: "Copy the exact words from the heading that should show in blue. Leave empty for none." } },
  { name: "lead", type: "textarea", required: true },
  { name: "features", type: "array", fields: [{ type: "row", fields: [{ name: "icon", type: "text" }, { name: "title", type: "text", required: true }] }, { name: "text", type: "textarea" }, linesField("points", "Points")] },
  featuresField("benefits", "Benefits"),
  featuresField("audiences", "Who it is for"),
  faqsField(),
  seoGroup(),
]);

export const CareersPage = page("careers-page", "Careers page", [
  { name: "title", type: "text", required: true, label: "Main heading (H1)" },
  { name: "accent", type: "text", label: "Gradient words in the heading", admin: { description: "Copy the exact words from the heading that should show in blue. Leave empty for none." } },
  { name: "lead", type: "textarea" },
  linesField("why", "Why join us"),
  seoGroup(),
], "careers");

export const PartnerPage = page("partner-page", "Partner page", [
  { name: "title", type: "text", required: true, label: "Main heading (H1)" },
  { name: "accent", type: "text", label: "Gradient words in the heading", admin: { description: "Copy the exact words from the heading that should show in blue. Leave empty for none." } },
  { name: "lead", type: "textarea" },
  { name: "why", type: "array", fields: [{ name: "title", type: "text", required: true }, { name: "text", type: "textarea" }] },
  seoGroup(),
]);

export const ContactPage = page("contact-page", "Contact page", [
  { name: "title", type: "text", required: true, label: "Main heading (H1)" },
  { name: "accent", type: "text", label: "Gradient words in the heading", admin: { description: "Copy the exact words from the heading that should show in blue. Leave empty for none." } },
  { name: "lead", type: "textarea" },
  seoGroup(),
]);

export const DemoPage = page("demo-page", "Book a demo page", [
  { name: "title", type: "text", required: true, label: "Main heading (H1)" },
  { name: "accent", type: "text", label: "Gradient words in the heading", admin: { description: "Copy the exact words from the heading that should show in blue. Leave empty for none." } },
  { name: "lead", type: "textarea" },
  linesField("points", "What to expect"),
  seoGroup(),
]);

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Settings", hidden: ({ user }) => !hasModule(user as never, "settings") },
  access: { read: () => true, update: canEdit("settings") },
  hooks: { afterChange: [globalRefresh()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Company",
          fields: [
            { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "legalName", type: "text" }] },
            { name: "tagline", type: "text" },
            { name: "description", type: "textarea", admin: { description: "Default description for search engines and AI assistants." } },
            { name: "footerAbout", type: "textarea" },
            { name: "company", type: "group", label: "Registration details (used in legal pages)", fields: [{ name: "registeredName", type: "text" }, { type: "row", fields: [{ name: "cin", type: "text", label: "CIN / LLPIN" }, { name: "gstin", type: "text", label: "GSTIN" }] }] },
            { name: "stats", type: "array", label: "Headline numbers", maxRows: 4, fields: [{ type: "row", fields: [{ name: "value", type: "text", required: true }, { name: "label", type: "text", required: true }] }] },
          ],
        },
        {
          label: "Contact",
          fields: [
            { type: "row", fields: [{ name: "email", type: "email", required: true }, { name: "hrEmail", type: "email" }] },
            { type: "row", fields: [{ name: "phone", type: "text", required: true }, { name: "landline", type: "text" }, { name: "whatsapp", type: "text", admin: { description: "Number with country code, digits only" } }] },
            {
              name: "address",
              type: "group",
              fields: [
                { name: "street", type: "text" },
                { type: "row", fields: [{ name: "city", type: "text" }, { name: "region", type: "text" }, { name: "postalCode", type: "text" }, { name: "country", type: "text", defaultValue: "IN" }] },
              ],
            },
            { name: "mapUrl", type: "text" },
            { name: "hours", type: "text", label: "Opening hours" },
            { name: "social", type: "array", fields: [{ type: "row", fields: [{ name: "label", type: "select", options: ["LinkedIn", "YouTube", "Instagram", "Facebook", "X"], required: true }, { name: "url", type: "text", required: true }] }] },
            { name: "footerCountries", type: "array", label: "Footer countries line", fields: [{ type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "href", type: "text", required: true }] }] },
            { name: "grievance", type: "group", label: "Grievance Officer", fields: [{ type: "row", fields: [{ name: "name", type: "text" }, { name: "email", type: "email" }] }, { name: "address", type: "textarea" }] },
          ],
        },
        {
          label: "Trust and brochure",
          fields: [
            {
              name: "trust",
              type: "array",
              label: "Certifications and trust marks",
              maxRows: 6,
              admin: { description: "Only add what ASK actually holds, e.g. ISO 9001, ISO/IEC 27001, Startup India, NASSCOM member. Shown in the footer. Hidden while empty." },
              fields: [
                { type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "text", type: "text", admin: { description: "Optional short line, e.g. Information security" } }] },
                { name: "image", type: "upload", relationTo: "media", label: "Badge or logo (optional)" },
              ],
            },
            {
              name: "brochure",
              type: "group",
              label: "Brochure download",
              admin: { description: "Visitors leave their name and email to download it, and each download arrives in Leads. Hidden until a file is chosen." },
              fields: [
                { name: "title", type: "text", defaultValue: "Download the TARGET Suite brochure" },
                { name: "text", type: "textarea" },
                { name: "file", type: "upload", relationTo: "documents", label: "PDF" },
                { name: "fileUrl", type: "text", admin: { description: "Used only if no PDF is chosen above, e.g. /brochures/target-suite.pdf" } },
              ],
            },
          ],
        },
        {
          label: "Booking and tracking",
          fields: [
            { name: "calLink", type: "text", label: "Cal.com booking link", admin: { description: "The part after cal.com/, for example asktek/demo. Leave empty to show a demo request form instead." } },
            { name: "gtmId", type: "text", label: "Google Tag Manager ID", admin: { description: "GTM-XXXXXXX. GA4, Google Ads and conversion tags are set up inside GTM. Loads only after cookie consent." } },
            { name: "linkedinPartnerId", type: "text", label: "LinkedIn Insight Tag partner ID" },
            { name: "googleVerification", type: "text", label: "Google Search Console verification code" },
            { name: "bingVerification", type: "text", label: "Bing Webmaster verification code" },
          ],
        },
      ],
    },
  ],
};

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Menus",
  admin: { group: "Settings", hidden: ({ user }) => !hasModule(user as never, "settings"), description: "Product, solution and industry menus update automatically from their collections. Add extra footer columns here." },
  access: { read: () => true, update: canEdit("settings") },
  hooks: { afterChange: [globalRefresh()] },
  fields: [
    link("headerCta", "Header button"),
    {
      name: "footerColumns",
      type: "array",
      label: "Footer columns",
      admin: { description: "Leave empty to use the automatic footer." },
      fields: [{ name: "title", type: "text", required: true }, { name: "links", type: "array", fields: [{ type: "row", fields: [{ name: "label", type: "text", required: true }, { name: "href", type: "text", required: true }] }] }],
    },
  ],
};
