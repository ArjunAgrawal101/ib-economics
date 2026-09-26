/* ═══════════════════════════════════════════════════════════════════════════
   ARJUN AGRAWAL · YOUTUBE CATEGORIES
   How a video from the channel is filed. Three layers, in this order:

   1. OVERRIDES: a manual choice for one video, by its YouTube video ID. Use it
      when the automatic rules file a video in the wrong place.
   2. Playlists: a video in a playlist whose title matches a category's
      playlist words takes that category.
   3. Words in the video's own title and description.

   A video can sit in more than one category. A video that matches nothing is
   filed under "Other". To add a category, add one entry to CATEGORIES; the
   page builds its sections from this list, so nothing else needs editing.

   This file holds no secrets and is safe to serve publicly.
   ═══════════════════════════════════════════════════════════════════════════ */

const CATEGORIES = [
  { key: "economics", label: "Economics",
    playlist: [/econom/i, /\bIB\b.*econ/i],
    words: [/\beconom/i, /\binflation\b/i, /\binterest rates?\b/i, /\bGDP\b/i, /\brecession\b/i,
      /\bmarket(s)?\b/i, /\btax(es|ation)?\b/i, /\bRBI\b/i, /\bcentral bank/i, /\brupee\b/i,
      /\bexchange rate/i, /\btrade\b/i, /\btariff/i, /\bunemployment\b/i, /\bfiscal\b/i,
      /\bmonetary\b/i, /\bbudget\b/i, /\bprice(s)?\b/i, /\bdemand\b/i, /\bsupply\b/i] },
  { key: "global-politics", label: "Global Politics",
    playlist: [/global politics/i, /\bpolitic/i],
    words: [/\bglobal politics\b/i, /\bpolitic(s|al)\b/i, /\belection/i, /\bdemocra/i,
      /\bgovernance\b/i, /\bsovereignty\b/i, /\bhuman rights\b/i, /\bparliament\b/i] },
  { key: "international-relations", label: "International Relations",
    playlist: [/international relations/i, /\bIR\b/, /geopolit/i, /foreign policy/i],
    words: [/\binternational relations\b/i, /\bgeopolit/i, /\bforeign policy\b/i, /\bdiplomac/i,
      /\bNATO\b/, /\bUnited Nations\b/i, /\bUN\b/, /\bG20\b/, /\bBRICS\b/, /\bsanction/i,
      /\bwar\b/i, /\bconflict\b/i, /\btreaty\b/i, /\bbilateral\b/i] },
  { key: "upsc", label: "UPSC",
    playlist: [/\bUPSC\b/i, /civil services/i],
    words: [/\bUPSC\b/i, /\bcivil services\b/i, /\bIAS\b/, /\bprelims\b/i, /\bmains\b/i] },
  { key: "ib", label: "IB",
    playlist: [/\bIB\b/, /baccalaureate/i, /extended essay/i],
    words: [/\bIB\b/, /\bInternational Baccalaureate\b/i, /\bDP\b/, /\bextended essay\b/i,
      /\binternal assessment\b/i, /\bTOK\b/, /\bpaper [123]\b/i] },
  { key: "education", label: "Education",
    playlist: [/educat/i, /teach/i, /learn/i, /study/i],
    words: [/\beducation\b/i, /\bteach(er|ing)?\b/i, /\bstudents?\b/i, /\bexam(s|ination)?\b/i,
      /\bstudy\b/i, /\blearn(ing)?\b/i, /\bclassroom\b/i] }
];

/* Manual choices, by video ID. Example:
   "dQw4w9WgXcQ": ["economics", "ib"]
   Keys are YouTube video IDs; values are category keys from the list above. */
const OVERRIDES = {};

const OTHER = { key: "other", label: "Other" };

function classify(video, playlistTitles) {
  const id = video && video.id;
  if (id && Object.prototype.hasOwnProperty.call(OVERRIDES, id)) {
    const keys = OVERRIDES[id].filter(k => CATEGORIES.some(c => c.key === k));
    if (keys.length) return keys;
  }
  const keys = new Set();
  for (const t of playlistTitles || [])
    for (const c of CATEGORIES) if (c.playlist.some(re => re.test(t))) keys.add(c.key);
  const text = ((video && video.title) || "") + "\n" + ((video && video.description) || "");
  for (const c of CATEGORIES) if (c.words.some(re => re.test(text))) keys.add(c.key);
  return keys.size ? CATEGORIES.map(c => c.key).filter(k => keys.has(k)) : [OTHER.key];
}

function labels() {
  return CATEGORIES.map(c => ({ key: c.key, label: c.label })).concat([OTHER]);
}

module.exports = { CATEGORIES, OVERRIDES, OTHER, classify, labels };
