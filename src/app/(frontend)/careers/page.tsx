import Link from "next/link";
import { CareersForm } from "@/components/CareersForm";
import { Arrow, Check } from "@/components/Icon";
import { Accent, Crumbs } from "@/components/ui";
import { getCareersPage, getJobs, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const c = await getCareersPage();
  return buildMetadata({ title: c.seo.title, description: c.seo.description, path: "/careers" });
}

export default async function CareersPage() {
  const [s, c, jobs] = await Promise.all([getSettings(), getCareersPage(), getJobs()]);
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Crumbs s={s} items={[{ name: "Careers", path: "/careers" }]} />
          <p className="eyebrow">Careers</p>
          <h1 className="h1" style={{ maxWidth: 820 }}><Accent text={c.title} accent={c.accent} /></h1>
          <p className="lead" style={{ marginTop: 22, maxWidth: 700 }}>{c.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap split top">
          <div>
            <h2 className="h2" style={{ fontSize: 34 }}>Why join us</h2>
            <ul className="ticklist" style={{ marginTop: 22, fontSize: 16.5 }}>
              {c.why.map((x) => <li key={x}><Check />{x}</li>)}
            </ul>
            <div className="card" style={{ marginTop: 32 }} id="openings">
              <b>Open roles</b>
              {jobs.length ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 10 }}>
                  {jobs.map((j) => (
                    <Link key={j.slug} className="mega-link job-row" href={`/careers/${j.slug}`} style={{ padding: "12px 0" }}>
                      <span><b>{j.title}</b><span>{j.department} · {j.location}{j.experience ? ` · ${j.experience}` : ""}</span></span>
                      <Arrow />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="body" style={{ marginTop: 6 }}>There are no open roles listed right now.</p>
              )}
              <p className="body" style={{ marginTop: 12 }}>Don&apos;t see a suitable position? Send your resume to <a href={`mailto:${s.hrEmail}`}>{s.hrEmail}</a>.</p>
            </div>
          </div>
          <div>
            <h2 className="h3" style={{ fontSize: 24, marginBottom: 16 }}>Apply now</h2>
            <CareersForm roles={jobs.map((j) => j.title)} />
          </div>
        </div>
      </section>
    </>
  );
}
