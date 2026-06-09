import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";
import NoticeBadge from "@/components/NoticeBadge";
import { site } from "@/lib/site";
import { notices } from "@/data/notices";
import { formatDate } from "@/data/news";

export const metadata: Metadata = {
  title: "Nigerians in Diaspora",
  description: `Registration, engagement programmes, community notices and emergency support for Nigerians living in ${site.hostCountry}.`,
};

const registrationSteps = [
  "Complete the diaspora registration form — online via the Contact page, or in person at the Mission.",
  "Provide your full name, contact details, location in [Host Country] and next-of-kin information.",
  "Receive confirmation of registration from the consular section.",
  "Keep your details up to date whenever you move or change phone numbers.",
];

const programmes: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "users",
    title: "Quarterly Town Halls",
    text: "Regular meetings between the Head of Mission and the Nigerian community to share updates and hear concerns.",
  },
  {
    icon: "globe",
    title: "Professional & Business Network",
    text: "Connecting Nigerian professionals, entrepreneurs and students for mentorship and opportunity.",
  },
  {
    icon: "calendar",
    title: "National Day & Cultural Events",
    text: "Independence Day celebrations and cultural programmes that bring the community together.",
  },
  {
    icon: "document",
    title: "Civic & Advisory Updates",
    text: "Guidance on voter registration, NIN enrolment, diaspora investment schemes and government programmes.",
  },
];

const communityNotices = [...notices]
  .filter((n) => n.priority === "Advisory" || n.priority === "Important")
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export default function DiasporaPage() {
  return (
    <>
      <PageHeader
        title={`Nigerians in ${site.hostCountry}`}
        lead="The Mission is your home away from home. Register with us, stay informed, and take part in the life of the Nigerian community."
        crumbs={[{ label: "Nigerians in Diaspora" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Registration */}
        <section aria-labelledby="registration-heading" className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="registration-heading" className="font-serif text-2xl font-bold text-brand-deep">
              Register with the Mission
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/90 md:text-base">
              Registration is free and voluntary, and it is the single most useful step you can
              take as a Nigerian in {site.hostCountry}. It allows the Mission to reach you quickly
              in an emergency, send you important advisories, and plan consular outreach where the
              community needs it.
            </p>
            <ol className="mt-6 space-y-4">
              {registrationSteps.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-serif text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed md:text-base">{s}</p>
                </li>
              ))}
            </ol>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-deep"
            >
              Start your registration
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          {/* Emergency support */}
          <div className="self-start rounded border-l-4 border-red-700 bg-red-50 p-7">
            <h2 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-red-800">
              <Icon name="alert" className="h-6 w-6" />
              Emergency Support
            </h2>
            <p className="text-sm leading-relaxed md:text-base">
              If you or another Nigerian citizen in {site.hostCountry} is in danger, detained,
              hospitalised, destitute or bereaved, contact the Mission immediately:
            </p>
            <p className="mt-4 text-2xl font-bold text-red-800">
              <a href={`tel:${site.emergencyPhone}`} className="underline">
                {site.emergencyPhone}
              </a>
            </p>
            <p className="mt-1 text-sm text-ink/75">Available 24 hours, 7 days a week.</p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-red-700" />
                Consular visits to detained citizens
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-red-700" />
                Help contacting family in Nigeria
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-red-700" />
                Emergency travel documents
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-red-700" />
                Guidance after bereavement, crime or crisis
              </li>
            </ul>
            <Link
              href="/consular-services/consular-assistance"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              More about consular assistance
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Programmes */}
        <section aria-labelledby="programmes-heading" className="mt-16">
          <h2 id="programmes-heading" className="font-serif text-2xl font-bold text-brand-deep">
            Diaspora Engagement Programmes
          </h2>
          <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
          <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((p) => (
              <li key={p.title} className="rounded border border-line bg-white p-5 shadow-sm">
                <Icon name={p.icon} className="mb-3 h-7 w-7 text-brand" />
                <h3 className="mb-1.5 font-serif text-base font-bold text-brand-deep">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Community notices + links */}
        <section aria-labelledby="community-heading" className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="community-heading" className="font-serif text-2xl font-bold text-brand-deep">
              Community Notices & Advisories
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
            <ul className="mt-6 space-y-4">
              {communityNotices.map((n) => (
                <li key={n.id} className="rounded border-l-4 border-gold bg-mist p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <NoticeBadge priority={n.priority} />
                    <time dateTime={n.date} className="text-ink/65">
                      {formatDate(n.date)}
                    </time>
                  </div>
                  <Link
                    href={`/public-notices#${n.id}`}
                    className="text-sm font-bold leading-snug text-brand-deep hover:underline"
                  >
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/public-notices"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              All public notices
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-deep">Useful Government Links</h2>
            <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
            <ul className="mt-6 space-y-3">
              {[
                { label: "NiDCOM — Nigerians in Diaspora Commission", href: "https://nidcom.gov.ng" },
                { label: "Nigeria Immigration Service", href: "https://immigration.gov.ng" },
                { label: "NIMC — National Identity Management Commission", href: "https://nimc.gov.ng" },
                { label: "INEC — Independent National Electoral Commission", href: "https://inecnigeria.org" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-line bg-white px-4 py-3 text-sm font-semibold text-brand hover:border-brand"
                  >
                    {l.label}
                    <Icon name="external" className="h-3.5 w-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
