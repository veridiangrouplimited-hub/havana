import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NoticeBadge from "@/components/NoticeBadge";
import Icon from "@/components/Icon";
import { notices } from "@/data/notices";
import { formatDate } from "@/data/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Public Notices",
  description: `Official announcements, consular advisories, holiday notices and service updates from the ${site.missionName}.`,
};

const sorted = [...notices].sort((a, b) => b.date.localeCompare(a.date));

export default function PublicNoticesPage() {
  return (
    <>
      <PageHeader
        title="Public Notices"
        lead="Official announcements, consular advisories, holiday notices and service updates. Notices are listed with the most recent first."
        crumbs={[{ label: "Public Notices" }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <ul className="space-y-9">
          {sorted.map((n) => (
            <li key={n.id}>
              <article
                id={n.id}
                aria-labelledby={`${n.id}-title`}
                className="rounded border border-line bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                  <NoticeBadge priority={n.priority} />
                  <time dateTime={n.date} className="text-ink/65">
                    Published {formatDate(n.date)}
                  </time>
                </div>
                <h2 id={`${n.id}-title`} className="mb-3 font-serif text-xl font-bold leading-snug text-brand-deep">
                  {n.title}
                </h2>
                <div className="space-y-3">
                  {n.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink/90 md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded border-l-4 border-gold bg-mist p-6 text-sm leading-relaxed">
          <h2 className="mb-2 flex items-center gap-2 font-serif text-lg font-bold text-brand-deep">
            <Icon name="bell" className="h-5 w-5" />
            About these notices
          </h2>
          <p>
            Public notices are the Mission's official channel for time-sensitive announcements.
            For enquiries about any notice, contact the Mission at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
              {site.email}
            </a>{" "}
            or call {site.phones[0]} during office hours.
          </p>
        </div>
      </div>
    </>
  );
}
