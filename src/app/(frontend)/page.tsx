import Link from "next/link";
import { ClientLogos } from "@/components/ClientLogos";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HeroVideo } from "@/components/HeroVideo";
import { Accent, CaseCard, FaqSection, PostCard, logoLookup } from "@/components/ui";
import { Arrow, Check, Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Testimonials } from "@/components/Testimonials";
import { InlineCta } from "@/components/InlineCta";
import { Brochure } from "@/components/Brochure";
import { getAbout, getCaseStudies, getClients, getHome, getPosts, getProducts, getSettings, getTestimonials } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { itemList } from "@/lib/schema";

export const revalidate = 3600;

export async function generateMetadata() {
  const h = await getHome();
  return buildMetadata({
    title: h.seo.title,
    description: h.seo.description,
    path: "/",
    image: h.seoImage,
    noindex: h.noindex,
    keywords: ["garment ERP software", "apparel ERP", "textile ERP", "buying house software", "garment inspection software", "operation bulletin software", "apparel PLM"],
  });
}

export default async function HomePage() {
  const [h, s, products, cases, posts, clients, testimonials, about] = await Promise.all([
    getHome(), getSettings(), getProducts(), getCaseStudies(), getPosts(), getClients(), getTestimonials(), getAbout(),
  ]);
  const productBy = (slug: string) => products.find((p) => p.slug === slug);
  const logo = logoLookup(clients);
  const featured = cases.filter((c) => c.featured).slice(0, 3);
  const stories = featured.length >= 3 ? featured : cases.slice(0, 3);
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      {/* 1. Attention: H1 with the main keyword, one promise, two actions. */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Link className="pill" href={h.heroPill.href}><span>New</span>{h.heroPill.label} <Arrow /></Link>
            <h1 className={`h1${h.heroTitle.length > 48 ? " long" : ""}`}><Accent text={h.heroTitle} accent={h.heroAccent} /></h1>
            <p className="lead">{h.heroLead}</p>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <Link className="btn btn-primary" href={h.heroPrimary.href}>{h.heroPrimary.label} <Arrow /></Link>
              <Link className="btn btn-ghost" href={h.heroSecondary.href}>{h.heroSecondary.label}</Link>
            </div>
            {h.heroPoints.length > 0 && (
              <ul className="trio">
                {h.heroPoints.map((t) => <li key={t}><Check />{t}</li>)}
              </ul>
            )}
          </div>
          <div className="hero-visual">
            <div className="hero-shot">
              <HeroVideo />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust at a glance: who uses it, and the numbers. */}
      <ClientLogos clients={clients} title={h.clientsTitle || undefined} />

      {s.stats.length > 0 && (
        <section className="section sm">
          <div className="wrap">
            <Reveal className={`stats${s.stats.length === 3 ? " r3" : ""}`}>
              {s.stats.map((x) => <div key={x.label}><strong className="grad-text">{x.value}</strong><span>{x.label}</span></div>)}
            </Reveal>
          </div>
        </section>
      )}

      {/* Story, chapter 01: the problem. One dark chapter so the bright solution that follows lands with contrast. */}
      {h.problemTitle && h.problemStages && h.problemStages.length > 0 && (
        <section className="section story-problem" id="the-problem">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow chapter on-dark"><span>01</span>The problem</p>
              <h2 className="h2">{h.problemTitle}</h2>
              {h.problemLead && <p className="sub">{h.problemLead}</p>}
            </Reveal>
            <ol className="breaks">
              {h.problemStages.map((x, i) => (
                <Reveal as="li" key={x.stage} delay={i * 90}>
                  <span className="break-node"><Icon name={x.icon} size={20} /></span>
                  <span className="break-stage">{x.stage}</span>
                  <p>{x.pain}</p>
                </Reveal>
              ))}
            </ol>
            {h.problemBridge && (
              <Reveal className="bridge" delay={200}>
                <p>{h.problemBridge}</p>
                <a href="#products">See how <Arrow /></a>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 3. Solution: the Target Suite, opened by a 40–60 word direct answer that search and AI assistants can quote. */}
      <section className="section" id="products" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow chapter"><span>02</span>{h.routeEyebrow || "The solution"}</p>
            <h2 className="h2">{h.routeTitle}</h2>
            {h.routeLead && <p className="sub">{h.routeLead}</p>}
          </Reveal>
          {/* Target Suite bento: the first product is the flagship (large gradient card with its screen), the rest sit in a grid beside it. */}
          <ol className="suite">
            {h.route.map((j, i) => {
              const p = productBy(j.product);
              const href = p ? `/products/${p.slug}` : "/products";
              const flagship = i === 0;
              return (
                <Reveal as="li" key={j.stage} delay={i * 70} className={`suite-card${flagship ? " flagship" : ""}`}>
                  <Link href={href} aria-label={`${j.stage}: ${j.headline || p?.tagline || ""}`}>
                    <span className="suite-top">
                      <span className="suite-ico"><Icon name={j.icon} size={flagship ? 24 : 20} /></span>
                      {j.tag && <span className="suite-tag">{j.tag}</span>}
                      <span className="suite-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="suite-name">{j.stage}</span>
                    <span className="suite-head">{j.headline || p?.tagline}</span>
                    <span className="suite-text">{j.text}</span>
                    {flagship && p?.image && (
                      <span className="suite-shot">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt="" loading="lazy" />
                      </span>
                    )}
                    <span className="suite-go">Explore {j.stage} <Arrow /></span>
                  </Link>
                </Reveal>
              );
            })}
          </ol>
          {h.across.length > 0 && (
            <div className="suite-strip">
              <span className="suite-strip-label">Across every stage</span>
              {h.across.map((x) => (
                <Link key={x.title} className="suite-strip-item" href={x.href}>
                  <span className="ico"><Icon name={x.icon} size={20} /></span>
                  <span><b>{x.title}</b><span>{x.text}</span></span>
                  <Arrow />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Differentiator: AI inside the ERP. */}
      <section className="section bg-tint" id="ai">
        <div className="wrap split ai-split">
          <Reveal>
            <p className="eyebrow chapter"><span>03</span>The intelligence</p>
            <h2 className="h2">{h.aiTitle}</h2>
            <p className="sub" style={{ margin: "18px 0 30px" }}>{h.aiLead}</p>
            {/* On phones these become stacking cards: each one sticks and the next slides over it. */}
            <div className="grid g2 ai-points" style={{ gap: "24px 28px" }}>
              {h.aiPoints.map((f, i) => (
                <div key={f.title} className="ai-pt" style={{ display: "flex", gap: 14, "--i": i } as React.CSSProperties}>
                  <span className="ico" style={{ width: 42, height: 42, borderRadius: 12 }}><Icon name={f.icon ?? "spark"} size={20} /></span>
                  <div><h3 style={{ fontSize: 16.5, fontWeight: 700, marginBottom: 4 }}>{f.title}</h3><p className="body" style={{ fontSize: 15 }}>{f.text}</p></div>
                </div>
              ))}
            </div>
            <Link className="btn btn-ghost" style={{ marginTop: 36 }} href="/ai-solution">Explore AI Solution <Arrow /></Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="card" style={{ padding: 26, boxShadow: "var(--shadow-lg)", borderRadius: 24 }} role="img" aria-label="Asking TARGET 360 AI which orders are at risk">
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid #E2E9F3" }}>
                <span className="ico grad" style={{ width: 34, height: 34, borderRadius: 10 }}><Icon name="spark" size={18} /></span>
                <b style={{ fontFamily: "var(--font-head)" }}>Ask TARGET 360 AI</b>
              </div>
              <p style={{ alignSelf: "flex-end", maxWidth: "82%", margin: "18px 0 14px", background: "#F3F8FE", borderRadius: "14px 14px 4px 14px", padding: "12px 16px", fontSize: 14.5 }}>
                Which orders are at risk of missing their ship date this month?
              </p>
              <div style={{ border: "1px solid #E2E9F3", borderRadius: "14px 14px 14px 4px", padding: 16, fontSize: 14.5 }}>
                <b>3 orders need attention</b>
                <p className="body" style={{ margin: "6px 0 12px", fontSize: 14.5 }}>Sewing output is behind plan on these styles. Moving operators to the next free line recovers time.</p>
                {[["KW-2055 Tee", "2 days behind", "#FFF4E8", "#B4540A"], ["WV-1190 Shirt", "1 day behind", "#FFF4E8", "#B4540A"], ["KW-2061 Polo", "Watch", "#F3F8FE", "#2C3E9E"]].map(([a, b, bg, c]) => (
                  <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", background: bg, borderRadius: 8, fontSize: 13.5, marginTop: 8 }}><b>{a}</b><b style={{ color: c }}>{b}</b></div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14, padding: "8px 8px 8px 16px", border: "1px solid #C9D3E3", borderRadius: 12, alignItems: "center", fontSize: 14, color: "#5B6680" }}>
                <span style={{ flex: 1 }}>Convert this techpack into a BOM…</span>
                <span className="ico grad" style={{ width: 36, height: 36, borderRadius: 9 }}><Arrow color="#fff" /></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Why ASK: editorial layout. Intro and the real rollout steps on the left, six numbered reasons on the right. */}
      <section className="section" id="why-ask">
        <div className="wrap why">
          <div className="why-aside">
            <Reveal>
              <p className="eyebrow chapter"><span>04</span>Why ASK Technology</p>
              <h2 className="h2">{h.whyTitle}</h2>
              {h.whyLead && <p className="sub why-lead">{h.whyLead}</p>}
            </Reveal>
            {about.process.length > 0 && (
              <Reveal className="rollout" delay={100}>
                <p className="rollout-label">How a rollout works</p>
                <ol>
                  {about.process.map((step, i) => (
                    <li key={step}><span className="rollout-n">{i + 1}</span><span>{step}</span></li>
                  ))}
                </ol>
                <Link className="link rollout-link" href="/about#engagement">How we work with you <Arrow /></Link>
              </Reveal>
            )}
          </div>
          <ol className="why-list">
            {h.why.map((w, i) => (
              <Reveal as="li" key={w.title} delay={(i % 2) * 60} style={{ "--i": i } as React.CSSProperties}>
                <span className="why-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Decision point: talk to a specialist. */}
      <InlineCta />

      {/* 7. Proof: customer stories, founder's word, testimonials (hidden until real quotes exist). */}
      <section className="section bg-tint" id="case-studies">
        <div className="wrap">
          <Reveal className="head-row">
            <div>
              <p className="eyebrow chapter"><span>05</span>The proof</p>
              <h2 className="h2">{h.storiesTitle}</h2>
            </div>
            <Link className="btn btn-ghost" href="/case-studies">All {cases.length} stories <Arrow /></Link>
          </Reveal>
          <div className="grid g3">
            {stories.map((c, i) => <Reveal key={c.slug} delay={i * 80} style={{ display: "grid" }}><CaseCard c={c} logo={logo(c.client)} /></Reveal>)}
          </div>
          {h.ceoQuote && (
            <Reveal as="figure" className="quote" style={{ marginTop: 32 }}>
              <blockquote>{h.ceoQuote}</blockquote>
              <figcaption><b>{h.ceoName}</b> · {h.ceoRole}</figcaption>
            </Reveal>
          )}
        </div>
      </section>

      <Testimonials items={testimonials.filter((t) => t.home)} />

      {/* 8. Learn more: guides for people still researching, then the brochure (hidden until a PDF is set). */}
      <section className="section" id="insights">
        <div className="wrap">
          <Reveal className="head-row">
            <div>
              <p className="eyebrow">Insights</p>
              <h2 className="h2">{h.insightsTitle}</h2>
            </div>
            <Link className="btn btn-ghost" href="/insights">All articles <Arrow /></Link>
          </Reveal>
          <div className="grid g3">
            {latest.map((p, i) => <Reveal key={p.slug} delay={i * 80} style={{ display: "grid" }}><PostCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {s.brochure && <Brochure {...s.brochure} />}

      {/* 9. Objections: FAQ with FAQPage structured data, right before the final call to action. */}
      <FaqSection s={s} faqs={h.faqs} title={h.faqTitle} tint />

      {/* 10. Action. */}
      <DemoBand title={h.ctaTitle} text={h.ctaText} />
      <JsonLd data={itemList(s, "TARGET 360 products", products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })))} />
    </>
  );
}
