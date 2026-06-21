import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";
import { getServices } from "@/data/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consular Services",
  description: `Visa, passport, emergency travel, document authentication, notarial services and consular assistance at the ${site.missionName}.`,
};

export default async function ConsularServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        title="Consular Services"
        lead="Clear, step-by-step guidance for every consular service the Mission provides. All services are by appointment, and all official fees are paid online — never in cash."
        crumbs={[{ label: "Consular Services" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/consular-services/${s.slug}`}
                className="group flex h-full flex-col rounded border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-deep hover:shadow-md"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded bg-brand/10 text-brand">
                  <Icon name={s.icon as IconName} className="h-6 w-6" />
                </span>
                <h2 className="mb-2 font-serif text-lg font-bold text-brand-deep group-hover:underline">
                  {s.title}
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-ink/80">{s.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  Requirements, process & fees
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded border border-line bg-mist p-6">
            <h2 className="mb-2 flex items-center gap-2 font-serif text-lg font-bold text-brand-deep">
              <Icon name="calendar" className="h-5 w-5" />
              Before You Visit
            </h2>
            <p className="text-sm leading-relaxed">
              Complete your application online first, pay the official fee through the relevant
              government portal, and book an appointment. Walk-in submissions are accepted only
              for genuine emergencies.
            </p>
          </div>
          <div className="rounded border border-line bg-mist p-6">
            <h2 className="mb-2 flex items-center gap-2 font-serif text-lg font-bold text-brand-deep">
              <Icon name="shield" className="h-5 w-5" />
              No Agents, No Cash
            </h2>
            <p className="text-sm leading-relaxed">
              The Mission does not use agents or intermediaries, and no third party can speed up
              processing. All fees are paid online through official portals only — report any
              solicitation to {site.email}.
            </p>
          </div>
          <div className="rounded border-l-4 border-red-700 bg-red-50 p-6">
            <h2 className="mb-2 flex items-center gap-2 font-serif text-lg font-bold text-red-800">
              <Icon name="alert" className="h-5 w-5" />
              Emergencies
            </h2>
            <p className="text-sm leading-relaxed">
              For emergencies involving a Nigerian citizen — arrest, hospitalisation, bereavement
              or distress — call the 24-hour line:{" "}
              <a href={`tel:${site.emergencyPhone}`} className="font-bold text-red-800 underline">
                {site.emergencyPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
