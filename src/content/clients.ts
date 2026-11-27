/**
 * Client logos (from the "Our Partners" section of asktek.net).
 *
 * Files are in /public/cms/partner/<file>, copied from the old website manager.
 * `npm run import:legacy` loads them into the CMS media library.
 */
import type { Client } from "@/lib/types";

const cms = (file: string) => `/cms/partner/${file}`;

export const clients: Client[] = [
  { name: "AE Export House", logo: cms("Img_1777447719611.jpg") },
  { name: "Antim Group", logo: cms("Img_1746792952729.png") },
  { name: "Bhagayam Exports", logo: cms("Img_1745658796014.jpg"), caseStudy: "bhagayam-exports-asktek-erp" },
  { name: "Frendi Fashion", logo: cms("Img_1745658450113.jpg"), caseStudy: "frendi-fashion-asktek-erp" },
  { name: "Padma Textiles", logo: cms("Img_1745657283973.jpg"), caseStudy: "padma-textiles-target-bms" },
  { name: "Vijay Garments", logo: cms("Img_1745656678221.jpg"), caseStudy: "vijay-garments-asktek-erp" },
  { name: "FC", logo: cms("Img_1745502037445.jpeg") },
  { name: "McCoy Clothing", logo: cms("Img_1745501943931.png") },
  { name: "Connoisseur Fashions", logo: cms("Img_1745480709477.jpg"), caseStudy: "connoisseur-fashions-target-erp" },
  { name: "KGI", logo: cms("Img_1745480650696.jpeg"), caseStudy: "kgi-clothing-asktek-erp" },
  { name: "Texprego", logo: cms("Img_1745480565777.jpeg") },
  { name: "SNQS", logo: cms("Img_1745480501243.png"), caseStudy: "snqs-asktek-bms" },
  { name: "Dignity Innovations", logo: cms("Img_1751101509661.png") },
  { name: "Amaravathi Garments", logo: cms("Img_1745658458424.jpg") },
  { name: "Kumbhat Holographics", logo: cms("Img_1745657510077.jpg") },
  { name: "Vijay Enterprises", logo: cms("Img_1745657089051.jpg"), caseStudy: "vijay-enterprises-asktek-erp" },
  { name: "Saturn Textiles Limited", logo: cms("Img_1745502343036.jpg"), caseStudy: "saturn-textiles-target-erp" },
  { name: "Devi Exports", logo: cms("Img_1745501953455.jpeg") },
  { name: "LAJ Exports Ltd.", logo: cms("Img_1745497535211.png"), caseStudy: "laj-exports-asktek-erp" },
  { name: "Teeparam", logo: cms("Img_1745480669116.png") },
  { name: "Royal Stitch", logo: cms("Img_1745480632389.jpeg"), caseStudy: "royal-stitch-target-erp" },
  { name: "Echo Sourcing", logo: cms("Img_1745480552147.jpeg"), caseStudy: "echo-sourcing-asktek-bms" },
  { name: "Harpa Retail", logo: cms("harpa-retail.png"), caseStudy: "harpa-retail-plm-erp" },
  { name: "Beeku Exports", logo: cms("beeku-exports.png"), caseStudy: "beeku-export-erp-quick-ob" },
];

export const logoFor = (name: string) => {
  const n = name.toLowerCase();
  return clients.find((c) => c.name.toLowerCase() === n || n.startsWith(c.name.toLowerCase()) || c.name.toLowerCase().startsWith(n))?.logo;
};
