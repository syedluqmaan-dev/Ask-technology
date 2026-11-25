import Link from "next/link";
import { ClientLogos } from "@/components/ClientLogos";
import { LeadForm } from "@/components/LeadForm";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check, Icon } from "@/components/Icon";
import { Accent, Crumbs, FaqSection } from "@/components/ui";
import { getAiPage, getClients, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const a = await getAiPage();
  return buildMetadata({ title: a.seo.title, description: a.seo.description, path: "/ai-solution", keywords: ["AI garment ERP", "AI for apparel industry", "techpack to BOM AI"] });
}

export default async function AiPage() {
  const [s, a, clients] = await Promise.all([getSettings(), getAiPage(), getClients()]);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Crumbs s={s} items={[{ name: "AI Solution", path: "/ai-solution" }]} />
        </div>
        <div className="wrap hero-grid">
          <div>
            <p className="pill" style={{ cursor: "default" }}><span>New</span>AI-Powered Fashion ERP</p>
            <h1 className="h1"><Accent text={a.title} accent={a.accent} /></h1>
            <p className="lead">{a.lead}</p>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <Link className="btn btn-primary" href="/book-a-demo?product=ai-solution">Book a demo <Arrow /></Link>
              <Link className="btn btn-ghost" href="/products">Take a product tour</Link>
            </div>
            <ul className="trio"><li><Check />Secure</li><li><Check />Scalable</li><li><Check />Built for fashion</li></ul>
          </div>
          <div className="card" style={{ padding: 26, boxShadow: "var(--shadow-lg)", borderRadius: 24 }} role="img" aria-label="TARGET 360 AI converting a buyer techpack">
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid #E2E9F3" }}>
              <span className="ico grad" style={{ width: 34, height: 34, borderRadius: 10 }}><Icon name="spark" size={18} /></span>
              <b style={{ fontFamily: "var(--font-head)" }}>TARGET 360 AI · Techpack conversion</b>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 0" }}>
              <span className="ico" style={{ width: 44, height: 52, borderRadius: 8, fontSize: 12, fontWeight: 800 }}>PDF</span>
              <span style={{ fontSize: 14.5 }}><b>Buyer techpack uploaded</b><br /><span className="small">Style SS27 · 14 pages</span></span>
            </div>
            {[["Bill of materials", "Ready", "#1F7A4D"], ["Measurement chart", "Ready", "#1F7A4D"], ["Fabric and trims", "Review", "#2C3E9E"], ["Cost estimate", "Ready", "#1F7A4D"]].map(([x, y, c]) => (
              <div key={x} style={{ display: "flex", justifyContent: "space-between", padding: "13px 14px", borderRadius: 10, background: "#F3F8FE", marginTop: 8, fontSize: 14.5 }}><span>{x}</span><b style={{ color: c }}>{y}</b></div>
            ))}
            <div className="grid g2" style={{ gap: 10, marginTop: 18 }}>
              {a.benefits.map((b) => <span key={b.title} style={{ background: "#fff", border: "1px solid #E2E9F3", borderRadius: 10, padding: "10px 12px", fontSize: 13.5, fontWeight: 700, textAlign: "center" }}>{b.title}</span>)}
            </div>
          </div>
        </div>
      </section>

      <ClientLogos clients={clients} title={<>Trusted by <b>forward-thinking apparel businesses</b></>} />

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head center"><p className="eyebrow">Benefits</p><h2 className="h2">Transform your fashion business</h2></Reveal>
          <div className="grid g4">
            {a.benefits.map((b, i) => <Reveal key={b.title} className="feat" delay={i * 70}><span className="ico grad"><Icon name={b.icon ?? "spark"} /></span><h3>{b.title}</h3><p className="body">{b.text}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">AI-powered features</p><h2 className="h2">Built into the ERP your teams already use</h2></Reveal>
          <div className="grid g2">
            {a.features.map((f, i) => (
              <Reveal key={f.title} className="card" delay={(i % 2) * 80} style={{ padding: 34 }}>
                <span className="ico"><Icon name={f.icon} /></span>
                <h3 className="h3" style={{ marginTop: 18 }}>{f.title}</h3>
                <p className="body" style={{ marginTop: 6 }}>{f.text}</p>
                <ul className="ticklist" style={{ marginTop: 16 }}>{f.points.map((x) => <li key={x}><Check />{x}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Ready for AI?</p>
            <h2 className="h2">Are fashion businesses actually ready for AI?</h2>
            <p className="sub" style={{ margin: "18px 0 30px" }}>Yes. TARGET 360 AI is secure, scalable and built for fashion, so you can start with the data you already have.</p>
            <Link className="btn btn-ghost" href="/contact">Get the whitepaper <Arrow /></Link>
          </Reveal>
          <div className="grid g2" style={{ gap: 16 }}>
            {a.audiences.map((x) => <Reveal key={x.title} className="card"><span className="ico"><Icon name={x.icon ?? "layers"} /></span><b style={{ fontSize: 17, marginTop: 16 }}>{x.title}</b><span className="body" style={{ marginTop: 6 }}>{x.text}</span></Reveal>)}
          </div>
        </div>
      </section>

      <FaqSection s={s} faqs={a.faqs} title="Questions about AI in garment ERP" tint />

      <section style={{ padding: "112px 0" }}>
        <div className="wrap">
          <div className="split top soft-box">
            <div>
              <p className="eyebrow">Talk to us</p>
              <h2 className="h2" style={{ fontSize: "clamp(28px,3vw,38px)" }}>Transform your fashion business with AI</h2>
              <p className="sub" style={{ marginTop: 16 }}>Share what you want AI to do for your business. Our team will reply with a plan and a demo.</p>
            </div>
            <LeadForm type="ai" button="Unlock AI power" extraLabel="Your AI requirements" phone={s.phone} email={s.email} />
          </div>
        </div>
      </section>
      <DemoBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "TARGET 360 AI",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: a.lead,
          url: `${s.url}/ai-solution`,
          featureList: a.features.map((f) => f.title),
          publisher: { "@id": `${s.url}/#organization` },
        }}
      />
    </>
  );
}
