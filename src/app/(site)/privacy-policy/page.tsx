import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };

export default function Privacy() {
  return (
    <section className="section">
      <div className="wrap legal">
        <h1 className="h1" style={{ fontSize: 44 }}>Privacy policy</h1>
        <p className="body">[ASK Technology to provide the privacy policy text, including how enquiry and demo-booking details are stored and used.]</p>
      </div>
    </section>
  );
}
