import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { BookingForm } from "@/components/BookingForm";
import { Check } from "@/components/Icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Book a live online demo of TARGET garment ERP with a product specialist from ASK Technology. Pick the products and a time that suits you.",
  alternates: { canonical: "/book-a-demo" },
};

export default function BookDemoPage() {
  return (
    <div className="booking-wrap">
      <header className="focus-head">
        <div className="wrap">
          <Logo compact id="bk" />
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 14.5 }}>
            <a className="hide-m" href={site.phoneHref} style={{ fontWeight: 700 }}>{site.phone}</a>
            <Link href="/" style={{ fontWeight: 700, color: "#17213F" }}>Back to site</Link>
          </div>
        </div>
      </header>
      <main id="main" className="wrap book-grid">
        <div>
          <h1 className="h1" style={{ fontSize: 42 }}>Book your TARGET demo</h1>
          <p className="sub mt-m">A live walkthrough of TARGET on a workflow like yours, with a product specialist from ASK Technology.</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 32px", display: "flex", flexDirection: "column", gap: 14, fontSize: 15.5 }}>
            {["[30]-minute online demo, at a time that suits you", "Focused on the products you choose", "Confirmation by email and WhatsApp", "Reschedule any time by replying to us"].map((t) => (
              <li key={t} style={{ display: "flex", gap: 12 }}><Check size={20} />{t}</li>
            ))}
          </ul>
          <div className="contact-card" style={{ fontSize: 15, lineHeight: 1.65 }}>
            <b>Prefer to talk now?</b><br />
            <a href={site.phoneHref}>{site.phone}</a> · <a href={site.landlineHref}>{site.landline}</a><br />
            <a href={`mailto:${site.email}`}>{site.email}</a><br />
            <span className="body">WhatsApp: typically replies within 1 hour</span>
          </div>
        </div>
        <Suspense fallback={<div className="form" style={{ minHeight: 600 }} />}>
          <BookingForm />
        </Suspense>
      </main>
    </div>
  );
}
