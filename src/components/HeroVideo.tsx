"use client";

import { useRef, useState } from "react";

/**
 * Hero ad video, framed as the live TARGET 360 app in a browser window,
 * with two "proof" cards that sit over the frame edges.
 * Browsers only autoplay muted video, so the music starts when the visitor taps "Play with sound".
 *
 * PLACEHOLDER FIGURES: the PO number, piece count and fabric saving in the proof cards
 * are illustrative. Replace them with figures ASK Technology has approved before launch.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (muted) {
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {});
    } else {
      v.muted = true;
    }
    setMuted(!muted);
  };

  return (
    <>
      <div className="hero-shot">
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots"><i /><i /><i /></span>
          <span className="browser-url">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span>target360.asktek.net/<b>orders/PO-4471</b></span>
          </span>
        </div>
        <div className="browser-body">
          <video
            ref={ref}
            src="/videos/ask-ad-web.mp4"
            poster="/videos/ask-ad-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="ASK Technology TARGET 360 ERP product video"
            style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16 / 9", background: "#F6F9FE" }}
          />
          <button
            type="button"
            onClick={toggle}
            aria-pressed={!muted}
            style={{
              position: "absolute", right: 14, bottom: 14, display: "inline-flex", alignItems: "center", gap: 8,
              padding: "9px 14px", border: "1px solid rgba(255,255,255,.6)", borderRadius: 999,
              background: "rgba(23,33,63,.78)", color: "#fff", font: "600 13.5px/1 var(--font-body, sans-serif)",
              cursor: "pointer", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              {muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
            </svg>
            {muted ? "Play with sound" : "Mute"}
          </button>
        </div>
      </div>

      {/* Proof cards: placeholder figures, see note above. */}
      <div className="float f1 proof" aria-hidden="true">
        <span className="proof-ok">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </span>
        <span>
          <b>PO-4471 · 12,400 pcs</b>
          <span className="proof-sub">Shipped on time · 2 days early</span>
        </span>
      </div>
      <div className="float f2 proof" aria-hidden="true">
        <span className="proof-k">Fabric consumption <span className="browser-live">Live</span></span>
        <span className="proof-v">−8.2%<small>this season</small></span>
        <svg className="proof-spark" viewBox="0 0 200 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spk" x1="0" x2="1"><stop offset="0" stopColor="#4560d0" /><stop offset="1" stopColor="#1c97dd" /></linearGradient>
          </defs>
          <path d="M0 8 L28 12 L56 9 L84 17 L112 15 L140 24 L168 27 L200 33" fill="none" stroke="url(#spk)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </>
  );
}
