export default function EmbassySeal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path id="seal-top" d="M 14,70 A 56,56 0 1,1 126,70" fill="none" />
        <path id="seal-bottom" d="M 22,82 A 56,56 0 0,0 118,82" fill="none" />
      </defs>

      <circle cx="70" cy="70" r="68" fill="#0b5e3c" stroke="#c9a84c" strokeWidth="2" />
      <circle cx="70" cy="70" r="58" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeDasharray="3 4" />

      <image
        href="/images/mfa-logo.png"
        x="27"
        y="25"
        width="86"
        height="86"
        preserveAspectRatio="xMidYMid meet"
      />

      <text fontFamily="serif" fontSize="9" fontWeight="bold" fill="#c9a84c" letterSpacing="2.5">
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">EMBASSY OF NIGERIA</textPath>
      </text>
      <text fontFamily="serif" fontSize="8.5" fontWeight="bold" fill="#c9a84c" letterSpacing="2">
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">TOKYO · JAPAN</textPath>
      </text>
    </svg>
  );
}
