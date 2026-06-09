import Link from "next/link";
import Image from "next/image";
import { site, govLinks } from "@/lib/site";
import Icon from "@/components/Icon";
import FlagStripe from "@/components/FlagStripe";

const quickLinks = [
  { label: "Visa Services", href: "/consular-services/visa-services" },
  { label: "Passport Services", href: "/consular-services/passport-services" },
  { label: "Public Notices", href: "/public-notices" },
  { label: "News & Press Releases", href: "/news" },
  { label: "Nigerians in Diaspora", href: "/diaspora" },
  { label: "Book an Appointment", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      <FlagStripe className="h-1.5" />
      <div className="h-px bg-gold/60" aria-hidden="true" />
      <Image
        src="/images/mfa-logo.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -bottom-24 -right-16 hidden h-96 w-96 object-contain opacity-[0.05] lg:block"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/images/mfa-logo.png"
              alt=""
              width={52}
              height={52}
              className="h-13 w-13 object-contain"
            />
            <div className="border-l-2 border-gold/60 pl-3">
              <p className="font-serif text-base font-bold leading-snug">{site.missionName}</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
                Federal Republic of Nigeria
              </p>
            </div>
          </div>
          <address className="space-y-2.5 text-sm not-italic text-white/85">
            <p className="flex gap-2">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.address}, {site.city}, {site.hostCountry}
            </p>
            {site.phones.map((p) => (
              <p key={p} className="flex gap-2">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${p}`} className="hover:underline">
                  {p}
                </a>
              </p>
            ))}
            <p className="flex gap-2">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </p>
            <p className="flex gap-2 font-semibold text-white">
              <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Emergency: {site.emergencyPhone}
            </p>
          </address>
        </div>

        <nav aria-label="Quick links">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-base font-bold">
            <span className="inline-block h-px w-6 bg-gold" aria-hidden="true" />
            Quick Links
          </h2>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="text-white/85 hover:text-gold hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Nigerian government links">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-base font-bold">
            <span className="inline-block h-px w-6 bg-gold" aria-hidden="true" />
            Government of Nigeria
          </h2>
          <ul className="space-y-2.5 text-sm">
            {govLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/85 hover:text-gold hover:underline"
                >
                  {l.label}
                  <Icon name="external" className="h-3 w-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-serif text-base font-bold">
            <span className="inline-block h-px w-6 bg-gold" aria-hidden="true" />
            Connect With the Embassy
          </h2>
          <ul className="mb-6 space-y-2.5 text-sm">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="inline-flex items-center gap-1.5 text-white/85 hover:text-gold hover:underline"
                >
                  {s.label}
                  <Icon name="external" className="h-3 w-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <h3 className="mb-2 text-sm font-bold">Office Hours</h3>
          <ul className="space-y-1 text-sm text-white/85">
            {site.officeHours.map((h) => (
              <li key={h.days}>
                <span className="font-medium text-white">{h.days}:</span> {h.hours}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/75 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.missionName}. Federal Republic of Nigeria. All
            rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
