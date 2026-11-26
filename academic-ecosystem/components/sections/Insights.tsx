"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { insightCategories, insights, insightsElsewhere, type Insight } from "@/data/insights";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * SECTION 08 · Ideas, insights and latest work
 * A curated editorial grid (entries live in data/insights.ts). Filters are
 * built from the categories in use, so no empty tab is ever offered.
 */
export function Insights() {
  const used = insightCategories.filter((c) => insights.some((i) => i.category === c));
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? insights : insights.filter((i) => i.category === filter);
  const lead = shown.find((i) => i.featured) ?? shown[0];
  const others = shown.filter((i) => i !== lead);

  return (
    <section aria-labelledby="insights-title" className="section-y">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="08"
            eyebrow="Ideas, insights & latest work"
            id="insights-title"
            title={
              <>
                Selected <em className="text-gold-deep">ideas.</em>
              </>
            }
            intro="Visual issues, reflections on learning and work from across the platforms, chosen by hand."
          />
          <a
            href={insightsElsewhere.href}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal nudge-diag inline-flex shrink-0 items-center gap-3 self-start rounded-[3px] border border-ink/20 px-4 py-3 text-[0.875rem] font-semibold text-ink transition-colors hover:border-ink lg:self-auto"
          >
            <BrandIcon id="linkedin" className="size-4 text-politics" />
            <span>
              {insightsElsewhere.label}
              <span className="block text-[0.75rem] font-medium text-slate">{insightsElsewhere.note}</span>
            </span>
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div role="group" aria-label="Filter by category" className="reveal -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {["All", ...used].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-4 text-[0.875rem] font-medium transition-colors",
                filter === c ? "border-ink bg-ink text-ivory" : "border-rule-strong/60 text-charcoal hover:border-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {lead && (
            <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
              <InsightCard item={lead} lead />
            </div>
          )}
          <ul className="grid content-start gap-6 sm:grid-cols-2 lg:col-span-7">
            {others.map((i) => (
              <li key={i.id}>
                <InsightCard item={i} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function InsightCard({ item, lead = false }: { item: Insight; lead?: boolean }) {
  const a = item.discipline ? accent[item.discipline] : null;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-rule bg-paper transition-[box-shadow,border-color] duration-500 hover:border-rule-strong hover:shadow-[0_24px_50px_-36px_rgba(12,26,48,0.5)]",
      )}
    >
      {item.image && (
        <div className={cn("relative overflow-hidden bg-parchment", lead ? "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]" : "aspect-[16/10]")}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={lead ? "(min-width: 1024px) 480px, 92vw" : "(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"}
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col", lead ? "p-6 sm:p-8" : "p-6")}>
        <p className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate">
          {a && <span aria-hidden className={cn("size-1.5 rounded-full", a.bg)} />}
          {item.category}
          <span aria-hidden className="text-rule-strong">/</span>
          <span className="font-medium normal-case tracking-normal">{item.format}</span>
        </p>
        <h3 className={cn("display mt-4 leading-[1.08] text-ink", lead ? "text-[2.25rem] sm:text-[2.5rem]" : "text-[1.625rem]")}>
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="stretched outline-none focus-visible:underline">
            {item.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        <p className={cn("mt-3 leading-relaxed text-slate", lead ? "text-[1.0625rem]" : "text-[0.9375rem]")}>{item.summary}</p>
        <p className={cn("nudge-diag mt-6 inline-flex items-center gap-1.5 pt-1 text-[0.875rem] font-semibold md:mt-auto md:pt-6", a ? a.textDeep : "text-ink")}>
          {item.linkLabel}
          <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
        </p>
      </div>
    </article>
  );
}
