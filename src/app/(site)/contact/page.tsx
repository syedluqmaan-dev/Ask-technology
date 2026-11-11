import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact ASK Technology in Kodambakkam, Chennai. Call +91 98408 99559 or 044-45034080, or email sales@asktek.net.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = site.address;
  return (
    <section style={{ padding: "64px 0 96px", background: "linear-gradient(180deg, #F3F8FE 0%, #fff 60%)" }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">Contact us</span></nav>
        <h1 className="h1" style={{ fontSize: 52 }}>We are here to help you</h1>
        <p className="lead mt-m mb-l" style={{ maxWidth: 640 }}>Questions about TARGET, pricing or support? Call, write or send us a message.</p>
        <div className="split top">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="contact-card"><p className="k">Sales</p><a className="v" href={`mailto:${site.email}`}>{site.email}</a></div>
            <div className="contact-card"><p className="k">Phone</p><a className="v" href={site.phoneHref}>{site.phone}</a><br /><a href={site.landlineHref} style={{ color: "#46516B", textDecoration: "none" }}>{site.landline}</a></div>
            <div className="contact-card"><p className="k">WhatsApp</p><a href={site.whatsapp} className="link">Chat with us</a><p className="body">Typically replies within 1 hour</p></div>
            <div className="contact-card">
              <p className="k">Office</p>
              <address style={{ fontStyle: "normal", fontSize: 15.5, lineHeight: 1.6 }}>{a.street}, {a.city}, {a.region} {a.postalCode}</address>
              <a className="link" href={site.mapUrl} style={{ display: "inline-block", marginTop: 10 }}>Get directions</a>
            </div>
          </div>
          <div>
            <h2 className="h3" style={{ fontSize: 24, marginBottom: 16 }}>Send us a message</h2>
            <LeadForm source="contact" button="Send message" extraLabel="Message" />
          </div>
        </div>
        <div className="media-ph" style={{ height: 320, marginTop: 40 }}>[Map: ASK Technology, Kodambakkam, Chennai]</div>
      </div>
    </section>
  );
}
