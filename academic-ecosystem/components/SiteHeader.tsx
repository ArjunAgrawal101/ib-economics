"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { contact, navigation, platforms, site, socials } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecoOpen, setEcoOpen] = useState(false);
  const ecoRef = useRef<HTMLLIElement>(null);
  const ecoButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const ecoPanelId = useId();
  const drawerId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setEcoOpen(false);
  }

  // Ecosystem panel: close on outside click and Escape.
  useEffect(() => {
    if (!ecoOpen) return;
    const onDown = (e: PointerEvent) => {
      if (ecoRef.current && !ecoRef.current.contains(e.target as Node)) setEcoOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEcoOpen(false);
        ecoButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [ecoOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Mobile menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const drawer = drawerRef.current;
    const focusables = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const isActive = (href: string) => !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled || menuOpen
          ? "border-b border-rule/80 bg-ivory/95 shadow-[0_8px_30px_-20px_rgba(12,26,48,0.25)] backdrop-blur-[6px]"
          : "border-b border-transparent bg-ivory/0",
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name}, ${site.title}: home`}>
          <Monogram className="h-8 w-auto lg:h-9" />
          <span className="flex flex-col leading-none">
            <span className="display text-[1.375rem] tracking-[0.01em] text-ink lg:text-[1.5rem]">{site.name}</span>
            <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-slate">
              {site.title}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {navigation.map((item) =>
              item.label === "Ecosystem" ? (
                <li key={item.href} className="relative" ref={ecoRef}>
                  <button
                    ref={ecoButtonRef}
                    type="button"
                    aria-expanded={ecoOpen}
                    aria-controls={ecoPanelId}
                    onClick={() => setEcoOpen((v) => !v)}
                    className={cn(
                      "flex min-h-11 items-center gap-1.5 rounded-sm px-3.5 text-[0.9375rem] font-medium transition-colors hover:text-ink",
                      ecoOpen || isActive(item.href) ? "text-ink" : "text-charcoal/80",
                    )}
                  >
                    Ecosystem
                    <ChevronDown
                      aria-hidden
                      strokeWidth={1.75}
                      className={cn("size-4 transition-transform duration-300", ecoOpen && "rotate-180")}
                    />
                  </button>
                  <div
                    id={ecoPanelId}
                    hidden={!ecoOpen}
                    className="absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,640px)] -translate-x-1/2 rounded-[4px] border border-rule bg-paper p-2 shadow-[0_30px_60px_-30px_rgba(12,26,48,0.35)]"
                  >
                    <div className="grid gap-1">
                      {platforms.map((p) => (
                        <a
                          key={p.id}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group nudge-diag grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[3px] px-4 py-3.5 transition-colors hover:bg-ivory"
                        >
                          <span aria-hidden className={cn("h-10 w-[3px] rounded-full", accent[p.id].bg)} />
                          <span>
                            <span className="flex items-baseline gap-2">
                              <span className="text-[0.6875rem] font-semibold tabular-nums text-slate">{p.index}</span>
                              <span className="display text-[1.375rem] text-ink">{p.name}</span>
                            </span>
                            <span className="mt-0.5 block text-sm text-slate">{p.descriptor}</span>
                          </span>
                          <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-5 text-slate group-hover:text-ink" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ))}
                    </div>
                    <Link
                      href="/ecosystem"
                      className="nudge mt-1 flex items-center justify-between rounded-[3px] border-t border-rule px-4 py-3.5 text-sm font-semibold text-ink hover:bg-ivory"
                    >
                      How the three platforms connect
                      <ArrowRight aria-hidden strokeWidth={1.75} className="size-4" />
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center rounded-sm px-3.5 text-[0.9375rem] font-medium transition-colors hover:text-ink",
                      isActive(item.href) ? "text-ink" : "text-charcoal/80",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span aria-hidden className="absolute inset-x-3.5 bottom-1.5 h-px bg-gold" />
                    )}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Link
            href="/contact"
            className="nudge ml-4 inline-flex min-h-11 items-center gap-2 rounded-[3px] border border-ink/25 px-4 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
          >
            Contact
            <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          ref={menuButtonRef}
          type="button"
          className="-mr-2 flex size-12 items-center justify-center rounded-sm text-ink lg:hidden"
          aria-expanded={menuOpen}
          aria-controls={drawerId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X aria-hidden strokeWidth={1.5} /> : <Menu aria-hidden strokeWidth={1.5} />}
        </button>
      </div>
    </header>

      {/* Mobile menu: a sibling of the header, so the header's backdrop-filter
          cannot become its containing block. */}
      <div
        id={drawerId}
        ref={drawerRef}
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-ivory lg:hidden"
      >
        <div className="shell flex min-h-full flex-col pb-10 pt-6">
          <nav aria-label="Mobile">
            <ul className="border-t border-rule">
              {[{ label: "Home", href: "/" }, ...navigation, { label: "Contact", href: "/contact" }].map((item, i) => (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="intro-rise flex min-h-16 items-center justify-between py-3"
                    style={{ "--d": `${60 + i * 40}ms` } as React.CSSProperties}
                  >
                    <span className="display text-[2.125rem] text-ink">{item.label}</span>
                    <ArrowRight aria-hidden strokeWidth={1.5} className="size-5 text-slate" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="eyebrow mt-10 text-gold-deep">The platforms</p>
          <ul className="mt-4 grid gap-2">
            {platforms.map((p) => (
              <li key={p.id}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center gap-4 rounded-[3px] border border-rule bg-paper px-4 py-3"
                >
                  <span aria-hidden className={cn("h-8 w-[3px] rounded-full", accent[p.id].bg)} />
                  <span className="flex-1">
                    <span className="block font-semibold text-ink">{p.name}</span>
                    <span className="block text-sm text-slate">{p.descriptor}</span>
                  </span>
                  <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-5 text-slate" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
            <a href={`mailto:${contact.email}`} className="text-[0.9375rem] font-semibold text-ink underline">
              {contact.email}
            </a>
            <ul className="flex gap-1">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="flex size-11 items-center justify-center rounded-full text-ink hover:bg-parchment"
                  >
                    <BrandIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
