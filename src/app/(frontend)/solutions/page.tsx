import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { LinkCard, PageHero } from "@/components/ui";
import { getIndustries, getSettings, getSolutions } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { itemList } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Garment Industry Software Solutions | TARGET 360",
  description:
    "Garment costing, production planning, merchandising, T&A, inventory, PLM, quality inspection, SMV and export documents. Find the TARGET 360 solution for each job.",
  path: "/solutions",
});

export default async function SolutionsPage() {
  const [s, solutions, industries] = await Promise.all([getSettings(), getSolutions(), getIndustries()]);
  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Solutions", path: "/solutions" }]}
        eyebrow="Solutions"
        title={<>Software for every job in a <span className="grad-text">garment business</span></>}
        lead="Each page covers one job in detail: what usually goes wrong, how TARGET 360 handles it and which product to use."
      />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">By job</p><h2 className="h2">What garment teams use TARGET 360 for</h2></Reveal>
          <div className="grid g3">
            {solutions.map((x) => <LinkCard key={x.slug} href={`/solutions/${x.slug}`} title={x.name} text={x.intro} />)}
          </div>
        </div>
      </section>
      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">By type of business</p><h2 className="h2">Made for your side of the industry</h2></Reveal>
          <div className="grid g3">
            {industries.map((x) => <LinkCard key={x.slug} href={`/industries/${x.slug}`} title={x.name} text={x.intro} />)}
          </div>
        </div>
      </section>
      <div style={{ height: 112 }} />
      <DemoBand title="Show us the job that costs you most" text="Costing, planning, inspection or something else: we will show you how TARGET 360 handles it on your own data." />
      <JsonLd data={itemList(s, "TARGET 360 solutions", solutions.map((x) => ({ name: x.h1, path: `/solutions/${x.slug}` })))} />
    </>
  );
}
