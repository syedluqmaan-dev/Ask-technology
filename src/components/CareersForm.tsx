"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Turnstile } from "./Turnstile";
import { Check } from "./Icon";

const MAX = 4 * 1024 * 1024;
const TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export function CareersForm({ roles, defaultRole }: { roles: string[]; defaultRole?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("resume") as File | null;
    if (!String(fd.get("name") || "").trim()) return setError("Enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(fd.get("email") || ""))) return setError("Enter a valid email address.");
    if (!file || !file.size) return setError("Attach your CV as a PDF or Word file.");
    if (file.size > MAX) return setError("Your CV is larger than 4 MB. Please attach a smaller file.");
    if (!TYPES.includes(file.type)) return setError("Attach your CV as a PDF or Word file.");
    if (!fd.get("consent")) return setError("Tick the box so we can consider your application.");
    fd.set("turnstile", token);
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/forms/careers", { method: "POST", body: fd });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "We could not send your application. Please try again or email hr@asktek.net.");
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="form form-done" role="status">
        <span className="ico" style={{ margin: "0 auto" }}><Check size={22} color="#2C3E9E" /></span>
        <h3 className="h3" style={{ marginTop: 16 }}>Thank you for applying.</h3>
        <p className="body mt-s">We have your application and CV. If your profile matches a role, our HR team will contact you.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate encType="multipart/form-data">
      <div className="fields">
        <label className="fld">Name<input name="name" autoComplete="name" required /></label>
        <label className="fld">Email<input name="email" type="email" autoComplete="email" required /></label>
        <label className="fld">Phone<input name="phone" type="tel" autoComplete="tel" /></label>
        <label className="fld">Years of experience<input name="experience" /></label>
        <label className="fld full">Role
          <select name="role" defaultValue={defaultRole || ""}>
            <option value="">General application</option>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="fld full">Anything you would like to add<textarea name="message" maxLength={2000} /></label>
        <label className="fld full">CV (PDF or Word, up to 4 MB)
          <input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
        </label>
      </div>
      <div className="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="fld-check"><input type="checkbox" name="consent" value="yes" /><span>I agree that ASK Technology may keep my application for up to 12 months to consider me for roles, as described in the <Link href="/privacy-policy">privacy policy</Link>.</span></label>
      <Turnstile onToken={onToken} />
      <button className="btn btn-primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Submit application"}</button>
      {error && <p className="form-msg err" role="alert">{error}</p>}
    </form>
  );
}
