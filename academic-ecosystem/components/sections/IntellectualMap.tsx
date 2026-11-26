"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { intersections, mapClusters } from "@/data/content";
import type { PlatformId } from "@/data/site";
import { accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * SECTION 03 · The world does not exist in silos.
 * An intellectual map: three disciplines, fifteen ideas and the four places
 * they meet. Choosing an intersection (from the list, or on the map) brings
 * forward the ideas it draws together. Everything is legible without motion.
 */

// Canvas: 1000 × 780
const W = 1000;
const H = 780;
const hubs: Record<PlatformId, { x: number; y: number }> = {
  politics: { x: 500, y: 170 },
  economics: { x: 205, y: 590 },
  business: { x: 795, y: 590 },
};
const centroid = { x: 500, y: 468 };
const HUB_R = 74;

/** Hand-placed so that no two labels collide at any size. */
const LAYOUT: Record<string, { x: number; y: number }> = {
  Power: { x: 318, y: 186 },
  Institutions: { x: 352, y: 74 },
  Governance: { x: 500, y: 30 },
  Sovereignty: { x: 648, y: 74 },
  "International Relations": { x: 700, y: 190 },
  "Monetary Policy": { x: 104, y: 468 },
  Trade: { x: 56, y: 584 },
  "Public Finance": { x: 92, y: 694 },
  Development: { x: 222, y: 748 },
  Markets: { x: 352, y: 708 },
  Strategy: { x: 896, y: 468 },
  Leadership: { x: 944, y: 584 },
  Finance: { x: 912, y: 694 },
  Innovation: { x: 778, y: 748 },
  Management: { x: 648, y: 708 },
};

function conceptPositions() {
  return mapClusters.flatMap((c) =>
    c.concepts.map((label) => ({ cluster: c.id, label, x: LAYOUT[label]?.x ?? hubs[c.id].x, y: LAYOUT[label]?.y ?? hubs[c.id].y })),
  );
}

const concepts = conceptPositions();

const nodeFor = (between: PlatformId[]) => {
  if (between.length === 3) return centroid;
  const [a, b] = between.map((id) => hubs[id]);
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
};

const pct = (x: number, y: number) => ({ left: `${((x / W) * 100).toFixed(2)}%`, top: `${((y / H) * 100).toFixed(2)}%` });

export function IntellectualMap() {
  const [active, setActive] = useState(intersections[intersections.length - 1].id);
  const current = intersections.find((i) => i.id === active)!;
  const lit = new Set(current.concepts);
  const litHubs = new Set(current.between);

  return (
    <section aria-labelledby="map-title" className="section-y relative overflow-hidden border-y border-rule bg-[#efe9dd]">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="The intellectual connection"
          id="map-title"
          align="split"
          title={
            <>
              The world does not exist <em className="text-gold-deep">in silos.</em>
            </>
          }
          intro={
            <>
              <p>
                Markets are shaped by institutions. Businesses operate within political and economic systems. Global
                affairs influence development, trade, investment and decision-making.
              </p>
              <p className="mt-4">The most meaningful questions often emerge where disciplines intersect.</p>
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* The map (tablet and up) */}
          <div className="relative hidden md:block lg:col-span-7">
            <div className="relative mx-auto aspect-[1000/780] w-full max-w-[760px]">
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden fill="none">
                <defs>
                  <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#b39350" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#b39350" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx={centroid.x} cy={centroid.y} r="230" fill="url(#map-glow)" />
                {/* hub-to-hub edges */}
                {(
                  [
                    ["economics", "politics"],
                    ["economics", "business"],
                    ["business", "politics"],
                  ] as Array<[PlatformId, PlatformId]>
                ).map(([a, b]) => {
                  const on = litHubs.has(a) && litHubs.has(b);
                  return (
                    <line
                      key={a + b}
                      x1={hubs[a].x}
                      y1={hubs[a].y}
                      x2={hubs[b].x}
                      y2={hubs[b].y}
                      stroke={on ? "#0c1a30" : "#0c1a30"}
                      strokeOpacity={on ? 0.75 : 0.16}
                      strokeWidth={on ? 1.75 : 1}
                      style={{ transition: "stroke-opacity .5s, stroke-width .5s" }}
                    />
                  );
                })}
                {/* hubs to centre */}
                {(Object.keys(hubs) as PlatformId[]).map((id) => (
                  <line
                    key={id}
                    x1={hubs[id].x}
                    y1={hubs[id].y}
                    x2={centroid.x}
                    y2={centroid.y}
                    stroke="#b39350"
                    strokeOpacity={current.between.length === 3 ? 0.8 : 0.25}
                    strokeDasharray="3 6"
                    style={{ transition: "stroke-opacity .5s" }}
                  />
                ))}
                {/* spokes */}
                {concepts.map((c) => {
                  const on = lit.has(c.label);
                  return (
                    <line
                      key={c.label}
                      x1={hubs[c.cluster].x}
                      y1={hubs[c.cluster].y}
                      x2={c.x}
                      y2={c.y}
                      stroke={accent[c.cluster].hex}
                      strokeOpacity={on ? 0.9 : 0.2}
                      strokeWidth={on ? 1.5 : 1}
                      style={{ transition: "stroke-opacity .5s" }}
                    />
                  );
                })}
                {/* hubs */}
                {(Object.keys(hubs) as PlatformId[]).map((id) => (
                  <g key={id}>
                    <circle cx={hubs[id].x} cy={hubs[id].y} r={HUB_R} fill="#fbf8f2" stroke={accent[id].hex} strokeWidth={litHubs.has(id) ? 2 : 1} />
                    <circle cx={hubs[id].x} cy={hubs[id].y} r={HUB_R + 9} stroke={accent[id].hex} strokeOpacity={litHubs.has(id) ? 0.4 : 0.1} />
                  </g>
                ))}
              </svg>

              {/* hub labels */}
              {mapClusters.map((c) => (
                <span
                  key={c.id}
                  aria-hidden
                  className={cn("display absolute -translate-x-1/2 -translate-y-1/2 text-[1.125rem] lg:text-[1.3125rem]", accent[c.id].textDeep)}
                  style={pct(hubs[c.id].x, hubs[c.id].y)}
                >
                  {c.label}
                </span>
              ))}

              {/* concepts */}
              {concepts.map((c) => (
                <span
                  key={c.label}
                  aria-hidden
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.75rem] font-semibold transition-[opacity,background-color,color,border-color] duration-500 lg:text-[0.8125rem]",
                    lit.has(c.label) ? "border-transparent text-ivory opacity-100" : "border-rule bg-paper text-charcoal opacity-60",
                  )}
                  style={{ ...pct(c.x, c.y), backgroundColor: lit.has(c.label) ? accent[c.cluster].hex : undefined }}
                >
                  {c.label}
                </span>
              ))}

              {/* intersection nodes (pointer shortcut; the list beside is the accessible control) */}
              {intersections.map((it) => {
                const n = nodeFor(it.between);
                const on = it.id === active;
                return (
                  <button
                    key={it.id}
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => setActive(it.id)}
                    className={cn(
                      "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-[3px] border px-3 py-1.5 text-left text-[0.75rem] font-bold leading-tight shadow-sm transition-[background-color,color,border-color,transform] duration-300 lg:text-[0.8125rem]",
                      on ? "scale-105 border-ink bg-ink text-ivory" : "border-gold/60 bg-ivory text-ink hover:border-ink",
                      it.between.length === 3 ? "max-w-[190px]" : "max-w-[170px]",
                    )}
                    style={pct(n.x, n.y)}
                  >
                    <span aria-hidden className={cn("size-1.5 shrink-0 rotate-45", on ? "bg-gold-light" : "bg-gold")} />
                    {it.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Control list and detail: all sizes */}
          <div className="lg:col-span-5">
            <MiniTriangle between={current.between} />
            <p id="map-list-label" className="eyebrow mt-8 text-slate md:mt-0">Where the disciplines meet</p>
            <ul role="list" aria-labelledby="map-list-label" className="mt-4 border-t border-rule">
              {intersections.map((it) => {
                const on = it.id === active;
                return (
                  <li key={it.id} className="border-b border-rule">
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-controls="map-detail"
                      onClick={() => setActive(it.id)}
                      className="group flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span aria-hidden className="flex shrink-0 gap-1">
                        {it.between.map((id) => (
                          <span key={id} className={cn("size-2 rounded-full transition-opacity", accent[id].bg, on ? "opacity-100" : "opacity-40")} />
                        ))}
                      </span>
                      <span className={cn("display flex-1 text-[1.375rem] leading-tight transition-colors", on ? "text-ink" : "text-slate group-hover:text-ink")}>
                        {it.title}
                      </span>
                      <span aria-hidden className={cn("h-px bg-gold transition-[width] duration-500", on ? "w-8" : "w-0")} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div id="map-detail" aria-live="polite" className="mt-8 rounded-[4px] border border-rule bg-paper p-6 sm:p-7">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-slate">
                {current.between.map((b) => mapClusters.find((c) => c.id === b)!.label).join(" + ")}
              </p>
              <p className="mt-3 font-serif text-[1.375rem] italic leading-snug text-ink">{current.question}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate">{current.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Ideas involved">
                {current.concepts.map((c) => {
                  const cluster = mapClusters.find((m) => m.concepts.includes(c))!.id;
                  return (
                    <li key={c} className={cn("rounded-full px-3 py-1 text-[0.8125rem] font-semibold", accent[cluster].bgSoft, accent[cluster].textDeep)}>
                      {c}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A small triangle for phones: which disciplines this intersection joins. */
function MiniTriangle({ between }: { between: PlatformId[] }) {
  const pts: Record<PlatformId, [number, number]> = { politics: [100, 18], economics: [22, 132], business: [178, 132] };
  const labels: Record<PlatformId, string> = { politics: "Politics", economics: "Economics", business: "Business" };
  const on = new Set(between);
  const edges: Array<[PlatformId, PlatformId]> = [
    ["economics", "politics"],
    ["economics", "business"],
    ["business", "politics"],
  ];
  return (
    <div className="md:hidden" aria-hidden>
      <svg viewBox="-30 0 260 170" className="mx-auto h-auto w-full max-w-[300px]" fill="none">
        {edges.map(([a, b]) => (
          <line
            key={a + b}
            x1={pts[a][0]}
            y1={pts[a][1]}
            x2={pts[b][0]}
            y2={pts[b][1]}
            stroke="#0c1a30"
            strokeOpacity={on.has(a) && on.has(b) ? 0.8 : 0.15}
            strokeWidth={on.has(a) && on.has(b) ? 2 : 1}
          />
        ))}
        {between.length === 3 && <circle cx="100" cy="94" r="7" fill="#b39350" />}
        {(Object.keys(pts) as PlatformId[]).map((id) => (
          <g key={id}>
            <circle cx={pts[id][0]} cy={pts[id][1]} r="9" fill={on.has(id) ? accent[id].hex : "#fbf8f2"} stroke={accent[id].hex} strokeWidth="1.5" />
            <text
              x={pts[id][0]}
              y={id === "politics" ? pts[id][1] - 2 : pts[id][1] + 28}
              dx={id === "politics" ? 18 : 0}
              textAnchor={id === "politics" ? "start" : "middle"}
              fontSize="13"
              fontWeight="600"
              fill="#0c1a30"
              fontFamily="var(--font-sans)"
            >
              {labels[id]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
