# R2 red-team: every economics diagram

**Scope.** This covers `index.html`, served from the working tree at http://localhost:8765. The repo was not edited.

**The file changed while I worked.** Someone else is editing `index.html` at the same time. There is an uncommitted "RENAISSANCE" block of about 823 added lines. Line numbers are therefore given as of about 07:40 and will drift, so every fix below is also located by its function name and an exact old snippet. Section 3 covers the new motif diagrams, which are work in progress.

## Method

- Every `DG` key was rendered: 29 engine models (`M2`) plus 7 schematics.
- The following were also rendered:
  - the Market lab: 5 modes × 3 supply positions (c) × 3 slope pairs, plus full sweeps of c × B × D × t/s;
  - the AD-AS lab: 2 models × 9 states;
  - the calculation-board diagrams, the Economist's View, the Lorenz builder, the FX lab with all 7 shifts, and the multiplier lab;
  - all 16 Everywhere labs, and the 24 new motifs.
- **Geometry checks** (in-page `getBBox` and SVG geometry):
  - every marker lies on a curve;
  - no text box overlaps another or leaves the viewBox;
  - no curve crosses a label.
- **Economics recomputed by hand** for every plate: intersections, MR slope, MC at minimum AC, tax wedge, incidence areas, Gini, Keynesian AS ranges, Phillips A/B/C, and so on.
- **Earlier assertions.** All 20 assertions from the previous audit (`assertions.js`) still pass, and `window.__failed` is `[]` on the current build. Nothing fixed earlier has regressed.
- **Screenshots** at 390 px and 1440 px are in `scratchpad/shots/graphs/`.
- **Fixes tested.** Fixes G1–G5 and G7 were applied to a scratch copy (`scratchpad/r2/site/`, via `r2/patch.py`). All built-in self-tests pass on it (`__failed=[]`), and the targeted checks flip from failing to passing:
  - negative-quantity tax cases go from 28 to 0;
  - `Pp` is now visible in the subsidy lab;
  - the AD-AS short-run marker is present.

Severity counts: **WRONG ECONOMICS 3 · MISLEADING 5 · COSMETIC 9.** Known cosmetic items that were deferred earlier are listed, not re-reported.

---

## 1. Per-diagram verdicts

### DG model plates (engine: `renderModel`, ~l.12330; models ~l.12470–13160)

The engine's own marker validation passes on every plate (`valid=true`).

| Plate | Verdict |
|---|---|
| `ds` | PASS. E(100,10); CS = PS = 500. |
| `dshift` | PASS. E₁(120,12), E₂(80,8). |
| `sshift` | PASS. |
| `ped` | PASS. Both D curves pass through (100,10); PED −2 and −0.33. |
| `pes` | PASS. Intercept rule correct; PES 2 and 0.33. |
| `tax` | PASS. Wedge Pc − Pp = 12 − 8 = 4 = t. The burden rectangles lie on the correct sides of P₀. DWL apex is at E₀. |
| `subsidy` | PASS. |
| `ceiling` | PASS. DWL 160 between D and S over Qs..Q₀. |
| `floor` | PASS. |
| `labour` | PASS. |
| `negprod`, `negcons`, `posprod`, `poscons` | PASS on the economics: the triangle spans Qopt..Qmarket with its apex at E social. DWL labels are crossed by one curve (known, deferred). |
| `monopoly` | PASS. MR = 20 − 0.2Q (same intercept as AR, twice the slope); MC = MR at 80; P = 12 read from AR; profit 320; DWL 320. The cost structure is constant MC with falling ATC (natural-monopoly shape), so "MC cuts AC at its minimum" does not apply. This is internally consistent. |
| `tariff`, `quota` | PASS. Quota Pd = 8. S + quota passes through (Qd₁, Pd). |
| `adas`, `defgap`, `infgap`, `costpush`, `growth` | PASS. Axes are "Real output (Y, $bn)" and "Price level (index)". LRAS is vertical at Yf. Shift directions match the titles. |
| `lras` (Keynesian AS) | PASS. Horizontal, then rising, then vertical at Yf. E₁ (200,100), E₂ (314.3,142.9) and E₃ (400,220) each fall in the correct range. |
| `phillips` | PASS on the economics: A(5,5) → B(3,9) → C(5,9); SRPC shifts up; LRPC vertical at the NRU. **G9** (duplicate label). |
| `ppc` | PASS on the economics. **G10** (kinked tail). |
| `compadv` | PASS. Opportunity costs 0.5 and 1; A has CA in wheat. |
| `lorenz` | PASS. Cumulative 5/15/31/55/100; Gini 0.376; A and B labels correct. **G11** (label). |
| `fx` | PASS. Axis convention "foreign per 1 domestic"; e 1.0 → 0.9 is a 10% depreciation. |

### DG schematics

| Plate | Verdict |
|---|---|
| `pubgood` | PASS. Qopt at (.535,.445) and Qmarket at (.331,.279) are the exact line intersections. |
| `cpr` | PASS. Sustainable point at MSC ∩ MSB; unregulated at MPB ∩ MPC (.69,.33); DWL bounded by MSC and MSB. |
| `circular` | PASS. Injections enter spending; withdrawals leave income; flows have direction. |
| `bop` | PASS. |
| `multiplier` | PASS. |
| `asym` | PASS. The marker is still about 10 px off, as known and deferred. |
| `cycle` | **G12** (cosmetic). |

### Other diagrams

| Diagram | Verdict |
|---|---|
| Market lab (`mkt`/`mktSVG`) | **G1, G4, G13.** |
| AD-AS lab (`adasSolve`/`adasSVG`) | **G3.** Keynesian mode: PASS in all 9 states, with the marker on AD and on the piecewise AS. |
| Calculation board (`calcSVG`) | CS and PS: PASS. Tax: the geometry passes; **G14** (labels). |
| Economist's View (`evSVG`) | PASS. P₀ 10, Pc 12.25, Pp 9.25; no overlaps. |
| Lorenz builder (`lorenzSVG`) | **G5.** Gridlines now match the axis labels, so the earlier D21 is fixed. |
| FX lab | PASS on the economics: the Marshall–Lerner sign agrees with the flag, and D/S shift directions are right for all 7 stories. The D and S labels sit on their lines (G15). |
| Multiplier lab | PASS. |
| Everywhere labs: price, tax, minwage (competitive and monopsony: MCL = 4 + 0.3L, L at MRP = MCL, wage read from S), ext, trade, infl, grow, fx, rates, dist, game, pubgood, gym, network | PASS on the economics. Curve labels are struck through by their own lines (G15). |
| Everywhere AD-AS explorer | **G2.** |
| Hero/subject art, `heroPlot` (legacy) | PASS. The intersection is at the marker. |
| RENAISSANCE motifs (new, uncommitted) | See section 3. |
| Mobile (390 px) | No horizontal page scroll. Text on the DG plates is too small to read: **G16.** |

---

## 2. Issues

### G1. WRONG ECONOMICS: the Market lab tax mode produces negative quantity, negative revenue and a marker outside the axes

**Where.** `mkt()` (l.~4951) and the tax slider in `marketLab()` (l.~5040).

**What is wrong.**
- When supply meets the price axis (c = −20), a tax larger than A/B + c/D pushes S + tax entirely above the demand intercept. The lab keeps computing anyway.
- Example: B = 20, D = 4, t = 8.
  - The lab computes Q = −10, Pc = 10.5, and revenue = 8 × (−10) = −80.
  - The welfare loss is reported as ½ × 8 × (16.7 + 10) = 107.
  - The marker is drawn at x = 44 px, left of the y-axis at 70 px.
  - The axis label reads "Q -10" (screenshot `mkt-tax-negQ-1440.png`).
- A sweep finds 28 (c, B, D, t) combinations with Q ≤ 0 across 17 slider settings.
- The code comment says the market "always clears at a positive quantity", but that holds only without the tax. The existing self-test uses t = 4, so it never reaches these cases.

**Fix.**
```js
// 1. after mktFloorMax
old: function mktFloorMax(B){return Math.min(18,Math.floor((LABA/B-.25)*2)/2)}
new: function mktFloorMax(B){return Math.min(18,Math.floor((LABA/B-.25)*2)/2)}
     function mktTaxMax(B,D,c){return Math.max(1,Math.min(8,Math.ceil(LABA/B+(c||0)/D)-1))}
// 2. in mkt()
old: if(LAB.mode==="tax"){const t=LAB.t;o.t=t;
new: if(LAB.mode==="tax"){const t=Math.min(LAB.t,mktTaxMax(B,D,c));o.t=t;
// 3. slider in marketLab()
old: Specific tax · $${LAB.t}</label><input type="range" min="1" max="8" step="1" value="${LAB.t}"
new: Specific tax · $${o.t}</label><input type="range" min="1" max="${mktTaxMax(LAB.B,LAB.D,LAB.c)}" step="1" value="${o.t}"
```
The maximum tax is at least 4 at every setting, so the existing tests (t = 4) and the WHATIF "tax is doubled" item are unaffected. Tested: 0 negative cases, self-tests green.

### G2. WRONG ECONOMICS: the Everywhere AD-AS explorer draws the "original SRAS" 50 index points below the real one

**Where.** `EELABS.adas.out` (l.~33450).

**What is wrong.**
- The model is SRAS: P = 50 + sAS + 0.5(Y − k), so the baseline passes through (40,70) and (160,130).
- The faint "before" line is drawn through (40,20) and (160,80), that is P = 0.5Y. It is 50 points too low and does not pass through the starting equilibrium (100,100).
- At baseline the chart therefore shows two supply curves. After, say, energy +10, it suggests a leftward shift of 60 rather than 10 (screenshots `ee-adas-1440.png`, `ee-adas-energy-1440.png`).
- The faint AD line, (40,160)–(160,40), is correct.

**Fix.**
```js
old: {p:[[40,20],[160,80]],c:"sup",faint:true}
new: {p:[[40,70],[160,130]],c:"sup",faint:true}
```

### G3. MISLEADING (borderline WRONG): the monetarist AD-AS lab plots the equilibrium off the drawn SRAS whenever output is capped by anything other than an AD increase

**Where.** `adasSolve()` (l.~5069, 5074, 5076).

**What is wrong.**
- `sr` (the short-run point plus SRAS₁) is built only when `dAD>0`.
- *"Supply-side gain" preset* (dAS = +150, Yf = 1000): the solid marker is at (1000, 100), 0 px from the old, faded SRAS but not on the solid SRAS₁ (Y = 10P + 150).
  - The drawn AD and SRAS actually cross at (1075, 92.5).
  - The note says the shift "changes neither output nor the price level" and that "output cannot exceed [potential] in this model". That is false for the short run in the NC model.
  - Screenshot: `adas-m-supplygain-1440.png`.
- *Yf lowered to 800 with no shocks*: the marker is at (800, 120), 94.6 px from SRAS. The curves visibly cross at (1000, 100), and nothing explains the gap.
- The dAD > 0 case was fixed earlier (D6); these two paths were missed.

**Fix.** Tested; all self-tests pass, including "note's verbs agree" and "preset leaves output unchanged".
```js
old: const sr=model==="m"&&cap&&dAD>0?{P:(2000+dAD-dAS)/20,Y:(2000+dAD+dAS)/2}:null;
new: const sr=model==="m"&&cap?{P:(2000+dAD-dAS)/20,Y:(2000+dAD+dAS)/2}:null;

old: else if(dAD&&!dAS&&sr)note=
new: else if(dAD>0&&!dAS&&sr)note=

old: cap?"The economy is already at potential output, and output cannot exceed it in this model, so a rise in short-run supply on its own changes neither output nor the price level. A lasting supply-side gain has to raise potential output itself: raise Yf as well, and output rises while the price level falls.":"Output rises while
new: cap?(sr?`In the short run (hollow marker) output goes to $${sr.Y.toFixed(0)}bn, beyond potential, with the price level down at ${sr.P.toFixed(1)}. That does not last: with output above capacity, money wages rise and SRAS shifts back (dashed SRAS₁) until the economy is at potential again at a price level of ${P.toFixed(1)} (solid marker). A lasting supply-side gain has to raise potential output itself: raise Yf as well, and output rises while the price level falls.`:"The economy is already at potential output, and output cannot exceed it in this model, so a rise in short-run supply on its own changes neither output nor the price level. A lasting supply-side gain has to raise potential output itself: raise Yf as well, and output rises while the price level falls."):"Output rises while
```
Optional: append the same `sr` sentence to the `!dAD&&!dAS` baseline note for Yf < 1000.

### G4. MISLEADING: the Market lab subsidy mode crops Pp, the expenditure rectangle and the DWL apex off the top of the plot

**Where.** `mktSVG()` (l.~4965).

**What is wrong.**
- The y-range is `Pm=A/B*1.06`, but under a subsidy Pp = Pc + s can exceed it.
- Example: B = 20, D = 4, s = 8 gives Pp = 15.0 against Pm = 10.6. The "Pp 15.0" label is drawn at y = −101 (invisible), and the rectangle runs over the y-axis title (`mkt-sub-crop-1440.png`).
- 404 of the 2,448 subsidy settings are affected.

**Fix.**
```js
old: const Pm=o.A/o.B*1.06,Qm=Math.max(o.A,o.mode==="floor"?o.qs:0)*1.04;
new: const Pm=Math.max(o.A/o.B,o.mode==="sub"?o.Pp:0)*1.06,Qm=Math.max(o.A,o.mode==="floor"?o.qs:0)*1.04;
```

### G5. MISLEADING: the Lorenz builder shades area B while its key says "The area the Gini coefficient measures"

**Where.** `lorenzSVG()` (l.~23478) and `lorenzKey()`.

**What is wrong.**
- The polygon runs (0,0) → curve → (1,1) → (1,0), which is the area under the Lorenz curve (B).
- The page text and the Gini (A/(A+B)) are about the area between the diagonal and the curve (A). Screenshot: `tool-lorenz-1440.png`.

**Fix.** The closing edge then runs along the diagonal, so the shaded region becomes A.
```js
old: <polygon points="${X(0)},${Y(0)} ${pts} ${X(1)},${Y(0)}" fill="#0C2340" opacity=".07"/>
new: <polygon points="${pts}" fill="#0C2340" opacity=".07"/>
```

### G6. MISLEADING (work in progress, uncommitted): the motif business cycle puts "peak" and "trough" about 15 px off the turning points

**Where.** `MOTIFS.cycle` (l.~36059).

**What is wrong.**
- The code uses `pk=(π/2)/1.25`, `tg=(3π/2)/1.25`, which are the sine extrema. The trend slope of 0.55 moves the real extrema of ac(t) = 2 + 0.55t + 1.15 sin(1.25t) to t = 1.571 and t = 3.456.
- The dots are at 1.257 and 3.770: 0.314 units, about 15 px, sitting on the rising and falling flanks.
- This is the same class of error as the earlier D2 finding.

**Fix.**
```js
old: const pk=(Math.PI/2)/1.25, tg=(3*Math.PI/2)/1.25;
new: const pk=(Math.PI-Math.acos(0.55/1.4375))/1.25, tg=(Math.PI+Math.acos(0.55/1.4375))/1.25;
```

### G7. WRONG ECONOMICS (work in progress, uncommitted): motif mapping shows a negative-externality figure and caption on the public-goods subtopic

**Where.** `MOTIF_SUB` (l.~36133).

**What is wrong.**
- `"2.9":"ext"` puts "Fig. A negative production externality: output exceeds the social optimum" on the 2.9 public goods page. Public goods are about under-provision, not over-production.
- Lesser mismatches:
  - `"2.4":"game"` puts a pricing-game/Nash caption on 2.4, which is behavioural critique of rational choice;
  - `"4.9"` and `"4.10"` use `"cycle"`, the business cycle, on the development pages.

**Fix.**
```js
old: "2.9":"ext"      new: "2.9":"model"
old: "2.4":"game"     new: "2.4":"model"
```
Optionally, `"4.9":"cycle","4.10":"cycle"` → `"4.9":"ppc","4.10":"ppc"`.

### G8. COSMETIC (work in progress): motif labels run past the 600-wide viewBox and are clipped

**Where.** `mLine` labels in `MOTIFS` (l.~35900+).

**What is wrong.** These labels extend beyond x = 600:
- ext: "D = MPB = MSB" and "S = MPC";
- labour: "D labour" and "S labour";
- tariff: "D domestic" and "S domestic";
- elastic: "relatively elastic";
- cycle: "actual output";
- scatter: "fitted line".

The cause is that the label is drawn at `mX(10)+6` = 546, leaving only 54 px.

**Fix.** Pass an earlier `lq`, for example `mLine(F.D,0.6,10,"dem","D = MPB = MSB",9.2)` → `...,"D = MPB = MSB",7.6)`. Alternatively, in `mLine` use `text-anchor="end"` when `mX(q)>480`.

**Rendering note.** Rendered in isolation, the motifs are also washed out by the hero gradient. They could not be verified in place because the block was still being edited.

### G9. COSMETIC: the Phillips plate labels 9% twice, with the second label 11 px lower so it reads as about 8.6%

**Where.** `defModel("phillips")` (l.~13062). B and C share π = 9.

**Fix.**
```js
old: {q:C.q,p:C.p,yLab:NUM(C.p)+"%",col:"#E4DED2",lc:CW}],
new: {q:C.q,p:C.p,col:"#E4DED2",lc:CW}],
```

### G10. COSMETIC: PPC arcs show a visible kink near the x-intercept

**Where.** `defModel("ppc")` (l.~13076).

**What is wrong.** Sampling is uniform in x, so the last segment runs from (97.5, 17.8) straight to (100, 0), a 70 px near-vertical chord (`atlas-ppc-1440.png`).

**Fix.**
```js
old: const pts=[];for(let i=0;i<=40;i++){const x=p.a*i/40;pts.push([x,p.b*Math.sqrt(Math.max(0,1-(x/p.a)*(x/p.a)))])}
  const out=[];for(let i=0;i<=40;i++){const x=p.a*p.g*i/40;out.push([x,p.b*p.g*Math.sqrt(Math.max(0,1-(x/(p.a*p.g))*(x/(p.a*p.g))))])}
new: const arc=(a,b)=>{const r=[];for(let i=0;i<=60;i++){const th=Math.PI/2*i/60;r.push([a*Math.sin(th),b*Math.cos(th)])}return r};
  const pts=arc(p.a,p.b),out=arc(p.a*p.g,p.b*p.g);
```
The chord error is below 0.05 px, so the A and C on-curve checks still pass within `TOLPX`.

### G11. COSMETIC: the "Lorenz curve" label on the lorenz plate is struck by the curve and touches the end marker

**Where.** `defModel("lorenz")`, curve `LZ`.

**Fix.**
```js
old: labDx:-12,labDy:16
new: labDx:-70,labDy:40
```
This places the label in area B, to the right of the steep last segment. Check the result visually.

### G12. COSMETIC: `DG.cycle` markers are about 9 px from the true turning points

**Where.** `DG.cycle` (l.~3411). The trend slope shifts the extrema of trend + sine.

**Fix.**
```js
old: P.pt(gx(.49),gy(.66),G.C.p)+P.t(gx(.49),gy(.72),"peak"
new: P.pt(gx(.5065),gy(.6653),G.C.p)+P.t(gx(.5065),gy(.72),"peak"
old: P.pt(gx(.31),gy(.284),G.C.w)+P.t(gx(.31),gy(.21),"trough"
new: P.pt(gx(.2935),gy(.2787),G.C.w)+P.t(gx(.2935),gy(.21),"trough"
```

### G13. COSMETIC: the Market lab subsidy label reads "S + subsidy" and sits on the equilibrium marker and the D label

**Where.** `mktSVG()` (l.~4997).

**What is wrong.** The model plate says "S − subsidy". Example: B = 4, D = 16, s = 8 (`mkt-sub-label-1440.png`).

**Fix.** Tested; no overlaps in the sweep.
```js
old: if(o.mode==="sub")b+=P.t(X(S0[2])-4,Y(Math.max(0,S0[3]-o.s))+12,"S + subsidy",{a:"end",c:G.C.ok,sz:11.5});
new: if(o.mode==="sub")b+=P.t(X(Ss[2])-4,Y(Ss[3])-6,"S − subsidy",{a:"end",c:G.C.ok,sz:11.5});
```

### G14. COSMETIC: the calculation-board tax diagram has no curve labels, and the Q₁/Q₀ ticks collide when the two are close

**Where.** `calcSVG` tax branch (l.~6426).

**What is wrong.**
- D, S and S + tax are unlabelled.
- With q₀ = 620 and q₁ = 580, the tick labels "Q₁ 580" and "Q₀ 620" overlap by 12 px (`calc-taxrev-1440.png`).

**Fix.**
```js
old: +P.t(x(q0),y(0)+16,"Q₀ "+q0,{a:"middle",sz:11,mono:1});
new: +P.t(x(q0),y(0)+(x(q0)-x(q1)<52?30:16),"Q₀ "+q0,{a:"middle",sz:11,mono:1})
     +P.t(x(Qm)-4,y(Math.max(0,Dp(Qm)))-8,"D",{a:"end",c:G.C.d,sz:12})
     +P.t(x(Qm)-4,y(Sp(Qm))+14,"S",{a:"end",c:G.C.s2,sz:12})
     +P.t(x(Qm)-4,y(Sp(Qm)+t)-6,"S + tax",{a:"end",c:G.C.s,sz:11.5});
```
The same applies to the surplus branch: add "D" or "S" at the line end.

### G15. COSMETIC: labels on the Everywhere and FX lab charts are struck through by their own lines

**Where.**
- Everywhere chart labels (`eeChart`), for example "S = ACL", "D = MRP", "MCL", "AD", "SRAS", "S + tax";
- the FX lab's "D" and "S".

**Fix.** Add a halo in CSS (l.~1160):
```css
old: .ee-chart text[class^="ee-t-"]{font-size:12.5px;font-weight:700}
new: .ee-chart text[class^="ee-t-"]{font-size:12.5px;font-weight:700;paint-order:stroke;stroke:var(--white);stroke-width:4px;stroke-linejoin:round}
```
Check this against the dark theme's panel background.

### G16. COSMETIC (readability): DG plates are unreadable at 390 px

**What is wrong.** The 660-unit viewBox renders about 322 px wide inside the `.plate` padding (scale 0.49). The 10–11 px labels therefore become about 5 px (`atlas-tax-390.png`, `atlas-lras-390.png`). The Everywhere charts already solve this with a media query at l.~1207.

**Fix, minimal.** Append to the CSS:
```css
@media(max-width:520px){.plate{padding:10px 4px 10px}}
```
**Fix, better.** Enlarge text in `svg[viewBox="0 0 660 442"] text`, for example to `font-size:17px` under that media query. This needs a collision re-check, so it is not proposed blind.

---

## 3. Known deferred items, still present and not re-reported

- Quota-rent label crossed by S + quota.
- "Country A/B" labels crossed by their lines.
- DWL labels on negcons and posprod crossed by one curve.
- `asym` marker about 10 px off.
- Monetarist-lab short-run decision (partly addressed by G3).
- Legacy dead `DG.*` hand-drawn functions for the model keys (~l.2909–3110) are still in the file, unreachable (A20 passes).

## 4. Top issues

1. **G1** — Market lab: negative quantity, revenue and welfare loss under a tax (28 settings).
2. **G2** — Everywhere AD-AS: the baseline SRAS is drawn 50 points too low.
3. **G3** — AD-AS lab: the equilibrium marker is off the drawn SRAS for supply gains and a lowered Yf, and the note is wrong.
4. **G5** — Lorenz builder: the wrong area is shaded for the Gini.
5. **G4** — Subsidy lab: Pp and the areas are cropped off the plot.
6. **G7** and **G6** — New motifs (uncommitted): a negative-externality figure on the public-goods subtopic, and cycle peak/trough markers off the extrema.
