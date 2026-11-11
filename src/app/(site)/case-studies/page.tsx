import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/data/caseStudies";
import { CaseFilter } from "@/components/CaseFilter";
import { DemoBand } from "@/components/Footer";
import { ClientLogos } from "@/components/ClientLogos";

export const metadata: Metadata = {
  title: "Customer Stories",
  description: "How garment manufacturers, exporters, buying houses and brands run their business on TARGET ERP, Target BMS and Quick OB.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">Customer stories</span></nav>
          <p className="eyebrow">Customer stories</p>
          <h1 className="h1" style={{ maxWidth: 820 }}>Real garment businesses. <span className="grad-text">Real transformations.</span></h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: 680 }}>
            {caseStudies.length} stories from manufacturers, exporters, buying houses and brands across India and abroad that run on TARGET.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap"><CaseFilter /></div>
      </section>
      <ClientLogos />
      <div style={{ height: 112 }} />
      <DemoBand title="Write your own success story with TARGET" />
    </>
  );
}
