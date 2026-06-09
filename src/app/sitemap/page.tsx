import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { services } from "@/data/services";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "A complete map of every page on this website.",
};

const groups: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About the Mission", href: "/about" },
      { label: "Bilateral Relations", href: "/relations" },
      { label: "Nigerians in Diaspora", href: "/diaspora" },
      { label: "News & Press Releases", href: "/news" },
      { label: "Public Notices", href: "/public-notices" },
      { label: "Contact Us", href: "/contact" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    heading: "Consular Services",
    links: [
      { label: "All Consular Services", href: "/consular-services" },
      ...services.map((s) => ({ label: s.title, href: `/consular-services/${s.slug}` })),
    ],
  },
  {
    heading: "News Articles",
    links: news.map((n) => ({ label: n.title, href: `/news/${n.slug}` })),
  },
  {
    heading: "Legal & Information",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHeader
        title="Sitemap"
        lead="Every page on this website, organised by section."
        crumbs={[{ label: "Sitemap" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          {groups.map((g) => (
            <section key={g.heading} aria-labelledby={g.heading.replace(/\s+/g, "-").toLowerCase()}>
              <h2
                id={g.heading.replace(/\s+/g, "-").toLowerCase()}
                className="mb-4 border-b-2 border-gold pb-2 font-serif text-xl font-bold text-brand-deep"
              >
                {g.heading}
              </h2>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-brand underline hover:text-brand-deep md:text-base">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
