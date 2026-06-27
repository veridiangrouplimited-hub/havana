import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";
import { NigeriaFlag, JapanFlag } from "@/components/Flags";
import RouteMap from "@/components/RouteMap";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Nigeria–${site.hostCountry} Relations`,
  description: `Political, economic, trade, cultural and educational cooperation between Nigeria and ${site.hostCountry}.`,
};

const stats = [
  { value: "1960", label: "Diplomatic relations established" },
  { value: "US$4.5bn", label: "Annual two-way trade volume" },
  { value: "18", label: "Bilateral agreements in force" },
  { value: "1,200+", label: "Nigerian students and professionals" },
];

const areas: { icon: IconName; tag: string; title: string; paras: string[] }[] = [
  {
    icon: "globe",
    tag: "01 · Diplomacy",
    title: "Political Relations",
    paras: [
      `Nigeria and ${site.hostCountry} maintain strong and cordial political relations characterised by regular high-level visits, diplomatic consultations and cooperation in the United Nations and other international organisations.`,
      "Both countries share commitments to multilateralism, peace and security, and engage in structured dialogue through a bilateral joint commission that coordinates cooperation across all sectors. The two nations are aligned on key global issues including climate change, disarmament and sustainable development.",
    ],
  },
  {
    icon: "scale",
    tag: "02 · Economics",
    title: "Economic Relations & Trade",
    paras: [
      `Economic ties between Nigeria and ${site.hostCountry} continue to grow, spanning automotive manufacturing, electronics, energy, agriculture and financial services. The Mission's Trade and Investment Section supports businesses on both sides with market intelligence and facilitation.`,
      "Nigeria — Africa's largest economy — offers investors access to a dynamic market of over 220 million people and preferential access to the African Continental Free Trade Area (AfCFTA).",
    ],
  },
  {
    icon: "document",
    tag: "03 · Investment",
    title: "Trade & Investment Opportunities",
    paras: [
      `${site.hostCountry}ese investment in Nigeria spans automotive assembly, electronics manufacturing, infrastructure, digital technology and agro-processing. The Nigerian Investment Promotion Commission (NIPC) provides incentives and protections for foreign investors.`,
      "Priority sectors for new investment include renewable energy, solid minerals, the digital economy, food processing and creative industries. The Mission can connect investors with the NIPC and relevant Nigerian agencies.",
    ],
  },
  {
    icon: "users",
    tag: "04 · Culture",
    title: "Cultural Relations",
    paras: [
      `The Mission promotes Nigeria's rich cultural heritage in ${site.hostCountry} — from Nollywood and Afrobeats to literature, visual arts and cuisine — through festivals, exhibitions and partnerships with cultural institutions.`,
      `Cultural exchange programmes strengthen people-to-people ties and mutual understanding. The Nigerian community in ${site.hostCountry} serves as a living bridge between our two societies.`,
    ],
  },
  {
    icon: "passport",
    tag: "05 · Education",
    title: "Educational Cooperation",
    paras: [
      `Academic cooperation includes scholarships, university partnerships, research collaboration and exchange programmes. The Mission supports Nigerian students in ${site.hostCountry} and promotes bilateral institutional linkages.`,
      `Flagship programmes include JICA-supported technical training placements for Nigerian professionals, growing research partnerships in engineering, robotics and medicine, and university twinning arrangements between leading institutions in both countries.`,
    ],
  },
];

const agreements = [
  "Technical Cooperation Agreement — 1964",
  "Agreement on Investment Promotion and Protection — 2005",
  "Cultural and Educational Exchange Agreement — 2012",
  "Science and Technology Cooperation MOU — 2018",
  "Digital Economy and Innovation Partnership — 2023",
];

export default function RelationsPage() {
  return (
    <>
      <PageHeader
        title={`Nigeria–${site.hostCountry} Relations`}
        lead={`A partnership built on mutual respect and shared prosperity — the political, economic, cultural and educational dimensions of the relationship between Nigeria and ${site.hostCountry}.`}
        crumbs={[{ label: "Bilateral Relations" }]}
      />

      {/* Stats bar */}
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
        {/* Route map */}
        <section aria-labelledby="route-heading" className="mb-16 overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface/60 px-6 py-5">
            <div>
              <p className="mb-1 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-deep">
                <span className="inline-block h-px w-9 bg-gold" aria-hidden="true" />
                Tokyo ↔ Abuja
              </p>
              <h2 id="route-heading" className="font-serif text-xl font-bold text-brand-deep md:text-2xl">
                Two Nations, One World
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <JapanFlag className="h-7 w-[52px] rounded-sm shadow-sm" />
              <span className="text-gold/70 text-lg" aria-hidden="true">&#8212;</span>
              <NigeriaFlag className="h-7 w-[52px] rounded-sm shadow-sm" />
            </div>
          </div>
          <div className="px-4 py-6 md:px-8">
            <RouteMap tone="light" className="w-full" />
          </div>
          <p className="border-t border-line bg-surface/60 px-6 py-3 text-xs text-ink/60">
            Stylised illustration — distances and coastlines are simplified.
          </p>
        </section>

        {/* Areas of cooperation — modern card layout */}
        <div className="mb-16 space-y-6">
          {/* Hero card — Political Relations */}
          <article aria-labelledby="area-political" className="overflow-hidden rounded-2xl border border-line shadow-md">
            <div className="flex items-center gap-5 bg-gradient-to-r from-brand-dark via-brand to-brand-deep px-8 py-8">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 ring-2 ring-gold/30">
                <Icon name={areas[0].icon} className="h-7 w-7 text-gold" />
              </span>
              <div>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gold/70">
                  {areas[0].tag}
                </span>
                <h2 id="area-political" className="font-serif text-2xl font-bold text-white">
                  {areas[0].title}
                </h2>
              </div>
            </div>
            <div className="grid gap-6 bg-white px-8 py-7 md:grid-cols-2">
              {areas[0].paras.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink/90 md:text-base">{p}</p>
              ))}
            </div>
          </article>

          {/* 2×2 grid for remaining areas */}
          <div className="grid gap-6 sm:grid-cols-2">
            {areas.slice(1).map((a) => {
              const id = `area-${a.title.replace(/[\s&]+/g, "-").toLowerCase()}`;
              return (
                <article key={a.title} aria-labelledby={id} className="overflow-hidden rounded-2xl border border-line shadow-sm">
                  <div className="flex items-center gap-4 bg-gradient-to-br from-brand-dark to-brand px-6 py-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-gold/30">
                      <Icon name={a.icon} className="h-5 w-5 text-gold" />
                    </span>
                    <div>
                      <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-widest text-gold/70">
                        {a.tag}
                      </span>
                      <h2 id={id} className="font-serif text-lg font-bold text-white">
                        {a.title}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-3 bg-white px-6 py-5">
                    {a.paras.map((p, i) => (
                      <p key={i} className="text-sm leading-relaxed text-ink/90">{p}</p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bilateral agreements */}
        <section aria-labelledby="agreements-heading" className="mb-16">
          <h2 id="agreements-heading" className="mb-6 font-serif text-xl font-bold text-brand-deep md:text-2xl">
            Bilateral Agreements
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {agreements.map((ag) => (
              <li key={ag} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed shadow-sm">
                <Icon name="document" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                {ag}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-brand p-8 text-white">
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
              className="rounded-lg bg-gold px-6 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-amber-400"
            >
              Contact the Trade Section
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
