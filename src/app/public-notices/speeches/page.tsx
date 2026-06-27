import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { getNews, formatDate } from "@/data/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speeches",
  description: `Official addresses and speeches delivered by the ${site.missionName}.`,
};

export default async function SpeechesPage() {
  const allNews = await getNews();
  const items = allNews
    .filter((n) => n.category === "Speech")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="Speeches"
        lead="Addresses and speeches delivered by the Head of Mission and the Embassy of Nigeria in Tokyo at official functions and public events."
        crumbs={[{ label: "Public Notices", href: "/public-notices" }, { label: "Speeches" }]}
      />

      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Introduction note */}
        <div className="mb-10 flex items-start gap-3 rounded-xl border-l-4 border-brand bg-mist p-5 text-sm">
          <Icon name="quote" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <p className="text-ink/80">
            This section contains the full text of speeches and addresses delivered at official
            functions, national day celebrations and public events. Each speech is attributed
            to the speaker and dated at time of delivery.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="rounded border border-line bg-mist p-6 text-sm text-ink/65">
            No speeches are currently published. Check back soon.
          </p>
        ) : (
          <ul className="space-y-6">
            {items.map((n) => {
              const badge = categoryLabel[n.category] ?? { label: n.category, color: "bg-line text-ink" };
              return (
                <li key={n.slug}>
                  <article className="group relative overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md">
                    {/* Accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-brand via-brand/60 to-brand/20" />
                    <div className="p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2.5">
                        <span className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${badge.color}`}>
                          {badge.label}
                        </span>
                        <time dateTime={n.date} className="text-xs text-ink/55">
                          {formatDate(n.date)}
                        </time>
                        <span className="text-xs text-ink/40">·</span>
                        <span className="text-xs font-medium text-ink/55">{n.department}</span>
                      </div>

                      <h2 className="font-serif text-lg font-bold leading-snug text-brand-deep group-hover:text-brand md:text-xl">
                        <Link href={`/news/${n.slug}`} className="after:absolute after:inset-0">
                          {n.title}
                        </Link>
                      </h2>

                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink/75">
                        {n.excerpt}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand">
                        Read full text
                        <Icon name="arrow" className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
          <Link
            href="/public-notices"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            All Public Notices
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            News & Press
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
