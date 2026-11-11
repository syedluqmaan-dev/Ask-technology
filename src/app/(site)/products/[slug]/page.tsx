import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct } from "@/data/products";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import { LeadForm } from "@/components/LeadForm";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CaseCard } from "@/components/Cards";
import { Arrow, Check, Icon, Plus, productIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} | ${p.brand}`,
    description: p.intro.slice(0, 158),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | ASK Technology`, description: p.tagline, url: `${site.url}/products/${p.slug}`, images: [p.image] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const related = p.related.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  const stories = caseStudies.filter((c) => c.product === p.slug).slice(0, 3);
  const ld: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${p.brand}: ${p.name}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description: p.intro,
      image: `${site.url}${p.image}`,
      featureList: p.features.map((f) => f.title).join(", "),
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      url: `${site.url}/products/${p.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
        { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}/products/${p.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span aria-current="page">{p.name}</span>
          </nav>
          <div className="split wide-r">
            <div>
              <p className="eyebrow">{p.brand} · {p.audienceLabel}</p>
              <h1 className="h1" style={{ fontSize: "clamp(36px,4.4vw,56px)" }}>{p.name}</h1>
              <p className="lead" style={{ marginTop: 20 }}>{p.headline}. {p.tagline}</p>
              <div className="answer">
                <h2>What is {p.brand}?</h2>
                <p className="body">{p.intro}</p>
              </div>
              <div className="btn-row" style={{ marginTop: 30 }}>
                <Link className="btn btn-primary" href={`/book-a-demo?product=${p.slug}`}>Book a demo <Arrow /></Link>
                <Link className="btn btn-ghost" href="#features">See features</Link>
              </div>
            </div>
            <div className="hero-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`${p.brand} on laptop, tablet and phone`} fetchPriority="high" />
            </div>
          </div>
        </div>
      </section>

      <section className="section sm" style={{ borderBottom: "1px solid #E2E9F3" }}>
        <div className="wrap grid g4">
          {p.highlights.map((h) => (
            <div key={h} style={{ display: "flex", gap: 12, alignItems: "center", fontWeight: 700 }}>
              <span className="ico" style={{ width: 40, height: 40, borderRadius: 12 }}><Check color="#2C3E9E" /></span>{h}
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="features">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Functional areas</p>
            <h2 className="h2">Everything {p.shortName} covers</h2>
          </Reveal>
          <div className="grid g3">
            {p.features.map((f, i) => (
              <Reveal key={f.title} className="feat" delay={(i % 3) * 70}>
                <span className="ico"><Icon name={f.icon} /></span>
                <h3>{f.title}</h3>
                <p className="body">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {p.roles && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">For every role</p><h2 className="h2">One app for everyone on the floor</h2></Reveal>
            <div className="grid g4">
              {p.roles.map((r) => (
                <Reveal key={r.title} className="card"><h3 className="h3" style={{ fontSize: 18 }}>{r.title}</h3><ul className="ticklist" style={{ marginTop: 14 }}>{r.points.map((x) => <li key={x}><Check />{x}</li>)}</ul></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.benefits && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">Benefits</p><h2 className="h2">What your team gains</h2></Reveal>
            <div className="grid g3">
              {p.benefits.map((b) => (
                <Reveal key={b.title} className="card"><h3 className="h3" style={{ fontSize: 18 }}>{b.title}</h3><p className="body" style={{ marginTop: 8 }}>{b.text}</p></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.steps && (
        <section className="section">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">How it works</p><h2 className="h2">How an order moves through {p.shortName}</h2><p className="sub">Every step records planned and actual dates, so delays show up early.</p></Reveal>
            <ol className="steps grid g3" style={{ gap: 16 }}>
              {p.steps.map((s, i) => <Reveal as="li" key={s}><span className="n">Step {i + 1}</span><h3>{s}</h3></Reveal>)}
            </ol>
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="head-row"><div><p className="eyebrow">Customer stories</p><h2 className="h2">Running on {p.shortName}</h2></div><Link className="btn btn-ghost" href="/case-studies">All stories <Arrow /></Link></Reveal>
            <div className="grid g3">{stories.map((c) => <Reveal key={c.slug} style={{ display: "grid" }}><CaseCard c={c} /></Reveal>)}</div>
          </div>
        </section>
      )}

      <section className="section" id="faq">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">FAQs</p>
            <h2 className="h2">Frequently asked questions</h2>
            <p className="sub" style={{ marginTop: 18 }}>Something else on your mind? Call <a href={site.phoneHref}>{site.phone}</a> or write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </Reveal>
          <div className="faq">
            {p.faqs.map((f, i) => (
              <details key={f.q} open={i === 0}><summary>{f.q}<Plus /></summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-tint" id="demo">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Request a demo</p>
            <h2 className="h2">See {p.shortName} on your own workflow</h2>
            <p className="sub" style={{ margin: "18px 0 32px" }}>Tell us about your business and we will call you back to set up a demo.</p>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Works well with</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="card" style={{ padding: "14px 16px", flexDirection: "row", alignItems: "center", gap: 14, color: "#17213F", fontWeight: 700 }}>
                  <span className="ico" style={{ width: 40, height: 40, borderRadius: 11 }}><Icon name={productIcon[r.slug]} size={20} /></span>
                  <span style={{ flex: 1 }}>{r.name}</span><Arrow />
                </Link>
              ))}
            </div>
          </Reveal>
          <LeadForm source={`product:${p.slug}`} product={p.name} showProduct />
        </div>
      </section>

      <div style={{ height: 112 }} />
      <DemoBand />
      <JsonLd data={ld} />
    </>
  );
}
