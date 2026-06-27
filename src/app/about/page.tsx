import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import Icon, { type IconName } from "@/components/Icon";
import FlagStripe from "@/components/FlagStripe";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Mission",
  description: `Overview, leadership, history, departments and diplomatic mandate of the ${site.missionName} in ${site.city}, ${site.hostCountry}.`,
};

const departments: { name: string; text: string; icon: IconName }[] = [
  {
    name: "Political Affairs",
    icon: "globe",
    text: "Bilateral political relations, diplomatic correspondence and engagement with the host government.",
  },
  {
    name: "Consular & Immigration",
    icon: "passport",
    text: "Passports, visas, emergency travel certificates, authentication, notarial services and citizen welfare.",
  },
  {
    name: "Trade & Investment",
    icon: "scale",
    text: "Promotion of trade, investment facilitation and support for Nigerian and host-country businesses.",
  },
  {
    name: "Information & Culture",
    icon: "bell",
    text: "Public communication, media relations, cultural programmes and the Mission's official publications.",
  },
  {
    name: "Education",
    icon: "document",
    text: "Support for Nigerian students, scholarship administration and academic cooperation.",
  },
  {
    name: "Administration & Finance",
    icon: "users",
    text: "Internal administration, human resources, finance and management of the chancery.",
  },
];

const mandate = [
  `Represent the Federal Republic of Nigeria in ${site.hostCountry} and protect its national interests.`,
  `Protect the rights, dignity and welfare of Nigerian citizens in ${site.hostCountry}.`,
  "Deliver efficient consular services — passports, visas, authentication and assistance.",
  `Promote trade, investment and economic cooperation between Nigeria and ${site.hostCountry}.`,
  "Foster cultural, educational and people-to-people exchange.",
  "Negotiate and monitor the implementation of bilateral agreements.",
  `Report on developments in ${site.hostCountry} of interest to Nigeria.`,
];

function Para({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 max-w-3xl text-sm leading-relaxed text-ink/90 md:text-base">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 font-serif text-xl font-bold text-brand-deep md:text-2xl">{children}</h2>;
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About the Mission"
        lead={`Who we are, what we do, and how the ${site.missionName} serves Nigeria, Nigerians and our partners in ${site.hostCountry}.`}
        crumbs={[{ label: "About the Mission" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <Tabs
          label="About the Mission"
          items={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <div>
                  <H2>Overview of the Mission</H2>
                  <Para>
                    The {site.missionName} is the official diplomatic representation of the
                    Federal Republic of Nigeria in {site.hostCountry}. Operating under the
                    Ministry of Foreign Affairs, the Mission advances Nigeria's foreign policy
                    objectives, protects the interests of Nigerian citizens, and promotes
                    political, economic and cultural cooperation with {site.hostCountry}.
                  </Para>
                  <Para>
                    The Mission serves Nigerians resident in or visiting {site.hostCountry},
                    citizens of {site.hostCountry} seeking to travel to or do business with
                    Nigeria, and institutional partners across government, commerce, academia and
                    the media.
                  </Para>
                  <Para>
                    Our consular section processes passports, visas, emergency travel documents,
                    document authentication and notarial services, and provides welfare assistance
                    to Nigerians in distress — 24 hours a day for genuine emergencies.
                  </Para>
                </div>
              ),
            },
            {
              id: "head-of-mission",
              label: "Head of Mission",
              content: (
                <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
                  <figure>
                    <div className="overflow-hidden rounded shadow-md">
                      <div className="relative aspect-[3/4] border border-line bg-surface">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                          <svg viewBox="0 0 80 80" className="h-24 w-24 text-ink/20" fill="currentColor" aria-hidden="true">
                            <circle cx="40" cy="27" r="17" />
                            <ellipse cx="40" cy="74" rx="29" ry="21" />
                          </svg>
                          <p className="text-xs font-medium text-ink/40">Official portrait pending</p>
                        </div>
                      </div>
                      <FlagStripe className="h-1.5" />
                    </div>
                    <figcaption className="mt-3 text-sm">
                      <span className="block font-serif font-bold text-brand-deep">
                        {site.headOfMission}
                      </span>
                      <span className="text-ink/70">{site.headOfMissionTitle}</span>
                      <span className="mt-1 block text-[11px] italic text-ink/50">
                        {site.headOfMissionPortrait.credit}
                      </span>
                    </figcaption>
                  </figure>
                  <div>
                    <H2>{site.headOfMission}</H2>
                    <Para>
                      {site.headOfMission} is the {site.headOfMissionTitle}, appointed by the
                      President of the Federal Republic of Nigeria. She presented her Letters of
                      Credence to the Emperor of Japan in Tokyo on 15 March 2026.
                    </Para>
                    <Para>
                      A career diplomat with over twenty-five years in the Nigerian Foreign
                      Service, Dr Okonkwo joined the Ministry of Foreign Affairs in 2001 and has
                      served in a succession of senior roles, including Director of Regional
                      Integration at the Ministry's headquarters in Abuja and Deputy Head of
                      Mission in Brasília. Earlier postings took her to Geneva and Addis Ababa,
                      where she represented Nigeria at the United Nations and the African Union
                      on trade, migration and development questions.
                    </Para>
                    <Para>
                      She holds a doctorate in International Relations from the University of
                      Ibadan and is a Fellow of the Nigerian Institute of International Affairs.
                      In addition to English and Igbo, she speaks Japanese and French. Her
                      priorities in Tokyo include modernising consular service delivery,
                      expanding Nigeria–Japan cooperation in trade and technology, and deepening
                      engagement with the Nigerian community across {site.hostCountry}.
                    </Para>
                    <Para>
                      As Head of Mission, she leads the Mission's work across political,
                      economic, consular and cultural portfolios, and is the principal channel of
                      communication between the Governments of Nigeria and {site.hostCountry}.
                    </Para>
                  </div>
                </div>
              ),
            },
            {
              id: "history",
              label: "Mission History",
              content: (
                <div>
                  <H2>History of the Mission</H2>
                  <Para>
                    Nigeria and {site.hostCountry} established diplomatic relations in 1960, making
                    it one of Nigeria's longest-standing partnerships in Asia. The Embassy in{" "}
                    {site.city} opened in 1961 and has since served as the cornerstone of the
                    relationship between the two countries — anchoring decades of cooperation in
                    trade, technology, education and culture.
                  </Para>
                  <H2>Key Milestones</H2>
                  <ol className="relative max-w-2xl space-y-6 border-l-2 border-gold pl-6">
                    {[
                      { year: "1960", event: `Establishment of diplomatic relations between Nigeria and ${site.hostCountry}.` },
                      { year: "1961", event: `Opening of the Nigerian Mission in ${site.city}.` },
                      { year: "1964", event: "Signing of the first Technical Cooperation Agreement." },
                      { year: "2005", event: "Agreement on Investment Promotion and Protection signed." },
                      { year: "2026", event: "Launch of the Mission's modernised consular services." },
                    ].map((m, i) => (
                      <li key={i}>
                        <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-gold bg-white" aria-hidden="true" />
                        <span className="block font-serif text-base font-bold text-brand-deep">{m.year}</span>
                        <span className="text-sm leading-relaxed text-ink/85">{m.event}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ),
            },
            {
              id: "departments",
              label: "Departments",
              content: (
                <div>
                  <H2>Mission Leadership & Departments</H2>
                  <Para>
                    The Mission is organised into sections, each headed by a senior officer
                    reporting to the Head of Mission.
                  </Para>
                  <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {departments.map((d) => (
                      <li
                        key={d.name}
                        className="group rounded border border-line bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-deep hover:shadow-md"
                      >
                        <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-gold">
                          <Icon name={d.icon} className="h-5 w-5" />
                        </span>
                        <h3 className="mb-2 font-serif text-base font-bold text-brand-deep">{d.name}</h3>
                        <p className="text-sm leading-relaxed text-ink/80">{d.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              id: "mandate",
              label: "Diplomatic Mandate",
              content: (
                <div>
                  <H2>Diplomatic Role and Mandate</H2>
                  <Para>
                    The Mission discharges its functions in accordance with the Vienna Convention
                    on Diplomatic Relations (1961), the Vienna Convention on Consular Relations
                    (1963) and the foreign policy of the Federal Republic of Nigeria.
                  </Para>
                  <ul className="max-w-3xl space-y-3">
                    {mandate.map((m) => (
                      <li key={m} className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
