import Link from "next/link";
import type { Metadata } from "next";
import { ClientLogos } from "@/components/ClientLogos";
import { ProductExplorer } from "@/components/ProductExplorer";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CaseCard, PostCard } from "@/components/Cards";
import { Arrow, Check, Icon } from "@/components/Icons";
import { getProduct } from "@/data/products";
import { caseStudies } from "@/data/caseStudies";
import { posts } from "@/data/blog";
import { clients } from "@/data/clients";
import type { IconName } from "@/data/products";

export const metadata: Metadata = {
  title: { absolute: "ASK Technology | AI-Powered Garment ERP for Apparel Manufacturers & Buying Houses" },
  description:
    "TARGET is an AI-powered garment ERP built for the complete apparel lifecycle, from order and costing to production and shipment. For manufacturers, exporters, buying houses and brands.",
  alternates: { canonical: "/" },
};

const journey: { stage: string; slug: string; icon: IconName; text: string }[] = [
  { stage: "Costing & sourcing", slug: "buying-house-management", icon: "tag", text: "Buyer costing, vendor bidding and factory orders." },
  { stage: "Sampling", slug: "garment-erp-brands", icon: "swatch", text: "Sample costing, orders, purchase and reconciliation." },
  { stage: "Planning & export", slug: "garment-erp-knit-woven", icon: "factory", text: "Orders, inventory, finance and export documents." },
  { stage: "Production", slug: "operation-bulletin-quick-ob", icon: "clock", text: "Operation bulletins, SMV and hourly output." },
  { stage: "Quality", slug: "garment-inspection-software", icon: "shield", text: "Offline mobile inspections with real-time MIS." },
];

const why: { icon: IconName; title: string; text: string }[] = [
  { icon: "factory", title: "Built only for apparel", text: "Every screen speaks the language of garments: styles, BOMs, SMV, AQL, T&A." },
  { icon: "spark", title: "AI built in", text: "Smart search, techpack conversion, capacity checks and intelligent planning." },
  { icon: "offline", title: "Works offline on the floor", text: "Inspections and data capture continue without internet and sync later." },
  { icon: "cloud", title: "Cloud and mobile", text: "Web, tablet and phone, with mobile-responsive dashboards for every role." },
  { icon: "layers", title: "Customisable for your process", text: "From apparel manufacturers to buying houses, TARGET adapts to how you work." },
  { icon: "users", title: "25+ years of IT solutions", text: "A Chennai team that understands both technology and the factory floor." },
];

export default function Home() {
  const featured = caseStudies.filter((c) => c.featured).slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Link className="pill" href="/ai-solution"><span>New</span>AI-Powered Apparel ERP <Arrow /></Link>
            <h1 className="h1">Intelligence that drives <span className="grad-text">apparel industries</span></h1>
            <p className="lead">
              An AI-powered garment ERP built for the complete lifecycle. From order and costing to production and shipment, manage
              everything in one intelligent platform. Reduce costs, improve productivity and predict problems.
            </p>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <Link className="btn btn-primary" href="/book-a-demo">Book a free demo <Arrow /></Link>
              <Link className="btn btn-ghost" href="/products">Explore products</Link>
            </div>
            <ul className="trio">
              <li><Check />AI-powered</li>
              <li><Check />Apparel-focused</li>
              <li><Check />Built for growth</li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="hero-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/projects/erp-mockup.png" alt="TARGET ERP dashboard on laptop, tablet and phone" fetchPriority="high" />
            </div>
            <div className="float f2" aria-hidden="true">
              <div style={{ display: "flex", justifyContent: "space-between" }}><b>PO-2418 · Knit polo</b><span style={{ color: "#2C3E9E", fontWeight: 700 }}>4/6</span></div>
              <div className="bars">{["#4560D0", "#3B78D6", "#2A89DA", "#1C97DD", "", ""].map((c, i) => <i key={i} style={c ? { background: c } : undefined} />)}</div>
              <div style={{ marginTop: 8, color: "#5B6680" }}>In production · on track</div>
            </div>
            <div className="float f1" aria-hidden="true">
              <span className="ico" style={{ width: 38, height: 38, borderRadius: 11, background: "#E7F6EE", color: "#1F7A4D" }}><Check color="#1F7A4D" /></span>
              <span><b>Inspection passed</b><br /><span style={{ color: "#5B6680" }}>AQL 2.5 · synced from offline</span></span>
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />

      <section className="section sm">
        <div className="wrap">
          <Reveal className="stats">
            <div><strong className="grad-text">25+</strong><span>Years of IT solutions</span></div>
            <div><strong className="grad-text">{clients.length}+</strong><span>Apparel businesses shown above</span></div>
            <div><strong className="grad-text">{caseStudies.length}</strong><span>Published customer stories</span></div>
            <div><strong className="grad-text">5 + AI</strong><span>TARGET products on one platform</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow">One platform</p>
            <h2 className="h2">From order & costing to production & shipment</h2>
            <p className="sub">Each TARGET product covers a stage of the garment order. Run them together as one suite, or start with the stage that needs it most.</p>
          </Reveal>
          <div className="journey">
            <div className="track" aria-hidden="true" />
            <ol className="grid g5">
              {journey.map((j, i) => {
                const p = getProduct(j.slug)!;
                return (
                  <Reveal as="li" key={j.stage} delay={i * 80}>
                    <span className="node"><Icon name={j.icon} size={26} /></span>
                    <span className="step">Step {i + 1}</span>
                    <h3>{j.stage}</h3>
                    <p className="body" style={{ fontSize: 14.5 }}>{j.text}</p>
                    <Link href={`/products/${p.slug}`} style={{ display: "inline-block", marginTop: 8 }}>{p.shortName}</Link>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-tint" id="products">
        <div className="wrap">
          <Reveal className="head-row">
            <div>
              <p className="eyebrow">TARGET products</p>
              <h2 className="h2">Built for the way your business works</h2>
              <p className="sub" style={{ marginTop: 16 }}>Pick your business type to see the products made for it, and the real screens your team will use.</p>
            </div>
            <Link className="btn btn-ghost" href="/products">All products <Arrow /></Link>
          </Reveal>
          <ProductExplorer />
        </div>
      </section>

      <section className="section">
        <div className="wrap split wide-r">
          <Reveal>
            <p className="eyebrow">TARGET AI</p>
            <h2 className="h2">Making fashion operations smarter with AI</h2>
            <p className="sub" style={{ margin: "18px 0 30px" }}>One AI platform from design to delivery, with live data to help you plan, track and grow.</p>
            <div className="grid g2" style={{ gap: "24px 28px" }}>
              {([
                ["spark", "AI-powered operations", "Smart search and side-by-side comparison of styles, costs and suppliers."],
                ["invoice", "AI data conversion", "Buyer PDF techpacks turned into BOMs, measurements and materials."],
                ["chart", "Smarter sales", "Checks capacity, estimates cost and margin, links orders to production."],
                ["target", "Intelligent planning", "Automatic scheduling and live WIP from cutting to shipment."],
              ] as [IconName, string, string][]).map(([ic, t, d]) => (
                <div key={t} style={{ display: "flex", gap: 14 }}>
                  <span className="ico" style={{ width: 42, height: 42, borderRadius: 12 }}><Icon name={ic} size={20} /></span>
                  <div><h3 style={{ fontSize: 16.5, fontWeight: 700, marginBottom: 4 }}>{t}</h3><p className="body" style={{ fontSize: 15 }}>{d}</p></div>
                </div>
              ))}
            </div>
            <Link className="btn btn-ghost" style={{ marginTop: 36 }} href="/ai-solution">Explore AI Solution <Arrow /></Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="card" style={{ padding: 26, boxShadow: "var(--shadow-lg)", borderRadius: 24 }} role="img" aria-label="Asking TARGET AI which orders are at risk">
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid #E2E9F3" }}>
                <span className="ico grad" style={{ width: 34, height: 34, borderRadius: 10 }}><Icon name="spark" size={18} /></span>
                <b style={{ fontFamily: "var(--font-head)" }}>Ask TARGET AI</b>
              </div>
              <p style={{ alignSelf: "flex-end", maxWidth: "82%", margin: "18px 0 14px", background: "#F3F8FE", borderRadius: "14px 14px 4px 14px", padding: "12px 16px", fontSize: 14.5 }}>
                Which orders are at risk of missing their ship date this month?
              </p>
              <div style={{ border: "1px solid #E2E9F3", borderRadius: "14px 14px 14px 4px", padding: 16, fontSize: 14.5 }}>
                <b>3 orders need attention</b>
                <p className="body" style={{ margin: "6px 0 12px", fontSize: 14.5 }}>Sewing output is behind plan on these styles. Moving operators to the next free line recovers time.</p>
                {[["KW-2055 Tee", "2 days behind", "#FFF4E8", "#B4540A"], ["WV-1190 Shirt", "1 day behind", "#FFF4E8", "#B4540A"], ["KW-2061 Polo", "Watch", "#F3F8FE", "#2C3E9E"]].map(([a, b, bg, c]) => (
                  <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", background: bg, borderRadius: 8, fontSize: 13.5, marginTop: 8 }}><b>{a}</b><b style={{ color: c }}>{b}</b></div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14, padding: "8px 8px 8px 16px", border: "1px solid #C9D3E3", borderRadius: 12, alignItems: "center", fontSize: 14, color: "#5B6680" }}>
                <span style={{ flex: 1 }}>Convert this techpack into a BOM…</span>
                <span className="ico grad" style={{ width: 36, height: 36, borderRadius: 9 }}><Arrow color="#fff" /></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow">Why ASK Technology</p>
            <h2 className="h2">Technology that understands the factory floor</h2>
          </Reveal>
          <div className="grid g3">
            {why.map((w, i) => (
              <Reveal key={w.title} className="feat" delay={(i % 3) * 80}>
                <span className="ico"><Icon name={w.icon} /></span>
                <h3>{w.title}</h3>
                <p className="body">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="case-studies">
        <div className="wrap">
          <Reveal className="head-row">
            <div>
              <p className="eyebrow">Customer stories</p>
              <h2 className="h2">Garment businesses running on TARGET</h2>
            </div>
            <Link className="btn btn-ghost" href="/case-studies">All {caseStudies.length} stories <Arrow /></Link>
          </Reveal>
          <div className="grid g3">
            {featured.map((c, i) => <Reveal key={c.slug} delay={i * 80} style={{ display: "grid" }}><CaseCard c={c} /></Reveal>)}
          </div>
          <Reveal as="figure" className="quote" style={{ marginTop: 32 }}>
            <blockquote>Our ERP is customisable for all apparel manufacturers to buying houses.</blockquote>
            <figcaption><b>Mohammed Salahuddin</b> · Founder & CEO, ASK Technology</figcaption>
          </Reveal>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="head-row">
            <div>
              <p className="eyebrow">Insights</p>
              <h2 className="h2">Ideas for running a smarter garment business</h2>
            </div>
            <Link className="btn btn-ghost" href="/insights">All articles <Arrow /></Link>
          </Reveal>
          <div className="grid g3">
            {posts.slice(0, 3).map((p, i) => <Reveal key={p.id} delay={i * 80} style={{ display: "grid" }}><PostCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <div style={{ height: 112 }} />
      <DemoBand />
    </>
  );
}
