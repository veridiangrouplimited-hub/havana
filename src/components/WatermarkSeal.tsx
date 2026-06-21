/**
 * Nigeria coat of arms rendered as a ghost watermark.
 * An SVG filter desaturates then inverts the image so the white background
 * disappears on dark surfaces and the COA detail reads as a subtle white ghost.
 * Opacity is controlled by the parent via Tailwind's opacity-* utilities.
 */
export default function WatermarkSeal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="ng-coa-ghost" colorInterpolationFilters="sRGB">
          {/* Desaturate to greyscale */}
          <feColorMatrix type="saturate" values="0" result="gray" />
          {/* Invert RGB — white background → black (invisible on dark);
              dark COA strokes → white ghost detail */}
          <feColorMatrix
            in="gray"
            type="matrix"
            values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0"
          />
        </filter>
      </defs>
      <image
        href="/images/mfa-logo.png"
        x="5"
        y="5"
        width="190"
        height="190"
        preserveAspectRatio="xMidYMid meet"
        filter="url(#ng-coa-ghost)"
      />
    </svg>
  );
}
