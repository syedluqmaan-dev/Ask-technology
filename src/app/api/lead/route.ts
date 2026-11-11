import { NextResponse } from "next/server";

/**
 * Receives enquiries, demo bookings and partner requests from every form on the site.
 *
 * Delivery: set LEAD_WEBHOOK_URL in the hosting environment to forward each lead as JSON
 * (for example to ASK's CMS or CRM endpoint). Without it, leads are written to the server log.
 */
const MAX = 2000;

function clean(v: unknown) {
  return typeof v === "string" ? v.trim().slice(0, MAX) : Array.isArray(v) ? v.map(String).slice(0, 20) : undefined;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const lead: Record<string, unknown> = {};
  for (const k of ["name", "email", "phone", "company", "city", "country", "product", "message", "partnerType", "businessType", "source", "date", "slot", "zone", "modules"]) {
    const v = clean(body[k]);
    if (v !== undefined && v !== "") lead[k] = v;
  }

  if (!lead.name || !lead.phone || !lead.email) {
    return NextResponse.json({ ok: false, error: "Name, phone and email are required" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.email))) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email" }, { status: 422 });
  }
  lead.receivedAt = new Date().toISOString();

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (!r.ok) throw new Error(`Webhook returned ${r.status}`);
    } catch (err) {
      console.error("Lead delivery failed", err, lead);
      return NextResponse.json({ ok: false, error: "Could not deliver" }, { status: 502 });
    }
  } else {
    console.log("New lead", lead);
  }

  return NextResponse.json({ ok: true });
}
