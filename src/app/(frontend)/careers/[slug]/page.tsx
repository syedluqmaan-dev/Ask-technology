import { notFound } from "next/navigation";
import { PageHero, Ticks } from "@/components/ui";
import { CareersForm } from "@/components/CareersForm";
import { JsonLd } from "@/components/JsonLd";
import { getJob, getJobs, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { jobPosting } from "@/lib/schema";
import { fmtDate } from "@/lib/format";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getJobs()).map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props) {
  const j = await getJob((await params).slug);
  if (!j) return {};
  return buildMetadata({ title: `${j.title}, ${j.location} | ASK Technology Careers`, description: j.summary, path: `/careers/${j.slug}` });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const [s, j, jobs] = await Promise.all([getSettings(), getJob(slug), getJobs()]);
  if (!j) notFound();
  return (
    <>
      <PageHero s={s} crumbs={[{ name: "Careers", path: "/careers" }, { name: j.title, path: `/careers/${j.slug}` }]} eyebrow="Careers" title={j.title} lead={j.summary} small>
        <div className="byline"><span><b>{j.department}</b></span><span>{j.location}</span>{j.experience && <span>{j.experience}</span>}<span>Posted <time dateTime={j.datePosted}>{fmtDate(j.datePosted)}</time></span></div>
      </PageHero>
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap split top">
          <div>
            {j.responsibilities.length > 0 && <><h2 className="h2" style={{ fontSize: 30 }}>What you will do</h2><div className="mt-m"><Ticks items={j.responsibilities} /></div></>}
            {j.requirements.length > 0 && <><h2 className="h2" style={{ fontSize: 30, marginTop: 48 }}>What we are looking for</h2><div className="mt-m"><Ticks items={j.requirements} /></div></>}
          </div>
          <div>
            <h2 className="h3" style={{ fontSize: 24, marginBottom: 16 }}>Apply for this role</h2>
            <CareersForm roles={jobs.map((x) => x.title)} defaultRole={j.title} />
          </div>
        </div>
      </section>
      <JsonLd data={jobPosting(s, j)} />
    </>
  );
}
