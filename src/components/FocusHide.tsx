"use client";

import { usePathname } from "next/navigation";
import { FOCUS_ROUTES } from "./Header";

/** Hides site chrome (footer, WhatsApp button) on focused pages such as Book a demo. */
export function FocusHide({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return FOCUS_ROUTES.includes(pathname) ? null : <>{children}</>;
}
