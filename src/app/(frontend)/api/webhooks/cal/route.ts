import { after } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { getPayload } from "payload";
import config from "@payload-config";
import { getSettings } from "@/lib/cms";
import { bookingAdmin, notifyList, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

/**
 * Cal.com webhook. In Cal.com → Settings → Developer → Webhooks, add:
 *   URL: https://www.asktek.net/api/webhooks/cal
 *   Triggers: Booking created, Booking rescheduled, Booking cancelled
 *   Secret: the same value as CAL_WEBHOOK_SECRET
 */
export async function POST(req: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  const raw = await req.text();
  if (!secret) return new Response("Webhook not configured", { status: 503 });

  const sig = req.headers.get("x-cal-signature-256") || "";
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const ok = sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!ok) return new Response("Invalid signature", { status: 401 });

  type Att = { name?: string; email?: string; timeZone?: string };
  let evt: { triggerEvent?: string; payload?: { uid?: string; title?: string; startTime?: string; endTime?: string; attendees?: Att[]; responses?: Record<string, { value?: unknown } | unknown>; eventTitle?: string } };
  try {
    evt = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  const p = evt.payload || {};
  const trigger = evt.triggerEvent || "";
  if (trigger === "PING") return Response.json({ ok: true });

  const status = trigger === "BOOKING_CANCELLED" ? "cancelled" : trigger === "BOOKING_RESCHEDULED" ? "rescheduled" : "booked";
  const att = p.attendees?.[0] || {};
  const answers = p.responses
    ? Object.entries(p.responses)
        .filter(([k]) => !["name", "email", "location", "guests", "rescheduleReason"].includes(k))
        .map(([k, v]) => `${k}: ${typeof v === "object" && v && "value" in v ? String((v as { value?: unknown }).value ?? "") : String(v ?? "")}`)
        .filter((l) => !l.endsWith(": "))
        .join("\n")
    : "";
  const booking = {
    calUid: p.uid || "",
    name: (att.name || "Unknown").slice(0, 120),
    email: (att.email || "").slice(0, 200),
    start: p.startTime,
    end: p.endTime,
    timeZone: att.timeZone,
    event: p.eventTitle || p.title,
    answers: answers.slice(0, 3000),
    status,
  };

  let cmsUrl: string | undefined;
  try {
    if (process.env.DATABASE_URI && booking.calUid) {
      const payload = await getPayload({ config });
      const existing = await payload.find({ collection: "bookings", where: { calUid: { equals: booking.calUid } }, limit: 1, overrideAccess: true });
      const doc = existing.docs[0]
        ? await payload.update({ collection: "bookings", id: existing.docs[0].id, data: booking as never, overrideAccess: true })
        : await payload.create({ collection: "bookings", data: booking as never, overrideAccess: true });
      cmsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/admin/collections/bookings/${doc.id}`;
    }
  } catch (e) {
    console.error("[cal] could not save booking:", (e as Error).message);
  }

  after(async () => {
    const s = await getSettings();
    const mail = bookingAdmin(s, booking, cmsUrl);
    await sendEmail({ to: notifyList(process.env.LEAD_NOTIFY_TO, s.email), ...mail, replyTo: booking.email || undefined });
  });

  return Response.json({ ok: true });
}
