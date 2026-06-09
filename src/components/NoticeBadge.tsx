import type { NoticePriority } from "@/data/notices";

/**
 * Priority label for public notices. Colour is reinforced by the text
 * itself, so the priority is never communicated by colour alone.
 */
const styles: Record<NoticePriority, string> = {
  Urgent: "bg-red-700 text-white",
  Important: "bg-gold text-brand-dark",
  Advisory: "bg-sky-800 text-white",
  "Service Update": "bg-brand-deep text-white",
  "Holiday Notice": "bg-gray-600 text-white",
};

export default function NoticeBadge({ priority }: { priority: NoticePriority }) {
  return (
    <span
      className={`inline-block rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}
