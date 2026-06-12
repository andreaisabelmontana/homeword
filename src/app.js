import { LISTINGS, NEIGHBORHOODS, FEATURES } from "./listings.js";
import { search, parseQuery } from "./match.js";

const q = document.getElementById("q");
const resultsEl = document.getElementById("results");
const summaryEl = document.getElementById("summary");
const countEl = document.getElementById("count");

// hood → cover gradient
const HOOD_HUE = {};
NEIGHBORHOODS.forEach((h, i) => (HOOD_HUE[h] = Math.round((i / NEIGHBORHOODS.length) * 360)));

function cover(l) {
  const hue = HOOD_HUE[l.hood] ?? 210;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='220'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='hsl(${hue},55%,42%)'/>
      <stop offset='1' stop-color='hsl(${(hue + 40) % 360},60%,26%)'/>
    </linearGradient></defs>
    <rect width='400' height='220' fill='url(#g)'/>
    <text x='20' y='200' font-family='sans-serif' font-size='15' fill='rgba(255,255,255,.55)'>${l.hood}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

function badge(score) {
  const pct = Math.round(score * 100);
  const cls = pct >= 75 ? "high" : pct >= 50 ? "mid" : "low";
  return `<span class="match ${cls}">${pct}% match</span>`;
}

function renderSummary(req) {
  const parts = [];
  if (req.beds != null) parts.push(req.beds === 0 ? "studio" : `${req.beds} bed`);
  if (req.budget != null) parts.push(`under €${req.budget}`);
  if (req.hood) parts.push(req.hood);
  for (const f of req.features) parts.push(FEATURES[f].toLowerCase());
  summaryEl.innerHTML = parts.length
    ? `Looking for: ${parts.map((p) => `<span class="tag">${p}</span>`).join("")}`
    : `<span class="muted">Type what you want, or use the quick filters below.</span>`;
}

function renderResults(results) {
  countEl.textContent = `${results.length} match${results.length === 1 ? "" : "es"}`;
  if (!results.length) {
    resultsEl.innerHTML = `<div class="empty">No listings fit those hard limits. Try relaxing the budget, bedroom count, or neighborhood.</div>`;
    return;
  }
  resultsEl.innerHTML = results.map(({ listing: l, score, reasons }) => `
    <article class="card">
      <div class="cover" style="background-image:url('${cover(l)}')">${badge(score)}</div>
      <div class="body">
        <h3>${l.title}</h3>
        <p class="meta">${l.hood} · €${l.price}/mo · ${l.beds === 0 ? "studio" : l.beds + " bed"} · ${l.baths} bath · ${l.sqm} m²</p>
        <p class="blurb">${l.blurb}</p>
        <ul class="reasons">
          ${reasons.map((r) => `<li class="${r.ok ? "yes" : "no"}">${r.ok ? "✓" : "✗"} ${r.label}</li>`).join("")}
        </ul>
      </div>
    </article>
  `).join("");
}

function run(text) {
  q.value = text;
  const { req, results } = search(LISTINGS, text);
  renderSummary(req);
  renderResults(results);
}

// ---- quick filter builder ----
const builder = { beds: null, budget: null, hood: null, feats: new Set() };
function rebuildFromBuilder() {
  const bits = [];
  if (builder.beds != null) bits.push(builder.beds === 0 ? "a studio" : `a ${builder.beds} bedroom`);
  if (builder.hood) bits.push(`in ${builder.hood}`);
  if (builder.budget) bits.push(`under €${builder.budget}`);
  if (builder.feats.size) bits.push("with " + [...builder.feats].map((f) => FEATURES[f].toLowerCase()).join(", "));
  run(("Looking for " + bits.join(" ")).trim());
}

function chipRow(containerId, items, onPick, key) {
  const el = document.getElementById(containerId);
  el.innerHTML = items.map((it) => `<button data-val="${it.val}">${it.label}</button>`).join("");
  el.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    const val = b.dataset.val;
    if (key === "feats") {
      if (builder.feats.has(val)) builder.feats.delete(val); else builder.feats.add(val);
      b.classList.toggle("on");
    } else {
      const cur = builder[key];
      const parsed = key === "hood" ? val : (val === "" ? null : +val);
      builder[key] = String(cur) === String(parsed) ? null : parsed;
      [...el.children].forEach((c) => c.classList.toggle("on", c === b && builder[key] != null && String(c.dataset.val) === String(val)));
    }
    rebuildFromBuilder();
  });
}

chipRow("beds", [
  { val: 0, label: "Studio" }, { val: 1, label: "1 bed" }, { val: 2, label: "2 bed" }, { val: 3, label: "3 bed" },
], null, "beds");
chipRow("budget", [
  { val: 1000, label: "≤ €1000" }, { val: 1500, label: "≤ €1500" }, { val: 2000, label: "≤ €2000" }, { val: 3000, label: "≤ €3000" },
], null, "budget");
chipRow("hood", NEIGHBORHOODS.map((h) => ({ val: h, label: h })), null, "hood");
chipRow("feats", Object.entries(FEATURES).map(([val, label]) => ({ val, label })), null, "feats");

// examples
document.querySelectorAll("[data-example]").forEach((b) =>
  b.addEventListener("click", () => run(b.dataset.example)));

q.addEventListener("keydown", (e) => { if (e.key === "Enter") run(q.value); });
document.getElementById("go").addEventListener("click", () => run(q.value));

// initial state
run("A bright 2-bedroom near a metro, quiet street, under €1600, with a desk");

window.__nestmatch = { run, parseQuery, search: (t) => search(LISTINGS, t) };
