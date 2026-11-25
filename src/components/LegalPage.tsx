import { notFound } from "next/navigation";
import { PageHero } from "./ui";
import { Prose } from "./Prose";
import { getLegal, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { fmtDate, tocFromHtml } from "@/lib/format";

export async function legalMetadata(slug: string) {
  const d = await getLegal(slug);
  if (!d) return {};
  return buildMetadata({ title: d.seo.title || `${d.title} | ASK Technology`, description: d.seo.description || d.summary, path: `/${slug}`, noindex: d.seo.noindex });
}

/** Shared layout for privacy, terms, cookies, disclaimer, grievance, security and accessibility pages. */
export async function LegalPage({ slug }: { slug: string }) {
  const [s, d] = await Promise.all([getSettings(), getLegal(slug)]);
  if (!d) notFound();
  const toc = d.body.html ? tocFromHtml(d.body.html) : [];
  return (
    <>
      <PageHero s={s} crumbs={[{ name: d.title, path: `/${slug}` }]} eyebrow="Legal" title={d.title} lead={d.summary} small>
        <p className="small mt-m">Last updated <time dateTime={d.updated}>{fmtDate(d.updated)}</time></p>
      </PageHero>
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className={toc.length > 2 ? "doc-grid" : "legal"}>
            <Prose body={d.body} s={s} />
            {toc.length > 2 && (
              <aside className="toc" aria-label="On this page">
                <b>On this page</b>
                <ol>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}</ol>
              </aside>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
