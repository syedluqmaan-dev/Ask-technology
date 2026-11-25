"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAttribution, trackLead } from "./Consent";
import { Turnstile } from "./Turnstile";
import { HEARD_FROM } from "@/lib/heard";

const SLOTS = ["10:00 am", "11:30 am", "2:00 pm", "3:30 pm", "5:00 pm"];
const ZONES = ["India (IST)", "Bangladesh (BST)", "Sri Lanka (SLST)", "UAE (GST)", "UK (GMT)"];

/** Next six working days (Mon–Sat), starting tomorrow. Sunday is skipped. */
function nextDays(n = 6) {
  const out: Date[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) out.push(new Date(d));
  }
  return out;
}

type Mod = { slug: string; shortName: string };

/** Demo request with a preferred date and time. Used when no Cal.com link is set in Site settings. */
export function BookingForm({ products, phone }: { products: Mod[]; phone: string }) {
  const MODULES = [...products.map((p) => ({ id: p.slug, label: p.shortName })), { id: "ai-solution", label: "AI Solution" }, { id: "full-suite", label: "Full suite" }];
  const params = useSearchParams();
  const pre = params.get("product");
  const [mods, setMods] = useState<string[]>(pre && MODULES.some((m) => m.id === pre) ? [pre] : []);
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [zone, setZone] = useState(ZONES[0]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "err">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => setDays(nextDays()), []);

  const dateLabel = useMemo(() => {
    const d = days[day];
    return d ? d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long" }) : "";
  }, [days, day]);
  const summary = slot === null ? "Pick a date and time" : `${dateLabel} · ${SLOTS[slot]} ${zone.match(/\((.+)\)/)?.[1] ?? ""}`;
  const modLabels = MODULES.filter((m) => mods.includes(m.id)).map((m) => m.label);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (slot === null) return;
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      const res = await fetch("/api/forms/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "demo",
          product: modLabels.join(", ") || "TARGET 360",
          preferredSlot: `${days[day]?.toISOString().slice(0, 10)} ${SLOTS[slot]} ${zone}`,
          page: location.pathname,
          turnstile: token,
          source: getAttribution(),
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "");
      trackLead("generate_lead", { form_type: "demo", product: modLabels.join(", ") });
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("err");
    }
  }

  if (state === "done") {
    return (
      <div className="form" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: 48 }} role="status">
        <h2 className="h2">Your demo request is in</h2>
        <p style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }}>{summary}</p>
        <p className="sub mt-s">{modLabels.join(", ") || "TARGET 360"}. Our team will confirm the time and send the joining link by email and WhatsApp.</p>
        <div className="btn-row mt-l" style={{ justifyContent: "center" }}>
          <button className="btn btn-ghost" onClick={() => setState("idle")}>Change time</button>
          <Link className="btn btn-primary" href="/products">Explore the products</Link>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <p className="step-label">Step 1 of 3</p>
      <p className="step-title">Which products interest you?</p>
      <div className="picks" role="group" aria-label="Products">
        {MODULES.map((m) => {
          const on = mods.includes(m.id);
          return (
            <button type="button" key={m.id} className="pick" aria-pressed={on} onClick={() => setMods(on ? mods.filter((x) => x !== m.id) : [...mods, m.id])}>
              {m.label}
            </button>
          );
        })}
      </div>

      <p className="step-label">Step 2 of 3</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
        <p className="step-title" style={{ margin: 0 }}>Pick a date and time</p>
        <label className="fld" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13.5, color: "var(--text)" }}>Time zone</span>
          <select value={zone} onChange={(e) => setZone(e.target.value)} style={{ minHeight: 40 }}>
            {ZONES.map((z) => <option key={z}>{z}</option>)}
          </select>
        </label>
      </div>
      <div className="days" role="group" aria-label="Date">
        {days.map((d, i) => (
          <button type="button" key={d.toISOString()} className="pick" aria-pressed={day === i} onClick={() => setDay(i)}>
            <small>{d.toLocaleDateString("en-IN", { weekday: "short" })}</small>
            <strong>{d.getDate()}</strong>
            <small>{d.toLocaleDateString("en-IN", { month: "short" })}</small>
          </button>
        ))}
      </div>
      <div className="slots" role="group" aria-label="Time">
        {SLOTS.map((s, i) => (
          <button type="button" key={s} className="pick" aria-pressed={slot === i} onClick={() => setSlot(i)}>{s}</button>
        ))}
      </div>

      <p className="step-label">Step 3 of 3</p>
      <p className="step-title">Your details</p>
      <div className="fields">
        <label className="fld">Name<input name="name" autoComplete="name" required /></label>
        <label className="fld">Work email<input name="email" type="email" autoComplete="email" required /></label>
        <label className="fld">Phone or WhatsApp<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label className="fld">Company name<input name="company" autoComplete="organization" /></label>
        <label className="fld">City<input name="city" /></label>
        <label className="fld">Country<input name="country" autoComplete="country-name" defaultValue="India" /></label>
        <label className="fld">Business type
          <select name="businessType" defaultValue="Apparel manufacturer">
            <option>Apparel manufacturer</option><option>Buying house</option><option>Exporter</option><option>Fashion brand or retailer</option><option>Textile mill</option>
          </select>
        </label>
        <label className="fld">How did you hear about us?
          <select name="heardFrom" defaultValue="">
            <option value="">Choose one (optional)</option>
            {HEARD_FROM.map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
      </div>
      <div className="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="fld-check">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree that ASK Technology may use these details to arrange my demo, as described in the <Link href="/privacy-policy">privacy policy</Link>.</span>
      </label>
      <Turnstile onToken={setToken} />
      <div className="summary">
        <p style={{ fontSize: 15, lineHeight: 1.5 }}><b>{summary}</b><br /><span className="body">{modLabels.join(", ") || "No products selected yet"}</span></p>
        <button className="btn btn-primary" type="submit" disabled={slot === null || state === "sending"}>
          {state === "sending" ? "Booking…" : "Confirm booking"}
        </button>
      </div>
      {state === "err" && <p className="form-msg err" role="alert">{error || `The booking could not be sent. Please call ${phone}.`}</p>}
    </form>
  );
}
