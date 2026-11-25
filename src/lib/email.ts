import "server-only";
import type { Settings } from "./types";
import { fullAddress } from "./format";

type Attachment = { filename: string; content: string }; // base64
type Mail = { to: string | string[]; subject: string; html: string; text: string; replyTo?: string; attachments?: Attachment[] };

/** Sends through Resend's API. Without a key, the email is written to the server log so nothing breaks. */
export async function sendEmail(m: Mail) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "ASK Technology <noreply@asktek.net>";
  if (!key) {
    console.info("[email] RESEND_API_KEY not set. Would send:", m.subject, "→", m.to);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: Array.isArray(m.to) ? m.to : [m.to], subject: m.subject, html: m.html, text: m.text, reply_to: m.replyTo, attachments: m.attachments }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) console.error("[email] Resend error", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("[email] failed", (e as Error).message);
    return false;
  }
}

export const notifyList = (env?: string, fallback?: string) =>
  (env || fallback || "").split(",").map((s) => s.trim()).filter(Boolean);

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Shared branded layout: white, ASK blue accent, company details in the footer. Works in Gmail and Outlook. */
function layout(s: Settings, title: string, inner: string) {
  const site = s.url;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(title)}</title></head>
<body style="margin:0;background:#f5f8fd;font-family:Arial,Helvetica,sans-serif;color:#1c2333">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8fd;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e4e9f2;border-radius:14px;overflow:hidden">
<tr><td style="height:4px;background:#4560d0;background-image:linear-gradient(100deg,#4560d0,#1c97dd)"></td></tr>
<tr><td style="padding:28px 32px 8px"><img src="${site}/logo.png" width="44" height="44" alt="ASK Technology" style="display:inline-block;vertical-align:middle;border:0"><span style="display:inline-block;vertical-align:middle;margin-left:10px;font-size:20px;font-weight:bold;color:#2c3e9e">ASK Technology</span></td></tr>
<tr><td style="padding:12px 32px 28px;font-size:15px;line-height:1.6">${inner}</td></tr>
<tr><td style="padding:20px 32px;background:#f5f8fd;border-top:1px solid #e4e9f2;font-size:12.5px;line-height:1.6;color:#4a5468">
<b style="color:#1c2333">${esc(s.name)}</b><br>${esc(fullAddress(s))}<br>
<a href="tel:${s.phone.replace(/[^\d+]/g, "")}" style="color:#2c3e9e;text-decoration:none">${esc(s.phone)}</a> · <a href="mailto:${s.email}" style="color:#2c3e9e;text-decoration:none">${esc(s.email)}</a> · <a href="${site}" style="color:#2c3e9e;text-decoration:none">${esc(site.replace(/^https?:\/\//, ""))}</a>
</td></tr></table></td></tr></table></body></html>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#4560d0;background-image:linear-gradient(100deg,#4560d0,#1c97dd);color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:9px">${esc(label)}</a>`;

const rows = (data: [string, string | undefined][]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${data
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px 10px;border:1px solid #e4e9f2;background:#f5f8fd;width:160px;font-weight:bold">${esc(k)}</td><td style="padding:8px 10px;border:1px solid #e4e9f2">${esc(v!).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

export type LeadData = {
  type: string; name: string; email: string; phone?: string; company?: string; city?: string; country?: string; businessType?: string; preferredSlot?: string; product?: string; message?: string; heardFrom?: string;
  page?: string; source?: Record<string, string>;
};

const typeLabel: Record<string, string> = { demo: "Demo request", contact: "Contact form", partner: "Partner enquiry", ai: "AI enquiry", product: "Product page enquiry", brochure: "Brochure download" };

export function leadThankYou(s: Settings, l: LeadData) {
  const first = l.name.split(" ")[0];
  const subject = l.type === "partner" ? "Thank you for your partnership enquiry" : "Thank you for contacting ASK Technology";
  const html = layout(
    s,
    subject,
    `<p style="margin:0 0 14px;font-size:18px;font-weight:bold">Hello ${esc(first)},</p>
<p style="margin:0 0 14px">Thank you for getting in touch${l.product ? ` about <b>${esc(l.product)}</b>` : ""}. We have your message and a TARGET 360 specialist will reply within one working day.</p>
<p style="margin:0 0 14px">If it is urgent, call us on <a href="tel:${s.phone.replace(/[^\d+]/g, "")}" style="color:#2c3e9e">${esc(s.phone)}</a> or message us on <a href="https://wa.me/${s.whatsapp.replace(/\D/g, "")}" style="color:#2c3e9e">WhatsApp</a>.</p>
<p style="margin:22px 0">${btn(`${s.url}/case-studies`, "Read customer stories")}</p>
<p style="margin:0;color:#4a5468">Regards,<br>The ASK Technology team</p>`,
  );
  const text = `Hello ${first},\n\nThank you for getting in touch. A TARGET 360 specialist will reply within one working day.\nUrgent? Call ${s.phone} or email ${s.email}.\n\nThe ASK Technology team\n${fullAddress(s)}\n${s.url}`;
  return { subject, html, text };
}

export function leadAdmin(s: Settings, l: LeadData, cmsUrl?: string) {
  const subject = `New lead: ${l.name}${l.company ? `, ${l.company}` : ""} (${typeLabel[l.type] || l.type})`;
  const src = l.source || {};
  const html = layout(
    s,
    subject,
    `<p style="margin:0 0 16px;font-size:18px;font-weight:bold">${esc(typeLabel[l.type] || "New lead")} from the website</p>
${rows([
  ["Name", l.name], ["Company", l.company], ["Email", l.email], ["Phone", l.phone], ["City", l.city], ["Country", l.country], ["Business", l.businessType], ["Product", l.product], ["Preferred demo time", l.preferredSlot], ["Message", l.message], ["Heard about us from", l.heardFrom],
  ["Page", l.page], ["Landing page", src.landing], ["Referrer", src.referrer], ["Campaign", [src.utmSource, src.utmMedium, src.utmCampaign].filter(Boolean).join(" / ")], ["Keyword", src.utmTerm], ["Google click ID", src.gclid],
])}
${cmsUrl ? `<p style="margin:22px 0 0">${btn(cmsUrl, "Open in CMS")}</p>` : ""}`,
  );
  const text = `New lead (${typeLabel[l.type] || l.type})\nName: ${l.name}\nCompany: ${l.company || ""}\nEmail: ${l.email}\nPhone: ${l.phone || ""}\nCity: ${l.city || ""}\nCountry: ${l.country || ""}\nPreferred time: ${l.preferredSlot || ""}\nProduct: ${l.product || ""}\nMessage: ${l.message || ""}\nPage: ${l.page || ""}${cmsUrl ? `\n${cmsUrl}` : ""}`;
  return { subject, html, text };
}

export function bookingAdmin(s: Settings, b: { name: string; email: string; start?: string; timeZone?: string; event?: string; answers?: string; status: string }, cmsUrl?: string) {
  const when = b.start ? new Date(b.start).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" }) + " IST" : "";
  const subject = `${b.status === "cancelled" ? "Demo cancelled" : b.status === "rescheduled" ? "Demo rescheduled" : "New demo booked"}: ${b.name}${when ? `, ${when}` : ""}`;
  const html = layout(s, subject, `<p style="margin:0 0 16px;font-size:18px;font-weight:bold">${esc(subject)}</p>${rows([["Name", b.name], ["Email", b.email], ["When", when], ["Visitor time zone", b.timeZone], ["Event", b.event], ["Answers", b.answers]])}${cmsUrl ? `<p style="margin:22px 0 0">${btn(cmsUrl, "Open in CMS")}</p>` : ""}`);
  return { subject, html, text: `${subject}\n${b.email}\n${b.answers || ""}` };
}

export function careersAdmin(s: Settings, a: { name: string; email: string; phone?: string; role?: string; experience?: string; message?: string }, cmsUrl?: string) {
  const subject = `Job application: ${a.name}${a.role ? `, ${a.role}` : ""}`;
  const html = layout(s, subject, `<p style="margin:0 0 16px;font-size:18px;font-weight:bold">New job application</p>${rows([["Name", a.name], ["Email", a.email], ["Phone", a.phone], ["Role", a.role || "General application"], ["Experience", a.experience], ["Message", a.message]])}<p style="margin:16px 0 0;color:#4a5468">The CV is attached and saved in the CMS.</p>${cmsUrl ? `<p style="margin:18px 0 0">${btn(cmsUrl, "Open in CMS")}</p>` : ""}`);
  return { subject, html, text: `${subject}\n${a.email}\n${a.phone || ""}` };
}

export function careersThankYou(s: Settings, a: { name: string; role?: string }) {
  const subject = "We have received your application";
  const html = layout(s, subject, `<p style="margin:0 0 14px;font-size:18px;font-weight:bold">Hello ${esc(a.name.split(" ")[0])},</p><p style="margin:0 0 14px">Thank you for applying${a.role ? ` for <b>${esc(a.role)}</b>` : ""} at ASK Technology. Our HR team reviews every application, and we will contact you if your profile matches a role.</p><p style="margin:0;color:#4a5468">Regards,<br>HR, ASK Technology</p>`);
  return { subject, html, text: `Thank you for applying${a.role ? ` for ${a.role}` : ""} at ASK Technology. We will contact you if your profile matches a role.` };
}
