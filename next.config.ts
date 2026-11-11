import type { NextConfig } from "next";

/**
 * LEGACY_ORIGIN: where ASK's current site and CMS are served.
 * Images, blog articles and other CMS content fall back to it until they are migrated.
 * When asktek.net points to this new site, keep the old app on a subdomain
 * (for example https://legacy.asktek.net) and set LEGACY_ORIGIN to it.
 */
const LEGACY = process.env.LEGACY_ORIGIN || "https://asktek.net";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/erp-for-textiles-and-garments", destination: "/products/garment-erp-knit-woven", permanent: true },
      { source: "/buying_house_management", destination: "/products/buying-house-management", permanent: true },
      { source: "/garment_inspection_softwares", destination: "/products/garment-inspection-software", permanent: true },
      { source: "/garments_sampling_software", destination: "/products/garment-erp-brands", permanent: true },
      { source: "/operation_bulletin", destination: "/products/operation-bulletin-quick-ob", permanent: true },
      { source: "/optimize_garment_manufacturing", destination: "/products", permanent: true },
      { source: "/explore_production_solutions", destination: "/products", permanent: true },
      { source: "/ai_solution", destination: "/ai-solution", permanent: true },
      { source: "/partner_with_us", destination: "/partner-with-us", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/OurTeam", destination: "/about#leadership", permanent: true },
      { source: "/Our_Engagement_Model", destination: "/about#engagement", permanent: true },
      { source: "/case_study", destination: "/case-studies", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      // Articles stay in the CMS until it is connected to this site.
      { source: "/blog-details", destination: `${LEGACY}/blog-details`, permanent: false },
      ...[
        [20, "harpa-retail-plm-erp"], [19, "beeku-export-erp-quick-ob"], [18, "ai-enterprises-quick-ob"], [16, "royal-stitch-target-erp"],
        [13, "saturn-textiles-target-erp"], [12, "padma-textiles-target-bms"], [11, "vijay-garments-asktek-erp"], [10, "laj-exports-asktek-erp"],
        [9, "frendi-fashion-asktek-erp"], [8, "bhagayam-exports-asktek-erp"], [7, "kgi-clothing-asktek-erp"], [5, "snqs-asktek-bms"],
        [4, "echo-sourcing-asktek-bms"], [3, "vijay-enterprises-asktek-erp"],
      ].map(([id, slug]) => ({
        source: "/case-study-details",
        has: [{ type: "query" as const, key: "id", value: String(id) }],
        destination: `/case-studies/${slug}`,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      // Only used when no page or public file matches.
      fallback: [
        { source: "/assets/:path*", destination: `${LEGACY}/assets/:path*` },
        { source: "/cms/partner/:file", destination: `${LEGACY}/api/partner-image?logoName=:file` },
        { source: "/cms/case-study/:file", destination: `${LEGACY}/api/case-study-image?BlogFileName=:file` },
      ],
    };
  },
};

export default nextConfig;
