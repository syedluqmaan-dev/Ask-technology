import { SITEMAPS, sitemapEntries, urlsetXml, type SitemapName } from "@/lib/sitemap";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAPS.map((n) => ({ name: `${n}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name.replace(/\.xml$/, "") as SitemapName;
  if (!SITEMAPS.includes(name)) return new Response("Not found", { status: 404 });
  const xml = urlsetXml(SITE_URL, await sitemapEntries(name));
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
