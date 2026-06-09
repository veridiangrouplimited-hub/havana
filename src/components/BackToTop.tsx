"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

/** Floating back-to-top control; appears after the user scrolls past the fold. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-brand text-white shadow-lg transition-colors hover:bg-brand-deep"
    >
      <Icon name="chevron" className="h-5 w-5 rotate-180" />
    </button>
  );
}
