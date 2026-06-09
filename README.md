# Nigerian Mission Website Template

A modern, secure, responsive, accessible and citizen-focused website template for
Nigerian Missions abroad — Embassies, High Commissions, Permanent Missions and
Consulates — built with Next.js, TypeScript and Tailwind CSS.

The template reflects the official branding of the Ministry of Foreign Affairs of
the Federal Republic of Nigeria and is designed so each adopting Mission only has
to replace placeholder values and content.

## Quick start

```bash
npm install
npm run dev        # development server at http://localhost:3000 (webpack mode)
npm run build      # production build
npm start          # serve the production build
```

> The dev script uses `--webpack` because Turbopack's parallel workers exhaust
> memory on low-RAM machines. Remove the flag on better-provisioned hardware.

## Adopting this template for a Mission

1. **Edit [`src/lib/site.ts`](src/lib/site.ts)** — every `[Placeholder]` for the
   Mission name, host country, city, address, phones, email, Head of Mission and
   social links lives here, along with the navigation structure.
2. **Replace content data** in [`src/data/`](src/data/):
   - `services.ts` — consular service pages (requirements, process, fees, FAQs)
   - `news.ts` — news, press releases, speeches, statements
   - `notices.ts` — public notices with priority labels
3. **Replace assets** in `public/images/` — keep the MFA logo unaltered.
4. **Set the production URL** in `src/lib/site.ts` (`site.url`) so the sitemap,
   robots.txt and social metadata resolve correctly.
5. Search the codebase for `[` to find any remaining bracketed placeholders
   (biography text, map embed, fee amounts, dates).

## Project structure

```
src/
  lib/site.ts            Site configuration + navigation (single source of truth)
  data/                  Content collections (map 1:1 to CMS collections)
  components/            Header, Footer, Tabs, Accordion, forms, cards, icons
  app/                   App Router pages
    page.tsx             Homepage
    about/               About the Mission (tabbed)
    consular-services/   Service index + per-service pages (tabbed, data-driven)
    relations/           Nigeria–Host Country relations
    diaspora/            Nigerians in Diaspora
    news/                News listing (filterable) + article pages
    public-notices/      Public notices with priority badges
    contact/             Contact details + validated enquiry form
    search/              Site-wide search
    api/contact/         Server-side validated form endpoint (honeypot included)
    sitemap.ts robots.ts Privacy, Terms, Accessibility, human sitemap, 404
docs/                    Style guide, governance, checklists
```

## Documentation

- [docs/STYLE-GUIDE.md](docs/STYLE-GUIDE.md) — colours, typography, components, layout rules
- [docs/GOVERNANCE.md](docs/GOVERNANCE.md) — CMS recommendation, content roles, approval workflow
- [docs/CHECKLISTS.md](docs/CHECKLISTS.md) — security, accessibility, performance, SEO, testing, deployment, maintenance

## Key properties

- **Branding** — Nigerian Green `#0B5E3C`, Deep Green `#1F7A4C`, Gold `#E3B339`,
  white background, dark-grey text; MFA logo top-left, never altered.
- **Accessibility** — WCAG 2.1 AA aligned: skip link, keyboard navigation, visible
  focus states, ARIA tabs/accordions, labelled forms with linked errors, no
  colour-only indicators, reduced-motion support.
- **SEO** — per-page metadata, Open Graph/Twitter cards, JSON-LD
  (GovernmentOrganization), `sitemap.xml`, `robots.txt`, clean URLs.
- **Security** — server-side form validation, honeypot spam trap, no secrets in
  the client, API surface limited to one validated endpoint.
- **CMS-ready** — all content lives in typed data modules that map directly to
  collections in a headless CMS; no page code edits needed for content updates.
