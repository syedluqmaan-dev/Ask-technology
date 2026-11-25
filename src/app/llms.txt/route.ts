import { getCaseStudies, getCountries, getGlossary, getIndustries, getPosts, getProducts, getSettings, getSolutions } from "@/lib/cms";
import { fullAddress } from "@/lib/format";

export const revalidate = 3600;

/** llms.txt: a plain summary of the site for AI assistants (GEO). See https://llmstxt.org */
export async function GET() {
  const [s, products, solutions, industries, countries, cases, posts, terms] = await Promise.all([
    getSettings(), getProducts(), getSolutions(), getIndustries(), getCountries(), getCaseStudies(), getPosts(), getGlossary(),
  ]);
  const u = s.url;
  const withResults = cases.filter((c) => c.results?.length);
  const txt = `# ${s.name}

> ${s.description}

Key facts:
- Company: ${s.name}, a software company based in ${s.address.city}, India.
- Main product: TARGET 360, garment ERP software for apparel manufacturers, exporters, buying houses and fashion brands.
- Markets served: India, United Arab Emirates (Dubai), United Kingdom, Bangladesh and Sri Lanka.
- Founder and CEO: Mohammed Salahuddin.
- Contact: ${s.email}, ${s.phone}. Office: ${fullAddress(s)}.
- Published customer stories: ${cases.length}.${withResults.length ? ` Reported results include ${withResults.map((c) => `${c.client} (${c.results!.map((r) => `${r.value} ${r.label.toLowerCase()}`).join(", ")})`).join("; ")}.` : ""}

## Products
${products.map((p) => `- [${p.name}](${u}/products/${p.slug}): ${p.answer}`).join("\n")}
- [TARGET 360 AI](${u}/ai-solution): AI inside the ERP that converts buyer techpacks into BOMs, schedules production, flags late orders and checks margin before quoting.

## Solutions
${solutions.map((x) => `- [${x.h1}](${u}/solutions/${x.slug}): ${x.answer}`).join("\n")}

## Industries
${industries.map((x) => `- [${x.h1}](${u}/industries/${x.slug})`).join("\n")}

## Where we work
${countries.map((c) => `- [${c.h1}](${u}/locations/${c.slug})`).join("\n")}

## Customer stories
${cases.map((c) => `- [${c.title}](${u}/case-studies/${c.slug})`).join("\n")}

## Guides and articles
${posts.slice(0, 40).map((p) => `- [${p.title}](${u}/insights/${p.slug})`).join("\n")}

## Glossary
${terms.map((t) => `- [${t.term}](${u}/glossary/${t.slug})`).join("\n")}

## Optional
- [Full text for AI assistants](${u}/llms-full.txt)
- [About ASK Technology](${u}/about)
- [Frequently asked questions](${u}/faqs)
- [Book a demo](${u}/book-a-demo)
- [Contact](${u}/contact)
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
