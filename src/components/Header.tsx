"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Arrow, Chevron, Close, Icon, Menu, productIcon } from "./Icon";

type MenuKey = "products" | "customers" | "resources" | "company" | null;

type P = { slug: string; name: string; shortName: string; tagline: string; audience: "manufacturers" | "buyingHouses" };
type Props = {
  email: string;
  phone: string;
  phoneHref: string;
  landline?: string;
  landlineHref?: string;
  whatsappHref: string;
  address: string;
  cta: { label: string; href: string };
  products: P[];
  stories: { slug: string; client: string; productLabel: string }[];
  storyCount: number;
};

/** Routes that use the focused layout (no header or footer). */
export const FOCUS_ROUTES = ["/book-a-demo"];

function ProductLink({ p }: { p: P }) {
  return (
    <Link className="mega-link" href={`/products/${p.slug}`}>
      <span className="ico"><Icon name={productIcon[p.slug] ?? "layers"} /></span>
      <span><b>{p.name}</b><span>{p.tagline}</span></span>
    </Link>
  );
}

export function Header(props: Props) {
  const { email, phone, phoneHref, landline, landlineHref, whatsappHref, cta, products } = props;
  const [open, setOpen] = useState<MenuKey>(null);
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setOpen(null); setDrawer(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(null), setDrawer(false));
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);
  useEffect(() => { document.body.style.overflow = drawer ? "hidden" : ""; }, [drawer]);

  if (FOCUS_ROUTES.includes(pathname)) return null;

  const btn = (key: Exclude<MenuKey, null>, label: React.ReactNode) => (
    <div className="nav-item" onMouseEnter={() => setOpen(key)} onMouseLeave={() => setOpen(null)}>
      <button className="nav-btn" aria-expanded={open === key} aria-controls={`mega-${key}`} onClick={() => setOpen(open === key ? null : key)}>
        {label} <Chevron />
      </button>
      {open === key && <Mega id={key} {...props} />}
    </div>
  );

  return (
    <>
      <div className="util">
        <div className="wrap">
          <div>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={phoneHref}>{phone}</a>
            {landline && landlineHref && <a href={landlineHref}>{landline}</a>}
          </div>
          <div className="right">
            <span className="tag">AI-powered apparel ERP for the apparel industry</span>
            <Link href="/partner-with-us">Partner with us</Link>
            <Link href="/careers">Careers</Link>
          </div>
        </div>
      </div>
      <header className="site-header" ref={ref}>
        <div className="wrap bar">
          <Logo id="hdr" />
          <nav className="main-nav" aria-label="Main">
            {btn("products", "Products")}
            <div className="nav-item">
              <Link className="nav-btn" href="/ai-solution" aria-current={pathname === "/ai-solution" ? "page" : undefined}>AI Solution <span className="nav-new">New</span></Link>
            </div>
            {btn("customers", "Customers")}
            {btn("resources", "Resources")}
            {btn("company", "Company")}
            <div className="nav-item"><Link className="nav-btn" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link></div>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link className="btn btn-primary btn-sm header-cta" href={cta.href}>{cta.label}</Link>
            <button className="burger" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}><Menu /></button>
          </div>
        </div>
      </header>

      {drawer && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer-top">
            <Logo compact id="dr" />
            <button className="burger" style={{ display: "flex" }} aria-label="Close menu" onClick={() => setDrawer(false)}><Close /></button>
          </div>
          <details open>
            <summary>Products <Chevron size={20} /></summary>
            <div className="d-links">
              {products.map((p) => <Link key={p.slug} href={`/products/${p.slug}`}>{p.name}</Link>)}
              <Link href="/products">All products</Link>
            </div>
          </details>
          <Link className="d-top" href="/ai-solution">AI Solution</Link>
          <Link className="d-top" href="/case-studies">Customer stories</Link>
          <details>
            <summary>Resources <Chevron size={20} /></summary>
            <div className="d-links">
              <Link href="/insights">Insights</Link>
              <Link href="/solutions">Solutions</Link>
              <Link href="/industries">Industries</Link>
              <Link href="/glossary">Garment glossary</Link>
              <Link href="/faqs">FAQs</Link>
            </div>
          </details>
          <details>
            <summary>Company <Chevron size={20} /></summary>
            <div className="d-links">
              <Link href="/about">About us</Link>
              <Link href="/about#engagement">Engagement model</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/partner-with-us">Partner with us</Link>
            </div>
          </details>
          <Link className="d-top" href="/contact">Contact</Link>
          <Link className="btn btn-primary" href={cta.href}>{cta.label}</Link>
          <div className="grid g2" style={{ gap: 10, marginTop: 10, gridTemplateColumns: "1fr 1fr" }}>
            <a className="btn btn-ghost btn-sm" href={phoneHref}>Call us</a>
            <a className="btn btn-ghost btn-sm" href={whatsappHref}>WhatsApp</a>
          </div>
        </div>
      )}
    </>
  );
}

function Mega({ id, products, stories, storyCount, address }: { id: Exclude<MenuKey, null> } & Props) {
  if (id === "products") {
    return (
      <div className="mega" id="mega-products">
        <div className="wrap mega-cols-3">
          <div>
            <h3>For manufacturers & exporters</h3>
            {products.filter((p) => p.audience === "manufacturers").map((p) => <ProductLink key={p.slug} p={p} />)}
          </div>
          <div>
            <h3>For buying houses & brands</h3>
            {products.filter((p) => p.audience === "buyingHouses").map((p) => <ProductLink key={p.slug} p={p} />)}
          </div>
          <Link className="mega-feature" href="/ai-solution">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/target-360-dashboard.png" alt="" width={1358} height={629} loading="lazy" />
            <b style={{ fontSize: 16 }}>AI-Powered Fashion ERP</b>
            <span className="small">Smart search, techpack data conversion, smarter sales and intelligent planning.</span>
            <span className="link">Explore AI Solution <Arrow /></span>
          </Link>
        </div>
      </div>
    );
  }
  if (id === "customers") {
    return (
      <div className="mega" id="mega-customers">
        <div className="wrap mega-cols-2">
          <div>
            <h3>Customer stories</h3>
            <div className="grid g2" style={{ gap: 4 }}>
              {stories.slice(0, 4).map((c) => (
                <Link key={c.slug} className="mega-link" href={`/case-studies/${c.slug}`}>
                  <span><b>{c.client}</b><span>{c.productLabel}</span></span>
                </Link>
              ))}
            </div>
          </div>
          <Link className="mega-feature" href="/case-studies">
            <b style={{ fontSize: 16 }}>{storyCount} customer stories</b>
            <span className="small">How manufacturers, exporters, buying houses and brands run on TARGET 360.</span>
            <span className="link">See all stories <Arrow /></span>
          </Link>
        </div>
      </div>
    );
  }
  if (id === "resources") {
    return (
      <div className="mega" id="mega-resources">
        <div className="wrap mega-cols-2">
          <div className="grid g2" style={{ gap: 4 }}>
            <Link className="mega-link" href="/insights"><span className="ico"><Icon name="layers" /></span><span><b>Insights</b><span>Articles on apparel ERP, quality, production and industry news.</span></span></Link>
            <Link className="mega-link" href="/case-studies"><span className="ico"><Icon name="chart" /></span><span><b>Customer stories</b><span>Results from garment businesses running TARGET 360.</span></span></Link>
            <Link className="mega-link" href="/solutions"><span className="ico"><Icon name="target" /></span><span><b>Solutions</b><span>Costing, T&A, production, quality and more, by business problem.</span></span></Link>
            <Link className="mega-link" href="/glossary"><span className="ico"><Icon name="tag" /></span><span><b>Garment glossary</b><span>SMV, AQL, BOM, T&A and other apparel terms, explained simply.</span></span></Link>
            <Link className="mega-link" href="/products"><span className="ico"><Icon name="box" /></span><span><b>Product overview</b><span>Every TARGET 360 product and who it is for.</span></span></Link>
            <Link className="mega-link" href="/book-a-demo"><span className="ico"><Icon name="clock" /></span><span><b>Book a demo</b><span>A live walkthrough at a time that suits you.</span></span></Link>
          </div>
          <Link className="mega-feature" href="/contact">
            <b style={{ fontSize: 16 }}>TARGET 360 product brochure</b>
            <span className="small">All products, features and deployment options in one guide.</span>
            <span className="link">Request the brochure <Arrow /></span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="mega" id="mega-company">
      <div className="wrap mega-cols-2">
        <div className="grid g2" style={{ gap: 4 }}>
          <Link className="mega-link" href="/about"><span className="ico"><Icon name="users" /></span><span><b>About us</b><span>20+ years of IT solutions for apparel.</span></span></Link>
          <Link className="mega-link" href="/about#engagement"><span className="ico"><Icon name="chain" /></span><span><b>Engagement model</b><span>From project management to training.</span></span></Link>
          <Link className="mega-link" href="/careers"><span className="ico"><Icon name="spark" /></span><span><b>Careers</b><span>Build software that runs garment businesses.</span></span></Link>
          <Link className="mega-link" href="/partner-with-us"><span className="ico"><Icon name="target" /></span><span><b>Partner with us</b><span>Grow with TARGET 360 in your market.</span></span></Link>
        </div>
        <Link className="mega-feature" href="/contact">
          <b style={{ fontSize: 16 }}>Visit our office</b>
          <span className="small">{address}</span>
          <span className="link">Contact us <Arrow /></span>
        </Link>
      </div>
    </div>
  );
}
