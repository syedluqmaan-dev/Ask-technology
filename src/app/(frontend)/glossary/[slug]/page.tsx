import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, ProductRow } from "@/components/ui";
import { DemoBand } from "@/components/Footer";
import { Arrow, Icon, productIcon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { getGlossary, getProducts, getSettings, getTerm } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { definedTerm, faqPage } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getGlossary()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const t = await getTerm((await params).slug);
  if (!t) return {};
  return buildMetadata({ title: t.seo.title || `What is ${t.term}?`, description: t.seo.description || t.short, path: `/glossary/${t.slug}`, noindex: t.seo.noindex });
}

export default async function TermPage({ params }: Props) {
  const { slug } = await params;
  const [s, t, all, products] = await Promise.all([getSettings(), getTerm(slug), getGlossary(), getProducts()]);
  if (!t) notFound();
  const related = t.related.map((r) => all.find((x) => x.slug === r)).filter(Boolean) as typeof all;
  const product = t.product ? products.find((p) => p.slug === t.product) : undefined;
  const name = t.term.replace(/\s*\(.*\)$/, "");

  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Glossary", path: "/glossary" }, { name, path: `/glossary/${t.slug}` }]}
        eyebrow="Garment glossary"
        title={`What is ${t.term}?`}
        answer={{ q: `${name} in one line`, a: t.short }}
        small
      >
        {t.aka && <p className="small mt-m">Also called: {t.aka}</p>}
      </PageHero>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap split top wide-l">
          <div className="article">{t.body.map((b) => <p key={b.slice(0, 40)}>{b}</p>)}</div>
          <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {product && (
              <Link href={`/products/${product.slug}`} className="card" style={{ gap: 12 }}>
                <span className="ico"><Icon name={productIcon[product.slug] ?? "layers"} /></span>
                <span className="small">Where TARGET 360 handles this</span>
                <b style={{ fontSize: 17 }}>{product.name}</b>
                <span className="body">{product.tagline}</span>
                <span className="link">See {product.shortName} <Arrow /></span>
              </Link>
            )}
            {related.length > 0 && (
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 700, margin: "8px 0 14px" }}>Related terms</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {related.map((r) => <ProductRow key={r.slug} href={`/glossary/${r.slug}`} title={r.term} icon="tag" />)}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
      <DemoBand title="See it in the software" text={`TARGET 360 calculates and tracks ${name} for you. Book a 30-minute demo.`} />
      <JsonLd data={[definedTerm(s, t), faqPage([{ q: `What is ${t.term}?`, a: t.short }])]} />
    </>
  );
}
