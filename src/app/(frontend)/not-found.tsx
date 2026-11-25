import Link from "next/link";

export const metadata = { title: "Page not found | ASK Technology", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="wrap">
        <p className="kicker">Page not found</p>
        <h1 className="h1" style={{ fontSize: 44 }}>We could not find that page</h1>
        <p className="sub mt-m">It may have moved when we launched our new website. Try the products page or contact our team.</p>
        <div className="btn-row mt-l" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/products">See products</Link>
          <Link className="btn btn-ghost" href="/insights">Read insights</Link>
          <Link className="btn btn-ghost" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
