export default function EmbassySeal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer decorative ring */}
      <circle cx="70" cy="70" r="68" fill="#0b5e3c" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Inner ring */}
      <circle cx="70" cy="70" r="60" fill="none" stroke="#c9a84c" strokeWidth="0.6" strokeDasharray="2 3" />
      {/* Second inner ring */}
      <circle cx="70" cy="70" r="54" fill="none" stroke="#c9a84c" strokeWidth="0.4" opacity="0.5" />

      {/* Text paths */}
      <defs>
        {/* Top arc — text runs clockwise */}
        <path
          id="top-arc"
          d="M 14,70 A 56,56 0 1,1 126,70"
          fill="none"
        />
        {/* Bottom arc — text runs clockwise (appears right-side-up at bottom) */}
        <path
          id="bottom-arc"
          d="M 22,82 A 56,56 0 0,0 118,82"
          fill="none"
        />
      </defs>

      {/* Embassy name — top */}
      <text
        fontFamily="serif"
        fontSize="9"
        fontWeight="bold"
        fill="#c9a84c"
        letterSpacing="2.2"
      >
        <textPath href="#top-arc" startOffset="50%" textAnchor="middle">
          EMBASSY OF NIGERIA
        </textPath>
      </text>

      {/* Location — bottom */}
      <text
        fontFamily="serif"
        fontSize="8"
        fontWeight="bold"
        fill="#c9a84c"
        letterSpacing="1.8"
      >
        <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">
          HAVANA · CUBA
        </textPath>
      </text>

      {/* Coat of arms / MFA logo */}
      <image
        href="/images/mfa-logo.png"
        x="30"
        y="28"
        width="80"
        height="80"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Side ornament dots */}
      <circle cx="14" cy="70" r="2" fill="#c9a84c" />
      <circle cx="126" cy="70" r="2" fill="#c9a84c" />
    </svg>
  );
}
