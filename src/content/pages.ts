import type { Faq, Feature, IconName } from "@/lib/types";

/** Page copy defaults. Each block is editable in CMS → Website pages. */

export type HomeContent = {
  heroPill: { label: string; href: string };
  heroTitle: string;
  /** Words of the heading shown in the blue gradient. Must appear in heroTitle. */
  heroAccent: string;
  heroLead: string;
  heroPoints: string[];
  heroPrimary: { label: string; href: string };
  heroSecondary: { label: string; href: string };
  heroNote: string;
  clientsTitle: string;
  /** Chapter 01 of the home page story: where an order loses money without one system. */
  problemTitle?: string;
  problemLead?: string;
  problemStages?: { stage: string; pain: string; icon: IconName }[];
  problemBridge?: string;
  routeTitle: string;
  routeLead: string;
  /** Home page product flow. `stage` is the product name shown on its button; `headline` is the short promise. */
  route: { stage: string; headline?: string; tag?: string; text: string; product: string; icon: IconName }[];
  routeEyebrow: string;
  across: { title: string; text: string; href: string; icon: IconName }[];
  showcaseTitle: string;
  showcaseLead: string;
  solutionsTitle: string;
  solutionsLead: string;
  aiTitle: string;
  aiLead: string;
  aiPoints: Feature[];
  proofQuote: string;
  proofClient: string;
  proofCase: string;
  storiesTitle: string;
  whyTitle: string;
  /** Short intro beside the reasons. */
  whyLead?: string;
  why: Feature[];
  ceoQuote: string;
  ceoName: string;
  ceoRole: string;
  faqTitle: string;
  faqs: Faq[];
  insightsTitle: string;
  ctaTitle: string;
  ctaText: string;
  seo: { title: string; description: string };
};

export const home: HomeContent = {
  heroPill: { label: "AI-Powered Apparel ERP", href: "/ai-solution" },
  heroTitle: "Garment ERP software that runs every order from enquiry to shipment",
  heroAccent: "from enquiry to shipment",
  heroLead:
    "An AI-powered garment ERP built for the complete lifecycle. From order and costing to production and shipment, manage everything in one intelligent platform. Reduce costs, improve productivity and predict problems.",
  heroPoints: ["AI-powered", "Apparel-focused", "Built for growth"],
  heroPrimary: { label: "Book a free demo", href: "/book-a-demo" },
  heroSecondary: { label: "Explore products", href: "/products" },
  heroNote: "",
  clientsTitle: "",
  problemTitle: "One order passes through six teams. Every hand-off is a chance to lose money.",
  problemLead: "Most garment businesses still run the order on spreadsheets, email and WhatsApp. These are the moments where time and margin quietly disappear.",
  problemStages: [
    { stage: "Enquiry and costing", pain: "Quotes built on last month's rates. The order is won and the margin is lost.", icon: "tag" },
    { stage: "Sampling", pain: "Three tech pack versions in email, and the sample is sewn from the wrong one.", icon: "swatch" },
    { stage: "Sourcing", pain: "Fabric and trim rates agreed by phone, with nothing to show the buyer.", icon: "chain" },
    { stage: "Production", pain: "Hourly output written on paper and typed up the next day.", icon: "clock" },
    { stage: "Quality", pain: "Paper checklists, and no signal on the factory floor.", icon: "shield" },
    { stage: "Shipment", pain: "A late order found when the buyer calls, when air freight is the only fix.", icon: "truck" },
  ],
  problemBridge: "TARGET 360 joins every hand-off into one record.",
  routeEyebrow: "From order to the shipment",
  routeTitle: "Target Suite: One Software for the Apparel Value Chain",
  // Direct answer (40–60 words) for Google featured snippets and AI assistants.
  routeLead:
    "TARGET 360 is a suite of garment ERP software from ASK Technology for apparel manufacturers, exporters, buying houses and fashion brands. Five connected products cover costing and orders, sampling, quality inspection, buying house management and production, all on one database, so you can start with one product and add the rest as you grow.",
  route: [
    { stage: "Target 360", headline: "Win the order. Keep the margin.", text: "Run costing, sampling, orders, and shipment in one system.", tag: "Order to shipment", product: "garment-erp-knit-woven", icon: "factory" },
    { stage: "Target 360 Brands", headline: "From sample to style, faster.", text: "Track samples, tech packs, and approvals for retail and local brands.", tag: "Sampling", product: "garment-erp-brands", icon: "swatch" },
    { stage: "Target Inspection On Go", headline: "Inspect anywhere. Report instantly.", text: "Garment and fabric quality checks, online or offline, with PDF reports.", tag: "Quality", product: "garment-inspection-software", icon: "shield" },
    { stage: "Target BMS", headline: "Buyers, factories, margins. One view.", text: "Run your buying house from costing to payment.", tag: "Sourcing", product: "buying-house-management", icon: "tag" },
    { stage: "Quick OB", headline: "Plan the line. Track every hour.", text: "Plan operation bulletins, calculate SMV, and track production live.", tag: "Production", product: "operation-bulletin-quick-ob", icon: "clock" },
  ],
  across: [
    { title: "TARGET 360 HRMS", text: "Handle attendance, payroll and staff records with less effort.", href: "/products/target-360-hrms", icon: "users" },
  ],
  // Removed from the home page at the client's request. Write a heading in the CMS to show the section again.
  showcaseTitle: "",
  showcaseLead: "Enquiries, costing, approvals, buyers and markup, live in TARGET 360. This is the real product your team will use.",
  solutionsTitle: "Built for the way your business works",
  solutionsLead: "Pick your business type to see the products made for it, and the real screens your team will use.",
  aiTitle: "Making fashion operations smarter with AI",
  aiLead: "One AI platform from design to delivery, with live data to help you plan, track and grow.",
  aiPoints: [
    { icon: "spark", title: "AI-powered operations", text: "Smart search and side-by-side comparison of styles, costs and suppliers." },
    { icon: "invoice", title: "AI data conversion", text: "Buyer PDF techpacks turned into BOMs, measurements and materials." },
    { icon: "chart", title: "Smarter sales", text: "Checks capacity, estimates cost and margin, links orders to production." },
    { icon: "target", title: "Intelligent planning", text: "Automatic scheduling and live WIP from cutting to shipment." },
  ],
  proofQuote: "",
  proofClient: "",
  proofCase: "",
  storiesTitle: "Garment businesses running on TARGET 360",
  whyTitle: "Technology that understands the factory floor",
  whyLead:
    "ASK Technology designs, implements and supports TARGET 360 itself. Before anything is configured, we learn your orders, your teams and the systems you use today.",
  why: [
    { icon: "factory", title: "Made for apparel, nothing else", text: "Styles, colourways, size ratios, BOMs, SMV, AQL and T&A are built into every screen. Your team never has to translate the garment business into generic ERP terms." },
    { icon: "layers", title: "Fitted to how you already work", text: "We configure TARGET 360 around your existing process, from a single factory to a buying house with many vendors, instead of asking your teams to change theirs." },
    { icon: "target", title: "One dedicated team for your rollout", text: "An ASK team plans your implementation, sets it up and tests it with your real orders before anyone depends on it." },
    { icon: "users", title: "Every desk trained", text: "Merchandisers, planners, QA and management each get training on their own screens, so the system is used, not just installed." },
    { icon: "mobile", title: "On every device your teams carry", text: "Web, tablet and phone, with a dashboard for each role: in the office, on the floor or at a supplier's unit." },
    { icon: "shield", title: "Still here after launch day", text: "Technical support, updates and improvements continue after go-live, and the system grows with your business." },
  ],
  ceoQuote: "Our ERP is customisable for all apparel manufacturers to buying houses.",
  ceoName: "Mohammed Salahuddin",
  ceoRole: "Founder & CEO, ASK Technology",
  faqTitle: "Questions garment businesses ask us",
  faqs: [
    { q: "What is garment ERP software?", a: "Garment ERP software connects everything an apparel business does around an order: costing, sampling, purchase, stores, production, quality, shipping and accounts. Unlike general ERP, it understands colourways, size ratios, SMV, cut-to-pack and buyer inspections." },
    { q: "Who is TARGET 360 for?", a: "Garment manufacturers, exporters, buying houses and fashion brands. Each has products made for it: TARGET 360 ERP and Quick OB for factories, Target BMS and Inspection On Go for buying houses, and TARGET 360 for Brands for product development." },
    { q: "Can we start with one module?", a: "Yes. Every product works on its own and shares one database with the rest, so you can start with, for example, Quick OB or Inspection On Go and add the ERP later." },
    { q: "Is TARGET 360 cloud-based?", a: "Yes. TARGET 360 runs in the cloud on web and mobile. Inspection On Go also works offline and syncs when the device reconnects." },
    { q: "How do we get a price?", a: "Pricing depends on the modules, users and units you need. Book a demo and we will walk through your process and send a proposal." },
  ],
  insightsTitle: "Ideas for running a smarter garment business",
  ctaTitle: "See TARGET 360 running on your own workflow",
  ctaText: "Book a live demo with a product specialist. Our team replies on WhatsApp, typically within 1 hour.",
  seo: {
    title: "Garment ERP Software for Apparel Manufacturers | TARGET 360",
    description:
      "TARGET 360 garment ERP by ASK Technology: costing, sampling, production planning, SMV, quality inspection and export invoicing in one system. Book a demo.",
  },
};

export const about = {
  title: "Empowering businesses with innovative solutions",
  accent: "innovative solutions",
  lead:
    "We are more than an IT services company. ASK Technology is your partner in using technology to drive innovation and growth, with solutions built around your unique needs, led by TARGET 360, our ERP for the textile and garment industry.",
  vision:
    "A future where innovation and technology empower businesses to reach their full potential, driving digital transformation across industries.",
  mission:
    "To empower businesses with transformative technology that drives efficiency and growth, so our clients thrive in a fast-changing digital world.",
  ceoBio: [
    "A seasoned entrepreneur and IT professional with over 20 years of experience, Mohammed founded ASK Technology to solve the critical bottlenecks he saw in apparel manufacturing. His blend of IT and apparel manufacturing expertise bridges the gap between technology and production.",
    "Our mission is to empower the fashion industry by improving efficiency, reducing waste and increasing productivity through software that gives garment businesses a real competitive advantage.",
  ],
  practices: [
    { icon: "factory" as IconName, title: "Business growth", text: "ERP products for the textile, garment and rental management industries that streamline operations and catalyse growth." },
    { icon: "chart" as IconName, title: "IT consulting", text: "Strategic planning that aligns technology with your business objectives for efficiency and performance." },
  ],
  pillars: [
    { icon: "spark" as IconName, title: "Innovation at the core", text: "From cutting-edge solutions to the latest technologies, we keep your business ahead." },
    { icon: "layers" as IconName, title: "Tailored solutions, every time", text: "Thorough contextual research and 360° planning for how your business runs." },
    { icon: "users" as IconName, title: "Proven expertise", text: "More than 20 years of experience delivering IT solutions." },
    { icon: "chain" as IconName, title: "Client-centric approach", text: "Open communication with your team at every step." },
    { icon: "box" as IconName, title: "End-to-end services", text: "Strategic UI/UX assessment, wireframing and prototyping through to delivery." },
    { icon: "shield" as IconName, title: "Commitment to excellence", text: "High quality standards in every product and project." },
  ],
  process: [
    "Discover your orders, teams and current systems",
    "Plan products, data and timelines together",
    "Configure TARGET 360 to your workflows",
    "Test with real orders",
    "Go live with training and support",
  ],
  engagement: [
    { icon: "target" as IconName, title: "Project management", text: "A dedicated team that plans and runs your implementation." },
    { icon: "shield" as IconName, title: "Quality assurance", text: "Testing with real orders before go-live." },
    { icon: "clock" as IconName, title: "Post-launch maintenance", text: "Updates and improvements after you go live." },
    { icon: "users" as IconName, title: "Technical support", text: "Help when your team needs it." },
    { icon: "chart" as IconName, title: "Consulting services", text: "Process and technology advice for apparel businesses." },
    { icon: "spark" as IconName, title: "Training and workshops", text: "Every role trained to get value from TARGET 360." },
  ],
  seo: {
    title: "About ASK Technology | Makers of TARGET 360 Garment ERP",
    description:
      "ASK Technology is an IT company with 20+ years of experience, building TARGET 360, the AI-powered ERP for garment manufacturers, exporters, buying houses and brands.",
  },
};

export const ai = {
  title: "Making fashion operations smarter with AI",
  accent: "smarter with AI",
  lead: "TARGET 360 is an AI platform that covers design through delivery in one system, with live data to help you plan, track and grow.",
  benefits: [
    { icon: "clock" as IconName, title: "Faster decisions", text: "AI forecasts trends, manages inventory and helps you respond quickly." },
    { icon: "wallet" as IconName, title: "Lower costs", text: "Routine work is automated and waste is cut." },
    { icon: "target" as IconName, title: "Demand accuracy", text: "Better forecasts, so fewer market chances are missed." },
    { icon: "spark" as IconName, title: "Future ready", text: "Data-driven insights that help you adapt to change." },
  ],
  features: [
    { icon: "spark" as IconName, title: "AI-powered operations", text: "Find anything fast and reuse what you already have.", points: ["Smart search across the ERP", "Side-by-side comparison of styles, costs and suppliers", "Reuse of existing data"] },
    { icon: "invoice" as IconName, title: "AI data conversion", text: "Buyer PDF techpacks become structured ERP data.", points: ["Bills of materials extracted automatically", "Measurements captured into charts", "Materials listed and ready to cost"] },
    { icon: "chart" as IconName, title: "Smarter sales", text: "Quote with confidence before you commit.", points: ["Checks availability and capacity", "Estimates cost and margin", "Links sales orders to production"] },
    { icon: "target" as IconName, title: "Intelligent planning", text: "Plans that adjust as the floor changes.", points: ["Automatic scheduling and live adjustments", "Tracking of WIP and bottlenecks", "Visibility from cutting to shipment"] },
  ],
  audiences: [
    { icon: "swatch" as IconName, title: "Fashion brands", text: "Design-to-delivery management with real-time visibility." },
    { icon: "factory" as IconName, title: "Apparel manufacturers", text: "Production, capacity and quality planning." },
    { icon: "layers" as IconName, title: "Textile mills", text: "Tracking of fabric production, dyeing and finishing." },
    { icon: "store" as IconName, title: "Fashion retailers and chains", text: "Unified operations across stores, channels and locations." },
  ],
  faqs: [
    { q: "What does AI do in a garment ERP?", a: "In TARGET 360, AI converts buyer techpacks into BOMs and measurement charts, schedules production and flags orders at risk of missing their ship date, checks capacity and margin before you quote, and searches across styles, costs and suppliers." },
    { q: "Does the AI use our data to train public models?", a: "TARGET 360 AI works on your company's data inside your TARGET 360 environment. Ask our team for the data-handling details for your deployment." },
    { q: "Do we need clean data before using AI?", a: "No. You can start with the data you already have in TARGET 360. AI output, such as an extracted BOM, is always reviewed by your team before it is used." },
  ],
  seo: {
    title: "AI-Powered Garment ERP | TARGET 360 AI",
    description:
      "TARGET 360 AI converts techpacks to BOMs, schedules production, flags late orders and checks margin before you quote. AI inside your garment ERP.",
  },
};

export const careers = {
  title: "Build software that runs garment businesses",
  accent: "runs garment businesses",
  lead: "We are looking for talented people to join our team. At ASK Technology you work in a dynamic, innovative environment where your ideas are valued and your growth is supported.",
  why: [
    "Work on products used daily by garment factories, exporters and buying houses",
    "Learn both technology and the apparel industry",
    "A team where your ideas shape the product",
  ],
  seo: { title: "Careers at ASK Technology | Build TARGET 360", description: "Open roles at ASK Technology in Chennai. Build TARGET 360, the ERP used by garment manufacturers, exporters and buying houses." },
};

export const partner = {
  title: "Together, the possibilities are endless",
  accent: "",
  lead: "Join the ASK Technology partner programme to grow together and build collaborations that create mutual success and lasting value.",
  why: [
    { title: "Get new clients", text: "Offer TARGET 360 to garment businesses you already serve." },
    { title: "Reach new markets", text: "Take a proven apparel ERP into new regions and segments." },
    { title: "Grow your company", text: "Add a recurring product line to your services." },
    { title: "Boost connections", text: "Work alongside our team and other partners." },
    { title: "Strengthen your network", text: "Be part of the TARGET 360 ecosystem across the apparel industry." },
    { title: "Make money", text: "Earn on every client you bring and support." },
  ],
  seo: { title: "Partner with ASK Technology | TARGET 360 Partners", description: "Join the TARGET 360 partner programme. Offer garment ERP to your clients with implementation and support from ASK Technology." },
};

export const contact = {
  title: "We are here to help you",
  accent: "",
  lead: "Questions about TARGET 360, pricing or support? Call, write or send us a message.",
  seo: { title: "Contact ASK Technology, Chennai | TARGET 360", description: "Contact ASK Technology in Kodambakkam, Chennai. Call +91 98408 99559, email sales@asktek.net or send a message." },
};

export const bookDemo = {
  title: "Book your TARGET 360 demo",
  accent: "",
  lead: "A live walkthrough of TARGET 360 on a workflow like yours, with a product specialist from ASK Technology.",
  points: [
    "30-minute online demo, at a time that suits you",
    "Focused on the products you choose",
    "Confirmation by email and WhatsApp",
    "Reschedule any time by replying to us",
  ],
  seo: { title: "Book a Free Garment ERP Demo | TARGET 360", description: "Book a free 30-minute TARGET 360 demo. See costing, planning, inspection and invoicing on a garment order like yours." },
};
