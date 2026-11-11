"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Arrow, Chevron, Close, Icon, Menu, productIcon } from "./Icons";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { caseStudies } from "@/data/caseStudies";

type MenuKey = "products" | "customers" | "resources" | "company" | null;

const manufacturing = products.filter((p) => p.audience === "manufacturers");
const sourcing = products.filter((p) => p.audience === "buyingHouses");

function ProductLink({ slug }: { slug: string }) {
  const p = products.find((x) => x.slug === slug)!;
  return (
    <Link className="mega-link" href={`/products/${p.slug}`}>
      <span className="ico"><Icon name={productIcon[p.slug]} /></span>
      <span><b>{p.name}</b><span>{p.tagline}</span></span>
    </Link>
  );
}

export function Header() {
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

  const btn = (key: Exclude<MenuKey, null>, label: React.ReactNode) => (
    <div className="nav-item" onMouseEnter={() => setOpen(key)} onMouseLeave={() => setOpen(null)}>
      <button className="nav-btn" aria-expanded={open === key} aria-controls={`mega-${key}`} onClick={() => setOpen(open === key ? null : key)}>
        {label} <Chevron />
      </button>
      {open === key && <Mega id={key} />}
    </div>
  );

  return (
    <>
      <div className="util">
        <div className="wrap">
          <div>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.landlineHref}>{site.landline}</a>
          </div>
          <div className="right">
            <span className="tag">AI-powered apparel ERP, built in Chennai</span>
            <Link href="/partner-with-us">Partner with us</Link>
            <Link href="/careers">Careers</Link>
          </div>
        </div>
      </div>
      <header className="site-header" ref={ref}>
        <div className="wrap bar">
          <Logo />
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
            <Link className="btn btn-primary btn-sm header-cta" href="/book-a-demo">Book a demo</Link>
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
          <Link className="d-top" href="/insights">Insights</Link>
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
          <Link className="btn btn-primary" href="/book-a-demo">Book a demo</Link>
          <div className="grid g2" style={{ gap: 10, marginTop: 10, gridTemplateColumns: "1fr 1fr" }}>
            <a className="btn btn-ghost btn-sm" href={site.phoneHref}>Call us</a>
            <a className="btn btn-ghost btn-sm" href={site.whatsapp}>WhatsApp</a>
          </div>
        </div>
      )}
    </>
  );
}

function Mega({ id }: { id: Exclude<MenuKey, null> }) {
  if (id === "products") {
    return (
      <div className="mega" id="mega-products">
        <div className="wrap mega-cols-3">
          <div>
            <h3>For manufacturers & exporters</h3>
            {manufacturing.map((p) => <ProductLink key={p.slug} slug={p.slug} />)}
          </div>
          <div>
            <h3>For buying houses & brands</h3>
            {sourcing.map((p) => <ProductLink key={p.slug} slug={p.slug} />)}
          </div>
          <Link className="mega-feature" href="/ai-solution">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/projects/erp-mockup.png" alt="" />
            <b style={{ fontSize: 16 }}>AI-Powered Fashion ERP</b>
            <span className="small">Smart search, techpack data conversion, smarter sales and intelligent planning.</span>
            <span className="link">Explore AI Solution <Arrow /></span>
          </Link>
        </div>
      </div>
    );
  }
  if (id === "customers") {
    const list = caseStudies.filter((c) => c.featured).slice(0, 4);
    return (
      <div className="mega" id="mega-customers">
        <div className="wrap mega-cols-2">
          <div>
            <h3>Customer stories</h3>
            <div className="grid g2" style={{ gap: 4 }}>
              {list.map((c) => (
                <Link key={c.slug} className="mega-link" href={`/case-studies/${c.slug}`}>
                  <span><b>{c.client}</b><span>{c.productLabel}</span></span>
                </Link>
              ))}
            </div>
          </div>
          <Link className="mega-feature" href="/case-studies">
            <b style={{ fontSize: 16 }}>{caseStudies.length} customer stories</b>
            <span className="small">How manufacturers, exporters, buying houses and brands run on TARGET.</span>
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
            <Link className="mega-link" href="/case-studies"><span className="ico"><Icon name="chart" /></span><span><b>Customer stories</b><span>Results from garment businesses running TARGET.</span></span></Link>
            <Link className="mega-link" href="/products"><span className="ico"><Icon name="box" /></span><span><b>Product overview</b><span>Every TARGET product and who it is for.</span></span></Link>
            <Link className="mega-link" href="/book-a-demo"><span className="ico"><Icon name="clock" /></span><span><b>Book a demo</b><span>A live walkthrough at a time that suits you.</span></span></Link>
          </div>
          <Link className="mega-feature" href="/contact">
            <b style={{ fontSize: 16 }}>TARGET product brochure</b>
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
          <Link className="mega-link" href="/about"><span className="ico"><Icon name="users" /></span><span><b>About us</b><span>25+ years of IT solutions for apparel.</span></span></Link>
          <Link className="mega-link" href="/about#engagement"><span className="ico"><Icon name="chain" /></span><span><b>Engagement model</b><span>From project management to training.</span></span></Link>
          <Link className="mega-link" href="/careers"><span className="ico"><Icon name="spark" /></span><span><b>Careers</b><span>Build software that runs garment businesses.</span></span></Link>
          <Link className="mega-link" href="/partner-with-us"><span className="ico"><Icon name="target" /></span><span><b>Partner with us</b><span>Grow with TARGET in your market.</span></span></Link>
        </div>
        <Link className="mega-feature" href="/contact">
          <b style={{ fontSize: 16 }}>Visit us in Chennai</b>
          <span className="small">#36, 2nd Floor, Railway Border Road, Kodambakkam, Chennai 600024</span>
          <span className="link">Contact us <Arrow /></span>
        </Link>
      </div>
    </div>
  );
}
