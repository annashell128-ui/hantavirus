# Hantavirus Outbreak Tracker

Dark, dramatic, "global intelligence dashboard" map of reported hantavirus
case clusters. No build step — open `index.html` in a browser.

## Stack

- [Leaflet 1.9](https://leafletjs.com/) for the map
- [CartoDB Dark Matter](https://carto.com/help/building-maps/basemap-list/) tiles
- Plain HTML / CSS / JS (no framework, no API keys)

## Visual design

- Dark Matter basemap, minimal labels.
- Case markers are glowing red dots with a CSS pulse animation.
- Dot radius: `Math.min(40, 6 + Math.sqrt(caseCount) * 4)`.
- Three intensity tiers — small (1–2), medium (3–10), large (10+) — with
  progressively stronger glow and slightly slower pulse for larger outbreaks.
- Dark popup cards with a red accent border, emphasized case count, report
  date, and a source link.
- Bottom-right legend plus a "Show heat intensity by case count" toggle that
  overlays a soft red radial halo whose size scales with the case count.

## Active surveillance window

Both views show only the **active outbreak** — anything with a
`reportDate` older than `ACTIVE_WINDOW_DAYS` (currently 14, set in
`js/app.js` and `js/reports.js`) is filtered out at runtime.

## Live tracking via NewsAPI

`data/cases.js` is auto-regenerated every 6 hours from
[NewsAPI](https://newsapi.org/) by a GitHub Actions workflow at
`.github/workflows/refresh-cases.yml`.

The script (`scripts/refresh-cases.mjs`):

1. Pulls hantavirus articles from NewsAPI's `/v2/everything` over the
   last 7 days.
2. Scans each article (title + description + content) for known
   location keywords from `scripts/locations.mjs`.
3. Extracts `<n> confirmed` / `<n> suspected` numbers via regex.
4. Aggregates per location, taking max counts and the latest article
   URL as the `source`.
5. Rewrites `data/cases.js` and the action commits it back.

The header of every page shows "Updated · 3h 12m ago"; if the data is
older than 12 hours the label flips to amber **"Stale · …"** so a
broken cron is obvious.

### One-time setup

1. **Get a NewsAPI key** at <https://newsapi.org/register> (free tier
   = 100 requests/day, plenty for a 6h cron).
2. **Add it as a repo secret**: Settings → Secrets and variables →
   Actions → **New repository secret** → name `NEWS_API_KEY`, value =
   your key.
3. **Enable workflow permissions**: Settings → Actions → General →
   Workflow permissions → **Read and write permissions** → Save.
4. (Optional) **Run it once now**: Actions tab → "Refresh hantavirus
   cases" → **Run workflow**. After it succeeds, `data/cases.js` will
   be replaced with live data.

### Tuning

- **Cadence** — edit the `cron:` line in
  `.github/workflows/refresh-cases.yml` (currently `0 */6 * * *` =
  every 6h).
- **Search query** — set `NEWS_QUERY` in the workflow env (default
  `"hantavirus"`).
- **Lookback window** — set `LOOKBACK_DAYS` (default `7`).
- **Locations** — add entries to `scripts/locations.mjs`. Each needs
  `keywords` (lowercased aliases), `place`, `country`, `lat`, `lng`.

### Run locally

```bash
NEWS_API_KEY=xxx node scripts/refresh-cases.mjs
```

## Schema

```js
{
  id: "unique-id",
  place: "Region or facility",
  country: "Confirmed cases (news pull)" | "Suspected cases (news pull)",
  caseCount: 2,
  status: "confirmed" | "suspected",
  lat: -33.918,
  lng: 18.423,
  reportDate: "2026-05-04",
  source: "https://...",
  sourceName: "Reuters"
}
```

The data file also exposes `window.HANTAVIRUS_LAST_UPDATED` (ISO
timestamp) and `window.HANTAVIRUS_OUTBREAK_SUMMARY` (totals).
