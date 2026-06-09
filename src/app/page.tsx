import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { news, formatDate } from "@/data/news";
import { notices } from "@/data/notices";
import Icon, { type IconName } from "@/components/Icon";
import NoticeBadge from "@/components/NoticeBadge";
import SectionHeading from "@/components/SectionHeading";
import FlagStripe from "@/components/FlagStripe";

const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const latestNotices = [...notices].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
const alertNotice = [...notices]
  .sort((a, b) => b.date.localeCompare(a.date))
  .find((n) => n.priority === "Urgent" || n.priority === "Important");

const relationsAreas: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "globe",
    title: "Political Relations",
    text: "Six decades of friendship, high-level visits and cooperation in international organisations.",
  },
  {
    icon: "scale",
    title: "Trade & Investment",
    text: "Growing two-way trade and investment in energy, agriculture, health and technology.",
  },
  {
    icon: "users",
    title: "Cultural Exchange",
    text: "Programmes celebrating the deep cultural bonds between Nigeria and Cuba.",
  },
  {
    icon: "document",
    title: "Education & Health",
    text: "Scholarships, medical cooperation and academic partnership across both nations.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-deep text-white"
      >
        <div className="pattern-diagonal absolute inset-0" aria-hidden="true" />
        <div className="glow-gold absolute inset-0" aria-hidden="true" />
        <Image
          src="/images/mfa-logo.png"
          alt=""
          width={520}
          height={520}
          className="pointer-events-none absolute -bottom-24 -right-16 hidden h-[26rem] w-[26rem] object-contain opacity-[0.07] lg:block"
          aria-hidden="true"
          priority
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1.65fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-gold">
              <span className="inline-block h-px w-10 bg-gold" aria-hidden="true" />
              Federal Republic of Nigeria · Ministry of Foreign Affairs
            </p>
            <h1
              id="hero-heading"
              className="font-serif text-4xl font-bold leading-[1.08] md:text-[3.6rem]"
            >
              Embassy of Nigeria
              <span className="block text-gold">in Havana</span>
            </h1>
            <div className="mt-6 flex gap-1" aria-hidden="true">
              <span className="h-1 w-16 bg-gold" />
              <span className="h-1 w-5 bg-white/40" />
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              Serving Nigerian citizens in Cuba and deepening the historic friendship between our
              two nations — with consular services delivered with dignity, efficiency and care.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/consular-services/visa-services"
                className="inline-flex items-center gap-2 rounded bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-dark shadow-lg shadow-black/20 transition-colors hover:bg-gold-dark"
              >
                Visa Services
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                href="/consular-services/passport-services"
                className="inline-flex items-center gap-2 rounded bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:bg-mist"
              >
                Passport Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded border border-white/50 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Book Appointment
              </Link>
              <Link
                href="/consular-services/consular-assistance"
                className="inline-flex items-center gap-2 rounded border border-gold/70 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
              >
                <Icon name="alert" className="h-4 w-4" />
                Emergency
              </Link>
            </div>
          </div>

          <div className="self-center overflow-hidden rounded border border-white/15 bg-white/[0.06] shadow-2xl shadow-black/25 backdrop-blur-sm">
            <div className="h-1 bg-gold" aria-hidden="true" />
            <div className="p-7">
              <h2 className="mb-5 flex items-center gap-2.5 font-serif text-lg font-bold">
                <Icon name="clock" className="h-5 w-5 text-gold" />
                Office Hours
              </h2>
              <ul className="space-y-2.5 text-sm text-white/90">
                {site.officeHours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-2.5">
                    <span>{h.days}</span>
                    <span className="font-semibold text-white">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2.5 text-sm">
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
        </div>
        <FlagStripe className="relative h-1.5" />
      </section>

      {/* Priority notice strip */}
      {alertNotice && (
        <div className="border-b border-gold/50 bg-gold/15">
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
      <section aria-labelledby="services-heading" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <SectionHeading
          eyebrow="Service · Dignity · Care"
          title="Consular Services"
          id="services-heading"
          link={{ label: "View all services", href: "/consular-services" }}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/consular-services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-deep hover:shadow-lg"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand-deep to-gold opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-gold">
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
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:py-20 lg:grid-cols-[1fr_2fr]">
          <figure className="mx-auto w-full max-w-xs">
            <div className="relative overflow-hidden rounded shadow-lg">
              <div className="flex aspect-[3/4] items-center justify-center border border-line bg-white">
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
              <FlagStripe className="h-1.5" />
            </div>
            <figcaption className="mt-4 text-center text-sm">
              <span className="block font-serif text-base font-bold text-brand-deep">
                {site.headOfMission}
              </span>
              <span className="text-ink/70">{site.headOfMissionTitle}</span>
            </figcaption>
          </figure>
          <div>
            <SectionHeading
              eyebrow="A word of welcome"
              title="Message from the Head of Mission"
              id="hom-heading"
            />
            <blockquote className="relative space-y-4 border-l-4 border-gold pl-6 text-base leading-relaxed text-ink/90">
              <p>
                “On behalf of the Government and people of the Federal Republic of Nigeria, I
                welcome you to the official website of the {site.missionName}. This Embassy exists
                to serve — to protect the interests of Nigerians in Cuba, and to deepen the
                historic friendship and partnership between our two countries.
              </p>
              <p>
                Whether you are a Nigerian seeking consular support, an investor exploring
                opportunities in Africa's largest economy, or a friend of Nigeria, you will find
                this Embassy ready to assist you with professionalism and courtesy.”
              </p>
            </blockquote>
            <Link
              href="/about#head-of-mission"
              className="mt-7 inline-flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
            >
              About the Head of Mission
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* News + Notices */}
      <section aria-labelledby="news-heading" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[2fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Latest from the Embassy"
              title="News & Press Releases"
              id="news-heading"
              link={{ label: "All news", href: "/news" }}
            />
            <ul className="space-y-5">
              {latestNews.map((n) => (
                <li
                  key={n.slug}
                  className="rounded border border-line bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
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
            <SectionHeading eyebrow="Official announcements" title="Public Notices" />
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
              className="mt-6 inline-flex items-center gap-1.5 rounded border-2 border-brand px-5 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Read all public notices
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bilateral relations summary */}
      <section
        aria-labelledby="relations-heading"
        className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-deep text-white"
      >
        <div className="pattern-diagonal absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
          <SectionHeading
            eyebrow="Nigeria & Cuba"
            title="A Historic Partnership"
            id="relations-heading"
            lead="Nigeria and Cuba share warm, longstanding relations built on solidarity, mutual respect and growing cooperation in trade, health, education and culture."
            link={{ label: "Explore bilateral relations", href: "/relations" }}
            tone="dark"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relationsAreas.map((a) => (
              <li
                key={a.title}
                className="rounded border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-gold/50"
              >
                <Icon name={a.icon} className="mb-3 h-7 w-7 text-gold" />
                <h3 className="mb-1.5 font-serif text-base font-bold">{a.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Diaspora band */}
      <section aria-labelledby="diaspora-heading" className="border-b border-line bg-mist">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-14">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Our community"
              title="Nigerians in Cuba"
              id="diaspora-heading"
              lead="Register with the Embassy so we can reach you in an emergency, stay informed through community notices, and take part in diaspora engagement programmes."
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/diaspora"
              className="rounded bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-deep"
            >
              Register with the Embassy
            </Link>
            <Link
              href="/diaspora"
              className="rounded border-2 border-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Diaspora Services
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency + Contact/location */}
      <section aria-labelledby="contact-heading" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <SectionHeading
          eyebrow="Here to help"
          title="Visit, Call or Write to Us"
          id="contact-heading"
        />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded border-l-4 border-red-700 bg-red-50 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-red-800">
              <Icon name="alert" className="h-5 w-5" />
              In an Emergency
            </h3>
            <p className="text-sm leading-relaxed">
              If a Nigerian citizen in Cuba is in danger, detained, hospitalised or bereaved, call
              the Embassy's 24-hour emergency line:
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
              What the Embassy can do
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded border border-line bg-white p-6 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
              <Icon name="pin" className="h-5 w-5" />
              Visit the Embassy
            </h3>
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
              className="mt-4 inline-flex items-center gap-1.5 rounded bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
            >
              Contact the Embassy
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded border border-line bg-white p-6 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
              <Icon name="calendar" className="h-5 w-5" />
              Appointments
            </h3>
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
