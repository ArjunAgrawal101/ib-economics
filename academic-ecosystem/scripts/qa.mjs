// Quality checks against a running server (default http://localhost:3200).
// Usage: BASE=http://localhost:3200 node scripts/qa.mjs [--shots <dir>]
// Checks every page at five widths: horizontal overflow, console errors,
// broken images, fonts, headings, link safety, mobile menu and interactions.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");

const BASE = process.env.BASE || "http://localhost:3200";
const shotsIdx = process.argv.indexOf("--shots");
const SHOTS = shotsIdx > -1 ? process.argv[shotsIdx + 1] : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const PAGES = ["/", "/about", "/ecosystem", "/work", "/contact", "/not-a-page"];
const WIDTHS = [1440, 1024, 768, 390, 360];
const EXPECTED_EXTERNAL = new Set([
  "https://ib-economics-pi.vercel.app/",
  "https://the-business-brief-dun.vercel.app/",
  "https://arjun-agrawal-political-studies.vercel.app/",
  "https://www.linkedin.com/in/arjun-agrawal-560405310/",
  "https://www.youtube.com/@arjunagrawal5724",
  "https://instagram.com/imarjun101",
]);
const problems = [];
const fail = (msg) => problems.push(msg);

const browser = await chromium.launch();

for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  for (const path of PAGES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && !/status of 404/.test(m.text()) && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    const status = res?.status();
    if (path === "/not-a-page" ? status !== 404 : status !== 200) fail(`${path} @${width}: HTTP ${status}`);

    // walk for lazy images
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 700) await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(300);

    const r = await page.evaluate(() => {
      const out = {};
      out.overflow = document.documentElement.scrollWidth - window.innerWidth;
      out.wide = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          return b.width > 0 && (b.right > window.innerWidth + 1 || b.left < -1) && getComputedStyle(el).position !== "fixed";
        })
        .filter((el) => !el.closest("[aria-hidden='true'], svg, .overflow-hidden, .overflow-x-auto, [hidden]"))
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      out.h1 = document.querySelectorAll("h1").length;
      out.brokenImages = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
      out.noAlt = [...document.images].filter((i) => !i.hasAttribute("alt")).map((i) => i.src);
      out.unsafeBlank = [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !/noopener/.test(a.rel)).map((a) => a.href);
      out.external = [...new Set([...document.querySelectorAll("a[href^='http']")].map((a) => a.href))].filter((u) => !u.startsWith(location.origin));
      out.internal = [...new Set([...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")))];
      out.mailto = [...new Set([...document.querySelectorAll("a[href^='mailto:']")].map((a) => a.getAttribute("href")))];
      out.emptyLinks = [...document.querySelectorAll("a, button")].filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label") && a.getAttribute("aria-hidden") !== "true").length;
      out.fonts = ["Instrument Serif", "Manrope", "Newsreader"].filter((f) => ![...document.fonts].some((ff) => ff.family.includes(f) && ff.status === "loaded"));
      out.title = document.title;
      out.desc = document.querySelector('meta[name="description"]')?.content?.length ?? 0;
      out.canonical = document.querySelector('link[rel="canonical"]')?.href ?? null;
      out.smallTargets = [...document.querySelectorAll("a, button")]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          return b.width > 0 && b.height > 0 && b.height < 24 && !el.closest("p, li li, [aria-hidden='true']") && getComputedStyle(el).display !== "inline";
        })
        .slice(0, 3)
        .map((el) => el.textContent.trim().slice(0, 30));
      return out;
    });

    const tag = `${path} @${width}`;
    if (r.overflow > 0) fail(`${tag}: horizontal overflow ${r.overflow}px ${r.wide.join(", ")}`);
    if (r.h1 !== 1) fail(`${tag}: ${r.h1} h1 elements`);
    if (r.brokenImages.length) fail(`${tag}: broken images ${r.brokenImages.join(", ")}`);
    if (r.noAlt.length) fail(`${tag}: images without alt ${r.noAlt.join(", ")}`);
    if (r.unsafeBlank.length) fail(`${tag}: target=_blank without noopener ${r.unsafeBlank.join(", ")}`);
    if (r.emptyLinks) fail(`${tag}: ${r.emptyLinks} links/buttons without an accessible name`);
    if (r.fonts.length && width === 1440) fail(`${tag}: fonts not loaded ${r.fonts.join(", ")}`);
    if (errors.length) fail(`${tag}: console errors: ${errors.map((e) => e.slice(0, 160)).join(" | ")}`);
    for (const u of r.external) {
      const clean = u.split("#")[0];
      if (!EXPECTED_EXTERNAL.has(clean)) fail(`${tag}: unexpected external link ${u}`);
    }
    for (const m of r.mailto) if (!/^mailto:arjun1agr@gmail\.com(\?subject=[^&\s]+)?$/.test(m)) fail(`${tag}: malformed mailto ${m}`);
    if (width === 1440) {
      for (const href of r.internal) {
        const p = href.split("#")[0] || "/";
        const rr = await page.request.get(BASE + p);
        if (rr.status() !== 200) fail(`${tag}: internal link ${href} → ${rr.status()}`);
        const hash = href.split("#")[1];
        if (hash) {
          const p2 = await ctx.newPage();
          await p2.goto(BASE + p);
          if (!(await p2.$(`#${hash}`))) fail(`${tag}: anchor #${hash} missing on ${p}`);
          await p2.close();
        }
      }
      if (path !== "/not-a-page") console.log(`${path}: "${r.title}" desc=${r.desc}ch canonical=${r.canonical} external=${r.external.length} mailto=${r.mailto.length}`);
    }
    if (SHOTS) {
      await page.evaluate(() => window.scrollTo(0, 0));
      const name = (path === "/" ? "home" : path.slice(1)) + `-${width}.png`;
      await page.screenshot({ path: `${SHOTS}/${name}`, fullPage: true });
    }
    await page.close();
  }
  await ctx.close();
}

/* ── Interactions ─────────────────────────────────────────────────────────── */
{
  // Mobile menu
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const btn = page.getByRole("button", { name: "Open menu" });
  await btn.click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  if (!(await dialog.isVisible())) fail("mobile menu: did not open");
  const lock = await page.evaluate(() => document.body.style.overflow);
  if (lock !== "hidden") fail("mobile menu: body scroll not locked");
  const focusedInside = await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'));
  if (!focusedInside) fail("mobile menu: focus not moved into menu");
  await page.keyboard.press("Escape");
  if (await dialog.isVisible()) fail("mobile menu: Escape did not close");
  await btn.click();
  await dialog.getByRole("link", { name: "About" }).click();
  await page.waitForURL("**/about");
  if (await page.getByRole("dialog", { name: "Site menu" }).isVisible()) fail("mobile menu: did not close after navigation");
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  // Ecosystem dropdown
  const eco = page.getByRole("button", { name: "Ecosystem" });
  await eco.click();
  if ((await eco.getAttribute("aria-expanded")) !== "true") fail("ecosystem menu: aria-expanded not true");
  const panelLinks = await page.locator("header [id] a[target=_blank]").count();
  if (panelLinks < 3) fail(`ecosystem menu: ${panelLinks} platform links`);
  await page.keyboard.press("Escape");
  if ((await eco.getAttribute("aria-expanded")) !== "false") fail("ecosystem menu: Escape did not close");
  // Discovery
  await page.getByRole("button", { name: "UPSC Preparation" }).click();
  await page.waitForTimeout(800);
  const routes = await page.locator('[aria-live="polite"] a[target=_blank]').count();
  if (routes < 2) fail(`discovery: UPSC shows ${routes} routes (expected 2)`);
  await page.getByRole("button", { name: "IB Diploma Programme" }).click();
  await page.waitForTimeout(600);
  const ib = await page.locator('[aria-live="polite"] a[target=_blank]').count();
  if (ib < 3) fail(`discovery: IB shows ${ib} routes (expected 3)`);
  // Map
  await page.getByRole("button", { name: "Political Economy" }).first().click();
  const q = await page.locator("#map-detail").innerText();
  if (!/Who decides/.test(q)) fail("intellectual map: detail did not update");
  // Insights filter
  await page.getByRole("button", { name: "Academic Reflections" }).click();
  const cards = await page.locator('section[aria-labelledby="insights-title"] article').count();
  if (cards !== 1) fail(`insights filter: ${cards} cards for Academic Reflections`);
  // Copy email
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: BASE });
  await page.getByRole("button", { name: "Copy address" }).click();
  try {
    await page.getByRole("button", { name: /Copied/ }).waitFor({ timeout: 3000 });
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    if (clip !== "arjun1agr@gmail.com") fail(`copy email: clipboard holds "${clip}"`);
  } catch {
    fail("copy email: no confirmation");
  }
  // Skip link
  await page.goto(BASE + "/about");
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.textContent?.trim());
  if (skip !== "Skip to content") fail(`skip link: first focus is "${skip}"`);
  // Ecosystem explorer tabs (keyboard)
  await page.goto(BASE + "/ecosystem", { waitUntil: "networkidle" });
  await page.getByRole("tab", { name: "Economics" }).focus();
  await page.keyboard.press("ArrowRight");
  const sel = await page.getByRole("tab", { selected: true }).innerText();
  if (!/Business Brief/.test(sel)) fail(`ecosystem tabs: ArrowRight selected "${sel}"`);
  await ctx.close();
}

await browser.close();
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(" ✗ " + p);
  process.exitCode = 1;
} else {
  console.log("\nAll checks passed.");
}
