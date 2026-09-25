/* ═══════════════════════════════════════════════════════════════════════════
   ARJUN AGRAWAL · IB DP ECONOMICS
   Service worker

   What this does, precisely:
   The whole platform is one self-contained HTML file. Once that file and the
   handful of assets beside it have been fetched, everything the platform
   itself does works without a connection: every mind map, every diagram,
   every calculation, every dossier, every tool and every question.

   What it does NOT do:
   It does not make external material available offline. The Google Drive
   resource library, the YouTube videos and their still images all live on
   other servers and need a connection. Nothing about any student is cached,
   stored or transmitted here: progress lives in this browser's own storage
   and never passes through this file.

   Strategy: network-first for the page, so an update is picked up as soon as
   there is a connection, with the cached copy served when there is not.
   Cache-first for the static assets, which change only when the version below
   changes.
   ═══════════════════════════════════════════════════════════════════════════ */
const VERSION = "aa-ibdp-econ-v11";
const CACHE = VERSION + "-static";

/* Relative to the service worker's own location, so the platform works from a
   project subdirectory on GitHub Pages as well as from a domain root. */
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./404.html",
  "./assets/data/exam-dna.js",
  "./assets/data/real-world.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-192.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    /* One missing optional asset must not fail the whole install, so each is
       added on its own and a failure is tolerated. */
    await Promise.all(PRECACHE.map(url =>
      cache.add(new Request(url, { cache: "reload" })).catch(() => null)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  /* Anything on another origin is left entirely alone: YouTube, the still
     image hosts, Google Fonts and Google Drive are never cached here, and a
     request to them is never answered from a stale copy. */
  if (url.origin !== self.location.origin) return;

  /* The page itself: try the network, fall back to what was cached. */
  const isPage = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isPage) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put("./index.html", fresh.clone()).catch(() => {});
        return fresh;
      } catch (e) {
        const cache = await caches.open(CACHE);
        return (await cache.match(req)) ||
               (await cache.match("./index.html")) ||
               (await cache.match("./")) ||
               new Response(
                 "<!doctype html><meta charset='utf-8'><title>Offline</title>" +
                 "<p style='font:16px/1.6 system-ui;margin:12vh auto;max-width:34em;padding:0 6vw'>" +
                 "This page has not been opened on this device yet, so there is no copy " +
                 "stored here to show. Reconnect once and it will be available offline " +
                 "afterwards.</p>",
                 { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 503 });
      }
    })());
    return;
  }

  /* Static assets beside the page: serve what is stored, and refresh it in
     the background when there is a connection. */
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req);
    const network = fetch(req).then(res => {
      if (res && res.status === 200 && res.type === "basic") cache.put(req, res.clone()).catch(() => {});
      return res;
    }).catch(() => null);
    return hit || (await network) || new Response("", { status: 504 });
  })());
});
