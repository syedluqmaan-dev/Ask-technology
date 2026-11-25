"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/types";
import { CaseCard } from "./ui";

/** Customer stories with product filter tabs. */
export function CaseFilter({ items, options, logos }: { items: CaseStudy[]; options: { slug: string; label: string }[]; logos: Record<string, string | undefined> }) {
  const all = [{ slug: "all", label: "All stories" }, ...options.filter((o) => items.some((c) => c.product === o.slug))];
  const [f, setF] = useState("all");
  const list = f === "all" ? items : items.filter((c) => c.product === f);
  return (
    <>
      <div className="filter-row">
        <div className="tabs" role="group" aria-label="Filter by product" style={{ marginBottom: 0 }}>
          {all.map((o) => (
            <button key={o.slug} className="tab" aria-pressed={f === o.slug} onClick={() => setF(o.slug)}>{o.label}</button>
          ))}
        </div>
        <span className="small" aria-live="polite">{list.length} {list.length === 1 ? "story" : "stories"}</span>
      </div>
      <div className="grid g3">
        {list.map((c) => <div key={c.slug} style={{ display: "grid" }}><CaseCard c={c} logo={logos[c.client.toLowerCase()]} /></div>)}
      </div>
    </>
  );
}
