"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { newsCategories, type NewsCategory, type NewsItem } from "@/data/news";
import Icon from "@/components/Icon";

const PAGE_SIZE = 4;

/** Official-style reference number, e.g. PRL/2026/0515 */
const refPrefix: Record<NewsCategory, string> = {
  News: "NWS",
  "Press Release": "PRL",
  Speech: "SPH",
  "Official Statement": "OST",
  "Mission Activity": "MAC",
};

function refNumber(n: NewsItem): string {
  const [y, m, d] = n.date.split("-");
  return `${refPrefix[n.category]}/${y}/${m}${d}`;
}

function DateBlock({ iso }: { iso: string }) {
  const dt = new Date(iso + "T00:00:00");
  return (
    <time
      dateTime={iso}
      className="flex w-16 shrink-0 flex-col items-center self-start border-t-2 border-gold bg-mist px-2 pb-2 pt-1.5 text-center"
    >
      <span className="font-serif text-[1.75rem] font-bold leading-tight text-brand-deep">
        {dt.getDate()}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-ink/65">
        {dt.toLocaleDateString("en-GB", { month: "short" })} {dt.getFullYear()}
      </span>
    </time>
  );
}

function longDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = items
    .filter((n) => category === "All" || n.category === category)
    .filter(
      (n) =>
        !query.trim() ||
        (n.title + " " + n.excerpt).toLowerCase().includes(query.trim().toLowerCase())
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const [featured, ...rows] = safePage === 1 ? pageItems : [undefined, ...pageItems];
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filtered.length);

  const changeFilter = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topRef}>
      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 border-b-2 border-line pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...newsCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => changeFilter(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                category === c
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink/75 hover:border-brand hover:text-brand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <label htmlFor="news-search" className="sr-only">
            Search news
          </label>
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45"
          />
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search news…"
            className="w-full rounded border border-line py-2 pl-9 pr-3 text-sm"
          />
        </div>
      </div>

      <p className="sr-only" role="status">
        Showing {from} to {to} of {filtered.length} items
      </p>

      {filtered.length === 0 ? (
        <p className="rounded border border-line bg-mist p-6 text-sm">
          No items match your filter. Try a different category or search term.
        </p>
      ) : (
        <>
          {/* Featured lead story — page 1 only */}
          {featured && (
            <article className="group mb-10 overflow-hidden rounded border border-line bg-white shadow-sm transition-shadow hover:shadow-lg">
              <div className="grid lg:grid-cols-[1.15fr_1fr]">
                <Link
                  href={`/news/${featured.slug}`}
                  className="relative block min-h-56 overflow-hidden bg-mist lg:min-h-full"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={featured.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority
                  />
                  <span className="absolute left-4 top-4 rounded bg-brand-dark/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold shadow">
                    {featured.category}
                  </span>
                </Link>
                <div className="relative p-7 lg:p-9">
                  <p className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-deep">
                    <span className="inline-block h-px w-9 bg-gold" aria-hidden="true" />
                    Featured · Latest
                  </p>
                  <h2 className="font-serif text-2xl font-bold leading-snug text-brand-deep md:text-[1.7rem]">
                    <Link href={`/news/${featured.slug}`} className="hover:underline">
                      {featured.title}
                    </Link>
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink/65">
                    <span className="flex items-center gap-1.5">
                      <Icon name="calendar" className="h-3.5 w-3.5 text-brand" />
                      {longDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="users" className="h-3.5 w-3.5 text-brand" />
                      {featured.department}
                    </span>
                    <span className="font-mono text-[11px] tracking-wide text-ink/55">
                      Ref: {refNumber(featured)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink/85 md:text-base">
                    {featured.excerpt}
                  </p>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-deep"
                  >
                    Read the full story
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Editorial rows */}
          <ul className="divide-y divide-line border-y border-line">
            {rows.filter(Boolean).map((n) => (
              <li key={n!.slug}>
                <article className="group relative flex gap-5 py-6 pl-4 pr-2 transition-colors hover:bg-mist/60 md:gap-7">
                  <span
                    className="absolute inset-y-4 left-0 w-1 bg-gold opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <DateBlock iso={n!.date} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                      <span className="font-bold uppercase tracking-[0.18em] text-brand-deep">
                        {n!.category}
                      </span>
                      <span aria-hidden="true" className="text-gold">
                        ◆
                      </span>
                      <span className="text-ink/60">{n!.department}</span>
                      <span className="font-mono tracking-wide text-ink/45">
                        Ref: {refNumber(n!)}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg font-bold leading-snug text-brand-deep md:text-xl">
                      <Link href={`/news/${n!.slug}`} className="hover:underline">
                        {n!.title}
                      </Link>
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/75">
                      {n!.excerpt}
                    </p>
                    <Link
                      href={`/news/${n!.slug}`}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                    >
                      Continue reading
                      <Icon
                        name="arrow"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                      <span className="sr-only">: {n!.title}</span>
                    </Link>
                  </div>
                  <Link
                    href={`/news/${n!.slug}`}
                    className="relative hidden h-28 w-44 shrink-0 self-center overflow-hidden rounded border border-line bg-mist md:block"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={n!.image.src}
                      alt=""
                      fill
                      sizes="176px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-ink/65">
              Showing <strong className="text-ink">{from}–{to}</strong> of{" "}
              <strong className="text-ink">{filtered.length}</strong>{" "}
              {category === "All" ? "items" : category.toLowerCase() + " items"}
            </p>
            {totalPages > 1 && (
              <nav aria-label="News pages">
                <ul className="flex items-center gap-1.5">
                  <li>
                    <button
                      type="button"
                      onClick={() => goTo(safePage - 1)}
                      disabled={safePage === 1}
                      aria-label="Previous page"
                      className="flex h-9 w-9 items-center justify-center rounded border border-line text-ink/70 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Icon name="chevron" className="h-4 w-4 rotate-90" />
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <li key={p}>
                      <button
                        type="button"
                        onClick={() => goTo(p)}
                        aria-label={`Page ${p}`}
                        aria-current={safePage === p ? "page" : undefined}
                        className={`h-9 w-9 rounded text-sm font-bold transition-colors ${
                          safePage === p
                            ? "border border-brand bg-brand text-white shadow-[inset_0_-2px_0_0_#e3b339]"
                            : "border border-line text-ink/70 hover:border-brand hover:text-brand"
                        }`}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => goTo(safePage + 1)}
                      disabled={safePage === totalPages}
                      aria-label="Next page"
                      className="flex h-9 w-9 items-center justify-center rounded border border-line text-ink/70 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Icon name="chevron" className="h-4 w-4 -rotate-90" />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </>
      )}
    </div>
  );
}
