import Link from "next/link";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/ClientLogos";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check, Icon } from "@/components/Icon";
import { Accent, Crumbs, Img } from "@/components/ui";
import { getAbout, getCaseStudies, getClients, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const a = await getAbout();
  return buildMetadata({ title: a.seo.title, description: a.seo.description, path: "/about" });
}

const practiceLinks = [
  { href: "/products", label: "Explore TARGET 360" },
  { href: "/contact", label: "Talk to us" },
];

export default async function AboutPage() {
  const [s, a, cases, clients] = await Promise.all([getSettings(), getAbout(), getCaseStudies(), getClients()]);
  const stats = [
    s.stats[0] ?? { value: "20+", label: "Years of IT solutions" },
    { value: `${clients.length}+`, label: "Apparel businesses" },
    { value: String(cases.length), label: "Customer stories" },
    s.stats[2] ?? { value: "100+", label: "Projects delivered" },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Crumbs s={s} items={[{ name: "About us", path: "/about" }]} />
          <div className="split" style={{ alignItems: "end" }}>
            <div>
              <p className="eyebrow">About ASK Technology</p>
              <h1 className="h1"><Accent text={a.title} accent={a.accent} /></h1>
            </div>
            <p className="lead">{a.lead}</p>
          </div>
          <div className="stats" style={{ marginTop: 56 }}>
            {stats.map((x) => <div key={x.label}><strong className="grad-text">{x.value}</strong><span>{x.label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid g2">
          <Reveal className="vm"><span className="ico grad"><Icon name="target" /></span><p className="eyebrow" style={{ marginTop: 22 }}>Our vision</p><p className="big">{a.vision}</p></Reveal>
          <Reveal className="vm" delay={100}><span className="ico grad"><Icon name="spark" /></span><p className="eyebrow" style={{ marginTop: 22 }}>Our mission</p><p className="big">{a.mission}</p></Reveal>
        </div>
      </section>

      <section className="section bg-tint" id="leadership">
        <div className="wrap leader">
          <div className="photo" style={{ overflow: "hidden" }}>
            {a.ceoPhoto
              ? <Img src={a.ceoPhoto} alt="Mohammed Salahuddin, Founder and CEO of ASK Technology" width={600} height={750} sizes="300px" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span className="small" style={{ padding: 24, textAlign: "center" }}>CEO photo</span>}
          </div>
          <Reveal>
            <p className="eyebrow">Meet our CEO</p>
            <h2 className="h2">Mohammed Salahuddin</h2>
            <p className="small" style={{ marginTop: 6, fontSize: 15 }}>Founder & CEO, ASK Technology</p>
            {a.ceoBio.map((b, i) => <p key={b.slice(0, 30)} className="sub" style={{ marginTop: i ? 14 : 20 }}>{b}</p>)}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">What we do</p><h2 className="h2">Two practices, one goal: technology that pays for itself</h2></Reveal>
          <div className="grid g2">
            {a.practices.map((f, i) => (
              <Reveal key={f.title} className="card hover" delay={i * 100}>
                <span className="ico"><Icon name={f.icon ?? "layers"} /></span>
                <h3 className="h3" style={{ marginTop: 18 }}>{f.title}</h3>
                <p className="body" style={{ marginTop: 8 }}>{f.text}</p>
                <Link className="link" href={practiceLinks[i % 2].href}>{practiceLinks[i % 2].label} <Arrow /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head center"><p className="eyebrow">Why choose us</p><h2 className="h2">What sets ASK Technology apart</h2></Reveal>
          <div className="grid g3">
            {a.pillars.map((f, i) => (
              <Reveal key={f.title} className="feat" delay={(i % 3) * 80}><span className="ico"><Icon name={f.icon ?? "layers"} /></span><h3>{f.title}</h3><p className="body">{f.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="engagement">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Engagement model</p>
            <h2 className="h2">Tailored to your project&apos;s success</h2>
            <p className="sub" style={{ marginTop: 18 }}>From the first plan to long after go-live, our team stays with you.</p>
            <ul className="ticklist" style={{ marginTop: 26 }}>
              {a.process.map((x) => <li key={x}><Check />{x}</li>)}
            </ul>
          </Reveal>
          <div className="grid g2" style={{ gap: 16 }}>
            {a.engagement.map((f) => (
              <Reveal key={f.title} className="card"><span className="ico" style={{ width: 42, height: 42, borderRadius: 12 }}><Icon name={f.icon ?? "layers"} size={20} /></span><b style={{ marginTop: 14, fontSize: 16 }}>{f.title}</b><span className="body" style={{ marginTop: 4, fontSize: 14.5 }}>{f.text}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClientLogos clients={clients} />
      <div style={{ height: 112 }} />
      <DemoBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${s.url}/about`,
          mainEntity: { "@id": `${s.url}/#organization` },
          about: { "@type": "Person", name: "Mohammed Salahuddin", jobTitle: "Founder and CEO", worksFor: { "@id": `${s.url}/#organization` } },
        }}
      />
    </>
  );
}
