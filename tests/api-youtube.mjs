/* The /api/youtube function, run in Node with YouTube replaced by a stub:
   every state the page must handle, and that the API key never leaves it. */
import { createRequire } from 'node:module';
import { check, done } from './lib.mjs';
const require = createRequire(import.meta.url);
const handler = require('../api/youtube.js');
const KEY = 'TESTKEY-must-never-appear';

function call() {
  return new Promise(resolve => {
    const res = { statusCode: 0, headers: {}, setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
      end(b) { resolve({ status: this.statusCode, headers: this.headers, raw: b, body: JSON.parse(b) }); } };
    handler({ query: {} }, res);
  });
}
function env(e) { for (const k of ['YOUTUBE_API_KEY', 'YOUTUBE_CHANNEL_ID', 'YOUTUBE_CHANNEL_HANDLE', 'YOUTUBE_TIMEOUT_MS']) delete process.env[k]; Object.assign(process.env, e); handler._internal.reset(); }
const json = o => ({ ok: true, status: 200, json: async () => o, text: async () => JSON.stringify(o) });
const CH = 'UCaaaaaaaaaaaaaaaaaaaaaa';
let calls = [];
function stubApi({ failAll = false } = {}) {
  calls = [];
  globalThis.fetch = async (url) => {
    calls.push(url);
    if (failAll) throw new Error('network down key=' + KEY);
    const u = new URL(url), p = u.pathname.split('/').pop();
    if (p === 'channels') return json({ items: [{ id: CH, snippet: { title: 'Arjun Agrawal', customUrl: '@arjunagrawal5724' }, contentDetails: { relatedPlaylists: { uploads: 'UUuploads' } } }] });
    if (p === 'playlistItems' && u.searchParams.get('playlistId') === 'UUuploads') return json({ items: [
      { contentDetails: { videoId: 'aaaaaaaaaaa', videoPublishedAt: '2026-09-01T10:00:00Z' }, snippet: { title: 'Why inflation hurts savers' } },
      { contentDetails: { videoId: 'bbbbbbbbbbb', videoPublishedAt: '2026-09-20T10:00:00Z' }, snippet: { title: 'NATO and the war in Europe' } },
      { contentDetails: { videoId: 'ccccccccccc', videoPublishedAt: '2026-09-10T10:00:00Z' }, snippet: { title: 'One idea #shorts' } },
      { contentDetails: { videoId: 'ddddddddddd', videoPublishedAt: '2026-09-05T10:00:00Z' }, snippet: { title: 'Private video' } }] });
    if (p === 'videos') return json({ items: [
      { id: 'aaaaaaaaaaa', contentDetails: { duration: 'PT12M3S' }, snippet: { title: 'Why inflation hurts savers', description: 'Real interest rates explained.', thumbnails: { high: { url: 'https://i.ytimg.com/vi/aaaaaaaaaaa/hqdefault.jpg' } } } },
      { id: 'bbbbbbbbbbb', contentDetails: { duration: 'PT20M' }, snippet: { title: 'NATO and the war in Europe', description: 'Geopolitics.' } },
      { id: 'ccccccccccc', contentDetails: { duration: 'PT45S' }, snippet: { title: 'One idea #shorts', description: '' } }] });
    if (p === 'playlists') return json({ items: [{ id: 'PLecon', snippet: { title: 'UPSC Economy' }, contentDetails: { itemCount: 1 } }] });
    if (p === 'playlistItems' && u.searchParams.get('playlistId') === 'PLecon') return json({ items: [{ contentDetails: { videoId: 'ccccccccccc' } }] });
    return { ok: false, status: 404, json: async () => ({}) };
  };
}

/* 1 · nothing configured */
env({}); stubApi();
let r = await call();
check(r.body.ok === false && r.body.status === 'not-configured' && /YOUTUBE_API_KEY/.test(r.body.message) && calls.length === 0 && r.headers['cache-control'] === 'no-store',
  'with no key and no channel ID it explains the setup and calls nobody');

/* 2 · a malformed channel ID */
env({ YOUTUBE_CHANNEL_ID: 'not-a-channel' }); stubApi();
r = await call();
check(r.body.status === 'misconfigured' && calls.length === 0, 'a malformed YOUTUBE_CHANNEL_ID is reported, not sent to YouTube');

/* 3 · the Data API path */
env({ YOUTUBE_API_KEY: KEY }); stubApi();
r = await call();
const v = r.body.videos || [];
check(r.body.ok && r.body.source === 'youtube-data-api' && v.length === 3, 'the Data API path returns the uploads, without private videos', JSON.stringify(r.body).slice(0, 300));
check(v.map(x => x.id).join() === 'bbbbbbbbbbb,ccccccccccc,aaaaaaaaaaa', 'videos are newest first');
check(v.every(x => x.id && x.title && x.thumbnail && x.publishedAt && x.url.endsWith(x.id)), 'each video has an ID, title, thumbnail, date and link');
check(v.find(x => x.id === 'ccccccccccc').isShort && !v.find(x => x.id === 'aaaaaaaaaaa').isShort, 'a 45-second video is a Short and a 12-minute one is not');
check(v.find(x => x.id === 'aaaaaaaaaaa').categories.includes('economics') && v.find(x => x.id === 'bbbbbbbbbbb').categories.includes('international-relations'),
  'titles and descriptions file videos under Economics and International Relations');
check(v.find(x => x.id === 'ccccccccccc').categories.includes('upsc'), 'playlist membership files a video (a UPSC playlist gives UPSC)');
check(!r.raw.includes(KEY) && calls.every(u => u.startsWith('https://www.googleapis.com/youtube/v3/')), 'the key is sent only to the YouTube API and never returned to the page');
check(/s-maxage=3600/.test(r.headers['cache-control']), 'a good response is cached at the edge for an hour');
check(r.body.channel.subscribeUrl.includes(CH) && r.body.categories.some(c => c.key === 'other'), 'the channel link and the category list are returned');
check(calls.some(u => u.includes('forHandle=%40arjunagrawal5724')), 'the channel is found from its handle when no ID is set');

/* 4 · the memory cache */
const n = calls.length; r = await call();
check(calls.length === n && r.body.cache === 'memory', 'a second request within the cache window does not call YouTube');

/* 5 · YouTube fails after a good response: the stale copy is served */
handler._internal.reset(); stubApi(); await call();
globalThis.fetch = async () => { throw new Error('boom key=' + KEY); };
const memoKeep = true;
// force expiry of the memory copy without losing it
const realNow = Date.now; Date.now = () => realNow() + 3600e3;
r = await call(); Date.now = realNow;
check(r.body.ok && r.body.stale === true && r.body.videos.length === 3 && !r.raw.includes(KEY), 'when YouTube fails the last good list is served, marked stale, with no key in the warning');

/* 6 · YouTube fails with nothing cached */
env({ YOUTUBE_API_KEY: KEY }); stubApi({ failAll: true });
r = await call();
check(r.body.ok === false && r.body.status === 'unavailable' && !r.raw.includes(KEY) && calls.length === 2, 'with nothing cached a failure is reported after one retry, with no key in the message');

/* 7 · a timeout */
env({ YOUTUBE_API_KEY: KEY, YOUTUBE_TIMEOUT_MS: '500' });
globalThis.fetch = (url, opt) => new Promise((_, rej) => opt.signal.addEventListener('abort', () => { const e = new Error('aborted'); e.name = 'AbortError'; rej(e); }));
const t0 = Date.now(); r = await call();
check(r.body.status === 'unavailable' && /in time/.test(r.body.message) && Date.now() - t0 < 3000, 'a YouTube that never answers times out and is reported');

/* 8 · the keyless public feed */
env({ YOUTUBE_CHANNEL_ID: CH });
globalThis.fetch = async (url) => ({ ok: true, status: 200, text: async () => `<?xml version="1.0"?><feed xmlns:yt="x" xmlns:media="y"><title>Arjun Agrawal</title>
<entry><yt:videoId>eeeeeeeeeee</yt:videoId><title>Budget 2026 &amp; the fiscal deficit</title><published>2026-09-15T00:00:00+00:00</published><media:group><media:description>Fiscal policy.</media:description></media:group></entry>
<entry><yt:videoId>fffffffffff</yt:videoId><title>A quick one #shorts</title><published>2026-09-16T00:00:00+00:00</published><media:group><media:description></media:description></media:group></entry></feed>` });
r = await call();
check(r.body.ok && r.body.source === 'rss' && r.body.videos.length === 2 && r.body.videos[0].title === 'Budget 2026 & the fiscal deficit'
  && r.body.videos[0].categories.includes('economics') && r.body.videos[1].isShort, 'with only a channel ID the public feed is read, decoded and classified');

/* 9 · malformed responses */
env({ YOUTUBE_API_KEY: KEY });
globalThis.fetch = async () => json({ unexpected: true });
r = await call();
check(r.body.ok === false && r.body.status === 'unavailable', 'a malformed API response is reported, not thrown');
env({ YOUTUBE_CHANNEL_ID: CH });
globalThis.fetch = async () => ({ ok: true, status: 200, text: async () => '<html>not a feed</html>' });
r = await call();
check(r.body.ok === false && r.body.status === 'unavailable', 'a malformed feed is reported, not thrown');

/* 10 · helpers */
const { seconds, isShort } = handler._internal;
check(seconds('PT1H2M3S') === 3723 && seconds('PT45S') === 45 && seconds('P1DT1S') === 86401 && seconds('bad') === null, 'ISO 8601 durations are read correctly');
check(isShort(60, '', '') && !isShort(61, '', '') && isShort(170, '#shorts', '') && !isShort(200, '#shorts', ''), 'the Shorts rule: up to 60 s, or up to 3 min with #shorts');

done();
