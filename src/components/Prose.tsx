import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { Rich, Settings } from "@/lib/types";
import { fillTokens } from "@/lib/format";

/** Article and legal body: Lexical JSON from the CMS, or HTML from the built-in defaults. Fills {{tokens}} from settings. */
export function Prose({ body, s }: { body: Rich; s?: Settings }) {
  if (body.lexical) {
    const data = s ? (JSON.parse(fillTokens(JSON.stringify(body.lexical), s)) as SerializedEditorState) : (body.lexical as SerializedEditorState);
    return (
      <div className="article">
        <RichText data={data} />
      </div>
    );
  }
  if (body.html) {
    return <div className="article" dangerouslySetInnerHTML={{ __html: s ? fillTokens(body.html, s) : body.html }} />;
  }
  return null;
}
