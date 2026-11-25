import Link from "next/link";
import { DemoBand } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/Icon";
import { PageHero } from "@/components/ui";
import { getCities, getCountries, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { itemList } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Garment ERP in India, Dubai, UK, Bangladesh, Sri Lanka",
  description: "TARGET 360 garment ERP for apparel businesses in India, the UAE, the United Kingdom, Bangladesh and Sri Lanka, with local cluster pages.",
  path: "/locations",
});

export default async function LocationsPage() {
  const [s, countries, cities] = await Promise.all([getSettings(), getCountries(), getCities()]);
  return (
    <>
      <PageHero
        s={s}
        crumbs={[{ name: "Where we work", path: "/locations" }]}
        eyebrow="Where we work"
        title={<>Where garment businesses use <span className="grad-text">TARGET 360</span></>}
        lead="Our team implements and supports TARGET 360 for apparel businesses across South Asia, the Gulf and the UK."
      />
      {countries.map((c, i) => {
        const list = cities.filter((x) => x.country === c.slug);
        return (
          <section key={c.slug} className={`section sm${i % 2 ? " bg-tint" : ""}`} aria-labelledby={`c-${c.slug}`}>
            <div className="wrap">
              <Reveal className="head-row" style={{ marginBottom: 28 }}>
                <h2 className="h2" id={`c-${c.slug}`} style={{ fontSize: "clamp(26px,3vw,36px)" }}>{c.h1}</h2>
                <Link className="btn btn-ghost btn-sm" href={`/locations/${c.slug}`}>{c.name} overview <Arrow /></Link>
              </Reveal>
              <ul className="places">
                {list.map((x) => <li key={x.slug}><Link href={`/locations/${c.slug}/${x.slug}`}>{x.name}<span>{x.region}</span></Link></li>)}
              </ul>
            </div>
          </section>
        );
      })}
      <div style={{ height: 112 }} />
      <DemoBand title="Wherever your factories are" text="TARGET 360 runs in the cloud, so office, factory and buyers work in one system across countries." />
      <JsonLd data={itemList(s, "Locations", countries.map((c) => ({ name: c.name, path: `/locations/${c.slug}` })))} />
    </>
  );
}
