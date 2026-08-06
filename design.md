# CSPARK Visual Completion and Motion Pass

## Summary

Complete the editorial redesign with six original, photorealistic image assets, real scroll-driven animation, clearer project content, refined interaction details, and high-quality responsiveness across mobile, tablet, laptop, and large desktop layouts. The grey blocks shown in the screenshots are unfinished image placeholders; they will be replaced everywhere except the leadership cards, which remain intentionally image-free.

## Visual and Content Changes

- Generate and add six CSPARK-owned editorial photo assets:
  - Wide hero: Kenyan planning workshop with maps and documents; room on the left for headline text.
  - Tall track-record portrait: community member in a Kenyan urban setting.
  - Mission image: diverse Kenyan residents and planners reviewing a physical map.
  - Three project images: Lake Victoria shoreline/planning, Kisumu market traders, and settlement mapping with residents.
- Use real `<img>` elements with meaningful alt text, fixed aspect ratios, `object-fit: cover`, and subtle dark overlays only where white hero text requires contrast.
- Replace the project heading block with an immediately visible three-card grid directly beneath the heading; preserve the three real project subjects and remove the excessive empty vertical space.
- Keep leadership panels image-free, but replace their grey blocks with elegant typographic profile panels using names, roles, and a subtle neutral background.
- Refine buttons to a consistent `10px` rounded corner, orange-red primary state, visible focus ring, and restrained arrow movement on hover.
- Tighten section heights and desktop spacing so no section has a large blank area before meaningful content begins.

## Responsive Design

- Use four intentional layout ranges: small mobile, large mobile, tablet, and desktop/wide desktop; do not rely on a single mobile breakpoint.
- Keep the fixed header compact on small screens, with an accessible menu and full-width CTA only when the menu is open.
- Reflow every two-column editorial section into a content-first single column on mobile, with media placed immediately before or after its paired copy.
- Use responsive image aspect ratios: taller hero and portrait crops on mobile, balanced landscape crops on tablet, and editorial wide crops on desktop.
- Change service, governance, and project grids from three/four columns to two columns on tablet and one column on narrow screens; preserve card order and equal card heights where appropriate.
- Scale headings with fluid `clamp()` values, maintain readable body size and line length, and avoid horizontal scrolling at all viewport widths.
- Preserve scroll animations on capable larger screens, simplify timing and parallax on tablet, and use static or minimal transitions on mobile and reduced-motion devices.

## Animation and Interaction

- Register GSAP ScrollTrigger once centrally and ensure every animated component uses it correctly.
- Add section-specific reveals rather than one repeated effect:
  - Hero image slowly parallax-scrolls while text reveals by line.
  - Services reveal as a staggered grid with clip-mask image/frame movement.
  - Track-record figures count up when first visible.
  - Mission media wipes in horizontally while copy rises slightly.
  - Project cards reveal with staggered image crop motion and image zoom on hover.
  - Governance and footer enter with short directional reveals.
- Add a thin fixed scroll-progress line beneath the header.
- Use Lenis smooth scrolling only on non-reduced-motion devices and connect it to ScrollTrigger updates.
- Preserve `prefers-reduced-motion`: no parallax, count-up, scrolling interpolation, or reveal animation; all content remains immediately visible.

## Asset Generation Prompts

- All images: photorealistic editorial photography, East African context, natural daylight, authentic clothing and environments, documentary rather than stock-photo posing, no logos, no text, no watermark.
- Hero and mission: wide landscape compositions with deliberate negative space for web copy.
- Track record: vertical portrait crop with a confident, natural subject and environmental context.
- Projects: individual location-specific landscape images, composed for equal-height card crops.

## Verification

- Confirm generated image files are stored under the project’s public assets and each referenced path loads in production.
- Verify all six content sections have no placeholder grey panels, while leadership remains intentionally non-photographic.
- Test at 320px, 375px, 768px, 1024px, 1440px, and 1920px widths; check image crops, navigation, typography, cards, and no horizontal overflow.
- Test scrolling, image hover, focus states, navigation underline, touch targets, and reduced-motion behavior.
- Run the production build and test suite after implementation.

## Assumptions

- Generated imagery is used as temporary but production-quality visual content until CSPARK supplies approved photography.
- Leadership photos are explicitly out of scope for this pass.
- Existing project names, statistics, team names, and contact details remain unchanged.
