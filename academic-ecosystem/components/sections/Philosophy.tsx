import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/data/content";
import { profile } from "@/data/site";

/**
 * SECTION 07 · Learning should go beyond memorisation.
 * Six moves as a methodology: a gold line runs through them and fills as the
 * section scrolls into view (CSS scroll-driven; static where unsupported).
 */
export function Philosophy({ index = "07" }: { index?: string }) {
  return (
    <section aria-labelledby="philosophy-title" className="on-dark section-y relative overflow-hidden bg-navy text-ivory">
      <div aria-hidden className="grain-dark" />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: view()) {
            .method-fill { animation: method-fill linear both; animation-timeline: view(); animation-range: entry 20% cover 55%; }
          }
        }
        @keyframes method-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (max-width: 1279px) { @keyframes method-fill { from { transform: scaleY(0); } to { transform: scaleY(1); } } }
      `}</style>
      <div className="shell relative">
        <SectionHeading
          index={index}
          eyebrow="Academic philosophy"
          tone="dark"
          id="philosophy-title"
          align="split"
          title={
            <>
              Learning should go <em className="text-gold-light">beyond memorisation.</em>
            </>
          }
          intro={profile.approach}
        />

        <div className="relative mt-16 lg:mt-24">
          {/* the line: horizontal on desktop, vertical on smaller screens */}
          <div aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-ivory/15 xl:bottom-auto xl:left-0 xl:right-0 xl:top-[27px] xl:h-px xl:w-auto">
            <div className="method-fill h-full w-full origin-top bg-gold-light/80 xl:origin-left" />
          </div>

          <ol className="relative grid gap-10 xl:grid-cols-6 xl:gap-6">
            {principles.map((p, i) => (
              <li key={p.verb} className="reveal grid grid-cols-[56px_1fr] gap-5 xl:block" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-gold-light/50 bg-navy">
                  <Glyph index={i} />
                </div>
                <div className="xl:mt-8">
                  <p className="text-[0.75rem] font-semibold tabular-nums tracking-[0.16em] text-gold-light">{p.index}</p>
                  <h3 className="display mt-2 text-[2rem] leading-none text-ivory xl:text-[2.125rem]">{p.verb}</h3>
                  <p className="mt-3 text-[0.9375rem] font-medium leading-snug text-ivory/90">{p.line}</p>
                  <p className="mt-3 font-serif text-[1rem] italic leading-relaxed text-mist">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="reveal mx-auto mt-20 max-w-3xl border-t border-ivory/10 pt-10 text-center lg:mt-28">
          <blockquote className="display text-[1.875rem] leading-tight text-ivory sm:text-[2.5rem]">
            &ldquo;{profile.quotes[0].text}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
            {profile.quotes[0].source}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Six small original glyphs, one per move. */
function Glyph({ index }: { index: number }) {
  const s = { stroke: "#d6bd84", strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
      {index === 0 && (
        // Understand: foundations
        <g {...s}>
          <path d="M4 22h20M7 18h14M10 14h8" />
          <circle cx="14" cy="8" r="2.5" />
        </g>
      )}
      {index === 1 && (
        // Visualise: axes and a curve
        <g {...s}>
          <path d="M5 4v19h19" />
          <path d="M8 8c4 3 8 8 13 12" />
          <path d="M8 20c4-3 8-8 13-12" opacity=".6" />
        </g>
      )}
      {index === 2 && (
        // Connect: three linked nodes
        <g {...s}>
          <circle cx="14" cy="6" r="2.5" />
          <circle cx="6" cy="21" r="2.5" />
          <circle cx="22" cy="21" r="2.5" />
          <path d="M12.8 8.2 7.2 18.8M15.2 8.2l5.6 10.6M8.5 21h11" />
        </g>
      )}
      {index === 3 && (
        // Analyse: a lens over evidence
        <g {...s}>
          <circle cx="12" cy="12" r="6.5" />
          <path d="m17 17 6 6M9 12h6M12 9v6" />
        </g>
      )}
      {index === 4 && (
        // Evaluate: a balance
        <g {...s}>
          <path d="M14 5v18M8 23h12M5 9h18" />
          <path d="M5 9 2.5 15h5zM23 9l-2.5 6h5z" />
        </g>
      )}
      {index === 5 && (
        // Apply: into the target
        <g {...s}>
          <circle cx="16" cy="12" r="7" />
          <circle cx="16" cy="12" r="2.5" />
          <path d="M3 25 14 14M3 25h4M3 25v-4" />
        </g>
      )}
    </svg>
  );
}
