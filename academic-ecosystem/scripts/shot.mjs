// Usage: node scripts/shot.mjs <path> <width> <out> [fullPage=1] [height]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [, , path = "/", width = "1440", out = "shot.png", full = "1", height = "900"] = process.argv;
const base = process.env.BASE || "http://localhost:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +width, height: +height }, deviceScaleFactor: 1, reducedMotion: process.env.RM ? "reduce" : "no-preference" });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(base + path, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(2600);
if (full === "1") {
  // walk the page so lazy images load
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(60); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
}
await page.screenshot({ path: out, fullPage: full === "1" });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(JSON.stringify({ out, overflow, errors }));
await browser.close();
