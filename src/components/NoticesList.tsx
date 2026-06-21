"use client";

import { useState } from "react";
import Link from "next/link";
import { type Notice, type NoticePriority, noticePriorities } from "@/data/notices";
import NoticeBadge from "@/components/NoticeBadge";
import Icon from "@/components/Icon";
import { formatDate } from "@/data/news";

export default function NoticesList({ notices }: { notices: Notice[] }) {
  const [active, setActive] = useState<NoticePriority | "All">("All");

  const filtered =
    active === "All" ? notices : notices.filter((n) => n.priority === active);

  const counts = Object.fromEntries(
    noticePriorities.map((p) => [p, notices.filter((n) => n.priority === p).length])
  );

  return (
    <div>
      {/* Category filter bar */}
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter notices by category"
      >
        <button
          type="button"
          onClick={() => setActive("All")}
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
              onClick={() => setActive(p)}
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

      <p className="sr-only" role="status">
        {filtered.length} {filtered.length === 1 ? "notice" : "notices"} shown
        {active !== "All" ? ` in category ${active}` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded border border-line bg-mist p-6 text-sm text-ink/75">
          No notices in this category.
        </p>
      ) : (
        <ul className="space-y-9">
          {filtered.map((n) => (
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
                  {n.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink/90 md:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {active !== "All" && (
        <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
          <p className="text-sm text-ink/65">
            Showing <strong className="text-ink">{filtered.length}</strong> of{" "}
            <strong className="text-ink">{notices.length}</strong> notices
          </p>
          <button
            type="button"
            onClick={() => setActive("All")}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
          >
            <Icon name="close" className="h-3.5 w-3.5" />
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
