"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/Icon";

const STANZAS = [
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
    "In peace or battle honour’d,",
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

export default function AnthemModal() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    setOpen(false);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play().catch(() => {});
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => closeRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* Trigger card — renders as <li> in the grid */}
      <li
        className="flex cursor-pointer items-center gap-3 rounded border border-line bg-mist p-3.5 transition-colors hover:border-brand/40 hover:bg-brand/5"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); }
        }}
        aria-haspopup="dialog"
        aria-label="Open National Anthem"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand" aria-hidden="true">
          <Icon name="bell" className="h-4.5 w-4.5" />
        </span>
        <span className="text-xs leading-snug">
          <strong className="block text-brand-deep">National Anthem</strong>
          <span className="text-ink/60">&ldquo;Nigeria, We Hail Thee&rdquo;</span>
        </span>
      </li>

      {/* Modal — portalled to document.body */}
      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="anthem-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />

          {/* Panel */}
          <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-line bg-brand px-6 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  Federal Republic of Nigeria
                </p>
                <h2 id="anthem-modal-title" className="font-serif text-lg font-bold text-white">
                  National Anthem
                </h2>
              </div>
              <button
                ref={closeRef}
                onClick={close}
                className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto">

              {/* Audio player */}
              <div className="border-b border-line bg-mist px-6 py-5">
                <p className="mb-3 text-[11px] italic text-ink/50">
                  &ldquo;Nigeria We Hail Thee&rdquo; &mdash; adopted 1960; re-adopted 2024
                </p>
                <audio
                  ref={audioRef}
                  src="/audio/national-anthem.mp3"
                  preload="none"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                />
                <button
                  onClick={togglePlay}
                  className="flex w-full items-center gap-3 rounded-lg border border-brand/20 bg-white px-4 py-3 text-left transition-colors hover:border-brand hover:bg-brand/5"
                  aria-label={playing ? "Pause national anthem" : "Play national anthem"}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                      playing ? "bg-brand text-white" : "bg-brand/10 text-brand"
                    }`}
                  >
                    <Icon name={playing ? "pause" : "play"} className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block text-sm text-brand-deep">
                      {playing ? "Now playing…" : "Play the National Anthem"}
                    </strong>
                    <span className="text-xs text-ink/50">
                      Click to {playing ? "pause" : "listen"}
                    </span>
                  </span>
                </button>
              </div>

              {/* Lyrics */}
              <div className="px-6 py-6">
                <ol className="space-y-6 font-serif" aria-label="Anthem lyrics">
                  {STANZAS.map((stanza, si) => (
                    <li key={si}>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gold/80">
                        Stanza {si + 1}
                      </p>
                      <p className="text-sm leading-8 text-ink/80">
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
              <div className="border-t border-line bg-mist px-6 py-3 text-center text-[11px] text-ink/45">
                Source: Federal Government of Nigeria &middot; Ministry of Information
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
