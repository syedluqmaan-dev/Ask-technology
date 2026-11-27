import type { Settings } from "@/lib/types";

/** Default site settings. Editable in CMS → Settings → Site settings. */
export const settings: Settings = {
  name: "ASK Technology",
  legalName: "ASK Technology",
  url: (process.env.NEXT_PUBLIC_SERVER_URL || "https://www.asktek.net").replace(/\/$/, ""),
  tagline: "Garment ERP software for manufacturers, exporters and buying houses",
  description:
    "ASK Technology builds TARGET 360, the garment ERP software used by apparel manufacturers, exporters, buying houses and fashion brands to run costing, sampling, production, quality and shipment in one system.",
  email: "sales@asktek.net",
  hrEmail: "hr@asktek.net",
  phone: "+91 98408 99559",
  landline: "044-45034080",
  whatsapp: "919840899559",
  address: {
    street: "#36, 2nd Floor, Railway Border Road, opp. Kodambakkam Railway Station, Kodambakkam",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600024",
    country: "IN",
  },
  mapUrl: "https://maps.google.com/?q=ASK+Technology+Kodambakkam+Chennai",
  hours: "",
  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/company/askteksolutions" },
    { label: "YouTube", url: "https://www.youtube.com/@asktechnology4871" },
    { label: "Instagram", url: "https://www.instagram.com/targetbyasktek" },
  ],
  footerAbout:
    "ASK Technology builds Target 360°, the AI-powered ERP for garment manufacturers, exporters, buying houses and fashion brands. One total enterprise solution, from enquiry to shipment.",
  footerCountries: [
    { label: "UK", href: "/locations/united-kingdom" },
    { label: "BANGLADESH", href: "/locations/bangladesh" },
    { label: "INDIA", href: "/locations/india" },
    { label: "SRI LANKA", href: "/locations/sri-lanka" },
    { label: "DUBAI", href: "/locations/uae" },
  ],
  stats: [
    { value: "20+", label: "Years of IT solutions" },
    { value: "50+", label: "Satisfied apparel manufacturers and exporters" },
    { value: "100+", label: "Projects delivered" },
  ],
  calLink: "",
  gtmId: "",
  linkedinPartnerId: "",
  googleVerification: "",
  bingVerification: "",
  grievance: {
    name: "[Grievance Officer name]",
    email: "grievance@asktek.net",
    address: "ASK Technology, #36, 2nd Floor, Railway Border Road, Kodambakkam, Chennai 600024, Tamil Nadu, India",
  },
  company: { registeredName: "[Registered company name]", cin: "", gstin: "" },
  // Filled in from the CMS once ASK confirms what it holds. Nothing is shown while empty.
  trust: [],
  brochure: undefined,
};
