"use client";

import { useState } from "react";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";
import { CaseCard } from "./Cards";

export function CaseFilter() {
  const options = [{ slug: "all", label: "All stories" }, ...products.filter((p) => caseStudies.some((c) => c.product === p.slug)).map((p) => ({ slug: p.slug, label: p.shortName }))];
  const [f, setF] = useState("all");
  const list = f === "all" ? caseStudies : caseStudies.filter((c) => c.product === f);
  return (
    <>
      <div className="filter-row">
        <div className="tabs" role="group" aria-label="Filter by product" style={{ marginBottom: 0 }}>
          {options.map((o) => (
            <button key={o.slug} className="tab" aria-pressed={f === o.slug} onClick={() => setF(o.slug)}>{o.label}</button>
          ))}
        </div>
        <span className="small" aria-live="polite">{list.length} {list.length === 1 ? "story" : "stories"}</span>
      </div>
      <div className="grid g3">
        {list.map((c) => <div key={c.slug} style={{ display: "grid" }}><CaseCard c={c} /></div>)}
      </div>
    </>
  );
}
