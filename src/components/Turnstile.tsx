"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void; remove: (id: string) => void };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

/** Invisible bot check (Cloudflare Turnstile). Renders nothing when no site key is configured. */
export function Turnstile({ onToken }: { onToken: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    let id: string | undefined;
    const render = () => {
      if (!window.turnstile || !ref.current) return;
      id = window.turnstile.render(ref.current, { sitekey: SITE_KEY, size: "flexible", appearance: "interaction-only", callback: onToken, "expired-callback": () => onToken("") });
    };
    if (window.turnstile) render();
    else {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = render;
      document.head.appendChild(s);
    }
    return () => {
      if (id && window.turnstile) window.turnstile.remove(id);
    };
  }, [onToken]);
  return SITE_KEY ? <div ref={ref} /> : null;
}

export const turnstileEnabled = Boolean(SITE_KEY);
