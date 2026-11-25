import Link from "next/link";
import { MAP_DOTS, MAP_H, MAP_POINTS, MAP_W } from "./worldMapData";

type Place = { slug: string; country: string; city: string; point: keyof typeof MAP_POINTS; hq?: boolean; side: "l" | "r" | "t" | "b" };

/** Where ASK works. Each country links to its location page. Chennai is the head office. */
const PLACES: Place[] = [
  { slug: "united-kingdom", country: "United Kingdom", city: "London", point: "london", side: "r" },
  { slug: "uae", country: "UAE", city: "Dubai", point: "dubai", side: "t" },
  { slug: "india", country: "India", city: "Chennai", point: "chennai", hq: true, side: "l" },
  { slug: "bangladesh", country: "Bangladesh", city: "Dhaka", point: "dhaka", side: "t" },
  { slug: "sri-lanka", country: "Sri Lanka", city: "Colombo", point: "colombo", side: "r" },
];

/** Curved line from the head office to a location, bowing upwards. */
function arc(from: readonly [number, number], to: readonly [number, number]) {
  const [x1, y1] = from, [x2, y2] = to;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  // Bow upwards, but keep the curve inside the map so it never runs into the heading.
  const cx = (x1 + x2) / 2, cy = Math.max(12, Math.min(y1, y2) - Math.max(40, dist * 0.3));
  return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
}

export function LocationsMap({ title = "Where we work", lead }: { title?: string; lead?: string }) {
  const hq = MAP_POINTS.chennai;
  return (
    <section className="locmap" aria-labelledby="locmap-h">
      <div className="locmap-head">
        <p className="eyebrow">Our presence</p>
        <h2 className="h2" id="locmap-h">{title}</h2>
        {lead && <p className="sub">{lead}</p>}
      </div>

      <div className="locmap-canvas" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="locmap-arc" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#4560d0" />
              <stop offset="1" stopColor="#1c97dd" />
            </linearGradient>
          </defs>
          <path d={MAP_DOTS} className="locmap-dots" />
          {PLACES.filter((p) => !p.hq).map((p) => (
            <path key={p.slug} d={arc(hq, MAP_POINTS[p.point])} className="locmap-arc" />
          ))}
        </svg>

        {PLACES.map((p) => {
          const [x, y] = MAP_POINTS[p.point];
          return (
            <Link
              key={p.slug}
              href={`/locations/${p.slug}`}
              className={`locmap-pin${p.hq ? " hq" : ""} side-${p.side}`}
              style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` }}
              aria-label={`${p.country}${p.hq ? ", head office in Chennai" : ""}`}
            >
              <span className="locmap-dot" aria-hidden="true" />
              <span className="locmap-label">
                <b>{p.country}</b>
                <span>{p.hq ? "Chennai · Head office" : p.city}</span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* Same places as a list: readable on small phones and for screen readers */}
      <ul className="locmap-list">
        {PLACES.map((p) => (
          <li key={p.slug}>
            <Link href={`/locations/${p.slug}`}>
              <span className={`locmap-li-dot${p.hq ? " hq" : ""}`} aria-hidden="true" />
              <b>{p.country}</b>
              <span>{p.hq ? "Head office, Chennai" : p.city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
