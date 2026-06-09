"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import { news, formatDate } from "@/data/news";
import { notices } from "@/data/notices";

interface Result {
  type: string;
  title: string;
  href: string;
  snippet: string;
  date?: string;
}

const staticPages: Result[] = [
  {
    type: "Page",
    title: "About the Mission",
    href: "/about",
    snippet: "Overview, Head of Mission, history, departments and diplomatic mandate.",
  },
  {
    type: "Page",
    title: "Bilateral Relations",
    href: "/relations",
    snippet: "Political, economic, trade, cultural and educational cooperation.",
  },
  {
    type: "Page",
    title: "Nigerians in Diaspora",
    href: "/diaspora",
    snippet: "Registration, engagement programmes and emergency support for Nigerians.",
  },
  {
    type: "Page",
    title: "Contact Us",
    href: "/contact",
    snippet: "Address, phone numbers, office hours, appointments and the enquiry form.",
  },
  {
    type: "Page",
    title: "Public Notices",
    href: "/public-notices",
    snippet: "Announcements, advisories, holiday notices and service updates.",
  },
];

function buildIndex(): Result[] {
  return [
    ...services.map((s) => ({
      type: "Consular Service",
      title: s.title,
      href: `/consular-services/${s.slug}`,
      snippet: s.summary,
    })),
    ...news.map((n) => ({
      type: n.category,
      title: n.title,
      href: `/news/${n.slug}`,
      snippet: n.excerpt,
      date: n.date,
    })),
    ...notices.map((n) => ({
      type: `Notice — ${n.priority}`,
      title: n.title,
      href: `/public-notices#${n.id}`,
      snippet: n.body[0],
      date: n.date,
    })),
    ...staticPages,
  ];
}

export default function SearchResults() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const q = query.toLowerCase();

  const results = q
    ? buildIndex().filter((r) => (r.title + " " + r.snippet).toLowerCase().includes(q))
    : [];

  return (
    <div>
      <form action="/search" role="search" className="mb-8 flex max-w-xl gap-2">
        <label htmlFor="search-page-input" className="sr-only">
          Search services, notices and news
        </label>
        <input
          id="search-page-input"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="e.g. passport renewal, visa fees, holiday notice…"
          className="w-full rounded border border-line px-4 py-3 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-deep"
        >
          Search
        </button>
      </form>

      {!q ? (
        <p className="text-sm text-ink/75">
          Enter a search term above to find consular services, public notices, news and pages.
        </p>
      ) : (
        <>
          <p className="mb-6 text-sm text-ink/75" role="status">
            {results.length} result{results.length === 1 ? "" : "s"} for{" "}
            <strong className="text-ink">“{query}”</strong>
          </p>
          <ul className="space-y-4">
            {results.map((r) => (
              <li key={r.href + r.title} className="rounded border border-line bg-white p-5">
                <div className="mb-1.5 flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded bg-mist px-2 py-0.5 font-bold uppercase tracking-wide text-brand-deep">
                    {r.type}
                  </span>
                  {r.date && <time dateTime={r.date}>{formatDate(r.date)}</time>}
                </div>
                <h2 className="font-serif text-lg font-bold text-brand-deep">
                  <Link href={r.href} className="hover:underline">
                    {r.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-ink/80">{r.snippet}</p>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <div className="rounded border border-line bg-mist p-6 text-sm leading-relaxed">
              <p className="mb-2 font-semibold">No results found.</p>
              <p>
                Try a shorter or more general term — for example “passport”, “visa” or “notice” —
                or browse the <Link href="/consular-services" className="font-semibold text-brand underline">Consular Services</Link>{" "}
                and <Link href="/public-notices" className="font-semibold text-brand underline">Public Notices</Link> sections.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
