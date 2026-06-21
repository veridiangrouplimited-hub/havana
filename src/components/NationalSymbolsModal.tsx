"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";

const ANTHEM_STANZAS = [
  [
    "Nigeria, we hail thee,",
    "Our own dear native land,",
    "Though tribe and tongue may differ,",
    "In brotherhood we stand,",
    "Nigerians all are proud to serve",
    "Our sovereign Motherland.",
  ],
  [
    "Our flag shall be a symbol",
    "That truth and justice reign,",
    "In peace or battle honour'd,",
    "And this we count as gain,",
    "To hand on to our children",
    "A banner without stain.",
  ],
  [
    "O God of all creation,",
    "Grant this our one request,",
    "Help us to build a nation",
    "Where no man is oppressed,",
    "And so with peace and plenty",
    "Nigeria may be blessed.",
  ],
];

export default function NationalSymbolsModal({
  trigger,
}: {
  trigger: (openFn: () => void) => ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <>
      {trigger(open)}

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nsm-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />

          {/* Panel */}
          <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* Header bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-line bg-brand px-6 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  Federal Republic of Nigeria
                </p>
                <h2
                  id="nsm-title"
                  className="font-serif text-lg font-bold text-white"
                >
                  National Symbols
                </h2>
              </div>
              <button
                ref={closeRef}
                onClick={close}
                className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close national symbols panel"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto">
              {/* Coat of arms */}
              <div className="flex flex-col items-center gap-3 border-b border-line bg-mist px-6 py-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl" aria-hidden="true" />
                  <Image
                    src="/maps/ng-coa.jpg"
                    alt="Coat of Arms of the Federal Republic of Nigeria"
                    width={152}
                    height={152}
                    className="relative h-36 w-36 rounded-full object-contain shadow-lg ring-4 ring-gold/40"
                  />
                </div>
                <p className="font-serif text-base font-bold text-brand-deep">
                  Federal Republic of Nigeria
                </p>
                <div className="flex items-center gap-2 text-xs text-ink/55">
                  <span className="inline-block h-px w-6 bg-gold/60" aria-hidden="true" />
                  <span className="font-semibold uppercase tracking-[0.16em]">
                    Unity and Faith, Peace and Progress
                  </span>
                  <span className="inline-block h-px w-6 bg-gold/60" aria-hidden="true" />
                </div>
              </div>

              {/* National Anthem */}
              <div className="px-6 py-7">
                <h3 className="mb-1 flex items-center gap-2.5 font-serif text-base font-bold text-brand-deep">
                  <span className="inline-block h-px w-7 bg-gold shrink-0" aria-hidden="true" />
                  National Anthem
                </h3>
                <p className="mb-5 pl-9 text-xs italic text-ink/50">
                  &ldquo;Nigeria We Hail Thee&rdquo; — adopted 1960; re-adopted 2024
                </p>

                {/* Audio player */}
                <div className="mb-6 rounded-lg border border-line bg-mist px-4 py-3.5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink/50">
                    Listen to the Anthem
                  </p>
                  <audio
                    controls
                    className="h-9 w-full"
                    src="/audio/national-anthem.mp3"
                    aria-label="Nigerian National Anthem audio recording"
                    preload="none"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>

                {/* Lyrics */}
                <ol className="space-y-6 font-serif" aria-label="Anthem lyrics">
                  {ANTHEM_STANZAS.map((stanza, si) => (
                    <li key={si}>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gold/80">
                        Stanza {si + 1}
                      </p>
                      <p className="leading-8 text-ink/80">
                        {stanza.map((line, li) => (
                          <span key={li}>
                            {line}
                            {li < stanza.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Footer */}
              <div className="border-t border-line bg-mist px-6 py-4 text-center text-[11px] text-ink/45">
                Source: Federal Government of Nigeria · Ministry of Information
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
