(function () {
  "use strict";

  const ACTIVE_WINDOW_DAYS = 14;
  const cutoff = Date.now() - ACTIVE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const cases = (window.HANTAVIRUS_CASES || [])
    .filter(function (r) {
      const t = new Date(r.reportDate).getTime();
      return !isNaN(t) && t >= cutoff;
    })
    .sort(function (a, b) {
      // Confirmed before suspected, then by case count desc.
      const sa = a.status === "suspected" ? 1 : 0;
      const sb = b.status === "suspected" ? 1 : 0;
      if (sa !== sb) return sa - sb;
      return b.caseCount - a.caseCount;
    });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c];
    });
  }

  function tierClass(count) {
    if (count >= 11) return "tier-large";
    if (count >= 3) return "tier-medium";
    return "tier-small";
  }

  function statusBadge(status) {
    const isSuspected = status === "suspected";
    return (
      '<span class="status-badge status-badge--' +
      (isSuspected ? "suspected" : "confirmed") +
      '">' +
      (isSuspected ? "Suspected" : "Confirmed") +
      "</span>"
    );
  }

  function formatDate(value) {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function sourceHost(url) {
    try {
      return new URL(url).host.replace(/^www\./, "");
    } catch (e) {
      return "source";
    }
  }

  const tbody = document.getElementById("reports-tbody");
  if (tbody) {
    tbody.innerHTML = cases
      .map(function (r) {
        return (
          "<tr>" +
          '<td class="loc">' +
          '<span class="row-dot ' +
          tierClass(r.caseCount) +
          (r.status === "suspected" ? " row-dot--suspected" : "") +
          '"></span>' +
          escapeHtml(r.place) +
          "</td>" +
          "<td>" +
          statusBadge(r.status) +
          "</td>" +
          '<td class="num"><strong>' +
          r.caseCount +
          "</strong></td>" +
          "<td>" +
          escapeHtml(formatDate(r.reportDate)) +
          "</td>" +
          "<td>" +
          (r.source
            ? '<a class="src-link" href="' +
              escapeHtml(r.source) +
              '" target="_blank" rel="noopener noreferrer">' +
              escapeHtml(sourceHost(r.source)) +
              " &rarr;</a>"
            : '<span class="src-empty">—</span>') +
          "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  const tally = cases.reduce(
    function (acc, r) {
      const n = r.caseCount || 0;
      if (r.status === "suspected") acc.suspected += n;
      else acc.confirmed += n;
      return acc;
    },
    { confirmed: 0, suspected: 0 }
  );
  const totalEl = document.getElementById("case-total");
  if (totalEl) {
    totalEl.textContent =
      tally.confirmed + " confirmed · " + tally.suspected + " suspected";
  }

  // ---------- Outbreak summary banner ----------
  const summary = window.HANTAVIRUS_OUTBREAK_SUMMARY;
  const banner = document.getElementById("outbreak-summary");
  if (summary && banner) {
    const sourceLinks = (summary.primarySources || [])
      .map(function (s) {
        return (
          '<a class="src-link" href="' +
          escapeHtml(s.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(s.label) +
          " &rarr;</a>"
        );
      })
      .join(" ");

    banner.innerHTML =
      '<div class="summary-grid">' +
      '<div class="summary-cell"><span class="summary-label">Outbreak</span><span class="summary-value">' +
      escapeHtml(summary.outbreak) +
      "</span></div>" +
      '<div class="summary-cell"><span class="summary-label">As of</span><span class="summary-value">' +
      escapeHtml(formatDate(summary.asOf)) +
      "</span></div>" +
      '<div class="summary-cell"><span class="summary-label">Confirmed</span><span class="summary-value summary-value--red">' +
      summary.confirmedTotal +
      "</span></div>" +
      '<div class="summary-cell"><span class="summary-label">Suspected</span><span class="summary-value">' +
      summary.suspectedTotal +
      "</span></div>" +
      '<div class="summary-cell"><span class="summary-label">Deaths</span><span class="summary-value">' +
      summary.deathsTotal +
      " <em>(" +
      summary.deathsConfirmedHantavirus +
      " confirmed)</em></span></div>" +
      "</div>" +
      '<div class="summary-sources">' +
      '<span class="summary-label">Primary sources:</span> ' +
      sourceLinks +
      "</div>" +
      '<div class="summary-monitoring">' +
      "<span><strong>U.S. monitoring (no symptoms):</strong> " +
      summary.usMonitoredPeople +
      " people across " +
      (summary.usMonitoringStates || []).join(", ") +
      "</span>" +
      "</div>";
  }
})();
