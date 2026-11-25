"use client";

import { useEffect, useRef, useState } from "react";
import type { Client } from "@/lib/types";

/** One logo. If the image is missing or fails to load, the client's name shows instead, so the strip never looks broken. */
function Cell({ c, dup }: { c: Client; dup?: boolean }) {
  const [failed, setFailed] = useState(!c.logo);
  const ref = useRef<HTMLImageElement>(null);
  // An image can fail before React attaches onError (during hydration), so check once after mounting too.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <li className="logo-cell" aria-hidden={dup || undefined}>
      {failed ? (
        <span className="logo-name">{c.name}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={ref} src={c.logo} alt={dup ? "" : c.name} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </li>
  );
}

function Row({ items, reverse = false }: { items: Client[]; reverse?: boolean }) {
  return (
    <div className={`marquee${reverse ? " rev" : ""}`}>
      <ul className="marquee-track">
        {items.map((c) => <Cell key={c.name} c={c} />)}
        {items.map((c) => <Cell key={`d-${c.name}`} c={c} dup />)}
      </ul>
    </div>
  );
}

/** Two rows of client logos scrolling in opposite directions. Pauses on hover; static for reduced motion. Managed in CMS → Client logos. */
export function ClientLogos({ clients, title }: { clients: Client[]; title?: React.ReactNode }) {
  if (!clients.length) return null;
  const half = Math.ceil(clients.length / 2);
  return (
    <section className="logos" aria-label="Our clients">
      <p className="label">{title ?? <>Trusted by <b>garment manufacturers, exporters and buying houses</b> across India and abroad</>}</p>
      <Row items={clients.slice(0, half)} />
      <Row items={clients.slice(half)} reverse />
    </section>
  );
}
