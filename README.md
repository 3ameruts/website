# Jordanian Advanced Laboratory Equipment — website

Bilingual (English / Arabic RTL) marketing and lead-generation site for medical & laboratory equipment, consumables, laboratory furniture and complete laboratory fit-outs.

**Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis.
No CMS, no database: all content is typed data in `src/content/`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en or /ar (Accept-Language / cookie)
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` and `QUOTE_WEBHOOK_URL` before going live.

## Pages

| Route | Page |
|---|---|
| `/{en,ar}` | Home — video hero, introduction, product-category mosaic, laboratory showcase, commitments, partners, featured projects, quote form |
| `/{locale}/about` | Overview, vision, mission, values, expertise, quality commitment, capabilities |
| `/{locale}/products` | 13 product categories as an image mosaic; each opens the quote form with the category preselected (`/contact?interest=<id>`) |
| `/{locale}/laboratory-solutions` | Six-stage process (planning → handover), laboratory types |
| `/{locale}/projects`, `/{locale}/projects/[slug]` | Portfolio with sector filter; detail pages with gallery lightbox |
| `/{locale}/contact` | Quote form, WhatsApp, email, phone, location |
| `/api/quote` | Validated form endpoint (honeypot, rate limit, size limit) → `QUOTE_WEBHOOK_URL` |

## Editing content

| What | Where |
|---|---|
| Company name, logo files, brand colours, contact details, WhatsApp, address, social links, **demo mode** | `src/content/site.ts` |
| Page copy (EN + AR) | `src/content/pages.ts` |
| The 13 product categories (title, description, image) + "what you can expect" commitments | `src/content/solutions.ts` |
| Projects / case studies | `src/content/projects.ts` |
| Manufacturer / partner logos | `partners` array in `src/components/sections/Partners.tsx` |
| UI strings (buttons, form, errors) | `src/i18n/dictionaries.ts` |
| Design tokens (colour, type, spacing, buttons, fields) | `src/app/globals.css` · rationale in `docs/DESIGN.md` |

Every string is `{ en, ar }` — TypeScript fails the build if a translation is missing.

## Before launch — replacement checklist

Everything below is a clearly marked placeholder. Nothing on the site invents clients, partners, certifications, statistics or product specifications.

- [ ] `site.ts` → phone, WhatsApp number, emails, street address, hours, map link, `NEXT_PUBLIC_SITE_URL`
- [ ] Logo masters: replace `public/brand/logo-*.png` with the official vector files (same names) — current files were extracted from the brand sheet and repainted with the exact brand hex values
- [ ] `projects.ts` → replace the six demo case studies with real, client-approved projects (`demo: false`). Demo project pages are `noindex` until then.
- [ ] `Partners.tsx` → add only manufacturers the company is authorised to represent
- [ ] `solutions.ts` → confirm each "commitment" describes actual practice
- [ ] `pages.ts` → `about.overview` / `about.quality`: add company history, registrations or certifications **only if held**
- [ ] Imagery: licensed Mixkit stock footage stills. Replace with company photography when available (same file names in `public/media/img/`)
- [ ] Set `demoMode: false` in `site.ts` → removes every "Demo content" tag and the partner placeholder slots
- [ ] Set `QUOTE_WEBHOOK_URL` and send a test request

## Media

- `public/media/video/hero-desktop.{mp4,webm}` (1280×720, ~15s loop, ~1.2–1.7 MB), `hero-mobile.mp4` (540×960 portrait crop, ~0.8 MB), `lab-corridor.mp4`.
- Source: Mixkit (free licence, commercial use permitted). Cut, colour-graded toward the brand navy, and encoded with ffmpeg; posters are first frames so the video swap is seamless.
- The hero video does not autoplay with `prefers-reduced-motion` or Save-Data; a pause/play control is always present.

## Architecture notes

- Fully static per locale (`generateStaticParams`, `dynamicParams = false`); only `/api/quote` is dynamic. Cache Components is intentionally off: no per-request data.
- `src/proxy.ts` (Next 16's replacement for middleware) redirects locale-less URLs using the `NEXT_LOCALE` cookie, then `Accept-Language`.
- Layouts use logical CSS properties throughout (`ms/me/ps/pe/start/end`), so Arabic mirrors automatically; arrows and the brand band flip via `[dir=rtl]`.
- Motion: one orchestrated entrance per page (hero), scroll-linked gauge, image "fill" reveals, process image swap. Lenis + ScrollTrigger only run without reduced motion; a CSS failsafe releases the hero entrance state if scripts fail to load.
- SEO: per-page metadata with hreflang alternates, Open Graph image, `sitemap.xml`, `robots.txt`, JSON-LD (Organization, WebSite, BreadcrumbList, ItemList, Service).
