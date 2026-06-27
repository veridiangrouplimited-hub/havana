"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

const testimonials = [
  {
    quote:
      "The Embassy helped me renew my passport within days of applying. The staff were professional, warm and genuinely supportive — I felt the Mission was truly working for me.",
    name: "Adaora Nwosu",
    role: "Medical Doctor, Tokyo",
    initials: "AN",
  },
  {
    quote:
      "When I ran into a visa complication, the consular team stepped in quickly and resolved it without fuss. Knowing the Embassy is there gives us Nigerians in Japan real peace of mind.",
    name: "Emeka Ogunyemi",
    role: "Business Consultant, Tokyo",
    initials: "EO",
  },
  {
    quote:
      "The town hall meetings organised by the Mission have been invaluable — they keep us connected to each other and to home. I always leave with a clearer picture of what's happening.",
    name: "Chidinma Eze",
    role: "Postgraduate Student, University of Tokyo",
    initials: "CE",
  },
  {
    quote:
      "I registered with the Embassy soon after arriving and it was the best decision I made. They kept me updated with travel advisories and I felt far less alone in a new country.",
    name: "Babajide Akinwale",
    role: "Software Engineer, Tokyo",
    initials: "BA",
  },
];

const SLIDE_DURATION = 6000;
const FADE_MS = 300;

export default function TestimonialRotator() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const pausedRef = useRef(false);

  const goTo = (next: number) => {
    if (next === active || fading) return;
    setFading(true);
    setTimeout(() => {
      setActive(next);
      setFading(false);
    }, FADE_MS);
  };

  // Auto-advance: new timer fires after each slide change
  useEffect(() => {
    const id = setTimeout(() => {
      if (pausedRef.current) return;
      const next = (active + 1) % testimonials.length;
      setFading(true);
      setTimeout(() => {
        setActive(next);
        setFading(false);
      }, FADE_MS);
    }, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [active]);

  const t = testimonials[active];

  return (
    <div
      className="rounded border border-line bg-white p-7 shadow-sm md:p-9"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Slide content */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
        aria-live="polite"
        aria-atomic="true"
      >
        <Icon name="quote" className="mb-5 h-8 w-8 text-gold" />
        <blockquote className="font-serif text-lg leading-relaxed text-brand-deep md:text-xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <footer className="mt-6 flex items-center gap-3.5">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-serif text-sm font-bold text-white"
            aria-hidden="true"
          >
            {t.initials}
          </span>
          <div>
            <cite className="block text-sm font-bold not-italic text-brand-deep">{t.name}</cite>
            <span className="text-xs text-ink/65">{t.role}</span>
          </div>
        </footer>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Community testimonials">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i ? "h-2.5 w-7 bg-brand" : "h-2.5 w-2.5 bg-line hover:bg-brand/40"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/55 transition-colors hover:border-brand hover:text-brand"
          >
            <Icon name="chevron" className="h-4 w-4 rotate-90" />
          </button>
          <button
            type="button"
            onClick={() => goTo((active + 1) % testimonials.length)}
            aria-label="Next testimonial"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/55 transition-colors hover:border-brand hover:text-brand"
          >
            <Icon name="chevron" className="h-4 w-4 -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
