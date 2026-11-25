import { after } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getSettings } from "@/lib/cms";
import { clean, clientIp, isEmail, isPhone, rateLimit, sameOrigin, verifyTurnstile } from "@/lib/security";
import { leadAdmin, leadThankYou, notifyList, sendEmail, type LeadData } from "@/lib/email";

export const runtime = "nodejs";

const TYPES = new Set(["demo", "contact", "partner", "ai", "product", "brochure"]);
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Website enquiry: validate → save in CMS → respond → (after the response) email the visitor and the sales team.
 * The visitor is never blocked by email or CMS problems; every failure is logged.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "This form can only be sent from asktek.net." }, 403);
  const ip = clientIp(req);
  if (!rateLimit(`lead:${ip}`, 5)) return json({ error: "Too many messages from your connection. Please wait a few minutes or call us." }, 429);

  const raw = await req.text();
  if (raw.length > 20_000) return json({ error: "Your message is too long." }, 413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "We could not read the form. Please try again." }, 400);
  }

  // Bots fill the hidden field; pretend success so they do not retry.
  if (clean(body.website)) return json({ ok: true });
  if (!(await verifyTurnstile(clean(body.turnstile, 4000), ip))) return json({ error: "Please confirm you are not a robot and try again." }, 400);

  const src = (body.source && typeof body.source === "object" ? body.source : {}) as Record<string, unknown>;
  const lead: LeadData = {
    type: TYPES.has(String(body.type)) ? String(body.type) : "contact",
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 30),
    company: clean(body.company, 160),
    city: clean(body.city, 80),
    country: clean(body.country, 60),
    businessType: clean(body.businessType, 60),
    product: clean(body.product, 300),
    preferredSlot: clean(body.preferredSlot, 120),
    message: clean(body.message, 2000),
    heardFrom: clean(body.heardFrom, 80),
    page: clean(body.page, 300),
    source: Object.fromEntries(["landing", "referrer", "utmSource", "utmMedium", "utmCampaign", "utmTerm", "gclid", "li_fat_id"].map((k) => [k, clean(src[k], 300)])),
  };

  if (lead.name.length < 2) return json({ error: "Enter your name." }, 400);
  if (!isEmail(lead.email)) return json({ error: "Enter a valid email address." }, 400);
  if (!isPhone(lead.phone || "")) return json({ error: "Enter a valid phone number." }, 400);
  if (body.consent !== "yes") return json({ error: "Please tick the consent box so we can reply." }, 400);

  let cmsUrl: string | undefined;
  try {
    if (process.env.DATABASE_URI) {
      const payload = await getPayload({ config });
      const doc = await payload.create({
        collection: "leads",
        overrideAccess: true,
        data: {
          type: lead.type, name: lead.name, email: lead.email, phone: lead.phone, company: lead.company, city: lead.city, country: lead.country,
          businessType: lead.businessType, product: lead.product, preferredSlot: lead.preferredSlot, message: lead.message, heardFrom: lead.heardFrom, status: "new",
          source: { page: lead.page, ...lead.source }, consentAt: new Date().toISOString(),
        } as never,
      });
      cmsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/admin/collections/leads/${doc.id}`;
    }
  } catch (e) {
    console.error("[lead] could not save:", (e as Error).message);
  }

  after(async () => {
    const s = await getSettings();
    const thanks = leadThankYou(s, lead);
    const admin = leadAdmin(s, lead, cmsUrl);
    await Promise.allSettled([
      sendEmail({ to: lead.email, ...thanks, replyTo: s.email }),
      sendEmail({ to: notifyList(process.env.LEAD_NOTIFY_TO, s.email), ...admin, replyTo: lead.email }),
    ]);
  });

  return json({ ok: true });
}
