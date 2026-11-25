import { LeadForm } from "@/components/LeadForm";
import { LocationsMap } from "@/components/LocationsMap";
import { Accent, Crumbs } from "@/components/ui";
import { getContactPage, getProducts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { fullAddress, telHref, waHref } from "@/lib/format";

export const revalidate = 3600;

export async function generateMetadata() {
  const c = await getContactPage();
  return buildMetadata({ title: c.seo.title, description: c.seo.description, path: "/contact" });
}

export default async function ContactPage() {
  const [s, c, products] = await Promise.all([getSettings(), getContactPage(), getProducts()]);
  const a = s.address;
  const address = fullAddress(s);
  return (
    <section style={{ padding: "64px 0 96px", background: "linear-gradient(180deg, #F3F8FE 0%, #fff 60%)" }}>
      <div className="wrap">
        <Crumbs s={s} items={[{ name: "Contact us", path: "/contact" }]} />
        <h1 className="h1" style={{ fontSize: "clamp(38px, 5vw, 52px)" }}><Accent text={c.title} accent={c.accent} /></h1>
        <p className="lead mt-m mb-l" style={{ maxWidth: 640 }}>{c.lead}</p>
        <div className="split top">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="contact-card"><p className="k">Sales</p><a className="v" href={`mailto:${s.email}`}>{s.email}</a></div>
            <div className="contact-card">
              <p className="k">Phone</p>
              <a className="v" href={telHref(s.phone)}>{s.phone}</a>
              {s.landline && <><br /><a href={telHref(s.landline)} style={{ color: "var(--text)", textDecoration: "none" }}>{s.landline}</a></>}
            </div>
            {s.whatsapp && (
              <div className="contact-card"><p className="k">WhatsApp</p><a href={waHref(s.whatsapp, "Hello ASK Technology, I would like to know more about TARGET 360.")} className="link">Chat with us</a><p className="body">Typically replies within 1 hour</p></div>
            )}
            <div className="contact-card office-card">
              <p className="k">Head office</p>
              <address style={{ fontStyle: "normal", fontSize: 15.5, lineHeight: 1.6 }}>{a.street}, {a.city}, {a.region} {a.postalCode}</address>
              {/* The map only loads when opened (closed <details> content is not rendered). */}
              <details className="office-map">
                <summary>
                  <span>View on map</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <div className="office-map-frame">
                  <iframe
                    title="Map showing the ASK Technology head office in Chennai"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`ASK Technology, ${address}`)}&output=embed`}
                  />
                </div>
              </details>
              <a className="link" href={s.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 12 }}>Get directions</a>
            </div>
          </div>
          <div>
            <h2 className="h3" style={{ fontSize: 24, marginBottom: 16 }}>Send us a message</h2>
            <LeadForm type="contact" button="Send message" extraLabel="Message" products={products.map((p) => ({ slug: p.slug, name: p.name }))} phone={s.phone} email={s.email} />
          </div>
        </div>
        <LocationsMap title="Serving garment businesses across five countries" lead="From our head office in Chennai, we implement and support TARGET 360 for manufacturers, exporters and buying houses in India, the UK, the UAE, Bangladesh and Sri Lanka." />
      </div>
    </section>
  );
}
