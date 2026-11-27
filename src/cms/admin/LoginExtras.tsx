import React from "react";

const floaters = [
  { e: "📊", t: "Leads today", v: "Live", c: "f1" },
  { e: "📝", t: "60 articles", v: "Blog", c: "f2" },
  { e: "🚀", t: "Publish", v: "in seconds", c: "f3" },
  { e: "🌍", t: "5 countries", v: "30 cities", c: "f4" },
  { e: "🏆", t: "16 stories", v: "Customers", c: "f5" },
  { e: "💬", t: "Testimonials", v: "Real quotes", c: "f6" },
];

/** Decorative background for the sign-in screen: soft gradient blobs and floating cards. */
export function BeforeLogin() {
  return (
    <div className="ask-login-scene" aria-hidden="true">
      <span className="ask-blob b1" />
      <span className="ask-blob b2" />
      <span className="ask-blob b3" />
      <span className="ask-grid" />
      {floaters.map((f) => (
        <div key={f.c} className={`ask-float ${f.c}`}>
          <span className="ask-float-emoji">{f.e}</span>
          <span className="ask-float-text"><b>{f.t}</b><small>{f.v}</small></span>
        </div>
      ))}
    </div>
  );
}

/** Small trust line under the sign-in form. */
export function AfterLogin() {
  return (
    <div className="ask-login-foot">
      <div className="ask-chips">
        <span>🔒 Private &amp; secure</span>
        <span>⚡ Live in seconds</span>
        <span>📱 Works on phone</span>
      </div>
      <p>Forgot your password? Use the link above and we&apos;ll email you a reset link.</p>
    </div>
  );
}
