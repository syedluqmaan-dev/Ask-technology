import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/Logo";
import { Booking } from "@/components/Booking";
import { BookingForm } from "@/components/BookingForm";
import { Check } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { getDemoPage, getProducts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbs } from "@/lib/schema";
import { telHref, waHref } from "@/lib/format";

export const revalidate = 3600;

export async function generateMetadata() {
  const d = await getDemoPage();
  return buildMetadata({ title: d.seo.title, description: d.seo.description, path: "/book-a-demo" });
}

/** Focused booking page: no site header or footer, as in the approved design. */
export default async function DemoPage() {
  const [s, d, products] = await Promise.all([getSettings(), getDemoPage(), getProducts()]);
  return (
    <div className="booking-wrap">
      <header className="focus-head">
        <div className="wrap">
          <Logo compact id="bk" />
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 14.5 }}>
            <a className="hide-m" href={telHref(s.phone)} style={{ fontWeight: 700 }}>{s.phone}</a>
            <Link href="/" style={{ fontWeight: 700, color: "var(--ink)" }}>Back to site</Link>
          </div>
        </div>
      </header>
      <div className="wrap book-grid">
        <div>
          <h1 className="h1" style={{ fontSize: "clamp(34px, 4vw, 42px)" }}>{d.title}</h1>
          <p className="sub mt-m">{d.lead}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 32px", display: "flex", flexDirection: "column", gap: 14, fontSize: 15.5 }}>
            {d.points.map((t) => <li key={t} style={{ display: "flex", gap: 12 }}><Check size={20} />{t}</li>)}
          </ul>
          <div className="contact-card" style={{ fontSize: 15, lineHeight: 1.65 }}>
            <b>Prefer to talk now?</b><br />
            <a href={telHref(s.phone)}>{s.phone}</a>{s.landline && <> · <a href={telHref(s.landline)}>{s.landline}</a></>}<br />
            <a href={`mailto:${s.email}`}>{s.email}</a><br />
            {s.whatsapp && <a className="body" href={waHref(s.whatsapp)}>WhatsApp: typically replies within 1 hour</a>}
          </div>
        </div>
        {s.calLink ? (
          <Booking calLink={s.calLink} />
        ) : (
          <Suspense fallback={<div className="form" style={{ minHeight: 600 }} />}>
            <BookingForm products={products.map((p) => ({ slug: p.slug, shortName: p.shortName }))} phone={s.phone} />
          </Suspense>
        )}
      </div>
      <JsonLd data={breadcrumbs(s, [{ name: "Home", path: "/" }, { name: "Book a demo", path: "/book-a-demo" }])} />
    </div>
  );
}
