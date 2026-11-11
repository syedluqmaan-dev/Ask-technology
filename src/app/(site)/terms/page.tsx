import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <section className="section">
      <div className="wrap legal">
        <h1 className="h1" style={{ fontSize: 44 }}>Terms of use</h1>
        <p className="body">[ASK Technology to provide the terms of use for this website.]</p>
      </div>
    </section>
  );
}
