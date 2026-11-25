import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, productIcon } from "@/components/Icon";
import { FaqSection, FeatureGrid, PageHero, ProductRow } from "@/components/ui";
import { getIndustries, getIndustry, getProducts, getSettings, getSolutions } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { service } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getIndustries()).map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props) {
  const x = await getIndustry((await params).slug);
  if (!x) return {};
  return buildMetadata({ title: x.seo.title || x.h1, description: x.seo.description || x.answer, path: `/industries/${x.slug}`, image: x.seo.image, noindex: x.seo.noindex, keywords: x.keywords });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const [s, x, products, solutions] = await Promise.all([getSettings(), getIndustry(slug), getProducts(), getSolutions()]);
  if (!x) notFound();
  const prods = x.products.map((p) => products.find((q) => q.slug === p)).filter(Boolean) as typeof products;
  const sols = x.solutions.map((p) => solutions.find((q) => q.slug === p)).filter(Boolean) as typeof solutions;

  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Industries", path: "/industries" }, { name: x.name, path: `/industries/${x.slug}` }]}
        eyebrow={`Industries · ${x.name}`}
        title={x.h1}
        lead={x.intro}
        answer={{ q: `What do ${x.name.toLowerCase()} need from garment ERP?`, a: x.answer }}
        small
        actions={<Link className="btn btn-primary" href="/book-a-demo">Book a demo <Arrow /></Link>}
      />
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">What matters</p><h2 className="h2">What {x.name.toLowerCase()} need from their software</h2></Reveal>
          <FeatureGrid items={x.pains} cols={x.pains.length % 4 === 0 ? 4 : 3} />
        </div>
      </section>
      <section className="section bg-tint">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Recommended products</p>
            <h2 className="h2">Where to start</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              {prods.map((p) => <ProductRow key={p.slug} href={`/products/${p.slug}`} title={p.name} icon={productIcon[p.slug]} />)}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Jobs it handles</p>
            <h2 className="h2">Solutions for {x.name.toLowerCase()}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              {sols.map((p) => <ProductRow key={p.slug} href={`/solutions/${p.slug}`} title={p.name} icon="target" />)}
            </div>
          </Reveal>
        </div>
      </section>
      <FaqSection s={s} faqs={x.faqs} />
      <DemoBand title={`TARGET 360 for ${x.name.toLowerCase()}`} text="See it on an order like yours, with a specialist who knows your side of the industry." />
      <JsonLd data={service(s, { name: x.h1, description: x.answer, path: `/industries/${x.slug}`, serviceType: `Software for ${x.name.toLowerCase()}` })} />
    </>
  );
}
