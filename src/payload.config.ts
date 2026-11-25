import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";

import { Users } from "./cms/collections/Users";
import { Media, Resumes } from "./cms/collections/Media";
import {
  Products, Solutions, Industries, Countries, Cities, CaseStudies, Clients, Categories, Posts, Glossary, Jobs, Legal, Redirects, Testimonials, Documents,
} from "./cms/collections/content";
import { Leads, Bookings, JobApplications } from "./cms/collections/leads";
import { HomePage, AboutPage, AIPage, CareersPage, PartnerPage, ContactPage, DemoPage, SiteSettings, Navigation } from "./cms/globals";
import { pathFor, globalPaths } from "./cms/paths";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverURL = (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000").replace(/\/$/, "");
const origins = Array.from(new Set([serverURL, serverURL.replace("://www.", "://"), "http://localhost:3000"]));

if (process.env.NODE_ENV === "production" && !process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET is not set. Add it in Vercel → Settings → Environment Variables.");
}

const previewSecret = process.env.PREVIEW_SECRET || "";
const previewUrl = (p: string | null) =>
  `${serverURL}/next/preview?path=${encodeURIComponent(p || "/")}&secret=${encodeURIComponent(previewSecret)}`;

const draftCollections = ["testimonials", "products", "solutions", "industries", "countries", "cities", "case-studies", "posts", "glossary", "jobs", "legal"];

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-change-me",
  telemetry: false,
  graphQL: { disable: true },
  cors: origins,
  csrf: origins,
  admin: {
    user: Users.slug,
    theme: "light",
    avatar: "default",
    meta: {
      titleSuffix: " · ASK Technology CMS",
      robots: "noindex, nofollow",
      icons: [{ rel: "icon", type: "image/svg+xml", url: "/icon.svg" }],
    },
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      graphics: { Logo: "/cms/admin/Logo#Logo", Icon: "/cms/admin/Logo#Icon" },
      beforeDashboard: ["/cms/admin/Dashboard#Dashboard"],
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) =>
        previewUrl(collectionConfig ? pathFor(collectionConfig.slug, data as Record<string, unknown>) : globalConfig ? globalPaths[globalConfig.slug] ?? "/" : "/"),
      collections: draftCollections,
      globals: Object.keys(globalPaths),
      breakpoints: [
        { label: "Phone", name: "phone", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 820, height: 1180 },
        { label: "Laptop", name: "laptop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    // Website content
    Products, Solutions, Industries, Countries, Cities, CaseStudies, Clients, Testimonials, Posts, Categories, Glossary, Jobs, Legal,
    // Leads (private)
    Leads, Bookings, JobApplications, Resumes,
    // Settings
    Media, Documents, Redirects, Users,
  ],
  globals: [HomePage, AboutPage, AIPage, CareersPage, PartnerPage, ContactPage, DemoPage, SiteSettings, Navigation],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "", max: Number(process.env.DATABASE_POOL_MAX || 5) },
    // Schema changes only through reviewed migrations (npm run migrate:create, npm run migrate).
    push: process.env.DB_PUSH === "true",
    migrationDir: path.resolve(dirname, "cms/migrations"),
  }),
  sharp,
  upload: { limits: { fileSize: 8_000_000 } },
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: (process.env.EMAIL_FROM || "noreply@asktek.net").replace(/^.*<|>$/g, ""),
        defaultFromName: "ASK Technology",
      })
    : undefined,
  plugins: process.env.S3_BUCKET
    ? [
        s3Storage({
          collections: { media: { prefix: "media" }, documents: { prefix: "documents" }, resumes: { prefix: "private/resumes" } },
          bucket: process.env.S3_BUCKET,
          config: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION || "ap-south-1",
            forcePathStyle: true,
            credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID || "", secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "" },
          },
        }),
      ]
    : [],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
