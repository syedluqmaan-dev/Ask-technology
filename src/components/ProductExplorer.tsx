"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { Arrow, Check, Icon, productIcon } from "./Icons";

const groups = [
  { key: "manufacturers", label: "For manufacturers & exporters" },
  { key: "buyingHouses", label: "For buying houses & brands" },
] as const;

/** Audience tabs, a product list and a large live screenshot of the selected product. */
export function ProductExplorer() {
  const [group, setGroup] = useState<(typeof groups)[number]["key"]>("manufacturers");
  const list = products.filter((p) => p.audience === group);
  const [active, setActive] = useState(list[0].slug);
  const p = products.find((x) => x.slug === active) ?? list[0];

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Business type">
        {groups.map((g) => (
          <button
            key={g.key}
            role="tab"
            className="tab"
            aria-selected={group === g.key}
            onClick={() => { setGroup(g.key); setActive(products.find((x) => x.audience === g.key)!.slug); }}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="explorer">
        <div className="ex-list" role="tablist" aria-label="Products" aria-orientation="vertical">
          {list.map((x) => (
            <button key={x.slug} role="tab" className="ex-item" aria-selected={x.slug === p.slug} aria-controls="ex-panel" onClick={() => setActive(x.slug)}>
              <span className={`ico${x.slug === p.slug ? " grad" : ""}`}><Icon name={productIcon[x.slug]} /></span>
              <span><b>{x.name}</b><span>{x.tagline}</span></span>
            </button>
          ))}
          <Link href="/ai-solution" className="ex-item" style={{ textDecoration: "none" }}>
            <span className="ico"><Icon name="spark" /></span>
            <span><b>AI-Powered Fashion ERP</b><span>AI built into every TARGET product.</span></span>
          </Link>
        </div>
        <div className="ex-panel" id="ex-panel" role="tabpanel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span className="badge">{p.brand} · {p.stage}</span>
            <Link className="link" href={`/products/${p.slug}`}>Explore {p.shortName} <Arrow /></Link>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={p.image} src={p.image} alt={`${p.brand} on laptop, tablet and phone`} />
          <h3 className="h3">{p.headline}</h3>
          <ul className="hl">
            {p.highlights.map((h) => <li key={h}><Check />{h}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}
