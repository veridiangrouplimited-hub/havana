"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Accessible tabs (WAI-ARIA tabs pattern) with hash deep-linking,
 * so menu items and external links can point at e.g. /about#history.
 */
export default function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const [active, setActive] = useState(items[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && items.some((t) => t.id === hash)) setActive(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [items]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next !== null) {
      e.preventDefault();
      tabRefs.current[next]?.focus();
      select(items[next].id);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div role="tablist" aria-label={label} className="flex min-w-max border-b-2 border-line">
          {items.map((tab, i) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`-mb-0.5 whitespace-nowrap border-b-4 px-4 py-3 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-gold bg-mist/60 text-brand-deep"
                    : "border-transparent text-ink/65 hover:text-brand-deep"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {items.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== tab.id}
          tabIndex={0}
          className="py-7"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
