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

### Still Pending
- Phase 2: Content + CSS Extraction
- Phase 3: Design + Build
- Phase 4: Wire Sanity CMS
- Phase 5: CAR / Transformation Layer Report
- Phase 6: Design Refinement
- Phase 7: QA
- Phase 8: Launch

## Rules

- All work goes to the **dev** branch -- never push directly to main
- Only merge dev to main when Kevin says "push to main"
