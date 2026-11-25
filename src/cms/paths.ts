/** Public URL of a CMS document. Used for live preview, IndexNow and links in the admin. */
export function pathFor(collection: string, doc: Record<string, unknown> | undefined | null): string | null {
  const slug = typeof doc?.slug === "string" ? doc.slug : "";
  switch (collection) {
    case "products": return slug ? `/products/${slug}` : "/products";
    case "solutions": return slug ? `/solutions/${slug}` : "/solutions";
    case "industries": return slug ? `/industries/${slug}` : "/industries";
    case "countries": return slug ? `/locations/${slug}` : "/locations";
    case "cities": {
      const c = doc?.country as { slug?: string } | string | undefined;
      const cs = typeof c === "object" && c ? c.slug : undefined;
      return slug && cs ? `/locations/${cs}/${slug}` : "/locations";
    }
    case "case-studies": return slug ? `/case-studies/${slug}` : "/case-studies";
    case "posts": return slug ? `/insights/${slug}` : "/insights";
    case "categories": return slug ? `/insights/category/${slug}` : "/insights";
    case "glossary": return slug ? `/glossary/${slug}` : "/glossary";
    case "jobs": return slug ? `/careers/${slug}` : "/careers";
    case "legal": return slug ? `/${slug}` : null;
    default: return null;
  }
}

export const globalPaths: Record<string, string> = {
  "home-page": "/",
  "about-page": "/about",
  "ai-page": "/ai-solution",
  "careers-page": "/careers",
  "partner-page": "/partner-with-us",
  "contact-page": "/contact",
  "demo-page": "/book-a-demo",
};
