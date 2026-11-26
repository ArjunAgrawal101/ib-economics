import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotifStyles, motifFor } from "@/components/visuals/PlatformMotifs";
import { platforms, type Platform } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * SECTION 02 · Three disciplines. Three platforms. One connected ecosystem.
 * Three editorial panels, one per platform. Each has its own surface and
 * composition; on large screens they stack as the page scrolls.
 */
export function Platforms({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="platforms" aria-labelledby={showHeading ? "platforms-title" : undefined} aria-label={showHeading ? undefined : "The three platforms"} className={cn("scroll-mt-20", showHeading ? "section-y" : "pb-20 pt-4 md:pb-28 lg:pt-6")}>
      <MotifStyles />
      <div className="shell">
        {showHeading && (
          <SectionHeading
            index="02"
            eyebrow="The academic worlds"
            id="platforms-title"
            align="split"
            title={
              <>
                Three disciplines. Three platforms.{" "}
                <em className="text-gold-deep">One connected ecosystem.</em>
              </>
            }
            intro="Each discipline has its own questions, methods and intellectual traditions. Three independent platforms make these fields more accessible, more analytical and more engaging."
          />
        )}

        <ol className={cn("grid gap-6 lg:gap-0", showHeading && "mt-14 lg:mt-20")}>
          {platforms.map((p, i) => (
            <li
              key={p.id}
              className="lg:sticky lg:[@media(min-height:820px)]:top-[104px] lg:[@media(max-height:819px)]:static"
              style={{ zIndex: i + 1 }}
            >
              <PlatformPanel platform={p} position={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const surfaces = {
  economics: {
    panel: "bg-paper border border-rule",
    title: "text-ink",
    body: "text-slate",
    tick: "bg-economics",
    plate: "bg-economics-soft/60 border border-economics/15",
    cta: "bg-economics text-ivory hover:bg-economics-deep",
    tone: "light" as const,
  },
  business: {
    panel: "bg-[#efe4d3] border border-[#dccbb1]",
    title: "text-ink",
    body: "text-[#57504a]",
    tick: "bg-business",
    plate: "bg-paper/70 border border-business/15",
    cta: "bg-business text-ivory hover:bg-business-deep",
    tone: "light" as const,
  },
  politics: {
    panel: "on-dark bg-[#111a3a] border border-[#26305c]",
    title: "text-ivory",
    body: "text-ivory/70",
    tick: "bg-politics-light",
    plate: "bg-white/[0.03] border border-white/10",
    cta: "bg-politics-light text-[#111a3a] hover:bg-ivory",
    tone: "dark" as const,
  },
};

function PlatformPanel({ platform: p, position }: { platform: Platform; position: number }) {
  const s = surfaces[p.id];
  const Motif = motifFor[p.id];
  const visualFirst = position === 1;
  const titleId = `platform-${p.id}-title`;
  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative overflow-hidden rounded-[6px] shadow-[0_-24px_60px_-40px_rgba(12,26,48,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(12,26,48,0.45)] lg:mt-8",
        s.panel,
      )}
    >
      {p.id === "politics" && <div aria-hidden className="grain-dark" />}
      <div className="relative grid gap-10 p-6 sm:p-10 lg:min-h-[600px] lg:grid-cols-12 lg:gap-12 lg:p-14">
        {/* Copy */}
        <div className={cn("flex flex-col lg:col-span-6", visualFirst && "lg:order-2")}>
          <p className={cn("eyebrow flex items-center gap-3", s.tone === "dark" ? "text-politics-light" : accent[p.id].textDeep)}>
            <span className="whitespace-nowrap tabular-nums">{p.index} / 03</span>
            <span aria-hidden className={cn("h-px w-8 shrink-0", s.tick)} />
            <span>{p.discipline}</span>
          </p>

          <h3 id={titleId} className={cn("display mt-8 text-[2.75rem] leading-[0.95] sm:text-6xl lg:text-[4.25rem]", s.title)}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="stretched outline-none focus-visible:underline">
              {p.id === "economics" ? "Economics" : p.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </h3>
          <p className={cn("mt-4 font-serif text-[1.375rem] italic sm:text-2xl", s.tone === "dark" ? "text-politics-light" : accent[p.id].textDeep)}>
            {p.descriptor}
          </p>
          <p className={cn("mt-6 max-w-xl text-[1.0625rem] leading-relaxed", s.body)}>{p.description}</p>

          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <li key={h} className={cn("flex items-start gap-3 text-[0.9375rem]", s.tone === "dark" ? "text-ivory/85" : "text-charcoal")}>
                <span aria-hidden className={cn("mt-[0.6em] h-px w-3 shrink-0", s.tick)} />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-auto lg:pt-10">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "nudge-diag relative z-[2] inline-flex min-h-12 items-center gap-2.5 rounded-[3px] px-5 text-[0.875rem] font-bold uppercase tracking-[0.08em] transition-colors",
                s.cta,
              )}
            >
              {p.cta}
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className={cn("text-[0.8125rem]", s.tone === "dark" ? "text-ivory/55" : "text-slate")}>
              Independent platform · For {listAudiences(p.audiences)}
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className={cn("relative lg:col-span-6", visualFirst && "lg:order-1")}>
          <div className={cn("relative flex h-full items-center justify-center overflow-hidden rounded-[4px] p-6 sm:p-10", s.plate)}>
            <Motif tone={s.tone} className="max-w-[520px] transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.02]" />
            <span
              aria-hidden
              className={cn(
                "display pointer-events-none absolute -bottom-6 right-4 select-none text-[9rem] leading-none sm:text-[11rem]",
                s.tone === "dark" ? "text-white/[0.04]" : "text-ink/[0.04]",
              )}
            >
              {p.index}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/** "IB DP students, teachers and independent learners": acronyms keep their case. */
function listAudiences(items: string[]) {
  const words = items.map((a) => (/^[A-Z]{2,}/.test(a) ? a : a.charAt(0).toLowerCase() + a.slice(1)));
  return words.length > 1 ? `${words.slice(0, -1).join(", ")} and ${words.at(-1)}` : words[0];
}
