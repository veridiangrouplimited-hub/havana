"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site, navigation } from "@/lib/site";
import type { IconName } from "@/components/Icon";
import Icon from "@/components/Icon";
import { FlagMark } from "@/components/FlagStripe";
import NationalSymbolsModal from "@/components/NationalSymbolsModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleSection = (label: string) =>
    setOpenSection((prev) => (prev === label ? null : label));

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Utility bar */}
      <div className="hidden bg-brand-dark text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs">
          <p className="flex items-center gap-2.5">
            <FlagMark className="h-3.5 w-6" />
            <span className="tracking-wide">
              The official website of the {site.missionName}
            </span>
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phones[0]}`} className="flex items-center gap-1.5 hover:underline">
              <Icon name="phone" className="h-3.5 w-3.5 text-gold" />
              {site.phones[0]}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:underline">
              <Icon name="mail" className="h-3.5 w-3.5 text-gold" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      {/* Identity band */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-3.5">
            <NationalSymbolsModal
              trigger={(openModal) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  title="Nigeria's national symbols — coat of arms, anthem & motto"
                  aria-label="Open national symbols: coat of arms, anthem and motto"
                >
                  <Image
                    src="/images/mfa-logo.webp"
                    alt="Coat of Arms — Federal Republic of Nigeria"
                    width={60}
                    height={60}
                    sizes="60px"
                    className="h-12 w-12 object-contain md:h-[60px] md:w-[60px]"
                    priority
                  />
                </button>
              )}
            />
            <Link href="/" className="min-w-0 border-l-2 border-gold/60 pl-3.5">
              <span className="block truncate font-serif text-lg font-bold leading-tight text-brand md:text-[1.45rem]">
                {site.missionName}
              </span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/65 md:text-[11px]">
                Federal Republic of Nigeria
              </span>
            </Link>
          </div>

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
              className="hidden items-center gap-2 rounded bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-dark shadow-sm hover:bg-gold-dark md:flex"
            >
              <Icon name="alert" className="h-4 w-4" />
              Emergency
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="rounded border border-line p-2 text-brand lg:hidden"
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="h-6 w-6" />
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop primary navigation ─────────────────────────────────── */}
      <nav aria-label="Primary" className="border-t border-white/10 bg-brand">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="hidden lg:flex">
            {navigation.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3.5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep ${
                    isActive(item.href) ? "bg-brand-dark shadow-[inset_0_-3px_0_0_#e3b339]" : ""
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children && (
                    <Icon
                      name="chevron"
                      className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {/* ── Desktop dropdown ───────────────────────────────── */}
                {item.children && (
                  <div
                    className={`invisible absolute left-0 top-full z-50 origin-top opacity-0 shadow-2xl ring-1 ring-black/10
                      transition-all duration-200 ease-out
                      group-hover:visible group-hover:opacity-100 group-hover:[transform:translateY(0)]
                      group-focus-within:visible group-focus-within:opacity-100 group-focus-within:[transform:translateY(0)]
                      [transform:translateY(-6px)]
                      ${item.children.length > 5 ? "w-[520px]" : "w-80"}`}
                  >
                    {/* Gold accent bar */}
                    <div className="h-[3px] w-full bg-gradient-to-r from-gold via-gold/80 to-gold/30" />
                    <div className="rounded-b-xl bg-white">
                      {/* Section label */}
                      <div className="border-b border-line px-5 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand/60">
                          {item.label}
                        </p>
                      </div>
                      {/* Items — 2-col grid when > 5 children */}
                      <ul
                        className={`p-2 ${item.children.length > 5 ? "grid grid-cols-2 gap-px" : ""}`}
                      >
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-brand/5"
                            >
                              {child.icon && (
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand/8 text-brand transition-colors group-hover/item:bg-brand group-hover/item:text-white">
                                  <Icon name={child.icon as IconName} className="h-4 w-4" />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold leading-snug text-ink group-hover/item:text-brand">
                                  {child.label}
                                </span>
                                {child.desc && (
                                  <span className="mt-0.5 block text-[11px] leading-snug text-ink/55">
                                    {child.desc}
                                  </span>
                                )}
                              </span>
                              <Icon
                                name="arrow"
                                className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-brand/30 opacity-0 transition-opacity group-hover/item:opacity-100"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Mobile menu ────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="max-h-[75vh] overflow-y-auto border-t border-brand-deep bg-brand lg:hidden"
          >
            {/* Mobile search */}
            <form action="/search" role="search" className="flex items-center gap-2 px-4 pt-4">
              <label htmlFor="mobile-search" className="sr-only">Search this website</label>
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

            {/* Mobile nav items */}
            <ul className="px-2 py-3">
              {navigation.map((item) => {
                const expanded = openSection === item.label;
                return (
                  <li key={item.href} className="border-b border-brand-deep/60 last:border-0">
                    {item.children ? (
                      <>
                        {/* Accordion trigger */}
                        <button
                          type="button"
                          onClick={() => toggleSection(item.label)}
                          aria-expanded={expanded}
                          className="flex w-full items-center justify-between px-3 py-3 font-semibold text-white"
                        >
                          {item.label}
                          <Icon
                            name="chevron"
                            className={`h-4 w-4 shrink-0 opacity-70 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Accordion children */}
                        {expanded && (
                          <ul className="mb-2 space-y-0.5 px-1">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/85 transition-colors hover:bg-brand-deep hover:text-white"
                                >
                                  {child.icon && (
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10">
                                      <Icon name={child.icon as IconName} className="h-3.5 w-3.5" />
                                    </span>
                                  )}
                                  <span className="min-w-0">
                                    <span className="block text-sm font-medium leading-snug">
                                      {child.label}
                                    </span>
                                    {child.desc && (
                                      <span className="block text-[11px] text-white/50">
                                        {child.desc}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-3 font-semibold text-white transition-colors hover:bg-brand-deep ${
                          isActive(item.href) ? "text-gold" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
