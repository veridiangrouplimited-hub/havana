/**
 * Stylised silhouette of the Federal Republic of Nigeria with Abuja,
 * the Federal Capital Territory, marked in gold. Decorative — the
 * geography is simplified, not survey-accurate.
 */
export const NIGERIA_PATH =
  "M11 4 C30 1 55 3 70 2 C80 1.5 88 2 91 3 L99 10 C98 16 99 20 97 26 C95 34 96 42 93 50 C90 58 86 64 84 70 C81 77 79 80 76 83 L60 88 L47 92 C42 95 38 98 34 99 C30 97 26 92 23 89 C17 84 10 80 6 77 L1 75 C0 70 1 65 2 61 C3 54 5 47 7 40 C8 34 8 28 9 22 C9 16 10 9 11 4 Z";

export default function NigeriaMap({
  className = "h-full w-full",
  showAbuja = true,
}: {
  className?: string;
  showAbuja?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 104"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={NIGERIA_PATH} fill="currentColor" />
      {showAbuja && (
        <>
          <circle cx="40" cy="50" r="2.4" fill="#e3b339" />
          <circle cx="40" cy="50" r="5" fill="none" stroke="#e3b339" strokeWidth="0.9" opacity="0.65" />
        </>
      )}
    </svg>
  );
}
