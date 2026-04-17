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

## Status -- as of 2026-04-17

### Completed & Live on Main
- Phase 8: Launch — dev merged to main 2026-04-17. Production deploy triggered via `wrangler pages deploy --branch=main`. **Live at https://www.kevinwhite.us/** (HTTP 200 on all routes + Sanity Studio). UptimeRobot monitor #802869384 watching www. Portal updated with liveUrl.
- **Apex (bare `kevinwhite.us`) pending** — GoDaddy can't flatten CNAME at apex; A records route to CF Pages but domain status stuck on "CNAME record not set". Either wait for CF Pages to flip active, or move NS to Cloudflare (Pattern 2) to get CNAME flattening. Pattern 2 needs Kevin's approval + email audit (Google Workspace MX + DKIM + SPF + DMARC + verification TXTs).

DNS state (2026-04-17 18:28 UTC):
- NS: ns67/68.domaincontrol.com (GoDaddy)
- apex A: 172.66.44.206, 172.66.47.50 (CF Pages anycast) — status pending
- www CNAME: kevin-white-us.pages.dev — ACTIVE
- MX: Google Workspace 5-record (unchanged) ✓

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
