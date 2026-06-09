import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";

/**
 * Signature section heading: small-caps gold-dashed eyebrow (with an
 * optional icon annotation), serif title, two-tone gold/green rule —
 * used consistently across the site.
 */
export default function SectionHeading({
  eyebrow,
  title,
  id,
  lead,
  link,
  icon,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  id?: string;
  lead?: string;
  link?: { label: string; href: string };
  icon?: IconName;
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
          {icon && (
            <span
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ${
                dark ? "bg-white/10 text-gold ring-gold/50" : "bg-brand/10 text-brand ring-brand/30"
              }`}
              aria-hidden="true"
            >
              <Icon name={icon} className="h-3.5 w-3.5" />
            </span>
          )}
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
