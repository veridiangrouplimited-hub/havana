import { NIGERIA_PATH } from "@/components/NigeriaMap";
import { NigeriaFlagShapes, CubaFlagShapes } from "@/components/Flags";

/**
 * Decorative Atlantic route map connecting Havana and Abuja.
 * Cuba's outline is a web-optimised simplified path; Nigeria's outline
 * uses the accurate path from NigeriaMap via a nested SVG viewport.
 * Renders on both light panels and dark green bands.
 */

/** Simplified but geographically accurate Cuba outline in a 180×70 unit space. */
const CUBA_MAIN =
  "M5,31 C9,22 22,13 42,10 C62,7 82,7 100,9 C118,7 138,6 157,10 C167,13 173,19 175,25 L173,31 C163,38 148,42 128,46 C105,50 82,52 60,50 C38,48 20,44 8,38 Z";

/** Isla de la Juventud (Isle of Pines) — Cuba's largest offshore island. */
const CUBA_ISLE =
  "M52,61 C56,56 65,55 69,59 C72,63 68,67 63,67 C57,67 50,64 52,61 Z";

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

      {/* ── Cuba ── */}
      <g transform="translate(42 110)" aria-hidden="true">
        {/* Main island */}
        <path d={CUBA_MAIN} fill={cubaFill} stroke={landStroke} strokeWidth="1.5" />
        {/* Isle of Pines */}
        <path d={CUBA_ISLE} fill={cubaFill} stroke={landStroke} strokeWidth="1.2" />
        {/* Country label */}
        <text x="88" y="88" textAnchor="middle" fill={label} fontSize="17" fontWeight="700" letterSpacing="5">
          CUBA
        </text>
        {/* Inline Cuba flag */}
        <svg x="68" y="72" width="40" height="20" viewBox="0 0 60 30">
          <CubaFlagShapes />
          <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
        </svg>
      </g>

      {/* Havana marker — on Cuba's north coast, western section */}
      <circle cx="92" cy="140" r="5.5" fill={gold} />
      <circle cx="92" cy="140" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="92" y="120" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        HAVANA
      </text>

      {/* ── Nigeria — nested SVG so the accurate NIGERIA_PATH renders at correct scale ── */}
      <svg
        x="630"
        y="108"
        width="228"
        height="172"
        viewBox="0 0 954 734"
        aria-hidden="true"
        overflow="visible"
      >
        <path d={NIGERIA_PATH} fill={nigeriaFill} stroke={landStroke} strokeWidth="3" />
      </svg>
      {/* Nigeria label — below the silhouette */}
      <text x="744" y="298" textAnchor="middle" fill={label} fontSize="17" fontWeight="700" letterSpacing="5">
        NIGERIA
      </text>
      {/* Inline Nigeria flag */}
      <svg x="724" y="302" width="40" height="20" viewBox="0 0 60 30">
        <NigeriaFlagShapes />
        <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
      </svg>

      {/* Abuja marker — approx centre-left of Nigeria silhouette */}
      <circle cx="748" cy="210" r="5.5" fill={gold} />
      <circle cx="748" cy="210" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="748" y="192" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        ABUJA
      </text>

      {/* Flight arc */}
      <path
        d="M92 140 Q400 28 748 210"
        fill="none"
        stroke={gold}
        strokeWidth="2.5"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
      {/* Plane at arc midpoint */}
      <path d="M390 96 l26 8 -26 8 6 -8 z" fill={gold} transform="rotate(9 400 104)" />
      <text x="404" y="76" textAnchor="middle" fill={faint} fontSize="12" fontWeight="600" letterSpacing="2">
        ≈ 9,600 KM
      </text>

      <text x="430" y="345" textAnchor="middle" fill={faint} fontSize="13" fontStyle="italic" letterSpacing="8">
        ATLANTIC OCEAN
      </text>
    </svg>
  );
}
