#!/usr/bin/env node
/* Build step for the opening sequence: a dotted world map, generated once and
   committed as data (tools/build/opening-worldmap.json), which the opening's
   migration embeds in index.html as inline SVG path data.

   Source: Natural Earth 1:110m land and countries, as redistributed by the
   npm package world-atlas@2.0.2 (Natural Earth 4.1.0, public domain), read
   with topojson-client@3.1.0. Neither package is a dependency of the site:
   install them in a temporary folder OUTSIDE the repository and point this
   script at it.

     npm install --prefix /tmp/aae-map world-atlas@2.0.2 topojson-client@3.1.0
     node tools/build/build_worldmap.mjs --modules /tmp/aae-map/node_modules

   The output is the same on every run (no randomness, fixed rounding), so a
   re-run shows no diff unless this script or the source data changes.

   What it makes:
   - Projection: Natural Earth I (the d3-geo formula), latitudes 56°S to 84°N,
     so Antarctica is left out and the map sits comfortably on a wide screen.
   - A regular grid in the projected plane, every other row offset by half a
     step. A grid point that falls on land becomes a dot. Natural Earth I is
     pseudo-cylindrical, so every grid row is one parallel.
   - Compact rendering: consecutive land points on a row become one horizontal
     run ("M x y h length"); the opening strokes each run with
     stroke-dasharray "0 STEP" and round caps, which draws one round dot per
     grid point. About 5,000 dots in under 10 KB of path data.
   - Eight longitudinal bands, each its own path, so the opening can reveal
     the map west to east with staggered opacity (one composited layer each).
   - India as its own layer, so its dots can warm to gold. India is drawn to
     its official boundary as published by the Survey of India: Natural
     Earth's default dataset follows the line of actual control, so the areas
     of Jammu and Kashmir and Ladakh that it assigns to Pakistan or China are
     added to India's layer by the polygon CLAIM below (approximate at this
     scale, as every dot of this map is).
   - The projected positions of the financial and trading hubs the opening
     joins with arcs. */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'opening-worldmap.json');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const MODULES = arg('--modules', process.env.AAE_MAP_MODULES || '');
if (!MODULES) {
  console.error('usage: node tools/build/build_worldmap.mjs --modules <folder holding world-atlas and topojson-client>');
  process.exit(2);
}
const require = createRequire(path.join(path.resolve(MODULES), 'noop.js'));
const topojson = require('topojson-client');
const world = require('world-atlas/countries-110m.json');
const landTopo = require('world-atlas/land-110m.json');

/* ── settings ─────────────────────────────────────────────────────────── */
const COLS = 168;            /* grid points across the full width of the map */
const STEP = 10;             /* grid step in output units */
const ROW = 9;               /* row spacing in output units (offset rows: a near-hexagonal grid) */
const LAT_N = 84, LAT_S = -56;
const BANDS = 8;
const D = Math.PI / 180;

/* Natural Earth I (d3-geo naturalEarth1Raw); lambda, phi in radians */
const fx = phi => { const p2 = phi * phi, p4 = p2 * p2; return 0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)); };
const fy = phi => { const p2 = phi * phi, p4 = p2 * p2; return phi * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4))); };
const invY = y => { let phi = y; for (let i = 0; i < 40; i++) { const h = 1e-7, f = fy(phi) - y, d = (fy(phi + h) - fy(phi - h)) / (2 * h); phi -= f / d; } return phi; };

const XMAX = Math.PI * fx(0);                     /* half width in projected units */
const YN = fy(LAT_N * D), YS = fy(LAT_S * D);
const S = (2 * XMAX) / COLS;                      /* projected units per grid step */
const K = STEP / S;                               /* output units per projected unit */
const W = Math.round(2 * XMAX * K), H = Math.round((YN - YS) * K);
const toXY = (lon, lat) => [(lon * D * fx(lat * D) + XMAX) * K, (YN - fy(lat * D)) * K];

/* ── geometry ─────────────────────────────────────────────────────────── */
const polys = g => (g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []);
const ringHas = (r, x, y) => { let c = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
  const [xi, yi] = r[i], [xj, yj] = r[j];
  if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const polyHas = (p, x, y) => ringHas(p[0], x, y) && !p.slice(1).some(h => ringHas(h, x, y));
const bbox = ps => { let a = [180, 90, -180, -90]; ps.forEach(p => p[0].forEach(([x, y]) => { a = [Math.min(a[0], x), Math.min(a[1], y), Math.max(a[2], x), Math.max(a[3], y)]; })); return a; };
const shape = geoms => { const ps = geoms.flatMap(g => polys(g)); const bs = ps.map(p => bbox([p]));
  return (lon, lat) => ps.some((p, i) => lon >= bs[i][0] && lon <= bs[i][2] && lat >= bs[i][1] && lat <= bs[i][3] && polyHas(p, lon, lat)); };

const land = shape(topojson.feature(landTopo, landTopo.objects.land).features.map(f => f.geometry));
const indiaGeom = topojson.feature(world, world.objects.countries).features.find(f => f.id === '356');
if (!indiaGeom) throw new Error('India (ISO 356) not found in countries-110m');
/* the parts of Jammu and Kashmir and Ladakh outside the line of actual control
   (Gilgit-Baltistan, the Shaksgam valley, Aksai Chin), lon/lat, approximate */
const CLAIM = { type: 'Polygon', coordinates: [[[73.6, 32.7], [72.6, 34.5], [72.5, 35.8], [73.7, 36.9], [74.8, 37.1], [75.9, 36.7],
  [77.0, 35.9], [77.9, 35.5], [78.6, 35.9], [79.6, 35.7], [80.3, 35.3], [80.2, 34.4], [78.9, 33.6], [76.6, 32.6], [74.8, 32.5], [73.6, 32.7]]] };
const india = shape([indiaGeom.geometry, CLAIM]);

/* ── grid → runs ──────────────────────────────────────────────────────── */
const r1 = v => Math.round(v * 10) / 10;
const bandW = W / BANDS;
const bands = Array.from({ length: BANDS }, (_, i) => ({ x0: r1(i * bandW), x1: r1((i + 1) * bandW), runs: [] }));
const indiaRuns = [];
let dots = 0, indiaDots = 0;
for (let row = 0; ; row++) {
  const y = row * ROW + ROW / 2;
  if (y > H) break;
  const phi = invY(YN - y / K), lat = phi / D;
  if (lat > LAT_N || lat < LAT_S) continue;
  const off = row % 2 ? STEP / 2 : 0;
  const cols = [];
  for (let c = 0; ; c++) {
    const x = off + c * STEP + STEP / 2;
    if (x > W) break;
    const lambda = (x / K - XMAX) / fx(phi);
    if (Math.abs(lambda) > Math.PI) continue;
    const lon = lambda / D;
    cols.push([x, land(lon, lat), india(lon, lat)]);
  }
  const push = (list, b, x0, n) => list.push([r1(x0), r1(y), (n - 1) * STEP]);
  /* split runs at band edges so each band holds whole runs */
  let start = null, n = 0, band = -1;
  const flush = () => { if (start !== null) { push(bands[band].runs, band, start, n); start = null; n = 0; } };
  for (const [x, on] of cols) {
    const b = Math.min(BANDS - 1, Math.floor(x / bandW));
    if (!on || b !== band) flush();
    band = b;
    if (on) { if (start === null) start = x; n++; dots++; }
  }
  flush();
  let s2 = null, n2 = 0;
  for (const [x, , inI] of cols) {
    if (inI) { if (s2 === null) s2 = x; n2++; indiaDots++; }
    else if (s2 !== null) { push(indiaRuns, 0, s2, n2); s2 = null; n2 = 0; }
  }
  if (s2 !== null) push(indiaRuns, 0, s2, n2);
}

/* "M x y h len" runs, written with relative moves to stay short; each run is
   lengthened by a hair so the dash at its last grid point is drawn */
const fmt = v => (Math.round(v * 10) / 10).toString();
const pathOf = runs => { let d = '', px = 0, py = 0;
  runs.forEach(([x, y, len], i) => {
    d += i ? `m${fmt(x - px)} ${fmt(y - py)}` : `M${fmt(x)} ${fmt(y)}`;
    d += `h${fmt(len + 0.1)}`;
    px = x + len + 0.1; py = y; });
  return d; };

const HUBS = {
  /* [longitude, latitude], to two decimals */
  la: [-118.24, 34.05], ny: [-74.01, 40.71], sp: [-46.63, -23.55], ld: [-0.13, 51.51], fr: [8.68, 50.11],
  lg: [3.38, 6.52], jb: [28.05, -26.2], db: [55.27, 25.2], mb: [72.88, 19.08], dl: [77.21, 28.61],
  sg: [103.82, 1.35], hk: [114.17, 22.32], sh: [121.47, 31.23], tk: [139.69, 35.68], sy: [151.21, -33.87],
  in: [79.09, 21.15]  /* the geographic centre of India, near Nagpur */
};
const hubs = Object.fromEntries(Object.entries(HUBS).map(([k, [lon, lat]]) => [k, toXY(lon, lat).map(r1)]));

let ib = [W, H, 0, 0];
indiaRuns.forEach(([x, y, len]) => { ib = [Math.min(ib[0], x), Math.min(ib[1], y), Math.max(ib[2], x + len), Math.max(ib[3], y)]; });

const out = {
  source: 'Natural Earth 1:110m land and countries (public domain), via world-atlas@2.0.2 and topojson-client@3.1.0',
  generator: 'tools/build/build_worldmap.mjs',
  projection: 'Natural Earth I, latitudes ' + LAT_S + ' to ' + LAT_N,
  width: W, height: H, step: STEP, row: ROW, cols: COLS, dots, indiaDots,
  bands: bands.map(b => ({ x0: b.x0, x1: b.x1, d: pathOf(b.runs) })),
  india: { d: pathOf(indiaRuns), bbox: ib.map(r1) },
  hubs
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
const bytes = out.bands.reduce((a, b) => a + b.d.length, 0) + out.india.d.length;
console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${W}x${H}, ${dots} dots (${indiaDots} in India), ${bytes} bytes of path data`);
