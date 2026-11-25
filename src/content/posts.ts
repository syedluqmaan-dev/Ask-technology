import type { Category, Post } from "@/lib/types";

export const categories: Category[] = [
  { slug: "guides", name: "Guides", description: "In-depth guides for garment manufacturers, exporters and buying houses: apparel ERP explained, Excel versus ERP, SMV calculation and more." },
  { slug: "apparel-erp", name: "Apparel ERP", description: "Articles on garment ERP and apparel PLM: connecting costing, sampling, merchandising, production and export in one system." },
  { slug: "quality", name: "Quality and inspection", description: "Garment quality control articles: inline and final inspection, AQL, offline inspection apps and digital QA for buying houses." },
  { slug: "production", name: "Production and Quick OB", description: "Production articles for garment factories: operation bulletins, SMV, line balancing, skill matrix and hourly output tracking." },
  { slug: "industry", name: "Industry news", description: "Trade, policy and market updates for the apparel industry in India and beyond: tariffs, trade agreements, textile parks and exports." },
];

/** Legacy article categories on asktek.net → new category slugs (used by the import script). */
export const legacyCategoryMap: Record<string, string> = {
  "Apparel ERP": "apparel-erp",
  "Apparel news": "industry",
  "Industry update": "industry",
  "Inspection On Go": "quality",
  "Quick OB": "production",
  "Buying house": "apparel-erp",
  AI: "apparel-erp",
  Events: "industry",
};

const words = (html: string) => html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const mk = (p: Omit<Post, "readMinutes">): Post => ({ ...p, readMinutes: Math.max(2, Math.round(words(p.body.html || "") / 220)) });

/** Pillar guides. The 60 existing asktek.net articles are added by `npm run import:legacy`. */
export const posts: Post[] = [
  mk({
    slug: "what-is-apparel-erp",
    title: "What is apparel ERP? A plain guide for garment manufacturers and exporters",
    excerpt:
      "What an apparel ERP does, how it differs from general ERP and accounting software, which modules matter for which business, and how to tell if you need one.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-11-20",
    author: "ASK Technology",
    body: {
      html: `
<p><strong>Apparel ERP is software that runs a garment business around its orders.</strong> It connects costing, sampling, purchase, stores, production, quality, shipping and accounts, so every department works from the same style, colour and size breakdown instead of its own spreadsheet.</p>
<h2 id="how-it-differs">How apparel ERP differs from general ERP</h2>
<p>General ERP and accounting systems are built for products with one code and one quantity. A garment order is different. One style becomes many colourways and sizes, each with its own fabric and trim requirement, and moves through processes such as cutting, sewing, washing, finishing and inspection that general software does not know about.</p>
<p>An apparel ERP understands these things natively:</p>
<ul>
<li><strong>Colour and size matrices</strong> on orders, BOMs, purchase and stock</li>
<li><strong>Costing sheets</strong> that build up fabric, trims, CMT, processes and margin</li>
<li><strong>Time and action calendars</strong> with planned and actual dates for every milestone</li>
<li><strong>SMV, operation bulletins and line efficiency</strong> for the sewing floor</li>
<li><strong>Cut-to-pack tracking</strong> and work in progress by stage</li>
<li><strong>Inspections</strong> to the buyer's requirements, inline and final</li>
<li><strong>Commercial invoices and packing lists</strong> in each buyer's format</li>
</ul>
<h2 id="modules">Which modules matter for which business</h2>
<table>
<thead><tr><th>Business</th><th>Start with</th><th>Add next</th></tr></thead>
<tbody>
<tr><td>Garment manufacturer</td><td>Orders, stores, production planning</td><td>Line planning (SMV), inspection, payroll</td></tr>
<tr><td>Exporter</td><td>Costing, merchandising, T&amp;A</td><td>Export documents, inspection</td></tr>
<tr><td>Buying house</td><td>Buyer costing, vendor bidding, factory orders</td><td>Offline inspection audits</td></tr>
<tr><td>Fashion brand</td><td>PLM and sampling</td><td>Sourcing, inventory, outlets</td></tr>
</tbody>
</table>
<h2 id="signs">Signs you have outgrown spreadsheets</h2>
<ul>
<li>The same order is typed into three or more files</li>
<li>You know the margin on an order only after it ships</li>
<li>Production status comes from phone calls and end-of-day reports</li>
<li>Fabric is bought again while leftover stock sits in the store</li>
<li>Inspection reports arrive a day after the inspection</li>
</ul>
<p>Any one of these costs money on every order. Together they are why growing garment businesses move to an apparel ERP.</p>
<h2 id="choosing">How to choose an apparel ERP</h2>
<ol>
<li><strong>Ask for a demo on your own style.</strong> A vendor who knows garments can run one of your orders through the software.</li>
<li><strong>Check the floor, not just the office.</strong> Line output, inspection and stores must work on a phone, ideally offline.</li>
<li><strong>Start small.</strong> Choose a system where each module works alone, so you can begin with your biggest pain.</li>
<li><strong>Look for people who stay.</strong> Training for every role and support after go-live matter more than any feature list.</li>
</ol>
<h2 id="target-360">Where TARGET 360 fits</h2>
<p>TARGET 360 by ASK Technology is an apparel ERP with products for each type of business: <a href="/products/garment-erp-knit-woven">TARGET 360 ERP</a> for manufacturers and exporters, <a href="/products/buying-house-management">Target BMS</a> for buying houses, <a href="/products/garment-erp-brands">TARGET 360 for Brands</a> for product development, <a href="/products/operation-bulletin-quick-ob">Quick OB</a> for line planning, <a href="/products/garment-inspection-software">Inspection On Go</a> for quality and <a href="/products/target-360-hrms">TARGET 360 HRMS</a> for payroll.</p>`,
    },
    faqs: [
      { q: "What does ERP stand for?", a: "Enterprise resource planning: software that connects a company's core processes, such as orders, purchase, inventory, production and accounts, in one system." },
      { q: "Is apparel ERP the same as PLM?", a: "No. PLM manages product development: specs, samples and approvals. ERP manages execution: orders, materials, production and accounts. They work best connected." },
    ],
    seo: { title: "What Is Apparel ERP? Guide for Garment Manufacturers", description: "What apparel ERP does, how it differs from general ERP, which modules each garment business needs and how to choose one." },
  }),
  mk({
    slug: "garment-erp-vs-excel",
    title: "Garment ERP vs Excel: what spreadsheets really cost a garment factory",
    excerpt: "Excel is free and flexible, so why do growing garment businesses leave it? Where spreadsheets break, what that costs per order, and how to move without disruption.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-11-18",
    author: "ASK Technology",
    body: {
      html: `
<p><strong>Excel works for a garment business until more than one person needs the same number at the same time.</strong> After that, every order lives in several copies of the truth, and the cost shows up as rework, excess fabric, late shipments and margins nobody can explain.</p>
<h2 id="where-it-breaks">Where spreadsheets break</h2>
<h3>Versions</h3>
<p>The merchandiser's cost sheet, the purchase team's BOM and the planner's schedule are separate files. When the buyer changes a trim, one file gets updated. Connoisseur Fashions found that critical data in Excel could be changed or deleted with no trace, which is one reason it moved to TARGET 360.</p>
<h3>Retyping</h3>
<p>The same order is typed for sampling, again for purchase, again for production and again for the invoice. Each retype is a chance to get a quantity or a colour wrong. Vijay Garments removed this repeated entry from projections to final orders.</p>
<h3>Timing</h3>
<p>A spreadsheet is only as current as its last update. Production reports written at the end of the day tell you about problems you can no longer fix that day.</p>
<h3>Scale</h3>
<p>Each new unit, buyer or merchandiser adds files and formats. Saturn Textiles, with factories across five zones in Bangladesh, needed one view of inventory and costs across companies, which spreadsheets could not give.</p>
<h2 id="what-it-costs">What it costs per order</h2>
<table>
<thead><tr><th>Problem</th><th>Where the money goes</th></tr></thead>
<tbody>
<tr><td>Outdated cost sheet</td><td>Quoting below actual cost; margin lost on every piece</td></tr>
<tr><td>Leftover fabric not visible</td><td>Buying fabric you already have</td></tr>
<tr><td>Late discovery of delays</td><td>Air freight, discounts or cancellations</td></tr>
<tr><td>Paper inspections</td><td>Rework after final inspection instead of inline</td></tr>
<tr><td>Manual time studies</td><td>Lines planned on guesses; lower efficiency</td></tr>
</tbody>
</table>
<h2 id="moving">Moving off Excel without stopping work</h2>
<ol>
<li><strong>Start with the most expensive problem</strong>, often costing, line planning or inspection, rather than everything at once.</li>
<li><strong>Import what you have.</strong> Masters such as buyers, suppliers, items and styles can be imported from Excel. SNQS valued Excel import and export because it made adoption easy.</li>
<li><strong>Test on live orders</strong> before switching the old files off.</li>
<li><strong>Train each role on its own screens</strong>, not on the whole system.</li>
</ol>
<p>Excel will stay useful for analysis. The difference is that the numbers in it will come from one system instead of being the system.</p>`,
    },
    faqs: [
      { q: "Can we keep using Excel with TARGET 360?", a: "Yes. TARGET 360 supports Excel import and export, so you can bring data in and take reports out." },
    ],
    seo: { title: "Garment ERP vs Excel: The Real Cost of Spreadsheets", description: "Where Excel breaks in a garment business, what it costs per order, and how to move to garment ERP without stopping work." },
  }),
  mk({
    slug: "how-to-calculate-smv",
    title: "How to calculate SMV for garment operations, with a worked example",
    excerpt: "SMV drives your CMT price, line targets and efficiency figures. A step-by-step method with a worked example, common mistakes and how to do it faster.",
    category: "Guides",
    categorySlug: "guides",
    date: "2026-11-15",
    author: "ASK Technology",
    body: {
      html: `
<p><strong>SMV (standard minute value) is the time a trained operator needs for one operation at a normal pace, plus allowances.</strong> You calculate it by timing the operation, adjusting for the operator's pace and adding allowances for fatigue and delays.</p>
<h2 id="formula">The formula</h2>
<p><strong>SMV = observed time × performance rating × (1 + allowance)</strong></p>
<ul>
<li><strong>Observed time</strong>: the average time of several timed cycles, in minutes</li>
<li><strong>Performance rating</strong>: the operator's pace compared with a normal pace (100% = normal)</li>
<li><strong>Allowance</strong>: extra time for fatigue, personal needs and small delays, often 12% to 20% in sewing</li>
</ul>
<h2 id="example">Worked example: attach pocket</h2>
<ol>
<li>Time ten cycles. The average is <strong>0.40 minutes</strong>.</li>
<li>Rate the operator at <strong>110%</strong>, because they are working faster than normal. Basic time = 0.40 × 1.10 = <strong>0.44 minutes</strong>.</li>
<li>Add a <strong>15%</strong> allowance: 0.44 × 1.15 = <strong>0.506</strong>.</li>
<li>SMV for attach pocket ≈ <strong>0.51 minutes</strong>.</li>
</ol>
<p>Repeat for every operation and add them up for the garment's total SMV.</p>
<h2 id="using-it">What SMV is used for</h2>
<table>
<thead><tr><th>Use</th><th>How</th></tr></thead>
<tbody>
<tr><td>Hourly target</td><td>60 ÷ SMV × operators × target efficiency</td></tr>
<tr><td>Line efficiency</td><td>(pieces × SMV) ÷ (operators × minutes) × 100</td></tr>
<tr><td>CMT price</td><td>SMV × cost per minute ÷ expected efficiency</td></tr>
<tr><td>Line balancing</td><td>Group operations so each station has a similar SMV load</td></tr>
</tbody>
</table>
<h2 id="mistakes">Common mistakes</h2>
<ul>
<li>Timing too few cycles, or only the fastest operator</li>
<li>Forgetting to rate performance, which bakes one person's speed into the standard</li>
<li>Using last season's SMV after the method or machine changed</li>
<li>Copying SMVs from another factory with different equipment</li>
</ul>
<h2 id="faster">Doing it faster</h2>
<p>A stopwatch study and the arithmetic take hours per style. <a href="/products/operation-bulletin-quick-ob">Quick OB</a> records each cycle with a tap on a phone and calculates SMV immediately, then builds the operation bulletin and hourly targets from it. AI Enterprises reported 70% faster planning after making this change.</p>`,
    },
    faqs: [
      { q: "Is SMV the same as SAM?", a: "Yes. SMV (standard minute value) and SAM (standard allowed minute) describe the same measure." },
      { q: "What allowance should I use?", a: "Many sewing floors use 12% to 20%. Use your company's or buyer's standard and keep it consistent across styles." },
    ],
    seo: { title: "How to Calculate SMV in Garments (Worked Example)", description: "Step-by-step SMV calculation for garment operations with a worked example, the formulas for targets and efficiency, and common mistakes." },
  }),
];

/** Titles of the existing asktek.net articles (newest first), used by the import script to map old IDs to new pages. */
export const legacyPosts: { id: number; title: string; date: string; category: string }[] = [
  { id: 0, date: "2026-08-31", category: "Apparel ERP", title: "7 Signs Your Garment Factory Has Outgrown Excel: garment ERP software for export house" },
  { id: 1, date: "2026-08-19", category: "Apparel ERP", title: "How Cloud-Based PPC Tool Shapes the Future of Smart Factories?" },
  { id: 2, date: "2026-08-12", category: "Apparel ERP", title: "What Is Apparel ERP & PLM? A Complete Guide for Garment Manufacturers in 2026" },
  { id: 3, date: "2026-07-31", category: "Apparel news", title: "The New Retail Expansion Demands Smarter Supply Chains" },
  { id: 4, date: "2026-07-29", category: "Apparel ERP", title: "Garment Factories Don't Fail Because of Machines. They Fail Because Nothing Talks to Each Other." },
  { id: 5, date: "2026-07-25", category: "Apparel news", title: "From Vendor to Strategic Partner: How ASKTEK Tech Helps Manufacturers Meet Brand Demands" },
  { id: 6, date: "2026-07-22", category: "Apparel ERP", title: "India's Apparel Exports 2026: Why Technology, Not Tariffs, Is the Real Game-Changer" },
  { id: 7, date: "2026-06-27", category: "Industry update", title: "Tamil Nadu's Bold Blueprint: Target Rs 10,000 Cr in Technical Textiles by 2030" },
  { id: 8, date: "2026-06-26", category: "Apparel ERP", title: "From Vision to Reality: The Tech Powering India's Apparel Future" },
  { id: 9, date: "2026-06-20", category: "Inspection On Go", title: "Simplify Garment Quality Control with Inspection On Go" },
  { id: 10, date: "2026-06-05", category: "Quick OB", title: "The Smartest Apparel Factories Are Already Working Differently" },
  { id: 11, date: "2026-05-19", category: "Apparel ERP", title: "Digital Transformation in Manufacturing: Why Reducing Friction Matters More Than Adding More Tools" },
  { id: 12, date: "2026-05-12", category: "Industry update", title: "PM MITRA Textile Park in Telangana: A Big Opportunity for the Textile Industry" },
  { id: 13, date: "2026-05-05", category: "Apparel news", title: "India–New Zealand Free Trade Agreement (FTA): What It Means for Businesses in 2026" },
  { id: 14, date: "2026-04-28", category: "Inspection On Go", title: "Revolutionizing Garment Quality Control with IOG Software by Ask Technology" },
  { id: 15, date: "2026-04-24", category: "Inspection On Go", title: "Stop Losing Control in Garment Inspections: How Digital Tools Are Transforming Buying Houses" },
  { id: 16, date: "2026-04-22", category: "Quick OB", title: "Garment Exports Are Recovering – But Efficiency Will Decide the Winners" },
  { id: 17, date: "2026-04-16", category: "Apparel ERP", title: "Stop Losing Money in the Cut-to-Pack Black Hole. Get Real-Time Visibility Now." },
  { id: 18, date: "2026-04-02", category: "Quick OB", title: "The Skill Matrix: Turn Your Factory Data into Profit" },
  { id: 19, date: "2026-03-17", category: "Inspection On Go", title: "Digital Garment Inspection: Why Your Buying House Needs It Now!" },
  { id: 20, date: "2026-03-10", category: "Quick OB", title: "Stop Using Spreadsheets: How Quick OB Helps Garment Factories Save Time and Money" },
  { id: 21, date: "2026-03-04", category: "Quick OB", title: "The Skill Matrix: Stop Guessing. Start Growing" },
  { id: 22, date: "2026-02-23", category: "Apparel news", title: "India's Textile Exports Get Major Boost as Trump Slashes Global Tariffs to 10%" },
  { id: 23, date: "2026-02-12", category: "Apparel ERP", title: "One Platform for Textile & Garment Manufacturing: TARGET ERP in Action" },
  { id: 24, date: "2026-02-09", category: "Quick OB", title: "The Future of Garment Production: Embracing Smart Technology" },
  { id: 25, date: "2026-02-06", category: "Quick OB", title: "Skill Matrix in Garment Manufacturing: Why It Matters and How OB Makes It Powerful" },
  { id: 26, date: "2026-02-04", category: "Apparel news", title: "India–US Trade Deal: A Turning Point for Textile & Apparel Exporter" },
  { id: 27, date: "2026-02-02", category: "Apparel news", title: "Budget 2026–27: The Tech-Driven Threads of India's Textile Future" },
  { id: 28, date: "2026-01-30", category: "Apparel news", title: "India–EU FTA: A Defining Opportunity for Textiles & Apparel!" },
  { id: 29, date: "2026-01-29", category: "Inspection On Go", title: "Revolutionize Your Garment Inspection with TARGET - Inspection On Go" },
  { id: 30, date: "2026-01-27", category: "Quick OB", title: "Production Planning Made Simple & Smart with Quick OB!" },
  { id: 31, date: "2026-01-22", category: "Apparel ERP", title: "Fashion's Digital Tipping Point: Your 2026 Survival Guide" },
  { id: 32, date: "2026-01-21", category: "Apparel ERP", title: "Revolutionizing Apparel Manufacturing: Innovation, Smart Technology, and the Future of Integrated" },
  { id: 33, date: "2026-01-13", category: "AI", title: "How AI is Transforming Fabric Waste from a Cost Center into a Source of Efficiency" },
  { id: 34, date: "2025-12-23", category: "Apparel news", title: "Top 10 Garment Manufacturers in India" },
  { id: 35, date: "2025-12-22", category: "Events", title: "ASK Technology at the UEF Trade Summit India 2025" },
  { id: 36, date: "2025-12-05", category: "Apparel ERP", title: "Why Garment ERP Software Matters" },
  { id: 37, date: "2025-11-10", category: "Apparel ERP", title: "Our \"ERP is customisable for all Apparel manufacturers to buying Houses\": Mohammed Salahuddin" },
  { id: 38, date: "2025-10-21", category: "Apparel ERP", title: "5 Clear Signs Your Apparel Business Needs ERP Software" },
  { id: 39, date: "2025-10-07", category: "Apparel ERP", title: "Why Garment ERP Is Critical and How AskTek Delivers It!" },
  { id: 40, date: "2025-09-24", category: "Apparel ERP", title: "Stronger Together: Driving Apparel Growth Through Smart Partnerships" },
  { id: 41, date: "2025-09-11", category: "Inspection On Go", title: "Conquer Your Biggest QA Hurdle: How Offline Mobile Inspections Revolutionize Apparel Quality Control" },
  { id: 42, date: "2025-09-08", category: "Inspection On Go", title: "Revolutionize Quality Control: How Inspection On Go (TIOG) is Transforming Garment Manufacturing" },
  { id: 43, date: "2025-08-28", category: "Quick OB", title: "How Operation Bulletin Software Helps Industrial Engineers Balance Cost and Efficiency" },
  { id: 44, date: "2025-08-20", category: "Quick OB", title: "Your Static Reports Are Failing You: How a Live Operational Bulletin Tamed Mass Customization Chaos" },
  { id: 45, date: "2025-08-18", category: "Apparel ERP", title: "How Target ERP by Ask Technology Solves 5 Key Challenges in the Apparel Industry!" },
  { id: 46, date: "2025-08-14", category: "Apparel ERP", title: "5 Ways Apparel Brands Lose Money Without ERP" },
  { id: 47, date: "2025-08-11", category: "Apparel ERP", title: "From Chaos to Control: How Industrial Engineers Can Win the Apparel Production Battle" },
  { id: 48, date: "2025-07-30", category: "Apparel ERP", title: "Why Excel is Killing Your Factory Efficiency: The Apparel Industry's Wake-Up Call" },
  { id: 49, date: "2025-07-15", category: "Apparel ERP", title: "Choosing the Best ERP for Garment Manufacturing: What No One Tells You" },
  { id: 50, date: "2025-07-15", category: "Apparel ERP", title: "Top 8 Challenges Faced by Garment Manufacturers — and How ERP Software Solves Them" },
  { id: 51, date: "2025-07-04", category: "AI", title: "Harnessing AI in the Fashion Supply Chain: Transforming Apparel Manufacturing and Brand Operations" },
  { id: 52, date: "2025-05-21", category: "Apparel ERP", title: "Why Target ERP Is a Game-Changer for Your Apparel Business" },
  { id: 53, date: "2025-03-29", category: "Apparel ERP", title: "Why Manufacturing Companies Need an ERP Solution for Effective Management?" },
  { id: 54, date: "2025-03-18", category: "Buying house", title: "Smart Inventory Management: How ERP Is Revolutionizing Buying Houses" },
  { id: 55, date: "2025-03-13", category: "Apparel ERP", title: "Advanced ERP Solutions for Bangladesh's Garment Industry: Asktek ERP" },
  { id: 56, date: "2025-03-12", category: "Apparel ERP", title: "How an ERP Can Help You Organize Your Business Efficiently" },
  { id: 57, date: "2025-03-06", category: "Buying house", title: "Best Buying House ERP: A Smart Solution for your Seamless Operations" },
  { id: 58, date: "2025-03-04", category: "Apparel ERP", title: "Revolutionize Garment Manufacturing with Cloud-Based ERP – Boost Efficiency & Profits!" },
  { id: 59, date: "2025-02-19", category: "Apparel ERP", title: "Why Your Apparel Business Needs ERP: A Game-Changer for Growth & Efficiency" },
];
