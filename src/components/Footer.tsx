import Link from "next/link";
import { Logo } from "./Logo";
import { Arrow, Facebook, Instagram, LinkedIn, WhatsApp, YouTube } from "./Icons";
import { site } from "@/data/site";
import { products } from "@/data/products";

export function DemoBand({ title = "See TARGET running on your own workflow", text = "Book a live demo with a product specialist. Our team replies on WhatsApp, typically within 1 hour." }: { title?: string; text?: string }) {
  return (
    <section style={{ padding: "0 0 112px" }}>
      <div className="wrap">
        <div className="band">
          <div>
            <h2 className="h2">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
            <Link className="btn btn-white" href="/book-a-demo">Book a demo <Arrow /></Link>
            <Link className="btn btn-outline-white" href="/contact">Request a call back</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const a = site.address;
  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <Logo bg="#17213F" id="ft" />
              <p style={{ margin: "22px 0 20px", maxWidth: 360, lineHeight: 1.65 }}>
                ASK Technology builds TARGET, the AI-powered ERP for garment manufacturers, exporters, buying houses and fashion brands. Total Enterprise Solution.
              </p>
              <address>
                {a.street}, {a.city}, {a.region} {a.postalCode}
                <br />
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <br />
                <a href={site.phoneHref}>{site.phone}</a> · <a href={site.landlineHref}>{site.landline}</a>
              </address>
              <div className="socials">
                <a href={site.social.linkedin} aria-label="LinkedIn"><LinkedIn /></a>
                <a href={site.social.youtube} aria-label="YouTube"><YouTube /></a>
                <a href={site.social.instagram} aria-label="Instagram"><Instagram /></a>
                <a href={site.social.facebook} aria-label="Facebook"><Facebook /></a>
              </div>
            </div>
            <nav aria-label="Products">
              <h2>Products</h2>
              <ul>
                {products.map((p) => <li key={p.slug}><Link href={`/products/${p.slug}`}>{p.name}</Link></li>)}
                <li><Link href="/ai-solution">AI Solutions for Garment Manufacturing</Link></li>
              </ul>
            </nav>
            <nav aria-label="Company">
              <h2>Company</h2>
              <ul>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/about#leadership">Leadership</Link></li>
                <li><Link href="/about#engagement">Engagement model</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/partner-with-us">Partner with us</Link></li>
              </ul>
            </nav>
            <nav aria-label="Resources">
              <h2>Resources</h2>
              <ul>
                <li><Link href="/case-studies">Customer stories</Link></li>
                <li><Link href="/insights">Insights</Link></li>
                <li><Link href="/book-a-demo">Book a demo</Link></li>
                <li><Link href="/contact">Contact us</Link></li>
              </ul>
            </nav>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} ASK Technology. All rights reserved.</span>
            <span>
              <Link href="/privacy-policy">Privacy policy</Link>
              <Link href="/terms">Terms</Link>
            </span>
          </div>
        </div>
      </footer>
      <a className="wa" href={site.whatsapp} aria-label="Chat with ASK Technology on WhatsApp"><WhatsApp /></a>
    </>
  );
}
