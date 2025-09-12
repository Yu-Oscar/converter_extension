const CURRENCIES = [
  // North America
  {
    value: "USD",
    label: "$ - US Dollar",
    symbol: "$",
    region: "North America",
  },
  {
    value: "CAD",
    label: "C$ - Canadian Dollar",
    symbol: "C$",
    region: "North America",
  },
  {
    value: "MXN",
    label: "$ - Mexican Peso",
    symbol: "$",
    region: "North America",
  },

  // Europe
  { value: "EUR", label: "€ - Euro", symbol: "€", region: "Europe" },
  { value: "GBP", label: "£ - British Pound", symbol: "£", region: "Europe" },
  { value: "CHF", label: "CHF - Swiss Franc", symbol: "CHF", region: "Europe" },
  { value: "SEK", label: "kr - Swedish Krona", symbol: "kr", region: "Europe" },
  {
    value: "NOK",
    label: "kr - Norwegian Krone",
    symbol: "kr",
    region: "Europe",
  },
  { value: "DKK", label: "kr - Danish Krone", symbol: "kr", region: "Europe" },
  { value: "PLN", label: "zł - Polish Zloty", symbol: "zł", region: "Europe" },
  { value: "TRY", label: "₺ - Turkish Lira", symbol: "₺", region: "Europe" },

  // Asia
  { value: "JPY", label: "¥ - Japanese Yen", symbol: "¥", region: "Asia" },
  { value: "CNY", label: "¥ - Chinese Yuan", symbol: "¥", region: "Asia" },

  { value: "INR", label: "₹ - Indian Rupee", symbol: "₹", region: "Asia" },
  { value: "KRW", label: "₩ - South Korean Won", symbol: "₩", region: "Asia" },
  {
    value: "SGD",
    label: "S$ - Singapore Dollar",
    symbol: "S$",
    region: "Asia",
  },
  {
    value: "HKD",
    label: "HK$ - Hong Kong Dollar",
    symbol: "HK$",
    region: "Asia",
  },
  { value: "THB", label: "฿ - Thai Baht", symbol: "฿", region: "Asia" },
  {
    value: "MYR",
    label: "RM - Malaysian Ringgit",
    symbol: "RM",
    region: "Asia",
  },
  { value: "PHP", label: "₱ - Philippine Peso", symbol: "₱", region: "Asia" },
  {
    value: "IDR",
    label: "Rp - Indonesian Rupiah",
    symbol: "Rp",
    region: "Asia",
  },

  // Oceania
  {
    value: "AUD",
    label: "A$ - Australian Dollar",
    symbol: "A$",
    region: "Oceania",
  },
  {
    value: "NZD",
    label: "NZ$ - New Zealand Dollar",
    symbol: "NZ$",
    region: "Oceania",
  },

  // South America
  {
    value: "BRL",
    label: "R$ - Brazilian Real",
    symbol: "R$",
    region: "South America",
  },
  {
    value: "ARS",
    label: "$ - Argentine Peso",
    symbol: "$",
    region: "South America",
  },
  {
    value: "CLP",
    label: "$ - Chilean Peso",
    symbol: "$",
    region: "South America",
  },
  {
    value: "COP",
    label: "$ - Colombian Peso",
    symbol: "$",
    region: "South America",
  },
  {
    value: "PEN",
    label: "S/ - Peruvian Sol",
    symbol: "S/",
    region: "South America",
  },

  // Middle East & Africa
  {
    value: "ILS",
    label: "₪ - Israeli Shekel",
    symbol: "₪",
    region: "Middle East & Africa",
  },
  {
    value: "ZAR",
    label: "R - South African Rand",
    symbol: "R",
    region: "Middle East & Africa",
  },

  // Europe (continued)
  { value: "RUB", label: "₽ - Russian Ruble", symbol: "₽", region: "Europe" },
  { value: "VND", label: "₫ - Vietnamese Dong", symbol: "₫" },
  { value: "TWD", label: "NT$ - Taiwan Dollar", symbol: "NT$" },
  { value: "CZK", label: "Kč - Czech Koruna", symbol: "Kč" },
  { value: "HUF", label: "Ft - Hungarian Forint", symbol: "Ft" },
];

// Comprehensive timezone database (same as overlay)
const ALL_ZONES = [
  // North America
  {
    iana: "America/New_York",
    country: "USA",
    city: "New York",
    region: "North America",
  },
  {
    iana: "America/Chicago",
    country: "USA",
    city: "Chicago",
    region: "North America",
  },
  {
    iana: "America/Denver",
    country: "USA",
    city: "Denver",
    region: "North America",
  },
  {
    iana: "America/Los_Angeles",
    country: "USA",
    city: "Los Angeles",
    region: "North America",
  },
  {
    iana: "America/Halifax",
    country: "CAN",
    city: "Halifax",
    region: "North America",
  },
  {
    iana: "America/St_Johns",
    country: "CAN",
    city: "St Johns",
    region: "North America",
  },

  // Europe
  {
    iana: "UTC",
    country: "UTC",
    city: "GMT",
    region: "UTC",
  },
  {
    iana: "Europe/Berlin",
    country: "GER",
    city: "Berlin",
    region: "Europe",
  },
  {
    iana: "Europe/Athens",
    country: "GRC",
    city: "Athens",
    region: "Europe",
  },
  {
    iana: "Europe/Moscow",
    country: "RUS",
    city: "Moscow",
    region: "Europe",
  },
  {
    iana: "Europe/Lisbon",
    country: "POR",
    city: "Lisbon",
    region: "Europe",
  },
  {
    iana: "Europe/London",
    country: "GBR",
    city: "London",
    region: "Europe",
  },

  // Asia
  {
    iana: "Asia/Kolkata",
    country: "IND",
    city: "Mumbai",
    region: "Asia",
  },
  {
    iana: "Asia/Tokyo",
    country: "JPN",
    city: "Tokyo",
    region: "Asia",
  },
  {
    iana: "Asia/Seoul",
    country: "KOR",
    city: "Seoul",
    region: "Asia",
  },
  {
    iana: "Asia/Shanghai",
    country: "CHN",
    city: "Shanghai",
    region: "Asia",
  },
  {
    iana: "Asia/Dubai",
    country: "UAE",
    city: "Dubai",
    region: "Asia",
  },
  {
    iana: "Asia/Karachi",
    country: "PAK",
    city: "Karachi",
    region: "Asia",
  },
  {
    iana: "Asia/Bangkok",
    country: "THA",
    city: "Bangkok",
    region: "Asia",
  },
  {
    iana: "Asia/Singapore",
    country: "SGP",
    city: "Singapore",
    region: "Asia",
  },
  {
    iana: "Asia/Hong_Kong",
    country: "HKG",
    city: "Hong Kong",
    region: "Asia",
  },

  // Pacific
  {
    iana: "Australia/Sydney",
    country: "AUS",
    city: "Sydney",
    region: "Pacific",
  },
  {
    iana: "Australia/Perth",
    country: "AUS",
    city: "Perth",
    region: "Pacific",
  },
  {
    iana: "Pacific/Auckland",
    country: "NZL",
    city: "Auckland",
    region: "Pacific",
  },
  {
    iana: "Pacific/Honolulu",
    country: "USA",
    city: "Honolulu",
    region: "Pacific",
  },

  // South America
  {
    iana: "America/Sao_Paulo",
    country: "BRA",
    city: "São Paulo",
    region: "South America",
  },
  {
    iana: "America/Argentina/Buenos_Aires",
    country: "ARG",
    city: "Buenos Aires",
    region: "South America",
  },
  {
    iana: "America/Bogota",
    country: "COL",
    city: "Bogotá",
    region: "South America",
  },
  {
    iana: "America/Lima",
    country: "PER",
    city: "Lima",
    region: "South America",
  },

  // Africa
  {
    iana: "Africa/Johannesburg",
    country: "ZAF",
    city: "Johannesburg",
    region: "Africa",
  },
  {
    iana: "Africa/Lagos",
    country: "NGA",
    city: "Lagos",
    region: "Africa",
  },
  {
    iana: "Africa/Nairobi",
    country: "KEN",
    city: "Nairobi",
    region: "Africa",
  },

  // Universal UTC timezones
  {
    iana: "Etc/GMT+12",
    country: "UTC",
    city: "UTC-12",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+11",
    country: "UTC",
    city: "UTC-11",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+10",
    country: "UTC",
    city: "UTC-10",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+9",
    country: "UTC",
    city: "UTC-9",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+8",
    country: "UTC",
    city: "UTC-8",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+7",
    country: "UTC",
    city: "UTC-7",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+6",
    country: "UTC",
    city: "UTC-6",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+5",
    country: "UTC",
    city: "UTC-5",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+4",
    country: "UTC",
    city: "UTC-4",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+3",
    country: "UTC",
    city: "UTC-3",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+2",
    country: "UTC",
    city: "UTC-2",
    region: "Universal",
  },
  {
    iana: "Etc/GMT+1",
    country: "UTC",
    city: "UTC-1",
    region: "Universal",
  },
  {
    iana: "UTC",
    country: "UTC",
    city: "UTC",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-1",
    country: "UTC",
    city: "UTC+1",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-2",
    country: "UTC",
    city: "UTC+2",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-3",
    country: "UTC",
    city: "UTC+3",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-4",
    country: "UTC",
    city: "UTC+4",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-5",
    country: "UTC",
    city: "UTC+5",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-6",
    country: "UTC",
    city: "UTC+6",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-7",
    country: "UTC",
    city: "UTC+7",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-8",
    country: "UTC",
    city: "UTC+8",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-9",
    country: "UTC",
    city: "UTC+9",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-10",
    country: "UTC",
    city: "UTC+10",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-11",
    country: "UTC",
    city: "UTC+11",
    region: "Universal",
  },
  {
    iana: "Etc/GMT-12",
    country: "UTC",
    city: "UTC+12",
    region: "Universal",
  },
];

let currentPrefs = {
  timezone: {
    primaryTimezone: "UTC",
    secondaryTimezones: [],
  },
  currency: {
    primaryCurrency: "HKD",
    secondaryCurrencies: [],
  },
  length: {
    primaryUnit: "feet-inches",
    secondaryUnits: [],
  },
  weight: {
    primaryUnit: "pounds",
    secondaryUnits: [],
  },
  temperature: {
    showPrecision: 1,
  },
};

function createCurrencySelect() {
  const select = document.createElement("select");

  // Group currencies by region
  const regions = {};
  CURRENCIES.forEach((currency) => {
    if (!regions[currency.region]) {
      regions[currency.region] = [];
    }
    regions[currency.region].push(currency);
  });

  // Sort regions in a logical order
  const regionOrder = [
    "North America",
    "Europe",
    "Asia",
    "Oceania",
    "South America",
    "Middle East & Africa",
  ];

  regionOrder.forEach((regionName) => {
    if (regions[regionName]) {
      // Add group header
      const groupHeader = document.createElement("option");
      groupHeader.disabled = true;
      groupHeader.textContent = `── ${regionName} ──`;
      select.appendChild(groupHeader);

      // Add currencies for this region
      regions[regionName].forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency.value;
        option.textContent = currency.label;
        select.appendChild(option);
      });
    }
  });

  return select;
}

function addSecondaryCurrency(currency = "EUR") {
  const container = document.getElementById("secondaryCurrencies");
  const currencyItem = document.createElement("div");
  currencyItem.className = "zone-item";

  const select = createCurrencySelect();
  select.value = currency;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => currencyItem.remove();

  currencyItem.appendChild(select);
  currencyItem.appendChild(removeBtn);
  container.appendChild(currencyItem);
}

function createTimezoneSelect() {
  const select = document.createElement("select");

  // Group timezones by region
  const regions = {};
  ALL_ZONES.forEach((tz) => {
    if (!regions[tz.region]) {
      regions[tz.region] = [];
    }
    regions[tz.region].push(tz);
  });

  Object.keys(regions).forEach((regionName) => {
    // Add group header
    const groupHeader = document.createElement("option");
    groupHeader.disabled = true;
    groupHeader.textContent = `── ${regionName} ──`;
    select.appendChild(groupHeader);

    // Add timezones for this region
    regions[regionName].forEach((timezone) => {
      const option = document.createElement("option");
      option.value = timezone.iana;
      option.textContent = `${timezone.city}, ${timezone.country}`;
      select.appendChild(option);
    });
  });

  return select;
}

function addSecondaryTimezone(timezone = "Europe/London") {
  const container = document.getElementById("secondaryTimezones");
  const timezoneItem = document.createElement("div");
  timezoneItem.className = "zone-item";

  const select = createTimezoneSelect();
  select.value = timezone;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => timezoneItem.remove();

  timezoneItem.appendChild(select);
  timezoneItem.appendChild(removeBtn);
  container.appendChild(timezoneItem);
}

function createLengthSelect() {
  const select = document.createElement("select");

  const units = [
    { value: "feet-inches", label: "Feet & Inches" },
    { value: "feet", label: "Feet" },
    { value: "meters", label: "Meters" },
    { value: "centimeters", label: "Centimeters" },
    { value: "inches", label: "Inches" },
    { value: "millimeters", label: "Millimeters" },
    { value: "kilometers", label: "Kilometers" },
    { value: "yards", label: "Yards" },
    { value: "miles", label: "Miles" },
  ];

  units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.value;
    option.textContent = unit.label;
    select.appendChild(option);
  });

  return select;
}

function addSecondaryLength(unit = "meters") {
  const container = document.getElementById("secondaryLengths");
  const unitItem = document.createElement("div");
  unitItem.className = "zone-item";

  const select = createLengthSelect();
  select.value = unit;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => unitItem.remove();

  unitItem.appendChild(select);
  unitItem.appendChild(removeBtn);
  container.appendChild(unitItem);
}

function createWeightSelect() {
  const select = document.createElement("select");

  const units = [
    { value: "pounds", label: "Pounds" },
    { value: "kilograms", label: "Kilograms" },
    { value: "grams", label: "Grams" },
    { value: "stone", label: "Stone" },
    { value: "ounces", label: "Ounces" },
    { value: "tonnes", label: "Tonnes" },
    { value: "milligrams", label: "Milligrams" },
  ];

  units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.value;
    option.textContent = unit.label;
    select.appendChild(option);
  });

  return select;
}

function addSecondaryWeight(unit = "kilograms") {
  const container = document.getElementById("secondaryWeights");
  const unitItem = document.createElement("div");
  unitItem.className = "zone-item";

  const select = createWeightSelect();
  select.value = unit;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => unitItem.remove();

  unitItem.appendChild(select);
  unitItem.appendChild(removeBtn);
  container.appendChild(unitItem);
}

function populatePrimaryTimezoneSelect() {
  const primaryTimezoneSelect = document.getElementById("primaryTimezone");

  if (!primaryTimezoneSelect) {
    console.error("Primary timezone select element not found");
    return;
  }

  if (!ALL_ZONES || ALL_ZONES.length === 0) {
    console.error("ALL_ZONES array is not available or empty");
    return;
  }

  primaryTimezoneSelect.innerHTML = ""; // Clear existing options

  // Group timezones by region
  const regions = {};
  ALL_ZONES.forEach((tz) => {
    if (!regions[tz.region]) {
      regions[tz.region] = [];
    }
    regions[tz.region].push(tz);
  });

  Object.keys(regions).forEach((regionName) => {
    // Add group header
    const groupHeader = document.createElement("option");
    groupHeader.disabled = true;
    groupHeader.textContent = `── ${regionName} ──`;
    primaryTimezoneSelect.appendChild(groupHeader);

    // Add timezones for this region
    regions[regionName].forEach((timezone) => {
      const option = document.createElement("option");
      option.value = timezone.iana;
      option.textContent = `${timezone.city}, ${timezone.country}`;
      primaryTimezoneSelect.appendChild(option);
    });
  });

  console.log(
    `Primary timezone dropdown populated with ${primaryTimezoneSelect.options.length} options`
  );
}

function populatePrimaryCurrencySelect() {
  const primaryCurrencySelect = document.getElementById("primaryCurrency");
  primaryCurrencySelect.innerHTML = ""; // Clear existing options

  // Group currencies by region
  const regions = {};
  CURRENCIES.forEach((currency) => {
    if (!regions[currency.region]) {
      regions[currency.region] = [];
    }
    regions[currency.region].push(currency);
  });

  // Sort regions in a logical order
  const regionOrder = [
    "North America",
    "Europe",
    "Asia",
    "Oceania",
    "South America",
    "Middle East & Africa",
  ];

  regionOrder.forEach((regionName) => {
    if (regions[regionName]) {
      // Add group header
      const groupHeader = document.createElement("option");
      groupHeader.disabled = true;
      groupHeader.textContent = `── ${regionName} ──`;
      primaryCurrencySelect.appendChild(groupHeader);

      // Add currencies for this region
      regions[regionName].forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency.value;
        option.textContent = currency.label;
        primaryCurrencySelect.appendChild(option);
      });
    }
  });
}

function loadPreferences() {
  // First populate the dropdowns
  populatePrimaryTimezoneSelect();
  populatePrimaryCurrencySelect();

  chrome.storage.sync.get(["preferences"], (result) => {
    if (result.preferences) {
      currentPrefs = result.preferences;
    }

    // Load timezone preferences
    const timezonePrefs = currentPrefs.timezone || {};

    document.getElementById("primaryTimezone").value =
      timezonePrefs.primaryTimezone || "UTC";

    document.getElementById("secondaryTimezones").innerHTML = "";

    const secondaryTimezones = timezonePrefs.secondaryTimezones || [];
    secondaryTimezones.forEach((timezone) => addSecondaryTimezone(timezone));

    // Load currency preferences
    const currencyPrefs = currentPrefs.currency || {};

    document.getElementById("primaryCurrency").value =
      currencyPrefs.primaryCurrency || "HKD";

    document.getElementById("secondaryCurrencies").innerHTML = "";

    const secondaryCurrencies = currencyPrefs.secondaryCurrencies || [];
    secondaryCurrencies.forEach((currency) => addSecondaryCurrency(currency));

    // Load length preferences
    const lengthPrefs = currentPrefs.length || {};
    document.getElementById("primaryLength").value =
      lengthPrefs.primaryUnit || "feet-inches";

    document.getElementById("secondaryLengths").innerHTML = "";
    const secondaryLengths = lengthPrefs.secondaryUnits || [];
    secondaryLengths.forEach((unit) => addSecondaryLength(unit));

    // Load weight preferences
    const weightPrefs = currentPrefs.weight || {};
    document.getElementById("primaryWeight").value =
      weightPrefs.primaryUnit || "pounds";

    document.getElementById("secondaryWeights").innerHTML = "";
    const secondaryWeights = weightPrefs.secondaryUnits || [];
    secondaryWeights.forEach((unit) => addSecondaryWeight(unit));


    // Initialize currency converter with loaded preferences
    if (typeof initializeCurrencyConverter === "function") {
      initializeCurrencyConverter();
    }

    // Initialize length converter with loaded preferences
    if (typeof initializeLengthConverter === "function") {
      initializeLengthConverter();
    }

    // Initialize time conversion with loaded timezone preferences
    if (typeof populateTimeTimezoneSelects === "function") {
      populateTimeTimezoneSelects();
      // Initial conversion and generate timezone conversions
      if (typeof refreshTimeConversions === "function") {
        refreshTimeConversions();
      }
    }
  });
}

function savePreferences() {
  // Get timezone preferences
  const primaryTimezone = document.getElementById("primaryTimezone").value;

  const secondaryTimezones = [];
  document.querySelectorAll("#secondaryTimezones select").forEach((select) => {
    if (select.value && select.value !== primaryTimezone) {
      secondaryTimezones.push(select.value);
    }
  });

  // Get currency preferences
  const primaryCurrency = document.getElementById("primaryCurrency").value;

  const secondaryCurrencies = [];
  document.querySelectorAll("#secondaryCurrencies select").forEach((select) => {
    if (select.value && select.value !== primaryCurrency) {
      secondaryCurrencies.push(select.value);
    }
  });

  // Get length preferences
  const primaryLength = document.getElementById("primaryLength").value;

  const secondaryLengths = [];
  document.querySelectorAll("#secondaryLengths select").forEach((select) => {
    if (select.value && select.value !== primaryLength) {
      secondaryLengths.push(select.value);
    }
  });

  // Get weight preferences
  const primaryWeight = document.getElementById("primaryWeight").value;

  const secondaryWeights = [];
  document.querySelectorAll("#secondaryWeights select").forEach((select) => {
    if (select.value && select.value !== primaryWeight) {
      secondaryWeights.push(select.value);
    }
  });

  const newPrefs = {
    ...currentPrefs,
    timezone: {
      primaryTimezone,
      secondaryTimezones,
    },
    currency: {
      primaryCurrency,
      secondaryCurrencies,
    },
    length: {
      primaryUnit: primaryLength,
      secondaryUnits: secondaryLengths,
    },
    weight: {
      primaryUnit: primaryWeight,
      secondaryUnits: secondaryWeights,
    },
  };

  chrome.storage.sync.set({ preferences: newPrefs }, () => {
    const saveBtn = document.getElementById("saveBtn");
    const status = document.getElementById("status");

    if (chrome.runtime.lastError) {
      status.textContent = "Error saving settings";
      status.className = "status error";
    } else {
      saveBtn.textContent = "Saved!";
      saveBtn.classList.add("saved");
      status.textContent = "Settings saved successfully";
      status.className = "status success";

      setTimeout(() => {
        saveBtn.textContent = "Save Settings";
        saveBtn.classList.remove("saved");
        status.style.display = "none";
      }, 2000);
    }

    status.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPreferences();

  // Navigation
  document.getElementById("settingsBtn").onclick = () =>
    showPage("settingsPage");
  document.getElementById("backBtn").onclick = () => showPage("mainPage");

  // Settings page functionality
  document.getElementById("addTimezone").onclick = () => addSecondaryTimezone();
  document.getElementById("addCurrency").onclick = () => addSecondaryCurrency();
  document.getElementById("addLength").onclick = () => addSecondaryLength();
  document.getElementById("addWeight").onclick = () => addSecondaryWeight();
  document.getElementById("saveBtn").onclick = savePreferences;

  // Tab switching functionality
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;
      switchTab(tabName);
    });
  });

  // Restore last active tab
  restoreLastActiveTab();

  // Converter functionality
  setupConverters();
});

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  document.getElementById(`${tabName}-tab`).classList.add("active");

  // Save the active tab to storage
  chrome.storage.local.set({ lastActiveTab: tabName });
}

function restoreLastActiveTab() {
  chrome.storage.local.get(["lastActiveTab"], (result) => {
    if (result.lastActiveTab) {
      // Check if the tab exists
      const targetTab = document.querySelector(
        `[data-tab="${result.lastActiveTab}"]`
      );
      const targetContent = document.getElementById(
        `${result.lastActiveTab}-tab`
      );

      if (targetTab && targetContent) {
        // Remove active class from all tabs and content
        document
          .querySelectorAll(".tab-btn")
          .forEach((btn) => btn.classList.remove("active"));
        document
          .querySelectorAll(".tab-content")
          .forEach((content) => content.classList.remove("active"));

        // Activate the last active tab
        targetTab.classList.add("active");
        targetContent.classList.add("active");
      }
    }
    // If no last active tab or tab doesn't exist, the default (length) will remain active
  });
}

function setupConverters() {
  // Length converter
  const lengthInput = document.getElementById("length-input");
  const lengthFrom = document.getElementById("length-from");
  const lengthResults = document.getElementById("length-results");

  const lengthUnits = [
    { key: "meters", label: "Meters", symbol: "m" },
    { key: "feet-inches", label: "Feet & Inches", symbol: "ft-in" },
    { key: "feet", label: "Feet", symbol: "ft" },
    { key: "inches", label: "Inches", symbol: "in" },
    { key: "centimeters", label: "Centimeters", symbol: "cm" },
    { key: "millimeters", label: "Millimeters", symbol: "mm" },
    { key: "kilometers", label: "Kilometers", symbol: "km" },
    { key: "yards", label: "Yards", symbol: "yd" },
    { key: "miles", label: "Miles", symbol: "mi" },
  ];

  function convertLength() {
    const fromUnit = lengthFrom.value;
    let value;

    // Handle different input methods
    if (fromUnit === "feet-inches") {
      const feet = parseFloat(document.getElementById("feet-input").value) || 0;
      const inches =
        parseFloat(document.getElementById("inches-input").value) || 0;
      if (feet === 0 && inches === 0) {
        lengthResults.innerHTML = "";
        return;
      }
      // Convert feet-inches to total inches, then to decimal feet for calculation
      value = feet + inches / 12;
    } else {
      value = parseFloat(lengthInput.value);
      if (isNaN(value)) {
        lengthResults.innerHTML = "";
        return;
      }
    }

    // Convert to meters first
    let meters;
    switch (fromUnit) {
      case "meters":
        meters = value;
        break;
      case "feet":
        meters = value * 0.3048;
        break;
      case "feet-inches":
        meters = value * 0.3048;
        break; // For now, treat as feet (user can input decimal feet)
      case "inches":
        meters = value * 0.0254;
        break;
      case "centimeters":
        meters = value / 100;
        break;
      case "millimeters":
        meters = value / 1000;
        break;
      case "kilometers":
        meters = value * 1000;
        break;
      case "yards":
        meters = value * 0.9144;
        break;
      case "miles":
        meters = value * 1609.344;
        break;
    }

    // Generate all conversions except source unit
    lengthResults.innerHTML = "";

    // Separate metric, imperial, and other units
    const metricLengthUnits = [
      "millimeters",
      "centimeters",
      "meters",
      "kilometers",
    ];
    const imperialLengthUnits = ["feet-inches", "feet", "inches"];
    const otherLengthUnits = ["yards", "miles"];

    const metricLengthToShow = lengthUnits.filter(
      (unit) => metricLengthUnits.includes(unit.key) && unit.key !== fromUnit
    );
    const imperialLengthToShow = lengthUnits.filter(
      (unit) => imperialLengthUnits.includes(unit.key) && unit.key !== fromUnit
    );
    const otherLengthToShow = lengthUnits.filter(
      (unit) => otherLengthUnits.includes(unit.key) && unit.key !== fromUnit
    );

    // Handle metric length units with tabs if there are any
    if (metricLengthToShow.length > 0) {
      // Create metric length tabs container
      const metricLengthTabsContainer = document.createElement("div");
      metricLengthTabsContainer.className = "metric-tabs-container";

      // Create tab buttons
      const metricLengthTabButtons = document.createElement("div");
      metricLengthTabButtons.className = "metric-tab-buttons";

      // Create tab content container
      const metricLengthTabContent = document.createElement("div");
      metricLengthTabContent.className = "metric-tab-content";

      metricLengthToShow.forEach((unit, index) => {
        let result;
        let formattedValue;

        switch (unit.key) {
          case "meters":
            result = meters;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
          case "centimeters":
            result = meters * 100;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
          case "millimeters":
            result = meters * 1000;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
          case "kilometers":
            result = meters / 1000;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
        }

        // Create tab button
        const tabBtn = document.createElement("button");
        tabBtn.className = `metric-tab-btn ${index === 0 ? "active" : ""}`;
        tabBtn.textContent = unit.symbol;
        tabBtn.dataset.metricLengthUnit = unit.key;

        // Create tab content
        const tabContentDiv = document.createElement("div");
        tabContentDiv.className = `metric-tab-item ${
          index === 0 ? "active" : ""
        }`;
        tabContentDiv.dataset.metricLengthUnit = unit.key;

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";

        const label = document.createElement("div");
        label.className = "result-label";
        label.textContent = unit.label;

        const value = document.createElement("div");
        value.className = "result-value";
        value.textContent = `${formattedValue} ${unit.symbol}`;

        resultItem.appendChild(label);
        resultItem.appendChild(value);
        tabContentDiv.appendChild(resultItem);

        metricLengthTabButtons.appendChild(tabBtn);
        metricLengthTabContent.appendChild(tabContentDiv);

        // Add click handler for tab switching
        tabBtn.onclick = () => {
          // Remove active class from all metric length buttons and content
          document
            .querySelectorAll(".metric-tab-btn")
            .forEach((btn) => btn.classList.remove("active"));
          document
            .querySelectorAll(".metric-tab-item")
            .forEach((item) => item.classList.remove("active"));

          // Add active class to clicked button and corresponding content
          tabBtn.classList.add("active");
          tabContentDiv.classList.add("active");
        };
      });

      metricLengthTabsContainer.appendChild(metricLengthTabButtons);
      metricLengthTabsContainer.appendChild(metricLengthTabContent);
      lengthResults.appendChild(metricLengthTabsContainer);
    }

    // Handle imperial length units with tabs if there are any
    if (imperialLengthToShow.length > 0) {
      // Create imperial length tabs container
      const imperialLengthTabsContainer = document.createElement("div");
      imperialLengthTabsContainer.className = "imperial-tabs-container";

      // Create tab buttons
      const imperialLengthTabButtons = document.createElement("div");
      imperialLengthTabButtons.className = "imperial-tab-buttons";

      // Create tab content container
      const imperialLengthTabContent = document.createElement("div");
      imperialLengthTabContent.className = "imperial-tab-content";

      imperialLengthToShow.forEach((unit, index) => {
        let result;
        let formattedValue;

        switch (unit.key) {
          case "feet":
            result = meters / 0.3048;
            formattedValue =
              result < 0.01
                ? result.toExponential(3)
                : parseFloat(result.toFixed(6)).toString();
            break;
          case "feet-inches":
            const totalInches = meters / 0.0254;
            const feet = Math.floor(totalInches / 12);
            const inches = totalInches % 12;
            if (inches < 0.1) {
              formattedValue = `${feet}'`;
            } else {
              formattedValue = `${feet}' ${parseFloat(inches.toFixed(2))}"`;
            }
            break;
          case "inches":
            result = meters / 0.0254;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
        }

        // Create tab button
        const tabBtn = document.createElement("button");
        tabBtn.className = `imperial-tab-btn ${index === 0 ? "active" : ""}`;
        tabBtn.textContent = unit.key === "feet-inches" ? "ft-in" : unit.symbol;
        tabBtn.dataset.imperialLengthUnit = unit.key;

        // Create tab content
        const tabContentDiv = document.createElement("div");
        tabContentDiv.className = `imperial-tab-item ${
          index === 0 ? "active" : ""
        }`;
        tabContentDiv.dataset.imperialLengthUnit = unit.key;

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";

        const label = document.createElement("div");
        label.className = "result-label";
        label.textContent = unit.label;

        const value = document.createElement("div");
        value.className = "result-value";

        // For feet-inches, don't add the symbol since it's already in the formatted value
        if (unit.key === "feet-inches") {
          value.textContent = formattedValue;
        } else {
          value.textContent = `${formattedValue} ${unit.symbol}`;
        }

        resultItem.appendChild(label);
        resultItem.appendChild(value);
        tabContentDiv.appendChild(resultItem);

        imperialLengthTabButtons.appendChild(tabBtn);
        imperialLengthTabContent.appendChild(tabContentDiv);

        // Add click handler for tab switching
        tabBtn.onclick = () => {
          // Remove active class from all imperial length buttons and content
          document
            .querySelectorAll(".imperial-tab-btn")
            .forEach((btn) => btn.classList.remove("active"));
          document
            .querySelectorAll(".imperial-tab-item")
            .forEach((item) => item.classList.remove("active"));

          // Add active class to clicked button and corresponding content
          tabBtn.classList.add("active");
          tabContentDiv.classList.add("active");
        };
      });

      imperialLengthTabsContainer.appendChild(imperialLengthTabButtons);
      imperialLengthTabsContainer.appendChild(imperialLengthTabContent);
      lengthResults.appendChild(imperialLengthTabsContainer);
    }

    // Handle other length units individually
    otherLengthToShow.forEach((unit) => {
      let result;
      let formattedValue;

      switch (unit.key) {
        case "yards":
          result = meters / 0.9144;
          formattedValue = parseFloat(result.toFixed(2)).toString();
          break;
        case "miles":
          result = meters / 1609.344;
          formattedValue = parseFloat(result.toFixed(2)).toString();
          break;
      }

      const resultItem = document.createElement("div");
      resultItem.className = "result-item";

      const label = document.createElement("div");
      label.className = "result-label";
      label.textContent = unit.label;

      const value = document.createElement("div");
      value.className = "result-value";
      value.textContent = `${formattedValue} ${unit.symbol}`;

      resultItem.appendChild(label);
      resultItem.appendChild(value);
      lengthResults.appendChild(resultItem);
    });
  }

  // Function to switch input modes based on selected unit
  function switchInputMode() {
    const fromUnit = lengthFrom.value;
    const singleInput = document.getElementById("length-input");
    const dualInput = document.getElementById("feet-inches-input");

    if (fromUnit === "feet-inches") {
      singleInput.style.display = "none";
      dualInput.style.display = "flex";
    } else {
      singleInput.style.display = "block";
      dualInput.style.display = "none";
    }

    // Trigger conversion after switching
    convertLength();
  }

  // Event listeners
  lengthInput.addEventListener("input", convertLength);
  lengthFrom.addEventListener("change", () => {
    switchInputMode();
  });

  // Event listeners for feet-inches inputs
  document
    .getElementById("feet-input")
    .addEventListener("input", convertLength);
  document
    .getElementById("inches-input")
    .addEventListener("input", convertLength);

  // Initialize input mode
  switchInputMode();

  // Weight converter
  const weightInput = document.getElementById("weight-input");
  const weightFrom = document.getElementById("weight-from");
  const weightResults = document.getElementById("weight-results");

  const weightUnits = [
    { key: "stone-pounds", label: "Stone & Pounds", symbol: "st-lb" },
    { key: "stone", label: "Stone", symbol: "st" },
    { key: "pounds", label: "Pounds", symbol: "lb" },
    { key: "ounces", label: "Ounces", symbol: "oz" },
    { key: "kilograms", label: "Kilograms", symbol: "kg" },
    { key: "grams", label: "Grams", symbol: "g" },
    { key: "tonnes", label: "Tonnes", symbol: "t" },
    { key: "milligrams", label: "Milligrams", symbol: "mg" },
  ];

  function convertWeight() {
    const fromUnit = weightFrom.value;
    let value;

    // Handle different input methods
    if (fromUnit === "stone-pounds") {
      const stone =
        parseFloat(document.getElementById("stone-input").value) || 0;
      const pounds =
        parseFloat(document.getElementById("pounds-input").value) || 0;
      if (stone === 0 && pounds === 0) {
        weightResults.innerHTML = "";
        return;
      }
      // Convert stone-pounds to total pounds for calculation
      value = stone * 14 + pounds;
    } else {
      value = parseFloat(weightInput.value);
      if (isNaN(value)) {
        weightResults.innerHTML = "";
        return;
      }
    }

    // Convert to grams first
    let grams;
    switch (fromUnit) {
      case "grams":
        grams = value;
        break;
      case "pounds":
        grams = value * 453.592;
        break;
      case "stone-pounds":
        grams = value * 453.592;
        break; // value is already in pounds
      case "kilograms":
        grams = value * 1000;
        break;
      case "ounces":
        grams = value * 28.3495;
        break;
      case "stone":
        grams = value * 6350.29;
        break;
      case "tonnes":
        grams = value * 1000000;
        break;
      case "milligrams":
        grams = value / 1000;
        break;
    }

    // Generate all conversions except source unit
    weightResults.innerHTML = "";

    // Separate metric, imperial, and other units
    const metricWeightUnits = ["milligrams", "grams", "kilograms", "tonnes"];
    const imperialWeightUnits = ["stone-pounds", "stone", "pounds", "ounces"];

    const metricWeightToShow = weightUnits.filter(
      (unit) => metricWeightUnits.includes(unit.key) && unit.key !== fromUnit
    );
    const imperialWeightToShow = weightUnits.filter(
      (unit) => imperialWeightUnits.includes(unit.key) && unit.key !== fromUnit
    );

    // Handle metric weight units with tabs if there are any
    if (metricWeightToShow.length > 0) {
      // Create metric weight tabs container
      const metricWeightTabsContainer = document.createElement("div");
      metricWeightTabsContainer.className = "metric-tabs-container";

      // Create tab buttons
      const metricWeightTabButtons = document.createElement("div");
      metricWeightTabButtons.className = "metric-tab-buttons";

      // Create tab content container
      const metricWeightTabContent = document.createElement("div");
      metricWeightTabContent.className = "metric-tab-content";

      metricWeightToShow.forEach((unit, index) => {
        let result;
        switch (unit.key) {
          case "grams":
            result = grams;
            break;
          case "kilograms":
            result = grams / 1000;
            break;
          case "tonnes":
            result = grams / 1000000;
            break;
          case "milligrams":
            result = grams * 1000;
            break;
        }

        const formattedValue = parseFloat(result.toFixed(2)).toString();

        // Create tab button
        const tabBtn = document.createElement("button");
        tabBtn.className = `metric-tab-btn ${index === 0 ? "active" : ""}`;
        tabBtn.textContent = unit.symbol;
        tabBtn.dataset.metricWeightUnit = unit.key;

        // Create tab content
        const tabContentDiv = document.createElement("div");
        tabContentDiv.className = `metric-tab-item ${
          index === 0 ? "active" : ""
        }`;
        tabContentDiv.dataset.metricWeightUnit = unit.key;

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";

        const label = document.createElement("div");
        label.className = "result-label";
        label.textContent = unit.label;

        const value = document.createElement("div");
        value.className = "result-value";
        value.textContent = `${formattedValue} ${unit.symbol}`;

        resultItem.appendChild(label);
        resultItem.appendChild(value);
        tabContentDiv.appendChild(resultItem);

        metricWeightTabButtons.appendChild(tabBtn);
        metricWeightTabContent.appendChild(tabContentDiv);

        // Add click handler for tab switching
        tabBtn.onclick = () => {
          // Remove active class from all metric weight buttons and content
          document
            .querySelectorAll(".metric-tab-btn")
            .forEach((btn) => btn.classList.remove("active"));
          document
            .querySelectorAll(".metric-tab-item")
            .forEach((item) => item.classList.remove("active"));

          // Add active class to clicked button and corresponding content
          tabBtn.classList.add("active");
          tabContentDiv.classList.add("active");
        };
      });

      metricWeightTabsContainer.appendChild(metricWeightTabButtons);
      metricWeightTabsContainer.appendChild(metricWeightTabContent);
      weightResults.appendChild(metricWeightTabsContainer);
    }

    // Handle imperial weight units with tabs if there are any
    if (imperialWeightToShow.length > 0) {
      // Create imperial weight tabs container
      const imperialWeightTabsContainer = document.createElement("div");
      imperialWeightTabsContainer.className = "imperial-tabs-container";

      // Create tab buttons
      const imperialWeightTabButtons = document.createElement("div");
      imperialWeightTabButtons.className = "imperial-tab-buttons";

      // Create tab content container
      const imperialWeightTabContent = document.createElement("div");
      imperialWeightTabContent.className = "imperial-tab-content";

      imperialWeightToShow.forEach((unit, index) => {
        let result;
        let formattedValue;

        switch (unit.key) {
          case "stone-pounds":
            const totalPounds = grams / 453.592;
            const stone = Math.floor(totalPounds / 14);
            const pounds = Math.round((totalPounds % 14) * 100) / 100; // round to 2 decimal places
            if (pounds === 14) {
              formattedValue = `${stone + 1} st`;
            } else if (pounds === 0) {
              formattedValue = `${stone} st`;
            } else {
              formattedValue = `${stone} st ${pounds} lb`;
            }
            break;
          case "pounds":
            result = grams / 453.592;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
          case "ounces":
            result = grams / 28.3495;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
          case "stone":
            result = grams / 6350.29;
            formattedValue = parseFloat(result.toFixed(2)).toString();
            break;
        }

        // Create tab button
        const tabBtn = document.createElement("button");
        tabBtn.className = `imperial-tab-btn ${index === 0 ? "active" : ""}`;
        tabBtn.textContent = unit.symbol;
        tabBtn.dataset.imperialWeightUnit = unit.key;

        // Create tab content
        const tabContentDiv = document.createElement("div");
        tabContentDiv.className = `imperial-tab-item ${
          index === 0 ? "active" : ""
        }`;
        tabContentDiv.dataset.imperialWeightUnit = unit.key;

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";

        const label = document.createElement("div");
        label.className = "result-label";
        label.textContent = unit.label;

        const value = document.createElement("div");
        value.className = "result-value";

        // For stone-pounds, don't add the symbol since it's already in the formatted value
        if (unit.key === "stone-pounds") {
          value.textContent = formattedValue;
        } else {
          value.textContent = `${formattedValue} ${unit.symbol}`;
        }

        resultItem.appendChild(label);
        resultItem.appendChild(value);
        tabContentDiv.appendChild(resultItem);

        imperialWeightTabButtons.appendChild(tabBtn);
        imperialWeightTabContent.appendChild(tabContentDiv);

        // Add click handler for tab switching
        tabBtn.onclick = () => {
          // Remove active class from all imperial weight buttons and content
          document
            .querySelectorAll(".imperial-tab-btn")
            .forEach((btn) => btn.classList.remove("active"));
          document
            .querySelectorAll(".imperial-tab-item")
            .forEach((item) => item.classList.remove("active"));

          // Add active class to clicked button and corresponding content
          tabBtn.classList.add("active");
          tabContentDiv.classList.add("active");
        };
      });

      imperialWeightTabsContainer.appendChild(imperialWeightTabButtons);
      imperialWeightTabsContainer.appendChild(imperialWeightTabContent);
      weightResults.appendChild(imperialWeightTabsContainer);
    }
  }

  // Function to switch weight input modes based on selected unit
  function switchWeightInputMode() {
    const fromUnit = weightFrom.value;
    const singleInput = document.getElementById("weight-input");
    const dualInput = document.getElementById("stone-pounds-input");

    if (fromUnit === "stone-pounds") {
      singleInput.style.display = "none";
      dualInput.style.display = "flex";
    } else {
      singleInput.style.display = "block";
      dualInput.style.display = "none";
    }

    // Trigger conversion after switching
    convertWeight();
  }

  // Event listeners
  weightInput.addEventListener("input", convertWeight);
  weightFrom.addEventListener("change", () => {
    switchWeightInputMode();
  });

  // Event listeners for stone-pounds inputs
  document
    .getElementById("stone-input")
    .addEventListener("input", convertWeight);
  document
    .getElementById("pounds-input")
    .addEventListener("input", convertWeight);

  // Initialize weight input mode
  switchWeightInputMode();

  // Temperature converter
  const tempInput = document.getElementById("temperature-input");
  const tempFrom = document.getElementById("temperature-from");
  const tempResults = document.getElementById("temperature-results");

  const tempUnits = [
    { key: "fahrenheit", label: "Fahrenheit", symbol: "°F" },
    { key: "celsius", label: "Celsius", symbol: "°C" },
    { key: "kelvin", label: "Kelvin", symbol: "K" },
  ];

  function convertTemperature() {
    const value = parseFloat(tempInput.value);
    if (isNaN(value)) {
      tempResults.innerHTML = "";
      return;
    }

    const fromUnit = tempFrom.value;

    // Convert to Celsius first
    let celsius;
    switch (fromUnit) {
      case "celsius":
        celsius = value;
        break;
      case "fahrenheit":
        celsius = ((value - 32) * 5) / 9;
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
    }

    // Generate all conversions except source unit
    tempResults.innerHTML = "";
    tempUnits.forEach((unit) => {
      if (unit.key !== fromUnit) {
        let result;
        switch (unit.key) {
          case "celsius":
            result = celsius;
            break;
          case "fahrenheit":
            result = (celsius * 9) / 5 + 32;
            break;
          case "kelvin":
            result = celsius + 273.15;
            break;
        }

        // Format result
        const formattedValue = parseFloat(result.toFixed(2)).toString();

        const resultItem = document.createElement("div");
        resultItem.className = "result-item";

        const label = document.createElement("div");
        label.className = "result-label";
        label.textContent = unit.label;

        const value = document.createElement("div");
        value.className = "result-value";
        value.textContent = `${formattedValue} ${unit.symbol}`;

        resultItem.appendChild(label);
        resultItem.appendChild(value);
        tempResults.appendChild(resultItem);
      }
    });
  }

  tempInput.addEventListener("input", convertTemperature);
  tempFrom.addEventListener("change", convertTemperature);

  // Currency converter (simplified - would need API for real rates)
  const currencyInput = document.getElementById("currency-input");
  const currencyFrom = document.getElementById("currency-from");
  const currencyTo = document.getElementById("currency-to");
  const currencyOutput = document.getElementById("currency-output");

  function convertCurrency() {
    const value = parseFloat(currencyInput.value);
    if (isNaN(value)) {
      currencyOutput.value = "";
      return;
    }

    // Simplified exchange rates (would use API in production)
    const rates = {
      ARS: 98,
      AUD: 1.35,
      BRL: 5.2,
      CAD: 1.25,
      CHF: 0.88,
      CLP: 715,
      CNY: 6.45,
      COP: 3650,
      CZK: 22.5,
      DKK: 6.3,
      EUR: 0.85,
      GBP: 0.73,
      HKD: 7.8,
      HUF: 295,
      IDR: 14250,
      ILS: 3.3,
      INR: 74.5,
      JPY: 110,
      KRW: 1180,
      MXN: 20.1,
      MYR: 4.15,
      NOK: 8.8,
      NZD: 1.42,
      PEN: 3.6,
      PHP: 49.5,
      PLN: 3.9,
      RUB: 75,
      SEK: 8.6,
      SGD: 1.34,
      THB: 31.5,
      TRY: 8.4,
      TWD: 28,
      USD: 1,
      VND: 23000,
      ZAR: 14.8,
    };

    const fromUnit = currencyFrom.value;
    const toUnit = currencyTo.value;

    // Convert to USD first, then to target
    const usd = value / rates[fromUnit];
    const result = usd * rates[toUnit];

    // Format result
    currencyOutput.value = parseFloat(result.toFixed(2)).toString();
  }

  currencyInput.addEventListener("input", convertCurrency);
  currencyFrom.addEventListener("change", convertCurrency);
  currencyTo.addEventListener("change", convertCurrency);

  // Time converter setup (with from/to timezones)
  const timeInput = document.getElementById("time-input");
  const timeFromTimezone = document.getElementById("time-from-timezone");
  const timeToTimezone = document.getElementById("time-to-timezone");

  if (timeInput && timeFromTimezone && timeToTimezone) {
    // Populate timezone dropdowns
    populateTimeTimezoneSelects();

    // Add event listeners
    timeInput.addEventListener("input", refreshTimeConversions);
    timeFromTimezone.addEventListener("change", refreshTimeConversions);
    timeToTimezone.addEventListener("change", refreshTimeConversions);

    // Set current time as default
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    timeInput.value = currentTime;

    // Initial conversion
    refreshTimeConversions();
  }

  // Currency converter will be initialized from loadPreferences
}

// Helper function to get current timezone offset in minutes
function getCurrentTimezoneOffset(timezone) {
  const now = new Date();
  const utc1 = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const utc2 = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
  return (utc2.getTime() - utc1.getTime()) / (1000 * 60); // Convert to minutes
}

// Function to populate both timezone dropdowns (exact overlay logic)
function populateTimeTimezoneSelects() {
  const timeFromTimezoneSelect = document.getElementById("time-from-timezone");
  const timeToTimezoneSelect = document.getElementById("time-to-timezone");

  if (!timeFromTimezoneSelect || !timeToTimezoneSelect) return;

  // Clear existing options
  timeFromTimezoneSelect.innerHTML = "";
  timeToTimezoneSelect.innerHTML = "";

  // Group timezones by region (same as overlay)
  const regions = {};
  ALL_ZONES.forEach((zone) => {
    if (!regions[zone.region]) {
      regions[zone.region] = [];
    }
    regions[zone.region].push(zone);
  });

  // Helper function to get UTC offset for sorting (same as overlay)
  function getTimezoneOffsetForSorting(timezone) {
    try {
      const now = new Date();
      const utcTime = new Date(
        now.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const targetTime = new Date(
        now.toLocaleString("en-US", { timeZone: timezone })
      );
      return (targetTime.getTime() - utcTime.getTime()) / (1000 * 60); // Convert to minutes
    } catch (e) {
      return 0; // Default to UTC if calculation fails
    }
  }

  // Sort regions with UTC first, then alphabetically (Universal will be at bottom)
  const sortedRegions = Object.keys(regions).sort((a, b) => {
    if (a === "UTC") return -1; // UTC first
    if (b === "UTC") return 1;
    if (a === "Universal") return 1; // Universal last
    if (b === "Universal") return -1;
    return a.localeCompare(b); // Alphabetical for others
  });

  sortedRegions.forEach((regionName) => {
    // Create optgroups for both dropdowns
    const optgroup1 = document.createElement("optgroup");
    const optgroup2 = document.createElement("optgroup");
    optgroup1.label = regionName;
    optgroup2.label = regionName;

    // Sort zones within region
    regions[regionName].sort((a, b) => {
      // For UTC region, just keep as is (should only have one entry)
      if (regionName === "UTC") {
        return 0; // No sorting needed for UTC region
      }
      // For Universal region, put UTC first, then by offset
      if (regionName === "Universal") {
        if (a.iana === "UTC") return -1;
        if (b.iana === "UTC") return 1;
        const offsetA = getTimezoneOffsetForSorting(a.iana);
        const offsetB = getTimezoneOffsetForSorting(b.iana);
        return offsetA - offsetB;
      }
      // For other regions, sort by UTC offset (ascending: UTC-12 to UTC+14)
      const offsetA = getTimezoneOffsetForSorting(a.iana);
      const offsetB = getTimezoneOffsetForSorting(b.iana);
      return offsetA - offsetB;
    });

    regions[regionName].forEach((zone) => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = zone.iana;
      option2.value = zone.iana;
      option1.textContent = `${zone.city}, ${zone.country}`;
      option2.textContent = `${zone.city}, ${zone.country}`;
      optgroup1.appendChild(option1);
      optgroup2.appendChild(option2);
    });

    timeFromTimezoneSelect.appendChild(optgroup1);
    timeToTimezoneSelect.appendChild(optgroup2);
  });

  // Set defaults: from UTC, to primary timezone
  const prefs = currentPrefs.timezone || {};

  // Set from timezone to UTC
  timeFromTimezoneSelect.value = "UTC";

  // Set to timezone to user's primary timezone
  if (prefs.primaryTimezone) {
    timeToTimezoneSelect.value = prefs.primaryTimezone;
  } else {
    // Fallback to UTC if no primary timezone set
    timeToTimezoneSelect.value = "UTC";
  }
}

// Function to update timezone display above inputs (like overlay)
function updateTimezoneDisplayAboveInputs() {
  const timeFromTimezone = document.getElementById("time-from-timezone");
  const timeToTimezone = document.getElementById("time-to-timezone");

  if (!timeFromTimezone || !timeToTimezone) return;

  const fromTimezone = timeFromTimezone.value;
  const toTimezone = timeToTimezone.value;

  // Get timezone info for from timezone only
  const fromTimezoneInfo = ALL_ZONES.find((tz) => tz.iana === fromTimezone);
  let fromDisplayName = fromTimezone;
  if (fromTimezoneInfo) {
    const fromOffset = getCurrentTimezoneOffset(fromTimezone);
    const fromOffsetHours = fromOffset / 60;
    const fromOffsetSign = fromOffsetHours >= 0 ? "+" : "";
    fromDisplayName = `${fromTimezoneInfo.city}, ${fromTimezoneInfo.country} (UTC${fromOffsetSign}${fromOffsetHours})`;
  }

  // Update the display above inputs
  const timeDetected = document.getElementById("time-detected");
  if (timeDetected) {
    // Remove existing timezone display if it exists
    const existingDisplay = timeDetected.querySelector(".timezone-display");
    if (existingDisplay) {
      existingDisplay.remove();
    }

    // Create new timezone display
    const timezoneDisplay = document.createElement("div");
    timezoneDisplay.className = "timezone-display";
    timezoneDisplay.style.cssText = `
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      text-align: center;
      font-weight: 500;
    `;
    timezoneDisplay.textContent = fromDisplayName;

    // Insert at the beginning of time-detected
    timeDetected.insertBefore(timezoneDisplay, timeDetected.firstChild);
  }
}

// Function to refresh timezone conversions (with from/to conversion)
function refreshTimeConversions() {
  const timeConversions = document.getElementById("time-conversions");
  const timeInput = document.getElementById("time-input");
  const timeFromTimezone = document.getElementById("time-from-timezone");
  const timeToTimezone = document.getElementById("time-to-timezone");

  if (!timeConversions || !timeInput || !timeFromTimezone || !timeToTimezone)
    return;

  // Update timezone display above inputs (like overlay)
  updateTimezoneDisplayAboveInputs();

  // Clear existing conversions
  timeConversions.innerHTML = "";

  const inputTime = timeInput.value;
  const fromTimezone = timeFromTimezone.value;
  const toTimezone = timeToTimezone.value;

  if (!inputTime || !fromTimezone || !toTimezone) {
    return;
  }

  try {
    // Parse the time input (24-hour format)
    const [hours, minutes] = inputTime.split(":").map(Number);

    // Get source timezone offset in minutes
    const fromOffset = getCurrentTimezoneOffset(fromTimezone);

    // Get timezone preferences for all conversions to display
    const timezonePrefs = currentPrefs.timezone || {};
    const primaryTimezone = timezonePrefs.primaryTimezone || "UTC";
    const secondaryTimezones = timezonePrefs.secondaryTimezones || [];

    // Create array of all timezones to show (to timezone + primary + secondaries)
    const allTimezones = [toTimezone, primaryTimezone, ...secondaryTimezones];

    // Remove duplicates and filter out the from timezone
    const uniqueTimezones = [...new Set(allTimezones)].filter(
      (tz) => tz !== fromTimezone
    );

    // Generate conversions for each timezone in uniform style
    uniqueTimezones.forEach((timezone) => {
      // Calculate converted time from the source
      const targetOffset = getCurrentTimezoneOffset(timezone);
      const targetOffsetDiff = targetOffset - fromOffset;

      let targetTotalMinutes = hours * 60 + minutes + targetOffsetDiff;

      // Handle day rollover
      if (targetTotalMinutes < 0) targetTotalMinutes += 24 * 60;
      if (targetTotalMinutes >= 24 * 60) targetTotalMinutes -= 24 * 60;

      const targetNewHours = Math.floor(targetTotalMinutes / 60);
      const targetNewMinutes = targetTotalMinutes % 60;

      // Format time in 12-hour format for display
      let targetDisplayHour = targetNewHours;
      let targetAmpm = "AM";

      if (targetDisplayHour === 0) {
        targetDisplayHour = 12;
        targetAmpm = "AM";
      } else if (targetDisplayHour === 12) {
        targetAmpm = "PM";
      } else if (targetDisplayHour > 12) {
        targetDisplayHour = targetDisplayHour - 12;
        targetAmpm = "PM";
      }

      const targetFormattedTime = `${targetDisplayHour}:${String(
        targetNewMinutes
      ).padStart(2, "0")} ${targetAmpm}`;

      // Get timezone display name with UTC offset
      const timezoneInfo = ALL_ZONES.find((tz) => tz.iana === timezone);
      let displayName;
      if (timezoneInfo) {
        const offset = getCurrentTimezoneOffset(timezone);
        const offsetHours = offset / 60;
        const offsetSign = offsetHours >= 0 ? "+" : "";
        const offsetText = ` (UTC${offsetSign}${offsetHours})`;
        displayName = `${timezoneInfo.city}, ${timezoneInfo.country}${offsetText}`;
      } else {
        displayName = timezone;
      }

      // Create conversion item (uniform overlay style)
      const convDiv = document.createElement("div");
      convDiv.className = "time-conversion-item";

      const label = document.createElement("div");
      label.className = "time-conversion-label";
      label.textContent = displayName;

      const value = document.createElement("div");
      value.className = "time-conversion-value";
      value.textContent = targetFormattedTime;

      convDiv.appendChild(label);
      convDiv.appendChild(value);
      timeConversions.appendChild(convDiv);
    });
  } catch (error) {
    console.error("Error refreshing time conversions:", error);
  }
}

// Initialize currency converter with user preferences (global function)
function initializeCurrencyConverter() {
  const currencyFrom = document.getElementById("currency-from");
  const currencyTo = document.getElementById("currency-to");

  if (!currencyFrom || !currencyTo) return; // Exit if elements don't exist yet

  const currencyPrefs = currentPrefs.currency || {};
  const primaryCurrency = currencyPrefs.primaryCurrency || "HKD";
  const secondaryCurrencies = currencyPrefs.secondaryCurrencies || [];

  // Set first secondary currency as "from" default, fallback to USD
  const defaultFromCurrency =
    secondaryCurrencies.length > 0 ? secondaryCurrencies[0] : "USD";
  currencyFrom.value = defaultFromCurrency;

  // Set primary currency as "to" default
  currencyTo.value = primaryCurrency;

  // Trigger initial conversion if there's a value
  const currencyInput = document.getElementById("currency-input");
  if (currencyInput && currencyInput.value) {
    // Only trigger if convertCurrency function exists
    if (typeof convertCurrency === "function") {
      convertCurrency();
    }
  }
}

// Initialize length converter with user preferences (global function)
function initializeLengthConverter() {
  const lengthFrom = document.getElementById("length-from");

  if (!lengthFrom) return; // Exit if element doesn't exist yet

  const lengthPrefs = currentPrefs.length || {};
  const primaryUnit = lengthPrefs.primaryUnit || "feet-inches";

  // Set primary unit as default
  lengthFrom.value = primaryUnit;

  // Trigger initial conversion if there's a value
  const lengthInput = document.getElementById("length-input");
  const feetInput = document.getElementById("feet-input");
  const inchesInput = document.getElementById("inches-input");

  if (lengthInput && lengthInput.value) {
    // Only trigger if convertLength function exists
    if (typeof convertLength === "function") {
      convertLength();
    }
  } else if (
    feetInput &&
    inchesInput &&
    (feetInput.value || inchesInput.value)
  ) {
    // Only trigger if convertLength function exists
    if (typeof convertLength === "function") {
      convertLength();
    }
  }
}
