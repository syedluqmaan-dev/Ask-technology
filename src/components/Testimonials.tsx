"use client";

import { useRef } from "react";
import type { Testimonial } from "@/lib/types";

/** Customer quotes in a swipeable row with previous/next buttons. Renders nothing until real quotes exist in the CMS. */
export function Testimonials({ items, title = "Hear from our customers" }: { items: Testimonial[]; title?: string }) {
  const track = useRef<HTMLUListElement>(null);
  if (!items.length) return null;
  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };
  return (
    <section className="section" aria-labelledby="testimonials-h">
      <div className="wrap">
        <div className="head-row">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 className="h2" id="testimonials-h">{title}</h2>
          </div>
          {items.length > 2 && (
            <div className="t-nav">
              <button type="button" className="btn btn-ghost" onClick={() => move(-1)} aria-label="Previous testimonials">←</button>
              <button type="button" className="btn btn-ghost" onClick={() => move(1)} aria-label="Next testimonials">→</button>
            </div>
          )}
        </div>
        <ul className="t-track" ref={track}>
          {items.map((t) => (
            <li key={t.name + t.quote.slice(0, 20)} className="t-card">
              <blockquote>“{t.quote}”</blockquote>
              <div className="t-who">
                {t.photo
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={t.photo} alt="" width={48} height={48} loading="lazy" />
                  : <span className="t-initial" aria-hidden="true">{t.name[0]}</span>}
                <span><b>{t.name}</b><span>{[t.role, t.company].filter(Boolean).join(", ")}</span></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
