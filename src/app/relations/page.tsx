import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Nigeria–${site.hostCountry} Relations`,
  description: `Political, economic, trade, cultural and educational cooperation between Nigeria and ${site.hostCountry}.`,
};

const stats = [
  { value: "[Year]", label: "Diplomatic relations established" },
  { value: "[Value]", label: "Annual two-way trade volume" },
  { value: "[Number]", label: "Bilateral agreements in force" },
  { value: "[Number]", label: "Nigerian students and professionals" },
];

const areas: { icon: IconName; title: string; paras: string[] }[] = [
  {
    icon: "globe",
    title: "Political Relations",
    paras: [
      `Nigeria and ${site.hostCountry} maintain warm political relations characterised by regular high-level visits, diplomatic consultations and cooperation in the United Nations and other international organisations.`,
      "Both countries share commitments to multilateralism, peace and security, and South–South cooperation. [Replace with specifics of the bilateral political relationship.]",
    ],
  },
  {
    icon: "scale",
    title: "Economic Relations & Trade",
    paras: [
      `Economic ties between Nigeria and ${site.hostCountry} continue to grow, spanning energy, agriculture, manufacturing, technology and services. The Mission's Trade and Investment Section supports businesses on both sides with market information and facilitation.`,
      "Nigeria — Africa's largest economy and most populous nation — offers investors access to a dynamic market of over 200 million people and preferential access to the African Continental Free Trade Area (AfCFTA).",
    ],
  },
  {
    icon: "document",
    title: "Trade & Investment Opportunities",
    paras: [
      "Priority sectors for investment include agriculture and agro-processing, oil and gas, solid minerals, renewable energy, digital technology, infrastructure and the creative economy.",
      "The Nigerian Investment Promotion Commission (NIPC) provides incentives and protections for foreign investors, including guarantees against expropriation and free repatriation of profits.",
    ],
  },
  {
    icon: "users",
    title: "Cultural Relations",
    paras: [
      `The Mission promotes Nigeria's rich cultural heritage in ${site.hostCountry} — from Nollywood and Afrobeats to literature, visual arts and cuisine — through festivals, exhibitions and partnerships with cultural institutions.`,
      "Cultural exchange programmes strengthen people-to-people ties and mutual understanding between our societies.",
    ],
  },
  {
    icon: "passport",
    title: "Educational Cooperation",
    paras: [
      `Academic cooperation includes scholarships, university partnerships, research collaboration and exchange programmes. The Mission supports Nigerian students in ${site.hostCountry} and promotes ${site.hostCountry}–Nigeria institutional linkages.`,
      "[Replace with details of active scholarship schemes and academic agreements.]",
    ],
  },
];

const agreements = [
  "Trade and Economic Cooperation Agreement — [Year]",
  "Bilateral Air Services Agreement — [Year]",
  "Agreement on Educational and Cultural Exchange — [Year]",
  "Memorandum of Understanding on Political Consultations — [Year]",
  "[Add or remove agreements as applicable to the Mission]",
];

export default function RelationsPage() {
  return (
    <>
      <PageHeader
        title={`Nigeria–${site.hostCountry} Relations`}
        lead={`A partnership built on mutual respect and shared prosperity — the political, economic, cultural and educational dimensions of the relationship between Nigeria and ${site.hostCountry}.`}
        crumbs={[{ label: "Bilateral Relations" }]}
      />

      <div className="bg-brand-dark text-white">
        <dl className="mx-auto grid max-w-7xl gap-px overflow-hidden px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-3 text-center">
              <dd className="font-serif text-3xl font-bold text-gold">{s.value}</dd>
              <dt className="mt-1 text-sm text-white/85">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="space-y-12">
          {areas.map((a) => (
            <section key={a.title} aria-labelledby={a.title.replace(/\s+/g, "-").toLowerCase()}>
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded bg-brand/10 text-brand">
                  <Icon name={a.icon} className="h-6 w-6" />
                </span>
                <h2
                  id={a.title.replace(/\s+/g, "-").toLowerCase()}
                  className="font-serif text-xl font-bold text-brand-deep md:text-2xl"
                >
                  {a.title}
                </h2>
              </div>
              {a.paras.map((p, i) => (
                <p key={i} className="mb-3 max-w-3xl text-sm leading-relaxed text-ink/90 md:text-base">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section aria-labelledby="agreements-heading">
            <h2 id="agreements-heading" className="mb-4 font-serif text-xl font-bold text-brand-deep md:text-2xl">
              Bilateral Agreements
            </h2>
            <ul className="max-w-3xl space-y-3">
              {agreements.map((ag) => (
                <li key={ag} className="flex items-start gap-3 rounded border border-line bg-mist p-4 text-sm leading-relaxed md:text-base">
                  <Icon name="document" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {ag}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-14 rounded bg-brand p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-xl font-bold md:text-2xl">
                Interested in trading with or investing in Nigeria?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
                The Mission's Trade and Investment Section provides market information,
                facilitates business contacts and supports investors at every stage.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded bg-gold px-6 py-3 text-sm font-bold text-brand-dark hover:bg-gold-dark"
            >
              Contact the Trade Section
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
