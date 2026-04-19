# Kevin White

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: Kevin White | Repo: github.com/Spirit-Media-US/kevin-white-us | Domain: kevinwhite.us | Sanity ID: kwhqwbb4

**Migration protocol:** /home/deploy/bin/tools-api/pipelines/migration/CLAUDE.md
**Original site:** https://kevinwhite.us/

## Dev Commands

- `npm run dev` -- local preview (port 4331)
- `npm run build` -- production build to dist/

## Mandatory -- Before Starting Work
Always start Claude sessions from inside this directory:
```
cd ~/Sites/kevin-white-us && claude
```
Then run: `git checkout dev && git pull origin dev`

## Stack

- Astro 5 + Tailwind CSS v4
- Sanity Studio at kevin-white-us.sanity.studio
- Cloudflare Pages: kevin-white-us.pages.dev
- Dev preview: dev.kevin-white-us.pages.dev

## Status -- as of 2026-04-18

### Performance optimization (2026-04-18, on dev)
- Mobile PSI: now 96-98 (best of 3 = 98). Previously 96 with occasional 98s.
- Right-sized book cover images (w=400 -> w=220 mobile via srcset); saved ~225KB bandwidth
- Added explicit width/height to all book-cover imgs + header logo (fixes unsized-images audit, prevents CLS)
- Shrunk mobile logo request (w=400 -> w=320)
- Set build.inlineStylesheets: 'auto' explicitly in astro.config.mjs
- Tried R2-hosted hero (commits 53e56c0+20a7cd0) — reverted because it created connection contention with the 7 font preloads on assets.spiritmediapublishing.com (longest chain jumped 289ms -> 442ms). Sanity CDN hero is optimal: its own origin, races in parallel with fonts.
- Remaining blocker: 14KB Tailwind chunk on critical path (367ms render-blocking). Inlining it (inlineStylesheets 'always' or assetsInlineLimit bump) makes HTML 72KB and hurts FCP +200ms — net loss. Leave external.

## Status -- as of 2026-04-17

### Completed & Live on Main
- Phase 8: Launch — **FULLY LIVE 2026-04-17**. dev merged to main, production deploy via wrangler. Both https://kevinwhite.us/ and https://www.kevinwhite.us/ return 200 on all routes (/, /blog, /blog/<slug>, /studio, sitemap). UptimeRobot monitor #802869384 watching the apex. Portal updated with liveUrl.
- Pattern 2 DNS migration applied — NS moved from GoDaddy (`ns67/68.domaincontrol.com`) to Cloudflare (`alexandra/bart.ns.cloudflare.com`). CF zone `e0ba218335639aa6678859135d1bf7fb` holds the mirror. Apex uses a proxied CNAME to `kevin-white-us.pages.dev` (CF flattens at apex). Full GoDaddy zone backed up at `/tmp/kw-godaddy-zone.json` pre-cutover.
- Email integrity verified post-cutover:
  - 5× Google Workspace MX (priority 1, 5, 5, 10, 10)
  - SPF `v=spf1 include:_spf.google.com ~all`
  - Google DKIM `google._domainkey`
  - DMARC `_dmarc` → `v=DMARC1; p=none`
  - 3× google-site-verification TXTs
  - 2× Mailgun MX for `replies.` + Mailgun SPF + 2 Mailgun DKIMs (restored manually; CF Add-a-Site missed them on import — documented in `content/dns-cutover.sh`)

### Completed on Dev
- Phase 1: Infrastructure — repo, Sanity project, CF Pages, dev branch, scaffold
- Phase 2: Content + CSS extraction — 18 pages crawled, design tokens, image catalog
- Phase 3: Design + Build — 19 pages built (6 static + 11 blog posts + blog index + 404)
- Phase 4: Sanity CMS — 3 schemas (blogPost, book, keynote), 24 docs migrated, embedded Studio, webhook
- Phase 5: CAR / Transformation Layer — report at `content/CAR.md`. Migrated 3 images to Sanity + 9 videos to R2 (`smp/kevin-white-us/`). Blog protocol applied: tags field, search + filter chips, share bar, related posts, comment form. 11 blog posts re-imported with structured content (scripture refs, lists, sections). Favicon wired. Site-wide fluid typography + responsive pass (clamp() across all pages). Premium reveal-on-scroll animations.
- Phase 7: Pre-Launch QA — manual scan run 2026-04-17, report at `content/QA-phase7.md`. All 9 scans pass (colors, alt, SEO, WP leftovers, TODOs, sitemap, internal links, build, external URLs). Phase 6 polish deferred — not a launch blocker.

### Awaiting Kevin
- Phase 8: Launch — ready to merge dev → main once approved. DNS Pattern 1 recommended (registrar DNS → Pages, safe for email).
- Phase 9: Client Delivery — after launch.

### Deferred (optional Phase 6)
- Consolidate 178 hex brand colors into CSS vars
- Hero treatment consistency across pages
- Wire comment form to GHL webhook (currently localStorage only)
- Lighthouse + cross-browser pass on live domain

## Sanity Content Audit

| Page | Content Block | Decision | Reasoning |
|------|-------------|----------|-----------|
| All pages | Blog/magazine posts (11) | **Sanity** (blogPost) | Client publishes new devotional content |
| Books | Book listings (7) | **Sanity** (book) | Client adds new books, updates Amazon links |
| Speaking | Keynote topics (6) | **Sanity** (keynote) | Client adds/updates speaking topics |
| Homepage | Hero, roles, sections | Static | Single instance, rarely changes |
| About | Bio, facts, services | Static | Single instance, developer updates |
| Contact | Address, phone, form | Static | Rarely changes |
| Thank You | Confirmation message | Static | Structural |
| 404 | Error page | Static | Structural |
| All pages | Nav, footer, layout | Static | Structural |
| All pages | JSON-LD, SEO meta | Static | Technical SEO |

## Rules

- All work goes to the **dev** branch -- never push directly to main
- Only merge dev to main when Kevin says "push to main"
<!--
100 Club commitments template — copy this block verbatim into a site's CLAUDE.md
during Phase 2H of the execute plan. Substitute kevin-white-us with the actual R2 path slug.
The guardrails script (/home/deploy/bin/100club-lint.sh) self-skips any site whose
CLAUDE.md lacks the heading "## 100 Club commitments", so installing this block
activates the pre-commit lint on the site.
-->

---

## 100 Club commitments (locked — do not regress)

**100 Club bar = homepage, median-of-5. Inner pages are quality work, not gate criteria.**

Every commitment below is a LOAD-BEARING structural decision. Do not "re-add" any of them without understanding the consequences.

### Hero image(s) are R2-only, NOT Sanity
- **URL pattern**: `https://assets.spiritmediapublishing.com/kevin-white-us/hero-*.webp` (plus any other LCP images moved to R2 per this site's hero structure)
- **Why**: same origin as fonts (one TLS handshake), stable URL enables 103 Early Hints, hardcoded URL survives Sanity edits without rebuild
- **To change a hero**: upload a new WebP (matching sizes at matching quality) to the same R2 path. Any Sanity fields for the hero image have been removed from the schema — editors cannot change the hero via the CMS.

### CSS must stay wrapped in @layer base
- `Layout.astro`'s `<style is:inline>` wraps everything in `@layer base` except `@font-face` and `@keyframes`.
- **Why**: unlayered rules beat every `@layer` rule regardless of specificity. Tailwind v4 ships utilities in `@layer utilities`. If critical CSS is unlayered, `.grid-cols-1` overrides external `.lg:grid-cols-4` and grids collapse site-wide.

### ClientRouter is OFF
- No `<ClientRouter />`, no `import { ClientRouter }` in Layout.astro.
- **Why**: static marketing sites don't need SPA nav. Saves ~125ms forced reflow + ~100ms script eval on mobile.
- All page JS uses `DOMContentLoaded` with readyState guard.

### GA loads on first user interaction
- Events: scroll, mousemove, touchstart, keydown, click. 8s fallback timeout.
- **Why**: Lighthouse never interacts, so GA doesn't load in audits. Real users get GA after they engage (post-LCP).

### `<a>` elements on dark backgrounds MUST have an explicit default-state color class
- Base `a { color: var(--color-red|primary) }` rule in `global.css` otherwise applies → brand color on dark bg fails WCAG.
- Any new `<a href="tel:">`, `<a href="mailto:">`, or link in a dark section needs `text-stone-400` / `text-stone-100` / similar. `hover:text-*` doesn't protect the default state.

### `[data-animate]` transitions are transform-only, no opacity
- `global.css`: `transition: transform 0.65s cubic-bezier(...)`. **Do NOT add `opacity` back to the transition.**
- **Why**: Lighthouse captures frames mid-transition; a 0.65s opacity fade catches text at ~50% opacity → 40+ false color-contrast failures. Transform-only gives the same visual slide-in without the a11y artifact.
- If the site doesn't use `data-animate` at all, this commitment is preventive only.

### Early Hints, CSP, X-Robots-Tag in public/_headers
- `X-Robots-Tag: index, follow` overrides CF Pages' default `noindex` on `*.pages.dev`
- CSP allows CF Insights (`static.cloudflareinsights.com` in `script-src`, `cloudflareinsights.com` in `connect-src`) + all origins actually used by this site
- `Link:` headers for 2 critical fonts on `/*` + hero image on `/` → CF Pages promotes to HTTP/2 103 Early Hints

### Images: width/height attrs match urlFor dimensions
- Every below-fold `<img>` has both attrs. Any urlFor resize change must update the attrs in the same commit.
- `sizes` attribute = actual display width in px, NOT `100vw` (the latter forces over-delivery at DPR 2).

### Build pipeline
- `inlineStylesheets: 'auto'` (NOT `'always'`)
- `scripts/async-css.mjs` postbuild rewrites external CSS to `media="print" onload` swap (invoked from `package.json` build script)
- `scripts/100club-verify.mjs` post-build Playwright asserts grids + h-N images + console errors — blocks bad builds
- `/home/deploy/bin/100club-lint.sh` is wired into `lefthook.yml` pre-commit
- No `@playform/inline` / Beasties — incompatible with TW v4 utility-heavy markup
