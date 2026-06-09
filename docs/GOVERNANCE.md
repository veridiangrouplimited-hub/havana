# Content Management & Governance

## 1. CMS recommendation

The frontend is CMS-agnostic: all content lives in typed collections
(`src/data/*.ts`, `src/lib/site.ts`) that map 1:1 to CMS models.

**Recommended: a headless CMS + this Next.js frontend.**

| Option | Fit |
| --- | --- |
| **Strapi (self-hosted)** — recommended | Open source, role-based access control, draft/publish + review workflow, media library, can be hosted on approved government infrastructure (data sovereignty). |
| Payload CMS | Excellent TypeScript integration, self-hostable; smaller ecosystem. |
| Sanity / Contentful (SaaS) | Lowest operational burden, but content is hosted by a foreign third party — requires Ministry approval. |
| WordPress + WPGraphQL | Familiar to content officers, but the largest attack surface; only with hardened hosting and strict plugin policy. |

CMS collections to create: **Global Settings** (the `site.ts` fields),
**Services**, **News** (with category, date, department), **Notices** (with
priority), **Pages**, **Media**, **Documents/Forms**.

Required CMS capabilities: secure login (MFA recommended for admins),
role-based access, draft → review → publish workflow, media/document upload
with type and size limits, menu management, automated backups, audit log,
multilingual fields where required.

## 2. Content roles

| Role | Responsibilities | CMS permission |
| --- | --- | --- |
| **Website Content Officer** | Day-to-day updates: notices, news, consular info, contact details, media uploads. | Editor — create and edit drafts, cannot publish sensitive types. |
| **Mission Approver** (senior officer designated by Head of Mission) | Reviews sensitive content before publication. | Publisher — approve/publish, cannot administer users. |
| **ICT Administrator** | Technical maintenance, backups, CMS updates, access control, incident response. | Admin — full technical access, not an author. |
| **Headquarters Oversight** (Ministry of Foreign Affairs) | Compliance with website policy, branding standards and official communication requirements. | Read/audit access; periodic review. |

## 3. Publishing workflow

```
Draft (Content Officer)
   → Review (Mission Approver)        ← required for sensitive content
      → Publish (scheduled or immediate)
         → Post-publication check (Content Officer, within 1 hour)
```

**Sensitive content — always reviewed before publication:** public notices,
press releases, emergency advisories, diplomatic statements, consular service
changes (fees, requirements, processing times), anything naming individuals.

**Routine content — may publish directly:** event photos, minor copy
corrections, office-hours updates already approved elsewhere.

Standing rules:

- Every page has a named owner and a review date (consular pages: quarterly).
- Emergency notices: a fast path where the Approver confirms verbally and the
  notice is published immediately, with the approval recorded afterwards.
- Account hygiene: one named account per person, no shared logins, access
  revoked the day an officer is posted out, quarterly access review by the
  ICT Administrator.

## 4. Update runbook (Content Officer)

1. Log in to the CMS over HTTPS (never on shared/public computers).
2. Create or edit the item in **draft**; attach documents as PDF only.
3. Preview on the staging URL; check on a phone.
4. Submit for review (sensitive) or publish (routine).
5. After publish: verify the live page, check links, confirm the homepage
   surfaces it (notices/news appear automatically).
6. Log the change in the content log (date, page, summary, approver).
