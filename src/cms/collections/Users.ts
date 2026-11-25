import type { CollectionConfig } from "payload";
import { MODULES, adminFieldOnly, adminOnly, isAdmin } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Team member", plural: "Team" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "email", "role", "modules"], group: "Settings", description: "People who can sign in to this CMS." },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Lax" },
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: ({ req }) => (isAdmin(req.user as never) ? true : { id: { equals: req.user?.id } }),
    update: ({ req }) => (isAdmin(req.user as never) ? true : { id: { equals: req.user?.id } }),
    // The very first account (created on /admin) becomes an admin.
    admin: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
          if (totalDocs === 0) data.role = "admin";
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin (everything)", value: "admin" },
        { label: "Editor (selected modules)", value: "editor" },
      ],
      access: { update: adminFieldOnly, create: adminFieldOnly },
      admin: { position: "sidebar" },
    },
    {
      name: "modules",
      type: "select",
      hasMany: true,
      options: [...MODULES],
      access: { update: adminFieldOnly, create: adminFieldOnly },
      admin: { position: "sidebar", description: "What this editor can see and change.", condition: (d) => d?.role !== "admin" },
    },
  ],
};
