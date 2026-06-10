import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing the use of the official website of the ${site.missionName}.`,
};

const sections = [
  {
    h: "Use of this website",
    ps: [
      `This website is the official website of the ${site.missionName} and is provided for public information and service delivery. By using it you agree to these terms.`,
      "You may not use this website for any unlawful purpose, attempt to gain unauthorised access to it, or misrepresent content from it as official communication of the Mission where it has been altered.",
    ],
  },
  {
    h: "Accuracy of information",
    ps: [
      "The Mission takes care to keep information on this website accurate and current. However, requirements, fees and processing times can change. Where there is any conflict, the requirements communicated by the Mission or by the official portals of the Government of Nigeria prevail.",
      "Information on this website does not constitute legal advice.",
    ],
  },
  {
    h: "Links to other websites",
    ps: [
      "This website links to official Nigerian government portals and other external websites for your convenience. The Mission is not responsible for the content or privacy practices of external websites.",
    ],
  },
  {
    h: "Intellectual property",
    ps: [
      "The coat of arms, logos and emblems of the Federal Republic of Nigeria are protected and may not be reproduced without authorisation. Text on this website may be reproduced free of charge for non-commercial purposes, provided it is reproduced accurately and the Mission is acknowledged as the source.",
    ],
  },
  {
    h: "Fraud warning",
    ps: [
      `The Mission does not use agents or intermediaries and never requests payment by cash, gift card or personal transfer. All official fees are paid only through Government of Nigeria portals. Report suspicious requests to ${site.email}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Use"
        lead="The conditions governing your use of this official website."
        crumbs={[{ label: "Terms of Use" }]}
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
