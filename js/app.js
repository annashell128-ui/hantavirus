(function () {
  "use strict";

  // Only show ACTIVE / CURRENT cases — anything older than the rolling
  // surveillance window (12 months) is excluded.
  const ACTIVE_WINDOW_DAYS = 365;
  const cutoff = Date.now() - ACTIVE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const cases = (window.HANTAVIRUS_CASES || []).filter(function (r) {
    const t = new Date(r.reportDate).getTime();
    return !isNaN(t) && t >= cutoff;
  });

  // ---------- Map ----------
  const map = L.map("map", {
    zoomControl: true,
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 10,
    attributionControl: true
  }).setView([15, -30], 3);

  // CartoDB Dark Matter — clean, dark "intelligence dashboard" aesthetic.
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19
    }
  ).addTo(map);

  // ---------- Marker sizing ----------
  // radius = Math.min(40, 6 + Math.sqrt(caseCount) * 4)
  function radiusFor(caseCount) {
    return Math.min(40, 6 + Math.sqrt(caseCount) * 4);
  }

  function tierFor(caseCount) {
    if (caseCount >= 11) return "large";
    if (caseCount >= 3) return "medium";
    return "small";
  }

  function buildIcon(report) {
    const r = radiusFor(report.caseCount);
    const diameter = Math.round(r * 2);
    const tier = tierFor(report.caseCount);
    const html =
      '<div class="case-marker case-marker--' +
      tier +
      '" style="width:' +
      diameter +
      "px;height:" +
      diameter +
      'px"></div>';

    return L.divIcon({
      className: "case-marker-wrap",
      html: html,
      iconSize: [diameter, diameter],
      iconAnchor: [diameter / 2, diameter / 2],
      popupAnchor: [0, -diameter / 2]
    });
  }

  function buildHeatIcon(report) {
    const r = radiusFor(report.caseCount);
    // Heat halo scales much larger than the marker so denser areas glow more.
    const halo = Math.round(r * 4 + report.caseCount * 2);
    const html =
      '<div class="heat-halo" style="width:' +
      halo +
      "px;height:" +
      halo +
      'px"></div>';
    return L.divIcon({
      className: "case-marker-wrap",
      html: html,
      iconSize: [halo, halo],
      iconAnchor: [halo / 2, halo / 2]
    });
  }

  // ---------- Popup ----------
  function popupHtml(report) {
    const date = new Date(report.reportDate);
    const dateStr = isNaN(date.getTime())
      ? report.reportDate
      : date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric"
        });

    return (
      '<div class="popup-card">' +
      '<div class="popup-location">' +
      escapeHtml(report.country) +
      "</div>" +
      '<h3 class="popup-place">' +
      escapeHtml(report.place) +
      "</h3>" +
      '<div class="popup-cases">' +
      '<span class="popup-cases-number">' +
      report.caseCount +
      "</span>" +
      '<span class="popup-cases-label">confirmed ' +
      (report.caseCount === 1 ? "case" : "cases") +
      "</span>" +
      "</div>" +
      '<div class="popup-meta">' +
      "<span><strong>Reported:</strong> " +
      escapeHtml(dateStr) +
      "</span>" +
      (report.source
        ? '<a class="popup-source" href="' +
          escapeAttr(report.source) +
          '" target="_blank" rel="noopener noreferrer">View source &rarr;</a>'
        : "") +
      "</div>" +
      "</div>"
    );
  }

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

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  // ---------- Layer state ----------
  const markerLayer = L.layerGroup().addTo(map);
  const heatLayer = L.layerGroup();

  cases.forEach(function (report) {
    const marker = L.marker([report.lat, report.lng], {
      icon: buildIcon(report),
      riseOnHover: true,
      keyboard: true,
      title: report.place + " — " + report.caseCount + " cases"
    }).bindPopup(popupHtml(report), { closeButton: true, autoPan: true });
    markerLayer.addLayer(marker);

    const halo = L.marker([report.lat, report.lng], {
      icon: buildHeatIcon(report),
      interactive: false,
      keyboard: false
    });
    heatLayer.addLayer(halo);
  });

  // ---------- Header total ----------
  const total = cases.reduce(function (sum, r) {
    return sum + (r.caseCount || 0);
  }, 0);
  const totalEl = document.getElementById("case-total");
  if (totalEl) {
    totalEl.textContent =
      total.toLocaleString() + " cases across " + cases.length + " reports";
  }

  // ---------- Heat toggle ----------
  const heatToggle = document.getElementById("heat-toggle");
  if (heatToggle) {
    heatToggle.addEventListener("change", function () {
      if (heatToggle.checked) {
        heatLayer.addTo(map);
      } else {
        map.removeLayer(heatLayer);
      }
    });
  }
})();
