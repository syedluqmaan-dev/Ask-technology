import { getAiPage, getGlossary, getHome, getProducts, getSettings, getSolutions } from "@/lib/cms";

export const revalidate = 3600;

/** Full plain-text content of the key pages, so AI assistants can answer accurately about ASK Technology and TARGET 360. */
export async function GET() {
  const [s, home, products, solutions, terms, ai] = await Promise.all([getSettings(), getHome(), getProducts(), getSolutions(), getGlossary(), getAiPage()]);
  const u = s.url;
  const faq = (f: { q: string; a: string }[]) => f.map((x) => `Q: ${x.q}\nA: ${x.a}`).join("\n\n");
  const parts: string[] = [
    `# ${s.name}: full reference\n\n${s.description}\n\nWebsite: ${u}\nEmail: ${s.email}\nPhone: ${s.phone}\n`,
    `## About TARGET 360\n\n${faq(home.faqs)}`,
    ...products.map(
      (p) =>
        `## ${p.name}\nURL: ${u}/products/${p.slug}\nFor: ${p.audienceLabel}\n\n${p.answer}\n\n${p.intro}\n\nFeatures:\n${p.features.map((f) => `- ${f.title}: ${f.text}`).join("\n")}${p.faqs.length ? `\n\n${faq(p.faqs)}` : ""}`,
    ),
    `## TARGET 360 AI\nURL: ${u}/ai-solution\n\n${ai.lead}\n\n${ai.features.map((f) => `- ${f.title}: ${f.text} (${f.points.join("; ")})`).join("\n")}\n\n${faq(ai.faqs)}`,
    ...solutions.map(
      (x) => `## ${x.h1}\nURL: ${u}/solutions/${x.slug}\n\n${x.answer}\n\nCapabilities:\n${x.capabilities.map((c) => `- ${c.title}: ${c.text}`).join("\n")}\n\n${faq(x.faqs)}`,
    ),
    `## Garment industry glossary\n\n${terms.map((t) => `### ${t.term}\n${t.short}\n${t.body.join("\n")}`).join("\n\n")}`,
  ];
  return new Response(parts.join("\n\n---\n\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
