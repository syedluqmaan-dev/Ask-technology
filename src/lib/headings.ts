import type { Rich } from "./types";

/**
 * Article bodies sit under the page's H1, so their headings must start at H2 and never skip a level.
 * Imported and pasted articles often start at H3 or jump H3 → H5. This renumbers headings in reading
 * order so the first is H2 and none sits more than one level below the previous one, which keeps the
 * outline valid for search engines, AI answer engines and screen readers without editing the article.
 */
function sequence(levels: number[]): number[] {
  const used = [...new Set(levels)].sort((a, b) => a - b);
  const rank = new Map(used.map((l, i) => [l, 2 + i]));
  let prev = 1;
  return levels.map((l) => (prev = Math.min(rank.get(l)!, prev + 1, 6)));
}

type LexNode = { type?: string; tag?: string; text?: string; children?: LexNode[] };

function walk(node: LexNode, fn: (n: LexNode) => void) {
  fn(node);
  node.children?.forEach((c) => walk(c, fn));
}

const lexText = (n: LexNode): string => (n.text || "") + (n.children || []).map(lexText).join("");

export function normalizeHeadings(body: Rich): Rich {
  if (body.lexical && typeof body.lexical === "object") {
    const data = structuredClone(body.lexical) as { root?: LexNode };
    if (!data.root) return body;
    // Empty headings render as blank <h2></h2> tags: drop them.
    walk(data.root, (n) => { if (n.children) n.children = n.children.filter((c) => !(c.type === "heading" && !lexText(c).trim())); });
    const heads: LexNode[] = [];
    walk(data.root, (n) => { if (n.type === "heading" && n.tag) heads.push(n); });
    if (!heads.length) return { ...body, lexical: data };
    const next = sequence(heads.map((h) => Number(h.tag!.slice(1))));
    heads.forEach((h, i) => { h.tag = `h${next[i]}`; });
    return { ...body, lexical: data };
  }
  if (body.html) {
    const html = body.html.replace(/<h([1-6])\b[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/h\1>/gi, "");
    const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
    if (!levels.length) return { ...body, html };
    const next = sequence(levels);
    let open = 0;
    const stack: number[] = [];
    const out = html.replace(/<(\/?)h([1-6])\b/gi, (_, slash) => {
      if (slash) return `</h${stack.pop() ?? 2}`;
      const l = next[open++]; stack.push(l); return `<h${l}`;
    });
    return { ...body, html: out };
  }
  return body;
}
