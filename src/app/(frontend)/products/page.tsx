import Link from "next/link";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ClientLogos } from "@/components/ClientLogos";
import { Arrow, Check } from "@/components/Icon";
import { Crumbs } from "@/components/ui";
import { getClients, getProducts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { itemList } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "TARGET 360 Products: Garment ERP, PLM, BMS, QC and OB",
  description:
    "Every TARGET 360 product for apparel businesses: ERP for manufacturers, buying house software, inspection app, sampling PLM, Quick OB and HRMS.",
  path: "/products",
});

const yes = (b: boolean) => (b ? "✓" : "—");

export default async function ProductsPage() {
  const [s, products, clients] = await Promise.all([getSettings(), getProducts(), getClients()]);
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Crumbs s={s} items={[{ name: "Products", path: "/products" }]} />
          <div className="head-row" style={{ marginBottom: 0 }}>
            <div style={{ maxWidth: 780 }}>
              <p className="eyebrow">TARGET 360 garment ERP</p>
              <h1 className="h1">One connected platform for the <span className="grad-text">whole apparel lifecycle</span></h1>
              <p className="lead" style={{ marginTop: 22 }}>{products.length} TARGET 360 products, with AI built in. Start with the one your business needs most, or run them together on one set of data.</p>
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
                <img src={p.image} alt={`${p.brand} screens on laptop, tablet and phone`} loading={i ? "lazy" : "eager"} />
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
                    <th scope="row"><Link href={`/products/${p.slug}`} style={{ color: "var(--ink)", textDecoration: "none" }}>{p.name}</Link></th>
                    <td aria-label={p.fit.manufacturers ? "Yes" : "No"}>{yes(p.fit.manufacturers)}</td>
                    <td aria-label={p.fit.buyingHouses ? "Yes" : "No"}>{yes(p.fit.buyingHouses)}</td>
                    <td aria-label={p.fit.exporters ? "Yes" : "No"}>{yes(p.fit.exporters)}</td>
                    <td aria-label={p.fit.brands ? "Yes" : "No"}>{yes(p.fit.brands)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ClientLogos clients={clients} />
      <div style={{ height: 112 }} />
      <DemoBand />
      <JsonLd data={itemList(s, "TARGET 360 products", products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })))} />
    </>
  );
}
