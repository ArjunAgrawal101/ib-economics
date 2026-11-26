/**
 * Original illustrations, one per discipline. Pure SVG, decorative
 * (aria-hidden), with restrained CSS motion that stops for reduced motion.
 */
import { cn } from "@/lib/utils";

type MotifProps = { className?: string; tone?: "light" | "dark" };

const motionCss = `
@media (prefers-reduced-motion: no-preference) {
  .m-shift { animation: m-shift 7s ease-in-out infinite alternate; }
  .m-float { animation: m-float 9s ease-in-out infinite alternate; }
  .m-float-2 { animation: m-float 11s ease-in-out -3s infinite alternate; }
  .m-dash { stroke-dasharray: 4 7; animation: m-dash 6s linear infinite; }
  .m-pulse { animation: m-pulse 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .m-spin { animation: m-spin 90s linear infinite; transform-box: view-box; transform-origin: 50% 50%; }
  .m-arc { stroke-dasharray: 6 10; animation: m-dash 8s linear infinite; }
}
@keyframes m-shift { from { transform: translateX(0); } to { transform: translateX(34px); } }
@keyframes m-float { from { transform: translateY(0); } to { transform: translateY(-10px); } }
@keyframes m-dash { to { stroke-dashoffset: -110; } }
@keyframes m-pulse { 0%,100% { transform: scale(1); opacity: .9; } 50% { transform: scale(1.35); opacity: .45; } }
@keyframes m-spin { to { transform: rotate(360deg); } }
`;

export function MotifStyles() {
  return <style>{motionCss}</style>;
}

/* ── Economics: a market in motion ────────────────────────────────────────── */

export function EconomicsMotif({ className, tone = "light" }: MotifProps) {
  const ink = tone === "light" ? "#0c1a30" : "#f5f0e6";
  const acc = tone === "light" ? "#1f6f61" : "#86c9b6";
  const faint = tone === "light" ? "rgba(12,26,48,0.08)" : "rgba(245,240,230,0.08)";
  return (
    <svg viewBox="0 0 480 400" className={cn("h-auto w-full", className)} aria-hidden fill="none">
      {/* graph paper */}
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`v${i}`} x1={60 + i * 32} y1="30" x2={60 + i * 32} y2="350" stroke={faint} />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`h${i}`} x1="60" y1={30 + i * 32} x2="444" y2={30 + i * 32} stroke={faint} />
      ))}
      {/* a background price series */}
      <path
        d="M60 300 L92 292 L124 296 L156 270 L188 278 L220 248 L252 256 L284 224 L316 232 L348 196 L380 206 L412 170 L444 178"
        stroke={acc}
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />
      {/* axes */}
      <path d="M60 30 V350 H444" stroke={ink} strokeWidth="1.5" />
      <text x="44" y="40" fill={ink} fontSize="15" fontStyle="italic" fontFamily="var(--font-serif)">P</text>
      <text x="436" y="374" fill={ink} fontSize="15" fontStyle="italic" fontFamily="var(--font-serif)">Q</text>
      {/* demand */}
      <path d="M96 70 C 200 150, 300 240, 410 320" stroke={ink} strokeWidth="2" />
      <text x="414" y="316" fill={ink} fontSize="14" fontFamily="var(--font-sans)" fontWeight="600">D</text>
      {/* supply, original */}
      <path d="M96 320 C 200 250, 300 150, 400 70" stroke={ink} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="5 6" />
      <text x="402" y="64" fill={ink} fillOpacity="0.5" fontSize="14" fontFamily="var(--font-sans)" fontWeight="600">S₁</text>
      {/* supply, shifting */}
      <g className="m-shift">
        <path d="M96 320 C 200 250, 300 150, 400 70" stroke={acc} strokeWidth="2.5" />
        <text x="402" y="64" fill={acc} fontSize="14" fontFamily="var(--font-sans)" fontWeight="700">S₂</text>
      </g>
      {/* equilibrium guides */}
      <path d="M60 196 H252 V350" stroke={acc} strokeOpacity="0.55" strokeDasharray="3 5" />
      <circle cx="252" cy="196" r="5.5" fill={acc} />
      <circle cx="252" cy="196" r="5.5" stroke={acc} className="m-pulse" />
      <text x="30" y="200" fill={acc} fontSize="13" fontStyle="italic" fontFamily="var(--font-serif)">P*</text>
      <text x="244" y="372" fill={acc} fontSize="13" fontStyle="italic" fontFamily="var(--font-serif)">Q*</text>
      {/* market network, top right */}
      <g className="m-float" opacity="0.9">
        {[
          [360, 250],
          [400, 222],
          [424, 262],
          [384, 290],
        ].map(([x, y], i, a) => (
          <g key={i}>
            <line x1={x} y1={y} x2={a[(i + 1) % a.length][0]} y2={a[(i + 1) % a.length][1]} stroke={acc} strokeOpacity="0.45" />
            <circle cx={x} cy={y} r="3.5" fill={tone === "light" ? "#fbf8f2" : "#0f203b"} stroke={acc} strokeWidth="1.5" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ── Business: a strategic matrix and a decision tree ─────────────────────── */

export function BusinessMotif({ className, tone = "light" }: MotifProps) {
  const ink = tone === "light" ? "#0c1a30" : "#f5f0e6";
  const acc = tone === "light" ? "#93541f" : "#e3ad74";
  const paper = tone === "light" ? "#fbf8f2" : "#0f203b";
  return (
    <svg viewBox="0 0 480 400" className={cn("h-auto w-full", className)} aria-hidden fill="none">
      {/* matrix */}
      <rect x="40" y="40" width="240" height="240" stroke={ink} strokeOpacity="0.5" />
      <line x1="160" y1="40" x2="160" y2="280" stroke={ink} strokeOpacity="0.3" />
      <line x1="40" y1="160" x2="280" y2="160" stroke={ink} strokeOpacity="0.3" />
      <rect x="160" y="40" width="120" height="120" fill={acc} fillOpacity="0.1" />
      <text x="40" y="304" fill={ink} fillOpacity="0.65" fontSize="11" letterSpacing="2" fontFamily="var(--font-sans)" fontWeight="600">CAPABILITY →</text>
      <text x="26" y="280" fill={ink} fillOpacity="0.65" fontSize="11" letterSpacing="2" fontFamily="var(--font-sans)" fontWeight="600" transform="rotate(-90 26 280)">OPPORTUNITY →</text>
      {/* portfolio positions */}
      <g className="m-float">
        <circle cx="222" cy="96" r="26" fill={acc} fillOpacity="0.85" />
        <circle cx="96" cy="112" r="14" stroke={acc} strokeWidth="2" fill={paper} />
      </g>
      <g className="m-float-2">
        <circle cx="210" cy="222" r="18" stroke={ink} strokeWidth="1.5" fill={paper} />
        <circle cx="88" cy="232" r="9" fill={ink} fillOpacity="0.5" />
      </g>
      {/* decision tree */}
      <rect x="300" y="146" width="22" height="22" fill={ink} />
      <path d="M322 157 C 350 157, 350 92, 380 92" stroke={ink} strokeWidth="1.5" />
      <path d="M322 157 C 350 157, 350 232, 380 232" stroke={ink} strokeWidth="1.5" />
      <path d="M322 157 C 350 157, 350 92, 380 92" stroke={acc} strokeWidth="2" className="m-dash" />
      <circle cx="391" cy="92" r="11" stroke={acc} strokeWidth="2" fill={paper} />
      <circle cx="391" cy="232" r="11" stroke={ink} strokeWidth="1.5" fill={paper} />
      {[56, 128].map((y) => (
        <path key={y} d={`M402 92 C 420 92, 420 ${y}, 440 ${y}`} stroke={acc} strokeWidth="1.5" />
      ))}
      {[200, 264].map((y) => (
        <path key={y} d={`M402 232 C 420 232, 420 ${y}, 440 ${y}`} stroke={ink} strokeOpacity="0.5" strokeWidth="1.5" />
      ))}
      {[56, 128].map((y) => (
        <path key={`t${y}`} d={`M440 ${y - 7} L452 ${y} L440 ${y + 7} Z`} fill={acc} />
      ))}
      {[200, 264].map((y) => (
        <path key={`u${y}`} d={`M440 ${y - 7} L452 ${y} L440 ${y + 7} Z`} fill={ink} fillOpacity="0.5" />
      ))}
      <text x="370" y="72" fill={acc} fontSize="12" fontStyle="italic" fontFamily="var(--font-serif)">p = 0.6</text>
      <text x="370" y="262" fill={ink} fillOpacity="0.6" fontSize="12" fontStyle="italic" fontFamily="var(--font-serif)">p = 0.4</text>
      {/* a small financial bar series */}
      <g transform="translate(300 300)">
        {[28, 40, 34, 52, 64].map((h, i) => (
          <rect key={i} x={i * 30} y={70 - h} width="16" height={h} fill={i === 4 ? acc : ink} fillOpacity={i === 4 ? 0.9 : 0.18} />
        ))}
        <line x1="-6" y1="70" x2="150" y2="70" stroke={ink} strokeOpacity="0.4" />
      </g>
      <path d="M40 330 H260" stroke={ink} strokeOpacity="0.15" />
      <path d="M40 350 H200" stroke={ink} strokeOpacity="0.15" />
    </svg>
  );
}

/* ── Political Studies & Global Affairs: a cartographic globe ─────────────── */

export function PoliticsMotif({ className, tone = "dark" }: MotifProps) {
  const ink = tone === "light" ? "#0c1a30" : "#f5f0e6";
  const acc = tone === "light" ? "#3a4795" : "#a3afef";
  const gold = tone === "light" ? "#b39350" : "#d6bd84";
  // Approximate positions on the visible hemisphere.
  const places: Array<{ x: number; y: number; label?: string }> = [
    { x: 292, y: 196, label: "18.52° N · 73.86° E" }, // Pune
    { x: 300, y: 160, label: "28.61° N · 77.21° E" }, // New Delhi
    { x: 168, y: 132 },
    { x: 196, y: 248 },
    { x: 360, y: 252 },
    { x: 236, y: 92 },
  ];
  return (
    <svg viewBox="0 0 480 400" className={cn("h-auto w-full", className)} aria-hidden fill="none">
      <g className="m-spin" opacity="0.6">
        <circle cx="240" cy="200" r="186" stroke={gold} strokeOpacity="0.5" strokeDasharray="1 7" />
      </g>
      <circle cx="240" cy="200" r="160" stroke={ink} strokeOpacity="0.55" strokeWidth="1.25" />
      {/* meridians */}
      {[0.25, 0.5, 0.75].map((k) => (
        <ellipse key={k} cx="240" cy="200" rx={160 * k} ry="160" stroke={ink} strokeOpacity="0.18" />
      ))}
      <line x1="240" y1="40" x2="240" y2="360" stroke={ink} strokeOpacity="0.18" />
      {/* parallels */}
      {[-110, -60, 0, 60, 110].map((dy) => {
        const w = Math.sqrt(160 * 160 - dy * dy);
        return <ellipse key={dy} cx="240" cy={200 + dy} rx={w} ry={w * 0.16} stroke={ink} strokeOpacity={dy === 0 ? 0.32 : 0.14} />;
      })}
      {/* relationships */}
      {[
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 5],
        [1, 2],
        [3, 4],
      ].map(([a, b], i) => {
        const p = places[a];
        const q = places[b];
        const mx = (p.x + q.x) / 2;
        const my = Math.min(p.y, q.y) - 46;
        return (
          <path
            key={i}
            d={`M${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`}
            stroke={acc}
            strokeWidth="1.5"
            strokeOpacity="0.85"
            className={i % 2 === 0 ? "m-arc" : undefined}
          />
        );
      })}
      {places.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={i < 2 ? 5 : 3.5} fill={i < 2 ? gold : acc} />
          {i === 0 && <circle cx={p.x} cy={p.y} r="5" stroke={gold} className="m-pulse" />}
        </g>
      ))}
      {/* coordinate labels */}
      <line x1="296" y1="200" x2="330" y2="232" stroke={gold} strokeOpacity="0.6" />
      <text x="334" y="244" fill={gold} fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="1">
        {places[0].label}
      </text>
      <line x1="304" y1="156" x2="330" y2="122" stroke={gold} strokeOpacity="0.4" />
      <text x="334" y="118" fill={gold} fillOpacity="0.75" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600" letterSpacing="1">
        {places[1].label}
      </text>
      {/* constitutional column motif */}
      <g transform="translate(46 300)" stroke={ink} strokeOpacity="0.35">
        <path d="M0 0 H52 M4 6 H48 M8 6 V52 M18 6 V52 M28 6 V52 M38 6 V52 M44 6 V52 M0 58 H52" />
      </g>
    </svg>
  );
}

export const motifFor = {
  economics: EconomicsMotif,
  business: BusinessMotif,
  politics: PoliticsMotif,
} as const;
