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

Both views show only **currently active cases** — anything with a
`reportDate` older than 12 months is filtered out at runtime. The header
chip "Active · last 12 months" makes the timeframe explicit. To change
the window, edit `ACTIVE_WINDOW_DAYS` in `js/app.js` and `js/reports.js`.

## Customizing the data

Edit `data/cases.js` — each entry needs `place`, `country`, `caseCount`,
`lat`, `lng`, `reportDate`, and `source`. The shipped rows are **sample
data** shaped like a real surveillance feed; replace them with live data
from CDC / WHO / regional ministries to make the dashboard authoritative.
