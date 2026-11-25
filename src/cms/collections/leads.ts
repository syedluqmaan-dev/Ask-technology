import type { CollectionConfig } from "payload";
import { adminOnly, hasModule, moduleOnly, nobody } from "../access";

const hiddenUnless = (m: "leads" | "careers") => ({ user }: { user: unknown }) => !hasModule(user as never, m);

const statusField = {
  name: "status",
  type: "select" as const,
  defaultValue: "new",
  options: [
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Demo done", value: "demo" },
    { label: "Proposal sent", value: "proposal" },
    { label: "Won", value: "won" },
    { label: "Not a fit", value: "lost" },
    { label: "Spam", value: "spam" },
  ],
  admin: { position: "sidebar" as const },
};

/** Every enquiry from the website. Created only by the website's own server code. */
export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Lead", plural: "Leads" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "type", "product", "country", "status", "createdAt"],
    group: "Leads and enquiries",
    listSearchableFields: ["name", "email", "company", "phone"],
    hidden: hiddenUnless("leads"),
    description: "Enquiries from every form on the website. Change the status as you follow up.",
  },
  defaultSort: "-createdAt",
  access: { read: moduleOnly("leads"), update: moduleOnly("leads"), create: nobody, delete: adminOnly },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Demo request", value: "demo" },
        { label: "Contact form", value: "contact" },
        { label: "Partner enquiry", value: "partner" },
        { label: "AI enquiry", value: "ai" },
        { label: "Product page", value: "product" },
        { label: "Brochure download", value: "brochure" },
      ],
      admin: { position: "sidebar" },
    },
    statusField,
    { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "company", type: "text" }] },
    { type: "row", fields: [{ name: "email", type: "email", required: true }, { name: "phone", type: "text" }] },
    { type: "row", fields: [{ name: "city", type: "text" }, { name: "country", type: "text" }, { name: "businessType", type: "text" }] },
    { type: "row", fields: [{ name: "product", type: "text" }, { name: "preferredSlot", type: "text", label: "Preferred demo time" }] },
    { name: "message", type: "textarea" },
    { name: "heardFrom", type: "text", label: "Heard about us from", admin: { readOnly: true } },
    { name: "notes", type: "textarea", label: "Internal notes", admin: { description: "Only your team sees this." } },
    {
      name: "source",
      type: "group",
      label: "Where the lead came from",
      admin: { readOnly: true },
      fields: [
        { type: "row", fields: [{ name: "page", type: "text" }, { name: "landing", type: "text" }, { name: "referrer", type: "text" }] },
        { type: "row", fields: [{ name: "utmSource", type: "text" }, { name: "utmMedium", type: "text" }, { name: "utmCampaign", type: "text" }] },
        { type: "row", fields: [{ name: "utmTerm", type: "text" }, { name: "gclid", type: "text" }, { name: "li_fat_id", type: "text", label: "LinkedIn click ID" }] },
      ],
    },
    { name: "consentAt", type: "date", admin: { readOnly: true, position: "sidebar", date: { pickerAppearance: "dayAndTime" } } },
  ],
};

/** Demo bookings received from Cal.com. */
export const Bookings: CollectionConfig = {
  slug: "bookings",
  labels: { singular: "Demo booking", plural: "Demo bookings" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "email", "start", "status"], group: "Leads and enquiries", hidden: hiddenUnless("leads") },
  defaultSort: "-start",
  access: { read: moduleOnly("leads"), update: moduleOnly("leads"), create: nobody, delete: adminOnly },
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "booked",
      options: [
        { label: "Booked", value: "booked" },
        { label: "Rescheduled", value: "rescheduled" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
        { label: "No show", value: "noshow" },
      ],
      admin: { position: "sidebar" },
    },
    { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "email", type: "email", required: true }] },
    { type: "row", fields: [{ name: "start", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } }, { name: "end", type: "date", admin: { date: { pickerAppearance: "dayAndTime" } } }, { name: "timeZone", type: "text" }] },
    { name: "event", type: "text" },
    { name: "answers", type: "textarea", admin: { readOnly: true } },
    { name: "notes", type: "textarea", label: "Internal notes" },
    { name: "calUid", type: "text", unique: true, index: true, admin: { readOnly: true, position: "sidebar" } },
  ],
};

export const JobApplications: CollectionConfig = {
  slug: "job-applications",
  labels: { singular: "Job application", plural: "Job applications" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "email", "status", "createdAt"], group: "Leads and enquiries", hidden: hiddenUnless("careers") },
  defaultSort: "-createdAt",
  access: { read: moduleOnly("careers"), update: moduleOnly("careers"), create: nobody, delete: adminOnly },
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Shortlisted", value: "shortlisted" },
        { label: "Interview", value: "interview" },
        { label: "Offer", value: "offer" },
        { label: "Rejected", value: "rejected" },
      ],
      admin: { position: "sidebar" },
    },
    { type: "row", fields: [{ name: "name", type: "text", required: true }, { name: "email", type: "email", required: true }, { name: "phone", type: "text" }] },
    { type: "row", fields: [{ name: "role", type: "text" }, { name: "experience", type: "text" }] },
    { name: "message", type: "textarea" },
    { name: "resume", type: "upload", relationTo: "resumes", label: "CV" },
    { name: "notes", type: "textarea", label: "Internal notes" },
    { name: "consentAt", type: "date", admin: { readOnly: true, position: "sidebar" } },
  ],
};
