"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { discovery } from "@/data/content";
import { platformById } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * "Where would you like to begin?" A visitor picks an interest and sees the
 * platform, or platforms, that cover it. Where several are relevant, every
 * route is shown rather than one being chosen for them.
 */
export function Discovery({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const interest = discovery.find((d) => d.id === selected) ?? null;

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        aria-labelledby="discovery-title"
        className={cn("relative overflow-hidden rounded-[6px] border border-rule bg-paper", compact ? "p-6 sm:p-10" : "p-6 sm:p-10 lg:p-14")}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span aria-hidden className="h-px w-8 bg-gold/70" />
              Platform discovery
            </p>
            <h2 id="discovery-title" className="display mt-5 text-[2.25rem] text-ink sm:text-5xl">
              Where would you like to begin?
            </h2>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-slate">
              Choose what interests you. You will be pointed to the platform that covers it, or to each of them where
              more than one does.
            </p>
            <div role="group" aria-label="Interests" className="mt-8 flex flex-wrap gap-2.5">
              {discovery.map((d) => {
                const on = d.id === selected;
                return (
                  <button
                    key={d.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSelected(on ? null : d.id)}
                    className={cn(
                      "min-h-11 rounded-full border px-4 text-[0.9375rem] font-medium transition-[background-color,border-color,color] duration-300",
                      on ? "border-ink bg-ink text-ivory" : "border-rule-strong/70 bg-ivory text-ink hover:border-ink",
                    )}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {interest ? (
                <m.div
                  key={interest.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-serif text-xl italic text-ink">{interest.note}</p>
                  <ul className={cn("mt-6 grid gap-3", interest.routes.length === 3 && "md:grid-cols-3", interest.routes.length === 2 && "md:grid-cols-2")}>
                    {interest.routes.map((r) => {
                      const p = platformById(r.platform);
                      return (
                        <li key={r.platform}>
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group nudge-diag flex h-full flex-col rounded-[4px] border border-rule bg-ivory p-5 transition-[border-color,box-shadow] duration-300 hover:border-ink/40 hover:shadow-[0_20px_40px_-28px_rgba(12,26,48,0.45)]"
                          >
                            <span aria-hidden className={cn("h-[3px] w-10 rounded-full", accent[p.id].bg)} />
                            <span className="display mt-5 text-[1.625rem] leading-tight text-ink">{p.name}</span>
                            <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">{r.what}</span>
                            <span className={cn("mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold", accent[p.id].textDeep)}>
                              Open platform
                              <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                            </span>
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </m.div>
              ) : (
                <m.div
                  key="empty"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full min-h-[240px] flex-col justify-center rounded-[4px] border border-dashed border-rule-strong/70 p-6 sm:p-8"
                >
                  <p className="max-w-md font-serif text-xl italic leading-snug text-slate">
                    Select an interest to see where it is covered. Each platform opens in a new tab.
                  </p>
                  <ul className="mt-8 grid gap-2" aria-label="The three platforms">
                    {(["economics", "business", "politics"] as const).map((id) => {
                      const p = platformById(id);
                      return (
                        <li key={id} className="flex items-center gap-3 border-t border-rule pt-3 text-[0.9375rem] text-charcoal">
                          <span aria-hidden className={cn("size-2 rounded-full", accent[id].bg)} />
                          <span className="font-semibold text-ink">{p.name}</span>
                          <span className="hidden text-slate sm:inline">· {p.descriptor}</span>
                        </li>
                      );
                    })}
                  </ul>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
