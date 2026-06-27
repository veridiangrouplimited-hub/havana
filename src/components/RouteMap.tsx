import { NigeriaFlagShapes, JapanFlagShapes } from "@/components/Flags";

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
      viewBox="0 0 900 450"
      className={className}
      role="img"
      aria-label="Stylised map showing the connection between Abuja, Nigeria and Tokyo, Japan"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graticule */}
      <g stroke={grid} strokeWidth="1.2" fill="none" aria-hidden="true">
        <path d="M0 90 Q450 40 900 90" />
        <path d="M0 210 Q450 160 900 210" />
        <path d="M0 330 Q450 280 900 330" />
        <path d="M180 0 Q200 225 160 450" />
        <path d="M450 0 Q470 225 430 450" />
        <path d="M720 0 Q740 225 700 450" />
      </g>

      {/* ── Nigeria — LEFT — nigeriaLow.svg (amCharts Mercator) ────────── */}
      {/* Slot: x=5 y=80 w=220 h=180  viewBox matches nigeriaLow full extent */}
      <svg
        x="5" y="80"
        width="220" height="180"
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
      <text x="115" y="278" textAnchor="middle" fill={label} fontSize="17" fontWeight="700" letterSpacing="5">
        NIGERIA
      </text>
      {/* Inline Nigeria flag */}
      <svg x="95" y="283" width="40" height="20" viewBox="0 0 60 30">
        <NigeriaFlagShapes />
        <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
      </svg>

      {/* Abuja marker — FCT, canvas (115, 165) */}
      <circle cx="115" cy="165" r="5.5" fill={gold} />
      <circle cx="115" cy="165" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="115" y="149" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        ABUJA
      </text>

      {/* ── Japan — RIGHT — japanLow.svg (amCharts Mercator) ───────────── */}
      {/* Crop to main islands (Hokkaido–Kyushu): viewBox x=460–890 y=-2–758 */}
      <svg
        x="670" y="20"
        width="200" height="354"
        viewBox="460 -2 430 760"
        aria-hidden="true"
        overflow="visible"
      >
        <image
          href="/maps/japanLow.svg"
          x="72.52" y="-2"
          width="814.97" height="964"
          opacity={mapOpacity}
        />
      </svg>

      {/* Japan label */}
      <text x="770" y="392" textAnchor="middle" fill={label} fontSize="17" fontWeight="700" letterSpacing="5">
        JAPAN
      </text>
      {/* Inline Japan flag */}
      <svg x="750" y="397" width="40" height="20" viewBox="0 0 60 30">
        <JapanFlagShapes />
        <rect width="60" height="30" fill="none" stroke={landStroke} strokeWidth="1.5" />
      </svg>

      {/* Tokyo marker — Honshu, canvas (761, 257) */}
      <circle cx="761" cy="257" r="5.5" fill={gold} />
      <circle cx="761" cy="257" r="11" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.55" />
      <text x="761" y="241" textAnchor="middle" fill={label} fontSize="13" fontWeight="700" letterSpacing="2">
        TOKYO
      </text>

      {/* Flight arc — Abuja (115,165) → Tokyo (761,257) over Indian Ocean */}
      <path
        d="M115 165 Q430 20 761 257"
        fill="none"
        stroke={gold}
        strokeWidth="2.5"
        strokeDasharray="3 9"
        strokeLinecap="round"
      />
      {/* Plane at arc midpoint t=0.5 → approx (430, 116) */}
      <path d="M418 112 l26 8 -26 8 6 -8 z" fill={gold} transform="rotate(5 430 116)" />
      <text x="455" y="98" textAnchor="middle" fill={faint} fontSize="12" fontWeight="600" letterSpacing="2">
        &#x2248; 14,000 KM
      </text>

      <text x="430" y="420" textAnchor="middle" fill={faint} fontSize="13" fontStyle="italic" letterSpacing="8">
        INDIAN OCEAN
      </text>
    </svg>
  );
}
