# Image Inventory — Kevin White

## Migration Plan

Note: The site uses lazy-loading (placeholder SVGs until JavaScript executes).
Actual image URLs are NOT available via static HTML fetch.
Images MUST be downloaded via Playwright browser automation before Phase 4.
Action: Run Playwright to load each page, extract real img src values, then download to /tmp/kevin-white-us-images/.

| Filename | Original URL | Dimensions | Used on | Destination |
|----------|-------------|------------|---------|-------------|
| kevin-hero.jpg | Homepage hero section | ~1920x800 | Homepage hero | Sanity |
| kevin-headshot.jpg | About page, Contact page | ~400x400 | About, Contact | Sanity |
| kevin-speaking.jpg | Speaking page hero | ~1920x800 | Speaking hero | Sanity |
| book-audacious-generosity.jpg | Books page | ~300x450 | Books, Homepage | Sanity |
| book-get-to-the-point.jpg | Books page | ~300x450 | Books, Homepage | Sanity |
| book-whats-your-word.jpg | Books page | ~300x450 | Books, Homepage | Sanity |
| book-ultimate-marketing.jpg | Books page | ~300x450 | Books | Sanity |
| book-only-god-works.jpg | Books page | ~300x450 | Books | Sanity |
| book-childrens-book.jpg | Books page | ~300x450 | Books | Sanity |
| book-gifts.jpg | Books page | ~300x450 | Books | Sanity |
| magazine-goodness.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-faithfulness.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-multiply.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-joy.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-rewarded.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-paths.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-revelation.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-fight.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-boasting.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-succeed.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| magazine-relationships.jpg | Blog index | ~600x400 | Blog index, post | Sanity |
| podcast-logos.png | Speaking page "As heard on" | ~800x100 | Speaking | Sanity |
| keynote-videos | Speaking page (6 video embeds) | — | Speaking | YouTube embed (iframe) |
| social-icons | Header/footer SVGs | — | All pages | Static SVG inline |

## Action Items
- Download all images from kevinwhite.us to /tmp/kevin-white-us-images/ using Playwright
- Upload to Sanity project kwhqwbb4
- Video embeds remain as YouTube iframes
- SVG social icons will be inline in code (not Sanity)

## Rules
- All images → Sanity (client uploads via Studio, auto-optimized CDN)
- Audio → R2 (manual upload) — none found on this site
- Video → YouTube iframe embed (never <video> tag)
- NOTHING goes in the Git repo
