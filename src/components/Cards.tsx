import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudies";
import { fmtDate, postUrl, type Post } from "@/data/blog";
import { logoFor } from "@/data/clients";
import { Arrow } from "./Icons";

export function CaseCard({ c }: { c: CaseStudy }) {
  const logo = logoFor(c.client);
  return (
    <Link className="card case" href={`/case-studies/${c.slug}`}>
      <div className="cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.image} alt="" loading="lazy" />
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
    <a className="card post" href={postUrl(p)}>
      <div>
        <div className="meta" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="badge">{p.category}</span>
          <time className="small" dateTime={p.date}>{fmtDate(p.date)}</time>
        </div>
        <h3>{p.title}</h3>
      </div>
      <span className="link">Read article <Arrow /></span>
    </a>
  );
}
