import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/products", "/ai-solution", "/case-studies", "/insights", "/book-a-demo", "/about", "/careers", "/partner-with-us", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...caseStudies.map((c) => ({ url: `${site.url}/case-studies/${c.slug}`, lastModified: new Date(c.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
