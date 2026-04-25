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
