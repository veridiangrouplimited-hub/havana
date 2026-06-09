# Operational Checklists

## 1. Security checklist

**Built into the template**
- [x] Server-side validation on the contact endpoint (lengths capped, email format checked)
- [x] Honeypot field rejects bot submissions silently
- [x] No secrets, keys or admin URLs in client code
- [x] External links use `rel="noopener noreferrer"`
- [x] API surface limited to one endpoint; `/api/` disallowed in robots.txt
- [x] No sensitive data collected by forms; consent checkbox required

**Required at deployment**
- [ ] HTTPS/SSL enforced (HSTS enabled), HTTP redirected
- [ ] Security headers: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`
- [ ] Hosting on approved government infrastructure or Ministry-sanctioned provider, behind a WAF/firewall
- [ ] Rate limiting on `/api/contact` (host or WAF level)
- [ ] CMS admin: strong passwords, MFA recommended for administrators and content officers, login attempt limits, admin path not publicly advertised
- [ ] Uploaded documents: PDF/image types only, size limits, virus scanning, served from a separate path with `Content-Disposition`
- [ ] Automated backups (database daily, media weekly) with quarterly restore tests
- [ ] Dependency updates monthly (`npm audit`); CMS core/plugins patched promptly
- [ ] Server error pages do not leak stack traces or version numbers
- [ ] Contact-endpoint email delivery uses SPF/DKIM-aligned sender

## 2. Accessibility checklist (WCAG 2.1 AA)

- [x] One `h1` per page; logical heading order; semantic landmarks (header/nav/main/footer)
- [x] Skip-to-content link as first focusable element
- [x] All functionality keyboard-operable; visible 3px gold focus indicator
- [x] Tabs and accordions follow WAI-ARIA patterns (roles, arrow keys, `aria-expanded`)
- [x] Forms: visible labels, `aria-invalid`, errors linked via `aria-describedby`
- [x] Colour contrast meets AA; information never conveyed by colour alone
- [x] Meaningful images have alt text; decorative icons `aria-hidden`
- [x] `prefers-reduced-motion` respected; no autoplaying motion
- [x] Readable at 200% zoom and on small screens; touch targets ≥ 40px
- [ ] Before launch: screen-reader pass (NVDA), axe/Lighthouse audit on every template, PDF documents checked or offered in alternative format

## 3. Performance checklist

- [x] Static generation for all content pages (`generateStaticParams`)
- [x] `next/image` for raster images; SVG icons inline
- [x] Fonts self-hosted via `next/font` (no third-party requests, no layout shift)
- [x] CSS/JS minified and code-split by route at build time
- [x] No external trackers, no heavy libraries, no blocking scripts
- [ ] At deployment: CDN/edge caching, compression (gzip/brotli), cache headers for static assets
- [ ] Replace the MFA logo PNG (1.5 MB source) with an optimised version ≤ 60 KB
- [ ] Budget: Lighthouse Performance ≥ 90 mobile, LCP < 2.5s on 4G

## 4. SEO checklist

- [x] Unique title and meta description per page (title template site-wide)
- [x] Open Graph + Twitter card metadata; article metadata on news pages
- [x] JSON-LD `GovernmentOrganization` structured data
- [x] `sitemap.xml` and `robots.txt` generated from the route map
- [x] Clean, descriptive URLs (`/consular-services/passport-services`)
- [x] Descriptive link text (no "click here")
- [ ] At launch: set the production domain in `src/lib/site.ts`, submit sitemap to Google Search Console / Bing, verify canonical URLs

## 5. Testing checklist (pre-launch)

- [ ] Responsive: 360px, 768px, 1024px, 1440px on every template
- [ ] Browsers: Chrome, Edge, Firefox, Safari (desktop + iOS), Chrome Android
- [ ] All navigation paths ≤ 3 clicks to key information
- [ ] Contact form: valid, invalid and bot submissions; confirmation message
- [ ] Search returns services, notices, news; empty-state behaves
- [ ] News filters and tab deep-links (`/about#history`) work
- [ ] Broken-link crawl; 404 page renders with recovery options
- [ ] Content accuracy sign-off by Mission Approver
- [ ] CMS round-trip: officer drafts → approver publishes → page updates

## 6. Deployment checklist

1. [ ] Replace all `[Placeholders]` (`grep -r "\[" src/` to confirm)
2. [ ] Set production URL in `src/lib/site.ts`
3. [ ] `npm run build` passes with no errors or type failures
4. [ ] Connect contact endpoint to the Mission's enquiry inbox (email service)
5. [ ] Configure domain (gov.ng subdomain where applicable) + SSL
6. [ ] Apply security headers, WAF, rate limits (checklist 1)
7. [ ] Run testing checklist (5) on staging
8. [ ] Launch; submit sitemap; smoke-test all routes in production
9. [ ] Enable uptime monitoring and error alerting
10. [ ] Hand over credentials per governance roles; store in approved vault

## 7. Maintenance plan

| Cadence | Task | Owner |
| --- | --- | --- |
| Daily | Publish/expire notices; monitor enquiry inbox | Content Officer |
| Weekly | Review news/notices accuracy; check uptime reports | Content Officer |
| Monthly | `npm audit` + dependency updates; CMS patches; broken-link crawl | ICT Administrator |
| Quarterly | Consular content review (fees, requirements); access review; restore-test a backup; Lighthouse re-audit | Approver + ICT |
| Annually | Full accessibility audit; security review; content architecture review with Headquarters | All roles |
