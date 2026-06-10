import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";
import RouteMap from "@/components/RouteMap";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Nigeria–${site.hostCountry} Relations`,
  description: `Political, economic, trade, cultural and educational cooperation between Nigeria and ${site.hostCountry}.`,
};

const stats = [
  { value: "1974", label: "Diplomatic relations established" },
  { value: "US$85m", label: "Annual two-way trade volume" },
  { value: "12", label: "Bilateral agreements in force" },
  { value: "300+", label: "Nigerian students and professionals" },
];

const areas: { icon: IconName; title: string; paras: string[] }[] = [
  {
    icon: "globe",
    title: "Political Relations",
    paras: [
      `Nigeria and ${site.hostCountry} maintain warm political relations characterised by regular high-level visits, diplomatic consultations and cooperation in the United Nations and other international organisations.`,
      "Both countries share commitments to multilateralism, peace and security, and South–South cooperation, and consult regularly within the United Nations, the G77 and other multilateral forums. The bilateral joint commission, last convened in 2024, coordinates cooperation across all sectors.",
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
      "Flagship programmes include the Nigeria–Cuba medical scholarship scheme, under which Nigerian students train at Cuban universities, alongside growing research partnerships in tropical medicine and agriculture.",
    ],
  },
];

const agreements = [
  "Trade and Economic Cooperation Agreement — 1979",
  "Bilateral Air Services Agreement — 1996",
  "Agreement on Educational and Cultural Exchange — 2008",
  "Memorandum of Understanding on Political Consultations — 2015",
  "Agreement on Health and Medical Cooperation — 2019",
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

      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Havana ↔ Abuja route map */}
        <section aria-labelledby="route-heading" className="mb-16 overflow-hidden rounded border border-line bg-white shadow-sm">
          <div className="border-b border-line bg-mist/60 px-6 py-5">
            <p className="mb-1 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-deep">
              <span className="inline-block h-px w-9 bg-gold" aria-hidden="true" />
              Havana ↔ Abuja
            </p>
            <h2 id="route-heading" className="font-serif text-xl font-bold text-brand-deep md:text-2xl">
              Two Nations, One Atlantic
            </h2>
          </div>
          <div className="px-4 py-6 md:px-8">
            <RouteMap tone="light" className="mx-auto w-full max-w-4xl" />
          </div>
          <p className="border-t border-line bg-mist/60 px-6 py-3 text-xs text-ink/60">
            Stylised illustration — distances and coastlines are simplified.
          </p>
        </section>

        <div className="space-y-16">
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
                <p key={i} className="mb-5 max-w-3xl text-sm leading-relaxed text-ink/90 md:text-base">
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

        <div className="mt-16 rounded bg-brand p-8 text-white">
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
