"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate, newsCategories, type NewsItem } from "@/data/news";
import Icon from "@/components/Icon";

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = items
    .filter((n) => category === "All" || n.category === category)
    .filter(
      (n) =>
        !query.trim() ||
        (n.title + " " + n.excerpt).toLowerCase().includes(query.trim().toLowerCase())
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...newsCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news…"
            className="w-full rounded border border-line py-2 pl-9 pr-3 text-sm"
          />
        </div>
      </div>

      <p className="sr-only" role="status">
        {filtered.length} items shown
      </p>

      {filtered.length === 0 ? (
        <p className="rounded border border-line bg-mist p-6 text-sm">
          No items match your filter. Try a different category or search term.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n) => (
            <li
              key={n.slug}
              className="group flex flex-col overflow-hidden rounded border border-line bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <Link
                href={`/news/${n.slug}`}
                className="relative block aspect-[16/9] overflow-hidden bg-mist"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={n.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded bg-brand-dark/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold shadow">
                  {n.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col border-t-[3px] border-gold p-5">
                <div className="mb-2.5 flex items-center gap-2 text-xs text-ink/65">
                  <Icon name="calendar" className="h-3.5 w-3.5 text-brand" />
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{n.department}</span>
                </div>
                <h2 className="mb-2 font-serif text-lg font-bold leading-snug text-brand-deep">
                  <Link href={`/news/${n.slug}`} className="hover:underline">
                    {n.title}
                  </Link>
                </h2>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-ink/80">{n.excerpt}</p>
                <Link
                  href={`/news/${n.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                >
                  Read more
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="sr-only">: {n.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
