// The "AI" stand-in: a transparent rule + keyword matcher. It reads a plain
// sentence, pulls out structured requirements, hard-filters listings that can't
// match, and scores the rest — returning a human-readable reason for every
// match and miss. No API, no model; just legible rules.

import { NEIGHBORHOODS, FEATURES } from "./listings.js";

// phrase → feature tag. Multiple phrases can map to the same tag.
const PHRASES = {
  metro: ["metro", "subway", "transport", "station", "tube", "well connected", "connected"],
  quiet: ["quiet", "silent", "calm", "peaceful", "interior street", "tranquil"],
  bright: ["bright", "sunny", "light", "luminous", "exterior", "sun"],
  furnished: ["furnished", "furniture"],
  terrace: ["terrace", "balcony", "outdoor space", "patio"],
  elevator: ["elevator", "lift"],
  pets: ["pet", "pets", "dog", "dogs", "cat", "cats", "animal"],
  desk: ["desk", "office", "workspace", "work from home", "remote", "study"],
  park: ["park", "green", "garden", "nature", "outdoors"],
  modern: ["modern", "renovated", "new", "refurbished", "contemporary", "designer"],
  parking: ["parking", "garage", "car"],
  gym: ["gym", "fitness"],
};

export function parseQuery(text) {
  const t = " " + deaccent(text.toLowerCase()) + " ";
  const req = { budget: null, beds: null, hood: null, features: new Set(), raw: text };

  // budget: a number near a price cue, or any plausible monthly figure
  const cue = t.match(/(?:under|below|max|maximum|budget|less than|up to|≤|<)\s*€?\s*([\d.,]+)\s*(k)?/);
  if (cue) {
    req.budget = normNumber(cue[1], cue[2]);
  } else {
    const money = [...t.matchAll(/€\s*([\d.,]+)\s*(k)?|([\d.,]+)\s*(k)?\s*(?:€|eur|euros?)/g)]
      .map((m) => normNumber(m[1] || m[3], m[2] || m[4]));
    const plausible = money.filter((n) => n >= 300);
    if (plausible.length) req.budget = Math.min(...plausible);
  }

  // bedrooms / studio
  if (/\bstudio\b|\bstudios\b/.test(t)) req.beds = 0;
  const bd = t.match(/(\d+)\s*(?:-|\s)?\s*(?:bed|bedroom|bedrooms|hab|habitaci)/);
  if (bd) req.beds = parseInt(bd[1], 10);

  // neighborhood (accent-insensitive on both sides)
  for (const h of NEIGHBORHOODS) {
    if (t.includes(deaccent(h.toLowerCase()))) { req.hood = h; break; }
  }

  // features — whole-word match so "parking" doesn't trigger "park", etc.
  for (const [tag, phrases] of Object.entries(PHRASES)) {
    if (phrases.some((p) => new RegExp(`\\b${p}\\b`).test(t))) req.features.add(tag);
  }

  return req;
}

function normNumber(num, k) {
  let n = parseFloat(String(num).replace(/\./g, "").replace(",", "."));
  if (k) n *= 1000;
  // "1.5" with a k, or "1500" — both end up around 1500
  if (!k && n < 50) n *= 1000; // "1.5" budget shorthand
  return Math.round(n);
}

function deaccent(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }

// Hard filters: budget, bedrooms, neighborhood. Returns true if the listing is
// even eligible.
export function passesHardFilters(l, req) {
  if (req.budget != null && l.price > req.budget * 1.05) return false; // 5% grace
  if (req.beds != null && l.beds !== req.beds) return false;
  if (req.hood && l.hood !== req.hood) return false;
  return true;
}

// Score an eligible listing 0..1 and explain every requested feature.
export function score(l, req) {
  const reasons = [];
  let got = 0, want = 0;

  for (const f of req.features) {
    want++;
    const ok = l.tags.includes(f);
    if (ok) got++;
    reasons.push({ ok, label: FEATURES[f] });
  }

  // budget fit (closer to / under budget scores higher)
  let budgetScore = 0.5;
  if (req.budget != null) {
    budgetScore = l.price <= req.budget ? 1 : Math.max(0, 1 - (l.price - req.budget) / req.budget);
    reasons.push({ ok: l.price <= req.budget, label: `€${l.price}/mo ${l.price <= req.budget ? "within" : "over"} budget` });
  }

  const featureScore = want ? got / want : 0.6;
  // weight: features matter most, then budget
  const total = want
    ? 0.7 * featureScore + 0.3 * budgetScore
    : 0.5 * budgetScore + 0.5; // no features requested → mostly budget/eligibility
  return { score: Math.min(1, total), reasons, matched: got, wanted: want };
}

export function search(listings, text) {
  const req = parseQuery(text);
  const results = listings
    .filter((l) => passesHardFilters(l, req))
    .map((l) => ({ listing: l, ...score(l, req) }))
    .sort((a, b) => b.score - a.score);
  return { req, results };
}
