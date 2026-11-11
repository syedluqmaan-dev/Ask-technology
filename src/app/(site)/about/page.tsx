import Link from "next/link";
import type { Metadata } from "next";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ClientLogos } from "@/components/ClientLogos";
import { Arrow, Check, Icon } from "@/components/Icons";
import { caseStudies } from "@/data/caseStudies";
import { clients } from "@/data/clients";
import type { IconName } from "@/data/products";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ASK Technology is a Chennai IT company with 25+ years of experience, building TARGET, the AI-powered ERP for the textile and garment industry, alongside IT consulting.",
  alternates: { canonical: "/about" },
};

const pillars: [IconName, string, string][] = [
  ["spark", "Innovation at the core", "From cutting-edge solutions to the latest technologies, we keep your business ahead."],
  ["layers", "Tailored solutions, every time", "Thorough contextual research and 360° planning for how your business runs."],
  ["users", "Proven expertise", "More than 25 years of experience delivering IT solutions."],
  ["chain", "Client-centric approach", "Open communication with your team at every step."],
  ["box", "End-to-end services", "Strategic UI/UX assessment, wireframing and prototyping through to delivery."],
  ["shield", "Commitment to excellence", "High quality standards in every product and project."],
];

const engagement: [IconName, string, string][] = [
  ["target", "Project management", "A dedicated team that plans and runs your implementation."],
  ["shield", "Quality assurance", "Testing with real orders before go-live."],
  ["clock", "Post-launch maintenance", "Updates and improvements after you go live."],
  ["users", "Technical support", "Help when your team needs it."],
  ["chart", "Consulting services", "Process and technology advice for apparel businesses."],
  ["spark", "Training and workshops", "Every role trained to get value from TARGET."],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">About us</span></nav>
          <div className="split" style={{ alignItems: "end" }}>
            <div>
              <p className="eyebrow">About ASK Technology</p>
              <h1 className="h1">Empowering businesses with <span className="grad-text">innovative solutions</span></h1>
            </div>
            <p className="lead">
              We are more than an IT services company. ASK Technology is your partner in using technology to drive innovation and growth,
              with solutions built around your unique needs, led by TARGET, our ERP for the textile and garment industry.
            </p>
          </div>
          <div className="stats" style={{ marginTop: 56 }}>
            <div><strong className="grad-text">25+</strong><span>Years of IT solutions</span></div>
            <div><strong className="grad-text">{clients.length}+</strong><span>Apparel businesses</span></div>
            <div><strong className="grad-text">{caseStudies.length}</strong><span>Customer stories</span></div>
            <div><strong className="grad-text">Chennai</strong><span>Headquarters, India</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid g2">
          <Reveal className="vm"><span className="ico grad"><Icon name="target" /></span><p className="eyebrow" style={{ marginTop: 22 }}>Our vision</p><p className="big">A future where innovation and technology empower businesses to reach their full potential, driving digital transformation across industries.</p></Reveal>
          <Reveal className="vm" delay={100}><span className="ico grad"><Icon name="spark" /></span><p className="eyebrow" style={{ marginTop: 22 }}>Our mission</p><p className="big">To empower businesses with transformative technology that drives efficiency and growth, so our clients thrive in a fast-changing digital world.</p></Reveal>
        </div>
      </section>

      <section className="section bg-tint" id="leadership">
        <div className="wrap leader">
          <div className="photo">[CEO photo]</div>
          <Reveal>
            <p className="eyebrow">Meet our CEO</p>
            <h2 className="h2">Mohammed Salahuddin</h2>
            <p className="small" style={{ marginTop: 6, fontSize: 15 }}>Founder & CEO, ASK Technology</p>
            <p className="sub" style={{ marginTop: 20 }}>
              A seasoned entrepreneur and IT professional with over 20 years of experience, Mohammed founded ASK Technology to solve the
              critical bottlenecks he saw in apparel manufacturing. His blend of IT and apparel manufacturing expertise bridges the gap
              between technology and production.
            </p>
            <p className="sub" style={{ marginTop: 14 }}>
              Our mission is to empower the fashion industry by improving efficiency, reducing waste and increasing productivity through
              software that gives garment businesses a real competitive advantage.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head"><p className="eyebrow">What we do</p><h2 className="h2">Two practices, one goal: technology that pays for itself</h2></Reveal>
          <div className="grid g2">
            <Reveal className="card hover"><span className="ico"><Icon name="factory" /></span><h3 className="h3" style={{ marginTop: 18 }}>Business growth</h3><p className="body" style={{ marginTop: 8 }}>ERP products for the textile, garment and rental management industries that streamline operations and catalyse growth.</p><Link className="link" href="/products">Explore TARGET <Arrow /></Link></Reveal>
            <Reveal className="card hover" delay={100}><span className="ico"><Icon name="chart" /></span><h3 className="h3" style={{ marginTop: 18 }}>IT consulting</h3><p className="body" style={{ marginTop: 8 }}>Strategic planning that aligns technology with your business objectives for efficiency and performance.</p><Link className="link" href="/contact">Talk to us <Arrow /></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="wrap">
          <Reveal className="section-head center"><p className="eyebrow">Why choose us</p><h2 className="h2">What sets ASK Technology apart</h2></Reveal>
          <div className="grid g3">
            {pillars.map(([ic, t, d], i) => (
              <Reveal key={t} className="feat" delay={(i % 3) * 80}><span className="ico"><Icon name={ic} /></span><h3>{t}</h3><p className="body">{d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="engagement">
        <div className="wrap split top">
          <Reveal>
            <p className="eyebrow">Engagement model</p>
            <h2 className="h2">Tailored to your project's success</h2>
            <p className="sub" style={{ marginTop: 18 }}>From the first plan to long after go-live, our team stays with you.</p>
            <ul className="ticklist" style={{ marginTop: 26 }}>
              {["Discover your orders, teams and current systems", "Plan products, data and timelines together", "Configure TARGET to your workflows", "Test with real orders", "Go live with training and support"].map((x) => <li key={x}><Check />{x}</li>)}
            </ul>
          </Reveal>
          <div className="grid g2" style={{ gap: 16 }}>
            {engagement.map(([ic, t, d]) => (
              <Reveal key={t} className="card" ><span className="ico" style={{ width: 42, height: 42, borderRadius: 12 }}><Icon name={ic} size={20} /></span><b style={{ marginTop: 14, fontSize: 16 }}>{t}</b><span className="body" style={{ marginTop: 4, fontSize: 14.5 }}>{d}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClientLogos />
      <div style={{ height: 112 }} />
      <DemoBand />
    </>
  );
}
