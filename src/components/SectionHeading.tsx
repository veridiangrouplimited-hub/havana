import Link from "next/link";
import Icon from "@/components/Icon";

/**
 * Signature section heading: small-caps gold-dashed eyebrow, serif title,
 * two-tone gold/green rule — used consistently across the site.
 */
export default function SectionHeading({
  eyebrow,
  title,
  id,
  lead,
  link,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  id?: string;
  lead?: string;
  link?: { label: string; href: string };
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-3xl">
        <p
          className={`mb-2.5 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] ${
            dark ? "text-gold" : "text-brand-deep"
          }`}
        >
          <span className="inline-block h-px w-9 bg-gold" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`font-serif text-2xl font-bold leading-tight md:text-[2.1rem] ${
            dark ? "text-white" : "text-brand-deep"
          }`}
        >
          {title}
        </h2>
        <div className="mt-3.5 flex gap-1" aria-hidden="true">
          <span className="h-1 w-12 bg-gold" />
          <span className={`h-1 w-4 ${dark ? "bg-white/40" : "bg-brand"}`} />
        </div>
        {lead && (
          <p
            className={`mt-4 text-sm leading-relaxed md:text-base ${
              dark ? "text-white/90" : "text-ink/85"
            }`}
          >
            {lead}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className={`inline-flex items-center gap-1.5 text-sm font-bold hover:underline ${
            dark ? "text-gold" : "text-brand"
          }`}
        >
          {link.label}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
