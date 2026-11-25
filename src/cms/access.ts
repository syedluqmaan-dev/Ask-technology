import type { Access, FieldAccess, PayloadRequest } from "payload";

/**
 * Roles and modules.
 * Admin: everything. Editor: only the modules ticked on their account.
 * Visitors: published content only; leads, bookings and applications are never readable from outside.
 */
export const MODULES = [
  { label: "Website pages", value: "website" },
  { label: "Products and solutions", value: "products" },
  { label: "Locations", value: "locations" },
  { label: "Blog and guides", value: "blog" },
  { label: "Customers and logos", value: "customers" },
  { label: "Glossary and FAQs", value: "glossary" },
  { label: "Leads and bookings", value: "leads" },
  { label: "Careers", value: "careers" },
  { label: "Settings, menus and redirects", value: "settings" },
] as const;

export type Module = (typeof MODULES)[number]["value"];

type U = { role?: string; modules?: string[] } | null | undefined;

export const isAdmin = (user: U) => user?.role === "admin";
export const hasModule = (user: U, m: Module) => isAdmin(user) || (Array.isArray(user?.modules) && user!.modules!.includes(m));

export const adminOnly: Access = ({ req }) => isAdmin(req.user as U);
export const loggedIn: Access = ({ req }) => Boolean(req.user);
export const anyone: Access = () => true;
export const nobody: Access = () => false;

/** Module editors can write; published documents are public. */
export const canEdit = (m: Module): Access => ({ req }) => hasModule(req.user as U, m);
export const publishedOrEditor = (m: Module): Access => ({ req }) => (hasModule(req.user as U, m) ? true : { _status: { equals: "published" } });
export const moduleOnly = (m: Module): Access => ({ req }) => hasModule(req.user as U, m);

export const adminFieldOnly: FieldAccess = ({ req }) => isAdmin(req.user as U);

export const canSeeModule = (m: Module) => ({ user }: { user: PayloadRequest["user"] }) => !hasModule(user as U, m);
