"use client";

import { useEffect, useRef } from "react";
import type { ConsularDocument } from "@/data/documents";
import Icon from "@/components/Icon";

export default function PdfModal({
  doc,
  onClose,
}: {
  doc: ConsularDocument;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => closeRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Document viewer: ${doc.title}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        style={{ height: "90vh" }}
      >
        {/* Toolbar */}
        <div className="flex shrink-0 items-center justify-between border-b border-line bg-brand px-5 py-3">
          <div className="mr-4 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
              Document Viewer
            </p>
            <p className="truncate font-semibold text-white">{doc.title}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`/docs/${doc.filename}`}
              download={doc.filename}
              className="flex items-center gap-1.5 rounded bg-gold px-3.5 py-2 text-xs font-bold text-brand-dark hover:bg-gold-dark"
            >
              <Icon name="download" className="h-4 w-4" />
              Download
            </a>
            <button
              ref={closeRef}
              onClick={onClose}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close document viewer"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src={`/docs/${doc.filename}`}
          title={doc.title}
          className="h-full w-full bg-slate-100"
        />
      </div>
    </div>
  );
}
