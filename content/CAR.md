# Transformation Layer Report — Kevin White

Site: kevinwhite.us | Sanity: kwhqwbb4 | Phase 5 gate review | 2026-04-17

Scans run against `src/` on dev branch after the contact-page clone. Migration fidelity compared against `content/site-inventory.md` (18 original pages).

---

## Part One — Already Delivered

| Area | Status |
|------|--------|
| Page count | 19 built (Home, About, Speaking, Books, Contact, Thank You, Blog index, 11 blog posts, 404) vs 18 in inventory + 404 |
| Navigation | `Layout.astro` renders the 6-item primary nav + 5 socials on desktop and a hamburger slide-down on mobile |
| Footer | Brand-standard copyright string `© {year} Kevin White. All rights reserved. • Powered by Spirit Media` is live on every page |
| Sanity CMS | 3 schemas (`blogPost`, `book`, `keynote`), 24 documents migrated, Studio embedded at `/studio`, publish webhook wired to CF Pages |
| Build | `npm run build` passes clean — 19 pages + sitemap-index.xml |
| SEO meta | Title + description prop on every page via `Layout.astro`; JSON-LD Person schema on `/`, Blog on `/blog`, BlogPosting on each post |
| Alt text | All 21 `<img>` tags carry alt attributes |
| TODO / placeholder | Only 4 legitimate `img-placeholder` divs (visual fallback when a Sanity asset is missing) and 1 stale comment in `src/lib/sanity.ts` |

---

## Part Two — Critical Fixes (must resolve before Phase 7)

### 1. External `wp-content` URLs — 17 references across 5 files

Hard rule from `/home/deploy/bin/tools-api/pipelines/migration/CLAUDE.md`: every `src="http"` and `url("http")` must resolve to `cdn.sanity.io` or `assets.spiritmediapublishing.com`. Anything else breaks the moment the old WordPress host is shut off.

| File | Count | What |
|------|-------|------|
| `src/pages/contact.astro` | 13 | Kevin hero, phone, KWI gradient bg, 5 covers in intermediate row, 7 Bestselling grid covers |
| `src/pages/speaking.astro` | 8 | 6 keynote videos + speaker-loop hero video + KWI gradient bg |
| `src/pages/index.astro` | 3 | 2 entrepreneur/speaker MP4 videos + KWI gradient bg |
| `src/pages/about.astro` | 1 | KWI gradient bg |
| `src/pages/books.astro` | 1 | KWI gradient bg |

Fix plan:
- **Images (book covers, Kevin, phone, KWI gradient)** → download, upload to Sanity via `$SANITY_TOKEN`, reference with `urlFor()` or extend `src/lib/images.ts`.
- **Videos (9 MP4 clips)** → per SMP media rule, prefer YouTube iframe embeds; only use R2 (`spirit-media-assets/kevin-white-us/`) when a YouTube source isn't available.
- After swap, re-run the scan — must return 0 matches.

### 2. Stale comment in `src/lib/sanity.ts`

Line 4: `// TODO: Replace with the new site's Sanity project ID` — the ID below it (`kwhqwbb4`) is already correct. Delete the comment.

---

## Part Three — Recommended Improvements (Phase 6)

| Area | Suggestion |
|------|-----------|
| Bestselling Author section (contact) | Heading-only right now per client request. Revisit once final section polish is decided. |
| Hero consistency | `contact.astro` hero stacks image+text on its own. Other pages use a full-bleed background hero — worth a unified treatment review. |
| Image responsiveness | After Sanity swap, use `urlFor().width(...).format('webp')` instead of raw CDN URLs so covers stay lean on mobile. |
| Video embeds | If moving to YouTube, wrap iframes in a 16:9 aspect container so mobile layouts don't jitter. |
| Social icon parity | Live page shows an X glyph; Layout renders the new X (twitter) icon — confirm client wants the new mark vs the legacy bird. |

---

## Next Actions

1. Remediate Part Two (17 URLs + 1 comment) — bulk asset upload + code swap.
2. Re-run the external-URL scan to confirm zero.
3. Commit to dev, push, and `inspect dev preview`.
4. Advance registry to Phase 6 once scan is clean.
