import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Action } from "@/components/ui/Action";
import { platforms, profile, site } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * SECTION 01 · The hero
 * The name, the editorial line and the portrait set in an arch. Three
 * orbits draw in on load and each discipline settles onto one, connected to
 * the centre. Below, a rail puts all three platforms one click away on the
 * first screen.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="shell relative pb-10 pt-6 sm:pt-10 lg:pb-12 lg:pt-8">
        <div className="grid items-center gap-x-10 gap-y-10 [grid-template-areas:'top'_'portrait'_'bottom'] lg:grid-cols-12 lg:[grid-template-areas:'top_top_top_top_top_top_top_portrait_portrait_portrait_portrait_portrait'_'bottom_bottom_bottom_bottom_bottom_bottom_bottom_portrait_portrait_portrait_portrait_portrait']">
          {/* Name and editorial line */}
          <div className="[grid-area:top] lg:self-end">
            <p className="intro-rise eyebrow flex items-center gap-3 text-gold-deep" style={{ "--d": "80ms" } as React.CSSProperties}>
              <span aria-hidden className="h-px w-10 bg-gold" />
              {site.title}
            </p>
            <h1
              id="hero-title"
              className="intro-rise display mt-6 text-[clamp(3.6rem,13.5vw,5rem)] leading-[0.88] tracking-[-0.02em] text-ink sm:text-[6rem] lg:text-[clamp(5.5rem,7.4vw,7.75rem)]"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              Arjun
              <br />
              Agrawal
            </h1>
            <p
              className="intro-rise mt-6 font-serif text-[1.625rem] italic leading-snug text-ink sm:text-[2rem]"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              Ideas<span className="text-gold">.</span> Knowledge<span className="text-gold">.</span> Perspectives
              <span className="text-gold">.</span>
            </p>
          </div>

          {/* Portrait */}
          <div className="[grid-area:portrait] lg:row-span-2">
            <PortraitOrbit />
          </div>

          {/* Descriptor, introduction and actions */}
          <div className="[grid-area:bottom] lg:self-start">
            <p
              className="intro-rise flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] font-semibold tracking-[0.02em] text-charcoal"
              style={{ "--d": "380ms" } as React.CSSProperties}
            >
              {site.descriptor.map((d, i) => (
                <span key={d} className="flex items-center gap-2 whitespace-nowrap">
                  <span aria-hidden className={cn("size-1.5 rotate-45", ["bg-economics", "bg-business", "bg-politics", "bg-gold"][i])} />
                  {d}
                </span>
              ))}
            </p>
            <p className="intro-rise lede mt-6 max-w-[34rem] text-slate" style={{ "--d": "460ms" } as React.CSSProperties}>
              An academic ecosystem built around ideas, disciplines and the pursuit of deeper understanding. Explore
              economics, business management and political studies through independent learning platforms, original
              resources and critical perspectives.
            </p>
            <div className="intro-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ "--d": "540ms" } as React.CSSProperties}>
              <Action href="/#platforms">Explore the Academic Ecosystem</Action>
              <Action href="/work" variant="secondary">
                Discover my work
              </Action>
            </div>
          </div>
        </div>

        {/* Platform rail: all three platforms on the first screen */}
        <nav aria-label="The three platforms" className="intro-fade mt-14 lg:mt-12" style={{ "--d": "700ms" } as React.CSSProperties}>
          <p className="eyebrow mb-4 text-slate">Enter a platform</p>
          <ul className="grid border-y border-rule sm:grid-cols-3">
            {platforms.map((p, i) => (
              <li key={p.id} className={cn("border-rule", i > 0 && "border-t sm:border-l sm:border-t-0")}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group nudge-diag relative flex h-full items-center gap-4 py-5 transition-colors sm:px-5 lg:px-6 lg:py-6 sm:first:pl-0"
                >
                  <span aria-hidden className={cn("absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-5", accent[p.id].bg)} />
                  <span aria-hidden className={cn("h-9 w-[3px] shrink-0 rounded-full", accent[p.id].bg)} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="text-[0.6875rem] font-semibold tabular-nums text-slate">{p.index}</span>
                      <span className="display text-[1.375rem] leading-tight text-ink xl:text-[1.5rem]">{p.name}</span>
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-slate">{p.descriptor}</span>
                  </span>
                  <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-5 shrink-0 text-slate transition-colors group-hover:text-ink" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* architectural column lines */}
      <div className="shell relative h-full">
        <div className="absolute inset-y-0 left-[58.333%] hidden w-px bg-gradient-to-b from-transparent via-rule/70 to-transparent lg:block" />
      </div>
      <div className="absolute -right-[20%] top-[-10%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(179,147,80,0.13),transparent_65%)]" />
    </div>
  );
}

/** The portrait in an arch, with three orbits and the disciplines connected to the centre. */
function PortraitOrbit() {
  // Node positions on a 600 × 640 canvas, centre of the arch at (300, 330).
  const nodes = [
    { id: "economics" as const, label: "Economics", x: 64, y: 470, len: 360 },
    { id: "politics" as const, label: "Politics", x: 548, y: 168, len: 330 },
    { id: "business" as const, label: "Business", x: 520, y: 560, len: 300 },
  ];
  return (
    <div className="relative mx-auto aspect-[600/640] w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px]">
      {/* orbits */}
      <svg viewBox="0 0 600 640" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden fill="none">
        <ellipse cx="300" cy="330" rx="292" ry="250" stroke="#b39350" strokeOpacity="0.55" className="intro-draw" style={{ "--len": 1720, "--d": "300ms" } as React.CSSProperties} />
        <ellipse cx="300" cy="330" rx="250" ry="296" stroke="#0c1a30" strokeOpacity="0.14" className="intro-draw" style={{ "--len": 1720, "--d": "450ms" } as React.CSSProperties} transform="rotate(-24 300 330)" />
        <ellipse cx="300" cy="330" rx="270" ry="210" stroke="#0c1a30" strokeOpacity="0.1" strokeDasharray="2 8" transform="rotate(28 300 330)" />
        {nodes.map((n, i) => (
          <line
            key={n.id}
            x1={n.x}
            y1={n.y}
            x2="300"
            y2="330"
            stroke={accent[n.id].hex}
            strokeOpacity="0.55"
            strokeWidth="1.25"
            className="intro-draw"
            style={{ "--len": n.len, "--d": `${1100 + i * 160}ms` } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* arch */}
      <div className="absolute inset-x-[17%] bottom-[7%] top-[8%]">
        <div className="intro-fade absolute inset-0 overflow-hidden rounded-t-full border border-ink/10 bg-parchment shadow-[0_40px_80px_-40px_rgba(12,26,48,0.55)]" style={{ "--d": "200ms" } as React.CSSProperties}>
          <Image
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            fill
            priority
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 280px, 230px"
            className="object-cover object-[50%_22%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
        </div>
        {/* inner keyline */}
        <div aria-hidden className="pointer-events-none absolute -inset-3 rounded-t-full border border-gold/50" />
      </div>

      {/* discipline nodes */}
      {nodes.map((n, i) => (
        <span
          key={n.id}
          aria-hidden
          className="intro-rise absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-rule bg-paper/95 py-1.5 pl-2 pr-3 text-[0.75rem] font-semibold text-ink shadow-[0_8px_24px_-14px_rgba(12,26,48,0.5)] sm:text-[0.8125rem]"
          style={{ left: `${(n.x / 600) * 100}%`, top: `${(n.y / 640) * 100}%`, "--d": `${900 + i * 160}ms` } as React.CSSProperties}
        >
          <span className={cn("size-2.5 rounded-full", accent[n.id].bg)} />
          {n.label}
        </span>
      ))}

      {/* monogram seal at the centre-bottom */}
      <span aria-hidden className="intro-fade absolute bottom-[2.5%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-ivory sm:text-[0.6875rem]" style={{ "--d": "1400ms" } as React.CSSProperties}>
        Educator · Author · Mentor
      </span>
    </div>
  );
}
