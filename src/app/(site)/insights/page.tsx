import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/data/blog";
import { PostFilter } from "@/components/PostFilter";
import { DemoBand } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Insights: Apparel ERP, Quality and Production",
  description: "Articles from ASK Technology on garment ERP, buying house software, garment inspection, operation bulletins, AI in fashion and apparel industry news.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> / <span aria-current="page">Insights</span></nav>
          <p className="eyebrow">Insights</p>
          <h1 className="h1" style={{ maxWidth: 820 }}>Ideas for running a <span className="grad-text">smarter garment business</span></h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: 680 }}>{posts.length} articles on apparel ERP, quality control, production planning, AI and industry news.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap"><PostFilter /></div>
      </section>
      <DemoBand />
    </>
  );
}
