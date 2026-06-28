"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type NewsItem, formatDate } from "@/data/news";
import Icon from "@/components/Icon";

/**
 * Homepage news section. Mobile: horizontal snap-scroll carousel with dot
 * indicators and prev/next buttons. Desktop (lg+): the same editorial
 * vertical-stack layout used elsewhere.
 */
export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActive(index);
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  return (
    <>
      {/* ── Mobile: horizontal snap scroll ── */}
      <div className="relative overflow-hidden lg:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
        >
          {items.map((n) => (
            <article
              key={n.slug}
              className="group w-[82vw] max-w-sm shrink-0 snap-start overflow-hidden rounded border border-line bg-white shadow-sm"
            >
              <Link
                href={`/news/${n.slug}`}
                className="relative block h-44 overflow-hidden bg-mist"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={n.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 384px, 82vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded bg-brand-dark/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold shadow">
                  {n.category}
                </span>
              </Link>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-ink/65">
                  <Icon name="calendar" className="h-3.5 w-3.5 text-brand" />
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{n.department}</span>
                </div>
                <h3 className="font-serif text-lg font-bold leading-snug text-brand-deep">
                  <Link href={`/news/${n.slug}`} className="hover:underline">
                    {n.title}
                  </Link>
                </h3>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink/80">{n.excerpt}</p>
                <Link
                  href={`/news/${n.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
                >
                  Read more
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="sr-only">: {n.title}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Controls: prev · dots · next */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Previous news item"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/55 transition-colors hover:border-brand hover:text-brand disabled:opacity-30"
          >
            <Icon name="chevron" className="h-4 w-4 rotate-90" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="News slides">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to news item ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  active === i ? "h-2.5 w-7 bg-brand" : "h-2.5 w-2.5 bg-line hover:bg-brand/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollTo(Math.min(items.length - 1, active + 1))}
            disabled={active === items.length - 1}
            aria-label="Next news item"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/55 transition-colors hover:border-brand hover:text-brand disabled:opacity-30"
          >
            <Icon name="chevron" className="h-4 w-4 -rotate-90" />
          </button>
        </div>
      </div>

      {/* ── Desktop: editorial vertical stack ── */}
      <ul className="hidden space-y-9 lg:block">
        {items.map((n) => (
          <li
            key={n.slug}
            className="group flex overflow-hidden rounded border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <Link
              href={`/news/${n.slug}`}
              className="relative block h-44 w-52 shrink-0 overflow-hidden bg-mist"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={n.image.src}
                alt=""
                fill
                sizes="208px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded bg-brand-dark/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold shadow">
                {n.category}
              </span>
            </Link>
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2 text-xs text-ink/65">
                <Icon name="calendar" className="h-3.5 w-3.5 text-brand" />
                <time dateTime={n.date}>{formatDate(n.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="truncate">{n.department}</span>
              </div>
              <h3 className="font-serif text-lg font-bold leading-snug text-brand-deep">
                <Link href={`/news/${n.slug}`} className="hover:underline">
                  {n.title}
                </Link>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{n.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
