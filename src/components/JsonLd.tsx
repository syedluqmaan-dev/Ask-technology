/** Renders one or more JSON-LD blocks. Null entries are skipped. "<" is escaped so content can never break out of the script tag. */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!list.length) return null;
  const json = JSON.stringify(list.length === 1 ? list[0] : list, (_k, v) => (v === undefined ? undefined : v)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
