import type { Settings } from "./types";

export const fmtDate = (iso: string) => {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
};

export const isoDate = (iso: string) => {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");

/** Text area in the CMS → list of lines. */
export const lines = (v: unknown): string[] =>
  Array.isArray(v)
    ? v.map((x) => (typeof x === "string" ? x : (x as { text?: string })?.text || "")).filter(Boolean)
    : typeof v === "string"
      ? v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
      : [];

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const waHref = (num: string, text?: string) =>
  `https://wa.me/${num.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const fullAddress = (s: Settings) =>
  [s.address.street, s.address.city, `${s.address.region} ${s.address.postalCode}`, "India"].filter(Boolean).join(", ");

/** Replace {{tokens}} in legal pages with live settings. */
export function fillTokens(text: string, s: Settings): string {
  const map: Record<string, string> = {
    company: s.company.registeredName || s.legalName,
    brand: s.name,
    site: s.url.replace(/^https?:\/\//, ""),
    address: fullAddress(s),
    email: s.email,
    phone: s.phone,
    grievanceName: s.grievance.name,
    grievanceEmail: s.grievance.email,
    grievanceAddress: s.grievance.address,
  };
  return text.replace(/\{\{(\w+)\}\}/g, (m, k: string) => map[k] ?? m);
}

export const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s);

export const absUrl = (base: string, path = "/") => (/^https?:\/\//.test(path) ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`);

/** Headings (h2 with id) from HTML, for the table of contents. */
export const tocFromHtml = (html: string) =>
  [...html.matchAll(/<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/g)].map((m) => ({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") }));
