# Implementation report — Jordanian Advanced Laboratory Equipment website

## 1. What was delivered

A complete, production-built, bilingual (English LTR / Arabic RTL) website — 6 page types, 30 statically generated locale pages plus project detail pages, a validated quote API, SEO infrastructure and a documented design system.

| Page | Highlights |
|---|---|
| Home | 15s graded hero film (3 shots: scientist at the microscope → equipment operation → laboratory facility), editorial introduction, interactive solutions index (8 areas), 4-panel laboratory showcase, "what you can expect" specification sheet, partner slots (demo only), featured projects, quote form |
| About | Overview, vision, mission, values, expertise, quality commitment, capabilities |
| Products & solutions | The client's 13 product categories as an image mosaic; each category opens the quote form preselected. No individual items or specifications are listed. |
| Laboratory solutions | Ambient corridor film, 6-stage process with sticky image swap, laboratory types, CTA |
| Projects | Sector filter, editorial grid, 6 demo case studies with gallery lightbox (marked demo, `noindex`) |
| Contact | Quote form, WhatsApp / email / phone channels, location and map placeholder |

## 2. Brand identity — verification

- Company name: **Jordanian Advanced Laboratory Equipment** everywhere (titles, metadata, structured data, footer, alt text). No other names remain.
- Logo: extracted from the supplied brand sheet and repainted pixel-by-pixel with the exact brand hex values — shapes untouched. A reversed version follows the navy business card (white mark). Replace with master vector files when available (same filenames).
- Colours: Navy `#0B2D6B`, Teal `#00A99D`, Light Gray `#E6E9ED`, White `#FFFFFF` are the only brand colours. Darker/lighter derived shades are used *only* where WCAG contrast requires them (e.g. teal text on white uses `#00786F`, because brand teal is 2.9:1 on white).
- Brand device: the stationery's navy band with the angled teal segment is used as the site's structural signature (hero edge, footer, menu, button hover fill), mirrored in Arabic.
- Arabic name: **«الشركة الأردنية للتجهيزات المخبرية المتطورة»** — confirmed by the client; used in all Arabic titles, metadata, structured data and copy.

## 3. Team & review process — what actually ran

Independent sub-agents were genuinely launched for the reviews; implementation was done by the lead (one coherent codebase). Nothing below is simulated.

| Cycle | Who | Outcome |
|---|---|---|
| Creative direction | Lead (Creative Director role) | 3 directions explored (Clinical Swiss / Night Lab / **Graduated** — selected) → `docs/DESIGN.md` |
| Cycle 1 — Design review | Independent agent: Creative Director, Brand Strategist, Art Director, UX | 8 changes adopted before build (no horizontal scroll-jacking, stricter colour grade, removal of off-message footage, demo tags off brand colour, contrast fixes, quote-list UX, mobile CTA, gauge scope); 2 adapted to the brief |
| Cycle 2 — Development review | Independent agent: Architect, Developer, Motion, Performance, Accessibility | 22 findings; all P0/P1 fixed and re-verified in browser (see §5) |
| Arabic copy review | Independent agent: Arabic copy editor / localisation | ~39 corrections applied (grammar, plural rule, terminology consistency, imperatives, calques) |
| Cycle 3 — Final audit | Independent agent: QA, Accessibility, SEO, Performance, CRO, Creative Director | See §6 |
| Lead QA | Automated end-to-end suite (41 checks) + targeted checks | All pass |

## 4. Skills & tools

- Used: the installed **frontend-design** skill (design process, anti-generic checklist); Next.js 16's bundled documentation (breaking changes: `proxy.ts`, image `preload`, async params).
- **Could not install** from skills.sh or other registries: the environment's network policy blocks skills.sh (and Pexels/Unsplash). No unknown install scripts were executed.
- Stock media: sourced from **Mixkit** (free licence, commercial use), the only permitted stock host reachable. Cut, graded and encoded with ffmpeg.

## 5. Engineering summary

- Next.js 16 App Router, React 19, TypeScript (strict), Tailwind v4 tokens, GSAP + ScrollTrigger, Lenis. Motion library (Framer Motion) deliberately **not** added — GSAP + CSS cover every need.
- Fully static per locale; only `/api/quote` is dynamic. Locale detection in `src/proxy.ts`.
- Performance: hero film 1.7 MB (desktop MP4) / 1.2 MB (WebM) / 0.8 MB (portrait mobile cut); not loaded with reduced motion or Save-Data. Hero entrance is pure CSS so the headline paints without waiting for JavaScript. Images served as AVIF/WebP with responsive `sizes`. Only one font file preloaded per page.
- Accessibility: skip link, landmarks, one h1 per page, labelled form controls with associated errors and live regions, focus-trapped mobile menu and dialog, visible focus, 3:1 control borders, video pause controls (WCAG 2.2.2), reduced-motion support throughout.
- Security: exact-MIME + same-origin API, body-size cap, honeypot, rate limit, server-side item names, security headers (HSTS, nosniff, frame, referrer, permissions).
- SEO: per-page localized metadata, canonical + hreflang (en, ar, x-default), Open Graph/Twitter image, sitemap with alternates, robots, JSON-LD (Organization, WebSite, BreadcrumbList, ItemList, Service); demo projects `noindex` and excluded from the sitemap.

## 6. Final audit (Cycle 3)

_To be completed with the independent audit results._

## 7. Open items for the client

See the checklist in `README.md` → "Before launch". In short: real contact details and URL (client will supply), vector logo files, real projects and partners, confirmation of the commitments wording, any certifications held, product models/specs, company photography, `demoMode: false`, and a `QUOTE_WEBHOOK_URL` for form delivery.
