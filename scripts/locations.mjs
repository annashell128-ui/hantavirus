// Known-location registry for the news-pull refresh script.
// Each entry maps a set of keyword aliases (lowercased) to a fixed
// place name, country, and lat/lng. Adding a new location is the
// preferred way to broaden coverage — the refresh script only emits
// markers for locations that exist in this registry.
export const LOCATIONS = [
  // M/V Hondius outbreak hotspots
  {
    keywords: ["saint helena", "st. helena", "st helena", "jamestown"],
    place: "Saint Helena",
    country: "Saint Helena",
    lat: -15.929,
    lng: -5.717
  },
  {
    keywords: ["south africa", "cape town", "johannesburg", "pretoria"],
    place: "South Africa",
    country: "South Africa",
    lat: -33.918,
    lng: 18.423
  },
  {
    keywords: ["switzerland", "geneva", "zurich", "bern"],
    place: "Switzerland",
    country: "Switzerland",
    lat: 46.204,
    lng: 6.143
  },
  {
    keywords: ["germany", "berlin", "hamburg", "munich", "bavaria"],
    place: "Germany",
    country: "Germany",
    lat: 52.52,
    lng: 13.405
  },
  {
    keywords: ["netherlands", "amsterdam", "rotterdam", "utrecht"],
    place: "Netherlands",
    country: "Netherlands",
    lat: 52.367,
    lng: 4.904
  },
  {
    keywords: ["singapore"],
    place: "Singapore",
    country: "Singapore",
    lat: 1.352,
    lng: 103.82
  },
  {
    keywords: ["france", "paris", "lyon", "marseille"],
    place: "France",
    country: "France",
    lat: 48.857,
    lng: 2.353
  },
  {
    keywords: ["cabo verde", "cape verde", "praia"],
    place: "Cabo Verde",
    country: "Cabo Verde",
    lat: 16.0,
    lng: -23.5
  },
  {
    keywords: ["united kingdom", "uk", "london", "england"],
    place: "United Kingdom",
    country: "United Kingdom",
    lat: 51.507,
    lng: -0.128
  },
  {
    keywords: ["spain", "madrid", "tenerife", "canary islands"],
    place: "Spain",
    country: "Spain",
    lat: 40.417,
    lng: -3.704
  },

  // Endemic Andes hantavirus regions
  {
    keywords: ["argentina", "bariloche", "chubut", "epuyén", "epuyen", "patagonia"],
    place: "Argentina",
    country: "Argentina",
    lat: -41.135,
    lng: -71.309
  },
  {
    keywords: ["chile", "aysén", "aysen", "los ríos", "los rios"],
    place: "Chile",
    country: "Chile",
    lat: -45.572,
    lng: -72.068
  },
  {
    keywords: ["brazil", "rio grande do sul", "santa catarina"],
    place: "Brazil",
    country: "Brazil",
    lat: -29.685,
    lng: -53.806
  },
  {
    keywords: ["paraguay", "chaco"],
    place: "Paraguay",
    country: "Paraguay",
    lat: -23.0,
    lng: -60.0
  },
  {
    keywords: ["panama"],
    place: "Panama",
    country: "Panama",
    lat: 7.617,
    lng: -80.378
  },

  // U.S. monitoring states + endemic Sin Nombre regions
  {
    keywords: ["california", "mammoth lakes", "yosemite", "mono county"],
    place: "California",
    country: "United States",
    lat: 37.6485,
    lng: -118.9721
  },
  {
    keywords: ["new mexico", "sandoval county", "mckinley county"],
    place: "New Mexico",
    country: "United States",
    lat: 35.692,
    lng: -106.696
  },
  {
    keywords: ["arizona", "coconino county"],
    place: "Arizona",
    country: "United States",
    lat: 35.546,
    lng: -111.665
  },
  {
    keywords: ["colorado", "la plata county"],
    place: "Colorado",
    country: "United States",
    lat: 37.275,
    lng: -107.881
  },
  {
    keywords: ["texas"],
    place: "Texas",
    country: "United States",
    lat: 31.0,
    lng: -100.0
  },
  {
    keywords: ["georgia"],
    place: "Georgia",
    country: "United States",
    lat: 32.1656,
    lng: -82.9001
  },
  {
    keywords: ["virginia"],
    place: "Virginia",
    country: "United States",
    lat: 37.4316,
    lng: -78.6569
  },
  {
    keywords: ["utah", "san juan county"],
    place: "Utah",
    country: "United States",
    lat: 37.625,
    lng: -109.812
  },
  {
    keywords: ["washington state", "yakima"],
    place: "Washington",
    country: "United States",
    lat: 46.602,
    lng: -120.505
  },

  // East Asia / Eurasia
  {
    keywords: ["south korea", "gangwon"],
    place: "South Korea",
    country: "South Korea",
    lat: 37.821,
    lng: 128.155
  },
  {
    keywords: ["russia", "primorsky"],
    place: "Russia",
    country: "Russia",
    lat: 43.115,
    lng: 131.886
  },
  {
    keywords: ["finland", "lapland"],
    place: "Finland",
    country: "Finland",
    lat: 67.0,
    lng: 26.0
  }
];
