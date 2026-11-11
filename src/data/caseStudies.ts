export type CaseStudy = {
  slug: string;
  legacyId?: number;
  client: string;
  title: string;
  product: string; // product slug
  productLabel: string;
  category: string;
  date: string; // ISO
  image: string;
  location?: string;
  about: string;
  challenges: string[];
  impact: string[];
  results?: { value: string; label: string }[];
  featured?: boolean;
};

const img = (file: string) => `/cms/case-study/${file}`;

/**
 * Customer stories from asktek.net, edited for clarity.
 * Results with numbers are shown only where the original story states them clearly for that client.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "harpa-retail-plm-erp",
    legacyId: 20,
    client: "Harpa Retail Private Limited",
    title: "How Harpa Retail transformed apparel product development with ASKTEK PLM & ERP",
    product: "garment-erp-brands",
    productLabel: "PLM & ERP for Brands",
    category: "PLM for brands",
    date: "2026-09-07",
    image: img("CaseStudyFileName_1788785042766.png"),
    about:
      "Harpa Retail is a growing fashion and apparel business focused on products that keep pace with changing consumer preferences. As it expanded, managing product development, merchandising, sourcing, costing and inventory across teams became complex.",
    challenges: [
      "Disconnected product development and business processes",
      "Heavy dependence on spreadsheets and manual data",
      "Manual tracking of samples, revisions and approvals",
      "Gaps between product development and downstream ERP operations",
    ],
    impact: [
      "One source of truth for styles, specifications, materials, trims, samples and approvals",
      "Product details connected with costing for faster merchandising decisions",
      "Product requirements linked to sourcing and procurement",
      "Visibility from product development through production and inventory",
    ],
    featured: true,
  },
  {
    slug: "beeku-export-erp-quick-ob",
    legacyId: 19,
    client: "Beeku Export",
    title: "How Beeku Export improved garment manufacturing efficiency with ASKTEK ERP & Quick OB",
    product: "operation-bulletin-quick-ob",
    productLabel: "Garment ERP + Quick OB",
    category: "Case study",
    date: "2026-05-07",
    image: img("CaseStudyFileName_1788171499967.jpeg"),
    location: "Chennai",
    about: "Beeku Export, Chennai, digitised its garment manufacturing operations with ASKTEK Garment ERP and Quick OB, creating a connected production workflow.",
    challenges: [
      "Manual production tracking and reporting",
      "Time-consuming operation bulletin preparation and SMV calculation",
      "Limited visibility into line efficiency",
      "Manual inventory and material tracking",
    ],
    impact: [
      "Faster production planning with time and action and buyer order tracking",
      "Digital operation bulletins and simpler SMV management for IE teams",
      "Visibility of fabrics, trims and raw materials across buyers, styles and units",
      "Real-time production and efficiency reports for supervisors and management",
    ],
    featured: true,
  },
  {
    slug: "ai-enterprises-quick-ob",
    legacyId: 18,
    client: "AI Enterprises",
    title: "From paper chaos to digital clarity: how AI Enterprises transformed their factory floor",
    product: "operation-bulletin-quick-ob",
    productLabel: "Quick OB",
    category: "Production",
    date: "2025-09-27",
    image: img("CaseStudyFileName_1788171420825.png"),
    about: "AI Enterprises ran planning with stopwatches and clipboards and saw production issues only at the end of the day. Quick OB gave every factory role one app.",
    challenges: [
      "Slow manual planning: production timing took hours to calculate",
      "No real-time visibility of production issues",
      "Top performers and training needs went unnoticed",
    ],
    impact: [
      "Automated time studies and instant SMV calculation for planners",
      "Live targets vs actual and hour-by-hour tracking for line supervisors",
      "Skill matrix reports for management to recognise and train people",
    ],
    results: [
      { value: "70%", label: "Faster planning" },
      { value: "30%", label: "Higher line efficiency" },
      { value: "90 days", label: "To measurable results" },
    ],
    featured: true,
  },
  {
    slug: "royal-stitch-target-erp",
    legacyId: 16,
    client: "Royal Stitch",
    title: "Transforming Royal Stitch's manufacturing and distribution with Target ERP",
    product: "garment-erp-knit-woven",
    productLabel: "Target ERP",
    category: "ERP for apparel",
    date: "2025-05-19",
    image: img("CaseStudyFileName_1788180357260.png"),
    about: "Royal Stitch is a garment manufacturing and distribution business whose fragmented systems created inefficiencies and delayed insights.",
    challenges: [
      "Inventory, sales, purchase, manufacturing, accounting and payroll ran on disconnected workflows",
      "Manual processes and delayed access to business information",
      "No real-time view for decision-making",
    ],
    impact: [
      "One centralised platform for all core departments",
      "Live dashboards for inventory, production cycles, sales and financials",
      "Automated order processing and inventory tracking",
      "Shorter lead times and lower labour and inventory costs",
    ],
  },
  {
    slug: "attire-creation-target-erp",
    client: "Attire Creation",
    title: "Factory to buyer's door: Attire Creation's manufacturing success powered by Target ERP",
    product: "garment-erp-knit-woven",
    productLabel: "Target ERP",
    category: "ERP for apparel",
    date: "2025-05-13",
    image: img("CaseStudyFileName_1788776307553.png"),
    location: "Chennai",
    about:
      "Founded in 1994, Attire Creation designs and manufactures woven apparel for leading European brands, with a production capacity of 800,000 units. Its in-house design, development, sampling and delivery run on Target ERP.",
    challenges: ["Coordinating design, development, sampling and production in-house", "Delivering on time for European brands"],
    impact: ["Manufacturing operations managed end-to-end on Target ERP", "A reliable co-creation partner for buyers, from factory to buyer's door"],
  },
  {
    slug: "connoisseur-fashions-target-erp",
    client: "Connoisseur Fashions",
    title: "Connoisseur Fashions' operational transformation with Target Apparel ERP",
    product: "garment-erp-knit-woven",
    productLabel: "Target Apparel ERP",
    category: "ERP for apparel",
    date: "2025-05-13",
    image: img("CaseStudyFileName_1788776849109.jpeg"),
    about:
      "Connoisseur Fashions is a full-service apparel manufacturer producing over 1.5 million woven and knit garments a year for Europe, the UK, Japan, Australia and North America.",
    challenges: [
      "Critical data in Excel could be altered or deleted",
      "Manual data entry was slow and error-prone",
      "Excel could not scale with growing data complexity",
      "Departments were not connected",
    ],
    impact: [
      "Data security: unauthorised changes are prevented",
      "Streamlined processes with less manual work",
      "Full tracking of changes for transparency",
      "Better reporting for decision-making",
    ],
    featured: true,
  },
  {
    slug: "saturn-textiles-target-erp",
    legacyId: 13,
    client: "Saturn Textiles Limited",
    title: "How Saturn Textiles digitalised operations with Target ERP to reduce costs and increase efficiency",
    product: "garment-erp-knit-woven",
    productLabel: "Target ERP + Quick OB",
    category: "ERP for apparel",
    date: "2025-05-10",
    image: img("CaseStudyFileName_1788776926126.jpeg"),
    location: "Bangladesh",
    about: "Saturn Textiles is a Bangladesh-based textile company spanning cut-and-sew apparel and fabric mills, with more than two dozen factories across five zones.",
    challenges: [
      "Integrating inventory and production across multiple companies",
      "Complex inter-company movement of raw materials and WIP",
      "Keeping data, workflows and compliance consistent across factories",
      "Problems went undetected, so deadlines were missed",
    ],
    impact: [
      "Central digital style library across the organisation",
      "Consolidated view of total costs by expense head, process and item",
      "Target ERP integrated with operation bulletin planning",
      "Automated supplier price lists, procurement delegation and approvals",
      "Statutory compliance without manual data entry",
    ],
    featured: true,
  },
  {
    slug: "padma-textiles-target-bms",
    legacyId: 12,
    client: "Padma Textiles",
    title: "How Padma Textiles optimises product development and costing with Target BMS",
    product: "buying-house-management",
    productLabel: "Target BMS",
    category: "Buying house",
    date: "2025-05-10",
    image: img("CaseStudyFileName_1788782271687.jpeg"),
    about:
      "Padma Textiles provides bespoke design and production services to fashion brands, with design teams across Europe and the USA and production in partner factories across several countries.",
    challenges: [
      "Product data scattered across Excel sheets and shared drives",
      "No real-time visibility into product development and costing",
      "Communication delays through email",
    ],
    impact: [
      "One searchable hub for all product and material data",
      "Control over development from material sourcing to production",
      "Material classification that reduces manual errors",
      "Systematic costing with configurable attributes and BOM tracking",
    ],
  },
  {
    slug: "vijay-garments-asktek-erp",
    legacyId: 11,
    client: "Vijay Garments",
    title: "Vijay Garments automates sales orders and cuts material costs",
    product: "garment-erp-knit-woven",
    productLabel: "ASKTEK ERP",
    category: "ERP for apparel",
    date: "2025-05-10",
    image: img("CaseStudyFileName_1788782071934.png"),
    location: "Chennai",
    about:
      "Established in 1988, Vijay Garments manufactures and exports kids' wear, girls' tops, boys' apparel and men's shirts, exporting 50% of production to Europe. It has received the EPCES Export Award for Best SEZ (Non-SSI) for Textiles.",
    challenges: [
      "Manual data entry for sales orders, planning and sourcing as volumes grew",
      "Disjointed information between order processing and production",
      "No real-time view of style profitability",
    ],
    impact: [
      "Repetitive manual work removed from sales order management",
      "Production teams integrated with order processing",
      "No repeated data entry from projections and bookings to sampling and final orders",
      "Better control of material costs",
    ],
  },
  {
    slug: "laj-exports-asktek-erp",
    legacyId: 10,
    client: "LAJ Exports Ltd.",
    title: "How LAJ Exports digitalised factory functions with ASKTEK ERP",
    product: "garment-erp-knit-woven",
    productLabel: "ASKTEK ERP",
    category: "ERP for apparel",
    date: "2025-05-06",
    image: img("CaseStudyFileName_1788782675615.jpg"),
    location: "Noida",
    about: "Founded in 1997, LAJ Exports is a design-first apparel manufacturer and exporter with units across Delhi, Noida, Gurgaon and Bangalore.",
    challenges: ["A manual system with no insight into operations", "Repeated tasks across departments", "Managers lacked visibility of teams and issues"],
    impact: [
      "Automated inventory, production planning, scheduling and cost control",
      "Analytics dashboards for data-driven decisions",
      "Better control of inventory levels and approvals across the supply chain",
    ],
  },
  {
    slug: "frendi-fashion-asktek-erp",
    legacyId: 9,
    client: "Frendi Fashion",
    title: "How Frendi Fashion became a full-service apparel manufacturer with ASKTEK ERP",
    product: "garment-erp-knit-woven",
    productLabel: "ASKTEK ERP",
    category: "ERP for apparel",
    date: "2025-05-05",
    image: img("CaseStudyFileName_1788782808352.jpg"),
    about:
      "Established in 1992, Frendi Fashions manufactures and exports ready-made fashion from seven factories with 800 machines and 1,200 employees.",
    challenges: [
      "Separate legacy systems for sourcing, inventory, finance and sales orders",
      "No tracking of materials across warehouses and production",
      "Quality checks recorded on paper",
      "Design and factory teams coordinated by email and phone",
    ],
    impact: [
      "Factory and corporate teams on one cloud platform",
      "Manual entries removed from goods receipts, debit notes and purchase orders",
      "Consolidated, real-time data for smarter decisions",
    ],
  },
  {
    slug: "bhagayam-exports-asktek-erp",
    legacyId: 8,
    client: "Bhagayam Exports",
    title: "How Bhagayam Exports integrated systems, data and processes with ASKTEK ERP",
    product: "garment-erp-knit-woven",
    productLabel: "ASKTEK ERP",
    category: "ERP for apparel",
    date: "2025-05-05",
    image: img("CaseStudyFileName_1788782987808.jpg"),
    location: "Chennai",
    about: "Bhagayam Exports is a Chennai garment exporter producing for international markets, founded in 1980.",
    challenges: ["No central coordination across manufacturing units", "Inventory and quality records on paper", "Style libraries scattered and tech packs in Excel"],
    impact: [
      "Real-time view across units, departments and clients",
      "Digital tech packs in central style libraries",
      "Tech packs and purchase orders shared with suppliers in the system",
      "Integrated accounting with automatic credit and debit notes",
    ],
  },
  {
    slug: "kgi-clothing-asktek-erp",
    legacyId: 7,
    client: "KGI Clothing",
    title: "KGI Clothing's operational transformation with ASKTEK Apparel ERP",
    product: "garment-erp-knit-woven",
    productLabel: "ASKTEK Apparel ERP",
    category: "ERP for apparel",
    date: "2025-05-05",
    image: img("CaseStudyFileName_1788776609011.png"),
    about: "KGI Clothing moved its apparel operations onto ASKTEK Apparel ERP to connect teams and data.",
    challenges: ["Disconnected processes across departments", "Manual data handling"],
    impact: ["Operations connected on one apparel ERP", "Real-time information for management"],
  },
  {
    slug: "snqs-asktek-bms",
    legacyId: 5,
    client: "SNQS",
    title: "How SNQS gets more time for creative work with Target BMS",
    product: "buying-house-management",
    productLabel: "Target BMS",
    category: "Buying house",
    date: "2025-04-29",
    image: img("CaseStudyFileName_1788783392362.png"),
    location: "Tirupur & Chennai",
    about: "SNQS is a merchandising service based in Tirupur and Chennai, sourcing apparel for clients in the US, Canada and Western Europe.",
    challenges: [
      "Spreadsheets and design files for a large range of products",
      "Scattered information and fragmented supplier communication",
      "Administrative work took time away from creative work",
    ],
    impact: [
      "All stages of product development unified",
      "Excel import and export for easy adoption",
      "Fewer production and financial errors",
      "Faster product launches and more time for design",
    ],
  },
  {
    slug: "echo-sourcing-asktek-bms",
    legacyId: 4,
    client: "Echo Sourcing",
    title: "Target BMS: turning challenges into profitability at Echo Sourcing India",
    product: "buying-house-management",
    productLabel: "Target BMS",
    category: "Buying house",
    date: "2025-04-29",
    image: img("CaseStudyFileName_1788784109360.png"),
    about:
      "Established in 1996, Echo Sourcing is a design-to-delivery fashion house supplying global retailers and brands, with its own factory and a creative hub in London.",
    challenges: ["Documentation in Excel and long email chains", "Scattered information and siloed teams", "Manual style sheets and bills of materials"],
    impact: [
      "Less time spent on documentation and communication",
      "Faster production timelines and tech pack creation",
      "Library and duplication features that speed up new lines",
      "More transparency across processes",
    ],
  },
  {
    slug: "vijay-enterprises-asktek-erp",
    legacyId: 3,
    client: "Vijay Enterprises",
    title: "How Vijay Enterprises synchronised costing and improved profitability with ASKTEK ERP",
    product: "garment-erp-knit-woven",
    productLabel: "ASKTEK ERP",
    category: "ERP for apparel",
    date: "2025-04-29",
    image: img("CaseStudyFileName_1746795170566.jpg"),
    location: "Chennai",
    about:
      "Founded in 1975, Vijay Enterprises manufactures and exports men's and women's knit and woven garments to Europe, the USA and Australia.",
    challenges: [
      "Cost sheets and BOMs were not synchronised",
      "Colour-wise costing, trims and sample orders handled manually",
      "Files could not be attached to purchase orders or specs",
    ],
    impact: [
      "Cost sheets and BOMs unified",
      "Enforceable budgets with order-level profit and loss",
      "Streamlined colour-wise costing and material requirements",
      "Easier sample orders with attached specs and reports",
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
