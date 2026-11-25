import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const LEGACY = process.env.LEGACY_ORIGIN || "";
const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";

/** Content-Security-Policy for the public website (the CMS at /admin uses its own). */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://app.cal.com https://challenges.cloudflare.com https://snap.licdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' https:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://app.cal.com https://api.cal.com https://px.ads.linkedin.com https://challenges.cloudflare.com",
  "frame-src 'self' https://app.cal.com https://cal.com https://challenges.cloudflare.com https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** Old asktek.net addresses → new pages (301), so existing Google rankings carry over. */
const legacyRedirects = [
  ["/erp-for-textiles-and-garments", "/products/garment-erp-knit-woven"],
  ["/buying_house_management", "/products/buying-house-management"],
  ["/garment_inspection_softwares", "/products/garment-inspection-software"],
  ["/garments_sampling_software", "/products/garment-erp-brands"],
  ["/operation_bulletin", "/products/operation-bulletin-quick-ob"],
  ["/Target_HRMS_HR_and_Payroll_Solutions", "/products/target-360-hrms"],
  ["/optimize_garment_manufacturing", "/products"],
  ["/explore_production_solutions", "/products"],
  ["/ai_solution", "/ai-solution"],
  ["/partner_with_us", "/partner-with-us"],
  ["/about-us", "/about"],
  ["/OurTeam", "/about#leadership"],
  ["/Our_Engagement_Model", "/about#engagement"],
  ["/case_study", "/case-studies"],
  ["/blog", "/insights"],
  ["/contact-us", "/contact"],
] as const;

const legacyCaseStudies: [number, string][] = [
  [20, "harpa-retail-plm-erp"], [19, "beeku-export-erp-quick-ob"], [18, "ai-enterprises-quick-ob"], [16, "royal-stitch-target-erp"],
  [13, "saturn-textiles-target-erp"], [12, "padma-textiles-target-bms"], [11, "vijay-garments-asktek-erp"], [10, "laj-exports-asktek-erp"],
  [9, "frendi-fashion-asktek-erp"], [8, "bhagayam-exports-asktek-erp"], [7, "kgi-clothing-asktek-erp"], [5, "snqs-asktek-bms"],
  [4, "echo-sourcing-asktek-bms"], [3, "vijay-enterprises-asktek-erp"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      ...(LEGACY ? [{ protocol: "https" as const, hostname: new URL(LEGACY).hostname }] : []),
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/((?!admin|api).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
      // Preview deployments must never be indexed.
      ...(isProd ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]),
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/videos/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    ];
  },
  async redirects() {
    return [
      ...legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...legacyCaseStudies.map(([id, slug]) => ({
        source: "/case-study-details",
        has: [{ type: "query" as const, key: "id", value: String(id) }],
        destination: `/case-studies/${slug}`,
        permanent: true,
      })),
      { source: "/case-study-details", destination: "/case-studies", permanent: true },
      // Old article links (/blog-details?id=…) are resolved by the catch-all page using each post's legacy ID.
    ];
  },
  async rewrites() {
    if (!LEGACY) return [];
    // Only used when no page or file matches: old images keep working until they are imported into the CMS.
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        { source: "/assets/:path*", destination: `${LEGACY}/assets/:path*` },
        { source: "/cms/partner/:file", destination: `${LEGACY}/api/partner-image?logoName=:file` },
        { source: "/cms/case-study/:file", destination: `${LEGACY}/api/case-study-image?BlogFileName=:file` },
      ],
    };
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
