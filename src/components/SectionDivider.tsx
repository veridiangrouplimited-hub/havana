/**
 * Decorative divider — a gold diamond flanked by tapering rules,
 * echoing formal diplomatic stationery. Purely ornamental.
 */
export default function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-4" aria-hidden="true">
      <svg
        viewBox="0 0 400 24"
        className="mx-auto h-6 w-72 text-gold"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="12" x2="160" y2="12" stroke="url(#fade-l)" strokeWidth="1.5" />
        <line x1="240" y1="12" x2="400" y2="12" stroke="url(#fade-r)" strokeWidth="1.5" />
        <rect x="194" y="6" width="12" height="12" transform="rotate(45 200 12)" fill="currentColor" />
        <rect
          x="172"
          y="9"
          width="6"
          height="6"
          transform="rotate(45 175 12)"
          fill="#0b5e3c"
          opacity="0.55"
        />
        <rect
          x="222"
          y="9"
          width="6"
          height="6"
          transform="rotate(45 225 12)"
          fill="#0b5e3c"
          opacity="0.55"
        />
        <defs>
          <linearGradient id="fade-l" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" />
          </linearGradient>
          <linearGradient id="fade-r" x1="240" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
