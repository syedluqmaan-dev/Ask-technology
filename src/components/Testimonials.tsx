"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/types";

const INTERVAL = 3000;

/**
 * Customer quotes in a row of equal-size cards. Auto-advances one card every 3 seconds and loops,
 * pausing while the visitor hovers, touches, focuses or uses the arrows. No auto-play with reduced motion.
 * Renders nothing until real quotes exist in the CMS.
 */
export function Testimonials({ items, title = "Hear from our customers" }: { items: Testimonial[]; title?: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const resumeAt = useRef(0);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".t-card");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const by = card ? card.offsetWidth + gap : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * by, behavior: "smooth" });
  };

  const manual = (dir: 1 | -1) => {
    resumeAt.current = Date.now() + INTERVAL * 2;
    step(dir);
  };

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused || document.hidden || Date.now() < resumeAt.current) return;
      const el = track.current;
      if (!el || el.scrollWidth <= el.clientWidth + 4) return;
      step(1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (!items.length) return null;

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
              <button type="button" className="btn btn-ghost" onClick={() => manual(-1)} aria-label="Previous testimonials">←</button>
              <button type="button" className="btn btn-ghost" onClick={() => manual(1)} aria-label="Next testimonials">→</button>
            </div>
          )}
        </div>
        <ul
          className="t-track"
          ref={track}
          aria-live="off"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => { resumeAt.current = Date.now() + INTERVAL * 2; }}
        >
          {items.map((t) => (
            <li key={t.name + t.quote.slice(0, 20)} className="t-card">
              <div className="t-top">
                {t.photo
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <span className="t-logo"><img src={t.photo} alt={t.company ? `${t.company} logo` : ""} loading="lazy" decoding="async" /></span>
                  : <span className="t-initial" aria-hidden="true">{(t.company || t.name)[0]}</span>}
                <span className="t-mark" aria-hidden="true">“</span>
              </div>
              <blockquote>{t.quote}</blockquote>
              <div className="t-who">
                <b>{t.name}</b>
                <span>{[t.role, t.company].filter(Boolean).join(" · ")}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
