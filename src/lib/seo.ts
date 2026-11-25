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
export function buildMetadata(m: MetaInput): Metadata {
  const url = `${SITE_URL}${m.path === "/" ? "" : m.path}`;
  const description = truncate(m.description, 160);
  const images = [{ url: m.image || "/opengraph-image.png", width: 1200, height: 630, alt: m.imageAlt || m.title }];
  return {
    title: { absolute: m.title },
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
