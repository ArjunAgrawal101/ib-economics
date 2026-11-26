// Renders the Open Graph card and PNG app icons. Run: node scripts/render-brand.mjs
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const { chromium } = createRequire(import.meta.url)("playwright");
const root = resolve(import.meta.dirname, "..");
const browser = await chromium.launch();

const portrait = "data:image/jpeg;base64," + readFileSync(resolve(root, "public/images/arjun-agrawal-portrait.jpg")).toString("base64");
const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.setContent(readFileSync(resolve(root, "scripts/og.html"), "utf8").replace("PORTRAIT", portrait), { waitUntil: "networkidle" });
await og.evaluate(() => document.fonts.ready);
await og.waitForTimeout(500);
await og.screenshot({ path: resolve(root, "app/opengraph-image.png") });
await og.screenshot({ path: resolve(root, "app/twitter-image.png") });

const svg = readFileSync(resolve(root, "scripts/icon.svg"), "utf8");
for (const [size, out] of [[180, "app/apple-icon.png"], [192, "public/icons/icon-192.png"], [512, "public/icons/icon-512.png"]]) {
  const p = await browser.newPage({ viewport: { width: size, height: size } });
  const body = out.includes("apple") ? svg.replace('rx="96"', 'rx="0"') : svg;
  await p.setContent(`<html><body style="margin:0">${body.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`);
  await p.screenshot({ path: resolve(root, out), omitBackground: true });
}
await browser.close();
writeFileSync(resolve(root, "app/opengraph-image.alt.txt"), "Arjun Agrawal · The Academic Ecosystem. Ideas. Knowledge. Perspectives. Economics, Business Management, Political Studies & Global Affairs.");
writeFileSync(resolve(root, "app/twitter-image.alt.txt"), "Arjun Agrawal · The Academic Ecosystem. Ideas. Knowledge. Perspectives.");
console.log("brand assets rendered");
