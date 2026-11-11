import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";

const sora = localFont({
  src: [
    { path: "../fonts/sora-latin-300-normal.woff2", weight: "300" },
    { path: "../fonts/sora-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/sora-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/sora-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-sora",
  display: "swap",
});

const manrope = localFont({
  src: [
    { path: "../fonts/manrope-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/manrope-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/manrope-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/manrope-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ASK Technology | AI-Powered Garment ERP (TARGET)",
    template: "%s | ASK Technology",
  },
  description: site.description,
  applicationName: "ASK Technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ASK Technology",
    locale: "en_IN",
    url: site.url,
    title: "ASK Technology | AI-Powered Garment ERP (TARGET)",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.tagline,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  contactPoint: [{ "@type": "ContactPoint", telephone: site.phone, email: site.email, contactType: "sales", areaServed: "IN" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
