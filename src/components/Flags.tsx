/**
 * National flags of the Federal Republic of Nigeria and the Republic
 * of Cuba, drawn in a shared 60×30 coordinate space so they can be
 * used standalone (components below) or embedded inside other SVGs
 * via the exported shape fragments.
 */

/** Nigeria — green, white, green vertical bands. */
export function NigeriaFlagShapes() {
  return (
    <>
      <rect width="20" height="30" fill="#0b5e3c" />
      <rect x="20" width="20" height="30" fill="#ffffff" />
      <rect x="40" width="20" height="30" fill="#0b5e3c" />
    </>
  );
}

/** Cuba — five stripes and the lone white star on a red triangle. */
export function CubaFlagShapes() {
  return (
    <>
      <rect width="60" height="30" fill="#ffffff" />
      <rect width="60" height="6" fill="#002a8f" />
      <rect y="12" width="60" height="6" fill="#002a8f" />
      <rect y="24" width="60" height="6" fill="#002a8f" />
      <path d="M0 0 L26 15 L0 30 Z" fill="#cf142b" />
      <path
        d="M9 10 L10.18 13.38 L13.76 13.45 L10.9 15.62 L11.94 19.05 L9 17 L6.06 19.05 L7.1 15.62 L4.24 13.45 L7.82 13.38 Z"
        fill="#ffffff"
      />
    </>
  );
}

function FlagSvg({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className: string;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
      <rect width="60" height="30" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
    </svg>
  );
}

export function NigeriaFlag({ className = "h-5 w-10" }: { className?: string }) {
  return (
    <FlagSvg className={className} label="Flag of the Federal Republic of Nigeria">
      <NigeriaFlagShapes />
    </FlagSvg>
  );
}

export function CubaFlag({ className = "h-5 w-10" }: { className?: string }) {
  return (
    <FlagSvg className={className} label="Flag of the Republic of Cuba">
      <CubaFlagShapes />
    </FlagSvg>
  );
}
