"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site, navigation } from "@/lib/site";
import Icon from "@/components/Icon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Utility bar */}
      <div className="hidden bg-brand-dark text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs">
          <p>Official website of the {site.missionName}, {site.city}, {site.hostCountry}</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phones[0]}`} className="flex items-center gap-1.5 hover:underline">
              <Icon name="phone" className="h-3.5 w-3.5" />
              {site.phones[0]}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:underline">
              <Icon name="mail" className="h-3.5 w-3.5" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Identity band */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/images/mfa-logo.png"
              alt="Coat of Arms — Ministry of Foreign Affairs, Federal Republic of Nigeria"
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
              priority
            />
            <span className="min-w-0">
              <span className="block truncate font-serif text-base font-bold leading-tight text-brand md:text-xl">
                {site.missionName}
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-wide text-ink/70 md:text-xs">
                {site.city}, {site.hostCountry} · Ministry of Foreign Affairs
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <form action="/search" role="search" className="hidden items-center xl:flex">
              <label htmlFor="header-search" className="sr-only">
                Search services, notices and news
              </label>
              <input
                id="header-search"
                name="q"
                type="search"
                placeholder="Search this website…"
                className="w-56 rounded-l border border-line px-3 py-2 text-sm placeholder:text-ink/50"
              />
              <button
                type="submit"
                className="rounded-r border border-brand bg-brand p-2 text-white hover:bg-brand-deep"
                aria-label="Search"
              >
                <Icon name="search" className="h-5 w-5" />
              </button>
            </form>
            <Link
              href="/consular-services/consular-assistance"
              className="hidden items-center gap-2 rounded border-2 border-gold bg-gold px-3 py-2 text-sm font-bold text-brand-dark hover:bg-gold-dark md:flex"
            >
              <Icon name="alert" className="h-4 w-4" />
              Emergency Assistance
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="rounded border border-line p-2 text-brand lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary navigation */}
      <nav aria-label="Primary" className="bg-brand">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="hidden lg:flex">
            {navigation.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3.5 py-3 text-sm font-semibold text-white hover:bg-brand-deep ${
                    isActive(item.href) ? "shadow-[inset_0_-3px_0_0_#e3b339]" : ""
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children && <Icon name="chevron" className="h-3.5 w-3.5" />}
                </Link>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full z-50 min-w-64 border-t-[3px] border-gold bg-white py-2 opacity-0 shadow-xl transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-ink hover:bg-mist hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="mobile-menu" className="max-h-[70vh] overflow-y-auto border-t border-brand-deep bg-brand lg:hidden">
            <form action="/search" role="search" className="flex items-center gap-2 px-4 pt-4">
              <label htmlFor="mobile-search" className="sr-only">
                Search this website
              </label>
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="Search this website…"
                className="w-full rounded border border-brand-deep bg-white px-3 py-2 text-sm"
              />
              <button type="submit" className="rounded bg-gold p-2 text-brand-dark" aria-label="Search">
                <Icon name="search" className="h-5 w-5" />
              </button>
            </form>
            <ul className="px-2 py-3">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-brand-deep/60 last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-3 font-semibold text-white"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="pb-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block px-6 py-2 text-sm text-white/85 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
