import Link from "next/link";

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
    <div className="bg-gradient-to-r from-brand-dark to-brand text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/80 md:text-sm">
            <li>
              <Link href="/" className="hover:text-gold hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <span aria-hidden="true">/</span>
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
        <h1 className="font-serif text-3xl font-bold md:text-4xl">{title}</h1>
        <div className="mt-4 h-1 w-20 bg-gold" aria-hidden="true" />
        {lead && <p className="mt-4 max-w-3xl text-base text-white/90 md:text-lg">{lead}</p>}
      </div>
    </div>
  );
}
