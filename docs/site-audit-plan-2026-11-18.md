# Site audit plan: jackiemiller.co (2026-11-18)

## Headline

The live site is the **Webflow** site ("Courses for Beauty Educators"), not this repo. This Next.js repo is the old LXD portfolio and no longer serves the domain. The audit targets Webflow.

Live today: Home, 404, 401. Everything else is a draft.

## What is already known (found while scoping)

### Fix before anything publishes

| # | Finding | Evidence |
|---|---------|----------|
| 1 | The homepage's only H1 is the word **"Bad"** | Live HTML. The real headline is not an H1. |
| 2 | Mobile is slow: **LCP 29.1s**, CLS 0.166. Desktop LCP 4.4s, blocking time 705ms | Ubersuggest PageSpeed run, 2026-11-18 |
| 3 | One background image, `Group 10268.png` (1.83MB, a template leftover set in CSS), is almost half the page. Corrected after pass 1: the 3.0MB and 2.35MB originals exist but browsers load smaller variants | Browser load, pass 1 |
| 4 | Sitemap lists one URL. No service or case-study page is indexable | `/sitemap.xml` |
| 5 | Price conflict: Custom Courses draft says **"Starting at $6,500"**. Working range is $15k to $50k | Draft page copy and SEO description |
| 6 | Contact form: placeholders mark all four fields required, only Email and Comment are. No confirmation email, no thank-you redirect, so no conversion to track | Webflow form settings |
| 7 | Personal Gmail and phone number sit in the page source as plain links | Live HTML |

### Fix soon

| # | Finding |
|---|---------|
| 8 | `<html>` has no `lang` attribute |
| 9 | Credential mismatch: Webflow says "MS", service drafts say "M.S.", this repo's old homepage says "MEd" |
| 10 | "Need state approval? Built in." appears on Home, Start and Custom Courses. The Clean Station brief bans "approved" wording. Pick one rule |
| 11 | Homepage runs two process sections: the five-step beauty one and a four-step corporate one ("Inside the apps your team already uses"). Two audiences on one page |
| 12 | "Free 30-minute strategy call" has no booking link behind it |
| 13 | Two images have no alt text. One alt is "976" |
| 14 | New and old drafts have no Open Graph image |
| 15 | Template leftovers still in the site: Change Log, Licenses, "Style Gud", all with "Amplify" template SEO text |
| 16 | Old-positioning drafts still in the site: AI-Augmented LXD, The Portfolio That Answers Back (two copies), Digital Literacy |
| 17 | Vercel project `jackie-miller-co` still claims `jackiemiller.co` and `www`. DNS points at Webflow, so it serves nothing |
| 18 | `lessons/why-blonde-goes-brassy/README.md` in this repo tells you to iframe `jackiemiller.co/lessons/...`. That URL now 404s. The live lesson is at `work.jackiemiller.co` |

## The audit, in order

1. **Technical and SEO crawl.** Ubersuggest site audit on the live domain. Re-run PageSpeed after the image fixes in row 3. Add JSON-LD (Person, Service, FAQ) to the service pages.
2. **Copy consistency.** One pass across every page for rows 5, 9, 10, 11, plus the TBD placeholders listed below.
3. **Conversion path.** Submit the form for real, confirm where it lands, add a thank-you state and a booking link.
4. **Mobile and accessibility QA in a real browser.** Not done yet. This session could not load `www.`, `work.` or `read.` subdomains, and drafts do not render until staged. Do this on the Webflow staging domain before publishing.
5. **Search baseline.** Ubersuggest project exists with 0 of 25 keywords and 0 of 2 competitors tracked. Fill both, then read AI-visibility (10 prompts already set).
6. **Publish gate.** No TBDs, no template pages, OG image set, sitemap shows every page, real-domain fetch returns 200.

## Connectors

| Connector | State | Use |
|-----------|-------|-----|
| Webflow | Working, read and write | Pages, copy, SEO fields, forms, publish. Missing one scope: agent instructions |
| Ubersuggest | Working | PageSpeed, site audit (3 per day), keyword and AI-visibility tracking |
| Vercel | Working | Only needed to release the stale domain claim (row 17) |
| GitHub | Working | This repo, plus `jacklyn747.github.io` (source of `work.jackiemiller.co`) |
| Ahrefs | Free plan | Domain rating only |
| Semrush | Connected, not tested | Keyword and competitor research if Ubersuggest runs out |
| Gmail, Calendar, Drive, Craft | Connected, not touched | Lead routing from the form, booking, proposals |

## Pages built this session (Webflow drafts, nothing published)

| Page | Slug | Built from | Left for Jackie |
|------|------|-----------|-----------------|
| Clean Station case study | `/clean-station` | Brassy case-study layout, facts from the course brief | Review copy |
| Lash Radar case study | `/lash-radar` | Same layout, facts from the app | Review copy |
| Course Audit | `/course-audit` | Custom Courses layout | Price, timeline, after-audit answer. Tile images are still the Custom Courses ones |
| Learning Apps | `/learning-apps` | Custom Courses layout | Price, timeline, ownership, after-launch, download answer. Hero image is still the Brassy screens |

Already drafted before this session, still holding placeholders: **Custom Courses** (timeline, ownership, after-launch, filming, testimonial slot), **Start**, **Why Blonde Goes Brassy** case study.

Not done: the homepage and header nav do not link to any of these pages yet. That is a change to the live page, so it waits for a go.

## Decisions needed

1. Price floor on the site: $6,500, $15k, or no number.
2. Prices and timelines for Course Audit and Learning Apps.
3. Keep or cut the "state approval" line.
4. Delete the template and old-LXD drafts, or keep them parked.
5. This repo: archive it, or point a subdomain at it.

## Pass 1 results (2026-11-18): live homepage

Three checks run: an Ubersuggest crawl, a real-browser load at phone and desktop size, and an automated accessibility scan (axe, WCAG 2 A and AA).

**Limit on this pass.** The test browser could not reach the host that serves jQuery, so Webflow's animations never ran. Layout screenshots from it are not trustworthy and are not used here. Structure, weight and accessibility findings do not depend on that script.

### New findings

| # | Finding | Evidence |
|---|---------|----------|
| 19 | **74 elements start at `opacity:0`** and wait for JavaScript to reveal them. If the script is slow or blocked, most of the page is blank. This is the likely cause of the 29s mobile LCP, not confirmed | Inline styles in live HTML; blank render when the script was blocked |
| 20 | No `prefers-reduced-motion` handling anywhere | Site CSS and HTML |
| 21 | Page weight is about 4MB, 3.5 to 3.9MB of it images | Browser load |
| 22 | No `<main>` landmark, and 27 to 28 blocks of content sit outside any landmark | axe |
| 23 | Form fields have no labels, only placeholders. No `autocomplete` on name, email or phone | Browser DOM |
| 24 | Heading outline is broken: "MS", "BFA", "03", "01" and the footer wordmark are H2s; the phone number is an H3 and the email an H4 | Browser DOM |
| 25 | The project and newsletter cards render twice in the DOM (slider duplicate), so every card link and heading is doubled for screen readers and crawlers | Browser DOM |
| 26 | Horizontal overflow on desktop: the "Who I am" image block runs 12px past the viewport | Browser DOM |
| 27 | Tap targets under 24px tall: Menu (20px), phone and email links (16px on mobile) | Browser DOM |
| 28 | Ubersuggest health score 68. It crawled 6 URLs, including `work.jackiemiller.co`, and flags thin content there: the work hub has 29 words, the Brassy lesson 192 | Ubersuggest crawl |
| 29 | Ubersuggest reports no sitemap, although `/sitemap.xml` returns 200 and `robots.txt` points to it. Unresolved; check in Google Search Console | Ubersuggest crawl vs direct fetch |
| 30 | No traffic, keyword or backlink data exists for the domain yet | Ubersuggest domain overview returned empty |

### Confirmed from the scoping list

Rows 1 (H1 is "Bad"), 6 (form required-field mismatch), 8 (no `lang`), 12 (the call link only scrolls to the form).

### Clean

No broken links, no 4xx responses, no duplicate titles or descriptions, canonical tag present, JSON-LD present (WebSite and Person), every image lazy-loaded, no colour-contrast failures detected.

### Not yet run

Steps 2 to 6 of the plan: copy consistency, a real form submission, layout QA on staging with scripts loading, search baseline, publish gate.
