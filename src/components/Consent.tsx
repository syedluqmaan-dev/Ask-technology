"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Cookie consent + tracking loader.
 * Google Consent Mode v2 defaults to "denied". GTM is loaded only after the visitor accepts;
 * GA4, Google Ads and other tags are configured inside GTM. LinkedIn Insight loads only after consent too.
 * Also stores first-touch campaign data (utm, gclid) for 90 days so it can be saved with each lead.
 */

const KEY = "ask_consent_v1";
const ATTR = "ask_attr_v1";
type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    _linkedin_partner_id?: string;
    askConsent?: { open: () => void };
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function loadScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const el = document.createElement("script");
  el.id = id;
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

function startTracking(gtmId?: string, linkedinId?: string) {
  if (gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId)) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`, "gtm");
  }
  if (linkedinId && /^\d+$/.test(linkedinId)) {
    window._linkedin_partner_id = linkedinId;
    loadScript("https://snap.licdn.com/li.lms-analytics/insight.min.js", "li-insight");
  }
}

function captureAttribution() {
  try {
    const existing = JSON.parse(localStorage.getItem(ATTR) || "null");
    if (existing && Date.now() - existing.t < 90 * 864e5) return;
    const q = new URLSearchParams(location.search);
    const data = {
      t: Date.now(),
      landing: location.pathname,
      referrer: document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "",
      utmSource: q.get("utm_source") || "",
      utmMedium: q.get("utm_medium") || "",
      utmCampaign: q.get("utm_campaign") || "",
      utmTerm: q.get("utm_term") || "",
      gclid: q.get("gclid") || "",
      li_fat_id: q.get("li_fat_id") || "",
    };
    localStorage.setItem(ATTR, JSON.stringify(data));
  } catch {
    /* storage blocked */
  }
}

export function getAttribution(): Record<string, string> {
  try {
    const a = JSON.parse(localStorage.getItem(ATTR) || "{}");
    delete a.t;
    return a;
  } catch {
    return {};
  }
}

export function Consent({ gtmId, linkedinId }: { gtmId?: string; linkedinId?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    captureAttribution();
    gtag("consent", "default", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", wait_for_update: 500 });
    let saved: Choice | null = null;
    try {
      saved = localStorage.getItem(KEY) as Choice | null;
    } catch {
      /* ignore */
    }
    if (saved === "granted") {
      gtag("consent", "update", { ad_storage: "granted", analytics_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
      startTracking(gtmId, linkedinId);
    } else if (!saved && (gtmId || linkedinId)) {
      setShow(true);
    }
    window.askConsent = { open: () => setShow(true) };
  }, [gtmId, linkedinId]);

  const choose = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignore */
    }
    gtag("consent", "update", { ad_storage: c, analytics_storage: c, ad_user_data: c, ad_personalization: c });
    if (c === "granted") startTracking(gtmId, linkedinId);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label="Cookie choice">
      <b>Cookies on this website</b>
      We use essential cookies to run the site. With your permission we also use analytics and advertising cookies to see which pages help and whether our ads work. <Link href="/cookie-policy">Cookie policy</Link>
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>Accept all</button>
        <button type="button" className="btn btn-ghost" onClick={() => choose("denied")}>Essential only</button>
      </div>
    </div>
  );
}

export function CookieSettingsLink() {
  return (
    <button type="button" onClick={() => window.askConsent?.open()} style={{ background: "none", border: 0, padding: 0, color: "var(--muted)", cursor: "pointer", fontSize: "inherit" }}>
      Cookie settings
    </button>
  );
}

/** Fire the lead conversion only after a real, successful submission. */
export function trackLead(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
