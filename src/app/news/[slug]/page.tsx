import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { news, getNewsItem, formatDate } from "@/data/news";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      publishedTime: item.date,
      authors: [item.department],
    },
    twitter: { card: "summary_large_image", title: item.title, description: item.excerpt },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  const related = news
    .filter((n) => n.slug !== item.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={item.title}
        crumbs={[{ label: "News & Press", href: "/news" }, { label: item.title }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <article aria-labelledby="article-meta">
            <div id="article-meta" className="mb-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded bg-brand-deep px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {item.category}
              </span>
              <time dateTime={item.date} className="text-ink/70">
                {formatDate(item.date)}
              </time>
              <span className="text-ink/40" aria-hidden="true">
                ·
              </span>
              <span className="text-ink/70">{item.department}</span>
            </div>
            <div className="max-w-3xl space-y-5">
              {item.body.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/90">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 border-t border-line pt-6 text-sm text-ink/70">
              <p>
                Issued by the {item.department}, {site.missionName}, {site.city},{" "}
                {site.hostCountry}. Media enquiries:{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
                  {site.email}
                </a>
              </p>
            </div>
            <Link
              href="/news"
              className="mt-8 inline-flex items-center gap-2 rounded border-2 border-brand px-5 py-2.5 text-sm font-bold text-brand hover:bg-brand hover:text-white"
            >
              Back to all news
            </Link>
          </article>

          <aside aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-serif text-xl font-bold text-brand-deep">
              More from the Mission
            </h2>
            <div className="mt-3 h-1 w-12 bg-gold" aria-hidden="true" />
            <ul className="mt-6 space-y-4">
              {related.map((n) => (
                <li key={n.slug} className="rounded border border-line bg-white p-4">
                  <div className="mb-1.5 flex items-center gap-2 text-xs">
                    <span className="rounded bg-mist px-2 py-0.5 font-bold uppercase tracking-wide text-brand-deep">
                      {n.category}
                    </span>
                    <time dateTime={n.date} className="text-ink/65">
                      {formatDate(n.date)}
                    </time>
                  </div>
                  <Link
                    href={`/news/${n.slug}`}
                    className="text-sm font-bold leading-snug text-brand-deep hover:underline"
                  >
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded border-l-4 border-gold bg-mist p-5 text-sm leading-relaxed">
              <h3 className="mb-1.5 flex items-center gap-2 font-bold text-brand-deep">
                <Icon name="bell" className="h-4 w-4" />
                Stay informed
              </h3>
              <p>
                Follow the Mission on its official social media channels and check{" "}
                <Link href="/public-notices" className="font-semibold text-brand underline">
                  Public Notices
                </Link>{" "}
                for advisories affecting Nigerians in {site.hostCountry}.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
