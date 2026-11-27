import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Production: everything public is open to Google, Bing and AI assistants (GEO).
 * Only the CMS, API and preview routes are closed. Preview deployments block all crawling.
 */
export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  if (!isProd) return { rules: [{ userAgent: "*", disallow: "/" }] };
  const closed = ["/admin", "/api/", "/next/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: closed },
      // AI assistants and answer engines: explicitly welcome, so ASK Technology can be cited in AI answers.
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "Googlebot"], allow: "/", disallow: closed },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
