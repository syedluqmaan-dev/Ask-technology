import Link from "next/link";
import Image from "next/image";
import { Arrow, Check, Icon, Plus } from "./Icon";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./Reveal";
import { breadcrumbs, faqPage } from "@/lib/schema";
import { fmtDate, telHref } from "@/lib/format";
import type { CaseStudy, Client, Faq, Feature, Post, Settings } from "@/lib/types";

type Crumb = { name: string; path: string };

/** Breadcrumbs: visible trail plus BreadcrumbList structured data. */
export function Crumbs({ s, items }: { s: Settings; items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        {all.map((it, i) => (
          <span key={it.path}>
            {i > 0 && " / "}
            {i === all.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.path}>{it.name}</Link>}
          </span>
        ))}
      </nav>
      <JsonLd data={breadcrumbs(s, all)} />
    </>
  );
}

/** Inner page hero in the approved design. Pass `aside` for the two-column version with an image. */
export function PageHero({
  s, crumbs, eyebrow, title, lead, answer, actions, aside, children, small,
}: {
  s: Settings;
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  answer?: { q: string; a: string };
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  small?: boolean;
}) {
  const text = (
    <div style={aside ? undefined : { maxWidth: 820 }}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className={`h1${small || aside ? " sm" : ""}`}>{title}</h1>
      {lead && <p className="lead" style={{ marginTop: 22, maxWidth: 680 }}>{lead}</p>}
      {answer && (
        <div className="answer">
          <h2>{answer.q}</h2>
          <p>{answer.a}</p>
        </div>
      )}
      {actions && <div className="btn-row" style={{ marginTop: 30 }}>{actions}</div>}
      {children}
    </div>
  );
  return (
    <section className="page-hero">
      <div className="wrap">
        <Crumbs s={s} items={crumbs} />
        {aside ? <div className="split wide-r">{text}{aside}</div> : text}
      </div>
    </section>
  );
}

/** Section heading: eyebrow, h2 and optional sub line. */
export function SectionHead({ eyebrow, title, sub, center, id }: { eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode; center?: boolean; id?: string }) {
  return (
    <Reveal className={`section-head${center ? " center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h2" id={id}>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </Reveal>
  );
}

/** FAQ block in the approved two-column layout, with FAQPage structured data. */
export function FaqSection({ s, faqs, title = "Frequently asked questions", tint, withSchema = true, id = "faq" }: { s: Settings; faqs: Faq[]; title?: string; tint?: boolean; withSchema?: boolean; id?: string }) {
  if (!faqs.length) return null;
  return (
    <section className={`section${tint ? " bg-tint" : ""}`} id={id}>
      <div className="wrap split top">
        <Reveal>
          <p className="eyebrow">FAQs</p>
          <h2 className="h2">{title}</h2>
          <p className="sub" style={{ marginTop: 18 }}>
            Something else on your mind? Call <a href={telHref(s.phone)}>{s.phone}</a> or write to <a href={`mailto:${s.email}`}>{s.email}</a>.
          </p>
        </Reveal>
        <div className="faq">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}<Plus /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      {withSchema && <JsonLd data={faqPage(faqs)} />}
    </section>
  );
}

/** Feature cards with icon, title and text. */
export function FeatureGrid({ items, cols = 3 }: { items: Feature[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={`grid g${cols}`}>
      {items.map((f, i) => (
        <Reveal key={f.title} className="feat" delay={(i % cols) * 70}>
          <span className="ico"><Icon name={f.icon ?? "layers"} /></span>
          <h3>{f.title}</h3>
          <p className="body">{f.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function Ticks({ items, two }: { items: string[]; two?: boolean }) {
  return (
    <ul className={`ticklist${two ? " tick2" : ""}`}>
      {items.map((x) => <li key={x}><Check />{x}</li>)}
    </ul>
  );
}

/** Numbered process steps. */
export function StepGrid({ items }: { items: string[] }) {
  return (
    <ol className="steps grid g3" style={{ gap: 16 }}>
      {items.map((x, i) => (
        <Reveal as="li" key={x}><span className="n">Step {i + 1}</span><h3>{x}</h3></Reveal>
      ))}
    </ol>
  );
}

const isRemote = (src: string) => /^https?:\/\//.test(src) || src.startsWith("/cms/") || src.startsWith("/assets/");

/** Image that works for local files, CMS media and old-site images. */
export function Img({ src, alt, width, height, priority, sizes, className, style }: { src: string; alt: string; width: number; height: number; priority?: boolean; sizes?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes || "(max-width: 720px) 100vw, 600px"}
      className={className}
      style={style}
      unoptimized={isRemote(src) && !src.startsWith("/api/")}
    />
  );
}

/** Client logo lookup by name, for case study cards. */
export const logoLookup = (clients: Client[]) => {
  const m = new Map(clients.map((c) => [c.name.toLowerCase(), c.logo]));
  return (name: string) => m.get(name.toLowerCase());
};

export function CaseCard({ c, logo }: { c: CaseStudy; logo?: string }) {
  return (
    <Link className="card case" href={`/case-studies/${c.slug}`}>
      {/* Branded placeholder (client name on a soft gradient) sits under the photo, so a missing image never leaves an empty box. */}
      <div className="cover" data-client={c.client}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {c.image && <img src={c.image} alt="" loading="lazy" />}
      </div>
      <div className="body-pad">
        <div className="meta"><span className="badge">{c.productLabel}</span>{c.location && <span className="small">{c.location}</span>}</div>
        <h3>{c.title}</h3>
        {c.results && (
          <div className="result-row" style={{ marginTop: 6 }}>
            {c.results.slice(0, 2).map((r) => <div key={r.label}><strong>{r.value}</strong><span>{r.label}</span></div>)}
          </div>
        )}
        <div className="client">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logo && <img src={logo} alt="" loading="lazy" />}
          <span>{c.client}</span>
        </div>
      </div>
    </Link>
  );
}

export function PostCard({ p }: { p: Post }) {
  return (
    <Link className="card post" href={`/insights/${p.slug}`}>
      <div>
        <div className="meta" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="badge">{p.category}</span>
          <time className="small" dateTime={p.date}>{fmtDate(p.date)}</time>
        </div>
        <h3>{p.title}</h3>
      </div>
      <span className="link">Read article <Arrow /></span>
    </Link>
  );
}

/** Small linked card used for related products, solutions and places. */
export function LinkCard({ href, title, text, icon, cta = "Learn more" }: { href: string; title: string; text?: string; icon?: Feature["icon"]; cta?: string }) {
  return (
    <Link className="card" href={href} style={{ gap: 10 }}>
      {icon && <span className="ico"><Icon name={icon} /></span>}
      <b style={{ fontSize: 17, marginTop: icon ? 8 : 0 }}>{title}</b>
      {text && <span className="body">{text}</span>}
      <span className="link">{cta} <Arrow /></span>
    </Link>
  );
}

/** Heading text with the chosen words shown in the brand gradient. */
export function Accent({ text, accent }: { text: string; accent?: string }) {
  const i = accent ? text.indexOf(accent) : -1;
  if (!accent || i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<span className="grad-text">{accent}</span>{text.slice(i + accent.length)}</>;
}

/** Compact linked row with icon, as used for "Works well with" in the approved design. */
export function ProductRow({ href, title, icon }: { href: string; title: string; icon?: Feature["icon"] }) {
  return (
    <Link href={href} className="card" style={{ padding: "14px 16px", flexDirection: "row", alignItems: "center", gap: 14, color: "var(--ink)", fontWeight: 700 }}>
      <span className="ico" style={{ width: 40, height: 40, borderRadius: 11 }}><Icon name={icon ?? "layers"} size={20} /></span>
      <span style={{ flex: 1 }}>{title}</span><Arrow />
    </Link>
  );
}
