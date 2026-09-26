/* ═══════════════════════════════════════════════════════════════════════════
   ARJUN AGRAWAL · LATEST VIDEOS FROM THE YOUTUBE CHANNEL
   A Vercel serverless function (Node.js). The page calls /api/youtube; this
   function calls YouTube, so the API key never reaches the browser.

   Configuration, set in Vercel → Project → Settings → Environment Variables:
     YOUTUBE_API_KEY         a YouTube Data API v3 key (server-side only)
     YOUTUBE_CHANNEL_HANDLE  optional; defaults to @arjunagrawal5724
     YOUTUBE_CHANNEL_ID      optional; the channel's UC… ID. With a key it
                             skips the handle lookup; without a key it enables
                             the keyless public feed (latest 15 uploads only)

   Order of preference:
     1. YouTube Data API v3, when YOUTUBE_API_KEY is set: the uploads playlist,
        durations (to find Shorts) and the channel's playlists (for categories).
     2. The channel's public RSS feed, when only YOUTUBE_CHANNEL_ID is set.
     3. Neither: a "not configured" response the page explains, never an error
        page.

   Caching: a good response is kept in memory for CACHE_MS and sent with
   Cache-Control so Vercel's edge serves it without calling YouTube again. If
   YouTube fails, the last good response is served, marked stale. Every call to
   YouTube has a timeout and one retry.
   ═══════════════════════════════════════════════════════════════════════════ */
const { classify, labels } = require("../lib/youtube-categories.js");

const API = "https://www.googleapis.com/youtube/v3/";
const DEFAULT_HANDLE = "@arjunagrawal5724";
const CACHE_MS = 30 * 60 * 1000;         /* fresh for 30 minutes in memory */
const timeoutMs = () => Math.max(500, +process.env.YOUTUBE_TIMEOUT_MS || 8000);
const MAX_VIDEOS = 50;
const MAX_PLAYLISTS = 12;

let memo = null;                          /* { key, at, body } survives warm invocations */

function send(res, status, body, cacheSeconds) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", cacheSeconds
    ? `public, max-age=300, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`
    : "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(JSON.stringify(body));
}

/* fetch with a timeout and one retry; never includes the key in an error */
async function get(url, asText) {
  let last;
  for (let attempt = 0; attempt < 2; attempt++) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), timeoutMs());
    try {
      const r = await fetch(url, { signal: ctl.signal, headers: { Accept: asText ? "application/atom+xml, text/xml" : "application/json" } });
      if (!r.ok) {
        last = new Error("YouTube responded " + r.status);
        if (r.status >= 400 && r.status < 500 && r.status !== 429) break;  /* not worth retrying */
        continue;
      }
      return asText ? await r.text() : await r.json();
    } catch (e) {
      last = new Error(e && e.name === "AbortError" ? "YouTube did not respond in time" : "YouTube could not be reached");
    } finally { clearTimeout(t); }
  }
  throw last;
}

const q = (path, params, key) =>
  API + path + "?" + new URLSearchParams(Object.assign({}, params, { key })).toString();

/* ISO 8601 duration (PT1H2M3S) to seconds */
function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return null;
  return (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0);
}

function thumb(th, id) {
  const t = th || {};
  const best = t.maxres || t.standard || t.high || t.medium || t.default;
  return best && best.url ? best.url : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

const short = s => {
  const one = String(s || "").replace(/\s+/g, " ").trim();
  return one.length > 280 ? one.slice(0, 277).replace(/\s+\S*$/, "") + "…" : one;
};

/* A Short is identified by length (60 seconds or less), or by length up to
   three minutes together with #shorts in the title or description. YouTube's
   API has no Shorts flag, so this is a stated heuristic. */
function isShort(sec, title, desc) {
  if (sec == null) return false;
  if (sec <= 60) return true;
  return sec <= 180 && /#shorts?\b/i.test(title + " " + desc);
}

async function viaDataApi(key, handle, channelId) {
  const ch = await get(q("channels", Object.assign({ part: "snippet,contentDetails" },
    channelId ? { id: channelId } : { forHandle: handle }), key));
  const c = ch && ch.items && ch.items[0];
  if (!c) throw new Error("The channel was not found: check YOUTUBE_CHANNEL_HANDLE or YOUTUBE_CHANNEL_ID");
  const uploads = c.contentDetails && c.contentDetails.relatedPlaylists && c.contentDetails.relatedPlaylists.uploads;
  if (!uploads) throw new Error("The channel has no uploads playlist");

  const items = await get(q("playlistItems", { part: "snippet,contentDetails", playlistId: uploads, maxResults: MAX_VIDEOS }, key));
  const list = ((items && items.items) || []).filter(i => i && i.contentDetails && i.contentDetails.videoId
    && i.snippet && i.snippet.title !== "Private video" && i.snippet.title !== "Deleted video");
  const ids = list.map(i => i.contentDetails.videoId);

  const det = {};
  if (ids.length) {
    const v = await get(q("videos", { part: "contentDetails,snippet", id: ids.join(","), maxResults: MAX_VIDEOS }, key));
    for (const x of (v && v.items) || []) det[x.id] = x;
  }

  /* playlists, and which of them each video belongs to (for categories) */
  const inPl = {};
  let playlists = [];
  try {
    const pl = await get(q("playlists", { part: "snippet,contentDetails", channelId: c.id, maxResults: MAX_PLAYLISTS }, key));
    playlists = ((pl && pl.items) || []).map(p => ({ id: p.id, title: p.snippet && p.snippet.title || "Playlist",
      count: p.contentDetails && p.contentDetails.itemCount || 0,
      thumbnail: (p.snippet && p.snippet.thumbnails && (p.snippet.thumbnails.high || p.snippet.thumbnails.medium || p.snippet.thumbnails.default) || {}).url || null,
      url: "https://www.youtube.com/playlist?list=" + encodeURIComponent(p.id) }));
    await Promise.all(playlists.map(async p => {
      try {
        const r = await get(q("playlistItems", { part: "contentDetails", playlistId: p.id, maxResults: MAX_VIDEOS }, key));
        for (const i of (r && r.items) || []) {
          const vid = i.contentDetails && i.contentDetails.videoId;
          if (vid) (inPl[vid] = inPl[vid] || []).push(p.title);
        }
      } catch (e) { /* one playlist failing only loses its category hint */ }
    }));
  } catch (e) { /* playlists are optional */ }

  const videos = list.map(i => {
    const id = i.contentDetails.videoId, d = det[id] || {}, sn = d.snippet || i.snippet || {};
    const sec = seconds(d.contentDetails && d.contentDetails.duration);
    const v = { id, title: sn.title || "", description: short(sn.description),
      publishedAt: (i.contentDetails.videoPublishedAt || sn.publishedAt || null),
      thumbnail: thumb(sn.thumbnails, id), url: "https://www.youtube.com/watch?v=" + encodeURIComponent(id),
      durationSeconds: sec, playlists: inPl[id] || [] };
    v.isShort = isShort(sec, v.title, sn.description || "");
    v.categories = classify({ id, title: v.title, description: sn.description || "" }, v.playlists);
    return v;
  }).sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));

  return { source: "youtube-data-api",
    channel: { id: c.id, title: c.snippet && c.snippet.title || "Arjun Agrawal",
      handle: (c.snippet && c.snippet.customUrl) || handle,
      url: "https://www.youtube.com/channel/" + c.id,
      subscribeUrl: "https://www.youtube.com/channel/" + c.id + "?sub_confirmation=1" },
    videos, playlists };
}

/* the keyless public feed: latest 15 uploads, no durations or playlists */
function decode(s) {
  return String(s || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, "&");
}
function tag(xml, name) { const m = new RegExp("<" + name + "[^>]*>([\\s\\S]*?)</" + name + ">").exec(xml); return m ? decode(m[1]).trim() : ""; }

async function viaRss(channelId) {
  const xml = await get("https://www.youtube.com/feeds/videos.xml?channel_id=" + encodeURIComponent(channelId), true);
  if (!/<feed[\s>]/.test(xml)) throw new Error("The YouTube feed was not in the expected format");
  const title = tag(xml.split("<entry")[0], "title") || "Arjun Agrawal";
  const videos = xml.split("<entry").slice(1).map(e => {
    const id = tag(e, "yt:videoId");
    const desc = tag(e, "media:description");
    const v = { id, title: tag(e, "title"), description: short(desc), publishedAt: tag(e, "published") || null,
      thumbnail: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg", url: "https://www.youtube.com/watch?v=" + encodeURIComponent(id),
      durationSeconds: null, playlists: [],
      /* the feed gives no duration; a Shorts link or #shorts is the only signal */
      isShort: /\/shorts\//.test(e) || /#shorts?\b/i.test(tag(e, "title") + " " + desc) };
    v.categories = classify({ id, title: v.title, description: desc }, []);
    return v;
  }).filter(v => /^[A-Za-z0-9_-]{11}$/.test(v.id));
  return { source: "rss",
    channel: { id: channelId, title, handle: null, url: "https://www.youtube.com/channel/" + channelId,
      subscribeUrl: "https://www.youtube.com/channel/" + channelId + "?sub_confirmation=1" },
    videos, playlists: [] };
}

module.exports = async function handler(req, res) {
  const key = (process.env.YOUTUBE_API_KEY || "").trim();
  const handle = (process.env.YOUTUBE_CHANNEL_HANDLE || DEFAULT_HANDLE).trim();
  const channelId = (process.env.YOUTUBE_CHANNEL_ID || "").trim();
  const base = { categories: labels() };

  if (!key && !channelId) {
    return send(res, 200, Object.assign({ ok: false, status: "not-configured",
      message: "The YouTube feed is not configured. Set YOUTUBE_API_KEY (and optionally YOUTUBE_CHANNEL_ID) in the Vercel project's environment variables, then redeploy." }, base), 0);
  }
  if (channelId && !/^UC[A-Za-z0-9_-]{22}$/.test(channelId)) {
    return send(res, 200, Object.assign({ ok: false, status: "misconfigured",
      message: "YOUTUBE_CHANNEL_ID does not look like a channel ID (it should start with UC and have 24 characters)." }, base), 0);
  }

  const memoKey = [key ? "api" : "rss", handle, channelId].join("|");
  if (memo && memo.key === memoKey && Date.now() - memo.at < CACHE_MS)
    return send(res, 200, Object.assign({}, memo.body, { cache: "memory" }), 3600);

  try {
    const data = key ? await viaDataApi(key, handle, channelId) : await viaRss(channelId);
    const body = Object.assign({ ok: true, status: "ok", fetchedAt: new Date().toISOString(), stale: false }, base, data);
    memo = { key: memoKey, at: Date.now(), body };
    return send(res, 200, body, 3600);
  } catch (e) {
    const reason = String(e && e.message || "Unknown error").replace(/key=[^&\s]+/g, "key=…");
    if (memo && memo.key === memoKey) {
      return send(res, 200, Object.assign({}, memo.body, { stale: true, cache: "stale", warning: reason }), 300);
    }
    return send(res, 200, Object.assign({ ok: false, status: "unavailable", message: reason }, base), 60);
  }
};

/* exposed for the tests in tests/api-youtube.mjs */
module.exports._internal = { seconds, isShort, decode, reset: () => { memo = null; } };
