import { notFound, permanentRedirect, redirect } from "next/navigation";
import { getPostByLegacyId, getRedirect } from "@/lib/cms";

/**
 * Catch-all for addresses that match no page:
 * 1. old article links (/blog-details?id=…) → the article's new address
 * 2. redirects added in CMS → Settings → Redirects
 * 3. wrong letter case (/Careers) → lowercase page
 * 4. stray characters at the end of a pasted link → clean address
 * Anything else is a real 404.
 */
export const dynamic = "force-dynamic";

const KNOWN = new Set([
  "/", "/products", "/solutions", "/industries", "/locations", "/case-studies", "/insights", "/glossary", "/about", "/careers",
  "/partner-with-us", "/contact", "/book-a-demo", "/faqs", "/ai-solution", "/privacy-policy", "/terms", "/cookie-policy",
  "/disclaimer", "/grievance-officer", "/security", "/accessibility",
]);

type Props = { params: Promise<{ slug: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CatchAll({ params, searchParams }: Props) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const path = "/" + slug.map((s) => decodeURIComponent(s)).join("/");

  if (path.toLowerCase() === "/blog-details") {
    const id = Number(Array.isArray(sp.id) ? sp.id[0] : sp.id);
    const post = Number.isFinite(id) ? await getPostByLegacyId(id) : undefined;
    permanentRedirect(post ? `/insights/${post.slug}` : "/insights");
  }

  const r = await getRedirect(path);
  if (r?.to) (r.permanent ? permanentRedirect : redirect)(r.to);

  const lower = path.toLowerCase();
  if (lower !== path && (KNOWN.has(lower) || /^\/(products|solutions|industries|locations|case-studies|insights|glossary|careers)\//.test(lower))) permanentRedirect(lower);

  const clean = path.replace(/(%20|\s|[,.;:'")\]])+$/g, "");
  if (clean && clean !== path) permanentRedirect(clean);

  notFound();
}
