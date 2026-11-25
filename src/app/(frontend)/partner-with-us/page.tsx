import { LeadForm } from "@/components/LeadForm";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Accent, Crumbs } from "@/components/ui";
import { getPartnerPage, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const p = await getPartnerPage();
  return buildMetadata({ title: p.seo.title, description: p.seo.description, path: "/partner-with-us" });
}

export default async function PartnerPage() {
  const [s, p] = await Promise.all([getSettings(), getPartnerPage()]);
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Crumbs s={s} items={[{ name: "Partner with us", path: "/partner-with-us" }]} />
          <p className="kicker">Partner programme</p>
          <h1 className="h1" style={{ fontSize: "clamp(38px, 5vw, 54px)", maxWidth: 820 }}><Accent text={p.title} accent={p.accent} /></h1>
          <p className="lead mt-m" style={{ maxWidth: 700 }}>{p.lead}</p>
          <a className="btn btn-primary mt-l" href="#apply">Apply to partner</a>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <h2 className="h2 mb-l">Why partner with us</h2>
          <Reveal className="cells g3">
            {p.why.map((w) => <div key={w.title}><h3 className="h3" style={{ fontSize: 19 }}>{w.title}</h3><p className="body mt-s">{w.text}</p></div>)}
          </Reveal>
        </div>
      </section>

      <section className="section bg-tint" id="apply">
        <div className="wrap split top">
          <div>
            <h2 className="h2">Reach out to us for partnership opportunities</h2>
            <p className="sub mt-m">Tell us about your business and the market you serve. Our partnerships team will get back to you.</p>
          </div>
          <LeadForm type="partner" button="Send message" extraLabel="Message" partnerType phone={s.phone} email={s.email} />
        </div>
      </section>

      <div style={{ height: 96 }} />
      <DemoBand />
    </>
  );
}
