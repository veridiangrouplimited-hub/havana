/**
 * Decorative circular diplomatic seal used as a background watermark.
 * Fully SVG — no raster image. Uses currentColor so the parent controls
 * the tint via Tailwind's text-* utilities. Opacity should be set on the
 * element itself (e.g. opacity-[0.12]) to keep it as a ghost element.
 */
export default function WatermarkSeal({ className }: { className?: string }) {
  // 12 sunburst rays starting from 12 o'clock
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    const c = Math.cos(a), s = Math.sin(a);
    return {
      x1: 100 + 22 * c, y1: 100 + 22 * s,
      x2: 100 + 58 * c, y2: 100 + 58 * s,
    };
  });

  // 24 tick marks on the inner band (major every 6)
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = ((i * 15 - 90) * Math.PI) / 180;
    const c = Math.cos(a), s = Math.sin(a);
    const major = i % 6 === 0;
    return {
      x1: 100 + (major ? 83 : 85) * c,
      y1: 100 + (major ? 83 : 85) * s,
      x2: 100 + 91 * c,
      y2: 100 + 91 * s,
      major,
    };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <defs>
        {/* Top arc: left → top → right (counter-clockwise, sweep=0) */}
        <path id="wm-top" d="M 16,100 A 84,84 0 0,0 184,100" />
        {/* Bottom arc: left → bottom → right (clockwise, sweep=1) */}
        <path id="wm-bot" d="M 24,100 A 76,76 0 0,1 176,100" />
      </defs>

      {/* ── Outer border ── */}
      <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="93" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3.5" opacity="0.6" />

      {/* ── Tick marks in the text band ── */}
      <g stroke="currentColor" opacity="0.5">
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.major ? 1.2 : 0.5} />
        ))}
      </g>

      {/* ── Arc text ── */}
      <text fontSize="9" fontWeight="700" letterSpacing="3.4" opacity="0.93">
        <textPath href="#wm-top" startOffset="50%" textAnchor="middle">
          FEDERAL REPUBLIC OF NIGERIA
        </textPath>
      </text>
      <text fontSize="8" fontWeight="600" letterSpacing="2.6" opacity="0.8">
        <textPath href="#wm-bot" startOffset="50%" textAnchor="middle">
          EMBASSY IN HAVANA · CUBA
        </textPath>
      </text>

      {/* ── Inner ring ── */}
      <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.85" />

      {/* Cardinal-point diamonds on inner ring */}
      <g opacity="0.65">
        <path d="M100,29 L103,32 L100,35 L97,32 Z" />   {/* N */}
        <path d="M165,97 L168,100 L165,103 L162,100 Z" />{/* E */}
        <path d="M100,165 L103,168 L100,171 L97,168 Z" />{/* S */}
        <path d="M32,97 L35,100 L32,103 L29,100 Z" />   {/* W */}
      </g>

      {/* ── Sunburst ── */}
      <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <g stroke="currentColor" strokeWidth="0.55" opacity="0.4">
        {rays.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </g>
      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />

      {/* ── Central monogram ── */}
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="1"
        opacity="0.88"
      >
        NG
      </text>

      {/* Thin rule below monogram (ornamental) */}
      <line x1="80" y1="115" x2="120" y2="115" stroke="currentColor" strokeWidth="0.5" opacity="0.45" />
    </svg>
  );
}
