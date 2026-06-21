import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import { getNews, getNewsItem, formatDate } from "@/data/news";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);
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
      images: [{ url: item.image.src, alt: item.image.alt }],
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
  const [item, allNews] = await Promise.all([getNewsItem(slug), getNews()]);
  if (!item) notFound();

  const related = allNews
    .filter((n) => n.slug !== item.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={item.title}
        crumbs={[{ label: "News & Press", href: "/news" }, { label: item.title }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <article aria-labelledby="article-meta">
            <div id="article-meta" className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="rounded bg-brand-deep px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {item.category}
              </span>
              <span className="flex items-center gap-1.5 text-ink/70">
                <Icon name="calendar" className="h-4 w-4 text-brand" />
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </span>
              <span className="flex items-center gap-1.5 text-ink/70">
                <Icon name="users" className="h-4 w-4 text-brand" />
                {item.department}
              </span>
            </div>

            <figure className="mb-10">
              <div className="relative aspect-[16/8] overflow-hidden rounded border border-line bg-mist shadow-sm">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-2 flex items-center gap-1.5 text-xs text-ink/60">
                <Icon name="document" className="h-3.5 w-3.5" />
                {item.image.alt}. <span className="italic">{item.image.credit}</span>
              </figcaption>
            </figure>

            <div className="max-w-3xl space-y-6">
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
              className="mt-8 inline-flex items-center gap-2 rounded border-2 border-brand px-5 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Back to all news
            </Link>
          </article>

          <aside aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-serif text-xl font-bold text-brand-deep">
              More from the Embassy
            </h2>
            <div className="mt-3 flex gap-1" aria-hidden="true">
              <span className="h-1 w-10 bg-gold" />
              <span className="h-1 w-3 bg-brand" />
            </div>
            <ul className="mt-6 space-y-4">
              {related.map((n) => (
                <li
                  key={n.slug}
                  className="group flex gap-3 overflow-hidden rounded border border-line bg-white p-3 transition-shadow hover:shadow-md"
                >
                  <Link
                    href={`/news/${n.slug}`}
                    className="relative block h-20 w-24 shrink-0 overflow-hidden rounded bg-mist"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={n.image.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2 text-[11px]">
                      <span className="rounded bg-mist px-1.5 py-0.5 font-bold uppercase tracking-wide text-brand-deep">
                        {n.category}
                      </span>
                      <time dateTime={n.date} className="text-ink/65">
                        {formatDate(n.date)}
                      </time>
                    </div>
                    <Link
                      href={`/news/${n.slug}`}
                      className="line-clamp-3 text-sm font-bold leading-snug text-brand-deep hover:underline"
                    >
                      {n.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded border-l-4 border-gold bg-mist p-5 text-sm leading-relaxed">
              <h3 className="mb-1.5 flex items-center gap-2 font-bold text-brand-deep">
                <Icon name="bell" className="h-4 w-4" />
                Stay informed
              </h3>
              <p>
                Follow the Embassy on its official social media channels and check{" "}
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
