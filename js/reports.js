(function () {
  "use strict";

  const cases = (window.HANTAVIRUS_CASES || []).slice().sort(function (a, b) {
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
          '"></span>' +
          escapeHtml(r.place) +
          "</td>" +
          "<td>" +
          escapeHtml(r.country) +
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

  const total = cases.reduce(function (sum, r) {
    return sum + (r.caseCount || 0);
  }, 0);
  const totalEl = document.getElementById("case-total");
  if (totalEl) {
    totalEl.textContent =
      total.toLocaleString() + " cases across " + cases.length + " reports";
  }
})();
