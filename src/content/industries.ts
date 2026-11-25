import type { Industry } from "@/lib/types";

export const industries: Industry[] = [
  {
    slug: "garment-manufacturers",
    name: "Garment manufacturers",
    h1: "ERP software for garment manufacturers",
    answer:
      "Garment manufacturers use TARGET 360 to run orders, costing, purchase, stores, production planning, line output, quality and payroll in one system. Each department works from the same order record, so the factory knows the real status of every style without chasing reports.",
    intro:
      "A manufacturing unit has more moving parts than any other business in the chain: material, people, machines and dates. TARGET 360 was built around that floor.",
    pains: [
      { icon: "factory", title: "Output you can trust", text: "Hourly line output and live WIP instead of end-of-day paper reports." },
      { icon: "box", title: "Material under control", text: "Fabric and trims tracked by order, by barcode, across stores." },
      { icon: "wallet", title: "Margins that hold", text: "Costed budgets enforced at purchase and checked at order close." },
      { icon: "users", title: "Workforce in one system", text: "Attendance, overtime and payroll next to production numbers." },
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software", "target-360-hrms"],
    solutions: ["production-planning-software", "smv-line-balancing-software", "production-tracking-software", "garment-inventory-management"],
    faqs: [
      { q: "Is TARGET 360 suitable for a single-unit factory?", a: "Yes. You can start with the modules you need, such as ERP or Quick OB, and add more units and modules as you grow." },
      { q: "Can several factories run on one system?", a: "Yes. Frendi Fashion runs seven factories with 800 machines on TARGET 360, and Saturn Textiles runs factories across five zones in Bangladesh." },
      { q: "How long does implementation take?", a: "It depends on the modules and the number of units. Our team plans the timeline with you during discovery and tests with your real orders before go-live." },
    ],
    keywords: ["ERP for garment manufacturers", "garment manufacturing software", "apparel manufacturing ERP", "garment factory software"],
    seo: {
      title: "ERP Software for Garment Manufacturers | TARGET 360",
      description:
        "Orders, costing, stores, production planning, line output, quality and payroll in one ERP built for garment manufacturing units.",
    },
  },
  {
    slug: "apparel-exporters",
    name: "Apparel exporters",
    h1: "ERP software for apparel exporters",
    answer:
      "Apparel exporters use TARGET 360 to manage overseas buyer orders from costing and sampling to production, inspection, commercial invoicing and payment. Buyer-specific invoice formats, time and action plans and order-level profit help export houses ship on time and know their margin on every order.",
    intro:
      "Export orders come with tight lead times, buyer audits and documents that must be exact. TARGET 360 keeps those requirements attached to the order from day one.",
    pains: [
      { icon: "clock", title: "Lead times", text: "Time and action plans with alerts before a milestone slips." },
      { icon: "invoice", title: "Buyer formats", text: "Commercial invoices and documents in each buyer's format." },
      { icon: "chart", title: "Order profitability", text: "Projected and actual profit per order and per buyer." },
      { icon: "shield", title: "Inspection status", text: "Inline and final inspection results visible to merchandisers." },
    ],
    products: ["garment-erp-knit-woven", "buying-house-management", "garment-inspection-software"],
    solutions: ["export-documentation-software", "time-and-action-calendar", "garment-costing-software", "garment-merchandising-software"],
    faqs: [
      { q: "Which exporters use TARGET 360?", a: "Published customer stories include Vijay Garments, which exports half its production to Europe, Connoisseur Fashions, which ships to Europe, the UK, Japan, Australia and North America, and LAJ Exports." },
      { q: "Can we keep each buyer's costing and invoice format?", a: "Yes. Costing and commercial invoices can be set up to each buyer's requirements." },
    ],
    keywords: ["ERP for garment exporters", "export house software", "apparel export management software", "garment export ERP"],
    seo: {
      title: "ERP Software for Apparel Exporters | TARGET 360",
      description:
        "Buyer orders, costing, T&A, inspection and export invoicing for garment export houses. Ship on time and know the margin on every order.",
    },
  },
  {
    slug: "buying-houses",
    name: "Buying houses",
    h1: "Software for buying houses and sourcing offices",
    answer:
      "Buying houses use Target BMS to cost styles for buyers, run vendor bidding, place factory orders on trading or commission terms, follow time and action plans, inspect offline in factories and raise invoices. Management sees projected profit on every order and status across all vendors.",
    intro:
      "A buying house lives between the buyer and many factories. Target BMS gives merchandisers and QA one place to manage both sides.",
    pains: [
      { icon: "target", title: "Vendor selection", text: "Vendor registration, online bidding and quotation comparison." },
      { icon: "order", title: "Factory orders", text: "Trading or commission orders with projected profit reports." },
      { icon: "offline", title: "Factory inspections", text: "QA audits without internet, synced later." },
      { icon: "lock", title: "Buyer access", text: "Log-based access controls for buyers and teams." },
    ],
    products: ["buying-house-management", "garment-inspection-software", "garment-erp-brands"],
    solutions: ["garment-costing-software", "time-and-action-calendar", "garment-quality-inspection-software", "garment-merchandising-software"],
    faqs: [
      { q: "Which buying houses use Target BMS?", a: "Published stories include SNQS in Tirupur and Chennai, Echo Sourcing with its creative hub in London, and Padma Textiles with design teams in Europe and the USA." },
      { q: "Can vendors submit quotes directly?", a: "Yes. Vendors register and submit bids online, and you compare them side by side." },
      { q: "Does it handle commission orders?", a: "Yes. Factory orders can be set up on trading or commission terms." },
    ],
    keywords: ["buying house software", "buying house management software", "sourcing office software", "garment buying agent software"],
    seo: {
      title: "Software for Buying Houses and Sourcing Offices",
      description:
        "Target BMS: buyer costing, vendor bidding, factory orders, T&A, offline QA audits and invoicing for garment buying houses.",
    },
  },
  {
    slug: "fashion-brands",
    name: "Fashion brands",
    h1: "PLM and ERP software for fashion brands",
    answer:
      "Fashion brands use TARGET 360 to manage product development, sampling, sourcing, costing and inventory in one system. PLM keeps styles, specifications, materials and approvals together, and the ERP carries the approved product into purchasing, production and stock.",
    intro:
      "Brands lose time when design, sourcing and merchandising each keep their own files. TARGET 360 gives every style one record from idea to stock.",
    pains: [
      { icon: "swatch", title: "Product development", text: "Styles, specs, materials, samples and approvals in one place." },
      { icon: "tag", title: "Costing", text: "Product details connected to costing for faster decisions." },
      { icon: "chain", title: "Sourcing", text: "Product requirements linked to procurement and vendors." },
      { icon: "store", title: "Outlets", text: "An outlet dashboard for brands with their own stores." },
    ],
    products: ["garment-erp-brands", "buying-house-management", "garment-inspection-software"],
    solutions: ["apparel-plm-software", "garment-costing-software", "techpack-to-bom-ai"],
    faqs: [
      { q: "Which brands use TARGET 360?", a: "Harpa Retail uses TARGET 360 PLM and ERP to connect product development with merchandising, sourcing, costing and inventory." },
      { q: "Can we manage outlets too?", a: "Yes. The outlet management dashboard shows every outlet in one interface with real-time reporting." },
    ],
    keywords: ["PLM for fashion brands", "fashion ERP", "apparel brand software", "fashion product development software"],
    seo: {
      title: "PLM and ERP Software for Fashion Brands | TARGET 360",
      description:
        "Product development, sampling, costing, sourcing and inventory for fashion brands, from first sample to stock, in TARGET 360.",
    },
  },
  {
    slug: "knitwear",
    name: "Knitwear",
    h1: "ERP software for knitwear manufacturers",
    answer:
      "Knitwear manufacturers use TARGET 360 to plan yarn and fabric, manage job-work processes such as knitting, dyeing and printing, track cut-to-pack output and run export orders. Short lead times and many small styles make connected costing, stores and line tracking especially valuable in knit units.",
    intro:
      "Knit orders move fast and pass through several outside processors. TARGET 360 tracks material and pieces wherever they are.",
    pains: [
      { icon: "chain", title: "Job-work processes", text: "Material sent out for knitting, dyeing or printing and received back against the order." },
      { icon: "clock", title: "Fast turnarounds", text: "T&A plans and hourly output for short lead times." },
      { icon: "tag", title: "Colour-wise costing", text: "Many colourways per style costed without retyping." },
      { icon: "box", title: "Yarn and fabric stock", text: "Stock by order and location, reconciled at close." },
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software"],
    solutions: ["garment-costing-software", "garment-inventory-management", "production-tracking-software"],
    faqs: [
      { q: "Is TARGET 360 built for knit as well as woven?", a: "Yes. TARGET 360 ERP is built for knit and woven garment manufacturers and exporters." },
      { q: "Can we track material at outside processors?", a: "Yes. Material movements are recorded against the order so you can see what is with each processor." },
    ],
    keywords: ["knitwear ERP", "ERP for knit garments", "knitting factory software", "hosiery ERP"],
    seo: {
      title: "ERP Software for Knitwear Manufacturers | TARGET 360",
      description:
        "Costing, yarn and fabric stock, job-work tracking and cut-to-pack output for knit garment manufacturers and exporters.",
    },
  },
  {
    slug: "woven-garments",
    name: "Woven garments",
    h1: "ERP software for woven garment manufacturers",
    answer:
      "Woven garment manufacturers making shirts, trousers, dresses and outerwear use TARGET 360 to cost complex trims, plan fabric by roll, balance long sewing lines and manage inspections for international buyers. Operation bulletins and SMV from Quick OB help plan lines with many operations.",
    intro:
      "Woven styles carry more operations and more trims than most knits. TARGET 360 keeps the detail without slowing the team down.",
    pains: [
      { icon: "layers", title: "Long operation lists", text: "Operation bulletins, SMV and balanced lines with Quick OB." },
      { icon: "tag", title: "Trim-heavy costing", text: "Every button, label and interlining costed and purchased against the order." },
      { icon: "box", title: "Fabric by roll", text: "Rolls tracked by barcode from receipt to cutting." },
      { icon: "shield", title: "Buyer inspections", text: "Inline and final inspections recorded on a phone." },
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software"],
    solutions: ["smv-line-balancing-software", "garment-costing-software", "garment-quality-inspection-software"],
    faqs: [
      { q: "Which woven manufacturers use TARGET 360?", a: "Attire Creation in Chennai, which makes woven apparel for European brands, and Connoisseur Fashions, which produces woven and knit garments, both run on TARGET 360." },
    ],
    keywords: ["woven garment ERP", "shirt manufacturing software", "woven apparel ERP"],
    seo: {
      title: "ERP Software for Woven Garment Manufacturers",
      description:
        "Trim-heavy costing, fabric roll tracking, SMV and line balancing, and buyer inspections for woven garment units. TARGET 360.",
    },
  },
];
