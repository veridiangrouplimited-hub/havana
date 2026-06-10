import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Tabs from "@/components/Tabs";
import Accordion from "@/components/Accordion";
import Icon from "@/components/Icon";
import { services, getService } from "@/data/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary },
  };
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 font-serif text-xl font-bold text-brand-deep">{children}</h2>;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader
        title={service.title}
        lead={service.summary}
        crumbs={[
          { label: "Consular Services", href: "/consular-services" },
          { label: service.title },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Quick facts */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded border border-line bg-mist p-4">
            <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div className="text-sm">
              <p className="font-bold text-brand-deep">Processing time</p>
              <p className="text-ink/80">{service.processingTime[0]}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded border border-line bg-mist p-4">
            <Icon name="calendar" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div className="text-sm">
              <p className="font-bold text-brand-deep">Appointment</p>
              <p className="text-ink/80">
                Required for all submissions —{" "}
                <Link href="/contact" className="font-semibold text-brand underline">
                  book here
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded border border-line bg-mist p-4">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div className="text-sm">
              <p className="font-bold text-brand-deep">Payments</p>
              <p className="text-ink/80">Official online payment only. No cash, no agents.</p>
            </div>
          </div>
        </div>

        <Tabs
          label={service.title}
          items={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <div className="max-w-3xl">
                  <H2>What is this service?</H2>
                  {service.overview.map((p, i) => (
                    <p key={i} className="mb-5 text-sm leading-relaxed text-ink/90 md:text-base">
                      {p}
                    </p>
                  ))}
                  <H2>Who is eligible?</H2>
                  <ul className="space-y-3">
                    {service.eligibility.map((e) => (
                      <li key={e} className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              id: "requirements",
              label: "Requirements",
              content: (
                <div className="max-w-3xl">
                  <H2>Documents and requirements</H2>
                  <ul className="space-y-3">
                    {service.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
                        <Icon name="document" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  {service.forms.length > 0 && (
                    <>
                      <h3 className="mb-3 mt-8 font-serif text-lg font-bold text-brand-deep">
                        Downloadable forms
                      </h3>
                      <ul className="space-y-2">
                        {service.forms.map((f) => (
                          <li key={f.label}>
                            <a
                              href={f.href}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline"
                            >
                              <Icon name="download" className="h-4 w-4" />
                              {f.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ),
            },
            {
              id: "process",
              label: "Process",
              content: (
                <div className="max-w-3xl">
                  <H2>How to apply — step by step</H2>
                  <ol className="space-y-5">
                    {service.process.map((step, i) => (
                      <li key={step} className="flex items-start gap-4">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-serif text-sm font-bold text-white"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <p className="pt-1 text-sm leading-relaxed md:text-base">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ),
            },
            {
              id: "fees",
              label: "Fees",
              content: (
                <div className="max-w-3xl">
                  <H2>Fees</H2>
                  <table className="w-full border-collapse text-sm md:text-base">
                    <caption className="sr-only">Fee schedule for {service.title}</caption>
                    <thead>
                      <tr className="bg-brand text-left text-white">
                        <th scope="col" className="border border-brand-deep px-4 py-3 font-semibold">
                          Item
                        </th>
                        <th scope="col" className="border border-brand-deep px-4 py-3 font-semibold">
                          Fee
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.fees.map((f) => (
                        <tr key={f.item} className="even:bg-mist">
                          <td className="border border-line px-4 py-3">{f.item}</td>
                          <td className="border border-line px-4 py-3 font-semibold">{f.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 rounded border-l-4 border-gold bg-gold/10 p-4 text-sm leading-relaxed">
                    {service.feesNote}
                  </p>
                </div>
              ),
            },
            {
              id: "processing-time",
              label: "Processing Time",
              content: (
                <div className="max-w-3xl">
                  <H2>How long does it take?</H2>
                  <ul className="space-y-3">
                    {service.processingTime.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
                        <Icon name="clock" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-relaxed text-ink/75">
                    Processing times are indicative and begin when a complete application is
                    received. Do not purchase non-refundable travel tickets based on expected
                    processing times.
                  </p>
                </div>
              ),
            },
            {
              id: "faqs",
              label: "FAQs",
              content: (
                <div className="max-w-3xl">
                  <H2>Frequently asked questions</H2>
                  <Accordion
                    items={service.faqs.map((f, i) => ({
                      id: `${service.slug}-faq-${i}`,
                      title: f.q,
                      content: <p>{f.a}</p>,
                    }))}
                  />
                </div>
              ),
            },
            {
              id: "contact",
              label: "Contact",
              content: (
                <div className="max-w-3xl">
                  <H2>Enquiries about this service</H2>
                  <div className="space-y-3 rounded border border-line bg-mist p-6 text-sm leading-relaxed md:text-base">
                    <p className="flex items-center gap-3">
                      <Icon name="mail" className="h-5 w-5 shrink-0 text-brand" />
                      <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
                        {site.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Icon name="phone" className="h-5 w-5 shrink-0 text-brand" />
                      <a href={`tel:${site.phones[0]}`} className="font-semibold text-brand underline">
                        {site.phones[0]}
                      </a>
                    </p>
                    <p className="flex items-start gap-3">
                      <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span>
                        Consular enquiries: {site.officeHours[0].days}, {site.officeHours[0].hours}
                      </span>
                    </p>
                  </div>
                  {service.externalLinks.length > 0 && (
                    <>
                      <h3 className="mb-3 mt-8 font-serif text-lg font-bold text-brand-deep">
                        Official external links
                      </h3>
                      <ul className="space-y-2">
                        {service.externalLinks.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline"
                            >
                              {l.label}
                              <Icon name="external" className="h-3.5 w-3.5" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-deep"
                  >
                    Send an enquiry
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
