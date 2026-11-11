"use client";

import { useRef, useState } from "react";

/**
 * Hero ad video. Browsers only autoplay muted video,
 * so the music starts when the visitor taps "Play with sound".
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
    <div style={{ position: "relative" }}>
      <video
        ref={ref}
        src="/videos/ask-ad-web.mp4"
        poster="/videos/ask-ad-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="ASK Technology TARGET ERP product video"
        style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16 / 9", borderRadius: 12, background: "#F6F9FE" }}
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
  );
}