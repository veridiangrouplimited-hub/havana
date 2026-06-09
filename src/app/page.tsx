import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { news, formatDate } from "@/data/news";
import { notices } from "@/data/notices";
import Icon, { type IconName } from "@/components/Icon";
import NoticeBadge from "@/components/NoticeBadge";

const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const latestNotices = [...notices].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const alertNotice = [...notices]
  .sort((a, b) => b.date.localeCompare(a.date))
  .find((n) => n.priority === "Urgent" || n.priority === "Important");

const relationsAreas: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "globe",
    title: "Political Relations",
    text: "Diplomatic dialogue, high-level visits and cooperation in international organisations.",
  },
  {
    icon: "scale",
    title: "Trade & Investment",
    text: "Growing two-way trade and investment in energy, agriculture, technology and services.",
  },
  {
    icon: "users",
    title: "Cultural Exchange",
    text: "Cultural programmes celebrating Nigeria's heritage, arts and creative industries.",
  },
  {
    icon: "document",
    title: "Education Cooperation",
    text: "Scholarships, academic partnerships and support for Nigerian students.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="bg-gradient-to-br from-brand-dark via-brand to-brand-deep text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="mb-3 inline-block rounded border border-gold/60 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold">
              Federal Republic of Nigeria
            </p>
            <h1 id="hero-heading" className="font-serif text-3xl font-bold leading-tight md:text-5xl">
              {site.missionName}
            </h1>
            <p className="mt-2 text-lg font-medium text-white/90 md:text-xl">
              {site.city}, {site.hostCountry}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Serving Nigerian citizens in {site.hostCountry} and strengthening the partnership
              between our two nations — with consular services delivered with dignity,
              efficiency and care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/consular-services/visa-services"
                className="rounded bg-gold px-5 py-3 text-sm font-bold text-brand-dark hover:bg-gold-dark"
              >
                Visa Services
              </Link>
              <Link
                href="/consular-services/passport-services"
                className="rounded bg-white px-5 py-3 text-sm font-bold text-brand hover:bg-mist"
              >
                Passport Services
              </Link>
              <Link
                href="/contact"
                className="rounded border-2 border-white/70 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Book Appointment
              </Link>
              <Link
                href="/consular-services/consular-assistance"
                className="rounded border-2 border-gold px-5 py-3 text-sm font-bold text-gold hover:bg-gold/10"
              >
                Emergency Assistance
              </Link>
            </div>
          </div>

          <div className="self-center rounded border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold">
              <Icon name="clock" className="h-5 w-5 text-gold" />
              Office Hours
            </h2>
            <ul className="space-y-2 text-sm text-white/90">
              {site.officeHours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                  <span>{h.days}</span>
                  <span className="font-semibold text-white">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-sm">
              <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <strong>24-hour emergency line:</strong>{" "}
                <a href={`tel:${site.emergencyPhone}`} className="font-bold text-gold underline">
                  {site.emergencyPhone}
                </a>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Priority notice strip */}
      {alertNotice && (
        <div className="border-y border-gold/50 bg-gold/15">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 text-sm">
            <NoticeBadge priority={alertNotice.priority} />
            <p className="min-w-0 flex-1 font-medium">{alertNotice.title}</p>
            <Link
              href={`/public-notices#${alertNotice.id}`}
              className="shrink-0 font-bold text-brand underline hover:text-brand-deep"
            >
              Read notice
            </Link>
          </div>
        </div>
      )}

      {/* Quick access — consular services */}
      <section aria-labelledby="services-heading" className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="services-heading" className="font-serif text-2xl font-bold text-brand-deep md:text-3xl">
              Consular Services
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
          </div>
          <Link href="/consular-services" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">
            View all services
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/consular-services/${s.slug}`}
                className="group flex h-full flex-col rounded border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-deep hover:shadow-md"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded bg-brand/10 text-brand">
                  <Icon name={s.icon as IconName} className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-serif text-lg font-bold text-brand-deep group-hover:underline">
                  {s.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-ink/80">{s.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  Learn more
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Head of Mission message */}
      <section aria-labelledby="hom-heading" className="bg-mist">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:py-16 lg:grid-cols-[1fr_2fr]">
          <figure className="mx-auto w-full max-w-xs">
            <div className="flex aspect-[3/4] items-center justify-center rounded border border-line bg-white shadow-md">
              <div className="px-6 text-center">
                <Image
                  src="/images/mfa-logo.png"
                  alt=""
                  width={96}
                  height={96}
                  className="mx-auto mb-4 h-24 w-24 object-contain opacity-90"
                />
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                  Official portrait of
                  <br />
                  {site.headOfMission}
                </p>
              </div>
            </div>
            <figcaption className="mt-3 text-center text-sm">
              <span className="block font-serif font-bold text-brand-deep">{site.headOfMission}</span>
              <span className="text-ink/70">{site.headOfMissionTitle}</span>
            </figcaption>
          </figure>
          <div>
            <h2 id="hom-heading" className="font-serif text-2xl font-bold text-brand-deep md:text-3xl">
              Message from the Head of Mission
            </h2>
            <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
            <blockquote className="mt-6 space-y-4 border-l-4 border-gold pl-5 text-base leading-relaxed text-ink/90">
              <p>
                “On behalf of the Government and people of the Federal Republic of Nigeria, I
                welcome you to the official website of the {site.missionName}. This Mission exists
                to serve — to protect the interests of Nigerians in {site.hostCountry}, and to
                deepen the friendship and partnership between our two countries.
              </p>
              <p>
                Whether you are a Nigerian seeking consular support, an investor exploring
                opportunities in Africa's largest economy, or a friend of Nigeria, you will find
                this Mission ready to assist you with professionalism and courtesy.”
              </p>
            </blockquote>
            <Link
              href="/about#head-of-mission"
              className="mt-6 inline-flex items-center gap-1.5 rounded bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-deep"
            >
              About the Head of Mission
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* News + Notices */}
      <section aria-labelledby="news-heading" className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="news-heading" className="font-serif text-2xl font-bold text-brand-deep md:text-3xl">
                  News & Press Releases
                </h2>
                <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
              </div>
              <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">
                All news
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-5">
              {latestNews.map((n) => (
                <li key={n.slug} className="rounded border border-line bg-white p-5 shadow-sm">
                  <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded bg-brand-deep px-2 py-0.5 font-bold uppercase tracking-wide text-white">
                      {n.category}
                    </span>
                    <time dateTime={n.date} className="text-ink/65">
                      {formatDate(n.date)}
                    </time>
                  </div>
                  <h3 className="font-serif text-lg font-bold leading-snug text-brand-deep">
                    <Link href={`/news/${n.slug}`} className="hover:underline">
                      {n.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{n.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-brand-deep md:text-3xl">
                Public Notices
              </h2>
              <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
            </div>
            <ul className="space-y-4">
              {latestNotices.map((n) => (
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
              className="mt-5 inline-flex items-center gap-1.5 rounded border-2 border-brand px-5 py-2.5 text-sm font-bold text-brand hover:bg-brand hover:text-white"
            >
              Read all public notices
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bilateral relations summary */}
      <section aria-labelledby="relations-heading" className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="relations-heading" className="font-serif text-2xl font-bold text-brand-deep md:text-3xl">
                Nigeria–{site.hostCountry} Relations
              </h2>
              <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/85 md:text-base">
                Nigeria and {site.hostCountry} enjoy warm and longstanding relations built on
                mutual respect, shared interests and growing cooperation across political,
                economic, cultural and educational spheres.
              </p>
            </div>
            <Link href="/relations" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">
              Explore bilateral relations
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relationsAreas.map((a) => (
              <li key={a.title} className="rounded border border-line bg-white p-5">
                <Icon name={a.icon} className="mb-3 h-7 w-7 text-brand" />
                <h3 className="mb-1.5 font-serif text-base font-bold text-brand-deep">{a.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Diaspora band */}
      <section aria-labelledby="diaspora-heading" className="bg-brand text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-12">
          <div className="max-w-2xl">
            <h2 id="diaspora-heading" className="font-serif text-2xl font-bold md:text-3xl">
              Nigerians in {site.hostCountry}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90 md:text-base">
              Register with the Mission so we can reach you in an emergency, stay informed through
              community notices, and take part in diaspora engagement programmes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/diaspora"
              className="rounded bg-gold px-5 py-3 text-sm font-bold text-brand-dark hover:bg-gold-dark"
            >
              Register with the Mission
            </Link>
            <Link
              href="/diaspora"
              className="rounded border-2 border-white/70 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Diaspora Services
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency + Contact/location */}
      <section aria-labelledby="contact-heading" className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded border-l-4 border-red-700 bg-red-50 p-6">
            <h2 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-red-800">
              <Icon name="alert" className="h-5 w-5" />
              In an Emergency
            </h2>
            <p className="text-sm leading-relaxed">
              If a Nigerian citizen in {site.hostCountry} is in danger, detained, hospitalised or
              bereaved, call the Mission's 24-hour emergency line:
            </p>
            <a
              href={`tel:${site.emergencyPhone}`}
              className="mt-3 block text-xl font-bold text-red-800 underline"
            >
              {site.emergencyPhone}
            </a>
            <Link
              href="/consular-services/consular-assistance"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              What the Mission can do
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded border border-line bg-white p-6 shadow-sm">
            <h2 id="contact-heading" className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
              <Icon name="pin" className="h-5 w-5" />
              Visit the Mission
            </h2>
            <address className="space-y-2 text-sm not-italic leading-relaxed">
              <p>
                {site.address}
                <br />
                {site.city}, {site.hostCountry}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${site.phones[0]}`} className="text-brand underline">
                  {site.phones[0]}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${site.email}`} className="text-brand underline">
                  {site.email}
                </a>
              </p>
            </address>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 rounded bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-deep"
            >
              Contact the Mission
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded border border-line bg-white p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
              <Icon name="calendar" className="h-5 w-5" />
              Appointments
            </h2>
            <p className="text-sm leading-relaxed text-ink/85">
              All consular submissions are by appointment. Complete your application online first,
              then book a date for biometric capture or document submission.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {site.officeHours.map((h) => (
                <li key={h.days}>
                  <strong>{h.days}:</strong> {h.hours}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
            >
              Book an appointment
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
