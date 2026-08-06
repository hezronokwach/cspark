# CSPARK Website — Design Revamp Brief for Codex

Paste this directly into Codex in the project repo root. Read the existing landing
page code first, then follow this brief. Do not start writing code until you've
completed Step 1 (the design plan) in Section 6.

---

## 1. What's wrong with the current build (be honest about this)

The current landing page reads as AI-generated because it uses the *default*
palette, type treatment, and layout patterns that show up on nearly every
AI-assisted site right now — not because those choices are bad in isolation,
but because they appear regardless of what the site is actually about. Specifically:

- **The palette is the single most common "AI default" right now**: a deep
  forest-green dark section paired with a coral/terracotta accent. This exact
  pairing shows up constantly. It needs to go.
- **Italic serif script on accent words** ("*just* cities", "*Social Justice*",
  "*grounded* research", "*Capacity*") is a cliché — a display italic dropped
  into an otherwise plain sans headline to signal "this is designed." It reads
  as a template move, not a typographic decision.
- **Uniform 3-up icon + title + description cards**, repeated for values,
  leadership, and thematic areas, all with identical treatment.
- **Numbered `01 / 02 / 03 / 04` markers** on the governance cards (Participatory
  Research, Audited Accounts, Safeguarding, Data Protection) — these aren't a
  sequence, so the numbering is decorative, not informative.
- **Pill-shaped badges** for the values list (INTEGRITY, PARTICIPATION,
  DIVERSITY, ACCOUNTABILITY, SOCIAL GOOD).
- **Big-number-over-small-label stat blocks** in a symmetric grid (11+ / 20+ /
  6 / 5+) — this is the literal template answer for "how do I show credibility,"
  used regardless of subject.
- **Identical "Find out more →" links** repeated with the same styling on every
  card, everywhere.
- **Flat solid-color placeholder blocks** standing in for leadership photos —
  same green/orange rectangles repeated with no distinction between people.
- Everything center-aligned in a fixed-width container, same vertical padding
  rhythm every section, soft-shadow rounded cards floating on flat backgrounds.

None of this is unfixable — it just needs a point of view that's specific to
CSPARK, not portable to any other NGO site.

---

## 2. Ground the design in CSPARK's actual subject matter

CSPARK works in **spatial planning, land, and GIS** — cartography, cadastral
survey, contour maps, plot boundaries, informal settlement mapping, county
administrative boundaries, the Lake Victoria basin. That's a rich, specific
visual vocabulary that a generic "NGO template" doesn't have access to. Use it
as real design material, not as a decorative afterthought:

- Stylized or real contour-line patterns as ambient texture and motion.
- Coordinate readouts, plot references, or scale bars as *structural* labels —
  these can replace the meaningless `01/02/03/04` numbering with something
  that's actually true of the content (e.g. real county names, real
  lat/long-style references, a legend format).
- Site-plan / blueprint conventions: thin hairline rules, north arrows, legend
  keys, dashed boundary lines, grid coordinates in the margins.
- A cursor that behaves like a surveyor's crosshair or compass rather than the
  default arrow, on non-touch devices.
- Per-theme and per-person visual identifiers drawn from this vocabulary
  instead of a generic icon library (see Section 5).

---

## 3. New design token system

Treat this as a starting point, not a locked spec — but don't drift back
toward the forest-green/coral pairing or the italic-script accent while
adapting it.

**Color** (define as CSS variables / Tailwind theme tokens, used consistently
— no one-off inline hex values):

| Role | Suggested value | Use |
|---|---|---|
| Ink | `#0E1B18` (near-black, blueprint-dark petrol, not pure green) | Dark sections, primary text on light |
| Paper | `#EDEAE0` (warm, slightly grey-green off-white — not cream) | Light section backgrounds |
| Accent — plot-boundary red | `#AE4A31` | Primary CTA, key emphasis — warmer and darker than a coral default |
| Accent — contour ochre | `#B48A42` | Secondary emphasis, hover states |
| Cartographic blue-grey | `#4C6B71` | Links, map elements, secondary UI |
| Line/hairline grey | `#C9C4B4` | Dividers, borders, legend rules |

**Type**: three roles, each doing one job.
- **Display** — a serious face with real character, set upright (not italic),
  used large and sparingly. Consider a heavy slab or humanist serif with
  presence — something with the gravity of an official land document or
  survey stamp, not a script.
- **Body** — a clean, highly legible grotesk for everything people read at
  length.
- **Mono** — a technical monospace for coordinates, stats, dates, and legend-
  style labels. This is a deliberate choice here, not decoration: CSPARK's own
  work runs on coordinates and data, so a mono face for numbers is on-brief in
  a way it wouldn't be for most NGOs.

**Layout**: break the centered-container sameness. Use an asymmetric editorial
grid — full-bleed map or texture moments interrupting narrower text columns,
varied section rhythm instead of identical padding every time, elements that
occasionally break the grid on purpose.

**Signature element** (the one thing this site should be remembered for): an
ambient topographic contour pattern that redraws itself as the visitor scrolls
— standing in for planning-as-process — combined with real coordinate/legend-
style labels used as structural markers throughout instead of generic numbers
or icons. Spend the design's "boldness budget" here; keep everything else
disciplined around it.

---

## 4. Motion and interaction

One well-orchestrated moment reads as more designed than five scattered
effects. Pick the signature moment above and execute it properly; keep
everything else restrained and purposeful.

- **Page load**: rather than a generic fade-and-slide-up, have the contour/
  grid pattern draw itself in behind the hero (SVG path animation), with the
  headline revealing line by line just after.
- **Scroll storytelling**: numbers in the stats strip count up as they enter
  view (scroll-linked, not on a timer); background map/contour layers move at
  a different speed than foreground text for a subtle parallax; the nav
  compresses on scroll rather than staying static.
- **Micro-interactions**: magnetic buttons (the button nudges toward the
  cursor); a custom crosshair/compass cursor that changes state over
  interactive elements; project cards reveal a small stylized map sketch on
  hover instead of a plain scale-up; nav links get a drawn underline instead
  of a color swap.
- **Transitions**: since more pages are coming, plan a page-transition pattern
  now — the View Transitions API or Framer Motion's `AnimatePresence`, with a
  "map redraw" wipe rather than a plain cross-fade.
- **Libraries**: Framer Motion (`motion/react`) for component and layout
  animation; GSAP + ScrollTrigger for the pinned/scroll-linked sequences
  (standard for this tier of site); Lenis for smooth inertia scrolling so the
  scroll feel matches the animation timing.
- **Restraint matters**: respect `prefers-reduced-motion` with a genuinely
  complete static fallback, not just disabled transitions. Overuse of motion
  is itself one of the things that reads as AI-generated — use it where it
  serves the content, not everywhere it's technically possible.

---

## 5. Section-by-section direction for the existing landing page

- **Header**: keep the floating pill concept but simplify — logo + a slim
  trigger that opens full nav as an overlay works better than a permanently
  crowded bar. Keep "Partner With Us" visually distinct, but restyle off the
  coral.
- **Hero**: replace the flat gradient background with the contour/texture
  signature moment. Rebuild the headline in the new display type, upright, no
  italic accent word. Keep the stat strip but see below.
- **Stats strip (11+ / 20+ / 6 / 5+)**: move away from four identical boxes.
  Style it like a legend or data ledger — a horizontal strip in the mono
  face, hairline-divided, that feels pulled from a survey document rather
  than a generic dashboard widget.
- **Mission statement block**: drop the italic "Social Justice" treatment.
  If a phrase needs emphasis, carry it with scale or weight in the same
  typeface, not a typeface switch.
- **Thematic areas grid**: give each theme (Spatial Planning & Governance,
  Urban Livelihoods, Infrastructure/Housing/Security, Gender Mainstreaming) a
  distinct custom line-mark drawn from cartographic vocabulary — plot
  boundaries, route lines, a settlement grid — instead of a generic icon set.
  Break the uniform 2×2 card grid; let card sizes vary by content weight.
- **"Built on Accountability" governance strip**: drop the `01–04` numbering
  entirely — it's not a real sequence. Use clean typographic hierarchy or
  small purpose-built marks instead.
- **Values pills** (Integrity, Participation, Diversity, Accountability,
  Social Good): retire the pill-badge treatment. Weave these into a short
  typographic list or a single well-set sentence instead of five identical
  capsules.
- **Leadership cards**: the flat solid-color rectangles standing in for
  photos are the weakest part of the current build. Until real photos are
  available, replace them with something considered — a duotone treatment in
  the ink color, or a unique abstract cartographic pattern per person tied to
  their specialism (a GIS grid for the GIS specialist, route lines for the
  transport planner, a governance flowchart motif for the governance expert)
  rather than a flat color swatch with no connection to the person.
- **Projects (Marine Spatial Planning, Street Traders, Informal Settlement
  Mapping)**: the "The Issue / Outcome" structure is good — it's real
  information, keep it. Replace the plain gradient image blocks with a
  stylized map fragment specific to each project's location (an abstracted
  Lake Victoria shoreline, a Kisumu market grid, a settlement outline). Add a
  hover state that reveals a location pin or a small stat.
- **"Partner with us" CTA band**: this is now the site's most important
  conversion point (see the content brief — Get Involved is the priority
  page). Give it real presence through the signature contour motion rather
  than a flat dark block with two buttons.
- **Footer**: structurally fine — just bring the type and spacing in line with
  the new system and drop the coral.

---

## 6. Process — do this in order

1. **Write the plan before writing code.** Produce a short design-token plan:
   the exact 6-color palette (hex values), the exact 3-font stack (display /
   body / mono, with fallbacks), a one-paragraph layout concept, and a single
   sentence naming the signature element.
2. **Self-critique that plan.** Check it hasn't drifted back to forest-green +
   coral, or to italic-script accents, or to a cream-and-serif look. If any
   part of it feels like the generic default for "NGO website," revise it and
   note what changed.
3. **Implement the token system centrally** (CSS custom properties or a theme
   config) so color and type are consistent everywhere — not set inline
   per-component.
4. **Rebuild the landing page section by section**, following Section 5.
5. **Add the motion layer**: the signature moment first, then the restrained
   micro-interactions. Don't scatter effects for their own sake.
6. **Review at desktop, tablet, and mobile breakpoints.** Check keyboard focus
   states are visible and intentional (not the browser default, not removed).
   Check the `prefers-reduced-motion` fallback is genuinely complete, not just
   "animations off."
7. **Final gut check**: does this look like someone spent a week designing it,
   or like it was prompted in one pass? If unsure, cut one thing — remove an
   accessory rather than add another.

---

## 7. Quality floor for award-tier consideration

- Fully responsive across mobile, tablet, and desktop — not a binary
  mobile/desktop split.
- Visible, well-designed keyboard focus states throughout.
- `prefers-reduced-motion` respected with a complete, still-elegant static
  version of every animated moment.
- Animations use `transform`/`opacity` only — no layout-triggering properties,
  to keep scroll and interaction smooth.
- Custom cursor disables gracefully on touch devices.
- No leftover placeholder text, template comments, or unused component
  scaffolding.
- One consistent spacing scale used everywhere — no ad hoc padding values.

---

## 8. Explicit anti-checklist — remove these

- [ ] Forest-green + coral/terracotta color pairing
- [ ] Italic serif script on accent words
- [ ] Uniform icon + title + description cards with identical treatment
- [ ] `01/02/03/04`-style numbering on non-sequential content
- [ ] Pill-badge treatment for the values list
- [ ] Big-number/small-label stat grid
- [ ] Identical "Find out more →" link styling repeated everywhere
- [ ] Flat solid-color rectangles as photo placeholders