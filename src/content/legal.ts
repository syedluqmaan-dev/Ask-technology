import type { LegalDoc } from "@/lib/types";

/**
 * Legal pages. Tokens in {{double braces}} are filled from CMS → Settings → Site settings,
 * so company and grievance details stay correct everywhere when they change.
 * These drafts follow current Indian, UK, UAE, Sri Lankan and Bangladeshi requirements as understood at the time of writing
 * and should be reviewed by ASK Technology's legal adviser before go-live.
 */
const updated = "2026-11-23";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    summary: "What personal data this website collects, why, who it is shared with, how long it is kept and how to exercise your rights.",
    updated,
    seo: { title: "Privacy Policy | ASK Technology", description: "How ASK Technology collects, uses, shares and protects personal data on asktek.net, and how to exercise your rights." },
    body: {
      html: `
<p>This policy explains how {{company}} ("ASK Technology", "we", "us") handles personal data collected through {{site}} (the "website"). It does not cover the TARGET 360 software, which is governed by the agreement with each customer.</p>

<h2 id="who-we-are">1. Who we are</h2>
<p>ASK Technology is the data fiduciary (under India's Digital Personal Data Protection Act, 2023) and the controller (under the UK GDPR and similar laws) for personal data collected through this website.</p>
<p>Address: {{address}}<br>Email: {{email}}<br>Grievance Officer: {{grievanceName}}, {{grievanceEmail}}</p>

<h2 id="what-we-collect">2. What we collect</h2>
<table>
<thead><tr><th>Source</th><th>Data</th></tr></thead>
<tbody>
<tr><td>Contact, demo and partner forms</td><td>Name, work email, phone number, company, country, business type, product of interest, your message</td></tr>
<tr><td>Demo booking (Cal.com)</td><td>Name, email, chosen time slot, time zone and any notes you add</td></tr>
<tr><td>Job applications</td><td>Name, email, phone, role applied for, CV and anything you include in it</td></tr>
<tr><td>Campaign information</td><td>The page you landed on, the referring site and campaign tags (such as utm_source or gclid) stored with your enquiry</td></tr>
<tr><td>Analytics and advertising cookies (only with your consent)</td><td>Pages viewed, device and browser type, approximate location from IP address, ad click identifiers</td></tr>
<tr><td>Security logs</td><td>IP address, time of request and browser information, used to protect the website and forms from abuse</td></tr>
</tbody>
</table>
<p>We do not ask for, and ask you not to send, sensitive information such as financial account details or government identity numbers through this website.</p>

<h2 id="why">3. Why we use it, and on what basis</h2>
<ul>
<li><strong>To reply to your enquiry, arrange a demo or send a proposal.</strong> Basis: your consent, given when you submit the form, and our legitimate interest in responding to business enquiries.</li>
<li><strong>To consider your job application.</strong> Basis: your consent.</li>
<li><strong>To understand which pages and campaigns work</strong> (analytics and advertising). Basis: your consent through the cookie banner. You can withdraw it at any time.</li>
<li><strong>To keep the website secure and prevent spam.</strong> Basis: legitimate interest and legal obligation.</li>
<li><strong>To meet legal obligations</strong>, such as responding to lawful requests from authorities.</li>
</ul>
<p>We do not sell personal data, and we do not use it for automated decisions that have legal or similarly significant effects on you.</p>

<h2 id="sharing">4. Who we share it with</h2>
<p>We share personal data only with service providers that process it on our instructions, under contracts that require them to protect it:</p>
<table>
<thead><tr><th>Provider</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td>Vercel Inc.</td><td>Website hosting and delivery</td></tr>
<tr><td>Supabase Inc.</td><td>Database and file storage (hosted in the Mumbai region)</td></tr>
<tr><td>Resend</td><td>Sending confirmation and notification emails</td></tr>
<tr><td>Cal.com</td><td>Demo scheduling</td></tr>
<tr><td>Google (Tag Manager, Analytics, Ads)</td><td>Analytics and advertising measurement, only with consent</td></tr>
<tr><td>LinkedIn</td><td>Advertising measurement, only with consent</td></tr>
<tr><td>Cloudflare</td><td>Bot protection on forms</td></tr>
</tbody>
</table>
<p>We may also disclose data where required by law, to protect our rights, or as part of a merger or acquisition, in which case this policy will continue to apply.</p>

<h2 id="transfers">5. International transfers</h2>
<p>Some providers process data outside your country, including in the United States and the European Union. Where the law of your country requires it, we rely on appropriate safeguards such as standard contractual clauses, and we do not transfer data to any country restricted by the Government of India under the Digital Personal Data Protection Act, 2023.</p>

<h2 id="retention">6. How long we keep it</h2>
<ul>
<li>Enquiries and demo requests: up to 24 months after our last contact with you, unless you become a customer</li>
<li>Job applications: up to 12 months, unless you are hired or ask us to keep it longer</li>
<li>Analytics data: up to 14 months</li>
<li>Security logs: up to 90 days</li>
</ul>
<p>After these periods data is deleted or anonymised, unless we must keep it longer by law.</p>

<h2 id="rights">7. Your rights</h2>
<p>Depending on where you live, you can ask us to:</p>
<ul>
<li>tell you what personal data we hold about you and how we use it</li>
<li>correct, complete or update it</li>
<li>erase it</li>
<li>withdraw consent (this does not affect processing already done)</li>
<li>object to or restrict processing, or receive your data in a portable format (UK, EU and similar laws)</li>
<li>nominate another person to exercise your rights in the event of your death or incapacity (India)</li>
</ul>
<p>Write to {{grievanceEmail}}. We will respond within the time the law requires, and in any case within 30 days. If you are not satisfied, you may complain to the Data Protection Board of India, the UK Information Commissioner's Office, or the data protection authority in your country.</p>

<h2 id="security">8. How we protect it</h2>
<p>Data is encrypted in transit, stored with access limited to staff who need it, and protected by role-based access controls, security headers and bot protection. See our <a href="/security">Security page</a> for details. No system is completely secure; if a breach affects your data we will notify you and the authorities as the law requires.</p>

<h2 id="children">9. Children</h2>
<p>This website is for businesses and is not directed at anyone under 18. We do not knowingly collect children's data.</p>

<h2 id="laws">10. Country-specific information</h2>
<p><strong>India:</strong> Digital Personal Data Protection Act, 2023 and the rules under it; Information Technology Act, 2000.<br>
<strong>United Kingdom:</strong> UK GDPR and Data Protection Act 2018.<br>
<strong>United Arab Emirates:</strong> Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.<br>
<strong>Sri Lanka:</strong> Personal Data Protection Act, No. 9 of 2022.<br>
<strong>Bangladesh:</strong> applicable data protection law in force from time to time.</p>

<h2 id="changes">11. Changes</h2>
<p>We will post any changes on this page with a new "last updated" date. Significant changes will be highlighted on the website.</p>`,
    },
  },
  {
    slug: "terms",
    title: "Terms of use",
    summary: "The terms that apply when you use the asktek.net website, including acceptable use, intellectual property and governing law.",
    updated,
    seo: { title: "Terms of Use | ASK Technology", description: "Terms that apply to your use of the ASK Technology website, asktek.net: acceptable use, product information, intellectual property and governing law." },
    body: {
      html: `
<p>These terms apply to your use of {{site}} (the "website"), operated by {{company}} ("ASK Technology"). By using the website you accept them. If you do not, please do not use it.</p>

<h2 id="use">1. Using the website</h2>
<p>You may browse the website and share links to it for lawful business purposes. You must not:</p>
<ul>
<li>attempt to gain unauthorised access to the website, its servers or the content management system</li>
<li>introduce malware, run automated attacks, or overload the website</li>
<li>submit false information, spam or content you do not have the right to share through our forms</li>
<li>scrape or copy substantial parts of the website for a competing service</li>
</ul>
<p>Search engines and AI assistants may crawl and index the public pages in line with our robots.txt file.</p>

<h2 id="information">2. Information on the website</h2>
<p>Product descriptions, customer stories and articles are provided for general information. They describe typical capabilities and results reported by specific customers; your results will depend on your business, data and implementation. Nothing on the website is an offer capable of acceptance. The features, pricing and terms of TARGET 360 are set out in a separate proposal and agreement.</p>

<h2 id="ip">3. Intellectual property</h2>
<p>The website, its text, design, graphics, logos and software, and the names ASK Technology, TARGET 360, Target BMS, Quick OB and Inspection On Go, belong to ASK Technology or its licensors. Customer names and logos belong to their owners and are shown with permission. You may not use them without written consent.</p>

<h2 id="links">4. Links to other websites</h2>
<p>We are not responsible for the content or practices of websites we link to, including Cal.com for booking and social media platforms.</p>

<h2 id="liability">5. Liability</h2>
<p>The website is provided "as is". To the extent permitted by law, ASK Technology is not liable for any indirect or consequential loss arising from use of the website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.</p>

<h2 id="privacy">6. Privacy</h2>
<p>Our <a href="/privacy-policy">Privacy policy</a> and <a href="/cookie-policy">Cookie policy</a> explain how we handle personal data.</p>

<h2 id="law">7. Governing law</h2>
<p>These terms are governed by the laws of India. The courts at Chennai, Tamil Nadu have exclusive jurisdiction, subject to any mandatory rights you have under the law of your country.</p>

<h2 id="contact">8. Contact</h2>
<p>Questions about these terms: {{email}}. Complaints: our <a href="/grievance-officer">Grievance Officer</a>.</p>`,
    },
  },
  {
    slug: "cookie-policy",
    title: "Cookie policy",
    summary: "Which cookies the asktek.net website uses, why, and how to accept, reject or change your choice at any time.",
    updated,
    seo: { title: "Cookie Policy | ASK Technology", description: "Which cookies asktek.net uses, why, and how to accept, reject or change your choice." },
    body: {
      html: `
<p>Cookies are small files stored in your browser. This website uses as few as possible, and only essential ones are set before you choose.</p>

<h2 id="types">1. Cookies we use</h2>
<table>
<thead><tr><th>Type</th><th>Purpose</th><th>Set without consent?</th></tr></thead>
<tbody>
<tr><td>Essential</td><td>Remember your cookie choice, protect forms from bots, keep the CMS login secure for our staff</td><td>Yes</td></tr>
<tr><td>Analytics (Google Analytics via Google Tag Manager)</td><td>Count visits and see which pages are useful</td><td>No</td></tr>
<tr><td>Advertising (Google Ads, LinkedIn)</td><td>Measure whether our ads lead to enquiries</td><td>No</td></tr>
<tr><td>Booking (Cal.com)</td><td>Show the booking calendar on the demo page</td><td>Only when you open that page</td></tr>
</tbody>
</table>

<h2 id="consent">2. Your choice</h2>
<p>When you first visit, a banner asks whether to allow analytics and advertising cookies. Until you accept, Google consent mode keeps these tags from storing cookies. You can change your choice at any time with the <strong>Cookie settings</strong> link at the bottom of every page, or by clearing cookies in your browser.</p>

<h2 id="third-parties">3. Third-party cookies</h2>
<p>Google, LinkedIn and Cal.com set and read their own cookies under their own privacy policies. We do not control those cookies.</p>

<h2 id="more">4. More information</h2>
<p>See our <a href="/privacy-policy">Privacy policy</a>, or write to {{email}}.</p>`,
    },
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    summary: "How to read the customer stories, results, articles and product information published on the asktek.net website.",
    updated,
    seo: { title: "Disclaimer | ASK Technology", description: "Disclaimer for information, customer stories, articles and results published on asktek.net." },
    body: {
      html: `
<p>The information on {{site}} is published by {{company}} in good faith for general information about ASK Technology and the TARGET 360 products.</p>
<h2 id="results">Customer stories and results</h2>
<p>Customer stories describe the experience of named customers, in their words or summarised from their accounts. Figures such as time saved or efficiency gained are results those customers reported. They are not a promise of the same results for every business.</p>
<h2 id="articles">Articles and guides</h2>
<p>Articles, guides and glossary entries explain industry practice in general terms. They are not legal, tax, financial or engineering advice. Industry news articles reflect information available at the time of writing and may become outdated.</p>
<h2 id="products">Product information</h2>
<p>Features are described as generally available. Availability of a feature for your business, and its configuration, are confirmed in your proposal.</p>
<h2 id="trademarks">Trademarks</h2>
<p>Third-party names and trademarks mentioned on the website belong to their owners. Their mention does not imply endorsement, unless stated.</p>`,
    },
  },
  {
    slug: "grievance-officer",
    title: "Grievance Officer",
    summary: "How to raise a complaint about this website or our handling of your personal data.",
    updated,
    seo: { title: "Grievance Officer | ASK Technology", description: "Contact the ASK Technology Grievance Officer about personal data or content on asktek.net." },
    body: {
      html: `
<p>In accordance with the Information Technology Act, 2000, the rules made under it, and the Digital Personal Data Protection Act, 2023, ASK Technology has appointed a Grievance Officer.</p>
<h2 id="contact">Contact</h2>
<p><strong>{{grievanceName}}</strong><br>Grievance Officer, {{company}}<br>{{grievanceAddress}}<br>Email: <a href="mailto:{{grievanceEmail}}">{{grievanceEmail}}</a><br>Phone: {{phone}}</p>
<h2 id="how">How to raise a grievance</h2>
<ol>
<li>Email the Grievance Officer with your name, contact details and a description of the issue.</li>
<li>If it concerns your personal data, tell us which right you want to exercise (access, correction, erasure, withdrawal of consent or nomination).</li>
<li>We acknowledge complaints within 24 hours and aim to resolve them within 15 days, or sooner where the law requires.</li>
</ol>
<p>We may ask you to verify your identity before acting on a request about personal data.</p>
<h2 id="escalation">If you are not satisfied</h2>
<p>You may approach the Data Protection Board of India, or the data protection authority in your country.</p>`,
    },
  },
  {
    slug: "security",
    title: "Security and data protection",
    summary: "How the asktek.net website protects the information you share: encryption, protected forms, private storage and access control.",
    updated,
    seo: { title: "Website Security and Data Protection | ASK Technology", description: "How the ASK Technology website protects your data: encryption, access control, bot protection and responsible disclosure." },
    body: {
      html: `
<p>This page describes how the {{site}} website protects the information you share with us. Security of the TARGET 360 software for customers is described in each customer agreement.</p>
<h2 id="measures">What we do</h2>
<ul>
<li><strong>Encryption in transit.</strong> The website is served only over HTTPS, with HTTP Strict Transport Security so browsers never fall back to an unencrypted connection.</li>
<li><strong>Hardened browser security.</strong> A content security policy limits which scripts can run; other headers block clickjacking and content sniffing and switch off camera, microphone and location access.</li>
<li><strong>Protected forms.</strong> Every form checks that it was sent from this website, validates and limits input, uses a hidden trap and invisible bot checks, and rate-limits repeated submissions.</li>
<li><strong>Private storage.</strong> Enquiries, bookings and CVs are stored in a private database and file store, in the Mumbai region, and are never readable through the public website.</li>
<li><strong>Access by role.</strong> Our staff sign in to the content system with individual accounts, see only the modules they need, and are locked out after repeated failed sign-ins.</li>
<li><strong>Least data.</strong> We collect only what we need to respond to you, and keep it only for the periods in our <a href="/privacy-policy">Privacy policy</a>.</li>
<li><strong>Keys and secrets</strong> are held in our hosting provider's encrypted environment settings, never in code.</li>
</ul>
<h2 id="disclosure">Responsible disclosure</h2>
<p>If you believe you have found a security issue on this website, please email {{email}} with the details. Please do not access data that is not yours or disrupt the service. We will acknowledge your report and keep you informed.</p>`,
    },
  },
  {
    slug: "accessibility",
    title: "Accessibility statement",
    summary: "Our commitment to an accessible website, the standard we work to, known limitations and how to report a barrier.",
    updated,
    seo: { title: "Accessibility Statement | ASK Technology", description: "ASK Technology's commitment to making asktek.net accessible, and how to report a problem." },
    body: {
      html: `
<p>We want everyone to be able to use {{site}}, including people who use screen readers, keyboard navigation, magnification or voice control.</p>
<h2 id="standard">Our standard</h2>
<p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. The website uses semantic headings and landmarks, text alternatives for images, visible keyboard focus, sufficient colour contrast, labelled form fields with clear error messages, and respects your device's reduced-motion setting.</p>
<h2 id="known">Known limitations</h2>
<ul>
<li>The demo booking calendar is provided by Cal.com; its accessibility is managed by Cal.com. If you cannot use it, call {{phone}} or email {{email}} and we will book for you.</li>
<li>Some older articles imported from our previous website may lack detailed image descriptions. We are reviewing them.</li>
</ul>
<h2 id="feedback">Feedback</h2>
<p>If you find a barrier on this website, email {{email}} with the page address and the problem. We will reply within five working days.</p>`,
    },
  },
];
