import { PostFilter } from "@/components/PostFilter";
import { DemoBand } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui";
import { getPosts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { itemList } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Garment Industry Insights: Apparel ERP, Quality, Production",
  description: "Articles and guides on apparel ERP, garment quality inspection, SMV and line planning, and apparel trade news, from the team behind TARGET 360.",
  path: "/insights",
});

export default async function InsightsPage() {
  const [s, posts] = await Promise.all([getSettings(), getPosts()]);
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title={<>Ideas for running a <span className="grad-text">smarter garment business</span></>}
        lead={`${posts.length} articles on apparel ERP, quality control, production planning, AI and industry news.`}
      />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap"><h2 className="sr-only">All articles</h2><PostFilter posts={sorted} /></div>
      </section>
      <DemoBand />
      <JsonLd data={itemList(s, "Insights", sorted.slice(0, 50).map((p) => ({ name: p.title, path: `/insights/${p.slug}` })))} />
    </>
  );
}
