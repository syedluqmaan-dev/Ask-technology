"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAttribution, trackLead } from "./Consent";
import { Turnstile } from "./Turnstile";
import { HEARD_FROM } from "@/lib/heard";

type Props = {
  type: "demo" | "contact" | "partner" | "ai" | "product";
  button?: string;
  /** Product names for the product picker. Leave empty to hide it. */
  products?: { slug: string; name: string }[];
  defaultProduct?: string;
  extraLabel?: string;
  partnerType?: boolean;
  phone?: string;
  email?: string;
};

type Errors = Partial<Record<"name" | "email" | "phone" | "consent" | "form", string>>;

/** Enquiry form used on product, AI, partner and contact pages. Saves to CMS → Leads and emails the team and the visitor. */
export function LeadForm({ type, button = "Request a call back", products, defaultProduct, extraLabel = "Remarks", partnerType = false, phone = "+91 98408 99559", email = "sales@asktek.net" }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "ok">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);
  const productRef = useRef<HTMLSelectElement>(null);

  // Pre-select the product when arriving with ?product=slug.
  useEffect(() => {
    if (defaultProduct || !products?.length || !productRef.current) return;
    const slug = new URLSearchParams(location.search).get("product");
    const match = products.find((p) => p.slug === slug);
    if (match) productRef.current.value = match.name;
  }, [defaultProduct, products]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim() || data.name.trim().length < 2) errs.name = "Enter your name.";
    if (!/^[+\d][\d\s()-]{6,19}$/.test(data.phone || "")) errs.phone = "Enter a phone number with country code, for example +91 98408 99559.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email || "")) errs.email = "Enter a valid email, for example name@company.com.";
    if (!data.consent) errs.consent = "Tick the box so we can reply to you.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/forms/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          businessType: data.partnerType || data.businessType || "",
          type,
          page: location.pathname,
          turnstile: token,
          source: getAttribution(),
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || `Your message could not be sent. Please call ${phone} or email ${email}.`);
      trackLead("generate_lead", { form_type: type, product: data.product || "" });
      setState("ok");
      form.reset();
    } catch (err) {
      setErrors({ form: (err as Error).message });
      setState("idle");
    }
  }

  const err = (k: keyof Errors, id: string) => errors[k] && <span className="err" id={id}>{errors[k]}</span>;
  const f = (n: string) => `${type}-${n}`;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="fields">
        <label className="fld">Name
          <input name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? f("name-e") : undefined} />
          {err("name", f("name-e"))}
        </label>
        <label className="fld">Phone
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? f("phone-e") : undefined} />
          {err("phone", f("phone-e"))}
        </label>
        <label className="fld">Company name<input name="company" type="text" autoComplete="organization" /></label>
        <label className="fld">Work email
          <input name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? f("email-e") : undefined} />
          {err("email", f("email-e"))}
        </label>
        <label className="fld">City<input name="city" type="text" autoComplete="address-level2" /></label>
        <label className="fld">Country<input name="country" type="text" autoComplete="country-name" defaultValue="India" /></label>
        {partnerType && (
          <label className="fld full">Partner type
            <select name="partnerType" defaultValue="Reseller">
              <option>Reseller</option><option>Implementation partner</option><option>Technology partner</option><option>Referral partner</option>
            </select>
          </label>
        )}
        {products && products.length > 0 && (
          <label className="fld full">Product
            <select ref={productRef} name="product" defaultValue={defaultProduct ?? "Full TARGET 360 suite"}>
              {products.map((p) => <option key={p.slug}>{p.name}</option>)}
              <option>AI Solution</option>
              <option>Full TARGET 360 suite</option>
            </select>
          </label>
        )}
        <label className="fld full">How did you hear about us?
          <select name="heardFrom" defaultValue="">
            <option value="">Choose one (optional)</option>
            {HEARD_FROM.map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
        <label className="fld full">{extraLabel}<textarea name="message" maxLength={2000} /></label>
      </div>
      <div className="hp" aria-hidden="true">
        <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="fld-check">
        <input type="checkbox" name="consent" value="yes" aria-invalid={!!errors.consent} />
        <span>I agree that ASK Technology may use these details to contact me about TARGET 360, as described in the <Link href="/privacy-policy">privacy policy</Link>.</span>
      </label>
      {errors.consent && <p className="fld"><span className="err">{errors.consent}</span></p>}
      <Turnstile onToken={onToken} />
      <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : button}
      </button>
      {state === "ok" && <p className="form-msg ok" role="status">Thank you. Our team will contact you shortly. A confirmation is on its way to your inbox.</p>}
      {errors.form && <p className="form-msg err" role="alert">{errors.form}</p>}
      <p className="form-note">We use your details only to contact you about TARGET 360.</p>
    </form>
  );
}
