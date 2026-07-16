# Authorities — JackieMiller.co

**Adjudicators (who can say no):**
- **Browsers & devices** — can break or blank the page (the current homepage's white crash is a live example). Mobile Safari/Chrome are first-class judges, not afterthoughts.
- **Real visitors, including assistive-tech and reduced-motion users** — can bounce, or simply be unable to use an image-hotspot homepage at all.
- **Search engines (Google)** — can bury the site; mobile-first indexing and page experience are ranking inputs.
- **The Vercel platform** — serves or silently 404s the build (proven 2026-07-15: Framework Preset "Other" served nothing for three weeks while every build was green).

**Stakes tier:** 2 — public, judged work; mistakes are fixable post-ship, but a broken homepage is a real reputational cost. No adjudicator can impose irreversible consequences.

**Re-verify cadence:** Tier 2 — at each gate run (pre-deploy).

| Authority | Governs | Source (link) | Verified | How | Traps |
|---|---|---|---|---|---|
| WCAG 2.2 (W3C Recommendation, rev. 2024-12-12), Level AA | Accessibility of the dreamscape: hotspot alt text (1.1.1), keyboard operability (2.1.1), visible focus (2.4.7), contrast ≥4.5:1 (1.4.3), target size (2.5.8) | https://www.w3.org/TR/WCAG22/ | 2026-07-16 | WebFetch of the W3C TR page; confirmed Recommendation status and AA criteria | The AA target-size criterion is **2.5.8 Target Size (Minimum), 24×24 CSS px** — 2.5.5 is the AAA "Enhanced" version and gets miscited constantly (the fetch summary itself confused them). Animation-from-interaction (2.3.3) is AAA, but `prefers-reduced-motion` support is still required by our own brief. |
| Core Web Vitals thresholds | Performance budget: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — at p75, mobile and desktop measured separately | https://web.dev/articles/vitals | 2026-07-16 | WebFetch; confirmed current stable metrics and thresholds | **INP replaced FID in 2024** — any FID-era lore or old Lighthouse guidance is stale. A big hero image scene puts LCP directly at risk; preload the day render only (per brief). |
| Google Search Essentials | Indexability + spam policies; page experience, interstitials, mobile-first indexing | https://developers.google.com/search/docs/essentials | 2026-07-16 | WebFetch; confirmed technical requirements, spam policies, page-experience sections | Content invisible without JS is content Google may not index — reinforces the brief's robust-by-default rule (content visible without JS). |
| Next.js 16.2.9 documentation (local) | Framework APIs and conventions for everything built in `src/` | `node_modules/next/dist/docs/` (pinned to installed 16.2.9) | 2026-07-16 | Read `index.md` in-repo; version confirmed against package.json | This Next.js **post-dates model training data** — APIs/conventions differ; AGENTS.md mandates reading the relevant local guide before writing code, and heeding deprecation notices. Never code this framework from memory. |

## Unverified leads (claims, not authorities — confirm before relying on)

- **Vercel framework-preset / deployment docs** — the 404 incident's root cause lives here; fetch and pin the relevant page before the first dreamscape deploy.
- **MDN `prefers-reduced-motion`** — implementation reference for the motion fallback; vendor-doc tier.
- **Audio licensing** — whatever ambient track Jacklyn picks needs its license text logged in-repo (brief requirement); the license itself becomes an authority when it exists.

## Project-earned standing rule (binds every deploy)

**The deploy-verify gate (earned 2026-07-15):** every deploy ends by loading `https://jackiemiller.co` in a real, foreground browser and confirming a human sees the intended page. Never trust a green build, a 200, or the in-app preview pane (it freezes animation timelines and shows false blanks).
