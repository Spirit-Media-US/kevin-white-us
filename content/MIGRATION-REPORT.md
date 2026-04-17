# Kevin White — Migration Report

**Site:** kevinwhite.us
**Repo:** github.com/Spirit-Media-US/kevin-white-us
**Sanity project:** `kwhqwbb4`
**Launch date:** 2026-04-17
**Delivered by:** Jufrey / Spirit Media dev team

---

## 1. Executive Summary

The Kevin White site has been migrated from its WordPress/Bricks Builder origin to the Spirit Media stack (Astro 5 + Tailwind v4 + Sanity CMS + Cloudflare Pages + Cloudflare R2). Every page and every piece of content is now served from infrastructure the team controls. The domain `kevinwhite.us` resolves cleanly on both apex and `www.`, Google Workspace email is fully intact, and post-launch monitoring is in place.

**Live URLs**
- https://kevinwhite.us/ — primary
- https://www.kevinwhite.us/ — canonical secondary
- https://kevinwhite.us/studio/ — embedded Sanity Studio for client edits

---

## 2. What Was Delivered

### Pages (19 total)
| Route | Source |
|-------|--------|
| `/` | Static — Astro |
| `/about` | Static — Astro |
| `/speaking` | Static — Astro (podcasts, 6 keynote videos) |
| `/books` | Static — Astro (7 book cards from Sanity) |
| `/contact` | Static — Astro |
| `/thank-you` | Static — Astro |
| `/404` | Static — Astro |
| `/blog` | Static — search + tag-filter UI, Sanity data |
| `/blog/:slug` (×11) | Static — scripture-structured content + share + related + comment form |

### Sanity CMS schemas (3 types, 24 documents)
- `blogPost` — 11 documents, full content, tags, hero image
- `book` — 7 titles with cover images + Amazon links
- `keynote` — 6 speaking topics (text + video reference)

Studio embedded at `/studio/` (build-time static output). Publish webhook wired so client edits trigger a production rebuild.

### Media
- **Images** — all on Sanity CDN (`cdn.sanity.io/images/kwhqwbb4/production/`)
- **Video** — 9 MP4 clips on Cloudflare R2 at `assets.spiritmediapublishing.com/kevin-white-us/`
- **Favicon + Apple-touch** — committed under `/public/`
- **Nothing in git** — `.gitignore` blocks every media type

### Responsive + accessibility
- Fluid typography via `clamp()` on every heading and body size across all pages
- Global media-safety CSS (`max-width: 100%`, `overflow-wrap`, `box-sizing`)
- IntersectionObserver reveal-on-scroll with `prefers-reduced-motion` respect
- All images carry `alt` attributes
- Every page has distinct `title` + `description` meta + JSON-LD

---

## 3. The 8 Migration Phases

| # | Phase | Outcome |
|---|-------|---------|
| 1 | Infrastructure | Repo, CF Pages, Sanity project, dev scaffold, portal card |
| 2 | Content + CSS extraction | 18 pages crawled; `content/site-inventory.md`, `design-tokens.md`, `images.md`, per-page markdowns |
| 3 | Design + Build | 19 pages built from extracted content; Black Han Sans / Almarai / Lexend / Crimson Text fonts wired |
| 4 | Sanity CMS | 3 schemas, 24 docs, embedded Studio, Sanity→CF Pages rebuild webhook |
| 5 | CAR / Transformation review | Report at `content/CAR.md`; 17 external `wp-content` URLs migrated off the WordPress host |
| 6 | Design refinement | Blog SMP protocol applied (tags, search, filters, Related Posts, Share Bar, comment form); responsive pass; scripture-block rendering |
| 7 | Pre-launch QA | Full scan report at `content/QA-phase7.md` — 9/9 pass |
| 8 | Launch | Merged to main, DNS cutover Pattern 2, kevinwhite.us live with email preserved |

---

## 4. Phase 5 CAR Fixes

External-CDN rule: everything must resolve to `cdn.sanity.io` or `assets.spiritmediapublishing.com` so the old WordPress host can be retired without breaking anything.

| Asset | Destination |
|-------|-------------|
| Kevin hero portrait | Sanity (`kevinHero`) |
| Phone illustration (contact) | Sanity (`phone`) |
| KWI gradient background | Sanity (`kwiGradient`) |
| 9 video clips (homepage, speaking, keynote backgrounds) | R2 (`smp/kevin-white-us/*.mp4`) |
| 11 blog hero images (`KWI-Blog-N-*.png`) | Sanity (uploaded per post) |
| 7 book covers | Already in Sanity from Phase 4 |

Final scan returns zero matches for `wp-content` / `kevinwhite.us/wp` / `localhost` / `.local`.

---

## 5. Blog Protocol Compliance

Kevin's SMP Blog Protocol is applied end-to-end:

**Index (`/blog`)**
- Hero with devotional banner
- Sticky search bar (title / excerpt / author / tags)
- Tag filter chips (Faith / Purpose / Generosity / Leadership — editable in Sanity)
- Deep-link support via `?tag=Faith`
- Results count and empty state
- Paginated at 9 posts/page with arrow + numbered navigation

**Post (`/blog/:slug`)**
- Hero image + tag chips linking back to filtered index
- Scripture references rendered as dedicated cream blocks (book/chapter/verse + italic verse text grouped together)
- Sections like "Over to You!" detected and rendered as distinct headings with a top rule
- Lists, blockquotes, inline links, bold, italic — all rendered from portable text
- Share Bar (Facebook, X, LinkedIn, Copy Link with "Copied!" feedback)
- Related Posts (scores by shared tags; top 3)
- Comment form styled to match the WordPress original (persists to localStorage; can be wired to GHL later)

Classification of H1 blocks at render time distinguishes Bible references from prose headings using a book/chapter/verse regex — no manual tagging required.

---

## 6. Phase 7 QA Scorecard

| # | Scan | Result |
|---|------|--------|
| 1 | Hardcoded colors / inline styles | Pass — all 178 hits are cloned brand tokens (`#89cff0`, `#88cff1`, `#faf6ed`, `#c9b36b`, `#000`, `#fff`) |
| 2 | Missing alt text | Pass — every `<img>` carries `alt` |
| 3 | Missing SEO meta | Pass — `title` + `description` on every route |
| 4 | Leftover WordPress / dev URLs | Pass — zero matches |
| 5 | TODO / placeholder comments | Pass — zero matches |
| 6 | Sitemap coverage | Pass — 18 routes in `sitemap-0.xml` |
| 7 | Broken internal links | Pass — all `/…` hrefs resolve |
| 8 | Production build | Pass — 19 pages + sitemap, no errors |
| 9 | External image URLs | Pass — only `cdn.sanity.io` and `assets.spiritmediapublishing.com` |

Full scan log: `content/QA-phase7.md`.

---

## 7. Phase 8 Launch — Pattern 2 DNS Migration

Because GoDaddy cannot flatten a CNAME at the apex, the apex 404'd when DNS pointed to Cloudflare Pages via A records. Resolution: move the `kevinwhite.us` DNS zone to Cloudflare so CNAME flattening works.

### What was audited before cutting over
- 27 records in the GoDaddy zone, full dump saved to `/tmp/kw-godaddy-zone.json`
- Google Workspace: 5 MX, SPF, DKIM, DMARC, 3 site-verification TXTs
- Mailgun: 2 MX (`replies.`), SPF for `replies.`, 2 Mailgun DKIMs, CNAME `email.replies`

### Cutover sequence
1. Kevin created the CF zone via "Add a Site" — auto-imported 20 records
2. 5 Mailgun records (CF scanner missed) restored via API
3. Apex A records replaced with a **proxied CNAME** `@` → `kevin-white-us.pages.dev` (CF flattens)
4. GoDaddy registrar lock released, nameservers updated via API to `alexandra.ns.cloudflare.com` / `bart.ns.cloudflare.com`, registrar relocked
5. Post-propagation verification — email resolvers returned unchanged values, both URLs served 200

### Final resolver state
```
NS   → alexandra.ns.cloudflare.com, bart.ns.cloudflare.com
MX   → aspmx.l.google.com (priority 1) + 4 alt* (priorities 5, 5, 10, 10)
TXT  → v=spf1 include:_spf.google.com ~all
TXT  → v=DMARC1; p=none
TXT  → google._domainkey (DKIM) intact
MX   → replies.kevinwhite.us: mxa/mxb.mailgun.org
```

---

## 8. Infrastructure Inventory

| Service | Identifier |
|---------|-----------|
| Domain | `kevinwhite.us` (GoDaddy registration, Cloudflare DNS) |
| GitHub | `github.com/Spirit-Media-US/kevin-white-us` |
| Cloudflare Pages project | `kevin-white-us` |
| Cloudflare zone | `e0ba218335639aa6678859135d1bf7fb` |
| Sanity project | `kwhqwbb4` |
| R2 media prefix | `assets.spiritmediapublishing.com/kevin-white-us/` |
| UptimeRobot monitor | `#802869384` — 5-minute interval |
| Analytics | GA4 property `G-W3R21TNHTX` (SMP shared) |
| Portal dashboard entry | Live indicator green |

---

## 9. Handoff Items for Phase 9 (Client Delivery)

1. Invite Kevin as Sanity Editor (via API — project `kwhqwbb4`)
2. Share the client guide with the Studio URL and a short walkthrough video
3. Confirm the Sanity → CF Pages publish webhook fires on a test edit
4. Generate the post-launch roadmap doc listing deferred Phase 6 polish:
   - Consolidate 178 hex brand tokens into CSS vars
   - Wire comment form to GHL (currently localStorage)
   - Lighthouse + cross-browser audit on live domain
   - Hero-treatment consistency review
5. Send the client delivery email

---

## 10. Key Files

- `CLAUDE.md` — per-site context + current status
- `content/CAR.md` — Phase 5 review
- `content/QA-phase7.md` — Phase 7 scan results
- `content/dns-cutover.sh` — Pattern 1 fallback script (retained for reference)
- `content/site-inventory.md`, `design-tokens.md`, `images.md` — Phase 2 extraction
- `src/components/BlogCommentForm.astro`, `ShareBar.astro`, `RelatedPosts.astro`
- `src/lib/images.ts` + `sanity.ts` — asset + client wiring
- `studio/schemaTypes/{blogPost,book,keynote}.ts` — Sanity schemas

---

## 11. Sign-off Checklist

- [x] 19 pages build cleanly on main
- [x] Both apex and www serve HTTP 200 with valid SSL
- [x] Google Workspace email verified post-cutover (MX, SPF, DKIM, DMARC)
- [x] Mailgun reply path verified (replies subdomain records restored)
- [x] Sanity Studio reachable at `/studio/`
- [x] UptimeRobot monitor active on apex
- [x] Portal dashboard shows live indicator
- [x] No external CDN references remain in source
- [x] Sitemap submitted with the correct domain (`https://kevinwhite.us/sitemap-0.xml`)
- [x] `CLAUDE.md` status reflects reality
- [ ] Client invited as Sanity Editor (Phase 9)
- [ ] Post-launch roadmap delivered (Phase 9)
