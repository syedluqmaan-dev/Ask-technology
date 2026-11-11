import Link from "next/link";
import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { DemoBand } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Join the ASK Technology partner programme to grow together with TARGET, the garment ERP, and build collaborations that create lasting value.",
  alternates: { canonical: "/partner-with-us" },
};

const why = [
  ["Get new clients", "Offer TARGET to garment businesses you already serve."],
  ["Reach new markets", "Take a proven apparel ERP into new regions and segments."],
  ["Grow your company", "Add a recurring product line to your services."],
  ["Boost connections", "Work alongside our team and other partners."],
  ["Strengthen your network", "Be part of the TARGET ecosystem across the apparel industry."],
  ["Make money", "Earn on every client you bring and support."],
];

export default function PartnerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">Partner with us</span></nav>
          <p className="kicker">Partner programme</p>
          <h1 className="h1" style={{ fontSize: 54, maxWidth: 820 }}>Together, the possibilities are endless</h1>
          <p className="lead mt-m" style={{ maxWidth: 700 }}>Join the ASK Technology partner programme to grow together and build collaborations that create mutual success and lasting value.</p>
          <a className="btn btn-primary mt-l" href="#apply">Apply to partner</a>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <h2 className="h2 mb-l">Why partner with us</h2>
          <div className="cells g3">
            {why.map(([t, d]) => <div key={t}><h3 className="h3" style={{ fontSize: 19 }}>{t}</h3><p className="body mt-s">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section tint" id="apply">
        <div className="wrap split top">
          <div>
            <h2 className="h2">Reach out to us for partnership opportunities</h2>
            <p className="sub mt-m">Tell us about your business and the market you serve. Our partnerships team will get back to you.</p>
          </div>
          <LeadForm source="partner" button="Send message" extraLabel="Message" partnerType />
        </div>
      </section>

      <div style={{ height: 96 }} />
      <DemoBand />
    </>
  );
}
