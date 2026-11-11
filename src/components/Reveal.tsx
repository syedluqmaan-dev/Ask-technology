"use client";

import { useEffect, useRef } from "react";

/** Fades content in as it scrolls into view. Content is fully visible without JavaScript or with reduced motion. */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0, ...rest }: { children: React.ReactNode; as?: React.ElementType; className?: string; delay?: number } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
