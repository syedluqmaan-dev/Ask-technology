import { indexXml } from "@/lib/sitemap";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

/** Sitemap index. Submit https://www.asktek.net/sitemap.xml in Google Search Console and Bing Webmaster Tools. */
export async function GET() {
  return new Response(await indexXml(SITE_URL), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
