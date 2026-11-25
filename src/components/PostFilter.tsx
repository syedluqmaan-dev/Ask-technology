"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import { PostCard } from "./ui";

const PAGE = 12;

/** Article list with topic tabs and "load more". All articles are also linked from category pages and the sitemap. */
export function PostFilter({ posts }: { posts: Post[] }) {
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
        {/* Every article stays in the HTML so search engines can find it; extra ones are hidden until "Load more". */}
        {list.map((p, i) => <div key={p.slug} style={{ display: "grid" }} hidden={i >= shown}><PostCard p={p} /></div>)}
      </div>
      {shown < list.length && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE)}>Load more articles</button>
        </div>
      )}
    </>
  );
}
