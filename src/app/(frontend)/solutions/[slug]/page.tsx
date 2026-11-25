import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, productIcon } from "@/components/Icon";
import { FaqSection, FeatureGrid, LinkCard, PageHero, ProductRow, StepGrid } from "@/components/ui";
import { getGlossary, getProducts, getSettings, getSolution, getSolutions } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { solutionService } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getSolutions()).map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props) {
  const x = await getSolution((await params).slug);
  if (!x) return {};
  return buildMetadata({ title: x.seo.title || x.h1, description: x.seo.description || x.answer, path: `/solutions/${x.slug}`, image: x.seo.image, noindex: x.seo.noindex, keywords: x.keywords });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const [s, x, all, products, glossary] = await Promise.all([getSettings(), getSolution(slug), getSolutions(), getProducts(), getGlossary()]);
  if (!x) notFound();
  const prods = x.products.map((p) => products.find((q) => q.slug === p)).filter(Boolean) as typeof products;
  const others = all.filter((o) => o.slug !== x.slug).slice(0, 3);
  const terms = glossary.filter((t) => t.product && x.products.includes(t.product)).slice(0, 8);

  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Solutions", path: "/solutions" }, { name: x.name, path: `/solutions/${x.slug}` }]}
        eyebrow={`Solutions · ${x.name}`}
        title={x.h1}
        lead={x.intro}
        answer={{ q: `What is ${x.name.toLowerCase()} software?`, a: x.answer }}
        small
        actions={<>
          <Link className="btn btn-primary" href={`/book-a-demo${prods[0] ? `?product=${prods[0].slug}` : ""}`}>Book a demo <Arrow /></Link>
          {prods[0] && <Link className="btn btn-ghost" href={`/products/${prods[0].slug}`}>See {prods[0].shortName}</Link>}
        </>}
      />

      {x.problems.length > 0 && (
        <section className="section">
          <div className="wrap split top">
            <Reveal>
              <p className="eyebrow">The problem</p>
              <h2 className="h2">Where {x.name.toLowerCase()} usually goes wrong</h2>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {x.problems.map((p) => <div key={p} className="pain">{p}</div>)}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">How TARGET 360 helps</p><h2 className="h2">How TARGET 360 handles {x.name.toLowerCase()}</h2></Reveal>
          <FeatureGrid items={x.capabilities} />
        </div>
      </section>

      {x.steps.length > 0 && (
        <section className="section">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">How it works</p><h2 className="h2">Step by step in TARGET 360</h2></Reveal>
            <StepGrid items={x.steps} />
          </div>
        </section>
      )}

      {(prods.length > 0 || terms.length > 0) && (
        <section className="section bg-tint">
          <div className="wrap split top">
            <Reveal>
              <p className="eyebrow">Products</p>
              <h2 className="h2">Products that do this</h2>
              <p className="sub" style={{ margin: "18px 0 28px" }}>Each one works on its own and shares data with the rest of TARGET 360.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {prods.map((p) => <ProductRow key={p.slug} href={`/products/${p.slug}`} title={p.name} icon={productIcon[p.slug]} />)}
              </div>
            </Reveal>
            {terms.length > 0 && (
              <Reveal delay={100}>
                <p className="eyebrow">Glossary</p>
                <h2 className="h3" style={{ fontSize: 24 }}>Terms used on this page</h2>
                <ul className="chips" style={{ marginTop: 18 }}>
                  {terms.map((t) => <li key={t.slug}><Link className="chip" href={`/glossary/${t.slug}`}>{t.term}</Link></li>)}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <FaqSection s={s} faqs={x.faqs} title={`${x.name}: questions we hear`} />

      {others.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <div className="head-row"><h2 className="h2">Related solutions</h2><Link className="btn btn-ghost" href="/solutions">All solutions <Arrow /></Link></div>
            <div className="grid g3">{others.map((o) => <LinkCard key={o.slug} href={`/solutions/${o.slug}`} title={o.name} text={o.answer.split(". ")[0] + "."} />)}</div>
          </div>
        </section>
      )}

      <div style={{ height: 112 }} />
      <DemoBand title={`See ${x.name.toLowerCase()} in TARGET 360`} text="Bring one of your current orders. We will show you the process in the software, start to finish." />
      <JsonLd data={solutionService(s, x)} />
    </>
  );
}
