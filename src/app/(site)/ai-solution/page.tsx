import Link from "next/link";
import type { Metadata } from "next";
import { ClientLogos } from "@/components/ClientLogos";
import { LeadForm } from "@/components/LeadForm";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Arrow, Check, Icon } from "@/components/Icons";
import type { IconName } from "@/data/products";

export const metadata: Metadata = {
  title: "AI-Powered Fashion ERP",
  description:
    "TARGET AI covers design through delivery in one system: AI-powered operations, techpack data conversion, smarter sales and intelligent planning for apparel businesses.",
  alternates: { canonical: "/ai-solution" },
};

const benefits: [IconName, string, string][] = [
  ["clock", "Faster decisions", "AI forecasts trends, manages inventory and helps you respond quickly."],
  ["wallet", "Lower costs", "Routine work is automated and waste is cut."],
  ["target", "Demand accuracy", "Better forecasts, so fewer market chances are missed."],
  ["spark", "Future ready", "Data-driven insights that help you adapt to change."],
];
const features: [IconName, string, string, string[]][] = [
  ["spark", "AI-powered operations", "Find anything fast and reuse what you already have.", ["Smart search across the ERP", "Side-by-side comparison of styles, costs and suppliers", "Reuse of existing data"]],
  ["invoice", "AI data conversion", "Buyer PDF techpacks become structured ERP data.", ["Bills of materials extracted automatically", "Measurements captured into charts", "Materials listed and ready to cost"]],
  ["chart", "Smarter sales", "Quote with confidence before you commit.", ["Checks availability and capacity", "Estimates cost and margin", "Links sales orders to production"]],
  ["target", "Intelligent planning", "Plans that adjust as the floor changes.", ["Automatic scheduling and live adjustments", "Tracking of WIP and bottlenecks", "Visibility from cutting to shipment"]],
];
const audiences: [IconName, string, string][] = [
  ["swatch", "Fashion brands", "Design-to-delivery management with real-time visibility."],
  ["factory", "Apparel manufacturers", "Production, capacity and quality planning."],
  ["layers", "Textile mills", "Tracking of fabric production, dyeing and finishing."],
  ["store", "Fashion retailers and chains", "Unified operations across stores, channels and locations."],
];

export default function AIPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="pill" style={{ cursor: "default" }}><span>New</span>AI-Powered Fashion ERP</p>
            <h1 className="h1">Making fashion operations <span className="grad-text">smarter with AI</span></h1>
            <p className="lead">TARGET is an AI platform that covers design through delivery in one system, with live data to help you plan, track and grow.</p>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <Link className="btn btn-primary" href="/book-a-demo?product=ai-solution">Book a demo <Arrow /></Link>
              <Link className="btn btn-ghost" href="/products">Take a product tour</Link>
            </div>
            <ul className="trio"><li><Check />Secure</li><li><Check />Scalable</li><li><Check />Built for fashion</li></ul>
          </div>
          <div className="card" style={{ padding: 26, boxShadow: "var(--shadow-lg)", borderRadius: 24 }} role="img" aria-label="TARGET AI converting a buyer techpack">
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid #E2E9F3" }}>
              <span className="ico grad" style={{ width: 34, height: 34, borderRadius: 10 }}><Icon name="spark" size={18} /></span>
              <b style={{ fontFamily: "var(--font-head)" }}>TARGET AI · Techpack conversion</b>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 0" }}>
              <span className="ico" style={{ width: 44, height: 52, borderRadius: 8, fontSize: 12, fontWeight: 800 }}>PDF</span>
              <span style={{ fontSize: 14.5 }}><b>Buyer techpack uploaded</b><br /><span className="small">Style SS27 · 14 pages</span></span>
            </div>
            {[["Bill of materials", "Ready", "#1F7A4D"], ["Measurement chart", "Ready", "#1F7A4D"], ["Fabric and trims", "Review", "#2C3E9E"], ["Cost estimate", "Ready", "#1F7A4D"]].map(([a, b, c]) => (
              <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "13px 14px", borderRadius: 10, background: "#F3F8FE", marginTop: 8, fontSize: 14.5 }}><span>{a}</span><b style={{ color: c }}>{b}</b></div>
            ))}
            <div className="grid g2" style={{ gap: 10, marginTop: 18 }}>
              {benefits.map(([, t]) => <span key={t} style={{ background: "#fff", border: "1px solid #E2E9F3", borderRadius: 10, padding: "10px 12px", fontSize: 13.5, fontWeight: 700, textAlign: "center" }}>{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      <ClientLogos title={<>Trusted by <b>forward-thinking apparel businesses</b></>} />

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head center"><p className="eyebrow">Benefits</p><h2 className="h2">Transform your fashion business</h2></Reveal>
          <div className="grid g4">
            {benefits.map(([ic, t, d], i) => <Reveal key={t} className="feat" delay={i * 70}><span className="ico grad"><Icon name={ic} /></span><h3>{t}</h3><p className="body">{d}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">AI-powered features</p><h2 className="h2">Built into the ERP your teams already use</h2></Reveal>
          <div className="grid g2">
            {features.map(([ic, t, d, list], i) => (
              <Reveal key={t} className="card" delay={(i % 2) * 80} style={{ padding: 34 }}>
                <span className="ico"><Icon name={ic} /></span>
                <h3 className="h3" style={{ marginTop: 18 }}>{t}</h3>
                <p className="body" style={{ marginTop: 6 }}>{d}</p>
                <ul className="ticklist" style={{ marginTop: 16 }}>{list.map((x) => <li key={x}><Check />{x}</li>)}</ul>
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
            <p className="sub" style={{ margin: "18px 0 30px" }}>Yes. TARGET AI is secure, scalable and built for fashion, so you can start with the data you already have.</p>
            <Link className="btn btn-ghost" href="/contact">Get the whitepaper <Arrow /></Link>
          </Reveal>
          <div className="grid g2" style={{ gap: 16 }}>
            {audiences.map(([ic, t, d]) => <Reveal key={t} className="card"><span className="ico"><Icon name={ic} /></span><b style={{ fontSize: 17, marginTop: 16 }}>{t}</b><span className="body" style={{ marginTop: 6 }}>{d}</span></Reveal>)}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 112 }}>
        <div className="wrap">
          <div className="split top soft-box">
            <div>
              <p className="eyebrow">Talk to us</p>
              <h2 className="h2" style={{ fontSize: "clamp(28px,3vw,38px)" }}>Transform your fashion business with AI</h2>
              <p className="sub" style={{ marginTop: 16 }}>Share what you want AI to do for your business. Our team will reply with a plan and a demo.</p>
            </div>
            <LeadForm source="ai-solution" button="Unlock AI power" extraLabel="Your AI requirements" />
          </div>
        </div>
      </section>
      <DemoBand />
    </>
  );
}
