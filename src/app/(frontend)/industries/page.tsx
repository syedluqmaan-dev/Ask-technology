import { DemoBand } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LinkCard, PageHero } from "@/components/ui";
import { getIndustries, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { itemList } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Garment ERP by Industry: Manufacturers, Exporters, Brands",
  description: "TARGET 360 for garment manufacturers, apparel exporters, buying houses, fashion brands, knitwear and woven units. See what each business type needs.",
  path: "/industries",
});

const icons = ["factory", "truck", "chain", "swatch", "layers", "box"] as const;

export default async function IndustriesPage() {
  const [s, industries] = await Promise.all([getSettings(), getIndustries()]);
  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries"
        title={<>TARGET 360 for your kind of <span className="grad-text">apparel business</span></>}
        lead="A knit unit and a buying office need different things from the same system. Pick yours to see what fits."
      />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap grid g3">
          {industries.map((x, i) => <LinkCard key={x.slug} href={`/industries/${x.slug}`} title={x.h1} text={x.intro} icon={icons[i % icons.length]} />)}
        </div>
      </section>
      <DemoBand title="Tell us how your business runs" text="We will show you the TARGET 360 setup that fits it." />
      <JsonLd data={itemList(s, "Industries", industries.map((x) => ({ name: x.h1, path: `/industries/${x.slug}` })))} />
    </>
  );
}
