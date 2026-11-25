import { FaqSection, PageHero } from "@/components/ui";
import { DemoBand } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getAiPage, getHome, getProducts, getSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { faqPage } from "@/lib/schema";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "TARGET 360 Garment ERP FAQs | ASK Technology",
  description: "Answers about TARGET 360 garment ERP: products, who it is for, cloud and offline use, implementation, AI features and pricing.",
  path: "/faqs",
});

const general = [
  { q: "How long does it take to implement TARGET 360?", a: "It depends on the products, the number of units and how much data you bring across. We agree the timeline during discovery, configure TARGET 360 to your process, test with your real orders and train every role before go-live." },
  { q: "Do you provide training and support?", a: "Yes. Training for every role is part of the implementation, and our team supports you after go-live with updates and help when you need it." },
  { q: "Can we move our data from Excel?", a: "Yes. Masters such as buyers, suppliers, items and styles can be imported from Excel, and reports can be exported back to Excel." },
  { q: "Is our data secure?", a: "Access inside TARGET 360 is controlled by role, so each user sees only what they need. Ask our team for the hosting, backup and data protection terms for your deployment." },
];

export default async function FaqsPage() {
  const [s, home, products, ai] = await Promise.all([getSettings(), getHome(), getProducts(), getAiPage()]);
  const groups = [
    { title: "About TARGET 360", faqs: home.faqs },
    { title: "Implementation and support", faqs: general },
    ...products.map((p) => ({ title: p.name, faqs: p.faqs })),
    { title: "TARGET 360 AI", faqs: ai.faqs },
  ].filter((g) => g.faqs.length);
  return (
    <>
      <PageHero s={s} crumbs={[{ name: "FAQs", path: "/faqs" }]} eyebrow="FAQs" title={<>Frequently asked <span className="grad-text">questions</span></>} lead="Everything garment businesses usually ask us about TARGET 360, in one place." />
      {groups.map((g, i) => <FaqSection key={g.title} s={s} faqs={g.faqs} title={g.title} tint={i % 2 === 1} withSchema={false} id={`faq-${i}`} />)}
      <div style={{ height: groups.length % 2 === 0 ? 112 : 0 }} />
      <DemoBand title="Still have a question?" text="Ask a specialist. We reply within one working day." />
      <JsonLd data={faqPage(groups.flatMap((g) => g.faqs))} />
    </>
  );
}
