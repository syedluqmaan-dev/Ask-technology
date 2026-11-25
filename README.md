# ASK Technology website and CMS

asktek.net: Next.js 16 + Payload CMS 3 + Supabase (Postgres and Storage) + Vercel. Built by Ariar Technology.

One app serves the public website and the CMS at `/admin`. Publishing in the CMS updates the live site within seconds, with no rebuild.

**How to use the CMS:** see [CMS-GUIDE.md](CMS-GUIDE.md).
**Details to confirm with ASK:** see [CONTENT-REVIEW.md](CONTENT-REVIEW.md).

## Next steps, in order

1. **Run it on your computer:** steps 1 to 7 below. Fix any install or build error first and send it to us if needed.
2. **Deploy a preview on Vercel** with the same environment variables. Open `/admin` on the preview link and create the first Admin account.
3. **Run `npm run seed`, then `npm run import:legacy`** against the preview database, so all content, client logos, product screens and old articles are in the CMS.
4. **Internal check:** go through every page on phone and laptop and submit each form once (you should get both emails).
5. **Review session with Mr. Shahab** on the preview link. Make his changes in the CMS (or the code for layout changes).
6. **ASK approval**, then point asktek.net to Vercel (go-live checklist below).
7. **Submit the sitemap** in Google Search Console and Bing, and request indexing of the home and product pages.

### Client logos
Logos are shown on the home and About pages from **CMS → Customers → Client logos**. Until `npm run import:legacy` copies them into the CMS, they load from the old website (via `LEGACY_ORIGIN`). If a logo can't be loaded, the client's name is shown in its place, so the grid never looks broken. ASK can add or replace logos any time in the CMS.

---

## Setup, one step at a time

### 1. Install

```bash
npm install --legacy-peer-deps
```

### 2. Create the accounts (under an ASK-owned email)

| Service | What to create |
|---|---|
| Supabase | A project in **Mumbai (ap-south-1)**, Pro plan. Then a **private** Storage bucket named `asktek`, and S3 access keys (Storage → Settings → S3 connection). |
| Vercel | Pro plan, project linked to the GitHub repo, function region **bom1 (Mumbai)**. |
| Resend | Verify the domain `asktek.net` (DNS records), then create an API key. |
| Cal.com | An event type such as "TARGET 360 demo, 30 min". Its link (for example `asktek/demo`) goes into CMS → Site settings. |
| Cloudflare Turnstile | Optional but recommended: a widget for `asktek.net` in "Managed" mode. |

### 3. Environment variables

Copy `.env.example` to `.env`, fill it in, and add the same values in Vercel → Settings → Environment Variables. Never commit `.env`.

### 4. Create the database tables

```bash
npm run migrate:create initial && npm run migrate
```

### 5. Load all content

```bash
npm run seed
```

This loads products, 11 solution pages, 6 industry pages, 5 country and 30 city pages, 16 customer stories, 34 glossary terms, 3 guides, 7 legal pages and every website page.

### 6. Bring across the old site's articles and images (needs internet, run once)

```bash
npx playwright install chromium && npm run import:legacy
```

This imports the 61 old articles with their old IDs, so `/blog-details?id=…` links redirect to the new article pages. It also moves product screens, client logos and case-study images into the media library. Check each imported article in CMS → Blog → Articles.

### 7. Run it

```bash
npm run dev
```

Open http://localhost:3000 for the site and http://localhost:3000/admin for the CMS. The first account you create becomes the Admin.

### 8. Deploy

Push to GitHub. Vercel builds and deploys automatically.

---

## Go-live checklist

1. All environment variables are set in Vercel (Production).
2. CMS → Site settings: fill in the **Cal.com link**, **GTM ID**, **LinkedIn partner ID**, **Search Console / Bing verification codes**, **Grievance Officer** and **company registration details**.
3. Cal.com → Settings → Developer → Webhooks: add `https://www.asktek.net/api/webhooks/cal`, select Booking created, rescheduled and cancelled, and use the same secret as `CAL_WEBHOOK_SECRET`.
4. Point `asktek.net` and `www.asktek.net` to Vercel. Use `www` as the primary domain.
5. Test every form on the live domain: the lead is saved in the CMS, the visitor gets a thank-you email and sales gets the lead email.
6. In Google Search Console and Bing Webmaster Tools, submit `https://www.asktek.net/sitemap.xml` and request indexing of the home page and the six product pages.
7. Create or claim a Google Business Profile for the Chennai office with the same name, address and phone as the website. Local search and Maps leads depend on it.
8. Once images are imported (step 6), remove `LEGACY_ORIGIN` from Vercel.

---

## Where things are

```
src/
  app/(frontend)/     public website: pages, forms API, Cal.com webhook, previews
  app/(payload)/      CMS admin and REST API (do not edit) + custom.scss (CMS theme)
  app/sitemap.xml, sitemaps/[name], robots.ts, llms.txt, llms-full.txt, manifest.ts
  cms/                collections, globals, roles and modules, admin dashboard and logo
  components/         header, footer, forms, booking, consent, UI pieces
  content/            built-in content: seeds the CMS and is the fallback if the database is unreachable
  lib/                CMS data access, SEO metadata, structured data, email, security, sitemaps
  styles/globals.css  the whole design system (white and light blue, no dark sections)
  scripts/            seed and legacy import
```

## SEO, AEO and GEO built in

- **Every page:** unique title and description, self-canonical, Open Graph and X cards, breadcrumbs (visible and structured data).
- **Structured data:** Organization, LocalBusiness, WebSite, SoftwareApplication (each product), Service (solutions, industries, countries, cities), FAQPage, Article/TechArticle, DefinedTerm (glossary), JobPosting, ItemList and BreadcrumbList.
- **AEO:** each page opens with a 40 to 60 word direct answer, and question-style H2s and FAQ blocks are marked up.
- **GEO:** `/llms.txt` and `/llms-full.txt` for AI assistants. robots.txt explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others.
- **Sitemaps:** a sitemap index with 7 sitemaps, real last-modified dates from the CMS and image entries. Pages set to "Hide from Google" are left out.
- **Redirects:** 301s from every old asktek.net address, plus a CMS-editable redirect list. Wrong-case and stray-character links are cleaned automatically.
- **IndexNow** pings Bing and Yandex on every publish.
- **Fast:** pages are cached at the edge and refreshed on publish, fonts are self-hosted, images are served as AVIF/WebP, and tracking scripts load only after consent.

## Security

- **Headers:** HSTS preload, content security policy, X-Frame-Options, nosniff, a strict referrer policy and a locked-down Permissions-Policy.
- **Forms:** same-origin check, validation, honeypot, rate limit, Cloudflare Turnstile, and CV file-type checks on the actual file bytes.
- **CMS:** individual logins, Admin and Editor roles with per-module rights, lockout after 5 failed sign-ins, noindex, no Gravatar, GraphQL off, telemetry off.
- **Data:** leads, bookings and CVs are private and never readable through the public API. Secrets live only in environment variables.
- **Preview deployments** send `noindex` and block crawling.

## Day-to-day (CMS)

| Task | Where |
|---|---|
| Edit any page | CMS → Website pages. Use Live preview to see changes on phone, tablet and laptop as you type. |
| Add an article | CMS → Blog → Articles → Create. Fill in the SEO tab, then Publish. |
| Leads | CMS → Leads and enquiries. Change the status as you follow up. |
| Add a redirect | CMS → Settings → Redirects |
| Add a team member | CMS → Settings → Team. Choose Editor and tick their modules. |
