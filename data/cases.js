// ACTIVE hantavirus case reports — derived from news + WHO/CDC bulletins
// covering the M/V Hondius outbreak (Andes hantavirus).
// Snapshot timestamp: 2026-05-08.
//
// IMPORTANT: this is a manually compiled snapshot from public reporting,
// not a live API feed. Numbers shift daily — re-pull and edit this file
// to refresh, or wire it to a real source. Each entry's `source` is the
// reporting URL; `status` is "confirmed" or "suspected".
window.HANTAVIRUS_CASES = [
  {
    id: "za-cape-2026-w19",
    place: "South Africa",
    country: "Confirmed cases (M/V Hondius)",
    caseCount: 2,
    status: "confirmed",
    lat: -33.918,
    lng: 18.423,
    reportDate: "2026-05-04",
    source:
      "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON599"
  },
  {
    id: "ch-geneva-2026-w19",
    place: "Switzerland",
    country: "Confirmed cases (M/V Hondius)",
    caseCount: 1,
    status: "confirmed",
    lat: 46.204,
    lng: 6.143,
    reportDate: "2026-05-07",
    source:
      "https://time.com/article/2026/05/07/countries-hantavirus-hondius-cruise-ship/"
  },
  {
    id: "de-berlin-2026-w19",
    place: "Germany (airlifted patient)",
    country: "Confirmed cases (M/V Hondius)",
    caseCount: 1,
    status: "confirmed",
    lat: 52.52,
    lng: 13.405,
    reportDate: "2026-05-07",
    source:
      "https://www.cnn.com/2026/05/08/health/hantavirus-by-the-numbers"
  },
  {
    id: "nl-amsterdam-2026-w19",
    place: "Netherlands (airlifted patient)",
    country: "Confirmed cases (M/V Hondius)",
    caseCount: 1,
    status: "confirmed",
    lat: 52.367,
    lng: 4.904,
    reportDate: "2026-05-07",
    source:
      "https://www.cnn.com/2026/05/08/health/hantavirus-by-the-numbers"
  },
  {
    id: "sh-jamestown-2026-w19",
    place: "Saint Helena (ship index location)",
    country: "Suspected cases (M/V Hondius)",
    caseCount: 1,
    status: "suspected",
    lat: -15.929,
    lng: -5.717,
    reportDate: "2026-05-02",
    source:
      "https://www.npr.org/2026/05/07/nx-s1-5814632/passengers-left-ship-hantavirus-st-helena"
  },
  {
    id: "cv-offshore-2026-w19",
    place: "Off Cabo Verde (onboard cluster)",
    country: "Suspected cases (M/V Hondius)",
    caseCount: 3,
    status: "suspected",
    lat: 16.0,
    lng: -23.5,
    reportDate: "2026-05-04",
    source:
      "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON599"
  },
  {
    id: "nl-amsterdam-suspected-2026-w19",
    place: "Netherlands (additional suspected)",
    country: "Suspected cases (M/V Hondius)",
    caseCount: 1,
    status: "suspected",
    lat: 52.37,
    lng: 4.91,
    reportDate: "2026-05-07",
    source:
      "https://time.com/article/2026/05/07/countries-hantavirus-hondius-cruise-ship/"
  },
  {
    id: "sg-2026-w19",
    place: "Singapore",
    country: "Suspected cases (M/V Hondius)",
    caseCount: 1,
    status: "suspected",
    lat: 1.352,
    lng: 103.82,
    reportDate: "2026-05-07",
    source:
      "https://www.cnn.com/2026/05/07/world/hantavirus-ship-tenerife-outbreak-intl"
  },
  {
    id: "fr-paris-2026-w19",
    place: "France",
    country: "Suspected cases (M/V Hondius)",
    caseCount: 1,
    status: "suspected",
    lat: 48.857,
    lng: 2.353,
    reportDate: "2026-05-07",
    source:
      "https://time.com/article/2026/05/07/countries-hantavirus-hondius-cruise-ship/"
  }
];

// Public-facing summary — not displayed on the map but useful for
// pages that want to surface aggregate context.
window.HANTAVIRUS_OUTBREAK_SUMMARY = {
  outbreak: "M/V Hondius — Andes hantavirus",
  asOf: "2026-05-08",
  whoNotified: "2026-05-02",
  confirmedTotal: 5,
  suspectedTotal: 4,
  deathsTotal: 3,
  deathsConfirmedHantavirus: 1,
  monitoringCountries: [
    "Canada",
    "Denmark",
    "Germany",
    "Netherlands",
    "New Zealand",
    "Saint Kitts and Nevis",
    "Singapore",
    "Sweden",
    "Switzerland",
    "Turkey",
    "United Kingdom",
    "United States"
  ],
  usMonitoringStates: ["Arizona", "California", "Georgia", "Texas", "Virginia"],
  usMonitoredPeople: 7,
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
    },
    {
      label: "CNN — by the numbers",
      url: "https://www.cnn.com/2026/05/08/health/hantavirus-by-the-numbers"
    },
    {
      label: "CBS News — US monitoring",
      url:
        "https://www.cbsnews.com/news/hantavirus-cruise-ship-mv-hondius-passengers-monitored-us-worldwide/"
    },
    {
      label: "TIME — countries linked",
      url:
        "https://time.com/article/2026/05/07/countries-hantavirus-hondius-cruise-ship/"
    },
    {
      label: "NPR — St. Helena tracking",
      url:
        "https://www.npr.org/2026/05/07/nx-s1-5814632/passengers-left-ship-hantavirus-st-helena"
    }
  ]
};
