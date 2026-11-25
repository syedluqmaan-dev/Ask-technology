import type { Solution } from "@/lib/types";

/**
 * Solution pages: one page per job a garment business needs done.
 * Every capability listed here maps to a TARGET 360 product feature described on asktek.net or in a published customer story.
 */
export const solutions: Solution[] = [
  {
    slug: "garment-costing-software",
    name: "Garment costing",
    h1: "Garment costing software that ties every quote to the BOM",
    answer:
      "Garment costing software builds the cost of a style from fabric, trims, CMT, overheads and margin, and keeps that cost linked to the bill of materials and the order. In TARGET 360, cost sheets, colour-wise costing and BOMs live in one place, and each order shows projected profit before you confirm it.",
    intro:
      "Most costing mistakes start in a spreadsheet that nobody updates after the buyer changes the fabric. TARGET 360 keeps the cost sheet, the BOM and the order connected, so a change in one shows up in the others.",
    problems: [
      "Cost sheets and BOMs live in different files and drift apart after the first revision",
      "Colour-wise and size-wise costs are worked out by hand for every enquiry",
      "Nobody knows the real margin on an order until it has shipped",
    ],
    capabilities: [
      { icon: "tag", title: "Buyer costing", text: "Build and adjust costs to each buyer's format and keep every version." },
      { icon: "layers", title: "Colour-wise costing", text: "Separate costs and material requirements for each colourway without retyping." },
      { icon: "chain", title: "Cost sheet linked to BOM", text: "The approved cost becomes the material plan, so purchase works to the same numbers." },
      { icon: "chart", title: "Projected profit", text: "See expected profit per order before confirmation, for merchandisers and management." },
      { icon: "wallet", title: "Order-level budgets", text: "Hold purchasing to the costed budget and see profit and loss by order." },
      { icon: "target", title: "Markup analysis", text: "Track markup by buyer and season to see where pricing is slipping." },
    ],
    steps: [
      "Create the enquiry and pick the style, buyer and season",
      "Build the cost sheet from fabric, trims, CMT and overheads",
      "Send the quote and record the buyer's counter-offers",
      "Convert the approved cost into the BOM and purchase plan",
      "Compare actual cost against costed cost when the order closes",
    ],
    products: ["buying-house-management", "garment-erp-knit-woven", "garment-erp-brands"],
    faqs: [
      { q: "Can TARGET 360 cost the same style in different colours?", a: "Yes. Colour-wise costing keeps separate fabric, trim and material requirements for each colourway, so you do not rebuild the cost sheet for every colour." },
      { q: "Does the costing connect to purchasing?", a: "Yes. Once a cost is approved it becomes the bill of materials, and purchase orders are raised against it. Vijay Enterprises used this to unify cost sheets and BOMs and enforce budgets per order." },
      { q: "Can we see the profit on an order before confirming it?", a: "Yes. Target BMS shows a projected profit report for every factory order, on trading or commission terms." },
      { q: "Can buyers' own costing formats be used?", a: "Cost sheets can be set up to match the format each buyer asks for, so you are not copying numbers into a second template." },
    ],
    keywords: ["garment costing software", "apparel costing software", "garment cost sheet", "costing software for garment exporters", "FOB costing"],
    seo: {
      title: "Garment Costing Software Linked to BOM | TARGET 360",
      description:
        "Build garment cost sheets, colour-wise costs and BOMs in one place, see projected profit per order and hold purchasing to the costed budget.",
    },
  },
  {
    slug: "production-planning-software",
    name: "Production planning (PPC)",
    h1: "Production planning software for garment factories",
    answer:
      "Garment production planning software (PPC) schedules orders across cutting, sewing and finishing against the capacity you actually have, then tracks progress so the plan changes when the floor does. TARGET 360 schedules production, shows live work in progress and warns you when an order will miss its ex-factory date.",
    intro:
      "A plan on a whiteboard is out of date by lunchtime. TARGET 360 keeps the production plan tied to real output from the floor, so planners see which orders are slipping while there is still time to move lines.",
    problems: [
      "Line loading is done in Excel and nobody trusts the dates",
      "Delays in cutting or sewing are discovered at the end of the day, or the end of the order",
      "Capacity is guessed when a merchandiser accepts a new order",
    ],
    capabilities: [
      { icon: "factory", title: "Production scheduling", text: "Plan orders against lines and dates, from raw material to finished goods." },
      { icon: "clock", title: "Live work in progress", text: "WIP from cutting to shipment, updated as output is recorded." },
      { icon: "target", title: "Planned versus actual", text: "Spot the gap between plan and output while the order is still running." },
      { icon: "spark", title: "Early delay warnings", text: "TARGET 360 AI flags orders at risk of missing their ship date." },
      { icon: "chart", title: "Capacity check before you quote", text: "See load and availability before confirming a new order." },
      { icon: "bell", title: "Alerts and reminders", text: "Notifications for upcoming milestones and commitments." },
    ],
    steps: [
      "Confirm the order and its ex-factory date",
      "Load it onto lines with the planned start and finish",
      "Record output from cutting, sewing and finishing",
      "Compare planned and actual every day, by order and by line",
      "Re-plan early when an order falls behind",
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob"],
    faqs: [
      { q: "What does PPC mean in a garment factory?", a: "PPC stands for production planning and control: deciding when and where each order is made, then checking actual progress against that plan." },
      { q: "Can TARGET 360 show which orders are running late?", a: "Yes. Planned against actual is tracked by order, and TARGET 360 AI highlights orders at risk of missing their ship date so planners can move work early." },
      { q: "Does planning connect to line-level output?", a: "Yes. With Quick OB, supervisors record hour-by-hour output on each line, which feeds the planned versus actual view." },
      { q: "Is it suitable for both knit and woven units?", a: "Yes. TARGET 360 ERP is used by knit and woven manufacturers and exporters." },
    ],
    keywords: ["production planning software for garment industry", "garment PPC software", "apparel production planning", "garment production scheduling software"],
    seo: {
      title: "Production Planning Software for Garment Factories",
      description:
        "Garment PPC software: schedule orders against capacity, track live WIP from cutting to shipment and get warned before an order misses its date.",
    },
  },
  {
    slug: "garment-merchandising-software",
    name: "Merchandising",
    h1: "Garment merchandising software for orders, tech packs and follow-up",
    answer:
      "Garment merchandising software keeps everything a merchandiser handles in one record: the buyer order, tech pack, costing, approvals, purchase and the time and action plan. In TARGET 360 each style has a digital tech pack in a shared style library, so factories, suppliers and buyers work from the same version.",
    intro:
      "Merchandisers spend their day chasing emails, updating trackers and retyping the same order into three systems. TARGET 360 gives every order one place for its documents, dates and decisions.",
    problems: [
      "Tech packs sit in Excel and email attachments, with no single latest version",
      "The same order is typed again for sampling, purchase and production",
      "Follow-ups depend on one merchandiser's memory",
    ],
    capabilities: [
      { icon: "layers", title: "Digital style library", text: "Tech packs, specs and images stored centrally and reused for repeat styles." },
      { icon: "order", title: "Buyer order management", text: "From enquiry to confirmed order, with projections and bookings carried forward." },
      { icon: "chain", title: "Shared with suppliers", text: "Tech packs and purchase orders shared with suppliers from the system." },
      { icon: "clock", title: "Time and action plans", text: "Planned against actual dates for every milestone on the order." },
      { icon: "bell", title: "Reminders", text: "Email alerts before deadlines, so follow-up does not depend on memory." },
      { icon: "chart", title: "Order status at a glance", text: "Live status from order to inspection for management and buyers." },
    ],
    steps: [
      "Capture the enquiry with the buyer's tech pack",
      "Cost the style and get approval",
      "Convert to an order without retyping",
      "Run the time and action plan with reminders",
      "Track purchase, production and inspection to shipment",
    ],
    products: ["buying-house-management", "garment-erp-knit-woven", "garment-erp-brands"],
    faqs: [
      { q: "Can tech packs be stored and reused?", a: "Yes. TARGET 360 keeps digital tech packs in a central style library. Bhagayam Exports moved its tech packs out of Excel into this library and shares them with suppliers from the system." },
      { q: "Do we have to type the order again for each department?", a: "No. Vijay Garments removed repeated data entry from projections and bookings through to sampling and final orders." },
      { q: "Can buying houses use it for factory follow-up?", a: "Yes. Target BMS handles factory orders, time and action plans and inspection audits for buying houses." },
    ],
    keywords: ["garment merchandising software", "apparel merchandising software", "tech pack management software", "order tracking software for garment exporters"],
    seo: {
      title: "Garment Merchandising Software | TARGET 360",
      description:
        "Orders, digital tech packs, costing, T&A plans and supplier follow-up in one record per style. Merchandising software for garment exporters.",
    },
  },
  {
    slug: "time-and-action-calendar",
    name: "Time and action calendar",
    h1: "Time and action calendar software for garment orders",
    answer:
      "A time and action (T&A) calendar lists every milestone of a garment order, such as lab dips, fabric in-house, PP sample approval, cutting, inspection and ex-factory, with planned and actual dates. TARGET 360 builds the T&A from the order, compares planned against actual and sends reminders before a milestone is missed.",
    intro:
      "A T&A in a spreadsheet only works if someone updates it. TARGET 360 updates milestones from the work itself and tells the team when a date is at risk.",
    problems: [
      "T&A sheets are updated once a week, so delays are found late",
      "Every merchandiser keeps a different format",
      "Management cannot see which orders are at risk across buyers",
    ],
    capabilities: [
      { icon: "clock", title: "Planned versus actual", text: "Each milestone carries both dates so slippage is visible." },
      { icon: "bell", title: "Advance alerts", text: "Email reminders for upcoming deadlines and commitments." },
      { icon: "order", title: "Built from the order", text: "Milestones created from the order dates instead of typed by hand." },
      { icon: "chart", title: "Cross-order view", text: "See every order's milestones by buyer, merchandiser or factory." },
    ],
    steps: [
      "Confirm the order and its ex-factory date",
      "Generate milestones back from that date",
      "Record actual dates as work completes",
      "Get alerts for milestones due or overdue",
    ],
    products: ["buying-house-management", "garment-erp-knit-woven"],
    faqs: [
      { q: "What is a time and action calendar in garments?", a: "It is the list of milestones an order must hit before shipment, each with a planned date and the actual date it was completed." },
      { q: "Does TARGET 360 send reminders?", a: "Yes. Target BMS sends email alerts and reminders for upcoming deadlines and commitments, and flags factory contract expiries." },
      { q: "Can we compare planned and actual dates?", a: "Yes. Time and action planning in Target BMS compares planned and actual dates so every delivery stays on track." },
    ],
    keywords: ["time and action calendar garment", "T&A software", "TNA calendar apparel", "garment order follow up software"],
    seo: {
      title: "Time and Action (T&A) Calendar Software for Garments",
      description:
        "Build T&A calendars from the order, track planned against actual dates for every milestone and get alerts before a delivery slips.",
    },
  },
  {
    slug: "garment-inventory-management",
    name: "Inventory and stores",
    h1: "Inventory management software for fabric, trims and finished garments",
    answer:
      "Garment inventory software tracks fabric, trims and finished goods across stores and units, against the orders they belong to. TARGET 360 manages multi-location warehouses, tracks material movements by barcode from receipt to production, and reconciles what was bought with what was consumed and what is left.",
    intro:
      "Excess fabric and missing trims both cost money. TARGET 360 links every roll and carton to an order, so stores, purchase and production see the same stock.",
    problems: [
      "Stock in the store does not match the register",
      "Leftover fabric from one order is bought again for the next",
      "Materials move between units with no record",
    ],
    capabilities: [
      { icon: "box", title: "Multi-location stores", text: "Stock across warehouses and units in one view." },
      { icon: "tag", title: "Barcode tracking", text: "Unique barcodes from receipt to production." },
      { icon: "chart", title: "Material reconciliation", text: "Purchased versus consumed versus leftover, by order." },
      { icon: "target", title: "Requirement forecasting", text: "Plan purchase to avoid stock-outs without over-buying." },
      { icon: "chain", title: "Inter-unit transfers", text: "Movement of raw material and WIP between companies and units." },
    ],
    steps: [
      "Receive material against a purchase order",
      "Label it and put it away by location",
      "Issue to cutting or production against the order",
      "Transfer between units with a record",
      "Reconcile purchased, consumed and leftover when the order closes",
    ],
    products: ["garment-erp-knit-woven", "garment-erp-brands"],
    faqs: [
      { q: "Can TARGET 360 handle several warehouses?", a: "Yes. It manages multi-location warehouses and monitors material movements across them." },
      { q: "How is fabric tracked?", a: "Materials can be tracked with unique barcodes from receipt through to production, which helps avoid wastage." },
      { q: "Does it handle transfers between group companies?", a: "Yes. Saturn Textiles in Bangladesh uses TARGET 360 to manage inter-company movement of raw materials and WIP across its factories." },
    ],
    keywords: ["garment inventory management software", "fabric inventory software", "trims inventory", "apparel warehouse software"],
    seo: {
      title: "Garment Inventory Software for Fabric and Trims",
      description:
        "Multi-location stock, barcode tracking and material reconciliation for garment manufacturers. Know what was bought, used and left on every order.",
    },
  },
  {
    slug: "apparel-plm-software",
    name: "Sampling and PLM",
    h1: "Apparel PLM and sampling software",
    answer:
      "Apparel PLM (product lifecycle management) software manages a style from first sample to bulk approval: specifications, materials, sample costing, sample orders and approvals. TARGET 360 for Brands connects sampling with purchasing, inventory and production, so the approved sample is what the bulk order is made to.",
    intro:
      "Sampling run on email and spreadsheets leads to the wrong trim on the PP sample and the wrong cost on the bulk order. TARGET 360 keeps the sample record and the bulk order connected.",
    problems: [
      "Sample requests, revisions and approvals are tracked in email",
      "Fabric for samples is bought style by style",
      "Bulk orders do not match the approved sample spec",
    ],
    capabilities: [
      { icon: "tag", title: "Sample costing", text: "Fabric, trims, colour and size variations in one cost." },
      { icon: "swatch", title: "Sample orders and assortment", text: "Colour, size and quantity detail that prevents rework." },
      { icon: "layers", title: "Pooled purchasing", text: "Combine fabric and trim needs across samples into one order." },
      { icon: "box", title: "Barcode material tracking", text: "Know where every sample material is." },
      { icon: "truck", title: "Delivery tracking", text: "Packaging and dispatch so samples arrive on time." },
      { icon: "chart", title: "Material reconciliation", text: "Bought versus used for accurate sample costing." },
    ],
    steps: [
      "Create the sample request with specs and assortment",
      "Cost the sample",
      "Pool material purchases across samples",
      "Make, inspect and dispatch the sample",
      "Carry the approved spec into the bulk order",
    ],
    products: ["garment-erp-brands", "buying-house-management"],
    faqs: [
      { q: "What is apparel PLM?", a: "PLM is the system that holds a product's specifications, materials, costs, samples and approvals from development to production." },
      { q: "Does TARGET 360 PLM connect to the ERP?", a: "Yes. Sample specifications flow into the rest of TARGET 360, so bulk orders match what was approved. Harpa Retail uses PLM and ERP together for this." },
      { q: "Can we reduce what we spend on sampling material?", a: "Pooled purchase orders combine fabric and trims across samples, and the reconciliation report shows purchased against consumed and leftover." },
    ],
    keywords: ["apparel PLM software", "fashion PLM software", "garment sampling software", "sample management software", "PLM for fashion brands India"],
    seo: {
      title: "Apparel PLM and Garment Sampling Software",
      description:
        "Sample costing, assortments, pooled purchasing and approvals connected to bulk production. PLM for fashion brands and garment exporters.",
    },
  },
  {
    slug: "garment-quality-inspection-software",
    name: "Quality inspection",
    h1: "Garment quality inspection software that works without internet",
    answer:
      "Garment quality inspection software lets QA teams record inline and final inspections on a phone or tablet, with the defects and checks each buyer requires. Inspection On Go works offline inside factories, syncs when the device reconnects, and gives live inspection status from buyer order to factory order.",
    intro:
      "Inspection reports written on paper reach the office a day later, if at all. With Inspection On Go the result is in the system the moment the inspector syncs.",
    problems: [
      "Factories have weak or no mobile signal on the floor",
      "Paper reports are retyped, delayed or lost",
      "Buyers ask for inspection status nobody can give quickly",
    ],
    capabilities: [
      { icon: "offline", title: "Offline audits", text: "Inspect without internet and sync later with no data loss." },
      { icon: "shield", title: "Configurable checks", text: "Set the inspection types and checks each product needs." },
      { icon: "mobile", title: "Phone and web", text: "Inspect on mobile, review on the web." },
      { icon: "chart", title: "Live MIS", text: "Traceability from buyer order to factory order and inspection status." },
      { icon: "lock", title: "Access by role", text: "Multi-level access so each user sees only what they should." },
    ],
    steps: [
      "Create the buyer order and the factory order",
      "Assign the inspection to a QA inspector",
      "Inspect on the phone, online or offline",
      "Sync results to the web",
      "Review status and reports by order",
    ],
    products: ["garment-inspection-software", "buying-house-management"],
    faqs: [
      { q: "Does the inspection app work without internet?", a: "Yes. Inspections are recorded on the device and uploaded automatically when it is back online, with no data loss." },
      { q: "Who uses Inspection On Go?", a: "QA teams in buying houses, factories and brands that need inspection results from factories quickly." },
      { q: "Can we set up our own checks?", a: "Yes. Inspection types and checks are configured to the needs of each product." },
    ],
    keywords: ["garment inspection software", "quality inspection app for garments", "apparel QC software", "offline inspection app", "inline inspection garment"],
    seo: {
      title: "Garment Quality Inspection Software (Works Offline)",
      description:
        "Record garment inspections on a phone inside the factory, even offline. Results sync to the web with live status by order. Inspection On Go.",
    },
  },
  {
    slug: "smv-line-balancing-software",
    name: "SMV and line balancing",
    h1: "SMV calculation and line balancing software",
    answer:
      "SMV (standard minute value) is the time a trained operator needs for one garment operation. Line balancing spreads those operations across operators so no station holds up the line. Quick OB records time studies with a tap, calculates SMV in minutes, builds the operation bulletin and tracks hourly output against target.",
    intro:
      "Time studies with a stopwatch and a clipboard take hours to turn into a bulletin. Quick OB does it on a phone, and the numbers go straight to the line.",
    problems: [
      "SMV takes hours to calculate and is rarely updated",
      "Operator allocation is based on habit, not data",
      "Bottlenecks are found after the shift ends",
    ],
    capabilities: [
      { icon: "clock", title: "Time study and SMV", text: "Tap to record operations and get SMV in minutes." },
      { icon: "layers", title: "Digital operation bulletin", text: "Build the OB once and reuse it for repeat styles." },
      { icon: "users", title: "Balanced allocation", text: "Allocate operators to operations with a clear sequence." },
      { icon: "chart", title: "Hourly output", text: "Target against actual, hour by hour, for every line." },
      { icon: "target", title: "Skill matrix", text: "See top performers and training needs." },
      { icon: "spark", title: "Style-wise analysis", text: "Compare efficiency by style to plan the next order." },
    ],
    steps: [
      "Record the time study on the phone",
      "Get SMV for each operation",
      "Build and balance the operation bulletin",
      "Set hourly targets for the line",
      "Track actual output and the skill matrix",
    ],
    products: ["operation-bulletin-quick-ob"],
    faqs: [
      { q: "What is the difference between SMV and SAM?", a: "They mean the same thing: the standard time for one operation, including allowances. SMV is used more in South Asia, SAM in other markets." },
      { q: "How fast can Quick OB calculate SMV?", a: "Operations are recorded with a tap and SMV is calculated in minutes, instead of hours of manual work." },
      { q: "What results have factories seen?", a: "AI Enterprises reported 70% faster planning and 30% higher line efficiency within 90 days of using Quick OB." },
      { q: "Can we reuse bulletins for repeat styles?", a: "Yes. Historical data is kept, so repeat orders start from the existing bulletin." },
    ],
    keywords: ["SMV calculation software", "line balancing software garment", "operation bulletin software", "time study app garment", "SAM calculation"],
    seo: {
      title: "SMV Calculation and Line Balancing Software | Quick OB",
      description:
        "Record time studies on a phone, get SMV in minutes, balance lines and track hourly output. AI Enterprises saw 70% faster planning.",
    },
  },
  {
    slug: "production-tracking-software",
    name: "Cut-to-pack tracking",
    h1: "Cut-to-pack production tracking for garment factories",
    answer:
      "Cut-to-pack tracking records how many pieces of each order have been cut, sewn, finished and packed, so you always know the real work in progress. TARGET 360 shows live WIP by order and line, highlights bottlenecks as they happen and gives management one view from cutting to shipment.",
    intro:
      "If you only count pieces at packing, problems in cutting or sewing show up too late to fix. TARGET 360 counts at every stage.",
    problems: [
      "Output is reported once a day, on paper",
      "No one can say how many pieces of an order are in sewing right now",
      "Bottlenecks move from line to line without being noticed",
    ],
    capabilities: [
      { icon: "factory", title: "Stage-wise output", text: "Cutting, sewing, finishing and packing recorded by order." },
      { icon: "chart", title: "Live WIP", text: "Work in progress from cutting to shipment." },
      { icon: "clock", title: "Hourly line output", text: "Target against actual on the sewing floor." },
      { icon: "spark", title: "Bottleneck alerts", text: "Spot where pieces are piling up during the shift." },
      { icon: "truck", title: "Shipment readiness", text: "Know when an order will be packed and ready to ship." },
    ],
    steps: [
      "Issue cut bundles against the order",
      "Record sewing output by line and hour",
      "Record finishing and packing",
      "Watch WIP and bottlenecks live",
      "Confirm shipment quantities",
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob"],
    faqs: [
      { q: "What is cut-to-pack ratio?", a: "It is the number of pieces packed divided by the number cut, usually shown as a percentage. A low ratio points to rejections, losses or miscounts between cutting and packing." },
      { q: "Can supervisors see bottlenecks during the shift?", a: "Yes. Live dashboards show hour-by-hour output so bottlenecks are fixed while the shift is running." },
      { q: "Does tracking work across several factories?", a: "Yes. Frendi Fashion runs factory and corporate teams on one cloud platform across seven factories." },
    ],
    keywords: ["garment production tracking software", "cut to pack tracking", "WIP tracking garment", "real time production monitoring apparel"],
    seo: {
      title: "Cut-to-Pack Production Tracking for Garment Factories",
      description:
        "Track cutting, sewing, finishing and packing by order and line. Live WIP and bottleneck alerts from cutting to shipment with TARGET 360.",
    },
  },
  {
    slug: "export-documentation-software",
    name: "Export documentation",
    h1: "Export documentation and commercial invoicing for garment exporters",
    answer:
      "Export documentation software produces the commercial invoice, packing list and related shipping documents from the order data you already have. TARGET 360 creates invoices in the format each overseas buyer requires, records receipts, payments and credit or debit notes, and links them to the order's accounts.",
    intro:
      "Retyping the packing list and invoice for every shipment invites errors that hold up payment. TARGET 360 builds them from the order.",
    problems: [
      "Invoices and packing lists are retyped from the order for every shipment",
      "Each buyer wants a different invoice format",
      "Accounts and shipping documents do not match",
    ],
    capabilities: [
      { icon: "invoice", title: "Commercial invoices", text: "Invoices tailored to each global buyer's requirements." },
      { icon: "order", title: "Packing slips and labels", text: "Packing slips and shipping labels from the order." },
      { icon: "wallet", title: "Financial vouchers", text: "Receipts, payments, credit and debit notes and journals." },
      { icon: "chart", title: "Accounts linked to orders", text: "Profit and loss statements and balance sheets from the same data." },
    ],
    steps: ["Close production for the shipment", "Generate the packing list from packed cartons", "Create the commercial invoice in the buyer's format", "Post receipts and notes to accounts"],
    products: ["garment-erp-knit-woven", "buying-house-management"],
    faqs: [
      { q: "Can invoices follow each buyer's format?", a: "Yes. Commercial invoicing produces invoices tailored to the requirements of each global buyer." },
      { q: "Are accounts connected to the shipping documents?", a: "Yes. Invoices, receipts, payments and credit and debit notes post to the same accounts, and Bhagayam Exports uses automatic credit and debit notes." },
    ],
    keywords: ["export documentation software", "commercial invoice software garment", "garment export software", "packing list software apparel"],
    seo: {
      title: "Export Documentation Software for Garment Exporters",
      description:
        "Commercial invoices in each buyer's format, packing slips, shipping labels and linked accounts, generated from the order in TARGET 360.",
    },
  },
  {
    slug: "techpack-to-bom-ai",
    name: "Techpack to BOM with AI",
    h1: "Convert buyer techpacks into BOMs with AI",
    answer:
      "TARGET 360 AI reads a buyer's PDF techpack and turns it into structured ERP data: a bill of materials, a measurement chart and a list of fabrics and trims ready to cost. Your team reviews and approves the result instead of typing a 14-page techpack into the system by hand.",
    intro:
      "Typing techpacks into the ERP is slow and every typo becomes a costing or purchase error. TARGET 360 AI does the first pass for you.",
    problems: [
      "Merchandisers retype techpacks page by page",
      "Measurement charts are copied with mistakes",
      "Costing waits until the data entry is done",
    ],
    capabilities: [
      { icon: "invoice", title: "BOM extraction", text: "Bills of materials taken from the PDF automatically." },
      { icon: "layers", title: "Measurement charts", text: "Measurements captured into size charts." },
      { icon: "tag", title: "Ready to cost", text: "Fabrics and trims listed and ready for the cost sheet." },
      { icon: "spark", title: "Smart search", text: "Find and compare styles, costs and suppliers you already have." },
    ],
    steps: ["Upload the buyer's PDF techpack", "TARGET 360 AI extracts BOM, measurements and materials", "Review and correct anything flagged", "Send it to costing"],
    products: ["garment-erp-brands", "garment-erp-knit-woven"],
    faqs: [
      { q: "Does someone still check the AI output?", a: "Yes. The extracted BOM, measurements and materials are reviewed and approved by your team before they are used." },
      { q: "What else does TARGET 360 AI do?", a: "Smart search and comparison across styles, costs and suppliers, capacity and margin checks before you quote, and automatic scheduling with live WIP." },
    ],
    keywords: ["techpack to BOM", "AI for garment industry", "AI apparel ERP", "techpack automation"],
    seo: {
      title: "Convert Techpacks to BOM with AI | TARGET 360 AI",
      description:
        "Upload a buyer's PDF techpack and get a BOM, measurement chart and material list ready to cost. AI built into TARGET 360 garment ERP.",
    },
  },
];
