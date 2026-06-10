import { NIGERIA_PATH } from "@/components/NigeriaMap";
import { NigeriaFlagShapes, CubaFlagShapes } from "@/components/Flags";

/**
 * Decorative Atlantic route map connecting Havana and Abuja —
 * simplified silhouettes of Cuba and Nigeria joined by a dashed
 * gold flight arc. Renders on light panels or dark green bands.
 */
const CUBA_PATH =
  "M2 44 C14 28 40 12 78 8 C108 5 142 12 166 26 L178 36 C170 42 152 44 136 41 C112 37 84 42 62 50 C40 58 16 56 2 44 Z";

export default function RouteMap({
  tone = "light",
  className = "w-full",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const cubaFill = dark ? "rgba(255,255,255,0.14)" : "#1f7a4c";
  const nigeriaFill = dark ? "rgba(255,255,255,0.18)" : "#0b5e3c";
  const landStroke = dark ? "rgba(255,255,255,0.45)" : "rgba(8,74,47,0.35)";
  const grid = dark ? "rgba(255,255,255,0.07)" : "rgba(11,94,60,0.08)";
  const label = dark ? "rgba(255,255,255,0.9)" : "#1f4d38";
  const faint = dark ? "rgba(255,255,255,0.45)" : "rgba(51,51,51,0.5)";
  const gold = "#e3b339";

  return (
    <svg
      viewBox="0 0 900 400"
      className={className}
      role="img"
      aria-label="Stylised map showing the connection between Havana, Cuba and Abuja, Nigeria across the Atlantic Ocean"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graticule */}
      <g stroke={grid} strokeWidth="1.2" fill="none" aria-hidden="true">
        <path d="M0 90 Q450 40 900 90" />
        <path d="M0 190 Q450 140 900 190" />
        <path d="M0 290 Q450 240 900 290" />
        <path d="M180 0 Q200 200 160 400" />
        <path d="M450 0 Q470 200 430 400" />
        <path d="M720 0 Q740 200 700 400" />
      </g>

      {/* Cuba */}
      <g transform="translate(50 110)">
        <path d={CUBA_PATH} fill={cubaFill} stroke={landStroke} strokeWidth="1.5" />
        <circle cx="118" cy="60" r="4.5" fill={cubaFill} stroke={landStroke} strokeWidth="1" />
        <text
          x="100"
          y="92"
          textAnchor="middle"
          fill={label}
          fontSize="17"
          fontWeight="700"
          letterSpacing="5"
        >
          CUBA
        </text>
        <svg x="34" y="76" width="40" height="20" viewBox="0 0 60 30">
          <CubaFlagShapes />
          <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
        </svg>
      </g>

      {/* Havana marker */}
      <circle cx="92" cy="138" r="5.5" fill={gold} />
      <circle cx="92" cy="138" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="92" y="118" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        HAVANA
      </text>

      {/* Nigeria */}
      <g transform="translate(640 110) scale(2.1)">
        <path d={NIGERIA_PATH} fill={nigeriaFill} stroke={landStroke} strokeWidth="0.8" />
      </g>
      <text
        x="762"
        y="360"
        textAnchor="middle"
        fill={label}
        fontSize="17"
        fontWeight="700"
        letterSpacing="5"
      >
        NIGERIA
      </text>
      <svg x="688" y="344" width="40" height="20" viewBox="0 0 60 30">
        <NigeriaFlagShapes />
        <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
      </svg>

      {/* Abuja marker (40,50 in map space, scaled) */}
      <circle cx="724" cy="215" r="5.5" fill={gold} />
      <circle cx="724" cy="215" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="724" y="195" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        ABUJA
      </text>

      {/* Flight arc */}
      <path
        d="M92 138 Q400 28 724 215"
        fill="none"
        stroke={gold}
        strokeWidth="2.5"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
      {/* Plane at the arc midpoint, angled along the path */}
      <path
        d="M390 96 l26 8 -26 8 6 -8 z"
        fill={gold}
        transform="rotate(9 400 104)"
      />
      <text x="404" y="76" textAnchor="middle" fill={faint} fontSize="12" fontWeight="600" letterSpacing="2">
        ≈ 9,600 KM
      </text>

      <text
        x="430"
        y="345"
        textAnchor="middle"
        fill={faint}
        fontSize="13"
        fontStyle="italic"
        letterSpacing="8"
      >
        ATLANTIC OCEAN
      </text>
    </svg>
  );
}
