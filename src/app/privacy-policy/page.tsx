import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How the ${site.missionName} collects, uses and protects personal information on this website.`,
};

const sections = [
  {
    h: "What information we collect",
    ps: [
      "This website collects personal information only where you choose to provide it — for example through the contact form (name, email address, optional phone number and your message) or when registering as a Nigerian in the diaspora.",
      "We do not collect passport numbers, payment details or other sensitive personal data through this website. Consular applications are made through the official portals of the Nigeria Immigration Service, which operate under their own privacy terms.",
    ],
  },
  {
    h: "How we use your information",
    ps: [
      "Information you submit is used solely to respond to your enquiry, deliver the consular service you have requested, or contact you in an emergency where you have registered with the Mission.",
      "We do not sell, rent or share your personal information with third parties, except where required by law or necessary to deliver a service you have requested.",
    ],
  },
  {
    h: "Cookies",
    ps: [
      "This website uses only the cookies that are strictly necessary for it to function. It does not use advertising or cross-site tracking cookies. If analytics are introduced, they will be privacy-respecting and anonymised, and this policy will be updated.",
    ],
  },
  {
    h: "How long we keep your information",
    ps: [
      "Enquiry data is retained only for as long as needed to resolve your enquiry and for a reasonable record-keeping period thereafter, in line with the records policy of the Ministry of Foreign Affairs. Diaspora registration data is retained while you remain registered and is deleted on request.",
    ],
  },
  {
    h: "Your rights",
    ps: [
      `You may request access to, correction of, or deletion of the personal information the Mission holds about you by writing to ${site.email}. This website is operated in line with the Nigeria Data Protection Act 2023 and applicable data protection law in ${site.hostCountry}.`,
    ],
  },
  {
    h: "Contact",
    ps: [
      `Questions about this policy should be directed to the Mission at ${site.email} or ${site.phones[0]}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        lead="This website collects the minimum personal information necessary to serve you, and protects what it collects."
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="mb-8 text-sm text-ink/70">Last updated: 1 June 2026</p>
        {sections.map((s) => (
          <section key={s.h} className="mb-10">
            <h2 className="mb-3 font-serif text-xl font-bold text-brand-deep">{s.h}</h2>
            {s.ps.map((p, i) => (
              <p key={i} className="mb-4 text-sm leading-relaxed text-ink/90 md:text-base">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
