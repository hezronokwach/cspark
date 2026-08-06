# CSPARK Website — Design & Build Plan

## Concept: "Planning for Justice"

An editorial, research-driven aesthetic for a spatial planning NGO. The visual language evokes maps, land, urban grids, and community — the core of spatial planning.

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep Forest Green | `#0B3D2E` |
| Accent | Terracotta | `#E2725B` |
| Dark | Deep Charcoal | `#141414` |
| Light | Warm Off-White | `#FAF8F5` |
| Secondary | Muted Gold | `#C9A227` |
| Text | Ink | `#1A1A1A` |
| Muted | Slate | `#6B7280` |

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display/Headings | Space Grotesk | 500–700 |
| Body | Inter | 400–500 |
| Editorial Accent | Cormorant Garamond (Italic) | 500–600 |

## Page Sections (Home)

1. **Sticky Header** — Logo, nav, "Partner With Us" CTA
2. **Hero** — "Spatial Planning for *Social Justice*" with topographic SVG pattern
3. **Thematic Quick-Links (Bento Grid)** — What We Do / Projects / Publications
4. **Impact Stats** — Animated counters (11+ Counties, 6 Thematic Areas, 20+ Studies, 5+ Years)
5. **Mission Statement (Green Block)** — 2×2 grid of focus areas
6. **Featured Projects** — 2–3 project cards
7. **Governance & Transparency strip** — Grant-readiness credibility
8. **News & Insights** — Horizontal cards
9. **Footer** — 4-column, registration number, legal links

## Tech Stack

- React (CRA)
- Tailwind CSS v3
- GSAP + @gsap/react + ScrollTrigger
- Lenis smooth scroll
- Google Fonts (Space Grotesk, Inter, Cormorant Garamond)

## Motion

- Lenis smooth scroll + GSAP ScrollTrigger
- Hero headline staggered reveal
- Section entrance reveals
- Animated stat counters
- Card hover lift + border shift
- Subtle parallax on project images
- `prefers-reduced-motion` fallback

## Grant-Readiness Features

- Registration number visible in footer
- Governance & Transparency section
- Strategic Plan as downloadable resource
- Named leadership/experts
- Safeguarding policy link