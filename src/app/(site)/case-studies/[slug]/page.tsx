import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { getProduct } from "@/data/products";
import { logoFor } from "@/data/clients";
import { site } from "@/data/site";
import { fmtDate } from "@/data/blog";
import { DemoBand } from "@/components/Footer";
import { CaseCard } from "@/components/Cards";
import { Arrow, Check, Icon, productIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: `${c.client} | Customer Story`,
    description: `${c.title}. ${c.about}`.slice(0, 158),
    alternates: { canonical: `/case-studies/${c.slug}` },
    openGraph: { type: "article", title: c.title, images: [c.image] },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const p = getProduct(c.product);
  const logo = logoFor(c.client);
  const more = caseStudies.filter((x) => x.slug !== c.slug && x.product === c.product).slice(0, 3);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    datePublished: c.date,
    image: `${site.url}${c.image}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    about: { "@type": "Organization", name: c.client },
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/case-studies">Customer stories</Link> / <span aria-current="page">{c.client}</span></nav>
          <div className="split wide-l">
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
                <span className="badge">{c.productLabel}</span>
                <time className="small" dateTime={c.date}>{fmtDate(c.date)}</time>
                {c.location && <span className="small">· {c.location}</span>}
              </div>
              <h1 className="h1" style={{ fontSize: "clamp(32px,3.8vw,50px)" }}>{c.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {logo && <img src={logo} alt={`${c.client} logo`} style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 14, border: "1px solid #E2E9F3", background: "#fff", padding: 6 }} />}
                <b style={{ fontSize: 17 }}>{c.client}</b>
              </div>
            </div>
            <div className="hero-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" style={{ objectFit: "cover" }} />
            </div>
          </div>
          {c.results && (
            <div className={`stats${c.results.length === 3 ? " r3" : ""}`} style={{ marginTop: 48 }}>
              {c.results.map((r) => <div key={r.label}><strong className="grad-text">{r.value}</strong><span>{r.label}</span></div>)}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 72 }}>
        <div className="wrap split top wide-l">
          <article className="article">
            <h2 style={{ marginTop: 0 }}>About {c.client}</h2>
            <p>{c.about}</p>
            <h2>The challenge</h2>
            <ul className="ticklist" style={{ fontSize: 16.5 }}>
              {c.challenges.map((x) => <li key={x}><span style={{ width: 8, height: 8, borderRadius: 4, background: "#B4540A", marginTop: 9, flex: "none" }} />{x}</li>)}
            </ul>
            <h2>The impact with {p?.brand ?? "TARGET"}</h2>
            <ul className="ticklist" style={{ fontSize: 16.5 }}>
              {c.impact.map((x) => <li key={x}><Check />{x}</li>)}
            </ul>
          </article>
          <aside style={{ position: "sticky", top: 110, display: "flex", flexDirection: "column", gap: 16 }}>
            {p && (
              <Link href={`/products/${p.slug}`} className="card" style={{ gap: 12 }}>
                <span className="ico"><Icon name={productIcon[p.slug]} /></span>
                <b style={{ fontSize: 17 }}>{p.name}</b>
                <span className="body">{p.tagline}</span>
                <span className="link">Explore {p.shortName} <Arrow /></span>
              </Link>
            )}
            <div className="card" style={{ background: "linear-gradient(140deg,#4560D0,#1C97DD)", color: "#fff", border: 0, gap: 12 }}>
              <b style={{ fontSize: 18 }}>Get results like {c.client}</b>
              <span style={{ color: "rgba(255,255,255,.9)", fontSize: 15 }}>A live demo on a workflow like yours.</span>
              <Link className="btn btn-white btn-sm" href={`/book-a-demo?product=${c.product}`} style={{ alignSelf: "flex-start" }}>Book a demo</Link>
            </div>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <div className="head-row"><h2 className="h2">More stories</h2><Link className="btn btn-ghost" href="/case-studies">All stories <Arrow /></Link></div>
            <div className="grid g3">{more.map((x) => <div key={x.slug} style={{ display: "grid" }}><CaseCard c={x} /></div>)}</div>
          </div>
        </section>
      )}

      <div style={{ height: 112 }} />
      <DemoBand />
      <JsonLd data={ld} />
    </>
  );
}
