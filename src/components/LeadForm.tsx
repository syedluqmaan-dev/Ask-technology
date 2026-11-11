"use client";

import { useState } from "react";
import { products } from "@/data/products";

type Props = {
  source: string;
  button?: string;
  product?: string;
  showProduct?: boolean;
  extraLabel?: string;
  partnerType?: boolean;
};

/** Enquiry form used on product, AI, partner and contact pages. Posts to /api/lead. */
export function LeadForm({ source, button = "Request a call back", product, showProduct = false, extraLabel = "Remarks", partnerType = false }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) form.reset();
    } catch {
      setState("err");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="fields">
        <label className="fld">Name<input name="name" type="text" autoComplete="name" required /></label>
        <label className="fld">Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label className="fld">Company name<input name="company" type="text" autoComplete="organization" /></label>
        <label className="fld">Work email<input name="email" type="email" autoComplete="email" required /></label>
        <label className="fld">City<input name="city" type="text" /></label>
        <label className="fld">Country<input name="country" type="text" defaultValue="India" /></label>
        {partnerType && (
          <label className="fld full">Partner type
            <select name="partnerType" defaultValue="Reseller">
              <option>Reseller</option><option>Implementation partner</option><option>Technology partner</option><option>Referral partner</option>
            </select>
          </label>
        )}
        {showProduct && (
          <label className="fld full">Product
            <select name="product" defaultValue={product ?? "Full TARGET suite"}>
              {products.map((p) => <option key={p.slug}>{p.name}</option>)}
              <option>AI Solution</option>
              <option>Full TARGET suite</option>
            </select>
          </label>
        )}
        <label className="fld full">{extraLabel}<textarea name="message" /></label>
      </div>
      <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : button}
      </button>
      {state === "ok" && <p className="form-msg ok" role="status">Thank you. Our team will contact you shortly.</p>}
      {state === "err" && <p className="form-msg err" role="alert">Your message could not be sent. Please call {"+91 98408 99559"} or email sales@asktek.net.</p>}
      <p className="form-note">We use your details only to contact you about TARGET.</p>
    </form>
  );
}
