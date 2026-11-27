import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, PostCard } from "@/components/ui";
import { DemoBand } from "@/components/Footer";
import { getCategories, getPosts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const c = (await getCategories()).find((x) => x.slug === slug);
  if (!c) return {};
  const count = (await getPosts()).filter((p) => p.categorySlug === slug).length;
  return buildMetadata({ title: `${c.name}: Articles for Garment Businesses`, description: c.description, path: `/insights/category/${slug}`, noindex: count === 0 });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [s, cats, posts] = await Promise.all([getSettings(), getCategories(), getPosts()]);
  const c = cats.find((x) => x.slug === slug);
  if (!c) notFound();
  const list = posts.filter((p) => p.categorySlug === slug);
  const used = cats.filter((x) => posts.some((p) => p.categorySlug === x.slug));
  return (
    <>
      <PageHero s={s} crumbs={[{ name: "Insights", path: "/insights" }, { name: c.name, path: `/insights/category/${c.slug}` }]} eyebrow="Insights" title={c.name} lead={c.description} />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <h2 className="sr-only">{c.name} articles</h2>
          <div className="filter-row">
            <nav className="tabs" aria-label="Topics" style={{ marginBottom: 0 }}>
              <Link className="tab" href="/insights" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>All</Link>
              {used.map((x) => (
                <Link key={x.slug} className="tab" href={`/insights/category/${x.slug}`} aria-pressed={x.slug === slug} aria-current={x.slug === slug ? "page" : undefined} style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>{x.name}</Link>
              ))}
            </nav>
            <span className="small">{list.length} articles</span>
          </div>
          {list.length ? <div className="grid g3">{list.map((p) => <div key={p.slug} style={{ display: "grid" }}><PostCard p={p} /></div>)}</div> : <p className="empty">New articles in this category are on the way.</p>}
        </div>
      </section>
      <DemoBand />
    </>
  );
}
