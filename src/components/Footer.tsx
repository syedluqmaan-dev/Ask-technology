import Link from "next/link";
import { Logo } from "./Logo";
import { Arrow, Facebook, Instagram, LinkedIn, WhatsApp, YouTube } from "./Icon";
import { CookieSettingsLink } from "./Consent";
import { FocusHide } from "./FocusHide";
import { telHref, waHref } from "@/lib/format";
import type { Settings } from "@/lib/types";

type Col = { title: string; links: { label: string; href: string }[] };

const socialIcon: Record<string, () => React.ReactElement> = { LinkedIn, YouTube, Instagram, Facebook };

const legal = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Security", href: "/security" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Grievance officer", href: "/grievance-officer" },
];

/** Gradient call-to-action band shown above the footer on most pages. */
export function DemoBand({
  title = "See TARGET 360 running on your own workflow",
  text = "Book a live demo with a product specialist. Our team replies on WhatsApp, typically within 1 hour.",
}: { title?: string; text?: string }) {
  return (
    <section style={{ padding: "0 0 88px" }}>
      <div className="wrap">
        <div className="band">
          <div>
            <h2 className="h2">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
            <Link className="btn btn-white" href="/book-a-demo">Book a demo <Arrow /></Link>
            <Link className="btn btn-outline-white" href="/contact">Request a call back</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ s, columns }: { s: Settings; columns: Col[] }) {
  const a = s.address;
  return (
    <FocusHide>
      <footer className="site-footer">
        <div className="wrap">
          <div className={`foot-grid${columns.length === 3 ? " three" : ""}`} style={columns.length !== 3 ? { gridTemplateColumns: `1.3fr repeat(${columns.length}, 1fr)` } : undefined}>
            <div>
              <Logo id="ft" />
              <p style={{ margin: "22px 0 20px", maxWidth: 360, lineHeight: 1.65 }}>{s.footerAbout}</p>
              <address>
                {/* Client asked for city and state only here. The full address stays on the Contact page and in structured data for Google. */}
                {[a.city, a.region].filter(Boolean).join(", ")}
                <br />
                <a href={`mailto:${s.email}`}>{s.email}</a>
                <br />
                <a href={telHref(s.phone)}>{s.phone}</a>
                {s.landline && <> · <a href={telHref(s.landline)}>{s.landline}</a></>}
              </address>
              {s.social.length > 0 && (
                <div className="socials">
                  {s.social.map((x) => {
                    const I = socialIcon[x.label];
                    return (
                      <a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer" aria-label={x.label}>
                        {I ? <I /> : x.label[0]}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            {columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2>{c.title}</h2>
                <ul>
                  {c.links.map((l) => <li key={l.href + l.label}><Link href={l.href}>{l.label}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>

          {s.trust.length > 0 && (
            <ul className="trust-row" aria-label="Certifications">
              {s.trust.map((t) => (
                <li key={t.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {t.image && <img src={t.image} alt="" loading="lazy" />}
                  <span><b>{t.label}</b>{t.text && <span>{t.text}</span>}</span>
                </li>
              ))}
            </ul>
          )}

          {s.footerCountries.length > 0 && (
            <nav className="foot-countries" aria-label="Where we work">
              {s.footerCountries.map((c, i) => (
                <span key={c.href}>
                  {i > 0 && <span className="sep" aria-hidden="true">|</span>}
                  <Link href={c.href}>{c.label}</Link>
                </span>
              ))}
            </nav>
          )}

          <div className="foot-bottom">
            <span className="foot-copy">
              © {new Date().getFullYear()} {s.name}. All rights reserved.
              <a className="foot-credit" href="https://www.ariartech.com/" target="_blank" rel="noopener">Developed by <b>Ariar Technology</b></a>
            </span>
            <span className="foot-legal">
              {legal.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              <CookieSettingsLink />
            </span>
          </div>
        </div>
      </footer>
      {s.whatsapp && (
        <a className="wa" href={waHref(s.whatsapp, "Hello ASK Technology, I would like to know more about TARGET 360.")} aria-label="Chat with ASK Technology on WhatsApp">
          <WhatsApp />
        </a>
      )}
    </FocusHide>
  );
}
