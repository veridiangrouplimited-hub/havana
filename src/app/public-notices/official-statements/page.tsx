import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { getNews, formatDate } from "@/data/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Official Statements",
  description: `Formal statements issued by the ${site.missionName} on matters of public interest.`,
};

export default async function OfficialStatementsPage() {
  const allNews = await getNews();
  const items = allNews
    .filter((n) => n.category === "Official Statement")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="Official Statements"
        lead="Formal statements issued by the Embassy of Nigeria in Tokyo on matters of public interest, policy and consular affairs."
        crumbs={[{ label: "Public Notices", href: "/public-notices" }, { label: "Official Statements" }]}
      />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10 flex items-start gap-3 rounded-xl border-l-4 border-gold bg-mist p-5 text-sm">
          <Icon name="document" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <p className="text-ink/80">
            Official statements represent the formal position of the Mission. For enquiries
            contact{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
              {site.email}
            </a>.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="rounded border border-line bg-mist p-6 text-sm text-ink/65">
            No official statements are currently published. Check back soon.
          </p>
        ) : (
          <ul className="space-y-6">
            {items.map((n) => (
              <li key={n.slug}>
                <article className="group relative overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/60 to-gold/20" />
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2.5">
                      <span className="rounded bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                        Official Statement
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
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink/75">{n.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand">
                      Read full statement
                      <Icon name="arrow" className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
          <Link href="/public-notices" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            Public Notices
          </Link>
          <Link href="/public-notices/speeches" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            Speeches
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
