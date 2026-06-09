"use client";

import { useState, type ReactNode } from "react";
import Icon from "@/components/Icon";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="divide-y divide-line rounded border border-line">
      {items.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={open}
                aria-controls={`acc-panel-${item.id}`}
                id={`acc-button-${item.id}`}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-brand-deep hover:bg-mist"
              >
                {item.title}
                <Icon
                  name="chevron"
                  className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={`acc-panel-${item.id}`}
              role="region"
              aria-labelledby={`acc-button-${item.id}`}
              hidden={!open}
              className="px-4 pb-4 text-sm leading-relaxed text-ink"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
