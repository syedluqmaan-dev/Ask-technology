# ASK Technology website: how to use the CMS

The CMS is where ASK's team changes anything on the website: text, images, products, customer stories, articles, client logos, menus and settings. It also lists every lead and demo booking.

## Where to open it

| Where | Address |
|---|---|
| Live website | https://www.asktek.net/admin |
| Preview (before go-live) | `https://<your-vercel-preview-link>/admin` |
| On your computer (development) | http://localhost:3000/admin |

The CMS is hidden from Google and needs a login.

## First login (done once, by Ariar)

1. Open `/admin`. The first time, it shows **Create your first user**.
2. Enter a name, email and a strong password. This first account automatically becomes the **Admin**.
3. Open **Settings → Team** and add ASK's people:
   - **Role: Editor.** Then tick only the modules each person needs: Website pages, Products and solutions, Locations, Blog, Customers and logos, Glossary, Leads and bookings, Careers, Settings.
   - **Role: Admin** only for people who should be able to change everything, including users.
4. Each person signs in with their email and password. "Forgot password" sends a reset email.

After 5 wrong passwords, an account is locked for 15 minutes.

## What's in the CMS

| Menu | What you can do |
|---|---|
| **Dashboard** | New leads, leads this week, upcoming demos, published articles, and shortcuts to every section |
| **Website pages** | Home, About, AI Solution, Careers, Partner, Contact and Book a demo: every heading, paragraph, button, FAQ and image |
| **Products and solutions** | Product pages, solution pages, industry pages |
| **Locations** | Country and city pages (linked from the footer) |
| **Customers** | Customer stories and **client logos** |
| **Blog** | Articles, categories, glossary |
| **Careers** | Job openings (each appears on the site and in Google Jobs) |
| **Leads and enquiries** | Leads, demo bookings, job applications and CVs |
| **Settings** | Site settings (contact details, tracking IDs, booking link, legal details), menus, redirects, legal pages, media library, team |

## Everyday tasks

### Change text or an image on a page
1. Open **Website pages** and choose the page (for example Home page).
2. Edit the text or replace the image.
3. Click **Live preview** to see it on phone, tablet and laptop as you type.
4. Click **Publish changes**. The live website updates within seconds.

**Save draft** keeps your changes without publishing them.

### Add or change a client logo
1. Open **Customers → Client logos**.
2. Open a client or click **Create new**.
3. Upload the logo (PNG with a transparent or white background works best) and fill in the image description, for example "Saturn Textiles logo".
4. Optionally link it to the client's customer story.
5. Tick **Show on home page**, set **Order** (lower numbers show first), then **Publish**.

### Add a blog article
1. Open **Blog → Articles → Create new**.
2. Fill in the title, a two-sentence summary, the cover image and the article text.
3. In the **SEO** tab, write a title tag (under 60 characters) and a description (120–155 characters).
4. On the right, choose the category and date, then **Publish**.

### Follow up a lead
1. Open **Leads and enquiries → Leads**.
2. Open the lead. You'll see the name, company, phone, email, message, and the page and campaign it came from.
3. Change **Status** as you go (New, Contacted, Demo done, Proposal sent, Won, Not a fit) and add internal notes.

Every new lead is also emailed to the sales team, and the visitor gets a thank-you email automatically.

### Post a job
**Careers → Job openings → Create new**. Fill it in and publish. To close the role, untick **Open**.

### Redirect an old link
**Settings → Redirects → Create new**. "From" is the old address starting with `/`, and "To" is the new address.

### Hide a page from Google
Open the page, go to its **SEO** tab, tick **Hide from Google** and publish.

## Good habits

- Always fill in the **image description**. Google and screen readers use it.
- Keep each page's **direct answer** (the boxed paragraph near the top) short and factual. Google and AI tools quote it.
- Don't change a page's **slug** (web address) once it's live. If you must, add a redirect from the old address.
- Only publish customer numbers that the customer has confirmed.

## New in this version (approved design)

- **Home page → Hero:** "Gradient words in the heading" picks which words show in blue. "Ticks under the buttons" is one tick per line.
- **Home page → Order stages:** each stage now has an icon name (tag, swatch, factory, clock, shield…).
- **Products:** new "Brand" field (e.g. Target BMS) used on badges.
- **About page:** new "Why choose us" list. **AI Solution page:** new "Benefits" list.
- **All other pages:** "Gradient words in the heading", same as the home hero.
- **Leads:** now also store City and Preferred demo time (from the Book a demo picker).
- **Book a demo:** if a Cal.com link is set in Site settings → Integrations, the live Cal.com calendar shows. If it is empty, the date-and-time picker shows and each request arrives as a lead.
