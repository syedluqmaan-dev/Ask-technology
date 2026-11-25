"use client";

import { useEffect, useRef, useState } from "react";
import { trackLead } from "./Consent";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: any;
  }
}

/**
 * Cal.com inline booking calendar, themed in ASK colours.
 * Cal.com sends the calendar invite and reminders; its webhook (/api/webhooks/cal) saves the booking in the CMS and emails the team.
 */
export function Booking({ calLink }: { calLink: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!calLink || !ref.current) return;
    /* Official Cal.com embed loader (unchanged from Cal.com's snippet) */
    /* eslint-disable */
    const w = window as any;
    (function (C: any, A: string, L: string) { const p = function (a: any, ar: any) { a.q.push(ar); }; const d = C.document; C.Cal = C.Cal || function () { const cal = C.Cal; const ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api: any = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(w, "https://app.cal.com/embed/embed.js", "init");
    /* eslint-enable */

    const Cal = window.Cal;
    Cal("init", "demo", { origin: "https://cal.com" });
    const ns = Cal.ns.demo;
    ns("inline", { elementOrSelector: "#ask-cal", calLink, layout: "month_view", config: { layout: "month_view", theme: "light" } });
    ns("ui", { theme: "light", cssVarsPerTheme: { light: { "cal-brand": "#4560D0" } }, hideEventTypeDetails: false, layout: "month_view" });
    ns("on", { action: "linkReady", callback: () => setReady(true) });
    ns("on", { action: "bookingSuccessful", callback: () => trackLead("generate_lead", { form_type: "demo_booking" }) });
  }, [calLink]);

  return (
    <div className="cal-box">
      {!ready && <div className="cal-load">Loading available times…</div>}
      <div id="ask-cal" ref={ref} style={{ width: "100%", height: "100%", overflow: "auto" }} />
    </div>
  );
}
