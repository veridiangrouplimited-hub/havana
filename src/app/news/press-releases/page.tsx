import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { getNews, formatDate } from "@/data/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press Releases",
  description: `Official press releases issued by the ${site.missionName}.`,
};

export default async function PressReleasesPage() {
  const allNews = await getNews();
  const items = allNews
    .filter((n) => n.category === "Press Release")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="Press Releases"
        lead="Official press releases issued by the Embassy of Nigeria in Tokyo. All releases are available for download and reproduction with attribution."
        crumbs={[{ label: "News & Press", href: "/news" }, { label: "Press Releases" }]}
      />

      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Reference guide */}
        <div className="mb-10 flex items-start gap-3 rounded-xl border border-line bg-mist p-5 text-sm">
          <Icon name="document" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <p className="text-ink/80">
            Press releases are referenced in the format <strong className="text-brand">PRL/YYYY/MMDD</strong>.
            For media enquiries contact{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
              {site.email}
            </a>.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="rounded border border-line bg-mist p-6 text-sm text-ink/65">
            No press releases are currently available. Check back soon.
          </p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {items.map((n) => {
              const [y, m, d] = n.date.split("-");
              const ref = `PRL/${y}/${m}${d}`;
              return (
                <li key={n.slug}>
                  <article className="group flex flex-col gap-1.5 py-6 sm:flex-row sm:items-start sm:gap-8">
                    {/* Date column */}
                    <div className="shrink-0 sm:w-28">
                      <time dateTime={n.date} className="text-xs font-semibold uppercase tracking-wide text-ink/55">
                        {formatDate(n.date)}
                      </time>
                      <p className="mt-0.5 font-mono text-[10px] text-brand/60">{ref}</p>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                        {n.department}
                      </p>
                      <h2 className="font-serif text-base font-bold leading-snug text-brand-deep group-hover:text-brand md:text-lg">
                        <Link href={`/news/${n.slug}`} className="after:absolute after:inset-0">
                          {n.title}
                        </Link>
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{n.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand">
                        Read release
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
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            All News
          </Link>
          <Link
            href="/public-notices"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            Public Notices
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
