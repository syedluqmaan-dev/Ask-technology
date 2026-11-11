import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { Check } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join ASK Technology in Chennai and build software that runs garment businesses. Send your resume to hr@asktek.net.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">Careers</span></nav>
          <p className="eyebrow">Careers</p>
          <h1 className="h1" style={{ maxWidth: 820 }}>Build software that <span className="grad-text">runs garment businesses</span></h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: 700 }}>
            We are looking for talented people to join our team. At ASK Technology you work in a dynamic, innovative environment where your
            ideas are valued and your growth is supported.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap split top">
          <div>
            <h2 className="h2" style={{ fontSize: 34 }}>Why join us</h2>
            <ul className="ticklist" style={{ marginTop: 22, fontSize: 16.5 }}>
              <li><Check />Work on products used daily by garment factories, exporters and buying houses</li>
              <li><Check />Learn both technology and the apparel industry</li>
              <li><Check />A team where your ideas shape the product</li>
            </ul>
            <div className="card" style={{ marginTop: 32 }}>
              <b>Open roles</b>
              <p className="body" style={{ marginTop: 6 }}>[Current openings from ASK]</p>
              <p className="body" style={{ marginTop: 12 }}>Don't see a suitable position? Send your resume to <a href={`mailto:${site.hrEmail}`}>{site.hrEmail}</a>.</p>
            </div>
          </div>
          <div>
            <h2 className="h3" style={{ fontSize: 24, marginBottom: 16 }}>Apply now</h2>
            <LeadForm source="careers" button="Submit application" extraLabel="Years of experience and the role you want" />
          </div>
        </div>
      </section>
    </>
  );
}
