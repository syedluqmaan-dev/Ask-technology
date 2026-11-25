import type { City, Country } from "@/lib/types";

/**
 * Country and city pages. Each page is written for that market's garment industry, not copied between cities,
 * which is what Google requires for location pages to rank (and not be treated as doorway pages).
 */
export const countries: Country[] = [
  {
    slug: "india",
    name: "India",
    short: "India",
    h1: "Garment ERP software in India",
    answer:
      "ASK Technology is a Chennai company that builds TARGET 360, garment ERP software used by apparel manufacturers, exporters, buying houses and brands across India. It covers costing, sampling, merchandising, production planning, line output, quality inspection, export invoicing and payroll, with implementation and support from our own team.",
    intro:
      "India's garment trade runs on clusters: knitwear in Tiruppur, woven exports in Bengaluru and Delhi NCR, woollens in Ludhiana, hosiery in Kolkata. Each works differently, and TARGET 360 is configured to the way your cluster and your buyers work.",
    industry:
      "Indian exporters compete on lead time, compliance and cost, often while running several units and outside job-workers. The businesses that move fastest are the ones that stopped running costing, planning and inspection on separate spreadsheets.",
    points: [
      { icon: "factory", title: "Built in Chennai", text: "Designed and supported in India, close to the factories that use it." },
      { icon: "invoice", title: "Export and domestic", text: "Commercial invoicing for overseas buyers, accounts for domestic business." },
      { icon: "users", title: "Workforce payroll", text: "Attendance, overtime and payroll for factory teams with TARGET 360 HRMS." },
      { icon: "chain", title: "Job-work tracking", text: "Material sent to outside processors tracked against the order." },
    ],
    products: ["garment-erp-knit-woven", "buying-house-management", "operation-bulletin-quick-ob", "target-360-hrms"],
    caseStudies: ["vijay-garments-asktek-erp", "laj-exports-asktek-erp", "snqs-asktek-bms", "attire-creation-target-erp"],
    faqs: [
      { q: "Where is ASK Technology based?", a: "Our office is at Railway Border Road, Kodambakkam, Chennai, Tamil Nadu. We work with garment businesses across India." },
      { q: "Can TARGET 360 be set up at our factory?", a: "Yes. Our team plans the implementation with you, configures TARGET 360 to your process, tests it with your real orders and trains each role before go-live." },
      { q: "Do you support Indian payroll requirements?", a: "TARGET 360 HRMS handles attendance, shifts, overtime, leave and payroll. Our team configures pay components and rules to match how your business works." },
    ],
    seo: {
      title: "Garment ERP Software in India | ASK Technology",
      description:
        "TARGET 360 garment ERP for Indian manufacturers, exporters and buying houses, from Chennai. Costing to shipment, with local support.",
    },
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    short: "Dubai",
    h1: "Garment ERP software in Dubai and the UAE",
    answer:
      "Garment trading companies, buying offices and manufacturers in Dubai and across the UAE use TARGET 360 to manage buyer costing, vendor bidding, factory orders, inspections and invoicing across their suppliers in South Asia. Our team in Chennai works 1.5 hours ahead of UAE time, so support hours overlap fully.",
    intro:
      "The UAE garment trade is built on sourcing and re-export: offices in Dubai buy from factories in India, Bangladesh and Sri Lanka and sell on to retailers in the Gulf, Africa and Europe. That makes vendor control and order visibility the main job of the software.",
    industry:
      "Trading companies here rarely own every factory they buy from. They need costing, vendor bids, factory orders and quality results from many suppliers in one place, often with several currencies on the same order.",
    points: [
      { icon: "target", title: "Vendor bidding", text: "Suppliers register and quote online; compare bids side by side." },
      { icon: "order", title: "Trading and commission orders", text: "Factory orders on either basis, with projected profit." },
      { icon: "offline", title: "Inspections at the supplier", text: "QA audits recorded offline in the factory and synced later." },
      { icon: "clock", title: "Same working day", text: "Chennai is 1.5 hours ahead of the UAE, so our support day overlaps yours." },
    ],
    products: ["buying-house-management", "garment-inspection-software", "garment-erp-knit-woven"],
    caseStudies: ["padma-textiles-target-bms", "echo-sourcing-asktek-bms"],
    faqs: [
      { q: "Can TARGET 360 manage suppliers in several countries?", a: "Yes. Target BMS keeps vendors, bids, factory orders and inspections for every supplier in one system, wherever the factory is." },
      { q: "How is support provided in the UAE?", a: "Implementation and support are delivered by the ASK Technology team. Chennai is 1.5 hours ahead of UAE time, so our working day overlaps yours." },
      { q: "Is it suitable for garment trading companies?", a: "Yes. Target BMS was built for businesses that source from factories rather than own them: costing, vendor bidding, factory orders, inspections and invoicing." },
    ],
    seo: {
      title: "Garment ERP and Buying House Software in Dubai, UAE",
      description:
        "TARGET 360 for garment trading companies, buying offices and manufacturers in Dubai, Sharjah and Ajman: vendor bidding, orders, QA and invoicing.",
    },
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    short: "UK",
    h1: "Apparel PLM and sourcing software for UK fashion businesses",
    answer:
      "UK fashion brands, importers and sourcing offices use TARGET 360 to manage product development, sampling, costing, supplier bidding, factory orders and quality inspection with factories in South Asia. Buyers see live order and inspection status without waiting for weekly reports from their suppliers.",
    intro:
      "Most UK fashion businesses design in Britain and manufacture in India, Bangladesh, Sri Lanka or Turkey. The distance makes visibility the main problem: what stage is my order at, and did it pass inspection?",
    industry:
      "UK buyers also face growing scrutiny of their supply chains. Keeping specifications, approvals, factory orders and inspection results in one system makes it easier to show where and how a product was made.",
    points: [
      { icon: "swatch", title: "Product development", text: "Styles, specs, samples and approvals in one record per product." },
      { icon: "chain", title: "Supplier management", text: "Vendor bids, factory orders and T&A plans with every supplier." },
      { icon: "shield", title: "Inspection results", text: "QA results from the factory floor, synced the same day." },
      { icon: "lock", title: "Buyer access", text: "Log-based access so each team sees what it needs." },
    ],
    products: ["garment-erp-brands", "buying-house-management", "garment-inspection-software"],
    caseStudies: ["echo-sourcing-asktek-bms", "connoisseur-fashions-target-erp", "harpa-retail-plm-erp"],
    faqs: [
      { q: "Do UK-linked businesses use TARGET 360?", a: "Yes. Echo Sourcing, a design-to-delivery fashion house with a creative hub in London, uses Target BMS, and Connoisseur Fashions manufactures for buyers in the UK and Europe on TARGET 360." },
      { q: "Can our factories in Asia use the same system?", a: "Yes. Suppliers and factories work in the same system, so specifications, orders and inspection results are shared." },
      { q: "What are support hours for UK customers?", a: "Chennai is 4.5 hours ahead of UK time in summer and 5.5 hours in winter, so UK mornings overlap with our afternoon support hours." },
    ],
    seo: {
      title: "Apparel PLM and Sourcing Software for UK Fashion Brands",
      description:
        "TARGET 360 for UK brands and sourcing offices: product development, sampling, supplier orders and inspection status from factories in Asia.",
    },
  },
  {
    slug: "bangladesh",
    name: "Bangladesh",
    short: "Bangladesh",
    h1: "Garment ERP software in Bangladesh",
    answer:
      "RMG manufacturers and buying offices in Bangladesh use TARGET 360 to run costing, merchandising, multi-factory inventory, production planning, line balancing and quality inspection. Saturn Textiles, with factories across five zones, uses TARGET 360 ERP with operation bulletin planning to connect its units and cut costs.",
    intro:
      "Bangladesh's ready-made garment industry runs at large volumes, often across several factories and group companies. Moving material and work in progress between units without losing track is where most systems fail.",
    industry:
      "Factories here work to tight buyer lead times and strict compliance audits. The groups that scale are the ones that see costs, stock and output across every unit in one view.",
    points: [
      { icon: "chain", title: "Group companies", text: "Inter-company movement of raw material and WIP, with a consolidated view." },
      { icon: "clock", title: "Line planning", text: "Operation bulletins, SMV and hourly output with Quick OB." },
      { icon: "wallet", title: "Cost visibility", text: "Total cost by expense head, process and item." },
      { icon: "shield", title: "Compliance data", text: "Statutory compliance without manual data entry." },
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software", "buying-house-management"],
    caseStudies: ["saturn-textiles-target-erp"],
    faqs: [
      { q: "Is TARGET 360 used in Bangladesh?", a: "Yes. Saturn Textiles, a Bangladesh textile group with cut-and-sew and fabric mills across five zones, runs TARGET 360 ERP with operation bulletin planning." },
      { q: "Can it handle several factories in one group?", a: "Yes. TARGET 360 manages inventory and production across multiple companies, including inter-company transfers of raw material and WIP." },
      { q: "What time zone is support in?", a: "Chennai is 30 minutes behind Bangladesh time, so our working days are almost identical." },
    ],
    seo: {
      title: "Garment ERP Software in Bangladesh | TARGET 360",
      description:
        "ERP for RMG manufacturers and buying offices in Dhaka, Gazipur, Narayanganj and Chattogram. Multi-factory stock, planning, SMV and QA.",
    },
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    short: "Sri Lanka",
    h1: "Apparel ERP software in Sri Lanka",
    answer:
      "Apparel manufacturers and sourcing offices in Sri Lanka use TARGET 360 to manage costing, sampling, merchandising, production planning, line efficiency and quality inspection. Sri Lanka shares India's time zone, so our Chennai team supports you through the same working day.",
    intro:
      "Sri Lankan apparel makers are known for intimates, activewear and high-quality fashion for global brands. That work depends on precise specifications, careful sampling and close control of the line.",
    industry:
      "Factories here compete on quality and reliability rather than the lowest price, which puts the emphasis on sampling accuracy, line efficiency and inspection data that buyers can trust.",
    points: [
      { icon: "swatch", title: "Sampling accuracy", text: "Sample specs, costs and approvals carried into bulk production." },
      { icon: "chart", title: "Line efficiency", text: "SMV, balanced lines and hourly output with Quick OB." },
      { icon: "shield", title: "Inspection data", text: "QA results on a phone, synced to the web." },
      { icon: "clock", title: "Same time zone", text: "Sri Lanka and India share a time zone, so support runs on your day." },
    ],
    products: ["garment-erp-knit-woven", "garment-erp-brands", "operation-bulletin-quick-ob", "garment-inspection-software"],
    caseStudies: [],
    faqs: [
      { q: "Is support available during Sri Lankan working hours?", a: "Yes. Sri Lanka and India share the same time zone, so our support day is your working day." },
      { q: "Can TARGET 360 handle sampling for brands?", a: "Yes. TARGET 360 for Brands covers sample costing, sample orders, pooled purchasing, barcode tracking and reconciliation, linked to bulk production." },
    ],
    seo: {
      title: "Apparel ERP Software in Sri Lanka | TARGET 360",
      description:
        "TARGET 360 for apparel manufacturers in Colombo, Katunayake and Biyagama: sampling, costing, line efficiency and QA, supported from Chennai.",
    },
  },
];

export const cities: City[] = [
  // ─── India ───
  {
    slug: "tiruppur", country: "india", name: "Tiruppur", region: "Tamil Nadu",
    h1: "Garment ERP software for Tiruppur knitwear exporters",
    answer:
      "Tiruppur knitwear exporters use TARGET 360 to cost colourways, track yarn and fabric through outside knitting, dyeing and printing units, plan sewing lines and follow orders to shipment. It is built for the fast, job-work-heavy way Tiruppur units run export orders.",
    cluster:
      "Tiruppur is India's knitwear capital, producing cotton T-shirts, polos, innerwear and kidswear for buyers in Europe and the US. Few units do every process in-house: yarn goes out for knitting, fabric for dyeing and compacting, panels for printing or embroidery, and comes back to be stitched and packed.",
    makes: ["T-shirts and polos", "Innerwear", "Kidswear", "Nightwear and loungewear"],
    challenges: [
      "Knowing exactly what material is sitting with which job-worker",
      "Costing many colourways and sizes for small, fast orders",
      "Hitting short lead times with no slack in the schedule",
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "buying-house-management"],
    faqs: [
      { q: "Is TARGET 360 used by Tirupur businesses?", a: "Yes. SNQS, a merchandising service based in Tirupur and Chennai that sources apparel for the US, Canada and Western Europe, runs on Target BMS." },
      { q: "Can we track fabric sent for dyeing or printing?", a: "Yes. Material movements to and from outside processors are recorded against the order, so you can see what each job-worker holds." },
    ],
    seo: { title: "Garment ERP Software in Tiruppur | Knitwear ERP", description: "ERP for Tiruppur knitwear exporters: colour-wise costing, job-work tracking for knitting and dyeing, line planning and export invoicing." },
  },
  {
    slug: "chennai", country: "india", name: "Chennai", region: "Tamil Nadu",
    h1: "Garment ERP software in Chennai",
    answer:
      "ASK Technology is based in Kodambakkam, Chennai. Chennai's woven and knit export houses and buying offices use TARGET 360 for costing, merchandising, production, inspection and export invoicing, with implementation and support from a team that can be at your factory the same day.",
    cluster:
      "Chennai and its industrial belt, from Ambattur and Guindy to the zones along the Sriperumbudur corridor, are home to long-established export houses making woven and knit garments for European and American buyers, alongside buying offices that source across Tamil Nadu.",
    makes: ["Woven shirts and dresses", "Kidswear", "Knit tops", "Fashion for European brands"],
    challenges: [
      "Running several units and an office on one set of numbers",
      "Replacing tech packs and costing held in Excel",
      "Getting inspection and output data without waiting for reports",
    ],
    products: ["garment-erp-knit-woven", "buying-house-management", "garment-inspection-software"],
    faqs: [
      { q: "Which Chennai companies use TARGET 360?", a: "Published stories include Vijay Garments, Vijay Enterprises, Bhagayam Exports and Attire Creation, all Chennai garment manufacturers and exporters." },
      { q: "Can your team visit our factory?", a: "Yes. Our office is in Kodambakkam, Chennai, and our team works on site with Chennai customers during implementation and training." },
    ],
    seo: { title: "Garment ERP Software in Chennai | ASK Technology", description: "Chennai-built garment ERP for export houses and buying offices. Used by Vijay Garments, Bhagayam Exports and Attire Creation." },
  },
  {
    slug: "coimbatore", country: "india", name: "Coimbatore", region: "Tamil Nadu",
    h1: "Textile and garment ERP software in Coimbatore",
    answer:
      "Coimbatore textile and garment businesses use TARGET 360 to connect yarn and fabric stock with garment orders, costing, production planning and quality. It suits groups that run spinning or fabric operations alongside garment units and need one view of material and cost.",
    cluster:
      "Coimbatore is the centre of Tamil Nadu's spinning and textile machinery industry, and many groups here have moved downstream into fabric and garment making. That means yarn, fabric and finished garments often sit under one management team.",
    makes: ["Yarn and fabric", "Knit and woven garments", "Home textiles"],
    challenges: [
      "Tracking material from yarn to finished garment across units",
      "Costing garments with in-house fabric at the right transfer price",
      "One view of inventory across mills and garment units",
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "target-360-hrms"],
    faqs: [
      { q: "Can TARGET 360 handle inter-unit transfers?", a: "Yes. It records the movement of raw material and WIP between units and companies, with a consolidated view of cost and stock." },
      { q: "Does it include payroll for large workforces?", a: "Yes. TARGET 360 HRMS handles attendance, shifts, overtime and payroll on the same platform." },
    ],
    seo: { title: "Textile and Garment ERP Software in Coimbatore", description: "ERP for Coimbatore textile groups and garment units: yarn-to-garment stock, costing, production planning and payroll." },
  },
  {
    slug: "bengaluru", country: "india", name: "Bengaluru", region: "Karnataka",
    h1: "Garment ERP software in Bengaluru",
    answer:
      "Bengaluru's large woven and knit garment manufacturers and sourcing offices use TARGET 360 for production planning, line balancing, hourly output, inspection and payroll. It fits big multi-unit operations where line efficiency and workforce management decide the margin.",
    cluster:
      "Bengaluru is one of India's biggest garment manufacturing centres, with large factories around Peenya, Bommanahalli and Mysore Road making formal and casual wear for global brands, and many of those brands keeping sourcing offices in the city.",
    makes: ["Men's and women's woven wear", "Trousers and shirts", "Casual knitwear"],
    challenges: [
      "Balancing long sewing lines with large, changing workforces",
      "Tracking hourly output across many units",
      "Running payroll and overtime for thousands of operators",
    ],
    products: ["operation-bulletin-quick-ob", "garment-erp-knit-woven", "target-360-hrms"],
    faqs: [
      { q: "Is there a Bengaluru customer on TARGET 360?", a: "LAJ Exports, a design-first apparel manufacturer with units in Delhi, Noida, Gurgaon and Bangalore, runs on ASKTEK ERP." },
      { q: "Can Quick OB be used across many lines?", a: "Yes. Every line gets its operation bulletin, hourly targets and output tracking, and management sees all of them together." },
    ],
    seo: { title: "Garment ERP Software in Bengaluru | TARGET 360", description: "Production planning, SMV and line balancing, hourly output and payroll for Bengaluru garment manufacturers and sourcing offices." },
  },
  {
    slug: "delhi-ncr", country: "india", name: "Delhi NCR", region: "Delhi, Noida and Gurugram",
    h1: "Garment ERP software in Delhi NCR, Noida and Gurugram",
    answer:
      "Export houses and buying houses in Delhi, Noida, Okhla and Gurugram use TARGET 360 to manage fashion orders with heavy sampling, embellishment and handwork, plus costing, merchandising, inventory and inspection. LAJ Exports, with units across Delhi, Noida and Gurgaon, runs on ASKTEK ERP.",
    cluster:
      "Delhi NCR is India's fashion export hub, known for women's wear, embroidery, embellishment and fast sampling for European and American high-street brands. Many international buying houses also have offices here.",
    makes: ["Women's fashion", "Embroidered and embellished garments", "Dresses and tops", "Kidswear"],
    challenges: [
      "Heavy sampling with many revisions per style",
      "Tracking pieces sent out for embroidery and handwork",
      "Managing many small, fast-changing fashion orders",
    ],
    products: ["garment-erp-knit-woven", "garment-erp-brands", "buying-house-management"],
    faqs: [
      { q: "Which NCR company uses TARGET 360?", a: "LAJ Exports, founded in 1997, automated inventory, production planning, scheduling and cost control with ASKTEK ERP across its Delhi, Noida and Gurgaon units." },
      { q: "Can we manage sampling revisions?", a: "Yes. TARGET 360 for Brands records sample orders, assortments, costs and approvals so every revision is tracked." },
    ],
    seo: { title: "Garment ERP Software in Delhi NCR, Noida, Gurugram", description: "ERP for NCR export and buying houses: sampling, embellishment job-work, costing, inventory and inspection. Used by LAJ Exports." },
  },
  {
    slug: "ludhiana", country: "india", name: "Ludhiana", region: "Punjab",
    h1: "Knitwear and woollen garment ERP in Ludhiana",
    answer:
      "Ludhiana's woollen knitwear and hosiery manufacturers use TARGET 360 to plan seasonal production, track yarn and finished stock, cost styles by colour and size and manage dispatches. It helps units that produce for a short winter season keep stock and cash under control.",
    cluster:
      "Ludhiana is India's centre for woollen and acrylic knitwear: sweaters, cardigans, jackets and winter wear for the domestic market and for export, along with hosiery and T-shirts.",
    makes: ["Sweaters and cardigans", "Winter jackets", "Hosiery", "Thermal wear"],
    challenges: [
      "Planning a year's output for a short selling season",
      "Holding the right yarn and finished stock without over-producing",
      "Costing many designs and colours quickly",
    ],
    products: ["garment-erp-knit-woven", "garment-erp-brands", "target-360-hrms"],
    faqs: [
      { q: "Does TARGET 360 work for woollen knitwear?", a: "Yes. TARGET 360 ERP is built for knit and woven manufacturers, and inventory, costing and production are configured to your products." },
      { q: "Can it help with seasonal stock?", a: "Inventory forecasting, multi-location stock and reconciliation reports help you see what to make and what is left at season end." },
    ],
    seo: { title: "Knitwear and Woollen Garment ERP in Ludhiana", description: "ERP for Ludhiana knitwear and hosiery makers: seasonal planning, yarn and finished stock, colour-wise costing and dispatch." },
  },
  {
    slug: "mumbai", country: "india", name: "Mumbai", region: "Maharashtra",
    h1: "Apparel ERP and PLM software in Mumbai",
    answer:
      "Apparel brands, retailers and garment traders headquartered in Mumbai use TARGET 360 to manage product development, sampling, sourcing from manufacturers, costing, inventory and outlets. PLM and ERP together give brand teams one record per style from design to store.",
    cluster:
      "Mumbai is the commercial base of India's apparel trade: brand headquarters, retail chains, wholesalers and sourcing teams, with manufacturing spread across Maharashtra and other states.",
    makes: ["Branded menswear and womenswear", "Denim and casualwear", "Ethnic wear"],
    challenges: [
      "Coordinating design, sourcing and merchandising teams",
      "Following orders placed with many outside manufacturers",
      "Seeing stock across warehouses and outlets",
    ],
    products: ["garment-erp-brands", "buying-house-management", "garment-erp-knit-woven"],
    faqs: [
      { q: "Can brands manage outside manufacturers?", a: "Yes. Target BMS handles vendor bids, factory orders, time and action plans and inspections with each manufacturer." },
      { q: "Does TARGET 360 support outlets?", a: "Yes. The outlet management dashboard shows every outlet with real-time reporting." },
    ],
    seo: { title: "Apparel ERP and PLM Software in Mumbai | TARGET 360", description: "PLM and ERP for Mumbai apparel brands and retailers: product development, sourcing, costing, inventory and outlet reporting." },
  },
  {
    slug: "kolkata", country: "india", name: "Kolkata", region: "West Bengal",
    h1: "Hosiery and garment ERP software in Kolkata",
    answer:
      "Kolkata hosiery, innerwear and menswear manufacturers use TARGET 360 to manage high-volume production, distribution stock, costing and payroll. It suits businesses that make large quantities of basic styles and sell through distributors and wholesalers across India.",
    cluster:
      "Kolkata is the home of India's branded hosiery and innerwear industry and a large tailoring and readymade garment cluster, supplying the domestic market through extensive distributor networks.",
    makes: ["Innerwear and vests", "Hosiery", "Menswear", "Kidswear"],
    challenges: [
      "Planning high volumes of basic styles across many sizes",
      "Tracking stock with distributors and depots",
      "Managing piece-rate and shift workers",
    ],
    products: ["garment-erp-knit-woven", "target-360-hrms", "operation-bulletin-quick-ob"],
    faqs: [
      { q: "Can TARGET 360 handle distribution?", a: "Yes. Royal Stitch, a garment manufacturing and distribution business, centralised inventory, sales, purchase, manufacturing, accounting and payroll on Target ERP." },
      { q: "Does HRMS cover factory workers?", a: "Yes. Attendance, shifts, overtime and payroll for the whole workforce." },
    ],
    seo: { title: "Hosiery and Garment ERP Software in Kolkata", description: "ERP for Kolkata hosiery, innerwear and menswear makers: volume production, distributor stock, costing and factory payroll." },
  },
  {
    slug: "hyderabad", country: "india", name: "Hyderabad", region: "Telangana",
    h1: "Garment and textile ERP software in Hyderabad",
    answer:
      "Garment and textile businesses in Hyderabad and across Telangana use TARGET 360 to set up connected systems for costing, production, inventory, quality and payroll from the start. New units built around the state's textile parks can run digitally from the first order.",
    cluster:
      "Telangana is building a larger textile and apparel base, including the Kakatiya Mega Textile Park at Warangal and the PM MITRA park plans, alongside Hyderabad's brands, traders and garment units.",
    makes: ["Cotton garments", "Uniforms", "Domestic brand apparel"],
    challenges: [
      "Setting up systems for a new or expanding unit",
      "Training a new workforce quickly",
      "Meeting buyer requirements from the first order",
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "target-360-hrms"],
    faqs: [
      { q: "Is TARGET 360 suitable for a new factory?", a: "Yes. Starting on TARGET 360 avoids moving from spreadsheets later. Modules can be added as the unit grows." },
      { q: "Do you train new teams?", a: "Yes. Training and workshops for every role are part of our engagement model." },
    ],
    seo: { title: "Garment and Textile ERP Software in Hyderabad", description: "ERP for Hyderabad and Telangana garment and textile units: costing, production, inventory, quality and payroll from day one." },
  },
  {
    slug: "pune", country: "india", name: "Pune", region: "Maharashtra",
    h1: "Apparel ERP software in Pune and western Maharashtra",
    answer:
      "Apparel brands and garment manufacturers in Pune and western Maharashtra, including the Solapur and Ichalkaranji textile belts, use TARGET 360 for product development, costing, production planning, inventory and payroll on one platform.",
    cluster:
      "Pune hosts apparel brand teams and online fashion businesses, while nearby Solapur is known for uniforms and terry products and Ichalkaranji for powerloom fabric, linking brand, fabric and garment making in one region.",
    makes: ["Uniforms", "Casualwear", "Online fashion brands"],
    challenges: [
      "Linking fabric sourcing with garment orders",
      "Managing many SKUs for online channels",
      "Following production at outside units",
    ],
    products: ["garment-erp-brands", "garment-erp-knit-woven", "buying-house-management"],
    faqs: [
      { q: "Can online brands use TARGET 360?", a: "Yes. PLM, costing, sourcing and inventory help brands that sell online manage many styles and sizes." },
      { q: "Can we follow orders at outside manufacturers?", a: "Yes. Factory orders, time and action plans and inspections are tracked per manufacturer in Target BMS." },
    ],
    seo: { title: "Apparel ERP Software in Pune | TARGET 360", description: "ERP and PLM for Pune apparel brands and western Maharashtra garment makers: development, costing, production and inventory." },
  },
  {
    slug: "ahmedabad", country: "india", name: "Ahmedabad", region: "Gujarat",
    h1: "Denim and garment ERP software in Ahmedabad",
    answer:
      "Denim and garment manufacturers in Ahmedabad use TARGET 360 to connect fabric stock with garment orders, cost washes and finishes, plan production and track output to dispatch. It fits groups that make fabric and garments, and garment units buying denim from local mills.",
    cluster:
      "Ahmedabad has been a textile city for over a century and is one of India's largest denim fabric centres, with garment units making jeans, jackets and casualwear around it.",
    makes: ["Denim jeans and jackets", "Casualwear", "Fabric and garments"],
    challenges: [
      "Costing washes, finishes and trims on top of fabric",
      "Tracking fabric by roll and shade",
      "Planning production around washing and finishing capacity",
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software"],
    faqs: [
      { q: "Can TARGET 360 track fabric rolls?", a: "Yes. Materials can be tracked with barcodes from receipt to production." },
      { q: "Can we cost processes like washing?", a: "Yes. Costing covers materials, processes and overheads, configured to your products." },
    ],
    seo: { title: "Denim and Garment ERP Software in Ahmedabad", description: "ERP for Ahmedabad denim and garment makers: roll tracking, process costing, production planning and inspection." },
  },
  {
    slug: "surat", country: "india", name: "Surat", region: "Gujarat",
    h1: "Textile and garment ERP software in Surat",
    answer:
      "Surat textile traders and garment makers use TARGET 360 to manage fabric stock, embroidery and value-addition job-work, costing, orders and dispatch. It helps businesses that move many designs through outside processors keep control of material and margin.",
    cluster:
      "Surat is India's man-made fibre hub, known for synthetic fabrics, sarees, dress materials and embroidery, with a growing number of units moving from fabric into readymade garments.",
    makes: ["Synthetic fabrics", "Sarees and dress materials", "Ethnic garments", "Embroidered products"],
    challenges: [
      "Tracking fabric sent out for printing and embroidery",
      "Costing many designs with value addition",
      "Managing stock across godowns",
    ],
    products: ["garment-erp-knit-woven", "garment-erp-brands", "buying-house-management"],
    faqs: [
      { q: "Can we track job-work for embroidery?", a: "Yes. Material movements to and from outside processors are recorded against the order." },
      { q: "Does TARGET 360 handle many godowns?", a: "Yes. Multi-location inventory shows stock across every warehouse." },
    ],
    seo: { title: "Textile and Garment ERP Software in Surat", description: "ERP for Surat textile and garment businesses: fabric stock, embroidery job-work, design costing, orders and dispatch." },
  },
  {
    slug: "jaipur", country: "india", name: "Jaipur", region: "Rajasthan",
    h1: "Garment ERP software for Jaipur exporters",
    answer:
      "Jaipur exporters of block-printed, hand-crafted and ethnic garments use TARGET 360 to manage sampling, artisan and job-work processes, costing, orders and export documents. It keeps handwork-heavy orders on schedule and on budget.",
    cluster:
      "Jaipur and Sanganer are known worldwide for hand block printing, dyeing and ethnic wear, with exporters supplying boutiques and brands that value hand-made detail.",
    makes: ["Block-printed garments", "Kurtas and ethnic wear", "Resort wear", "Scarves and stoles"],
    challenges: [
      "Scheduling handwork that cannot be rushed",
      "Costing hand processes accurately",
      "Following pieces across printers and artisans",
    ],
    products: ["garment-erp-knit-woven", "garment-erp-brands", "buying-house-management"],
    faqs: [
      { q: "Can we track work at printers and artisans?", a: "Yes. Every movement of material to outside processors is recorded against the order." },
      { q: "Can export invoices follow buyer formats?", a: "Yes. Commercial invoicing produces documents to each buyer's requirements." },
    ],
    seo: { title: "Garment ERP Software for Jaipur Exporters", description: "ERP for Jaipur block-print and ethnic garment exporters: sampling, job-work tracking, process costing and export invoicing." },
  },
  {
    slug: "indore", country: "india", name: "Indore", region: "Madhya Pradesh",
    h1: "Readymade garment ERP software in Indore",
    answer:
      "Indore readymade garment manufacturers use TARGET 360 to manage production, inventory, costing, dispatch to dealers and payroll. It helps growing domestic-market units move off registers and spreadsheets without slowing down production.",
    cluster:
      "Indore has a large readymade garment cluster supplying shirts, trousers, jeans and kidswear to dealers and retailers across central and western India.",
    makes: ["Shirts and trousers", "Jeans", "Kidswear"],
    challenges: [
      "Moving from registers to a system without stopping work",
      "Stock across sizes and colours for dealer orders",
      "Labour costs and attendance",
    ],
    products: ["garment-erp-knit-woven", "target-360-hrms", "operation-bulletin-quick-ob"],
    faqs: [
      { q: "Can TARGET 360 import our existing data?", a: "Yes. Excel import and export make it easier to move from spreadsheets, as SNQS found when adopting Target BMS." },
      { q: "Is training included?", a: "Training for every role is part of the implementation." },
    ],
    seo: { title: "Readymade Garment ERP Software in Indore", description: "ERP for Indore readymade garment makers: production, size-colour stock, dealer dispatch, costing and payroll." },
  },
  // ─── UAE ───
  {
    slug: "dubai", country: "uae", name: "Dubai", region: "Dubai",
    h1: "Garment ERP and sourcing software in Dubai",
    answer:
      "Dubai garment trading companies, sourcing offices and fashion retailers use TARGET 360 to cost styles, run vendor bidding, place and follow factory orders, inspect at suppliers and raise invoices, with every supplier in one system. Support from Chennai overlaps the full Dubai working day.",
    cluster:
      "Dubai is the Gulf's garment trading and re-export hub. Companies in Deira, the free zones and Jebel Ali buy from factories across South Asia and supply retailers in the GCC, Africa and Europe.",
    makes: ["Garment trading and re-export", "Retail sourcing", "Uniforms and workwear supply"],
    challenges: [
      "Following orders with many suppliers in several countries",
      "Comparing vendor quotes quickly",
      "Getting reliable inspection results before goods ship",
    ],
    products: ["buying-house-management", "garment-inspection-software", "garment-erp-brands"],
    faqs: [
      { q: "Can we manage suppliers in India and Bangladesh from Dubai?", a: "Yes. Target BMS holds vendors, bids, factory orders, T&A plans and inspections for every supplier in one system." },
      { q: "What are support hours for Dubai?", a: "Chennai is 1.5 hours ahead of Dubai, so our support hours cover your working day." },
    ],
    seo: { title: "Garment ERP and Sourcing Software in Dubai", description: "TARGET 360 for Dubai garment traders and sourcing offices: vendor bidding, factory orders, inspections and invoicing." },
  },
  {
    slug: "sharjah", country: "uae", name: "Sharjah", region: "Sharjah",
    h1: "Garment manufacturing ERP software in Sharjah",
    answer:
      "Garment manufacturers and traders in Sharjah's industrial areas and free zones use TARGET 360 to run orders, costing, stores, production and quality, and to manage export documents. It brings the same production control used in Asian factories to UAE-based units.",
    cluster:
      "Sharjah has a long-standing garment manufacturing base in its industrial areas and free zones, producing uniforms, workwear and fashion for the UAE and export, alongside trading companies.",
    makes: ["Uniforms and workwear", "Garments for export", "Fashion for regional retail"],
    challenges: [
      "Production control in a smaller, mixed-order factory",
      "Material stock across factory and trading operations",
      "Export documentation",
    ],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "buying-house-management"],
    faqs: [
      { q: "Can TARGET 360 handle manufacturing and trading together?", a: "Yes. ERP covers your own production, and Target BMS covers orders placed with outside factories." },
    ],
    seo: { title: "Garment Manufacturing ERP Software in Sharjah", description: "ERP for Sharjah garment manufacturers and traders: orders, costing, stores, production, quality and export documents." },
  },
  {
    slug: "ajman", country: "uae", name: "Ajman", region: "Ajman",
    h1: "Garment factory ERP software in Ajman",
    answer:
      "Garment factories in Ajman use TARGET 360 to plan production, balance lines, track hourly output, control fabric and trims and inspect quality before shipment. It gives smaller units the same visibility larger groups rely on.",
    cluster:
      "Ajman's free zone and industrial area host many small and mid-sized garment factories, often producing fashion, abayas and uniforms for retailers in the UAE and the wider region.",
    makes: ["Fashion garments", "Abayas", "Uniforms"],
    challenges: [
      "Running many short orders with a small team",
      "Line efficiency with changing styles",
      "Controlling material wastage",
    ],
    products: ["operation-bulletin-quick-ob", "garment-erp-knit-woven", "garment-inspection-software"],
    faqs: [
      { q: "Is TARGET 360 too big for a small factory?", a: "No. You can start with one module, such as Quick OB for line planning, and add others when you need them." },
    ],
    seo: { title: "Garment Factory ERP Software in Ajman", description: "Production planning, SMV and line balancing, material control and QA for Ajman garment factories. TARGET 360." },
  },
  {
    slug: "abu-dhabi", country: "uae", name: "Abu Dhabi", region: "Abu Dhabi",
    h1: "Apparel ERP and sourcing software in Abu Dhabi",
    answer:
      "Apparel retailers, uniform suppliers and sourcing teams in Abu Dhabi use TARGET 360 to manage product specifications, supplier orders, inspections and stock, with clear status for every order placed with manufacturers abroad.",
    cluster:
      "Abu Dhabi's apparel activity centres on retail groups, government and corporate uniform supply and industrial zones, most of it sourced from manufacturers in South Asia.",
    makes: ["Uniform supply", "Retail sourcing", "Corporate apparel"],
    challenges: [
      "Specification control for large uniform contracts",
      "Following supplier deliveries against contract dates",
      "Inspection before acceptance",
    ],
    products: ["buying-house-management", "garment-inspection-software", "garment-erp-brands"],
    faqs: [
      { q: "Can TARGET 360 manage uniform contracts?", a: "Specifications, supplier orders, time and action plans and inspections are tracked per order, which suits contract supply." },
    ],
    seo: { title: "Apparel ERP and Sourcing Software in Abu Dhabi", description: "TARGET 360 for Abu Dhabi retailers and uniform suppliers: specs, supplier orders, inspections and stock in one system." },
  },
  // ─── United Kingdom ───
  {
    slug: "london", country: "united-kingdom", name: "London", region: "England",
    h1: "Fashion PLM and sourcing software in London",
    answer:
      "London fashion brands and design-led sourcing houses use TARGET 360 to manage product development, sampling, costing, supplier bidding, factory orders and inspection with manufacturers in Asia. Echo Sourcing, which has a creative hub in London, runs on Target BMS.",
    cluster:
      "London is the design and buying centre of UK fashion: brand headquarters, design studios and sourcing houses that develop products in Britain and manufacture overseas.",
    makes: ["Fashion brands", "Design and sourcing houses", "Retail buying teams"],
    challenges: [
      "Keeping specs and samples aligned with overseas factories",
      "Seeing order and inspection status without chasing suppliers",
      "Tech packs and BOMs built by hand",
    ],
    products: ["garment-erp-brands", "buying-house-management", "garment-inspection-software"],
    faqs: [
      { q: "Is TARGET 360 used by a London-linked business?", a: "Yes. Echo Sourcing, a design-to-delivery fashion house with its own factory and a creative hub in London, uses Target BMS to speed up tech pack creation and production timelines." },
    ],
    seo: { title: "Fashion PLM and Sourcing Software in London", description: "PLM, sampling, supplier orders and inspection status for London fashion brands and sourcing houses. Used by Echo Sourcing." },
  },
  {
    slug: "manchester", country: "united-kingdom", name: "Manchester", region: "England",
    h1: "Apparel sourcing and PLM software in Manchester",
    answer:
      "Manchester fashion retailers and online brands use TARGET 360 to run fast product development, supplier bidding, factory orders and inspection with overseas manufacturers, keeping high style counts and short lead times under control.",
    cluster:
      "Manchester and the North West are home to some of the UK's fastest-growing online fashion retailers and a long textile history, with large buying and sourcing teams working with factories abroad.",
    makes: ["Online fashion", "Fast fashion sourcing", "Wholesale apparel"],
    challenges: [
      "Very high style counts with short lead times",
      "Supplier visibility and accountability",
      "Specs and samples changing late",
    ],
    products: ["garment-erp-brands", "buying-house-management", "garment-inspection-software"],
    faqs: [
      { q: "Can TARGET 360 handle many styles a week?", a: "Yes. Style libraries, duplication and pooled sample purchasing help teams launch new lines faster, as Echo Sourcing found." },
    ],
    seo: { title: "Apparel Sourcing and PLM Software in Manchester", description: "TARGET 360 for Manchester fashion retailers and online brands: fast development, supplier bidding, orders and QA." },
  },
  {
    slug: "leicester", country: "united-kingdom", name: "Leicester", region: "England",
    h1: "Garment manufacturing software in Leicester",
    answer:
      "Leicester garment manufacturers use TARGET 360 to plan production, balance lines with SMV, track hourly output, manage material and keep complete records of orders, workers and inspections, which also helps show buyers how and where garments were made.",
    cluster:
      "Leicester is the UK's largest garment manufacturing centre, supplying fast-turnaround orders to British fashion retailers, and its factories are under close scrutiny from buyers on working conditions and records.",
    makes: ["Fast-turnaround fashion", "Jersey and knit garments", "Womenswear"],
    challenges: [
      "Very short UK lead times",
      "Records buyers can audit",
      "Line efficiency with frequent style changes",
    ],
    products: ["operation-bulletin-quick-ob", "garment-erp-knit-woven", "target-360-hrms"],
    faqs: [
      { q: "Can TARGET 360 keep workforce records?", a: "Yes. TARGET 360 HRMS records attendance, hours, overtime and payroll for every worker." },
    ],
    seo: { title: "Garment Manufacturing Software in Leicester", description: "Production planning, SMV, hourly output, material control and workforce records for Leicester garment factories." },
  },
  {
    slug: "birmingham", country: "united-kingdom", name: "Birmingham", region: "England",
    h1: "Apparel ERP software in Birmingham and the Midlands",
    answer:
      "Apparel wholesalers, importers and manufacturers in Birmingham and the Midlands use TARGET 360 to manage supplier orders, inspections, stock and their own production in one system, with clear costs on every order.",
    cluster:
      "Birmingham and the wider Midlands host apparel wholesalers, importers and manufacturers that supply UK retailers and independents, sourcing both locally and overseas.",
    makes: ["Wholesale apparel", "Importers", "Local manufacturing"],
    challenges: [
      "Mixing local production with imports",
      "Stock across warehouses",
      "Order-level margins",
    ],
    products: ["buying-house-management", "garment-erp-knit-woven", "garment-inspection-software"],
    faqs: [
      { q: "Can we manage imports and our own production together?", a: "Yes. Target BMS covers orders placed with suppliers, and TARGET 360 ERP covers your own production and stock." },
    ],
    seo: { title: "Apparel ERP Software in Birmingham | TARGET 360", description: "TARGET 360 for Midlands apparel wholesalers, importers and manufacturers: supplier orders, inspections, stock and margins." },
  },
  // ─── Bangladesh ───
  {
    slug: "dhaka", country: "bangladesh", name: "Dhaka", region: "Dhaka Division",
    h1: "Garment ERP software in Dhaka",
    answer:
      "RMG manufacturers and buying offices in Dhaka use TARGET 360 to manage merchandising, costing, multi-factory inventory, production planning, line efficiency and inspections. Head offices get a consolidated view of every unit, and buying offices see every supplier's status.",
    cluster:
      "Dhaka is the head-office and buying-office capital of Bangladesh's ready-made garment industry, with corporate offices in Gulshan, Banani and Uttara and factories across the surrounding districts.",
    makes: ["Woven and knit RMG", "Denim", "Sweaters", "Buying offices for global brands"],
    challenges: [
      "Consolidating many factories into one view",
      "Tight lead times with compliance audits",
      "Merchandising across many buyers",
    ],
    products: ["garment-erp-knit-woven", "buying-house-management", "operation-bulletin-quick-ob"],
    faqs: [
      { q: "Is TARGET 360 used by Bangladeshi groups?", a: "Yes. Saturn Textiles, with factories across five zones, uses TARGET 360 ERP with operation bulletin planning." },
      { q: "Can buying offices in Dhaka use Target BMS?", a: "Yes. Buyer costing, vendor bidding, factory orders, T&A and offline inspections are built for buying offices." },
    ],
    seo: { title: "Garment ERP Software in Dhaka | TARGET 360", description: "ERP for Dhaka RMG groups and buying offices: merchandising, multi-factory stock, planning, SMV and inspections." },
  },
  {
    slug: "gazipur", country: "bangladesh", name: "Gazipur", region: "Dhaka Division",
    h1: "Garment factory ERP software in Gazipur",
    answer:
      "Large garment factories in Gazipur use TARGET 360 to plan production across many lines, calculate SMV and balance operators, track hourly output, control fabric and trims and record inspections, so management sees the floor in real time.",
    cluster:
      "Gazipur has one of the densest concentrations of garment factories in Bangladesh, with large knit and woven units producing for international brands.",
    makes: ["Knit garments", "Woven garments", "Sweaters"],
    challenges: ["Line efficiency across hundreds of lines", "Material control at scale", "Live output visibility for management"],
    products: ["operation-bulletin-quick-ob", "garment-erp-knit-woven", "garment-inspection-software"],
    faqs: [
      { q: "What results does Quick OB deliver?", a: "AI Enterprises reported 70% faster planning and 30% higher line efficiency within 90 days of using Quick OB." },
    ],
    seo: { title: "Garment Factory ERP Software in Gazipur", description: "Production planning, SMV, line balancing, hourly output and material control for Gazipur garment factories." },
  },
  {
    slug: "narayanganj", country: "bangladesh", name: "Narayanganj", region: "Dhaka Division",
    h1: "Knitwear ERP software in Narayanganj",
    answer:
      "Knitwear and hosiery manufacturers in Narayanganj use TARGET 360 to manage yarn and fabric stock, knitting and dyeing processes, colour-wise costing, production and export orders.",
    cluster:
      "Narayanganj, beside Dhaka, is Bangladesh's traditional knitwear and hosiery centre, with many knit composite units producing T-shirts, polos and basics for export.",
    makes: ["Knit T-shirts and polos", "Hosiery", "Basics"],
    challenges: ["Yarn-to-garment material tracking", "Colour-wise costing", "Fast export lead times"],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software"],
    faqs: [
      { q: "Does TARGET 360 support knit composite units?", a: "Yes. Material, process and production tracking can cover knitting, dyeing and garmenting under one group." },
    ],
    seo: { title: "Knitwear ERP Software in Narayanganj", description: "ERP for Narayanganj knitwear and hosiery makers: yarn and fabric stock, process tracking, colour costing and export orders." },
  },
  {
    slug: "savar-ashulia", country: "bangladesh", name: "Savar and Ashulia", region: "Dhaka Division",
    h1: "Garment ERP software in Savar and Ashulia",
    answer:
      "Export-oriented garment factories in Savar, Ashulia and the Dhaka EPZ use TARGET 360 to run costing, merchandising, production planning, inventory and quality for international buyers, with full records for audits.",
    cluster:
      "Savar and Ashulia, including the Dhaka Export Processing Zone, host many large export factories working for European and American brands.",
    makes: ["Woven and knit exports", "Outerwear", "Bottoms"],
    challenges: ["Buyer audits and records", "Multi-line planning", "Inventory across stores"],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software"],
    faqs: [
      { q: "Can TARGET 360 support statutory compliance?", a: "Saturn Textiles uses TARGET 360 to meet statutory compliance requirements without manual data entry." },
    ],
    seo: { title: "Garment ERP Software in Savar, Ashulia and DEPZ", description: "ERP for export garment factories in Savar, Ashulia and Dhaka EPZ: costing, planning, inventory, quality and audit records." },
  },
  {
    slug: "chattogram", country: "bangladesh", name: "Chattogram", region: "Chattogram Division",
    h1: "Garment ERP software in Chattogram",
    answer:
      "Garment manufacturers and exporters in Chattogram and its export processing zones use TARGET 360 for orders, costing, production, inventory, inspection and export documents, close to Bangladesh's main seaport.",
    cluster:
      "Chattogram is Bangladesh's port city, with export processing zones and garment factories that ship directly through the country's main seaport.",
    makes: ["Woven garments", "Knitwear", "Export manufacturing"],
    challenges: ["Shipment documents and timelines", "Port-linked dispatch planning", "Inventory control"],
    products: ["garment-erp-knit-woven", "garment-inspection-software", "operation-bulletin-quick-ob"],
    faqs: [
      { q: "Does TARGET 360 produce export documents?", a: "Yes. Commercial invoices are created to each buyer's requirements, with packing slips and shipping labels." },
    ],
    seo: { title: "Garment ERP Software in Chattogram | TARGET 360", description: "ERP for Chattogram garment exporters: orders, costing, production, inventory, inspection and export documents." },
  },
  // ─── Sri Lanka ───
  {
    slug: "colombo", country: "sri-lanka", name: "Colombo", region: "Western Province",
    h1: "Apparel ERP software in Colombo",
    answer:
      "Apparel groups and sourcing offices headquartered in Colombo use TARGET 360 to manage product development, sampling, costing, merchandising, production and quality across their factories, with support from Chennai in the same time zone.",
    cluster:
      "Colombo is the headquarters of Sri Lanka's apparel groups and of buying offices for global brands, with factories spread across the Western Province and beyond.",
    makes: ["Intimates and lingerie", "Activewear", "Fashion for global brands"],
    challenges: ["Sampling accuracy for demanding brands", "Group-wide visibility", "Line efficiency on complex garments"],
    products: ["garment-erp-brands", "garment-erp-knit-woven", "operation-bulletin-quick-ob"],
    faqs: [
      { q: "What are support hours for Colombo?", a: "Sri Lanka and India share a time zone, so our support hours match your working day." },
    ],
    seo: { title: "Apparel ERP Software in Colombo, Sri Lanka", description: "TARGET 360 for Colombo apparel groups and buying offices: sampling, costing, merchandising, production and quality." },
  },
  {
    slug: "katunayake", country: "sri-lanka", name: "Katunayake", region: "Gampaha District",
    h1: "Garment factory ERP software in Katunayake",
    answer:
      "Garment factories in the Katunayake Export Processing Zone use TARGET 360 to plan production, calculate SMV, balance lines, track hourly output and record inspections, giving factory managers live numbers instead of end-of-shift reports.",
    cluster:
      "Katunayake, near Colombo's international airport, hosts Sri Lanka's oldest export processing zone and many apparel factories working for international brands.",
    makes: ["Export apparel", "Intimates", "Sportswear"],
    challenges: ["Line efficiency", "Hourly output visibility", "Inspection records for buyers"],
    products: ["operation-bulletin-quick-ob", "garment-erp-knit-woven", "garment-inspection-software"],
    faqs: [
      { q: "Can supervisors see output hour by hour?", a: "Yes. Quick OB shows live target against actual output for every line, hour by hour." },
    ],
    seo: { title: "Garment Factory ERP Software in Katunayake", description: "SMV, line balancing, hourly output and inspection records for apparel factories in Katunayake EPZ." },
  },
  {
    slug: "biyagama", country: "sri-lanka", name: "Biyagama", region: "Gampaha District",
    h1: "Apparel manufacturing ERP software in Biyagama",
    answer:
      "Apparel and textile manufacturers in the Biyagama Export Processing Zone use TARGET 360 to connect fabric and garment operations, plan production, control inventory and record quality, in one system shared with head office.",
    cluster:
      "Biyagama's export processing zone, east of Colombo, hosts apparel and textile manufacturers, including fabric operations that supply garment factories.",
    makes: ["Fabric and garments", "Export apparel"],
    challenges: ["Fabric-to-garment material flow", "Inventory accuracy", "Head office visibility"],
    products: ["garment-erp-knit-woven", "operation-bulletin-quick-ob", "garment-inspection-software"],
    faqs: [
      { q: "Can fabric and garment units share one system?", a: "Yes. TARGET 360 records material and WIP movements between units and companies with a consolidated view." },
    ],
    seo: { title: "Apparel Manufacturing ERP Software in Biyagama", description: "ERP for Biyagama EPZ apparel and textile makers: fabric-to-garment flow, planning, inventory and quality." },
  },
];
