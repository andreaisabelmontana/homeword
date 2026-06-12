# Rental Finder

Describe the flat you want in **plain language** — *"a quiet 2-bed near a metro in Chamberí under €1500 with a desk"* — and Rental Finder reads it, ranks the Madrid listings by how well they actually fit, and shows a **reason for every match and miss**.

**▶ Live:** https://andreaisabelmontana.github.io/rental-finder/

## How it works

Instead of a black-box model, Rental Finder uses a small, **transparent rule + keyword matcher** that runs entirely in your browser — no API key, no backend:

1. **Parse** — pull structured requirements from the sentence: budget, bedrooms, neighborhood, and feature keywords (e.g. *"near a metro"* → `metro`, *"home office"* → `desk`)
2. **Hard-filter** — drop anything that can't satisfy budget, bedroom count, or neighborhood
3. **Score** — rank the rest by feature overlap (weighted highest) plus budget fit
4. **Explain** — every card lists exactly which requirements it met (✓) and missed (✗), with a match percentage

There's also a **quick-filter** panel (bedrooms / budget / neighborhood / must-haves) that composes the same kind of query for you.

> This is a demo: all 24 listings are fictional and the matching is intentionally rule-based and inspectable. It's the *shape* of a natural-language rental search without any model behind it.

## Tech

Vanilla JS ES modules + hand-written CSS. Listing covers are generated as inline SVG gradients, so there are no image assets and nothing to fetch. No build step, no dependencies.

```
index.html
styles.css
src/listings.js   # fictional Madrid catalogue + feature catalogue
src/match.js      # query parser, hard filters, scoring + reasons
src/app.js        # UI, quick filters, rendering
```

## License

MIT — see [LICENSE](LICENSE).
