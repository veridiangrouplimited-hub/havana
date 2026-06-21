"use client";

import { useRef, useState } from "react";
import { type NoticePriority, noticePriorities, type Notice } from "@/data/notices";
import NoticeBadge from "@/components/NoticeBadge";
import Icon from "@/components/Icon";
import { formatDate } from "@/data/news";

const PAGE_SIZE = 4;

export default function NoticesList({ notices }: { notices: Notice[] }) {
  const [active, setActive] = useState<NoticePriority | "All">("All");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered =
    active === "All" ? notices : notices.filter((n) => n.priority === active);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, filtered.length);

  const counts = Object.fromEntries(
    noticePriorities.map((p) => [p, notices.filter((n) => n.priority === p).length])
  );

  const changeFilter = (f: NoticePriority | "All") => {
    setActive(f);
    setPage(1);
  };

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topRef}>
      {/* Category filter bar */}
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter notices by category"
      >
        <button
          type="button"
          onClick={() => changeFilter("All")}
          aria-pressed={active === "All"}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
            active === "All"
              ? "border-brand bg-brand text-white"
              : "border-line bg-white text-ink/70 hover:border-brand hover:text-brand"
          }`}
        >
          All{" "}
          <span className={`text-xs ${active === "All" ? "text-white/70" : "text-ink/45"}`}>
            ({notices.length})
          </span>
        </button>

        {noticePriorities.map((p) =>
          counts[p] > 0 ? (
            <button
              key={p}
              type="button"
              onClick={() => changeFilter(p)}
              aria-pressed={active === p}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                active === p
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink/70 hover:border-brand hover:text-brand"
              }`}
            >
              {p}{" "}
              <span className={`text-xs ${active === p ? "text-white/70" : "text-ink/45"}`}>
                ({counts[p]})
              </span>
            </button>
          ) : null
        )}
      </div>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic>
        Showing {from} to {to} of {filtered.length}{" "}
        {filtered.length === 1 ? "notice" : "notices"}
        {active !== "All" ? ` in category ${active}` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded border border-line bg-mist p-6 text-sm text-ink/75">
          No notices in this category.
        </p>
      ) : (
        <>
          <ul className="space-y-9">
            {pageItems.map((n) => (
              <li key={n.id}>
                <article
                  id={n.id}
                  aria-labelledby={`${n.id}-title`}
                  className="rounded border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
                    <NoticeBadge priority={n.priority} />
                    <time dateTime={n.date} className="text-ink/65">
                      Published {formatDate(n.date)}
                    </time>
                  </div>
                  <h2
                    id={`${n.id}-title`}
                    className="mb-3 font-serif text-xl font-bold leading-snug text-brand-deep"
                  >
                    {n.title}
                  </h2>
                  <div className="space-y-3">
                    {n.body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-ink/90 md:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-ink/65">
              Showing <strong className="text-ink">{from}–{to}</strong> of{" "}
              <strong className="text-ink">{filtered.length}</strong>{" "}
              {active === "All" ? "notices" : active.toLowerCase() + " notices"}
              {active !== "All" && (
                <button
                  type="button"
                  onClick={() => changeFilter("All")}
                  className="ml-3 inline-flex items-center gap-1 font-bold text-brand hover:underline"
                >
                  <Icon name="close" className="h-3 w-3" />
                  Clear
                </button>
              )}
            </p>
            {totalPages > 1 && (
              <nav aria-label="Notice pages">
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
