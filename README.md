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

## Data source

`data/cases.js` is a manually compiled snapshot of the **M/V Hondius
Andes-hantavirus** cluster, derived from public reporting:

- WHO Disease Outbreak News (DON 599)
- CDC newsroom statement
- CNN, CBS News, NPR, TIME, Al Jazeera, Live Science

Each entry carries a `status` field (`confirmed` or `suspected`) and the
URL of the reporting source. Numbers shift daily — re-run a news pull
and edit the file to refresh, or wire it to a real API. To make this
fully automated, point `data/cases.js` at a backend (e.g., a small
Node/serverless job that pulls WHO DON + a news API on a schedule and
re-publishes the JSON).

## Schema

```js
{
  id: "unique-id",
  place: "Region or facility",
  country: "Confirmed cases (M/V Hondius)" | "Suspected cases (M/V Hondius)",
  caseCount: 2,
  status: "confirmed" | "suspected",
  lat: -33.918,
  lng: 18.423,
  reportDate: "2026-05-04",
  source: "https://www.who.int/..."
}
```
