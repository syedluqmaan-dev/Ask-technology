import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consent } from "@/components/Consent";
import { JsonLd } from "@/components/JsonLd";
import { LivePreview } from "@/components/LivePreview";
import { getCaseStudies, getNavigation, getProducts, getSettings } from "@/lib/cms";
import { organization, website, localBusiness } from "@/lib/schema";
import { fullAddress, telHref, waHref } from "@/lib/format";
import { SITE_URL } from "@/lib/seo";

const sora = localFont({
  src: [
    { path: "../../fonts/sora-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/sora-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/sora-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});

const manrope = localFont({
  src: [
    { path: "../../fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: s.name,
    authors: [{ name: s.name, url: SITE_URL }],
    creator: s.name,
    publisher: s.name,
    formatDetection: { telephone: true, email: true, address: false },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: "/apple-icon.png" },
    manifest: "/manifest.webmanifest",
    verification: {
      google: s.googleVerification || undefined,
      other: s.bingVerification ? { "msvalidate.01": s.bingVerification } : undefined,
    },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [s, nav, products, cases, draft] = await Promise.all([
    getSettings(),
    getNavigation(),
    getProducts(),
    getCaseStudies(),
    draftMode().then((d) => d.isEnabled).catch(() => false),
  ]);

  const columns = nav.footerColumns.length
    ? nav.footerColumns
    : [
        { title: "Products", links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })).concat([{ label: "AI Solutions for Garment Manufacturing", href: "/ai-solution" }]) },
        {
          title: "Company",
          links: [
            { label: "About us", href: "/about" },
            { label: "Leadership", href: "/about#leadership" },
            { label: "Engagement model", href: "/about#engagement" },
            { label: "Careers", href: "/careers" },
            { label: "Partner with us", href: "/partner-with-us" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Customer stories", href: "/case-studies" },
            { label: "Insights", href: "/insights" },
            { label: "Solutions", href: "/solutions" },
            { label: "Industries", href: "/industries" },
            { label: "Garment glossary", href: "/glossary" },
            { label: "FAQs", href: "/faqs" },
            { label: "Book a demo", href: "/book-a-demo" },
            { label: "Contact us", href: "/contact" },
          ],
        },
      ];
  const featured = cases.filter((c) => c.featured);

  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header
          email={s.email}
          phone={s.phone}
          phoneHref={telHref(s.phone)}
          landline={s.landline}
          landlineHref={s.landline ? telHref(s.landline) : undefined}
          whatsappHref={waHref(s.whatsapp, "Hello ASK Technology, I would like to know more about TARGET 360.")}
          address={fullAddress(s)}
          cta={nav.headerCta}
          products={products.map((p) => ({ slug: p.slug, name: p.name, shortName: p.shortName, tagline: p.tagline, audience: p.audience }))}
          stories={(featured.length ? featured : cases).slice(0, 4).map((c) => ({ slug: c.slug, client: c.client, productLabel: c.productLabel }))}
          storyCount={cases.length}
        />
        <main id="main">{children}</main>
        <Footer s={s} columns={columns} />
        <Consent gtmId={s.gtmId} linkedinId={s.linkedinPartnerId} />
        <JsonLd data={[organization(s), website(s), localBusiness(s)]} />
        {draft && (
          <>
            <LivePreview serverURL={SITE_URL} />
            <div className="preview-bar">Draft preview, not public <a className="btn btn-ghost btn-sm" href="/next/exit-preview">Exit</a></div>
          </>
        )}
      </body>
    </html>
  );
}
