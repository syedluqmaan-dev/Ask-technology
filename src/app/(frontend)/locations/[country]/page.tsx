import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, productIcon } from "@/components/Icon";
import { CaseCard, FaqSection, FeatureGrid, PageHero, ProductRow, logoLookup } from "@/components/ui";
import { getCaseStudies, getCities, getClients, getCountries, getCountry, getProducts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { countryService } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ country: string }> };

export async function generateStaticParams() {
  return (await getCountries()).map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const c = await getCountry((await params).country);
  if (!c) return {};
  return buildMetadata({ title: c.seo.title || c.h1, description: c.seo.description || c.answer, path: `/locations/${c.slug}`, image: c.seo.image, noindex: c.seo.noindex });
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const [s, c, cities, products, cases, clients] = await Promise.all([getSettings(), getCountry(country), getCities(), getProducts(), getCaseStudies(), getClients()]);
  if (!c) notFound();
  const list = cities.filter((x) => x.country === c.slug);
  const prods = c.products.map((p) => products.find((q) => q.slug === p)).filter(Boolean) as typeof products;
  const stories = c.caseStudies.map((x) => cases.find((q) => q.slug === x)).filter(Boolean) as typeof cases;
  const place = c.short === "Dubai" ? "the UAE" : c.name;
  const logo = logoLookup(clients);

  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Where we work", path: "/locations" }, { name: c.name, path: `/locations/${c.slug}` }]}
        eyebrow={`Where we work · ${c.name}`}
        title={c.h1}
        lead={c.intro}
        answer={{ q: `Garment ERP in ${place}`, a: c.answer }}
        small
        actions={<><Link className="btn btn-primary" href="/book-a-demo">Book a demo <Arrow /></Link><Link className="btn btn-ghost" href="/contact">Talk to our team</Link></>}
      />

      <section className="section">
        <div className="wrap split top">
          <Reveal><p className="eyebrow">The industry</p><h2 className="h2">The garment industry in {place}</h2></Reveal>
          <p className="sub">{c.industry}</p>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">Why TARGET 360</p><h2 className="h2">Why businesses here choose TARGET 360</h2></Reveal>
          <FeatureGrid items={c.points} cols={c.points.length % 4 === 0 ? 4 : 3} />
        </div>
      </section>

      <section className="section">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Clusters</p>
            <h2 className="h2">Garment clusters we serve in {place}</h2>
            {list.length > 0 && (
              <ul className="places" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", marginTop: 28 }}>
                {list.map((x) => <li key={x.slug}><Link href={`/locations/${c.slug}/${x.slug}`}>{x.name}<span>{x.region}</span></Link></li>)}
              </ul>
            )}
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Products</p>
            <h2 className="h2">Products used here</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
              {prods.map((p) => <ProductRow key={p.slug} href={`/products/${p.slug}`} title={p.name} icon={productIcon[p.slug]} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <div className="head-row"><h2 className="h2">Customer stories</h2><Link className="btn btn-ghost" href="/case-studies">All stories <Arrow /></Link></div>
            <div className="grid g3">{stories.slice(0, 3).map((x) => <div key={x.slug} style={{ display: "grid" }}><CaseCard c={x} logo={logo(x.client)} /></div>)}</div>
          </div>
        </section>
      )}

      <FaqSection s={s} faqs={c.faqs} />
      <DemoBand title={`Talk to us about TARGET 360 in ${place}`} text="Book a demo at a time that suits your working day." />
      <JsonLd data={countryService(s, c)} />
    </>
  );
}
