// Refresh data/cases.js from current news.
//
// Pulls hantavirus articles from NewsAPI's /v2/everything endpoint over
// the last 7 days, scans each article (title + description + content)
// for known location keywords, attempts to extract case counts via
// regex, and aggregates one entry per matched location into
// data/cases.js. The latest article URL per location becomes that
// row's `source`.
//
// Required env:
//   NEWS_API_KEY  — NewsAPI free-tier key
// Optional env:
//   NEWS_QUERY    — override the query (default: "hantavirus")
//   LOOKBACK_DAYS — override lookback window (default: 7)
//
// Usage:
//   node scripts/refresh-cases.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LOCATIONS } from "./locations.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(REPO_ROOT, "data", "cases.js");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_QUERY = process.env.NEWS_QUERY || "hantavirus";
const LOOKBACK_DAYS = Number(process.env.LOOKBACK_DAYS || 7);

if (!NEWS_API_KEY) {
  console.error("[refresh-cases] NEWS_API_KEY is required");
  process.exit(1);
}

const now = new Date();
const fromDate = new Date(now.getTime() - LOOKBACK_DAYS * 86400000)
  .toISOString()
  .slice(0, 10);

async function fetchArticles() {
  const url = new URL("https://newsapi.org/v2/everything");
  url.searchParams.set("q", NEWS_QUERY);
  url.searchParams.set("from", fromDate);
  url.searchParams.set("language", "en");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", "100");

  const res = await fetch(url, {
    headers: { "X-Api-Key": NEWS_API_KEY }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NewsAPI ${res.status}: ${body}`);
  }
  const data = await res.json();
  if (data.status !== "ok") {
    throw new Error(`NewsAPI error: ${data.message || data.code}`);
  }
  return data.articles || [];
}

// Find every location keyword that appears in the given text.
// Returns a Set of location indices (into LOCATIONS).
function matchLocations(text) {
  const hits = new Set();
  const lower = text.toLowerCase();
  for (let i = 0; i < LOCATIONS.length; i++) {
    const loc = LOCATIONS[i];
    for (const kw of loc.keywords) {
      // Word-boundary-ish match: surrounded by non-letter chars or string edges.
      const idx = lower.indexOf(kw);
      if (idx === -1) continue;
      const before = idx === 0 ? " " : lower[idx - 1];
      const after =
        idx + kw.length >= lower.length ? " " : lower[idx + kw.length];
      if (/[a-z]/i.test(before) || /[a-z]/i.test(after)) continue;
      hits.add(i);
      break;
    }
  }
  return hits;
}

// Extract case counts from the text near a "confirmed"/"suspected" marker.
// Returns { confirmed: number|null, suspected: number|null }.
function extractCounts(text) {
  const out = { confirmed: null, suspected: null };
  if (!text) return out;
  const lower = text.toLowerCase();

  // "<n> confirmed cases" / "<n> confirmed"
  const confirmedRe =
    /(\d{1,4})\s+confirmed(?:\s+(?:hantavirus\s+)?cases?)?/g;
  const suspectedRe =
    /(\d{1,4})\s+suspected(?:\s+(?:hantavirus\s+)?cases?)?/g;
  // "confirmed <n> cases"
  const confirmedRe2 = /confirmed\s+(\d{1,4})\s+(?:hantavirus\s+)?cases?/g;
  const suspectedRe2 = /suspected\s+(\d{1,4})\s+(?:hantavirus\s+)?cases?/g;

  for (const re of [confirmedRe, confirmedRe2]) {
    let m;
    while ((m = re.exec(lower)) !== null) {
      const n = parseInt(m[1], 10);
      if (n > 0 && n < 1000) {
        out.confirmed = Math.max(out.confirmed || 0, n);
      }
    }
  }
  for (const re of [suspectedRe, suspectedRe2]) {
    let m;
    while ((m = re.exec(lower)) !== null) {
      const n = parseInt(m[1], 10);
      if (n > 0 && n < 1000) {
        out.suspected = Math.max(out.suspected || 0, n);
      }
    }
  }
  return out;
}

function aggregate(articles) {
  // locIndex -> { confirmed, suspected, articles: [{ url, publishedAt, source }] }
  const byLoc = new Map();

  for (const art of articles) {
    const text =
      (art.title || "") +
      " " +
      (art.description || "") +
      " " +
      (art.content || "");
    if (!/hantavirus/i.test(text)) continue;

    const hits = matchLocations(text);
    if (hits.size === 0) continue;

    const counts = extractCounts(text);

    for (const idx of hits) {
      const entry = byLoc.get(idx) || {
        confirmed: null,
        suspected: null,
        articles: []
      };
      if (counts.confirmed !== null) {
        entry.confirmed = Math.max(entry.confirmed || 0, counts.confirmed);
      }
      if (counts.suspected !== null) {
        entry.suspected = Math.max(entry.suspected || 0, counts.suspected);
      }
      entry.articles.push({
        url: art.url,
        publishedAt: art.publishedAt,
        source: art.source && art.source.name
      });
      byLoc.set(idx, entry);
    }
  }
  return byLoc;
}

function buildCases(byLoc) {
  const cases = [];
  let totalConfirmed = 0;
  let totalSuspected = 0;

  for (const [idx, entry] of byLoc.entries()) {
    const loc = LOCATIONS[idx];
    entry.articles.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    const latest = entry.articles[0];

    // Default to 1 case if no number could be extracted but the location
    // is being actively reported about — treat as a single suspected report.
    const hasConfirmed = entry.confirmed && entry.confirmed > 0;
    const hasSuspected = entry.suspected && entry.suspected > 0;
    const status = hasConfirmed ? "confirmed" : "suspected";
    const caseCount = hasConfirmed
      ? entry.confirmed
      : hasSuspected
      ? entry.suspected
      : 1;

    if (hasConfirmed) totalConfirmed += entry.confirmed;
    else if (hasSuspected) totalSuspected += entry.suspected;
    else totalSuspected += 1;

    cases.push({
      id: `${loc.country.toLowerCase().replace(/[^a-z]+/g, "-")}-${loc.place
        .toLowerCase()
        .replace(/[^a-z]+/g, "-")}`,
      place: loc.place,
      country:
        status === "confirmed"
          ? `Confirmed cases (news pull)`
          : `Suspected cases (news pull)`,
      caseCount,
      status,
      lat: loc.lat,
      lng: loc.lng,
      reportDate: latest.publishedAt
        ? latest.publishedAt.slice(0, 10)
        : now.toISOString().slice(0, 10),
      source: latest.url,
      sourceName: latest.source || ""
    });
  }

  cases.sort((a, b) => b.caseCount - a.caseCount);
  return { cases, totalConfirmed, totalSuspected };
}

function emit(cases, totalConfirmed, totalSuspected, articleCount) {
  const lastUpdatedISO = now.toISOString();
  const summary = {
    outbreak: "Hantavirus — auto-pulled from news",
    asOf: lastUpdatedISO,
    whoNotified: "2026-05-02",
    confirmedTotal: totalConfirmed,
    suspectedTotal: totalSuspected,
    deathsTotal: 3,
    deathsConfirmedHantavirus: 1,
    monitoringCountries: [],
    usMonitoringStates: [],
    usMonitoredPeople: 0,
    primarySources: [
      {
        label: "WHO DON 599",
        url:
          "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON599"
      },
      {
        label: "CDC statement",
        url:
          "https://www.cdc.gov/media/releases/2026-hantavirus-confirmed-cruise-ship.html"
      }
    ],
    articleCount,
    refreshSource: "NewsAPI /v2/everything",
    query: NEWS_QUERY,
    lookbackDays: LOOKBACK_DAYS
  };

  const banner =
    "// AUTO-GENERATED by scripts/refresh-cases.mjs — do not edit by hand.\n" +
    `// Last refreshed: ${lastUpdatedISO}\n` +
    `// Query: "${NEWS_QUERY}", lookback: ${LOOKBACK_DAYS} days, articles scanned: ${articleCount}\n`;

  const body =
    `window.HANTAVIRUS_LAST_UPDATED = ${JSON.stringify(lastUpdatedISO)};\n` +
    `window.HANTAVIRUS_CASES = ${JSON.stringify(cases, null, 2)};\n` +
    `window.HANTAVIRUS_OUTBREAK_SUMMARY = ${JSON.stringify(summary, null, 2)};\n`;

  return banner + body;
}

async function main() {
  console.log(
    `[refresh-cases] querying NewsAPI for "${NEWS_QUERY}" since ${fromDate}`
  );
  const articles = await fetchArticles();
  console.log(`[refresh-cases] fetched ${articles.length} articles`);

  const byLoc = aggregate(articles);
  console.log(`[refresh-cases] matched ${byLoc.size} locations`);

  if (byLoc.size === 0) {
    console.warn(
      "[refresh-cases] no locations matched; refusing to overwrite existing data"
    );
    process.exit(2);
  }

  const { cases, totalConfirmed, totalSuspected } = buildCases(byLoc);
  const out = emit(cases, totalConfirmed, totalSuspected, articles.length);
  await fs.writeFile(OUT_PATH, out, "utf8");

  console.log(
    `[refresh-cases] wrote ${cases.length} cases (${totalConfirmed} confirmed, ${totalSuspected} suspected) to ${path.relative(REPO_ROOT, OUT_PATH)}`
  );
}

main().catch((err) => {
  console.error("[refresh-cases] failed:", err);
  process.exit(1);
});
