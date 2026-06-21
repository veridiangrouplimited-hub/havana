"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import PdfModal from "@/components/PdfModal";
import {
  docCategories,
  type ConsularDocument,
  type DocCategory,
} from "@/data/documents";

export default function DocumentsList({ documents }: { documents: ConsularDocument[] }) {
  const [active, setActive] = useState<DocCategory | "all">("all");
  const [viewing, setViewing] = useState<ConsularDocument | null>(null);

  const filtered =
    active === "all" ? documents : documents.filter((d) => d.category === active);

  return (
    <>
      {/* Category filter */}
      <div
        className="mb-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter documents by category"
      >
        {docCategories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActive(cat.value)}
            aria-pressed={active === cat.value}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              active === cat.value
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-ink hover:border-brand/50 hover:text-brand"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Document list */}
      <ul className="space-y-3">
        {filtered.map((doc) => (
          <li
            key={doc.id}
            className="flex items-start gap-4 rounded-lg border border-line bg-white p-4 shadow-sm transition-shadow hover:shadow"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/8 text-brand">
              <Icon name="document" className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink leading-snug">{doc.title}</p>
              <p className="mt-1 text-sm text-ink/65">{doc.description}</p>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-ink/40">
                PDF &middot; {doc.sizeKb}&thinsp;KB &middot; Rev.&nbsp;{doc.rev}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 pt-0.5 sm:flex-row">
              <button
                type="button"
                onClick={() => setViewing(doc)}
                className="flex items-center gap-1.5 rounded border border-brand px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                aria-label={`View ${doc.title} in browser`}
              >
                <Icon name="eye" className="h-3.5 w-3.5" />
                View
              </button>
              <a
                href={`/docs/${doc.filename}`}
                download={doc.filename}
                className="flex items-center gap-1.5 rounded bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-deep"
                aria-label={`Download ${doc.title}`}
              >
                <Icon name="download" className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>

      {/* PDF viewer modal */}
      {viewing && <PdfModal doc={viewing} onClose={() => setViewing(null)} />}
    </>
  );
}
