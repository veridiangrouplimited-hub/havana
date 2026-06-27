import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Address, phone numbers, email, office hours, emergency contacts and the enquiry form for the ${site.missionName}.`,
};

const departmentContacts = [
  { name: "Consular Section (visas, passports, documents)", email: "consular.tokyo@foreignaffairs.gov.ng" },
  { name: "Trade & Investment Section", email: "trade.tokyo@foreignaffairs.gov.ng" },
  { name: "Information & Press", email: "press.tokyo@foreignaffairs.gov.ng" },
  { name: "Education & Scholarships", email: "education.tokyo@foreignaffairs.gov.ng" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        lead="Reach the Mission by phone, email or the enquiry form below. For emergencies involving a Nigerian citizen, call the 24-hour line at any time."
        crumbs={[{ label: "Contact Us" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact details */}
          <div className="space-y-9">
            <section aria-labelledby="address-heading">
              <h2 id="address-heading" className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
                <Icon name="pin" className="h-5 w-5" />
                Mission Address
              </h2>
              <address className="text-sm not-italic leading-relaxed md:text-base">
                {site.missionName}
                <br />
                {site.address}
                <br />
                {site.city}, {site.hostCountry}
              </address>
              <div className="mt-4 overflow-hidden rounded border border-line">
                <iframe
                  title={`Map showing the location of the Embassy at ${site.address}, ${site.city}`}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=139.70%2C35.62%2C139.74%2C35.65&layer=mapnik&marker=35.6340%2C139.7233"
                  className="h-64 w-full border-0"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-xs">
                <a
                  href="https://www.openstreetmap.org/?mlat=35.6340&mlon=139.7233#map=15/35.6340/139.7233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand underline"
                >
                  View larger map
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </p>
            </section>

            <section aria-labelledby="phones-heading">
              <h2 id="phones-heading" className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
                <Icon name="phone" className="h-5 w-5" />
                Phone & Email
              </h2>
              <ul className="space-y-2 text-sm md:text-base">
                {site.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p}`} className="font-semibold text-brand underline">
                      {p}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
                    {site.email}
                  </a>
                </li>
              </ul>
            </section>

            <section aria-labelledby="hours-heading">
              <h2 id="hours-heading" className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
                <Icon name="clock" className="h-5 w-5" />
                Office Hours
              </h2>
              <ul className="space-y-1.5 text-sm md:text-base">
                {site.officeHours.map((h) => (
                  <li key={h.days}>
                    <strong>{h.days}:</strong> {h.hours}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-ink/70">
                The Mission is closed on Nigerian and {site.hostCountry} public holidays — see{" "}
                <a href="/public-notices" className="font-semibold text-brand underline">
                  Public Notices
                </a>
                .
              </p>
            </section>

            <section aria-labelledby="emergency-heading" className="rounded border-l-4 border-red-700 bg-red-50 p-5">
              <h2 id="emergency-heading" className="mb-2 flex items-center gap-2 font-serif text-lg font-bold text-red-800">
                <Icon name="alert" className="h-5 w-5" />
                Emergency Contact
              </h2>
              <p className="text-sm leading-relaxed">
                For emergencies involving the safety or welfare of a Nigerian citizen, call:
              </p>
              <a href={`tel:${site.emergencyPhone}`} className="mt-2 block text-xl font-bold text-red-800 underline">
                {site.emergencyPhone}
              </a>
              <p className="mt-1 text-xs text-ink/70">Available 24 hours. Not for routine enquiries.</p>
            </section>

            <section aria-labelledby="departments-heading">
              <h2 id="departments-heading" className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-brand-deep">
                <Icon name="users" className="h-5 w-5" />
                Department Contacts
              </h2>
              <ul className="space-y-2.5 text-sm">
                {departmentContacts.map((d) => (
                  <li key={d.name} className="rounded border border-line bg-white p-3">
                    <span className="block font-semibold">{d.name}</span>
                    <a href={`mailto:${d.email}`} className="text-brand underline">
                      {d.email}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="social-heading" className="rounded border border-line bg-white p-5">
              <h2 id="social-heading" className="mb-1 font-serif text-xl font-bold text-brand-deep">
                Follow the Mission
              </h2>
              <p className="mb-4 text-sm text-ink/70">
                Stay up to date with news, events and announcements from the Embassy.
              </p>
              <ul className="flex flex-wrap gap-3">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <Icon name={s.icon as "facebook" | "x" | "instagram"} className="h-4 w-4" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Enquiry form */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-deep">Send an Enquiry</h2>
            <div className="mt-3 h-1 w-16 bg-gold" aria-hidden="true" />
            <p className="mt-4 mb-7 max-w-xl text-sm leading-relaxed text-ink/85 md:text-base">
              Use this form for general and service enquiries, appointment requests and diaspora
              registration. The relevant section will respond by email, normally within three
              working days.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
