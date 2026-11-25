import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, productIcon } from "@/components/Icon";
import { FaqSection, PageHero, ProductRow } from "@/components/ui";
import { getCities, getCity, getCountry, getProducts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { cityService } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ country: string; city: string }> };

export async function generateStaticParams() {
  return (await getCities()).map((c) => ({ country: c.country, city: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { country, city } = await params;
  const c = await getCity(country, city);
  if (!c) return {};
  return buildMetadata({ title: c.seo.title || c.h1, description: c.seo.description || c.answer, path: `/locations/${country}/${c.slug}`, image: c.seo.image, noindex: c.seo.noindex });
}

export default async function CityPage({ params }: Props) {
  const { country: cSlug, city } = await params;
  const [s, c, country, products, cities] = await Promise.all([getSettings(), getCity(cSlug, city), getCountry(cSlug), getProducts(), getCities()]);
  if (!c || !country) notFound();
  const prods = c.products.map((p) => products.find((q) => q.slug === p)).filter(Boolean) as typeof products;
  const nearby = cities.filter((x) => x.country === cSlug && x.slug !== c.slug);
  const place = country.short === "Dubai" ? "the UAE" : country.name;

  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Where we work", path: "/locations" }, { name: country.name, path: `/locations/${country.slug}` }, { name: c.name, path: `/locations/${country.slug}/${c.slug}` }]}
        eyebrow={`${c.name} · ${c.region}`}
        title={c.h1}
        answer={{ q: `Garment ERP in ${c.name}`, a: c.answer }}
        small
        actions={<><Link className="btn btn-primary" href="/book-a-demo">Book a demo <Arrow /></Link><a className="btn btn-ghost" href="#enquire">Ask a question</a></>}
      />

      <section className="section">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">The cluster</p>
            <h2 className="h2">The {c.name} garment cluster</h2>
            <p className="sub" style={{ marginTop: 18 }}>{c.cluster}</p>
          </Reveal>
          <Reveal delay={100}>
            {c.makes.length > 0 && (
              <>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>What businesses here make</h3>
                <ul className="chips">{c.makes.map((m) => <li key={m}><span className="chip">{m}</span></li>)}</ul>
              </>
            )}
            {c.challenges.length > 0 && (
              <>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "30px 0 14px" }}>The problems we hear most often</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{c.challenges.map((x) => <div key={x} className="pain">{x}</div>)}</div>
              </>
            )}
          </Reveal>
        </div>
      </section>

      {prods.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">Products</p><h2 className="h2">TARGET 360 products for {c.name} businesses</h2></Reveal>
            <div className="grid g2" style={{ gap: 10 }}>
              {prods.map((p) => <ProductRow key={p.slug} href={`/products/${p.slug}`} title={p.name} icon={productIcon[p.slug]} />)}
            </div>
          </div>
        </section>
      )}

      <FaqSection s={s} faqs={c.faqs} title={`TARGET 360 in ${c.name}: questions`} />

      <section className="section bg-tint" id="enquire">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Talk to us</p>
            <h2 className="h2">Talk to us about your {c.name} business</h2>
            <p className="sub" style={{ marginTop: 18 }}>Tell us what you make and how you run orders today. A specialist will reply within one working day.</p>
            {nearby.length > 0 && (
              <>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "32px 0 14px" }}>Also in {place}</h3>
                <ul className="chips">{nearby.map((n) => <li key={n.slug}><Link className="chip" href={`/locations/${cSlug}/${n.slug}`}>{n.name}</Link></li>)}</ul>
              </>
            )}
          </Reveal>
          <LeadForm type="contact" button="Send message" products={products.map((p) => ({ slug: p.slug, name: p.name }))} phone={s.phone} email={s.email} />
        </div>
      </section>

      <div style={{ height: 112 }} />
      <DemoBand title="See TARGET 360 on an order like yours" text="A 30-minute demo, online, at a time that suits you." />
      <JsonLd data={cityService(s, c, country)} />
    </>
  );
}
