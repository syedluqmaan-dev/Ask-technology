import React from "react";
import type { Payload, PayloadRequest } from "payload";

type User = { name?: string; email?: string; role?: string; modules?: string[] } | null | undefined;
type Props = { payload?: Payload; user?: User; initPageResult?: { req?: PayloadRequest } };

type App = { href: string; emoji: string; title: string; text: string; module: string; tone: Tone };
type Tone = "blue" | "green" | "yellow" | "red" | "purple" | "teal" | "orange" | "pink";

const apps: App[] = [
  { href: "/admin/globals/home-page", emoji: "🏠", title: "Home page", text: "Hero, sections, FAQ", module: "website", tone: "blue" },
  { href: "/admin/collections/products", emoji: "📦", title: "Products", text: "TARGET 360 product pages", module: "products", tone: "purple" },
  { href: "/admin/collections/posts", emoji: "📝", title: "Articles", text: "Blog and guides", module: "blog", tone: "green" },
  { href: "/admin/collections/case-studies", emoji: "🏆", title: "Customer stories", text: "Results that sell", module: "customers", tone: "yellow" },
  { href: "/admin/collections/clients", emoji: "🏢", title: "Client logos", text: "Home and About pages", module: "customers", tone: "teal" },
  { href: "/admin/collections/testimonials", emoji: "💬", title: "Testimonials", text: "Customer quotes", module: "customers", tone: "pink" },
  { href: "/admin/collections/solutions", emoji: "🧩", title: "Solutions", text: "Costing, PPC, SMV…", module: "products", tone: "orange" },
  { href: "/admin/collections/industries", emoji: "🏭", title: "Industries", text: "Knit, woven, buying houses", module: "products", tone: "red" },
  { href: "/admin/collections/cities", emoji: "🏙️", title: "Locations", text: "Countries and cities", module: "locations", tone: "blue" },
  { href: "/admin/collections/glossary", emoji: "📖", title: "Glossary", text: "Garment terms explained", module: "glossary", tone: "green" },
  { href: "/admin/collections/jobs", emoji: "💼", title: "Careers", text: "Job openings", module: "careers", tone: "purple" },
  { href: "/admin/collections/leads", emoji: "📥", title: "Leads", text: "Every enquiry, in one place", module: "leads", tone: "red" },
  { href: "/admin/collections/bookings", emoji: "📅", title: "Demo bookings", text: "From the calendar", module: "leads", tone: "yellow" },
  { href: "/admin/collections/media", emoji: "🖼️", title: "Media library", text: "Images and screenshots", module: "website", tone: "teal" },
  { href: "/admin/collections/documents", emoji: "📑", title: "Brochures", text: "PDF downloads", module: "settings", tone: "orange" },
  { href: "/admin/globals/site-settings", emoji: "⚙️", title: "Site settings", text: "Contact, tracking, booking", module: "settings", tone: "pink" },
];

const quick = [
  { href: "/admin/collections/posts/create", emoji: "✍️", label: "Write an article", module: "blog" },
  { href: "/admin/collections/media/create", emoji: "🖼️", label: "Upload an image", module: "website" },
  { href: "/admin/collections/clients/create", emoji: "🏢", label: "Add a client logo", module: "customers" },
  { href: "/admin/collections/testimonials/create", emoji: "💬", label: "Add a testimonial", module: "customers" },
  { href: "/admin/collections/jobs/create", emoji: "💼", label: "Post a job", module: "careers" },
];

async function count(payload: Payload, collection: string, where?: Record<string, unknown>) {
  try {
    return (await payload.count({ collection: collection as never, where: where as never, overrideAccess: true })).totalDocs;
  } catch {
    return null;
  }
}

type Recent = { title: string; href: string; emoji: string; kind: string; at: string; status?: string };

async function recent(payload: Payload, can: (m: string) => boolean): Promise<Recent[]> {
  const sources = [
    { c: "posts", f: "title", emoji: "📝", kind: "Article", m: "blog" },
    { c: "case-studies", f: "client", emoji: "🏆", kind: "Customer story", m: "customers" },
    { c: "products", f: "name", emoji: "📦", kind: "Product", m: "products" },
    { c: "testimonials", f: "name", emoji: "💬", kind: "Testimonial", m: "customers" },
    { c: "clients", f: "name", emoji: "🏢", kind: "Client logo", m: "customers" },
    { c: "jobs", f: "title", emoji: "💼", kind: "Job", m: "careers" },
  ].filter((s) => can(s.m));
  const lists = await Promise.all(
    sources.map(async (s) => {
      try {
        const r = await payload.find({ collection: s.c as never, sort: "-updatedAt", limit: 6, depth: 0, overrideAccess: true, draft: true });
        return (r.docs as Record<string, unknown>[]).map((d) => ({
          title: String(d[s.f] || "Untitled"),
          href: `/admin/collections/${s.c}/${d.id}`,
          emoji: s.emoji,
          kind: s.kind,
          at: String(d.updatedAt || ""),
          status: typeof d._status === "string" ? d._status : undefined,
        }));
      } catch {
        return [];
      }
    }),
  );
  return lists.flat().sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);
}

const ago = (iso: string) => {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} day${d > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const fmt = (n: number | null) => (n === null ? "–" : n.toLocaleString("en-IN"));

/** CMS home: greeting, quick actions, today's numbers, apps, recent edits and a setup checklist. */
export async function Dashboard(props: Props) {
  const payload = props.payload ?? props.initPageResult?.req?.payload;
  const user = (props.user ?? props.initPageResult?.req?.user) as User;
  if (!payload) return null;

  const can = (m: string) => user?.role === "admin" || (user?.modules || []).includes(m);
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();
  const now = new Date().toISOString();

  const [newLeads, weekLeads, upcoming, articles, stories, logos, quotes, cities, recentItems, settings] = await Promise.all([
    can("leads") ? count(payload, "leads", { status: { equals: "new" } }) : null,
    can("leads") ? count(payload, "leads", { createdAt: { greater_than: weekAgo } }) : null,
    can("leads") ? count(payload, "bookings", { and: [{ start: { greater_than: now } }, { status: { not_equals: "cancelled" } }] }) : null,
    can("blog") ? count(payload, "posts", { _status: { equals: "published" } }) : null,
    can("customers") ? count(payload, "case-studies", { _status: { equals: "published" } }) : null,
    can("customers") ? count(payload, "clients", { _status: { equals: "published" } }) : null,
    can("customers") ? count(payload, "testimonials", { _status: { equals: "published" } }) : null,
    can("locations") ? count(payload, "cities", { _status: { equals: "published" } }) : null,
    recent(payload, can),
    can("settings") ? payload.findGlobal({ slug: "site-settings" as never, depth: 0, overrideAccess: true }).catch(() => null) : Promise.resolve(null),
  ]);

  const stats = [
    { emoji: "📥", label: "New leads to call", value: newLeads, href: "/admin/collections/leads?where[status][equals]=new", tone: "red" },
    { emoji: "📈", label: "Leads this week", value: weekLeads, href: "/admin/collections/leads", tone: "green" },
    { emoji: "📅", label: "Upcoming demos", value: upcoming, href: "/admin/collections/bookings", tone: "yellow" },
    { emoji: "📝", label: "Live articles", value: articles, href: "/admin/collections/posts", tone: "blue" },
    { emoji: "🏆", label: "Customer stories", value: stories, href: "/admin/collections/case-studies", tone: "purple" },
    { emoji: "🏢", label: "Client logos", value: logos, href: "/admin/collections/clients", tone: "teal" },
    { emoji: "💬", label: "Testimonials", value: quotes, href: "/admin/collections/testimonials", tone: "pink" },
    { emoji: "🏙️", label: "City pages", value: cities, href: "/admin/collections/cities", tone: "orange" },
  ].filter((s) => s.value !== null);

  const s = (settings || {}) as Record<string, unknown> & {
    calLink?: string; gtmId?: string; googleVerification?: string;
    brochure?: { file?: unknown; fileUrl?: string }; company?: { cin?: string; gstin?: string }; grievance?: { name?: string };
  };
  const checklist = settings
    ? [
        { ok: !!process.env.RESEND_API_KEY, emoji: "✉️", label: "Form emails (Resend)", hint: "Add RESEND_API_KEY in Vercel" },
        { ok: !!s.calLink, emoji: "📅", label: "Demo booking calendar", hint: "Site settings → Integrations" },
        { ok: !!(s.brochure?.file || s.brochure?.fileUrl), emoji: "📑", label: "Brochure download", hint: "Site settings → Trust and brochure" },
        { ok: !!s.gtmId, emoji: "📊", label: "Google Tag Manager", hint: "Site settings → Integrations" },
        { ok: !!s.googleVerification, emoji: "🔎", label: "Google Search Console", hint: "Site settings → Integrations" },
        { ok: !!(s.company?.cin || s.company?.gstin), emoji: "🧾", label: "Company CIN / GSTIN", hint: "Site settings → Company" },
        { ok: !!s.grievance?.name, emoji: "🛡️", label: "Grievance Officer", hint: "Site settings → Contact" },
        { ok: !!process.env.TURNSTILE_SECRET_KEY, emoji: "🤖", label: "Spam protection (Turnstile)", hint: "Add keys in Vercel" },
      ]
    : [];
  const done = checklist.filter((c) => c.ok).length;

  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Kolkata" }).format(new Date()));
  const [hello, sky] = hour < 5 ? ["Good night", "🌙"] : hour < 12 ? ["Good morning", "☀️"] : hour < 17 ? ["Good afternoon", "🌤️"] : hour < 21 ? ["Good evening", "🌆"] : ["Good night", "🌙"];
  const first = (user?.name || user?.email?.split("@")[0] || "").split(" ")[0];
  const today = new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Kolkata" }).format(new Date());

  return (
    <div className="ask-dash">
      <section className="ask-hero">
        <div className="ask-hero-text">
          <p className="ask-hero-date">{sky} {today}</p>
          <h1>
            {hello}{first ? `, ${first.charAt(0).toUpperCase()}${first.slice(1)}` : ""} <span className="ask-wave" aria-hidden="true">👋</span>
          </h1>
          <p className="ask-hero-sub">Here&apos;s what&apos;s happening on asktek.net. Anything you publish goes live within seconds.</p>
          <div className="ask-quick">
            {quick.filter((q) => can(q.module)).map((q) => (
              <a key={q.href} href={q.href} className="ask-chip"><span aria-hidden="true">{q.emoji}</span>{q.label}</a>
            ))}
            <a href="/" target="_blank" rel="noopener noreferrer" className="ask-chip ask-chip-ghost"><span aria-hidden="true">🌐</span>View website ↗</a>
          </div>
        </div>
        <div className="ask-hero-art" aria-hidden="true">
          <span className="e1">🚀</span><span className="e2">📊</span><span className="e3">✨</span><span className="e4">🧵</span>
        </div>
      </section>

      {stats.length > 0 && (
        <section className="ask-stats" aria-label="Today's numbers">
          {stats.map((st) => (
            <a key={st.label} className={`ask-stat tone-${st.tone}`} href={st.href}>
              <span className="ask-stat-icon" aria-hidden="true">{st.emoji}</span>
              <strong>{fmt(st.value)}</strong>
              <span className="ask-stat-label">{st.label}</span>
            </a>
          ))}
        </section>
      )}

      <div className="ask-cols">
        <section className="ask-card ask-apps-card">
          <header className="ask-card-head">
            <h2>🧭 Your workspace</h2>
            <span>Jump straight to any section</span>
          </header>
          <div className="ask-apps">
            {apps.filter((a) => can(a.module)).map((a) => (
              <a key={a.href} className="ask-app" href={a.href}>
                <span className={`ask-app-icon tone-${a.tone}`} aria-hidden="true">{a.emoji}</span>
                <b>{a.title}</b>
                <small>{a.text}</small>
              </a>
            ))}
          </div>
        </section>

        <div className="ask-side">
          <section className="ask-card">
            <header className="ask-card-head">
              <h2>🕒 Recently edited</h2>
            </header>
            {recentItems.length ? (
              <ul className="ask-recent">
                {recentItems.map((r) => (
                  <li key={r.href}>
                    <a href={r.href}>
                      <span className="ask-recent-icon" aria-hidden="true">{r.emoji}</span>
                      <span className="ask-recent-text">
                        <b>{r.title}</b>
                        <small>{r.kind} · {ago(r.at)}</small>
                      </span>
                      {r.status === "draft" && <span className="ask-pill ask-pill-draft">Draft</span>}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ask-empty">Nothing edited yet. Start with ✍️ an article!</p>
            )}
          </section>

          {checklist.length > 0 && (
            <section className="ask-card">
              <header className="ask-card-head">
                <h2>✅ Site setup</h2>
                <span>{done} of {checklist.length} done</span>
              </header>
              <div className="ask-progress" role="progressbar" aria-valuemin={0} aria-valuemax={checklist.length} aria-valuenow={done}>
                <span style={{ width: `${Math.round((done / checklist.length) * 100)}%` }} />
              </div>
              <ul className="ask-check">
                {checklist.map((c) => (
                  <li key={c.label} className={c.ok ? "is-ok" : ""}>
                    <span className="ask-check-mark" aria-hidden="true">{c.ok ? "✓" : c.emoji}</span>
                    <span className="ask-check-text">
                      <b>{c.label}</b>
                      {!c.ok && <small>{c.hint}</small>}
                    </span>
                  </li>
                ))}
              </ul>
              <a className="ask-link" href="/admin/globals/site-settings">Open site settings →</a>
            </section>
          )}
        </div>
      </div>

      <p className="ask-foot">Made with 💙 for ASK Technology · Need help? Read the CMS guide or message your web team.</p>
    </div>
  );
}
