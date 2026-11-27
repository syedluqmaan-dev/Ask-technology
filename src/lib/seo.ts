import type { Metadata } from "next";
import { settings as defaults } from "@/content/settings";
import { truncate } from "./format";

export const SITE_URL = defaults.url;

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

/**
 * One place that builds every page's metadata: unique title, description, self-canonical,
 * Open Graph and X cards, and robots rules. Titles are used as written (no template),
 * so each can carry its own keyword in the first 60 characters.
 */
/**
 * Search results cut titles at about 60 characters. Long titles (mostly imported blog posts) are shortened
 * to the phrase before a colon or dash when that still says enough, otherwise at a word boundary.
 * The full title is kept for social cards, which have more room.
 */
export function fitTitle(title: string, max = 60): string {
  const t = title.trim().replace(/[.!]+$/, "");
  if (t.length <= max) return t;
  const q = t.indexOf("? ");
  if (q >= 23 && q < max) return t.slice(0, q + 1);
  const head = t.split(/\s*(?::|\s[–—|-]\s)\s*/)[0];
  if (head.length >= 24 && head.length <= max) return head;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,:;–—-]+$/, "")}…`;
}

/** Descriptions under ~70 characters look thin in results; add brand context instead of leaving them short. */
function fitDescription(d: string): string {
  const t = d.trim();
  if (t.length >= 70) return truncate(t, 160);
  return truncate(`${t.replace(/[.\s]*$/, ".")} Garment ERP insights from ASK Technology, makers of TARGET 360.`, 160);
}

export function buildMetadata(m: MetaInput): Metadata {
  const url = `${SITE_URL}${m.path === "/" ? "" : m.path}`;
  const description = fitDescription(m.description);
  const images = [{ url: m.image || "/opengraph-image.png", width: 1200, height: 630, alt: m.imageAlt || m.title }];
  return {
    title: { absolute: fitTitle(m.title) },
    description,
    keywords: m.keywords?.length ? m.keywords : undefined,
    alternates: { canonical: url },
    robots: m.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type: m.type || "website",
      url,
      siteName: "ASK Technology",
      locale: "en_IN",
      title: m.title,
      description,
      images,
      ...(m.type === "article" ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime || m.publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: m.title, description, images: images.map((i) => i.url) },
  };
}
