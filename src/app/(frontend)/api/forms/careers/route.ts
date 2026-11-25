import { after } from "next/server";
import { randomUUID } from "crypto";
import { getPayload } from "payload";
import config from "@payload-config";
import { getSettings } from "@/lib/cms";
import { clean, clientIp, isEmail, isPhone, rateLimit, sameOrigin, verifyTurnstile } from "@/lib/security";
import { careersAdmin, careersThankYou, notifyList, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

const MAX = 4 * 1024 * 1024; // Vercel request limit is 4.5 MB
const TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Checks the real file type from its first bytes, not just what the browser says. */
function sniff(buf: Buffer) {
  if (buf.subarray(0, 4).toString() === "%PDF") return "pdf";
  if (buf[0] === 0x50 && buf[1] === 0x4b) return "docx";
  if (buf[0] === 0xd0 && buf[1] === 0xcf) return "doc";
  return null;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "This form can only be sent from asktek.net." }, 403);
  const ip = clientIp(req);
  if (!rateLimit(`careers:${ip}`, 3)) return json({ error: "Too many applications from your connection. Please try again later." }, 429);

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return json({ error: "We could not read the form. Please try again." }, 400);
  }
  if (clean(fd.get("website"))) return json({ ok: true });
  if (!(await verifyTurnstile(clean(fd.get("turnstile"), 4000), ip))) return json({ error: "Please confirm you are not a robot and try again." }, 400);

  const a = {
    name: clean(fd.get("name"), 120),
    email: clean(fd.get("email"), 200).toLowerCase(),
    phone: clean(fd.get("phone"), 30),
    role: clean(fd.get("role"), 120),
    experience: clean(fd.get("experience"), 60),
    message: clean(fd.get("message"), 2000),
  };
  if (a.name.length < 2) return json({ error: "Enter your name." }, 400);
  if (!isEmail(a.email)) return json({ error: "Enter a valid email address." }, 400);
  if (!isPhone(a.phone)) return json({ error: "Enter a valid phone number." }, 400);
  if (fd.get("consent") !== "yes") return json({ error: "Please tick the consent box." }, 400);

  const file = fd.get("resume");
  if (!(file instanceof File) || !file.size) return json({ error: "Attach your CV." }, 400);
  if (file.size > MAX) return json({ error: "Your CV must be smaller than 4 MB." }, 413);
  const ext = TYPES[file.type];
  const buf = Buffer.from(await file.arrayBuffer());
  const real = sniff(buf);
  if (!ext || !real || (real === "pdf") !== (ext === "pdf")) return json({ error: "Attach your CV as a PDF or Word file." }, 400);

  const filename = `cv-${randomUUID()}.${ext}`;
  let cmsUrl: string | undefined;
  try {
    if (process.env.DATABASE_URI) {
      const payload = await getPayload({ config });
      const cv = await payload.create({ collection: "resumes", overrideAccess: true, data: { applicant: a.name } as never, file: { data: buf, mimetype: file.type, name: filename, size: buf.length } });
      const doc = await payload.create({
        collection: "job-applications",
        overrideAccess: true,
        data: { ...a, resume: cv.id, status: "new", consentAt: new Date().toISOString() } as never,
      });
      cmsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || ""}/admin/collections/job-applications/${doc.id}`;
    }
  } catch (e) {
    console.error("[careers] could not save:", (e as Error).message);
  }

  after(async () => {
    const s = await getSettings();
    const admin = careersAdmin(s, a, cmsUrl);
    const thanks = careersThankYou(s, a);
    await Promise.allSettled([
      sendEmail({ to: notifyList(process.env.CAREERS_NOTIFY_TO, s.hrEmail), ...admin, replyTo: a.email, attachments: [{ filename: `CV-${a.name.replace(/[^\w]+/g, "-")}.${ext}`, content: buf.toString("base64") }] }),
      sendEmail({ to: a.email, ...thanks, replyTo: s.hrEmail }),
    ]);
  });

  return json({ ok: true });
}
