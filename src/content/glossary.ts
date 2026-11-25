import type { GlossaryTerm } from "@/lib/types";

type G = Omit<GlossaryTerm, "seo">;

const terms: G[] = [
  {
    slug: "smv", term: "SMV (standard minute value)", aka: "SAM, standard allowed minute",
    short: "SMV is the time, in minutes, that a trained operator working at a normal pace needs to complete one garment operation, including allowances for fatigue and personal needs.",
    body: [
      "SMV is calculated from a time study: the observed time for an operation is adjusted by the operator's performance rating to get basic time, then increased by allowances. A simple T-shirt might total 6 to 9 minutes across all operations, while a lined jacket can be well over 60.",
      "Factories use SMV to price CMT work, set hourly targets, balance lines and measure efficiency. If the SMV is wrong, every target and every efficiency figure built on it is wrong too, which is why it should be recalculated when the method changes.",
    ],
    related: ["operation-bulletin", "line-balancing", "line-efficiency", "time-study"], product: "operation-bulletin-quick-ob",
  },
  {
    slug: "operation-bulletin", term: "Operation bulletin (OB)",
    short: "An operation bulletin lists every operation needed to sew a garment, in sequence, with the SMV, machine type and number of operators for each, so the line can be set up and targets calculated.",
    body: [
      "The OB is the industrial engineer's plan for a style. It shows the operation, its SMV, the machine and attachment, and how many operators are needed to meet the target. From it the line writer lays out the line and the supervisor gets an hourly target.",
      "Keeping OBs digital means repeat and similar styles start from an existing bulletin instead of a blank sheet.",
    ],
    related: ["smv", "line-balancing", "skill-matrix"], product: "operation-bulletin-quick-ob",
  },
  {
    slug: "line-balancing", term: "Line balancing",
    short: "Line balancing is the allocation of sewing operations to operators so that each station carries roughly the same workload and no single operation holds up the line.",
    body: [
      "A line is only as fast as its slowest station. Balancing groups operations, splits heavy ones across two operators and matches operators' skills to the work, using SMV and each operator's efficiency.",
      "A balanced line reduces work-in-progress piling up between stations and raises line efficiency without adding people.",
    ],
    related: ["smv", "operation-bulletin", "bottleneck", "line-efficiency"], product: "operation-bulletin-quick-ob",
  },
  {
    slug: "line-efficiency", term: "Line efficiency",
    short: "Line efficiency is the standard minutes produced by a line divided by the minutes its operators were available, shown as a percentage.",
    body: [
      "Formula: (pieces produced × SMV) ÷ (operators × working minutes) × 100. A line producing 600 pieces of a 12-minute garment with 30 operators over 480 minutes runs at 50% efficiency.",
      "Tracking it hourly shows where time is lost to imbalance, waiting for work, machine breakdowns or style changeovers.",
    ],
    related: ["smv", "line-balancing", "skill-matrix"], product: "operation-bulletin-quick-ob",
  },
  {
    slug: "time-study", term: "Time study",
    short: "A time study measures how long an operation takes by observing a trained operator over several cycles, as the basis for calculating SMV.",
    body: [
      "The engineer records several cycles, rates the operator's pace against a normal pace and applies allowances. Done with a stopwatch, it takes hours to turn into SMVs; done on a phone app, the calculation is immediate.",
    ],
    related: ["smv", "operation-bulletin"], product: "operation-bulletin-quick-ob",
  },
  {
    slug: "skill-matrix", term: "Skill matrix",
    short: "A skill matrix records which operations each operator can perform and how efficiently, so supervisors can allocate work and plan training.",
    body: [
      "It turns daily output data into a view of each operator's strengths. Supervisors use it to staff a new style, cover absences and decide who to train on which machine.",
    ],
    related: ["line-balancing", "line-efficiency"], product: "operation-bulletin-quick-ob",
  },
  {
    slug: "bottleneck", term: "Bottleneck",
    short: "A bottleneck is the operation or station on a line with the lowest output, which limits the output of the whole line.",
    body: [
      "Work piles up before a bottleneck and stations after it wait. Hour-by-hour output tracking shows where the bottleneck is so the supervisor can add an operator or move work while the shift is running.",
    ],
    related: ["line-balancing", "wip"], product: "operation-bulletin-quick-ob",
  },
  {
    slug: "aql", term: "AQL (acceptable quality limit)",
    short: "AQL is the highest number of defective units a buyer will accept in a random sample before rejecting the whole lot, based on the ISO 2859-1 sampling tables.",
    body: [
      "For a given lot size and inspection level, the AQL table sets the sample size and the accept/reject numbers. AQL 2.5 for major defects is common in apparel; critical defects are usually set at zero.",
      "Final inspections are run to the buyer's AQL, while inline inspections during production catch problems before the final audit.",
    ],
    related: ["inline-inspection", "final-inspection"], product: "garment-inspection-software",
  },
  {
    slug: "inline-inspection", term: "Inline inspection",
    short: "Inline inspection checks garments during production, at the sewing line or after key operations, so defects are corrected before the whole order is made.",
    body: [
      "Inspectors check samples from each operator or line at set intervals. Finding a defect inline costs minutes; finding it at final inspection can mean reworking the whole lot.",
    ],
    related: ["aql", "final-inspection"], product: "garment-inspection-software",
  },
  {
    slug: "final-inspection", term: "Final inspection",
    short: "Final inspection is the audit of finished, packed goods before shipment, normally done to the buyer's AQL, to decide whether the lot passes.",
    body: [
      "It checks workmanship, measurements, labelling and packing against the order. Many buyers require a third-party or buying-house inspector to sign it off before goods can ship.",
    ],
    related: ["aql", "inline-inspection", "ex-factory-date"], product: "garment-inspection-software",
  },
  {
    slug: "time-and-action-calendar", term: "Time and action (T&A) calendar", aka: "TNA, critical path",
    short: "A time and action calendar lists every milestone a garment order must reach before shipment, with a planned date and the actual completion date for each.",
    body: [
      "Typical milestones include lab dip approval, fabric booking, fabric in-house, PP sample approval, cutting, sewing, final inspection and ex-factory. The plan is usually built backwards from the ship date.",
      "Its value is in the gap between planned and actual: that gap is the early warning that a shipment will be late.",
    ],
    related: ["ex-factory-date", "pp-sample", "lab-dip"], product: "buying-house-management",
  },
  {
    slug: "ppc", term: "PPC (production planning and control)",
    short: "PPC is the function that decides when and on which lines each order will be produced, then monitors actual progress and adjusts the plan.",
    body: [
      "PPC balances order dates, material availability and line capacity. It loads lines, follows up on material and re-plans when an order slips. Good PPC depends on live output data rather than end-of-day reports.",
    ],
    related: ["time-and-action-calendar", "wip", "line-efficiency"], product: "garment-erp-knit-woven",
  },
  {
    slug: "wip", term: "WIP (work in progress)",
    short: "WIP is the quantity of an order that has been started but not finished, for example cut but not yet sewn, or sewn but not yet packed.",
    body: [
      "Some WIP keeps a line flowing; too much hides problems, ties up cash and slows the order. Tracking WIP by stage shows where pieces are piling up.",
    ],
    related: ["cut-to-pack-ratio", "bottleneck", "ppc"], product: "garment-erp-knit-woven",
  },
  {
    slug: "cut-to-pack-ratio", term: "Cut-to-pack ratio",
    short: "Cut-to-pack ratio is the number of garments packed divided by the number cut, shown as a percentage, and measures losses between cutting and shipment.",
    body: [
      "If 10,000 pieces are cut and 9,850 are packed, the ratio is 98.5%. Rejections, fabric faults, miscounts and missing pieces all reduce it, and every lost piece carries its fabric and labour cost.",
    ],
    related: ["wip", "marker-efficiency"], product: "garment-erp-knit-woven",
  },
  {
    slug: "marker-efficiency", term: "Marker efficiency",
    short: "Marker efficiency is the share of the marker's fabric area actually used by pattern pieces, shown as a percentage.",
    body: [
      "Higher marker efficiency means less fabric wasted between pattern pieces. Because fabric is usually the largest cost in a garment, a point or two of marker efficiency matters to the order's margin.",
    ],
    related: ["fabric-consumption", "cut-to-pack-ratio"], product: "garment-erp-knit-woven",
  },
  {
    slug: "fabric-consumption", term: "Fabric consumption",
    short: "Fabric consumption is the quantity of fabric needed per garment, in metres, yards or kilograms, including allowances for shrinkage and wastage.",
    body: [
      "It is worked out from the pattern, marker efficiency and the fabric's width or GSM, and it drives both the cost sheet and the fabric booking. An error here is multiplied by every piece in the order.",
    ],
    related: ["marker-efficiency", "gsm", "costing-sheet", "bom"], product: "garment-erp-knit-woven",
  },
  {
    slug: "gsm", term: "GSM (grams per square metre)",
    short: "GSM is the weight of a fabric in grams per square metre, used to specify knit fabrics and to calculate fabric consumption by weight.",
    body: [
      "A light T-shirt jersey might be 140 to 160 GSM and a fleece sweatshirt 280 to 320 GSM. Knit fabric is often bought by weight, so GSM links the garment's area to the kilograms you need to buy.",
    ],
    related: ["fabric-consumption"],
  },
  {
    slug: "bom", term: "BOM (bill of materials)",
    short: "A bill of materials lists every material and trim needed to make a garment, with quantities per piece, so the whole order's purchase requirement can be calculated.",
    body: [
      "A garment BOM covers fabric, lining, thread, buttons, zips, labels, tags, polybags and cartons, often by colour and size. When the BOM is linked to the cost sheet and the order, purchase works to the approved cost.",
    ],
    related: ["costing-sheet", "tech-pack", "trims"], product: "garment-erp-knit-woven",
  },
  {
    slug: "costing-sheet", term: "Costing sheet",
    short: "A garment costing sheet adds up fabric, trims, CMT, washing or processes, overheads, freight and margin to arrive at the price quoted to the buyer.",
    body: [
      "Exporters usually cost on FOB terms. The sheet changes with every buyer comment, so keeping versions and linking the final version to the BOM avoids buying to an outdated cost.",
    ],
    related: ["bom", "fob", "cmt"], product: "buying-house-management",
  },
  {
    slug: "fob", term: "FOB (free on board)",
    short: "FOB is an Incoterm under which the seller pays to deliver goods onto the vessel at the named port, and the buyer takes on cost and risk from that point.",
    body: [
      "Most garment export prices are quoted FOB: the price includes material, making, overheads, inland transport and export clearance, but not ocean freight or insurance.",
    ],
    related: ["cmt", "costing-sheet", "commercial-invoice"],
  },
  {
    slug: "cmt", term: "CMT (cut, make, trim)",
    short: "CMT is a manufacturing arrangement where the buyer supplies the fabric and the factory charges only for cutting, sewing and trimming the garments.",
    body: [
      "CMT pricing is mainly labour and overhead, so it is calculated from SMV, the factory's cost per minute and expected efficiency. It is also used to describe the labour part of a full FOB cost.",
    ],
    related: ["smv", "fob", "costing-sheet"],
  },
  {
    slug: "tech-pack", term: "Tech pack",
    short: "A tech pack is the buyer's technical specification for a style: sketches, measurements, materials, trims, construction details, labels and packing instructions.",
    body: [
      "Everything from costing to final inspection refers back to it. When tech packs live in email attachments, teams work from different versions; a central style library keeps one current version.",
    ],
    related: ["bom", "proto-sample", "pp-sample"], product: "garment-erp-brands",
  },
  {
    slug: "proto-sample", term: "Proto sample",
    short: "A proto sample is the first sample of a new style, made to check the design, fit and construction before the style is costed or confirmed.",
    body: [
      "Protos are often made in available fabric. Buyer comments on the proto lead to revised patterns and further samples such as fit, salesman and PP samples.",
    ],
    related: ["pp-sample", "size-set", "tech-pack"], product: "garment-erp-brands",
  },
  {
    slug: "pp-sample", term: "PP sample (pre-production sample)",
    short: "A PP sample is made in the actual bulk fabric and trims, exactly as production will be made, and must be approved by the buyer before cutting starts.",
    body: [
      "PP approval is a key milestone on the T&A calendar. Once approved, it becomes the reference for inline and final inspection.",
    ],
    related: ["proto-sample", "size-set", "time-and-action-calendar"], product: "garment-erp-brands",
  },
  {
    slug: "size-set", term: "Size set sample",
    short: "A size set is a set of samples in every size of the order, made to check grading and measurements across the size range before bulk production.",
    body: ["It confirms that the pattern grades correctly from the smallest to the largest size, which a single-size sample cannot show."],
    related: ["pp-sample", "proto-sample"], product: "garment-erp-brands",
  },
  {
    slug: "lab-dip", term: "Lab dip",
    short: "A lab dip is a small swatch of fabric or yarn dyed to match the buyer's colour standard, sent for approval before bulk dyeing.",
    body: ["Colour is approved under specified light sources. Lab dip approval is one of the first milestones on a T&A calendar because bulk fabric cannot be dyed without it."],
    related: ["strike-off", "time-and-action-calendar"],
  },
  {
    slug: "strike-off", term: "Strike-off",
    short: "A strike-off is a sample of a print or embroidery on the actual fabric, submitted for buyer approval of colours and placement before bulk printing.",
    body: ["Like the lab dip, it is an approval milestone that must be cleared early so bulk printing does not delay cutting."],
    related: ["lab-dip"],
  },
  {
    slug: "trims", term: "Trims and accessories",
    short: "Trims are all the materials in a garment other than the main fabric: thread, buttons, zips, labels, tags, elastic, interlining and packing materials.",
    body: ["Trims are cheap per piece but numerous, and one missing trim can stop a shipment. They are listed in the BOM and booked against the order."],
    related: ["bom"],
  },
  {
    slug: "ex-factory-date", term: "Ex-factory date",
    short: "The ex-factory date is the date the finished, packed goods must leave the factory for shipment, as agreed with the buyer.",
    body: ["Missing it usually means air freight at the seller's cost, a discount or a cancelled order, which is why every milestone on the T&A is planned back from it."],
    related: ["time-and-action-calendar", "final-inspection"],
  },
  {
    slug: "commercial-invoice", term: "Commercial invoice",
    short: "A commercial invoice is the seller's bill to the overseas buyer and the main customs document for an export shipment, stating goods, quantities, prices, terms and parties.",
    body: ["Customs, banks and buyers all rely on it, and many buyers specify their own format. It must agree with the packing list and other shipping documents."],
    related: ["packing-list", "fob"], product: "garment-erp-knit-woven",
  },
  {
    slug: "packing-list", term: "Packing list",
    short: "A packing list details how a shipment is packed: carton numbers, contents by style, colour and size, quantities, and net and gross weights.",
    body: ["It is used by customs, freight forwarders and the buyer's warehouse, and must match the commercial invoice exactly."],
    related: ["commercial-invoice"], product: "garment-erp-knit-woven",
  },
  {
    slug: "buying-house", term: "Buying house",
    short: "A buying house is a sourcing company that finds, manages and inspects factories on behalf of overseas buyers, earning a commission or a trading margin.",
    body: ["Buying houses handle costing, vendor selection, sampling follow-up, T&A, quality inspection and shipment coordination between the buyer and many factories."],
    related: ["time-and-action-calendar", "aql"], product: "buying-house-management",
  },
  {
    slug: "apparel-erp", term: "Apparel ERP",
    short: "Apparel ERP is enterprise resource planning software built for garment businesses, connecting orders, costing, materials, production, quality, shipping and accounts in one system.",
    body: [
      "General ERP systems do not know about colourways, size ratios, SMV, cut-to-pack or AQL. An apparel ERP handles these natively, so the order, BOM, production and inspection all refer to the same style, colour and size breakdown.",
    ],
    related: ["apparel-plm", "bom", "ppc"], product: "garment-erp-knit-woven",
  },
  {
    slug: "apparel-plm", term: "Apparel PLM",
    short: "Apparel PLM (product lifecycle management) is software that manages a style from concept to production: specifications, materials, samples, costs and approvals.",
    body: ["PLM covers development; ERP covers execution. When they are connected, the approved sample becomes the bulk order without retyping."],
    related: ["apparel-erp", "tech-pack", "proto-sample"], product: "garment-erp-brands",
  },
];

export const glossary: GlossaryTerm[] = terms
  .map((t) => ({
    ...t,
    seo: {
      title: `What is ${t.term}? Garment glossary`,
      description: t.short.length > 155 ? t.short.slice(0, 152).replace(/\s+\S*$/, "") + "…" : t.short,
    },
  }))
  .sort((a, b) => a.term.localeCompare(b.term));
