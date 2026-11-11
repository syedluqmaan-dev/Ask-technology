import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
    <Header />
    <main id="main">
    <section className="section" style={{ textAlign: "center" }}>
      <div className="wrap">
        <p className="kicker">Page not found</p>
        <h1 className="h1" style={{ fontSize: 44 }}>We could not find that page</h1>
        <p className="sub mt-m">It may have moved. Try the products page or contact our team.</p>
        <div className="btn-row mt-l" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/products">See products</Link>
          <Link className="btn btn-ghost" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
    </main>
    <Footer />
    </>
  );
}
