/**
 * Customer quotes from the old asktek.net website manager (Client reviews).
 * Loaded into CMS → Customers → Testimonials by `npm run import:legacy`, with the company logo as the photo.
 *
 * Only first-person quotes are included. The old "reviews" that were third-person case-study text are left out:
 * those stories are already in Customer stories. Quotes marked `draft: true` are imported unpublished for ASK to
 * confirm (duplicate wording, no named person, or a business outside apparel).
 */
export type LegacyTestimonial = {
  quote: string;
  name: string;
  role?: string;
  company: string;
  /** File in /public/cms/review/ */
  logo: string;
  products: string[];
  showOnHome: boolean;
  draft?: boolean;
};

const logo = (file: string) => `/cms/review/${file}`;

export const legacyTestimonials: LegacyTestimonial[] = [
  {
    quote: "We needed a cloud-native platform with real-time visibility, intuitive usability, and seamless integrations, something that could scale with our highly ambitious digital roadmap.",
    name: "Guru Rangi", role: "Managing Director", company: "Harpa Retail Private Limited",
    logo: logo("LogoFileName_1788245671324.png"), products: ["garment-erp-brands"], showOnHome: true,
  },
  {
    quote: "TARGET ERP has provided us tremendous benefits over the past seven to eight years. The team’s involvement from implementation to post-implementation support has been exceptional.",
    name: "Niyaz", role: "Managing Director", company: "Beeku Exports Pvt Ltd",
    logo: "/cms/partner/beeku-exports.png", products: ["garment-erp-knit-woven"], showOnHome: true,
  },
  {
    quote: "We have been using Ask Technology's Buying House Management Software for over five years, and it has significantly streamlined our operations. The team at Ask Technology has been incredibly supportive.",
    name: "Mohammed Fahad", role: "Merchandiser", company: "SNQS International Pvt Ltd",
    logo: logo("LogoFileName_1738331677678.png"), products: ["buying-house-management"], showOnHome: true,
  },
  {
    quote: "Connoisseur Fashions has been using Ask Technology's ERP solution for a while now, and we’ve seen a remarkable transformation in our operations. The support from Ask Technology has been exceptional.",
    name: "Babu", role: "Manager", company: "Connoisseur Fashions",
    logo: logo("LogoFileName_1743163433723.jpg"), products: ["garment-erp-knit-woven"], showOnHome: true,
  },
  {
    quote: "With integrated software like Target ERP, you can do your processes faster, place orders faster and track your materials faster. This helps us service our customers much better.",
    name: "Bhagayam Exports", company: "Bhagayam Exports",
    logo: logo("LogoFileName_1747036692790.jpg"), products: ["garment-erp-knit-woven"], showOnHome: true,
  },
  {
    quote: "Target ERP allows us to capture all requests, entries, and other activities, properly monitoring them through the system, so we can get in-depth reports about our processes.",
    name: "Royal Stitch", company: "Royal Stitch",
    logo: logo("LogoFileName_1746513441387.jpeg"), products: ["garment-erp-knit-woven"], showOnHome: true,
  },

  // ── Imported as drafts for ASK to confirm ──
  {
    quote: "We've been partnering with Ask Technology for years, and they continue to exceed our expectations. Their ERP solutions have revolutionized our manufacturing processes, improving efficiency and profitability. Truly a trusted partner!",
    name: "Vijay Garments", company: "Vijay Garments",
    logo: logo("LogoFileName_1725887141705.png"), products: ["garment-erp-knit-woven"], showOnHome: false, draft: true,
  },
  {
    // Same wording as the Beeku Exports quote on the old site.
    quote: "Target ERP has provided us tremendous benefits over the past seven to eight years. The team’s involvement from implementation to post-implementation support has been exceptional.",
    name: "Antim Group", company: "Antim Group",
    logo: logo("LogoFileName_1747036425678.png"), products: [], showOnHome: false, draft: true,
  },
  {
    quote: "As a long-time user of Ask Technology’s TCMS – Target Courier Management Software, I can confidently say it has transformed our operations. TCMS has been a game-changer for us over the past 10 years.",
    name: "Ramanan Gnaneswaran", role: "Head Manager", company: "Teeparam International Courier Service",
    logo: logo("LogoFileName_1738331592845.png"), products: [], showOnHome: false, draft: true,
  },
  {
    quote: "Mohammed Salahuddin’s specialization in IT solutions for the apparel industry, combined with his experience as a coach and consultant, showcases his strategic thinking, leadership, and innovation.",
    name: "Ajit Dhedhi", role: "Managing Director", company: "Officebazzar E-Store Private Limited",
    logo: logo("LogoFileName_1738331790070.jpg"), products: [], showOnHome: false, draft: true,
  },
  {
    quote: "Ask Technology has been pivotal in helping us stay ahead in a competitive market. Their tailored technology solutions have enhanced our operations and customer service, driving growth and success. Highly impressed and satisfied!",
    name: "Prince Jewellers", company: "Prince Jewellers",
    logo: logo("LogoFileName_1725887292158.jpg"), products: [], showOnHome: false, draft: true,
  },
  {
    quote: "Working with Ask Technology has been a game-changer for our business. Their innovative solutions and dedicated support have helped us streamline operations and enhance customer experiences. Highly recommend!",
    name: "GRT Jewellers", company: "GRT Jewellers",
    logo: logo("LogoFileName_1725886967556.png"), products: [], showOnHome: false, draft: true,
  },
];

/** Product brochures from the old website manager, in /public/brochures/. */
export const legacyBrochures: { title: string; file: string }[] = [
  // The old site linked this one PDF from Garment ERP, Retailers and AI Solutions.
  { title: "TARGET Garment ERP brochure", file: "/brochures/target-garment-erp.pdf" },
  { title: "Buying House Management (TARGET BMS) brochure", file: "/brochures/buying-house-management.pdf" },
  { title: "Inspection On Go brochure", file: "/brochures/inspection-on-go.pdf" },
  { title: "Quick OB (Operation Bulletin) brochure", file: "/brochures/quick-ob.pdf" },
  { title: "TARGET HRMS, HR & Payroll brochure", file: "/brochures/target-hrms.pdf" },
];
