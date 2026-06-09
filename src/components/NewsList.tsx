"use client";

import { useState } from "react";
import Link from "next/link";
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
        <div className="md:w-72">
          <label htmlFor="news-search" className="sr-only">
            Search news
          </label>
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news…"
            className="w-full rounded border border-line px-3 py-2 text-sm"
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
              className="flex flex-col rounded border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="border-t-[3px] border-gold p-5">
                <div className="mb-3 flex items-center gap-3 text-xs">
                  <span className="rounded bg-brand-deep px-2 py-0.5 font-bold uppercase tracking-wide text-white">
                    {n.category}
                  </span>
                  <time dateTime={n.date} className="text-ink/65">
                    {formatDate(n.date)}
                  </time>
                </div>
                <h2 className="mb-2 font-serif text-lg font-bold leading-snug text-brand-deep">
                  <Link href={`/news/${n.slug}`} className="hover:underline">
                    {n.title}
                  </Link>
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-ink/80">{n.excerpt}</p>
                <Link
                  href={`/news/${n.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                >
                  Read more
                  <Icon name="arrow" className="h-4 w-4" />
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
