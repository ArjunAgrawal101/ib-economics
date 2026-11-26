"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { platforms, type PlatformId } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * The interactive ecosystem map: the identity at the centre, the three
 * platforms around it. Selecting a platform (on the map or in the tab list)
 * shows what it covers and who it is for, with a direct way in.
 * Keyboard: arrow keys move between tabs.
 */
const positions: Record<PlatformId, { x: number; y: number }> = {
  economics: { x: 90, y: 330 },
  politics: { x: 250, y: 60 },
  business: { x: 410, y: 330 },
};

export function EcosystemExplorer() {
  const [active, setActive] = useState<PlatformId>("economics");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = platforms.find((p) => p.id === active)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = platforms.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(platforms[next].id);
      tabs.current[next]?.focus();
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Map */}
      <div className="relative lg:col-span-5">
        <div className="relative mx-auto aspect-[500/420] w-full max-w-[460px]">
          <svg viewBox="0 0 500 420" className="absolute inset-0 h-full w-full" aria-hidden fill="none">
            <circle cx="250" cy="240" r="170" stroke="#b39350" strokeOpacity="0.35" strokeDasharray="2 7" />
            <circle cx="250" cy="240" r="110" stroke="#0c1a30" strokeOpacity="0.08" />
            {platforms.map((p) => (
              <line
                key={p.id}
                x1="250"
                y1="240"
                x2={positions[p.id].x}
                y2={positions[p.id].y}
                stroke={accent[p.id].hex}
                strokeWidth={p.id === active ? 2 : 1}
                strokeOpacity={p.id === active ? 0.9 : 0.25}
                style={{ transition: "stroke-opacity .4s, stroke-width .4s" }}
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-[57%] flex size-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/60 bg-paper shadow-[0_20px_40px_-24px_rgba(12,26,48,0.5)]">
            <Monogram className="h-[38%] w-auto" />
            <span className="mt-1.5 text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-slate sm:text-[0.625rem]">Arjun Agrawal</span>
          </div>
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => setActive(p.id)}
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3.5 py-2 text-[0.8125rem] font-semibold shadow-sm transition-[background-color,color,border-color,transform] duration-300 sm:text-[0.875rem]",
                p.id === active ? "scale-105 border-transparent text-ivory" : "border-rule bg-paper text-ink hover:border-ink",
              )}
              style={{
                left: `${(positions[p.id].x / 500) * 100}%`,
                top: `${(positions[p.id].y / 420) * 100}%`,
                backgroundColor: p.id === active ? accent[p.id].hex : undefined,
              }}
            >
              {p.id !== active && <span className={cn("size-2 rounded-full", accent[p.id].bg)} />}
              {p.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs and panel */}
      <div className="lg:col-span-7">
        <div role="tablist" aria-label="The three platforms" className="flex flex-wrap gap-2 border-b border-rule pb-4">
          {platforms.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`eco-tab-${p.id}`}
              aria-selected={p.id === active}
              aria-controls={`eco-panel-${p.id}`}
              tabIndex={p.id === active ? 0 : -1}
              onClick={() => setActive(p.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors",
                p.id === active ? "border-ink bg-ink text-ivory" : "border-rule-strong/60 text-ink hover:border-ink",
              )}
            >
              <span aria-hidden className={cn("size-2 rounded-full", accent[p.id].bg)} />
              {p.shortName}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`eco-panel-${current.id}`}
          aria-labelledby={`eco-tab-${current.id}`}
          tabIndex={0}
          className="mt-8 outline-none"
        >
          <p className={cn("eyebrow", accent[current.id].textDeep)}>
            {current.index} · {current.discipline}
          </p>
          <h3 className="display mt-4 text-[2.5rem] leading-none text-ink sm:text-[3rem]">{current.name}</h3>
          <p className={cn("mt-3 font-serif text-xl italic", accent[current.id].textDeep)}>{current.descriptor}</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate">What it covers</p>
              <ul className="mt-4 space-y-2.5">
                {current.areas.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[0.9375rem] text-charcoal">
                    <span aria-hidden className={cn("mt-[0.6em] h-px w-3 shrink-0", accent[current.id].bg)} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate">Who it is for</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {current.audiences.map((a) => (
                  <li key={a} className={cn("rounded-full px-3 py-1 text-[0.8125rem] font-semibold", accent[current.id].bgSoft, accent[current.id].textDeep)}>
                    {a}
                  </li>
                ))}
              </ul>
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("nudge-diag mt-8 inline-flex min-h-12 items-center gap-2 rounded-[3px] px-5 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-ivory transition-opacity hover:opacity-90", accent[current.id].bg)}
              >
                {current.cta}
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
