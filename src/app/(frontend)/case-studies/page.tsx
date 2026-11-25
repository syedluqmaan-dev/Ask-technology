import { CaseFilter } from "@/components/CaseFilter";
import { DemoBand } from "@/components/Footer";
import { ClientLogos } from "@/components/ClientLogos";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui";
import { getCaseStudies, getClients, getProducts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { itemList } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Garment ERP Case Studies and Customer Stories | TARGET 360",
  description: "How garment manufacturers, exporters, buying houses and brands run their business on TARGET 360 ERP, Target BMS and Quick OB, with the results they reported.",
  path: "/case-studies",
});

export default async function CasesPage() {
  const [s, cases, products, clients] = await Promise.all([getSettings(), getCaseStudies(), getProducts(), getClients()]);
  const logos = Object.fromEntries(clients.map((c) => [c.name.toLowerCase(), c.logo]));
  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Customer stories", path: "/case-studies" }]}
        eyebrow="Customer stories"
        title={<>Real garment businesses. <span className="grad-text">Real transformations.</span></>}
        lead={`${cases.length} stories from manufacturers, exporters, buying houses and brands that run on TARGET 360.`}
      />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <CaseFilter items={cases} options={products.map((p) => ({ slug: p.slug, label: p.shortName }))} logos={logos} />
        </div>
      </section>
      <ClientLogos clients={clients} />
      <div style={{ height: 112 }} />
      <DemoBand title="Write your own success story with TARGET 360" />
      <JsonLd data={itemList(s, "TARGET 360 customer stories", cases.map((c) => ({ name: c.title, path: `/case-studies/${c.slug}` })))} />
    </>
  );
}
