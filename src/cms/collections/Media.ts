import type { CollectionConfig } from "payload";
import { adminOnly, anyone, loggedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Media library" },
  admin: { group: "Settings", defaultColumns: ["filename", "alt", "updatedAt"], description: "Every image on the website. Always fill in the description for Google and screen readers." },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: adminOnly },
  upload: {
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"],
    focalPoint: true,
    imageSizes: [
      { name: "thumb", width: 400, formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "card", width: 900, formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "hero", width: 1800, formatOptions: { format: "webp", options: { quality: 82 } } },
    ],
    adminThumbnail: "thumb",
  },
  fields: [
    { name: "alt", label: "Image description (alt text)", type: "text", required: true, admin: { description: "Describe what the image shows, for example “TARGET 360 costing dashboard on a laptop”." } },
    { name: "caption", type: "text" },
  ],
};

/** CVs from job applications. Private: only Admins and Careers editors can open them. */
export const Resumes: CollectionConfig = {
  slug: "resumes",
  labels: { singular: "CV", plural: "CVs" },
  admin: { group: "Leads and enquiries", hidden: ({ user }) => !(user && ((user as { role?: string }).role === "admin" || ((user as { modules?: string[] }).modules || []).includes("careers"))) },
  access: {
    read: ({ req }) => Boolean(req.user && ((req.user as { role?: string }).role === "admin" || ((req.user as { modules?: string[] }).modules || []).includes("careers"))),
    create: () => false,
    update: () => false,
    delete: adminOnly,
  },
  upload: {
    mimeTypes: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
  fields: [{ name: "applicant", type: "text" }],
};
