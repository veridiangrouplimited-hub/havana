# Prompt: Embassy of Nigeria in Havana — Website Design & Development

## Project Brief

Design and develop the official website for the **Embassy of Nigeria in Havana, Cuba** — a formal diplomatic website operated by the Nigerian Ministry of Foreign Affairs. The site serves two primary audiences: Nigerian citizens in Cuba who need consular services, and Cuban nationals or foreign nationals seeking to travel to Nigeria.

The tone is institutional, trustworthy and professional. The visual identity follows Nigerian government branding: deep forest green (`#0b5e3c`) as the primary brand colour, gold (`#c9a84c`) as the accent, and the Nigerian national flag palette (green-white-green). All copy must be dignified, clear and jargon-free.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.8 — App Router, React Server Components |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Runtime | React 19 |
| Dev server | `next dev --webpack` (Turbopack disabled — OOM on target machine) |
| Favicon | `src/app/icon.tsx` + `apple-icon.tsx` via `next/og` `ImageResponse` |
| CMS (future) | Headless WordPress + WPGraphQL (static TypeScript fallbacks already in place) |
| Deployment | Netlify / Vercel (static-export-compatible) |

---

## Design System

### Colours
```css
--brand:       #0b5e3c   /* Nigerian forest green — primary */
--brand-dark:  #073d27   /* Darker green — footer, nav */
--brand-deep:  #05291a   /* Deepest green — headings */
--gold:        #c9a84c   /* Accent — dividers, icons, ring */
--surface:     #f5f3ef   /* Off-white page background */
--line:        #e2ddd5   /* Border / divider */
--ink:         #1a1a1a   /* Body text */
```

### Typography
- Headings: Georgia / serif stack (`font-serif`)
- Body: System UI / sans-serif stack
- Tracking: `tracking-widest` for eyebrow labels in all-caps

### Key UI Patterns
- **PageHeader** component: dark green hero with coat-of-arms ghost watermark, breadcrumb, title and lead text
- **FlagStripe**: 3-column green-gold-green stripe used as a section divider above the footer
- **EmbassySeal**: SVG circular seal — coat of arms centred, gold text ring reading "EMBASSY OF NIGERIA" (top arc) and "HAVANA · CUBA" (bottom arc), decorative dashed inner rings, gold side ornament dots
- **WatermarkSeal**: ghost watermark of the MFA logo used in PageHeader and Footer background — SVG `feColorMatrix` desaturate + invert filter so white background disappears on dark surfaces
- **SectionHeading**: eyebrow label + serif heading + gold underbar
- **NoticeBadge**: coloured pill for notice priority (Urgent = red, Important = amber, Routine = green)

---

## Pages & Routing

```
/                          Home
/about                     About the Mission (tabs: Overview, Head of Mission, History, Departments, Mandate)
/consular-services         Services grid
/consular-services/[slug]  Individual service (Tabs: Overview, Requirements, Process, Fees, FAQs, Forms)
/relations                 Bilateral Relations (Nigeria–Cuba)
/diaspora                  Nigerians in Diaspora
/news                      News & Press (carousel + filterable list)
/news/[slug]               Individual news article
/public-notices            Public Notices + Consular Documents
/contact                   Contact page (map, phone, hours, department emails, social, enquiry form)
/search                    Full-text search across services, news and notices
/sitemap                   HTML sitemap
/privacy-policy            Privacy Policy
/terms                     Terms of Use
/accessibility             Accessibility Statement
```

---

## Content Sections & Components

### Home Page (`/`)
- Full-screen hero with embassy title, tagline, 4 CTA buttons (Visa Services, Passport Services, Book Appointment, Emergency) and an office-hours sidebar
- Alert banner for urgent notices (auto-shown when a notice with priority "Urgent" or "Important" exists)
- Consular Services grid (6 service cards with icon, title, excerpt)
- Latest News carousel (3 items, snap-scroll with dot indicators)
- Bilateral Relations highlight (Nigeria–Cuba facts: trade volume, diplomatic history, community size)
- Latest Notices list (3 items with priority badges)
- Head of Mission profile card
- Diaspora community callout

### Consular Services (`/consular-services/[slug]`)
Six services with full structured content:
1. **Visa Services** — requirements, process steps, fees table, processing times, FAQs, downloadable forms
2. **Passport Services** — fresh application / renewal / reissue, requirements, process, fees
3. **Emergency Travel Certificate** — eligibility, process, fees
4. **Document Authentication** — types, process, fees
5. **Notarial Services** — affidavits, POA, certified copies
6. **Consular Assistance** — arrest, hospitalisation, bereavement, destitution, crisis

Each service page uses a **Tabs** component: Overview · Requirements · Process & Fees · FAQs · Forms & Links.

### About the Mission (`/about`)
Tabs: Overview · Head of Mission · History · Departments · Mandate.
Includes ambassador portrait, biography, appointment date, and the full text of the diplomatic mandate.

### Bilateral Relations (`/relations`)
Nigeria–Cuba relations: establishment date, trade figures, cultural ties, education exchanges, agreements. Includes a **NigeriaMap** SVG component and a **RouteMap** SVG showing the Abuja–Havana route.

### Nigerians in Diaspora (`/diaspora`)
Citizen count, student count, community organisations, emergency contacts, programmes, registration form link.

### News & Press (`/news`, `/news/[slug]`)
Filterable by category (Press Release, Diplomatic, Consular, Community). NewsCarousel on the listing page. Full article view with related articles sidebar.

### Public Notices (`/public-notices`)
**NoticesList** with pagination (4 per page), priority badge filter. **DocumentsList** (filterable by category: Visa, Passport, Travel, Agreements, Fees). PDF download modal (**PdfModal**) with inline iframe viewer.

### Contact (`/contact`)
Two-column layout:
- Left: address + OpenStreetMap embed, phone & email, office hours, emergency contact, department emails, **"Follow the Mission"** social box (Facebook, X, Instagram)
- Right: **ContactForm** (department select, subject, message, CAPTCHA placeholder)

---

## Data Layer

All content is stored in TypeScript arrays in `src/data/` with async fetchers that fall back to static data when `WORDPRESS_URL` is not set:

```
src/data/notices.ts       Notice[]        getNotices()
src/data/news.ts          NewsItem[]      getNews() / getNewsItem(slug)
src/data/services.ts      Service[]       getServices() / getService(slug)
src/data/documents.ts     ConsularDocument[]  getDocuments()
```

`src/lib/wp.ts` — `wpQuery<T>()` GraphQL utility with ISR revalidation (`next: { revalidate }`) and Bearer auth support.

`src/app/api/revalidate/route.ts` — On-demand ISR webhook (WordPress calls this after publish).

---

## WordPress CMS Integration (headless)

### Plugins required
- Custom Post Type UI — CPTs: `notice`, `news_article`, `service`, `consular_document`
- Advanced Custom Fields (ACF) with repeater fields
- WPGraphQL + WPGraphQL for ACF

### Environment variables
```env
WORDPRESS_URL=https://cms.your-mission-domain.gov.ng
WORDPRESS_API_KEY=
NEXT_REVALIDATE_SECRET=change-me-to-a-strong-random-string
NEXT_REVALIDATE_TTL=60
```

### Config exports
- `wp-config/wp-cpt-ui.json` — CPT UI import file (4 CPTs)
- `wp-config/wp-acf-fields.json` — ACF field group definitions for all CPTs

---

## Key Technical Decisions

1. **Static fallback pattern** — all `get*()` data fetchers check `isWpConfigured()` first; if WordPress is not configured they return the hardcoded TypeScript arrays. This means the site deploys and works on Netlify with zero CMS setup.

2. **Ghost watermark** — `feColorMatrix` SVG filter: `saturate(0)` desaturates to greyscale, then matrix `[-1 0 0 0 1 ...]` inverts RGB. White background → black (invisible on dark brand background). Dark logo strokes → white ghost. Applied via `opacity-[0.11]` on the parent.

3. **Circular embassy seal** — SVG with `textPath` following arc paths so the mission name curves around the perimeter. `defs` contains two `<path>` elements (top arc, bottom arc); `<text><textPath href>` with `startOffset="50%" textAnchor="middle"` centres the text on each arc.

4. **Favicon** — `src/app/icon.tsx` uses `ImageResponse` from `next/og` to generate a 32×32 PNG of the Nigerian flag (three vertical `flex: 1` divs in `#008751` / `#ffffff` / `#008751`). This produces a `<link rel="icon">` that overrides `favicon.ico` in modern browsers.

5. **`generateStaticParams` is async** — required because it calls `getNews()` / `getServices()`, which are async fetchers.

6. **`--webpack` flag** — Turbopack causes out-of-memory on the development machine. All `next dev` invocations must use `--webpack`.

---

## Mission Template Reuse

This codebase is designed as a reusable template for any Nigerian diplomatic mission. To deploy for a new mission:

1. Update `src/lib/site.ts` (one file — all mission-specific values in one place)
2. Replace `public/images/mfa-logo.png` with the official coat of arms / MFA logo
3. Update content arrays in `src/data/`
4. Optionally point `WORDPRESS_URL` to a fresh WordPress install with the exported CPT/ACF config imported

---

## Accessibility & SEO

- All pages have `<Metadata>` with unique `title` and `description`
- `robots.ts` and `sitemap.ts` generated programmatically
- `Skip to main content` link in Header
- All interactive components have ARIA labels, roles and keyboard navigation
- Images use descriptive `alt` text; decorative SVGs have `aria-hidden="true"`
- Colour contrast meets WCAG AA (dark green on white, white on dark green)
- `lang="en"` on `<html>`; `<address>` used for contact details
- OpenStreetMap embed has a descriptive `title` attribute
