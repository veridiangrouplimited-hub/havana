import { NigeriaFlagShapes, CubaFlagShapes } from "@/components/Flags";

/**
 * Decorative Atlantic route map connecting Havana and Abuja.
 * Cuba renders from public/maps/cuba.svg (4-path outline, #dadada fill).
 * Nigeria renders from public/maps/nigeriaLow.svg (37-state Mercator, #dadada fill).
 * Both files are referenced via SVG <image> so the full accurate outlines are shown.
 */
export default function RouteMap({
  tone = "light",
  className = "w-full",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const landStroke = dark ? "rgba(255,255,255,0.45)" : "rgba(8,74,47,0.35)";
  const grid = dark ? "rgba(255,255,255,0.07)" : "rgba(11,94,60,0.08)";
  const label = dark ? "rgba(255,255,255,0.9)" : "#1f4d38";
  const faint = dark ? "rgba(255,255,255,0.45)" : "rgba(51,51,51,0.5)";
  const gold = "#e3b339";
  const mapOpacity = dark ? 0.65 : 0.85;

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

      {/* ── Cuba ── from public/maps/cuba.svg (viewBox 0 0 1795.312 760.622) */}
      {/* Aspect ratio 2.36:1 → slot 240×102 matches exactly */}
      <image
        href="/maps/cuba.svg"
        x="15" y="98"
        width="240" height="102"
        opacity={mapOpacity}
        aria-hidden="true"
      />
      {/* Cuba label */}
      <text x="135" y="215" textAnchor="middle" fill={label} fontSize="17" fontWeight="700" letterSpacing="5">
        CUBA
      </text>
      {/* Inline Cuba flag */}
      <svg x="115" y="219" width="40" height="20" viewBox="0 0 60 30">
        <CubaFlagShapes />
        <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
      </svg>

      {/* Havana marker — western north coast of Cuba
          Cuba is ~1200 km long; Havana sits ~140 km from western tip (≈8% along).
          In SVG space (0→1795): x ≈ 140, north coast y ≈ 145.
          Mapped to RouteMap slot (x=15, w=240, y=98, h=102): */}
      <circle cx="34" cy="116" r="5.5" fill={gold} />
      <circle cx="34" cy="116" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="34" y="100" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        HAVANA
      </text>

      {/* ── Nigeria ── from public/maps/nigeriaLow.svg (viewBox -2 87.84 964 784.32)
           Aspect ratio 964:784 ≈ 1.23:1 → slot 225×183 matches exactly */}
      <svg
        x="630" y="100"
        width="225" height="183"
        viewBox="-2 87.84 964 784.32"
        aria-hidden="true"
        overflow="visible"
      >
        <image
          href="/maps/nigeriaLow.svg"
          x="-2" y="87.84"
          width="964" height="784.32"
          opacity={mapOpacity}
        />
      </svg>
      {/* Nigeria label */}
      <text x="742" y="300" textAnchor="middle" fill={label} fontSize="17" fontWeight="700" letterSpacing="5">
        NIGERIA
      </text>
      {/* Inline Nigeria flag */}
      <svg x="722" y="304" width="40" height="20" viewBox="0 0 60 30">
        <NigeriaFlagShapes />
        <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
      </svg>

      {/* Abuja marker — FCT, approx centre of Nigeria in amCharts Mercator coords (480, 458).
          Relative pos in viewBox: x=0.50, y=0.472.
          Mapped to RouteMap slot (x=630, w=225, y=100, h=183): */}
      <circle cx="742" cy="186" r="5.5" fill={gold} />
      <circle cx="742" cy="186" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="742" y="170" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        ABUJA
      </text>

      {/* Flight arc */}
      <path
        d="M34 116 Q390 18 742 186"
        fill="none"
        stroke={gold}
        strokeWidth="2.5"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
      {/* Plane at arc midpoint (t=0.5 on bezier ≈ 392, 85) */}
      <path d="M382 81 l26 8 -26 8 6 -8 z" fill={gold} transform="rotate(5 392 85)" />
      <text x="404" y="64" textAnchor="middle" fill={faint} fontSize="12" fontWeight="600" letterSpacing="2">
        ≈ 9,600 KM
      </text>

      <text x="430" y="350" textAnchor="middle" fill={faint} fontSize="13" fontStyle="italic" letterSpacing="8">
        ATLANTIC OCEAN
      </text>
    </svg>
  );
}
