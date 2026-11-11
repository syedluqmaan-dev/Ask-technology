# ASK Technology website

Next.js 15 (App Router) + TypeScript. Built by Ariar Technology.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploy: push to GitHub and import into Vercel, or run `npx vercel deploy --prod` in this folder.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero with live product screens, client logos, stats, lifecycle, product explorer, AI, customer stories, CEO quote, insights |
| `/products` and `/products/[slug]` | All TARGET products, and one page per product with screens, features, FAQs, related stories and demo form |
| `/ai-solution` | AI-Powered Fashion ERP |
| `/case-studies` and `/case-studies/[slug]` | 16 customer stories with filters, and a page per story |
| `/insights` | 60 articles with topic filters |
| `/about`, `/careers`, `/partner-with-us`, `/contact` | Company pages (CEO, vision, mission, engagement model) |
| `/book-a-demo` | Demo booking with products, date, time slot and time zone |

Also: `sitemap.xml`, `robots.txt`, structured data (Organization, SoftwareApplication, FAQ, Breadcrumb, Article), and 301 redirects from every old asktek.net URL, including each old case study link.

## Images

Product screenshots, client logos and case study images come from ASK's existing site:

- `/assets/images/projects/*.png`: product mockups
- `/cms/partner/<file>`: client logos
- `/cms/case-study/<file>`: case study images

If a file is not in `public/`, `next.config.ts` loads it from `LEGACY_ORIGIN` (default https://asktek.net), so every image shows from day one.
**Before asktek.net points to this site**, copy the files into `public/` at the same paths, or keep the old site running on a subdomain (e.g. https://legacy.asktek.net) and set `LEGACY_ORIGIN` and `NEXT_PUBLIC_LEGACY_ORIGIN` to it. Blog articles are also served from there until the CMS is connected.

## Where to edit content

- Products: `src/data/products.ts`
- Customer stories: `src/data/caseStudies.ts`
- Articles: `src/data/blog.ts`
- Client logos: `src/data/clients.ts`
- Contact details and social links: `src/data/site.ts`
- Colours: CSS variables at the top of `src/app/globals.css`

## Forms

All forms post to `/api/lead`. Set `LEAD_WEBHOOK_URL` to forward each lead as JSON to ASK's CMS or CRM.

## Still needed from ASK

CEO photo, current job openings, real social media links, privacy policy and terms text, and confirmation of the name behind the "FC" logo.
