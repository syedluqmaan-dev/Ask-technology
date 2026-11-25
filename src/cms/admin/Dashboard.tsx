import React from "react";
import type { Payload } from "payload";

type Props = { payload?: Payload; user?: { name?: string; role?: string; modules?: string[] } | null };

type Tile = { href: string; title: string; text: string; module: string };

const tiles: Tile[] = [
  { href: "/admin/collections/leads", title: "Leads", text: "Enquiries from every form", module: "leads" },
  { href: "/admin/collections/bookings", title: "Demo bookings", text: "From the booking calendar", module: "leads" },
  { href: "/admin/globals/home-page", title: "Home page", text: "Hero, sections and FAQ", module: "website" },
  { href: "/admin/collections/products", title: "Products", text: "TARGET 360 product pages", module: "products" },
  { href: "/admin/collections/solutions", title: "Solution pages", text: "Costing, PPC, SMV and more", module: "products" },
  { href: "/admin/collections/posts", title: "Articles", text: "Blog and guides", module: "blog" },
  { href: "/admin/collections/case-studies", title: "Customer stories", text: "Results and logos", module: "customers" },
  { href: "/admin/collections/cities", title: "Location pages", text: "Countries and cities", module: "locations" },
  { href: "/admin/collections/glossary", title: "Glossary", text: "Garment terms explained", module: "glossary" },
  { href: "/admin/collections/jobs", title: "Job openings", text: "Careers and applications", module: "careers" },
  { href: "/admin/collections/media", title: "Media library", text: "Images and screenshots", module: "website" },
  { href: "/admin/globals/site-settings", title: "Site settings", text: "Contact, tracking, booking", module: "settings" },
];

async function count(payload: Payload | undefined, collection: string, where?: Record<string, unknown>) {
  if (!payload) return null;
  try {
    const r = await payload.count({ collection: collection as never, where: where as never, overrideAccess: true });
    return r.totalDocs;
  } catch {
    return null;
  }
}

/** CMS home screen: today's numbers and one tile per module the person can use. */
export async function Dashboard({ payload, user }: Props) {
  const can = (m: string) => user?.role === "admin" || (user?.modules || []).includes(m);
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const now = new Date().toISOString();

  const [newLeads, weekLeads, upcoming, articles] = await Promise.all([
    can("leads") ? count(payload, "leads", { status: { equals: "new" } }) : null,
    can("leads") ? count(payload, "leads", { createdAt: { greater_than: weekAgo } }) : null,
    can("leads") ? count(payload, "bookings", { and: [{ start: { greater_than: now } }, { status: { not_equals: "cancelled" } }] }) : null,
    can("blog") ? count(payload, "posts", { _status: { equals: "published" } }) : null,
  ]);

  const stats = [
    { label: "New leads to contact", value: newLeads, href: "/admin/collections/leads?where[status][equals]=new" },
    { label: "Leads in the last 7 days", value: weekLeads, href: "/admin/collections/leads" },
    { label: "Upcoming demos", value: upcoming, href: "/admin/collections/bookings" },
    { label: "Published articles", value: articles, href: "/admin/collections/posts" },
  ].filter((s) => s.value !== null);

  const first = (user?.name || "").split(" ")[0];

  return (
    <div className="ask-dash">
      <div className="ask-dash-head">
        <h1>{first ? `Hello, ${first}` : "Welcome"}</h1>
        <p>Changes you publish appear on asktek.net within seconds.</p>
      </div>
      {stats.length > 0 && (
        <div className="ask-stats">
          {stats.map((s) => (
            <a key={s.label} className="ask-stat" href={s.href}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      )}
      <div className="ask-tiles">
        {tiles.filter((t) => can(t.module)).map((t) => (
          <a key={t.href} className="ask-tile" href={t.href}>
            <b>{t.title}</b>
            <span>{t.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
