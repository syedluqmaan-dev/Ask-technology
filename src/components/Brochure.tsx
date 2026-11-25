"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { getAttribution, trackLead } from "./Consent";
import { Turnstile } from "./Turnstile";

/** Brochure download: name and email first (saved as a lead), then the file opens. Hidden until a brochure is set in Site settings. */
export function Brochure({ title, text, url }: { title: string; text: string; url: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!data.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email || "")) return setError("Enter your name and a valid work email.");
    if (!data.consent) return setError("Tick the box so we can send you the brochure.");
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/forms/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "brochure", product: "TARGET Suite brochure", page: location.pathname, turnstile: token, source: getAttribution() }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "Please try again.");
      trackLead("generate_lead", { form_type: "brochure" });
      setState("ok");
      window.open(url, "_blank", "noopener");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  return (
    <section className="section sm">
      <div className="wrap">
        <div className="brochure">
          <div>
            <p className="eyebrow">Brochure</p>
            <h2 className="h2" style={{ fontSize: "clamp(26px,2.6vw,34px)" }}>{title}</h2>
            {text && <p className="sub" style={{ marginTop: 12 }}>{text}</p>}
          </div>
          {state === "ok" ? (
            <div className="form-msg ok" role="status">
              Thank you. Your download has started. <a href={url} target="_blank" rel="noopener noreferrer">Open the brochure</a>
            </div>
          ) : (
            <form className="brochure-form" onSubmit={submit} noValidate>
              <label className="fld">Name<input name="name" autoComplete="name" required /></label>
              <label className="fld">Work email<input name="email" type="email" autoComplete="email" required /></label>
              <div className="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <label className="fld-check full">
                <input type="checkbox" name="consent" value="yes" />
                <span>Send me the brochure. ASK Technology may contact me about TARGET 360, as described in the <Link href="/privacy-policy">privacy policy</Link>.</span>
              </label>
              <Turnstile onToken={onToken} />
              <button className="btn btn-primary full" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Download brochure"}</button>
              {error && <p className="form-msg err full" role="alert">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
