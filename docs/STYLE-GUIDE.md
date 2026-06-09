# Style Guide — Nigerian Mission Website Template

## 1. Colour palette

| Role               | Name           | HEX       | Usage                                                  |
| ------------------ | -------------- | --------- | ------------------------------------------------------ |
| Primary navigation | Nigerian Green | `#0B5E3C` | Header nav bar, primary buttons, major brand elements  |
| Background         | White          | `#FFFFFF` | Main page background                                   |
| Section headings   | Deep Green     | `#1F7A4C` | All headings and section titles                        |
| Accent             | Gold           | `#E3B339` | CTAs, dividers, badges, focus rings, highlights        |
| Body text          | Dark Grey      | `#333333` | All body copy                                          |
| Supporting         | Brand Dark     | `#084A2F` | Utility bar, footer, hero gradient end                 |
| Supporting         | Mist           | `#F4F7F5` | Alternating section backgrounds, cards, quiet panels   |
| Supporting         | Line           | `#E2E8E4` | Borders and dividers                                   |

Defined as Tailwind theme tokens in `src/app/globals.css` (`brand`, `brand-deep`,
`brand-dark`, `gold`, `gold-dark`, `ink`, `mist`, `line`). Never hard-code hex
values in components.

Red (`red-700`) is reserved exclusively for emergencies and error states.
Priority badge colours live only in `src/components/NoticeBadge.tsx`.

## 2. Typography

- **Headings:** Source Serif 4 (`font-serif`) — bold, Deep Green. Conveys
  formality and diplomatic dignity.
- **Body and UI:** Public Sans (`font-sans`) — a civic, highly legible typeface.
- Loaded via `next/font` (self-hosted at build time, no layout shift, no
  third-party font requests at runtime).

Scale: page titles `text-3xl/4xl`, section headings `text-2xl/3xl`, card
headings `text-lg`, body `text-sm/base` with `leading-relaxed`. Every page has
exactly one `h1`; heading levels never skip.

## 3. Signature elements

- **Gold rule:** every section heading is followed by a 4px gold bar
  (`h-1 w-16 bg-gold`).
- **Page header band:** green gradient (`from-brand-dark to-brand`) with
  breadcrumbs, white serif title, gold rule, optional lead paragraph.
- **Cards:** white, 1px `line` border, small shadow, gold or green top accent;
  hover raises shadow and underlines the title — no flashy animation.
- **Buttons:** solid `brand` (white text), solid `gold` (brand-dark text) for
  the highest-priority CTA, or 2px outline. All use `rounded` (4px), bold
  small text, generous padding.
- **Focus state:** 3px gold outline, 2px offset — global, on every
  interactive element.

## 4. Layout rules

- Content container: `max-w-7xl` centred, `px-4`; prose capped at `max-w-3xl`.
- Sections alternate white / mist backgrounds; vertical rhythm `py-14`–`py-16`.
- Responsive grids: 1 column mobile → 2 tablet → 3–4 desktop.
- Sticky header: utility bar + identity band (logo, Mission name) + green nav.
- Long content uses Tabs (service pages, About) or Accordions (FAQs) — never
  unstructured walls of text.

## 5. Iconography & imagery

- Single icon set: 1.8px-stroke outline icons in `src/components/Icon.tsx`,
  always `currentColor`, always `aria-hidden`.
- The MFA logo must never be distorted, recoloured, stretched, cropped or
  redesigned. It appears top-left in the header and in the footer.
- Photography (when added): formal, well-lit, diplomatic in tone — ceremonies,
  the chancery, official meetings. Always include meaningful `alt` text.

## 6. Voice & content style

- Plain, formal, diplomatic English. Short sentences. No jargon, no slang,
  no exclamation marks.
- Address the reader directly ("you") in service content; the institution is
  "the Mission".
- Every service page answers: what is it, who is eligible, what is required,
  what is the process, how long, what does it cost, who to contact.
- Dates: "28 May 2026" format. Fees: always with currency and "non-refundable"
  notes where applicable.
