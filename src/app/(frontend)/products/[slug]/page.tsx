import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CaseCard, Crumbs, FaqSection, logoLookup } from "@/components/ui";
import { Arrow, Check, Icon, productIcon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Testimonials } from "@/components/Testimonials";
import { InlineCta } from "@/components/InlineCta";
import { Brochure } from "@/components/Brochure";
import { getCaseStudies, getClients, getIndustries, getProduct, getProducts, getSettings, getSolutions, getTestimonials } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { softwareApp } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.seo.title || `${p.name} | ASK Technology`,
    description: p.seo.description || p.answer,
    path: `/products/${p.slug}`,
    image: p.seo.image || p.image,
    noindex: p.seo.noindex,
    keywords: p.keywords,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [s, p, all, cases, solutions, clients, industries, testimonials] = await Promise.all([
    getSettings(), getProduct(slug), getProducts(), getCaseStudies(), getSolutions(), getClients(), getIndustries(), getTestimonials(),
  ]);
  if (!p) notFound();
  const heading = p.heroTitle || p.name;

  const related = p.related.map((r) => all.find((x) => x.slug === r)).filter(Boolean) as typeof all;
  const stories = cases.filter((c) => c.product === p.slug).slice(0, 3);
  const uses = solutions.filter((x) => x.products.includes(p.slug)).slice(0, 6);
  const fits = industries.filter((x) => x.products.includes(p.slug)).slice(0, 4);
  // Quotes about this product first, then general ones.
  const quotes = [...testimonials.filter((t) => t.products.includes(p.slug)), ...testimonials.filter((t) => !t.products.length)];
  const logo = logoLookup(clients);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Crumbs s={s} items={[{ name: "Products", path: "/products" }, { name: p.name, path: `/products/${p.slug}` }]} />
          <div className="split wide-r">
            <div>
              {p.tags && p.tags.length > 0 && (
                <ul className="tag-row" aria-label="Key capabilities">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              )}
              <p className="eyebrow">{p.brand} · {p.audienceLabel}</p>
              <h1 className="h1" style={{ fontSize: heading.length > 40 ? "clamp(32px,3.4vw,46px)" : "clamp(36px,4.4vw,56px)" }}>{heading}</h1>
              <p className="lead" style={{ marginTop: 20 }}>{p.heroText || `${p.headline}. ${p.tagline}`}</p>
              <div className="answer">
                <h2>What is {p.brand}?</h2>
                <p>{p.answer || p.intro}</p>
              </div>
              <div className="btn-row" style={{ marginTop: 30 }}>
                <Link className="btn btn-primary" href={`/book-a-demo?product=${p.slug}`}>Book a demo <Arrow /></Link>
                {p.heroLink
                  ? <Link className="btn btn-ghost" href={p.heroLink.href}>{p.heroLink.label}</Link>
                  : p.reports?.items.length
                  ? <Link className="btn btn-ghost" href="#reports">See the reports</Link>
                  : p.problems?.items.length
                    ? <Link className="btn btn-ghost" href="#problems">See what it fixes</Link>
                    : <Link className="btn btn-ghost" href="#features">See features</Link>}
              </div>
            </div>
            {p.heroFlow && p.heroFlow.length > 0 ? (
              <ol className="hero-flow" aria-label={`How ${p.brand} connects everyone`}>
                {p.heroFlow.map((f) => (
                  <li key={f.title} className={f.highlight ? "on" : undefined}>
                    <b>{f.title}</b>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="hero-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.image.startsWith("/images/products/") ? `${p.brand} dashboard` : `${p.brand} on laptop, tablet and phone`} fetchPriority="high" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section sm" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap grid g4">
          {p.highlights.map((h) => (
            <div key={h} style={{ display: "flex", gap: 12, alignItems: "center", fontWeight: 700 }}>
              <span className="ico" style={{ width: 40, height: 40, borderRadius: 12 }}><Check color="#2C3E9E" /></span>{h}
            </div>
          ))}
        </div>
      </section>

      {p.problems && p.problems.items.length > 0 && (
        <section className="section" id="problems">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">The problem</p>
              <h2 className="h2">{p.problems.title}</h2>
              {p.problems.lead && <p className="sub">{p.problems.lead}</p>}
            </Reveal>
            <div className="grid g3 problems">
              {p.problems.items.map((x, i) => (
                <Reveal key={x.title} className={`problem${x.without || x.with ? " vs" : ""}`} delay={(i % 3) * 70}>
                  <h3>{x.title}</h3>
                  {x.text && <p className="body">{x.text}</p>}
                  {x.without && <><p className="vs-label">Without a system</p><p className="body vs-without">{x.without}</p></>}
                  {x.with && (x.withTitle
                    ? <p className="body fix"><b>{x.withTitle}</b> {x.with}</p>
                    : <><p className="vs-label">With TARGET 360</p><p className="body vs-with">{x.with}</p></>)}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.benefitsTitle && p.benefits && p.benefits.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">Why it fits</p><h2 className="h2">{p.benefitsTitle}</h2>{p.benefitsLead && <p className="sub">{p.benefitsLead}</p>}</Reveal>
            <div className={`grid g${p.benefits.length === 4 ? 4 : 3}`}>
              {p.benefits.map((b, i) => (
                <Reveal key={b.title} className="card" delay={(i % 4) * 70}><h3 className="h3" style={{ fontSize: 18 }}>{b.title}</h3><p className="body" style={{ marginTop: 8 }}>{b.text}</p></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {p.modes && p.modes.items.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">How it works on site</p>
              <h2 className="h2">{p.modes.title}</h2>
              {p.modes.lead && <p className="sub">{p.modes.lead}</p>}
            </Reveal>
            <Reveal className={`modes g${Math.min(p.modes.items.length, 3)}`}>
              {p.modes.items.map((m) => (
                <div key={m.title} className="mode">
                  <h3 className="h3">{m.title}</h3>
                  <ul className="ticklist">{m.points.map((x) => <li key={x}><Check />{x}</li>)}</ul>
                </div>
              ))}
            </Reveal>
            {p.modes.flow && p.modes.flow.length > 0 && (
              <ol className="flow" aria-label="Flow">
                {p.modes.flow.map((x) => <li key={x}>{x}</li>)}
              </ol>
            )}
          </div>
        </section>
      )}

      {p.quickSteps && p.quickSteps.items.length > 0 && (
        <section className="section bg-tint" id="how">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">How it works</p><h2 className="h2">{p.quickSteps.title}</h2>{p.quickSteps.lead && <p className="sub">{p.quickSteps.lead}</p>}</Reveal>
            <ol className={`quick-steps grid g${Math.min(p.quickSteps.items.length, 4)}`}>
              {p.quickSteps.items.map((x, i) => (
                <Reveal as="li" key={x.title} delay={i * 80}>
                  <span className="qs-n grad-text">{i + 1}</span>
                  <h3 className="h3">{x.title}</h3>
                  <p className="body">{x.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {p.stepsTitle && ((p.steps && p.steps.length > 0) || p.stepsImage) && (
        <section className="section" id={p.quickSteps ? "workflow" : "how"}>
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">Workflow</p><h2 className="h2">{p.stepsTitle}</h2>{p.stepsLead && <p className="sub">{p.stepsLead}</p>}</Reveal>
            {p.stepsImage && (
              <Reveal className="workflow-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.stepsImage} alt={p.stepsImageAlt || p.stepsTitle} loading="lazy" />
              </Reveal>
            )}
            {p.steps && p.steps.length > 0 && (
              <ol className={`steps grid g${p.steps.length === 4 ? 4 : 3}`} style={{ gap: 16 }}>
                {p.steps.map((line, i) => {
                  const [title, text] = line.split(" | ");
                  return (
                    <Reveal as="li" key={line}>
                      {/* With a diagram above, these are stages of the diagram, so they are not numbered again. */}
                      {!p.stepsImage && <span className="n">Step {i + 1}</span>}
                      <h3 style={p.stepsImage ? { marginTop: 0 } : undefined}>{title}</h3>
                      {text && <p className="body" style={{ fontSize: 15 }}>{text}</p>}
                    </Reveal>
                  );
                })}
              </ol>
            )}
          </div>
        </section>
      )}

      {p.reports && p.reports.items.length > 0 && (
        <section className="section bg-tint" id="reports">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">Reports</p><h2 className="h2">{p.reports.title}</h2>{p.reports.lead && <p className="sub">{p.reports.lead}</p>}</Reveal>
            <div className="reports">
              {p.reports.items.map((r, i) => (
                <div key={r.title} className={`split report${i % 2 ? " flip" : ""}`}>
                  <Reveal>
                    <h3 className="h3 report-title">{r.title}</h3>
                    <p className="sub" style={{ marginTop: 10 }}>{r.text}</p>
                    {r.stats.length > 0 && (
                      <dl className="mini-stats">
                        {r.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd className="grad-text">{s.value}</dd></div>)}
                      </dl>
                    )}
                    {r.points.length > 0 && <ul className="ticklist">{r.points.map((x) => <li key={x}><Check />{x}</li>)}</ul>}
                  </Reveal>
                  {r.image && (
                    <Reveal delay={100} className="browser">
                      <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{p.shortName} · {r.title}</span></div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.imageAlt || r.title} loading="lazy" />
                    </Reveal>
                  )}
                </div>
              ))}
            </div>
            {p.reports.note && <p className="report-note">{p.reports.note}</p>}
          </div>
        </section>
      )}

      <section className="section" id="features">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Functional areas</p>
            <h2 className="h2">{p.featuresTitle || `Everything ${p.shortName} covers`}</h2>
            {p.featuresTitle
              ? p.featuresLead && <p className="sub">{p.featuresLead}</p>
              : p.intro !== p.answer && <p className="sub">{p.intro}</p>}
          </Reveal>
          <div className="grid g3">
            {p.features.map((f, i) => (
              <Reveal key={f.title} className="feat" delay={(i % 3) * 70}>
                <span className="ico"><Icon name={f.icon ?? "layers"} /></span>
                <h3>{f.title}</h3>
                <p className="body">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {p.roles && p.roles.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">For every role</p><h2 className="h2">{p.rolesTitle || "One app for everyone on the floor"}</h2></Reveal>
            <div className="grid g4">
              {p.roles.map((r) => (
                <Reveal key={r.title} className="card">
                  <h3 className="h3" style={{ fontSize: 18 }}>{r.title}</h3>
                  {/* A single point reads as a sentence, not a list. */}
                  {r.points.length === 1
                    ? <p className="body" style={{ marginTop: 8 }}>{r.points[0]}</p>
                    : <ul className="ticklist" style={{ marginTop: 14 }}>{r.points.map((x) => <li key={x}><Check />{x}</li>)}</ul>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {!p.benefitsTitle && p.benefits && p.benefits.length > 0 && (
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

      {!p.stepsTitle && p.steps && p.steps.length > 0 && (
        <section className="section">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">How it works</p><h2 className="h2">How an order moves through {p.shortName}</h2><p className="sub">Every step records planned and actual dates, so delays show up early.</p></Reveal>
            <ol className="steps grid g3" style={{ gap: 16 }}>
              {p.steps.map((x, i) => <Reveal as="li" key={x}><span className="n">Step {i + 1}</span><h3>{x}</h3></Reveal>)}
            </ol>
          </div>
        </section>
      )}

      {p.compare && p.compare.rows.length > 0 && (
        <section className="section" id="compare">
          <div className="wrap">
            <Reveal className="section-head"><p className="eyebrow">Before and after</p><h2 className="h2">{p.compare.title}</h2>{p.compare.lead && <p className="sub">{p.compare.lead}</p>}</Reveal>
            <Reveal className="tbl compare">
              <table>
                <thead>
                  <tr><th scope="col"><span className="sr-only">Task</span></th><th scope="col">{p.compare.them}</th><th scope="col" className="us">{p.shortName}</th></tr>
                </thead>
                <tbody>
                  {p.compare.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td className="them"><span className="x" aria-hidden="true">✕</span>{r.them}</td>
                      <td className="us"><Check color="#1f7a4d" />{r.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>
      )}

      <InlineCta text={`Want to see ${p.shortName} with your own data?`} href={`/book-a-demo?product=${p.slug}`} />

      {uses.length > 0 && (
        <section className="section bg-tint">
          <div className="wrap">
            <Reveal className="head-row"><div><p className="eyebrow">Solutions</p><h2 className="h2">What teams use {p.shortName} for</h2></div><Link className="btn btn-ghost" href="/solutions">All solutions <Arrow /></Link></Reveal>
            <div className="grid g3">
              {uses.map((u) => (
                <Link key={u.slug} href={`/solutions/${u.slug}`} className="card" style={{ gap: 10 }}>
                  <b style={{ fontSize: 17 }}>{u.name}</b>
                  <span className="body">{u.answer.split(". ")[0]}.</span>
                  <span className="link">Learn more <Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className={`section${uses.length ? "" : " bg-tint"}`}>
          <div className="wrap">
            <Reveal className="head-row"><div><p className="eyebrow">Customer stories</p><h2 className="h2">Running on {p.shortName}</h2></div><Link className="btn btn-ghost" href="/case-studies">All stories <Arrow /></Link></Reveal>
            <div className="grid g3">{stories.map((c) => <Reveal key={c.slug} style={{ display: "grid" }}><CaseCard c={c} logo={logo(c.client)} /></Reveal>)}</div>
          </div>
        </section>
      )}

      {fits.length > 0 && (
        <section className={`section${stories.length ? " bg-tint" : ""}`}>
          <div className="wrap">
            <Reveal className="head-row"><div><p className="eyebrow">Industries</p><h2 className="h2">Built for your part of the industry</h2></div><Link className="btn btn-ghost" href="/industries">All industries <Arrow /></Link></Reveal>
            <div className={`grid g${fits.length >= 4 ? 4 : 3}`}>
              {fits.map((x) => (
                <Link key={x.slug} href={`/industries/${x.slug}`} className="card industry-card">
                  <b>{x.name}</b>
                  <span className="body">{x.answer.split(". ")[0]}.</span>
                  <span className="link">Learn more <Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Testimonials items={quotes} title={`What ${p.shortName} customers say`} />
      {s.brochure && <Brochure {...s.brochure} />}

      <FaqSection s={s} faqs={p.faqs} />

      <section className="section bg-tint" id="demo">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Request a demo</p>
            <h2 className="h2">See {p.shortName} on your own workflow</h2>
            <p className="sub" style={{ margin: "18px 0 32px" }}>Tell us about your business and we will call you back to set up a demo.</p>
            {related.length > 0 && <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Works well with</h3>}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="card" style={{ padding: "14px 16px", flexDirection: "row", alignItems: "center", gap: 14, color: "var(--ink)", fontWeight: 700 }}>
                  <span className="ico" style={{ width: 40, height: 40, borderRadius: 11 }}><Icon name={productIcon[r.slug] ?? "layers"} size={20} /></span>
                  <span style={{ flex: 1 }}>{r.name}</span><Arrow />
                </Link>
              ))}
            </div>
          </Reveal>
          <LeadForm type="product" products={all.map((x) => ({ slug: x.slug, name: x.name }))} defaultProduct={p.name} phone={s.phone} email={s.email} />
        </div>
      </section>

      <div style={{ height: 112 }} />
      <DemoBand title={p.cta?.title} text={p.cta?.text} />
      <JsonLd data={softwareApp(s, p)} />
    </>
  );
}
