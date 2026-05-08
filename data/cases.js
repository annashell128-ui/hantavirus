// CURRENT hantavirus case reports — rolling 7-day OUTBREAK window.
// Last refreshed: 2026-05-08.
//
// These are SAMPLE rows shaped like a real outbreak feed. Replace them
// with live data from the CDC's NNDSS, WHO Disease Outbreak News,
// PAHO/regional ministries, etc. Anything older than 7 days is filtered
// out at runtime by ACTIVE_WINDOW_DAYS in js/app.js + js/reports.js.
window.HANTAVIRUS_CASES = [
  {
    id: "us-mono-mammoth-2026w19",
    place: "Mammoth Lakes, Mono County",
    country: "United States",
    caseCount: 12,
    lat: 37.6485,
    lng: -118.9721,
    reportDate: "2026-05-07",
    source: "https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Hantavirus.aspx"
  },
  {
    id: "us-nm-sandoval-2026w19",
    place: "Sandoval County, NM",
    country: "United States",
    caseCount: 6,
    lat: 35.692,
    lng: -106.696,
    reportDate: "2026-05-08",
    source: "https://www.nmhealth.org"
  },
  {
    id: "us-nm-mckinley-2026w19",
    place: "McKinley County, NM",
    country: "United States",
    caseCount: 4,
    lat: 35.526,
    lng: -108.397,
    reportDate: "2026-05-06",
    source: "https://www.nmhealth.org"
  },
  {
    id: "us-az-coconino-2026w19",
    place: "Coconino County, AZ",
    country: "United States",
    caseCount: 5,
    lat: 35.546,
    lng: -111.665,
    reportDate: "2026-05-05",
    source: "https://www.azdhs.gov"
  },
  {
    id: "us-co-laplata-2026w19",
    place: "La Plata County, CO",
    country: "United States",
    caseCount: 7,
    lat: 37.275,
    lng: -107.881,
    reportDate: "2026-05-04",
    source: "https://cdphe.colorado.gov"
  },
  {
    id: "us-ut-sanjuan-2026w19",
    place: "San Juan County, UT",
    country: "United States",
    caseCount: 3,
    lat: 37.625,
    lng: -109.812,
    reportDate: "2026-05-03",
    source: "https://health.utah.gov"
  },
  {
    id: "us-wa-yakima-2026w19",
    place: "Yakima County, WA",
    country: "United States",
    caseCount: 2,
    lat: 46.602,
    lng: -120.505,
    reportDate: "2026-05-02",
    source: "https://doh.wa.gov"
  },
  {
    id: "ar-rionegro-bariloche-2026w19",
    place: "Bariloche, Río Negro",
    country: "Argentina",
    caseCount: 14,
    lat: -41.135,
    lng: -71.309,
    reportDate: "2026-05-07",
    source: "https://www.argentina.gob.ar/salud"
  },
  {
    id: "ar-chubut-epuyen-2026w19",
    place: "Epuyén, Chubut",
    country: "Argentina",
    caseCount: 8,
    lat: -42.241,
    lng: -71.387,
    reportDate: "2026-05-05",
    source: "https://www.argentina.gob.ar/salud"
  },
  {
    id: "cl-aysen-2026w19",
    place: "Aysén Region",
    country: "Chile",
    caseCount: 9,
    lat: -45.572,
    lng: -72.068,
    reportDate: "2026-05-06",
    source: "https://www.minsal.cl"
  },
  {
    id: "cl-losrios-2026w19",
    place: "Los Ríos Region",
    country: "Chile",
    caseCount: 4,
    lat: -39.823,
    lng: -73.245,
    reportDate: "2026-05-04",
    source: "https://www.minsal.cl"
  },
  {
    id: "br-rs-2026w19",
    place: "Rio Grande do Sul",
    country: "Brazil",
    caseCount: 11,
    lat: -29.685,
    lng: -53.806,
    reportDate: "2026-05-08",
    source: "https://www.gov.br/saude"
  },
  {
    id: "py-chaco-2026w19",
    place: "Gran Chaco",
    country: "Paraguay",
    caseCount: 5,
    lat: -23.0,
    lng: -60.0,
    reportDate: "2026-05-03",
    source: "https://www.mspbs.gov.py"
  },
  {
    id: "pa-lossantos-2026w19",
    place: "Los Santos Province",
    country: "Panama",
    caseCount: 3,
    lat: 7.617,
    lng: -80.378,
    reportDate: "2026-05-02",
    source: "https://www.minsa.gob.pa"
  },
  {
    id: "kr-gangwon-2026w19",
    place: "Gangwon Province",
    country: "South Korea",
    caseCount: 6,
    lat: 37.821,
    lng: 128.155,
    reportDate: "2026-05-05",
    source: "https://www.kdca.go.kr"
  },
  {
    id: "ru-primorsky-2026w19",
    place: "Primorsky Krai",
    country: "Russia",
    caseCount: 7,
    lat: 43.115,
    lng: 131.886,
    reportDate: "2026-05-06",
    source: "https://www.rospotrebnadzor.ru"
  },
  {
    id: "de-bavaria-2026w19",
    place: "Bavaria",
    country: "Germany",
    caseCount: 4,
    lat: 48.79,
    lng: 11.5,
    reportDate: "2026-05-07",
    source: "https://www.rki.de"
  }
];
