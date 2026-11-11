export type Feature = { title: string; text: string; icon: IconName };
export type Faq = { q: string; a: string };
export type IconName =
  | "order" | "chain" | "box" | "shield" | "factory" | "wallet" | "invoice" | "cloud" | "offline" | "spark"
  | "chart" | "users" | "lock" | "clock" | "target" | "truck" | "tag" | "swatch" | "layers" | "mobile" | "bell" | "store";

export type Product = {
  slug: string;
  code: string;
  name: string;
  brand: string;
  shortName: string;
  stage: string;
  audience: "manufacturers" | "buyingHouses";
  audienceLabel: string;
  image: string;
  headline: string;
  tagline: string;
  intro: string;
  highlights: string[];
  features: Feature[];
  roles?: { title: string; points: string[] }[];
  benefits?: { title: string; text: string }[];
  steps?: string[];
  faqs: Faq[];
  fit: { manufacturers: boolean; buyingHouses: boolean; exporters: boolean; brands: boolean };
  related: string[];
  legacyPath: string;
};

/** ASK Technology's TARGET products. Copy is taken from asktek.net. */
export const products: Product[] = [
  {
    slug: "garment-erp-knit-woven",
    code: "ERP",
    name: "Garment ERP for Knit & Woven",
    brand: "TARGET ERP",
    shortName: "TARGET ERP",
    stage: "Planning & export",
    audience: "manufacturers",
    audienceLabel: "For manufacturers and exporters",
    image: "/assets/images/projects/erp-mockup.png",
    headline: "Unleashing excellence in textile & garment manufacturing",
    tagline: "Streamline production, optimise inventory and simplify export documentation.",
    intro:
      "TARGET is a comprehensive ERP for textile and garment manufacturers and exporters. It streamlines production processes, optimises inventory management and simplifies export documentation, so your operations align with global standards.",
    highlights: ["Order to invoice in one system", "Multi-location inventory", "Real-time production tracking", "Export-ready documentation"],
    features: [
      { icon: "order", title: "Order processing", text: "Handle customer orders and fulfilment, including invoices, packing slips and shipping labels." },
      { icon: "chain", title: "Supply chain integration", text: "Collaborate with suppliers and distributors: track shipments, manage supplier performance and optimise procurement." },
      { icon: "box", title: "Inventory management", text: "Forecast to minimise stock-outs, manage multi-location warehouses and monitor material movements." },
      { icon: "shield", title: "Quality control", text: "Capture and analyse quality data throughout production to improve product quality and compliance." },
      { icon: "factory", title: "Production management", text: "Real-time monitoring and scheduling across raw materials, work-in-progress and finished goods." },
      { icon: "wallet", title: "Financial management", text: "Automate invoicing, billing and payments, with profit and loss statements and balance sheets." },
      { icon: "invoice", title: "Commercial invoicing", text: "Professional invoices tailored to global buyers' requirements, for smooth transactions and compliance." },
    ],
    faqs: [
      { q: "What does TARGET ERP do for textile and garment companies?", a: "TARGET connects orders, supply chain, inventory, quality, production, finance and commercial invoicing in one system built for textile and garment manufacturers and exporters." },
      { q: "Does TARGET ERP include inventory management?", a: "Yes. It forecasts requirements to minimise stock-outs, manages multi-location warehouses and tracks material movements from receipt to finished goods." },
      { q: "Can TARGET ERP handle textile production processes?", a: "Yes. Production management covers raw materials, work-in-progress and finished goods with real-time monitoring and scheduling." },
      { q: "Does it help with export documentation?", a: "Yes. Commercial invoicing produces invoices and documents tailored to the requirements of global buyers." },
    ],
    fit: { manufacturers: true, buyingHouses: false, exporters: true, brands: false },
    related: ["operation-bulletin-quick-ob", "garment-inspection-software", "buying-house-management"],
    legacyPath: "/erp-for-textiles-and-garments",
  },
  {
    slug: "buying-house-management",
    code: "BMS",
    name: "Buying House Management",
    brand: "Target BMS",
    shortName: "Target BMS",
    stage: "Costing & sourcing",
    audience: "buyingHouses",
    audienceLabel: "For buying houses",
    image: "/assets/images/projects/bms-mockup.png",
    headline: "Streamline vendor collaboration with Target BMS",
    tagline: "Enhance communication and simplify vendor collaboration.",
    intro:
      "Target BMS is a comprehensive business management solution for buying houses. Its modules cover buyer costing, factory orders, time and action planning, inspections, vendor bidding, invoicing and accounts, so you manage everything from orders to finances in one place.",
    highlights: ["Buyer costing and vendor bidding", "Offline inspection audits", "Projected profit on every order", "Outlet management dashboard"],
    features: [
      { icon: "tag", title: "Buyer costing", text: "Create and customise garment costs to match buyer requirements and keep pricing competitive." },
      { icon: "order", title: "Factory order", text: "Structure factory orders on trading or commission bases, with a Projected Profit report for merchandisers and management." },
      { icon: "clock", title: "Time and action planning", text: "Compare planned and actual dates to keep every delivery on time." },
      { icon: "offline", title: "Inspection audits", text: "QA teams inspect in factories without internet; data is captured locally and uploaded later." },
      { icon: "invoice", title: "Commercial invoicing", text: "Invoices tailored to the requirements of global buyers." },
      { icon: "wallet", title: "Financial vouchers", text: "Receipts, payments, credit and debit notes and journals for buyers, factories, suppliers and forwarders." },
      { icon: "target", title: "Vendor bidding", text: "Online bidding to set fabric and accessory costs and margins." },
      { icon: "chart", title: "Vendor quotation and evaluation", text: "Vendors submit bids directly and compare them with other quotes." },
      { icon: "lock", title: "Log-based buyer access", text: "Log-based access controls guard against unauthorised use." },
      { icon: "store", title: "Outlet management dashboard", text: "Oversee every outlet from one interface with real-time reporting." },
    ],
    benefits: [
      { title: "MIS analysis reports", text: "Business insights for informed decisions." },
      { title: "Sales analysis", text: "Examine sales data to refine your strategy." },
      { title: "Email alerts and reminders", text: "Notifications for upcoming deadlines and commitments." },
      { title: "Vendor registration and fabric bidding", text: "Streamlined vendor management and material procurement." },
      { title: "Factory contract expiry alerts", text: "Contract renewals flagged before they lapse." },
      { title: "Financial accounting and POS", text: "Financial transactions managed within point-of-sale operations." },
    ],
    steps: ["Buyer costing", "Vendor bidding", "Factory order", "Time and action", "Inspection audit", "Invoice and vouchers"],
    faqs: [
      { q: "Can QA teams inspect in factories without internet?", a: "Yes. Inspection audit data is stored on the device and uploaded to Target BMS when a connection is available." },
      { q: "Does it handle trading and commission orders?", a: "Yes. Factory orders can be structured on a trading or commission basis, with a Projected Profit report for merchandisers and management." },
      { q: "Can vendors submit their quotations online?", a: "Yes. Vendors register, submit bids directly and can compare them with other quotes during online bidding." },
      { q: "Can I manage several outlets from one place?", a: "Yes. The Outlet Management Dashboard shows every outlet in one interface, with real-time reporting and hierarchical access control." },
    ],
    fit: { manufacturers: false, buyingHouses: true, exporters: true, brands: true },
    related: ["garment-inspection-software", "garment-erp-brands", "garment-erp-knit-woven"],
    legacyPath: "/buying_house_management",
  },
  {
    slug: "garment-inspection-software",
    code: "IOG",
    name: "Garment Inspection Software",
    brand: "TARGET Inspection On Go",
    shortName: "Inspection On Go",
    stage: "Quality",
    audience: "buyingHouses",
    audienceLabel: "For QA teams, buying houses and factories",
    image: "/assets/images/projects/iog-mockup.png",
    headline: "Tailored for garment industry quality",
    tagline: "Manage quality control effectively, reduce defects, and ensure every product meets your highest quality standards.",
    intro:
      "Inspection On Go streamlines garment inspection from order creation to quality checks. Real-time monitoring, offline capability and mobile access help manufacturers and QA teams keep standards high, even in remote or disconnected factories.",
    highlights: ["Works offline, syncs later", "Web and mobile", "Configurable quality checks", "Real-time MIS"],
    features: [
      { icon: "order", title: "Buyer order management", text: "Handle every buyer order from first enquiry to order creation." },
      { icon: "offline", title: "Inspection audits, offline", text: "QA inspects in the factory without internet; data is captured locally and uploaded once online." },
      { icon: "lock", title: "Access control management", text: "Multi-level access so only authorised people see sensitive data, from anywhere via the cloud." },
      { icon: "chart", title: "Real-time reporting with Target MIS", text: "End-to-end traceability from buyer order to factory order and inspection status, summarised or in detail." },
      { icon: "shield", title: "Configurable quality checks", text: "Set up the inspection types each product needs so every item is checked for defects." },
      { icon: "mobile", title: "Web and mobile, in sync", text: "Inspect on mobile, review on the web; the sync feature keeps every record up to date with no data loss." },
    ],
    faqs: [
      { q: "What is TARGET Inspection On Go?", a: "A garment inspection solution covering buyer orders, factory orders, inspection audits and real-time MIS reporting, on web and mobile." },
      { q: "Is it available on mobile devices?", a: "Yes. Inspections are done on mobile and the data is available on the web platform after syncing." },
      { q: "Can it work without an internet connection?", a: "Yes. Inspections are recorded offline and synced automatically once the device is back online, with no data loss." },
      { q: "Does it provide real-time inspection reports?", a: "Yes. Target MIS gives real-time, end-to-end traceability from buyer order to factory order and inspection status." },
    ],
    fit: { manufacturers: true, buyingHouses: true, exporters: true, brands: true },
    related: ["buying-house-management", "garment-erp-knit-woven", "garment-erp-brands"],
    legacyPath: "/garment_inspection_softwares",
  },
  {
    slug: "garment-erp-brands",
    code: "PLM",
    name: "Garment ERP for Brands",
    brand: "TARGET Garments Sampling",
    shortName: "ERP for Brands",
    stage: "Sampling & development",
    audience: "buyingHouses",
    audienceLabel: "For fashion brands",
    image: "/assets/images/projects/mockup-sampling.png",
    headline: "Streamlining the sampling process in the apparel industry",
    tagline: "Automate and optimise sampling, connected to purchasing, inventory, production and delivery.",
    intro:
      "Managing samples manually leads to miscommunication and costly errors. TARGET automates the entire sampling process and connects it with purchasing, inventory, production and delivery, so sample specifications stay aligned with bulk orders.",
    highlights: ["Accurate sample costing", "Pooled purchase orders", "Barcode material tracking", "Material reconciliation"],
    features: [
      { icon: "tag", title: "Sampling costing", text: "Fabric, trims, colour and size variations and special instructions in one accurate cost structure." },
      { icon: "swatch", title: "Sample order entry and assortment", text: "Precise colour, size and quantity details that prevent errors during sample creation." },
      { icon: "layers", title: "Purchase management", text: "Consolidate fabric and trim requirements across samples into pooled purchase orders." },
      { icon: "box", title: "Inventory management", text: "Track materials from receipt to production with unique barcodes and avoid wastage." },
      { icon: "factory", title: "Production management", text: "Follow sample production progress against customer specifications." },
      { icon: "truck", title: "Delivery to customer", text: "Manage packaging, schedules and delivery so samples arrive on time." },
      { icon: "chart", title: "Material reconciliation report", text: "Compare purchased materials with consumption and leftover stock for accurate costing." },
    ],
    faqs: [
      { q: "How does it reduce time-to-market and sampling costs?", a: "Costing, sample orders, purchasing, inventory and production are connected, so samples are created right the first time and materials are bought in pooled orders." },
      { q: "How is material usage controlled?", a: "Materials are tracked by barcode from receipt to production, and the reconciliation report compares purchases with consumption and leftover stock." },
      { q: "Does it connect sampling with bulk production?", a: "Yes. Sample specifications flow into the rest of TARGET so bulk orders match what was approved." },
    ],
    fit: { manufacturers: true, buyingHouses: true, exporters: false, brands: true },
    related: ["buying-house-management", "garment-inspection-software", "garment-erp-knit-woven"],
    legacyPath: "/garments_sampling_software",
  },
  {
    slug: "operation-bulletin-quick-ob",
    code: "OB",
    name: "Operation Bulletin (Quick OB)",
    brand: "Quick OB",
    shortName: "Quick OB",
    stage: "Production",
    audience: "manufacturers",
    audienceLabel: "For industrial engineers and the sewing floor",
    image: "/assets/images/projects/ob-mockup.png",
    headline: "Revolutionising operation bulletin planning",
    tagline: "Cloud-based OB planning, SMV calculation and production tracking.",
    intro:
      "Quick OB is a user-friendly, cloud-based application that streamlines operation bulletin planning. It simplifies SMV calculation, production planning and performance tracking, reuses data for repeat styles and supports line writers, engineers, supervisors and management.",
    highlights: ["SMV in minutes", "Hour-by-hour tracking", "Skill matrix", "Reuse data for repeat styles"],
    features: [
      { icon: "layers", title: "Digital OB planning", text: "Build operation bulletins digitally and reuse them for repeat styles." },
      { icon: "clock", title: "Time study and SMV calculation", text: "Tap to record operations and get accurate SMV in minutes instead of hours." },
      { icon: "chart", title: "Hourly and daily production", text: "Live targets against actual output, hour by hour." },
      { icon: "target", title: "Planned vs actual", text: "Spot gaps early and correct the line while it is running." },
      { icon: "users", title: "Skill matrix", text: "See top performers and training needs at a glance." },
      { icon: "spark", title: "Style-wise analysis", text: "Compare efficiency by style to plan the next order better." },
    ],
    roles: [
      { title: "Industrial engineers", points: ["Automated time studies", "Instant SMV calculation", "Historical data for repeat orders"] },
      { title: "Production line writers", points: ["Digital line writing", "Balanced operator allocation", "Clear operation sequence"] },
      { title: "Supervisors", points: ["Live production dashboard", "Spot bottlenecks as they happen", "Hour-by-hour tracking"] },
      { title: "Management", points: ["Skill matrix reports", "Data-driven decisions", "Fair recognition of top performers"] },
    ],
    faqs: [
      { q: "What is Quick OB?", a: "A cloud-based operation bulletin application for garment manufacturers that simplifies SMV calculation, production planning and performance tracking." },
      { q: "Who uses Quick OB?", a: "Industrial engineers, production line writers, supervisors and management, each with views made for their role." },
      { q: "Can Quick OB track production in real time?", a: "Yes. Supervisors see targets against actual output hour by hour, so bottlenecks are fixed during the shift." },
      { q: "What results have factories seen?", a: "At AI Enterprises, planning became 70% faster and line efficiency improved by 30% within 90 days." },
    ],
    fit: { manufacturers: true, buyingHouses: false, exporters: false, brands: false },
    related: ["garment-erp-knit-woven", "garment-inspection-software", "garment-erp-brands"],
    legacyPath: "/operation_bulletin",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
