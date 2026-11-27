"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@payloadcms/ui";
import { Icon } from "./Logo";

type U = { name?: string; email?: string; role?: string } | null | undefined;

/** Top of the sidebar: brand and a Dashboard link. */
export function NavHeader() {
  const pathname = usePathname();
  const onDash = pathname === "/admin" || pathname === "/admin/";
  return (
    <div className="ask-nav-head">
      <a href="/admin" className="ask-nav-brand">
        <span className="ask-nav-mark"><Icon /></span>
        <span className="ask-nav-name">
          <b>ASK Technology</b>
          <small>Content Studio</small>
        </span>
      </a>
      <a href="/admin" className={`nav__link ask-nav-dash${onDash ? " active" : ""}`}>
        <span className="nav__link-label">Dashboard</span>
      </a>
    </div>
  );
}

/** Bottom of the sidebar: who is signed in, and a clear Sign out button. */
export function SignOut() {
  const { user } = useAuth();
  const u = user as U;
  const name = u?.name || u?.email?.split("@")[0] || "Signed in";
  const initials = name.split(/\s+/).map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const role = u?.role === "admin" ? "Admin" : u?.role === "editor" ? "Editor" : u?.role || "";
  return (
    <div className="ask-profile">
      <a href="/admin/account" className="ask-profile-card" title="My account">
        <span className="ask-avatar" aria-hidden="true">{initials || "👤"}</span>
        <span className="ask-profile-text">
          <b>{name}</b>
          <small>{role ? `${role} · ` : ""}{u?.email}</small>
        </span>
      </a>
      <a href="/admin/logout" className="ask-signout">
        <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M10 3h8a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-8v-2h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-8V3Zm.3 4.3 1.4 1.4L9.4 11H17v2H9.4l2.3 2.3-1.4 1.4L5.6 12l4.7-4.7Z" /></svg>
        Sign out
      </a>
    </div>
  );
}
