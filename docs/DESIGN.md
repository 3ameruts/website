# Creative Direction & Design System

> Status: v2 — aligned to the official identity of **Jordanian Advanced Laboratory Equipment** (brand sheet supplied by the client).
> Every brand token below lives in `src/app/globals.css` (`@theme`) and `src/content/site.ts`; swapping the identity is a token edit, not a redesign.

## 1. Brief, restated

**Subject.** A supplier and integrator for medical equipment, laboratory instruments, consumables, lab furniture and complete laboratory fit-outs (design → install).
**Audience.** Procurement officers, lab managers, hospital biomedical engineers, university research leads, QC managers in industry. Mostly B2B, often bilingual (Arabic / English), often reading on a phone between meetings, often needing to forward a link to a committee.
**Primary job of the site.** Convince a technical buyer in under a minute that this company can be trusted with a whole laboratory, then make it effortless to request a quote for specific items or a full project.

## 2. Three directions explored

### A — "Clinical Swiss"
White field, black type, a single teal, strict 12-column Swiss grid, everything flush-left, small photography.
*Strength:* calm, credible. *Weakness:* reads as a pharma annual report; no cinematic charge; video feels bolted on. Too close to the generic "clean medtech" template.

### B — "Night Lab"
Entirely deep navy, glowing teal accents, full-bleed dark footage, holographic UI references.
*Strength:* dramatic. *Weakness:* sci-fi rather than procurement-grade; dark-only pages hurt long reading (catalog, specs); glowing accents drift toward the "AI aesthetic" the brief forbids.

### C — "Graduated" ✅ selected
The organising idea comes from the laboratory itself: the **graduation scale** on a cylinder or pipette — the thing every lab uses to measure precisely.
- Pages alternate between **navy "chapters"** (cinematic: hero, showcase, contact) and **clinical-white "chapters"** (editorial reading: introduction, solutions, commitments, catalog). The rhythm is light ↔ dark, like moving from a corridor into a lit lab.
- One signature device, used with restraint: a **graduation gauge**. On desktop it sits on the inline-end edge, fills as you scroll (a liquid level), and its major ticks are the page's chapters — clickable, so it is navigation, not decoration. The hero's scroll cue is the same scale in miniature.
- Image reveals use the same metaphor: images "fill" upward (clip-path from the bottom) — only on the large editorial images, never on every card.
*Why it wins:* subject-specific (nobody else's site would use it the same way), cinematic where it counts, readable where it counts, and every motion has a reason.

## 3. Colour — official identity (Jordanian Advanced Laboratory Equipment)

Source: client brand sheet (logo, stationery, palette). The four brand colours are used **exactly**; the derived shades exist only where WCAG contrast requires them and are never used as brand colours on their own.

| Token | Hex | Source | Role |
|---|---|---|---|
| `navy` | `#0B2D6B` | **Brand** | Primary text, primary buttons, dark chapters (hero, showcase, contact, footer). 13.1:1 on white. |
| `teal` | `#00A99D` | **Brand** | Fills, the brand band, gauge "liquid", large display accents, icons. 2.9:1 on white → never small text on light; 4.5:1 on navy → large text only on dark. |
| `gray` | `#E6E9ED` | **Brand** | Alternate light sections, input fields, image mats. |
| `white` | `#FFFFFF` | **Brand** | Default page field, text on navy. |
| `navy-deep` | `#08224F` | derived | Raised/layered surfaces inside navy chapters. |
| `teal-ink` | `#00786F` | derived | Teal *text* and links on white / gray (5.4:1 / 4.4:1 – used ≥ 18px on gray). |
| `teal-light` | `#5CD6CB` | derived | Teal *text* on navy (7.5:1). |
| `slate` | `#4A5670` | derived | Secondary text on white/gray (7.4:1 / 6.0:1). |
| `line` | `#CDD3DB` | derived | Hairlines on light. |
| `line-dark` | `rgba(255,255,255,.16)` | derived | Hairlines on navy. |

**Brand device — the stationery band.** The business card and letterhead end in a navy band with a teal segment that begins on a diagonal cut. This is used as the site's structural signature: page footers, the hero's bottom edge, section closers and the button hover fill all use the same angled navy/teal split. It replaces the earlier "amber" accent, which is not part of the identity and has been removed.

No gradients except a single navy legibility scrim over video/photography. No purple. No glass.

## 4. Typography

- **Logo:** always the supplied artwork (`public/brand/`), never re-typeset. Extracted from the brand sheet and repainted with the exact brand hex values; shapes untouched. Reversed version follows the navy card: white mark, white wordmark with the teal middle line.
- **Latin UI type:** *Plus Jakarta Sans* — a geometric grotesk in the same family of forms as the wordmark (round bowls, open apertures, sturdy bold), so headings sit naturally beside the logo.
- **Arabic UI type:** *IBM Plex Sans Arabic* (300–700) — engineered, highly legible, pairs with a geometric Latin. No letter-spacing on Arabic; display/h1 set at ~0.92× the Latin size, body 1.125rem.
- One family per script. No serif, no monospace labels. `tabular-nums` in data rows.

Scale (fluid):

| Step | Size | LH | Tracking (Latin) |
|---|---|---|---|
| display | clamp(2.75rem, 6.6vw, 6.5rem) | 0.98 (Ar 1.2) | −0.035em |
| h1 | clamp(2.375rem, 4.6vw, 4.5rem) | 1.02 (Ar 1.25) | −0.03em |
| h2 | clamp(1.875rem, 3.4vw, 3rem) | 1.08 (Ar 1.3) | −0.025em |
| h3 | clamp(1.25rem, 1.8vw, 1.625rem) | 1.25 | −0.01em |
| lead | clamp(1.125rem, 1.35vw, 1.3125rem) | 1.55 | 0 |
| body | 1.0625rem (Ar 1.125rem) | 1.65 (Ar 1.8) | 0 |
| small | 0.875rem | 1.5 | 0 |

Sentence case everywhere. Measure ≤ 68ch.

## 5. Layout & grid

- 12 columns; max content width 1440px; side margins `clamp(1.25rem, 5vw, 5rem)`; gutter `clamp(1rem, 2vw, 2rem)`.
- Spacing scale (4px base): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192. Section padding `clamp(5rem, 12vw, 10rem)`.
- Content is **start-aligned** (left in LTR, right in RTL) — never centred paragraphs. Asymmetry is deliberate: headings occupy columns 1–5, content 6–12, or the inverse.
- All layout uses logical properties (`ms`, `me`, `ps`, `pe`, `start`, `end`) so RTL mirrors automatically.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Mobile-first.

## 6. Components

- **Buttons.** 2px radius (architectural, not pill, not zero). Primary: ink fill / paper text on light, paper fill / ink text on dark. Secondary: 1px outline. Height 48px (44px min target). Hover: fill slides in from the inline-start edge (direction-aware). Text says exactly what happens ("Request a quote", "View products").
- **Navigation.** Transparent over the hero, becomes paper with hairline once scrolled; hides on scroll-down, returns on scroll-up. Mobile: full-screen ink panel, focus-trapped, large type.
- **Solutions index (not cards).** A typographic list of the eight solution areas; hover/focus swaps a large preview image in a sticky pane. On touch it becomes an accessible disclosure list with inline image.
- **Cards** exist only where content is genuinely a collection of peers (catalog products, projects). 0 radius on images, hairline frame, no drop shadows.
- **Forms.** Labels always visible above fields, 2px radius, 52px fields, inline validation on blur + on submit, error text tied with `aria-describedby`, a summary announced via `aria-live`.
- **Image treatment.** Unified colour grade applied at export (slight desaturation, cool shadows). Full-bleed or column-locked; never floating. Captions small, stone-500.
- **Demo markers.** Any replaceable content (projects, partners, contact details) carries a small dashed-outline "Demo content" tag in slate, driven by `site.demoMode` — one switch removes them all. Partner placeholder slots render only while `demoMode` is on.

## 7. Motion principles

1. **One orchestrated moment per page** — the hero entrance (headline lines rise out of a mask, CTA follows, gauge fills to its first tick).
2. **Motion answers scroll or input**, it doesn't loop for attention: gauge level, process step swap, image fill-reveal on large editorial images only. (Cycle 1 removed the pinned horizontal showcase — three full-bleed vertical panels instead.)
3. Durations 0.5–1.1s, easing `expo.out` / `power3.inOut`. Hover feedback 200–300ms.
4. Smooth scrolling (Lenis) only when `prefers-reduced-motion: no-preference`; with reduced motion, all scroll-driven motion is disabled and content is simply present, the hero video does not autoplay (poster shown with a play control).
5. Mobile: no pinning on small screens (vertical stacks), no parallax.

## 8. Voice

Plain, exact, accountable. Short sentences. Name things the way a lab manager names them. No superlatives we can't prove, no invented numbers, partners, clients or certifications.

## 9. Cycle 1 review — decisions

Independent design review (Creative Director / Brand / Art Director / UX). Adopted: no horizontal pin; demo tags off the accent colour; stricter colour grade and removal of off-message footage (posed cliché, neon, pharma-manufacturing, ominous corridor); medical imagery given weight in the first rows of the solutions index; quote-list count in the nav + persistent mobile quote bar; mobile header never hides; gauge only ≥1280px and not on catalog/contact; Arabic type sizing; tabular numerals. Adapted: hero keeps people at equipment (brief requirement) but is re-cut to three slow shots ending on the facility; partner slots are kept as the brief asks, but only while demo mode is on. Commitments are phrased as operational practices and flagged for client confirmation.
