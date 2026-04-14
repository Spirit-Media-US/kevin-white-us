# Design Tokens — Kevin White

Extracted from https://kevinwhite.us/ on 2026-04-14
Platform: WordPress + Bricks Builder

Note: CSS computed values could not be extracted via JavaScript (WebFetch limitation).
Values below are inferred from visual inspection and Bricks Builder defaults.
Phase 3 Stitch designs will refine these. Playwright extraction should be attempted
if available to verify/correct these values.

## Colors
| Token | Hex | Used on |
|-------|-----|---------|
| primary | #1a1a1a | headings, nav text, body text |
| secondary | #c8a96e | accent gold, CTAs, hover states |
| bg-main | #ffffff | body background |
| bg-alt | #f7f5f2 | alternating section backgrounds, warm off-white |
| bg-dark | #1a1a1a | dark sections, footer background |
| text-primary | #1a1a1a | body text |
| text-secondary | #666666 | captions, meta text |
| text-light | #ffffff | text on dark backgrounds |
| link | #c8a96e | inline links |
| link-hover | #b08f50 | link hover state (darker gold) |
| border | #e5e5e5 | card borders, dividers |
| button-bg | #c8a96e | primary button background (gold) |
| button-text | #ffffff | primary button text |
| button-bg-dark | #1a1a1a | secondary button background |
| footer-bg | #1a1a1a | footer background |
| footer-text | #cccccc | footer text |

## Typography — Desktop (1280px)
| Element | Font Family | Size | Weight | Line Height | Letter Spacing |
|---------|------------|------|--------|-------------|---------------|
| h1 | "DM Serif Display", serif | 56px | 400 | 1.2 | -0.02em |
| h2 | "DM Serif Display", serif | 40px | 400 | 1.3 | -0.01em |
| h3 | "DM Serif Display", serif | 28px | 400 | 1.4 | 0 |
| h4 | "DM Serif Display", serif | 22px | 400 | 1.4 | 0 |
| body | "Inter", sans-serif | 16px | 400 | 1.7 | 0 |
| nav link | "Inter", sans-serif | 14px | 500 | 1 | 0.05em |
| button | "Inter", sans-serif | 14px | 600 | 1 | 0.08em |
| small/meta | "Inter", sans-serif | 13px | 400 | 1.5 | 0 |
| eyebrow | "Inter", sans-serif | 12px | 700 | 1 | 0.15em |

## Typography — Mobile (375px)
| Element | Font Family | Size | Weight | Line Height | Letter Spacing |
|---------|------------|------|--------|-------------|---------------|
| h1 | "DM Serif Display", serif | 36px | 400 | 1.2 | 0 |
| h2 | "DM Serif Display", serif | 28px | 400 | 1.3 | 0 |
| h3 | "DM Serif Display", serif | 22px | 400 | 1.4 | 0 |
| body | "Inter", sans-serif | 16px | 400 | 1.7 | 0 |

## Spacing — Desktop
| Element | Padding | Margin | Max Width |
|---------|---------|--------|-----------|
| container | 0 40px | 0 auto | 1200px |
| section | 80px 0 | 0 | — |
| hero | 120px 40px | 0 | — |
| card | 32px | 0 0 24px | — |
| header | 20px 40px | 0 | — |
| footer | 60px 40px | 0 | — |

## Spacing — Mobile
| Element | Padding | Margin | Max Width |
|---------|---------|--------|-----------|
| container | 0 20px | 0 auto | 100% |
| section | 48px 0 | 0 | — |
| hero | 60px 20px | 0 | — |
| card | 20px | 0 0 16px | — |
| header | 16px 20px | 0 | — |
| footer | 40px 20px | 0 | — |

## Decorations
| Element | Border Radius | Box Shadow | Transition |
|---------|--------------|------------|------------|
| button | 0 (square/sharp) | none | all 0.3s ease |
| card | 8px | 0 2px 12px rgba(0,0,0,0.08) | box-shadow 0.3s ease |
| image | 0 | none | — |
| nav | 0 | none | — |

## Navigation
| Viewport | Type | Details |
|----------|------|---------|
| Desktop | Horizontal links | Logo left, 6 nav links center/right, social icons right |
| Mobile | Hamburger → slide-out panel | Logo left, hamburger right |

## Design Notes
- Clean, minimal aesthetic — lots of whitespace
- Gold accent color (#c8a96e) for CTAs and highlights
- Dark/light section alternation pattern
- Serif headings + sans-serif body (editorial feel)
- Video embeds on speaking page (keynote presentations)
- Newsletter signup CTA in footer on every page
- Professional/pastoral tone — not corporate
