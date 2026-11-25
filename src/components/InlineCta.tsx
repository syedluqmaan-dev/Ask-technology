import Link from "next/link";
import { Arrow } from "./Icon";

/** A slim "talk to us" strip placed between sections, so visitors can act without scrolling to the end. */
export function InlineCta({ text = "Not sure which product fits your business?", label = "Book a free call", href = "/book-a-demo" }: { text?: string; label?: string; href?: string }) {
  return (
    <div className="wrap">
      <div className="inline-cta">
        <p>{text} <span>Talk to a TARGET 360 specialist. 30 minutes, no obligation.</span></p>
        <Link className="btn btn-primary" href={href}>{label} <Arrow /></Link>
      </div>
    </div>
  );
}
