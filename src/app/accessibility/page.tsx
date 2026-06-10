import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `The ${site.missionName}'s commitment to an accessible website for all users, aligned with WCAG 2.1 AA.`,
};

const features = [
  "Semantic HTML landmarks and a logical heading structure on every page.",
  "Full keyboard navigation, with a visible gold focus indicator on every interactive element.",
  "A “Skip to main content” link as the first focusable element on each page.",
  "Colour contrast meeting WCAG 2.1 AA for text and interactive elements.",
  "Information never conveyed by colour alone — priority labels and statuses always include text.",
  "Descriptive link text, alternative text for meaningful images, and decorative images hidden from screen readers.",
  "Forms with visible labels, clear error messages linked to their fields, and no time limits.",
  "Tabs and accordions implemented with the appropriate WAI-ARIA roles and keyboard support.",
  "Responsive layout that remains readable and operable at 200% zoom and on small screens.",
  "Reduced-motion preference respected — animations are disabled for users who request it.",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        title="Accessibility Statement"
        lead="This website is designed to be usable by everyone, including people who rely on assistive technology."
        crumbs={[{ label: "Accessibility Statement" }]}
      />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <section className="mb-10">
          <h2 className="mb-3 font-serif text-xl font-bold text-brand-deep">Our commitment</h2>
          <p className="mb-4 text-sm leading-relaxed text-ink/90 md:text-base">
            The {site.missionName} is committed to making this website accessible to the widest
            possible audience, regardless of technology or ability. The website aims to conform
            to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="mb-3 font-serif text-xl font-bold text-brand-deep">
            Accessibility features
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/90 md:text-base">
            {features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="mb-3 font-serif text-xl font-bold text-brand-deep">Known limitations</h2>
          <p className="mb-4 text-sm leading-relaxed text-ink/90 md:text-base">
            Some older documents published as PDF downloads may not yet be fully accessible. We
            are working to remediate these; in the meantime, contact the Mission for an
            alternative format.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-serif text-xl font-bold text-brand-deep">
            Feedback and contact
          </h2>
          <p className="text-sm leading-relaxed text-ink/90 md:text-base">
            If you experience any difficulty using this website, or would like information in an
            alternative format, please contact the Mission at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
              {site.email}
            </a>{" "}
            or {site.phones[0]}. Your feedback helps us improve.
          </p>
        </section>
      </div>
    </>
  );
}
