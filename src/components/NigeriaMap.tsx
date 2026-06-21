/**
 * Accurate state-level map of the Federal Republic of Nigeria.
 * Renders nigeriaLow.svg (amCharts Mercator projection, 37 paths).
 * Abuja (Federal Capital Territory) is marked with a gold dot.
 */
export default function NigeriaMap({
  className = "h-full w-full",
  showAbuja = true,
}: {
  className?: string;
  showAbuja?: boolean;
}) {
  return (
    <svg
      viewBox="-2 87.84 964 784.32"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href="/maps/nigeriaLow.svg" x="-2" y="87.84" width="964" height="784.32" />
      {showAbuja && (
        <>
          {/* Abuja — Federal Capital Territory, ~9°E 7.4°N in amCharts Mercator */}
          <circle cx="480" cy="458" r="9" fill="#e3b339" />
          <circle cx="480" cy="458" r="18" fill="none" stroke="#e3b339" strokeWidth="3" opacity="0.6" />
        </>
      )}
    </svg>
  );
}
