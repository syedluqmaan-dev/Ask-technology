import Link from "next/link";
import { PageHero } from "@/components/ui";
import { DemoBand } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getGlossary, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Garment Industry Glossary: SMV, AQL, T&A, CMT and More",
  description: "Plain definitions of garment manufacturing and export terms: SMV, operation bulletin, line balancing, AQL, T&A calendar, FOB, CMT, tech pack, BOM and more.",
  path: "/glossary",
});

const first = (t: string) => t.trim()[0].toUpperCase();

export default async function GlossaryPage() {
  const [s, terms] = await Promise.all([getSettings(), getGlossary()]);
  const letters = Array.from(new Set(terms.map((t) => first(t.term)))).sort();
  const az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Glossary", path: "/glossary" }]}
        eyebrow="Glossary"
        title={<>Garment industry <span className="grad-text">glossary</span></>}
        lead={`${terms.length} terms every merchandiser, planner and factory manager uses, explained in plain words with formulas and examples.`}
      />
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <ul className="az" aria-label="Jump to letter">
            {az.map((l) => <li key={l}>{letters.includes(l) ? <a href={`#letter-${l}`}>{l}</a> : <span aria-hidden="true">{l}</span>}</li>)}
          </ul>
          {letters.map((l) => (
            <div key={l} className="gl-group" id={`letter-${l}`}>
              <h2>{l}</h2>
              <ul>
                {terms.filter((t) => first(t.term) === l).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/glossary/${t.slug}`}>{t.term}</Link>
                    <p>{t.short}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <DemoBand title="See these terms working in TARGET 360" text="SMV, T&A, AQL and cut-to-pack are built into the software, not added on." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Garment industry glossary",
          url: `${s.url}/glossary`,
          hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.short, url: `${s.url}/glossary/${t.slug}` })),
        }}
      />
    </>
  );
}
