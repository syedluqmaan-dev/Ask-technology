"use client";

import { useState } from "react";
import { posts } from "@/data/blog";
import { PostCard } from "./Cards";

const PAGE = 12;

export function PostFilter() {
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const [shown, setShown] = useState(PAGE);
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <div className="filter-row">
        <div className="tabs" role="group" aria-label="Filter by topic" style={{ marginBottom: 0 }}>
          {cats.map((c) => (
            <button key={c} className="tab" aria-pressed={cat === c} onClick={() => { setCat(c); setShown(PAGE); }}>{c}</button>
          ))}
        </div>
        <span className="small" aria-live="polite">{list.length} articles</span>
      </div>
      <div className="grid g3">
        {list.slice(0, shown).map((p) => <div key={p.id} style={{ display: "grid" }}><PostCard p={p} /></div>)}
      </div>
      {shown < list.length && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>Load more articles</button>
        </div>
      )}
    </>
  );
}
