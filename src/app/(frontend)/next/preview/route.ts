import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

/** Turns on draft preview for CMS editors. Requires the preview secret and a signed-in CMS user. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "/";
  const secret = url.searchParams.get("secret") || "";

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) return new Response("Preview not allowed", { status: 403 });
  if (!path.startsWith("/") || path.startsWith("//")) return new Response("Invalid path", { status: 400 });

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) return new Response("Sign in to the CMS to preview", { status: 403 });

  (await draftMode()).enable();
  redirect(path);
}
