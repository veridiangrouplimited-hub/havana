import Link from "next/link";
import FlagStripe from "@/components/FlagStripe";
import WatermarkSeal from "@/components/WatermarkSeal";

export interface Crumb {
  label: string;
  href?: string;
}

export default function PageHeader({
  title,
  lead,
  crumbs,
}: {
  title: string;
  lead?: string;
  crumbs: Crumb[];
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-deep text-white">
      <div className="pattern-diagonal absolute inset-0" aria-hidden="true" />
      <div className="glow-gold absolute inset-0" aria-hidden="true" />
      <WatermarkSeal className="pointer-events-none absolute -bottom-16 -right-10 hidden h-72 w-72 text-white opacity-[0.15] md:block" />
      <div className="relative mx-auto max-w-7xl px-4 py-11 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/80 md:text-sm">
            <li>
              <Link href="/" className="hover:text-gold hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="text-gold/70">
                  /
                </span>
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-gold hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mb-2.5 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
          <span className="inline-block h-px w-9 bg-gold" aria-hidden="true" />
          Federal Republic of Nigeria
        </p>
        <h1 className="max-w-4xl font-serif text-3xl font-bold leading-tight md:text-[2.75rem]">
          {title}
        </h1>
        <div className="mt-4 flex gap-1" aria-hidden="true">
          <span className="h-1 w-14 bg-gold" />
          <span className="h-1 w-4 bg-white/40" />
        </div>
        {lead && <p className="mt-5 max-w-3xl text-base text-white/90 md:text-lg">{lead}</p>}
      </div>
      <FlagStripe className="relative h-1.5" />
    </div>
  );
}
