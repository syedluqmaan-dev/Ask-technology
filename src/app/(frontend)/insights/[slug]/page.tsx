import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumbs, FaqSection, Img, PostCard } from "@/components/ui";
import { DemoBand } from "@/components/Footer";
import { Arrow } from "@/components/Icon";
import { Prose } from "@/components/Prose";
import { JsonLd } from "@/components/JsonLd";
import { getPost, getPosts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { article } from "@/lib/schema";
import { fmtDate, tocFromHtml } from "@/lib/format";
import { normalizeHeadings } from "@/lib/headings";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({
    title: p.seo.title || p.title,
    description: p.seo.description || p.excerpt,
    path: `/insights/${p.slug}`,
    image: p.seo.image || p.image,
    imageAlt: p.imageAlt,
    noindex: p.seo.noindex,
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.updated,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [s, p, all] = await Promise.all([getSettings(), getPost(slug), getPosts()]);
  if (!p) notFound();
  const html = normalizeHeadings(p.body).html;
  const toc = html ? tocFromHtml(html) : [];
  const related = all.filter((x) => x.slug !== p.slug && x.categorySlug === p.categorySlug).slice(0, 3);
  const more = related.length >= 3 ? related : [...related, ...all.filter((x) => x.slug !== p.slug && !related.includes(x))].slice(0, 3);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Crumbs s={s} items={[{ name: "Insights", path: "/insights" }, ...(p.categorySlug ? [{ name: p.category, path: `/insights/category/${p.categorySlug}` }] : []), { name: p.title, path: `/insights/${p.slug}` }]} />
          <div style={{ maxWidth: 900 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
              {p.categorySlug ? <Link className="badge" href={`/insights/category/${p.categorySlug}`} style={{ textDecoration: "none" }}>{p.category}</Link> : <span className="badge">{p.category}</span>}
              <time className="small" dateTime={p.date}>{fmtDate(p.date)}</time>
              <span className="small">· {p.readMinutes} min read</span>
            </div>
            <h1 className="h1" style={{ fontSize: "clamp(32px,3.8vw,50px)" }}>{p.title}</h1>
            <div className="byline">
              <span>By <b>{p.author}</b></span>
              {p.updated && p.updated !== p.date && <span>Updated <time dateTime={p.updated}>{fmtDate(p.updated)}</time></span>}
            </div>
          </div>
          {p.image && <div className="post-cover"><Img src={p.image} alt={p.imageAlt || p.title} width={1200} height={600} priority sizes="(max-width: 1240px) 100vw, 1160px" /></div>}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap">
          <div className={toc.length ? "doc-grid" : ""}>
            <Prose body={p.body} />
            {toc.length > 0 && (
              <aside className="toc" aria-label="On this page">
                <b>On this page</b>
                <ol>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}</ol>
                <Link className="btn btn-primary btn-sm mt-l" href="/book-a-demo">Book a demo</Link>
              </aside>
            )}
          </div>
        </div>
      </section>

      {p.faqs && p.faqs.length > 0 && <FaqSection s={s} faqs={p.faqs} title="Questions about this topic" tint />}

      {more.length > 0 && (
        <section className={`section${p.faqs?.length ? "" : " bg-tint"}`}>
          <div className="wrap">
            <div className="head-row"><h2 className="h2">Keep reading</h2><Link className="btn btn-ghost" href="/insights">All articles <Arrow /></Link></div>
            <div className="grid g3">{more.map((x) => <div key={x.slug} style={{ display: "grid" }}><PostCard p={x} /></div>)}</div>
          </div>
        </section>
      )}

      <div style={{ height: 112 }} />
      <DemoBand title="Put this into practice with TARGET 360" />
      <JsonLd data={article(s, p)} />
    </>
  );
}
