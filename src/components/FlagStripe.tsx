/**
 * The national tricolour — green · white · green — used as a slim
 * identity stripe on dark bands (page headers, footer, hero).
 */
export default function FlagStripe({ className = "h-1.5" }: { className?: string }) {
  return (
    <div className={`flex ${className}`} aria-hidden="true">
      <div className="flex-1 bg-brand" />
      <div className="flex-1 bg-white" />
      <div className="flex-1 bg-brand" />
    </div>
  );
}

/** Small vertical flag mark for inline use (utility bar, identity band). */
export function FlagMark({ className = "h-4 w-7" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10 ${className}`}
      aria-hidden="true"
    >
      <span className="flex-1 bg-brand" />
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-brand" />
    </span>
  );
}
