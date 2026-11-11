import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check } from "@/components/Icons";
import { ClientLogos } from "@/components/ClientLogos";

export const metadata: Metadata = {
  title: "TARGET Garment ERP Products",
  description:
    "TARGET products for the apparel industry: Garment ERP for Knit & Woven, Buying House Management, Garment Inspection Software, Garment ERP for Brands and Quick OB, with AI built in.",
  alternates: { canonical: "/products" },
};

const yes = (b: boolean) => (b ? "✓" : "—");

export default function ProductsPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${site.url}/products/${p.slug}` })),
  };
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">Products</span></nav>
          <div className="head-row" style={{ marginBottom: 0 }}>
            <div style={{ maxWidth: 780 }}>
              <p className="eyebrow">TARGET garment ERP</p>
              <h1 className="h1">One connected platform for the <span className="grad-text">whole apparel lifecycle</span></h1>
              <p className="lead" style={{ marginTop: 22 }}>Five TARGET products, with AI built in. Start with the one your business needs most, or run them together on one set of data.</p>
            </div>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/book-a-demo">Book a demo <Arrow /></Link>
              <Link className="btn btn-ghost" href="/contact">Request brochure</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          {products.map((p, i) => (
            <Reveal key={p.slug} className={`show${i % 2 ? " flip" : ""}`}>
              <div>
                <span className="badge">{p.brand} · {p.audienceLabel}</span>
                <h2 className="h2" style={{ marginTop: 18, fontSize: "clamp(28px,3vw,38px)" }}>{p.name}</h2>
                <p className="sub" style={{ marginTop: 14 }}>{p.intro}</p>
                <ul className="ticklist tick2" style={{ marginTop: 22 }}>
                  {p.highlights.map((h) => <li key={h}><Check />{h}</li>)}
                </ul>
                <div className="btn-row" style={{ marginTop: 30 }}>
                  <Link className="btn btn-primary btn-sm" href={`/products/${p.slug}`}>Explore {p.shortName} <Arrow /></Link>
                  <Link className="btn btn-ghost btn-sm" href={`/book-a-demo?product=${p.slug}`}>Book a demo</Link>
                </div>
              </div>
              <div className="show-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`${p.brand} screens`} loading={i ? "lazy" : "eager"} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Find your fit</p>
            <h2 className="h2">Which products fit your business</h2>
            <p className="sub">A quick guide. Our team will confirm the right set with you on a short call.</p>
          </Reveal>
          <div className="tbl">
            <table>
              <thead><tr><th scope="col">Product</th><th scope="col">Manufacturers</th><th scope="col">Buying houses</th><th scope="col">Exporters</th><th scope="col">Fashion brands</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row"><Link href={`/products/${p.slug}`} style={{ color: "#17213F", textDecoration: "none" }}>{p.name}</Link></th>
                    <td>{yes(p.fit.manufacturers)}</td><td>{yes(p.fit.buyingHouses)}</td><td>{yes(p.fit.exporters)}</td><td>{yes(p.fit.brands)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ClientLogos />
      <div style={{ height: 112 }} />
      <DemoBand />
      <JsonLd data={ld} />
    </>
  );
}
