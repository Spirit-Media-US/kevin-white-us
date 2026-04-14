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

## Status -- as of 2026-04-14

### Completed & Live on Main
- (nothing yet)

### Completed on Dev
- Phase 1: Infrastructure — repo, Sanity project, CF Pages, dev branch, scaffold
- Phase 2: Content + CSS extraction — 18 pages crawled, design tokens, image catalog
- Phase 3: Design + Build — 19 pages built (6 static + 11 blog posts + blog index + 404)
- Phase 4: Sanity CMS — 3 schemas (blogPost, book, keynote), 24 docs migrated, embedded Studio, webhook

### Still Pending
- Phase 5: CAR / Transformation Layer Report
- Phase 6: Design Refinement
- Phase 7: QA
- Phase 8: Launch

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
