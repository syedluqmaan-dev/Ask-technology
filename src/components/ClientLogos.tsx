import { clients } from "@/data/clients";

function Row({ items, reverse = false }: { items: typeof clients; reverse?: boolean }) {
  return (
    <div className={`marquee${reverse ? " rev" : ""}`}>
      <ul className="marquee-track">
        {items.map((c) => (
          <li className="logo-cell" key={c.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.logo} alt={c.name} loading="lazy" />
          </li>
        ))}
        {items.map((c) => (
          <li className="logo-cell" key={`d-${c.name}`} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.logo} alt="" loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two rows of client logos scrolling in opposite directions. Pauses on hover; static for reduced motion. */
export function ClientLogos({ title }: { title?: React.ReactNode }) {
  const half = Math.ceil(clients.length / 2);
  return (
    <section className="logos" aria-label="Our clients">
      <p className="label">{title ?? <>Trusted by <b>garment manufacturers, exporters and buying houses</b> across India and abroad</>}</p>
      <Row items={clients.slice(0, half)} />
      <Row items={clients.slice(half)} reverse />
    </section>
  );
}
