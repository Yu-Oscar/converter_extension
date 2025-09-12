// Overlay no longer needs selection position tracking

// Helper function to clear text selection
function clearTextSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

// Helper function to copy text to clipboard and show feedback
function copyToClipboard(text, element) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Show visual feedback
      const originalText = element.textContent;
      element.textContent = "Copied!";
      element.style.background = "#fef3c7";
      element.style.color = "#92400e";

      setTimeout(() => {
        element.textContent = originalText;
        element.style.background = "";
        element.style.color = "#d97706";
      }, 1500);
    })
    .catch(() => {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      // Show feedback
      const originalText = element.textContent;
      element.textContent = "Copied!";
      element.style.background = "#fef3c7";
      element.style.color = "#92400e";

      setTimeout(() => {
        element.textContent = originalText;
        element.style.background = "";
        element.style.color = "#d97706";
      }, 1500);
    });
}

// Comprehensive timezone database (simplified version of zone1970.tab data)
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

// Create TIMEZONE_MAP from ALL_ZONES data with stored offsets
const TIMEZONE_MAP = {};

// Define stored offsets for timezones with fixed offsets (using IANA timezone keys)
const STORED_OFFSETS = {
  // North America
  "America/Halifax": -240, // -4 hours (ADT)
  "America/St_Johns": -210, // -3.5 hours (NDT)

  // Europe
  UTC: 0, // 0 hours
  "Europe/London": 60, // +1 hour (BST)
  "Europe/Berlin": 60, // +1 hour (CET)
  "Europe/Athens": 120, // +2 hours (EET)
  "Europe/Moscow": 180, // +3 hours (MSK)
  "Europe/Lisbon": 0, // 0 hours (WET)

  // Asia
  "Asia/Kolkata": 330, // +5.5 hours (IST)
  "Asia/Tokyo": 540, // +9 hours (JST)
  "Asia/Seoul": 540, // +9 hours (KST)
  "Asia/Shanghai": 480, // +8 hours (CST_CN)
  "Asia/Dubai": 240, // +4 hours (GST)
  "Asia/Karachi": 300, // +5 hours (PKT)
  "Asia/Bangkok": 420, // +7 hours (ICT)
  "Asia/Singapore": 480, // +8 hours (SGT)
  "Asia/Hong_Kong": 480, // +8 hours (HKT)

  // Oceania
  "Australia/Sydney": 600, // +10 hours (AEST)
  "Australia/Perth": 480, // +8 hours (AWST)
  "Pacific/Auckland": 720, // +12 hours (NZST)
  "Pacific/Honolulu": -600, // -10 hours (HST)

  // South America
  "America/Sao_Paulo": -180, // -3 hours (BRT)
  "America/Argentina/Buenos_Aires": -180, // -3 hours (ART)
  "America/Bogota": -300, // -5 hours (COT)
  "America/Lima": -300, // -5 hours (PET)

  // Africa
  "Africa/Johannesburg": 120, // +2 hours (CAT)
  "Africa/Lagos": 60, // +1 hour (WAT)
  "Africa/Nairobi": 180, // +3 hours (EAT)

  // UTC timezones
  "Etc/GMT+12": -720, // -12 hours (UTC-12)
  "Etc/GMT+11": -660, // -11 hours (UTC-11)
  "Etc/GMT+10": -600, // -10 hours (UTC-10)
  "Etc/GMT+9": -540, // -9 hours (UTC-9)
  "Etc/GMT+8": -480, // -8 hours (UTC-8)
  "Etc/GMT+7": -420, // -7 hours (UTC-7)
  "Etc/GMT+6": -360, // -6 hours (UTC-6)
  "Etc/GMT+5": -300, // -5 hours (UTC-5)
  "Etc/GMT+4": -240, // -4 hours (UTC-4)
  "Etc/GMT+3": -180, // -3 hours (UTC-3)
  "Etc/GMT+2": -120, // -2 hours (UTC-2)
  "Etc/GMT+1": -60, // -1 hour (UTC-1)
  "Etc/GMT-1": 60, // +1 hour (UTC+1)
  "Etc/GMT-2": 120, // +2 hours (UTC+2)
  "Etc/GMT-3": 180, // +3 hours (UTC+3)
  "Etc/GMT-4": 240, // +4 hours (UTC+4)
  "Etc/GMT-5": 300, // +5 hours (UTC+5)
  "Etc/GMT-6": 360, // +6 hours (UTC+6)
  "Etc/GMT-7": 420, // +7 hours (UTC+7)
  "Etc/GMT-8": 480, // +8 hours (UTC+8)
  "Etc/GMT-9": 540, // +9 hours (UTC+9)
  "Etc/GMT-10": 600, // +10 hours (UTC+10)
  "Etc/GMT-11": 660, // +11 hours (UTC+11)
  "Etc/GMT-12": 720, // +12 hours (UTC+12)
};

// Create TIMEZONE_MAP directly from ALL_ZONES using IANA timezone keys
ALL_ZONES.forEach((zone) => {
  TIMEZONE_MAP[zone.iana] = {
    iana: zone.iana,
    offset: STORED_OFFSETS[zone.iana] || null, // Use stored offset or null for variable timezones
  };
});

// Smart CST handling: For text parsing, prioritize US Central Time
// But preserve China CST for manual dropdown selection
const CHINA_CST_IANA = TIMEZONE_MAP["CST"]?.iana; // Save China CST

// Add legacy abbreviations for backward compatibility
TIMEZONE_MAP["EST"] = { iana: "America/New_York", offset: -300 };
TIMEZONE_MAP["EDT"] = { iana: "America/New_York", offset: -240 };
TIMEZONE_MAP["CST"] = { iana: "America/Chicago", offset: -360 }; // Default CST = US Central (for text parsing)
TIMEZONE_MAP["CDT"] = { iana: "America/Chicago", offset: -300 };
TIMEZONE_MAP["MST"] = { iana: "America/Denver", offset: -420 };
TIMEZONE_MAP["MDT"] = { iana: "America/Denver", offset: -360 };
TIMEZONE_MAP["PST"] = { iana: "America/Los_Angeles", offset: -480 };
TIMEZONE_MAP["PDT"] = { iana: "America/Los_Angeles", offset: -420 };

// Add common timezone abbreviations for backward compatibility
TIMEZONE_MAP["ET"] = { iana: "America/New_York", offset: null }; // Variable offset (EST/EDT)
TIMEZONE_MAP["CT"] = { iana: "America/Chicago", offset: null }; // Variable offset (CST/CDT)
TIMEZONE_MAP["MT"] = { iana: "America/Denver", offset: null }; // Variable offset (MST/MDT)
TIMEZONE_MAP["PT"] = { iana: "America/Los_Angeles", offset: null }; // Variable offset (PST/PDT)
TIMEZONE_MAP["AT"] = { iana: "America/Halifax", offset: -240 };
TIMEZONE_MAP["NT"] = { iana: "America/St_Johns", offset: -210 };
TIMEZONE_MAP["GMT"] = { iana: "UTC", offset: 0 };
TIMEZONE_MAP["BST"] = { iana: "Europe/London", offset: 60 };
TIMEZONE_MAP["CET"] = { iana: "Europe/Berlin", offset: 60 };
TIMEZONE_MAP["EET"] = { iana: "Europe/Athens", offset: 120 };
TIMEZONE_MAP["MSK"] = { iana: "Europe/Moscow", offset: 180 };
TIMEZONE_MAP["WET"] = { iana: "Europe/Lisbon", offset: 0 };
TIMEZONE_MAP["IST"] = { iana: "Asia/Kolkata", offset: 330 };
TIMEZONE_MAP["JST"] = { iana: "Asia/Tokyo", offset: 540 };
TIMEZONE_MAP["KST"] = { iana: "Asia/Seoul", offset: 540 };
TIMEZONE_MAP["CST_CN"] = { iana: "Asia/Shanghai", offset: 480 };
TIMEZONE_MAP["GST"] = { iana: "Asia/Dubai", offset: 240 };
TIMEZONE_MAP["PKT"] = { iana: "Asia/Karachi", offset: 300 };
TIMEZONE_MAP["ICT"] = { iana: "Asia/Bangkok", offset: 420 };
TIMEZONE_MAP["SGT"] = { iana: "Asia/Singapore", offset: 480 };
TIMEZONE_MAP["HKT"] = { iana: "Asia/Hong_Kong", offset: 480 };
TIMEZONE_MAP["AEST"] = { iana: "Australia/Sydney", offset: 600 };
TIMEZONE_MAP["AWST"] = { iana: "Australia/Perth", offset: 480 };
TIMEZONE_MAP["NZST"] = { iana: "Pacific/Auckland", offset: 720 };
TIMEZONE_MAP["HST"] = { iana: "Pacific/Honolulu", offset: -600 };
TIMEZONE_MAP["BRT"] = { iana: "America/Sao_Paulo", offset: -180 };
TIMEZONE_MAP["ART"] = { iana: "America/Argentina/Buenos_Aires", offset: -180 };
TIMEZONE_MAP["COT"] = { iana: "America/Bogota", offset: -300 };
TIMEZONE_MAP["PET"] = { iana: "America/Lima", offset: -300 };
TIMEZONE_MAP["CAT"] = { iana: "Africa/Johannesburg", offset: 120 };
TIMEZONE_MAP["WAT"] = { iana: "Africa/Lagos", offset: 60 };
TIMEZONE_MAP["EAT"] = { iana: "Africa/Nairobi", offset: 180 };
// UTC timezones
TIMEZONE_MAP["UTC-12"] = { iana: "Etc/GMT+12", offset: -720 };
TIMEZONE_MAP["UTC-11"] = { iana: "Etc/GMT+11", offset: -660 };
TIMEZONE_MAP["UTC-10"] = { iana: "Etc/GMT+10", offset: -600 };
TIMEZONE_MAP["UTC-9"] = { iana: "Etc/GMT+9", offset: -540 };
TIMEZONE_MAP["UTC-8"] = { iana: "Etc/GMT+8", offset: -480 };
TIMEZONE_MAP["UTC-7"] = { iana: "Etc/GMT+7", offset: -420 };
TIMEZONE_MAP["UTC-6"] = { iana: "Etc/GMT+6", offset: -360 };
TIMEZONE_MAP["UTC-5"] = { iana: "Etc/GMT+5", offset: -300 };
TIMEZONE_MAP["UTC-4"] = { iana: "Etc/GMT+4", offset: -240 };
TIMEZONE_MAP["UTC-3"] = { iana: "Etc/GMT+3", offset: -180 };
TIMEZONE_MAP["UTC-2"] = { iana: "Etc/GMT+2", offset: -120 };
TIMEZONE_MAP["UTC-1"] = { iana: "Etc/GMT+1", offset: -60 };
TIMEZONE_MAP["UTC+1"] = { iana: "Etc/GMT-1", offset: 60 };
TIMEZONE_MAP["UTC+2"] = { iana: "Etc/GMT-2", offset: 120 };
TIMEZONE_MAP["UTC+3"] = { iana: "Etc/GMT-3", offset: 180 };
TIMEZONE_MAP["UTC+4"] = { iana: "Etc/GMT-4", offset: 240 };
TIMEZONE_MAP["UTC+5"] = { iana: "Etc/GMT-5", offset: 300 };
TIMEZONE_MAP["UTC+6"] = { iana: "Etc/GMT-6", offset: 360 };
TIMEZONE_MAP["UTC+7"] = { iana: "Etc/GMT-7", offset: 420 };
TIMEZONE_MAP["UTC+8"] = { iana: "Etc/GMT-8", offset: 480 };
TIMEZONE_MAP["UTC+9"] = { iana: "Etc/GMT-9", offset: 540 };
TIMEZONE_MAP["UTC+10"] = { iana: "Etc/GMT-10", offset: 600 };
TIMEZONE_MAP["UTC+11"] = { iana: "Etc/GMT-11", offset: 660 };
TIMEZONE_MAP["UTC+12"] = { iana: "Etc/GMT-12", offset: 720 };

// Function to get timezone with context-aware CST handling
function getTimezoneForId(timezoneId, isManualSelection = false) {
  if (timezoneId === "CST" && isManualSelection) {
    // When user manually selects CST from dropdown, check if it's China CST
    // We'll need additional logic here if needed
    return TIMEZONE_MAP[timezoneId]?.iana;
  }
  return TIMEZONE_MAP[timezoneId]?.iana;
}

// Function to normalize timezone abbreviations to preferred short forms
function normalizeTimezoneAbbr(tzAbbr) {
  const normalizations = {
    EST: "ET",
    EDT: "ET",
    CST: "CT", // US Central Time
    CDT: "CT",
    MST: "MT",
    MDT: "MT",
    PST: "PT",
    PDT: "PT",
  };

  return normalizations[tzAbbr] || tzAbbr;
}

// Auto-convert on text selection
let selectionTimeout;
let isOverlayInConverterMode = false; // Track if overlay is in converter mode

// Default timezone preferences
let timezonePrefs = {
  primaryTimezone: "America/New_York",
  secondaryTimezones: ["Europe/London", "Asia/Tokyo", "America/Los_Angeles"],
};

// Load timezone preferences from storage
function loadTimezonePreferences() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["preferences"], (result) => {
      if (result.preferences && result.preferences.timezone) {
        timezonePrefs = result.preferences.timezone;
      }
      resolve(timezonePrefs);
    });
  });
}

// Generate timezone conversions based on user preferences
function generateTimezoneConversions(
  sourceTime,
  sourceTimezone,
  sourceUtcOffset
) {
  const conversions = [];

  // Helper function to get timezone display name
  function getTimezoneDisplayName(timezone) {
    const timezoneInfo = ALL_ZONES.find((zone) => zone.iana === timezone);
    if (timezoneInfo) {
      return `${timezoneInfo.city}, ${timezoneInfo.country}`;
    }
    // Fallback: extract city from IANA name
    return timezone.split("/").pop().replace(/_/g, " ");
  }

  // Helper function to get current offset
  function getCurrentTimezoneOffsetMinutes(timezone) {
    const now = new Date();
    // Get the timezone offset using proper method
    const utcTime = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    const targetTime = new Date(
      now.toLocaleString("en-US", { timeZone: timezone })
    );
    return (targetTime.getTime() - utcTime.getTime()) / (1000 * 60); // Convert to minutes
  }

  // Helper function to format time in timezone using UTC offset
  function formatTimeInTimezone(sourceTime, sourceUtcOffset, targetTimezone) {
    try {
      // Parse the source time
      const [hours, minutes] = sourceTime.split(":").map(Number);

      // Get target timezone offset
      const targetOffsetMinutes =
        getCurrentTimezoneOffsetMinutes(targetTimezone);

      // Calculate offset difference (sourceUtcOffset is in minutes)
      const offsetDiffMinutes = targetOffsetMinutes - sourceUtcOffset;

      // Apply offset to source time
      let totalMinutes = hours * 60 + minutes + offsetDiffMinutes;

      // Handle day rollover
      if (totalMinutes < 0) totalMinutes += 24 * 60;
      if (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;

      // Convert back to hours and minutes
      const newHours = Math.floor(totalMinutes / 60);
      const newMinutes = totalMinutes % 60;

      // Format as 12-hour time
      let hour12 = newHours;
      const ampm = newHours >= 12 ? "PM" : "AM";
      if (hour12 === 0) hour12 = 12;
      else if (hour12 > 12) hour12 -= 12;

      return `${hour12}:${String(newMinutes).padStart(2, "0")} ${ampm}`;
    } catch (e) {
      console.error("Error in formatTimeInTimezone:", e);
      return "Invalid time";
    }
  }

  // Add primary timezone conversion
  if (
    timezonePrefs.primaryTimezone &&
    timezonePrefs.primaryTimezone !== sourceTimezone
  ) {
    try {
      const displayName = getTimezoneDisplayName(timezonePrefs.primaryTimezone);
      const offset = getCurrentTimezoneOffsetMinutes(
        timezonePrefs.primaryTimezone
      );
      const offsetHours = offset / 60;
      const offsetSign = offsetHours >= 0 ? "+" : "";
      // Format offset hours to handle fractional hours (like -2.5 for Newfoundland)
      const formattedOffset =
        offsetHours % 1 === 0 ? offsetHours.toString() : offsetHours.toFixed(1);
      const offsetText = ` (UTC${offsetSign}${formattedOffset})`;

      conversions.push({
        label: `${displayName}${offsetText}`,
        value: formatTimeInTimezone(
          sourceTime,
          sourceUtcOffset,
          timezonePrefs.primaryTimezone
        ),
      });
    } catch (e) {
      console.error("Error converting to primary timezone:", e);
    }
  }

  // Add secondary timezone conversions
  if (timezonePrefs.secondaryTimezones) {
    timezonePrefs.secondaryTimezones.forEach((timezone) => {
      if (
        timezone !== sourceTimezone &&
        timezone !== timezonePrefs.primaryTimezone
      ) {
        try {
          const displayName = getTimezoneDisplayName(timezone);
          const offset = getCurrentTimezoneOffsetMinutes(timezone);
          const offsetHours = offset / 60;
          const offsetSign = offsetHours >= 0 ? "+" : "";
          // Format offset hours to handle fractional hours (like -2.5 for Newfoundland)
          const formattedOffset =
            offsetHours % 1 === 0
              ? offsetHours.toString()
              : offsetHours.toFixed(1);
          const offsetText = ` (UTC${offsetSign}${formattedOffset})`;

          conversions.push({
            label: `${displayName}${offsetText}`,
            value: formatTimeInTimezone(sourceTime, sourceUtcOffset, timezone),
          });
        } catch (e) {
          console.error("Error converting to secondary timezone:", e);
        }
      }
    });
  }

  return conversions;
}

document.addEventListener("mouseup", () => {
  handleTextSelection();
});

// Initialize timezone preferences on content script load
loadTimezonePreferences();

document.addEventListener("keyup", (e) => {
  // Handle selection with keyboard (Shift + arrow keys, Ctrl+A, etc.)
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    handleTextSelection();
  }

  // Close overlay on Escape key
  if (e.key === "Escape") {
    const existing = document.getElementById("smart-converter-overlay");
    if (existing) {
      existing.remove();
      isOverlayInConverterMode = false; // Reset converter mode
    }
  }
});

// Close overlay when clicking elsewhere on the page
document.addEventListener("click", (e) => {
  const overlay = document.getElementById("smart-converter-overlay");
  if (overlay && !overlay.contains(e.target)) {
    // Special handling for select dropdowns - don't close if clicking on select options
    // Select dropdown options are rendered outside the tooltip element
    const isSelectOption =
      e.target.tagName === "OPTION" ||
      e.target.closest("select") !== null ||
      e.target.closest('[role="listbox"]') !== null ||
      e.target.closest('[role="option"]') !== null;

    if (!isSelectOption) {
      overlay.remove();
      isOverlayInConverterMode = false; // Reset converter mode
    }
  }
});

function handleTextSelection() {
  clearTimeout(selectionTimeout);

  // Add a small delay to avoid triggering on rapid selections
  selectionTimeout = setTimeout(() => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // If overlay is in converter mode, only process if it's new text (not empty selection)
    if (isOverlayInConverterMode && selectedText.length === 0) {
      return; // Don't process empty selections when in converter mode
    }

    if (isConvertibleText(selectedText)) {
      // Send message to background script for conversion
      chrome.runtime.sendMessage({
        action: "autoConvert",
        text: selectedText,
      });
    } else {
      // Hide existing overlay if the selection is not convertible
      const existing = document.getElementById("smart-converter-overlay");
      if (existing) {
        existing.remove();
        isOverlayInConverterMode = false; // Reset converter mode
      }
    }
  }, 300); // 300ms delay to avoid excessive API calls
}

function isConvertibleText(text) {
  if (!text || text.length === 0 || text.length > 200) {
    return false;
  }

  // Skip very short selections unless they contain numbers or specific patterns
  if (text.length < 2) {
    return false;
  }

  // Skip selections that are just single words without numbers or symbols
  if (text.length < 4 && !/[\d°'"$€£¥₹₩₽]/.test(text)) {
    return false;
  }

  // Skip common words and phrases that are unlikely to be convertible
  const commonWords =
    /^(the|and|or|but|in|on|at|to|for|of|with|by|from|up|about|into|over|after|beneath|under|above|below|during|before|since|until|while|although|because|if|when|where|how|what|who|why|which|that|this|these|those|a|an|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|can|must|shall|ought)$/i;

  if (commonWords.test(text.trim())) {
    return false;
  }

  return true;
}

function createOverlay() {
  // Remove existing overlay if present
  const existing = document.getElementById("smart-converter-overlay");
  if (existing) {
    existing.remove();
  }

  const overlay = document.createElement("div");
  overlay.id = "smart-converter-overlay";

  // Position overlay at top-right corner of viewport
  const tooltipWidth = 300;
  const margin = 20;

  // Fixed position at top-right corner
  const top = margin;
  const right = margin;

  overlay.style.cssText = `
    position: fixed !important;
    top: ${top}px !important;
    right: ${right}px !important;
    z-index: 2147483647 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    font-size: 14px !important;
    pointer-events: none !important;
    width: ${tooltipWidth}px !important;
  `;

  // No arrow needed for top-right position
  overlay.dataset.arrowOffset = 0;

  document.body.appendChild(overlay);
  return overlay;
}

function showResult(result, originalText) {
  // Handle different conversion types based on conversionType
  if (
    result.conversionType === "temperature" ||
    result.type === "temperature"
  ) {
    return showTemperatureResult(result, originalText);
  } else if (result.conversionType === "length") {
    return showLengthResult(result, originalText);
  } else if (result.conversionType === "weight") {
    return showWeightResult(result, originalText);
  } else if (result.conversionType === "currency") {
    return showCurrencyResult(result, originalText);
  } else {
    return showTimeResult(result, originalText);
  }
}

function showTemperatureResult(result, originalText) {
  const overlay = createOverlay();
  isOverlayInConverterMode = true; // Set converter mode after initial detection

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    max-width: 300px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    pointer-events: auto;
    position: relative;
  `;

  // Show detected temperature
  const detectedTempDiv = document.createElement("div");
  detectedTempDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;
  detectedTempDiv.textContent = `Detected: ${result.detectedTemp}${
    result.tempData?.unit?.toUpperCase() || ""
  }`;

  const conversionsContainer = document.createElement("div");

  if (result.conversions && result.conversions.length > 0) {
    result.conversions.forEach((conv) => {
      const convDiv = document.createElement("div");
      convDiv.style.cssText = "margin-bottom: 8px;";

      const label = document.createElement("div");
      label.style.cssText = `
        font-weight: 500;
        color: #666;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      label.textContent = conv.label;

      const value = document.createElement("div");
      value.style.cssText = `
        color: #d97706;
        font-weight: 600;
        margin-top: 2px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
      `;
      value.textContent = conv.value;

      // Add click-to-copy functionality
      value.addEventListener("click", () => {
        clearTextSelection();
        copyToClipboard(conv.value, value);
      });

      value.addEventListener("mouseenter", () => {
        value.style.backgroundColor = "#fef3c7";
        value.style.padding = "2px 4px";
        value.style.borderRadius = "3px";
        value.style.transform = "translateY(-1px)";
      });

      value.addEventListener("mouseleave", () => {
        value.style.backgroundColor = "";
        value.style.padding = "";
        value.style.borderRadius = "";
        value.style.transform = "";
      });

      convDiv.appendChild(label);
      convDiv.appendChild(value);
      conversionsContainer.appendChild(convDiv);
    });
  }

  tooltip.appendChild(detectedTempDiv);
  tooltip.appendChild(conversionsContainer);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
    isOverlayInConverterMode = false; // Reset converter mode
  };

  const handleDocumentClick = (e) => {
    if (!tooltip.contains(e.target)) {
      // Special handling for select dropdowns - don't close if clicking on select options
      // Select dropdown options are rendered outside the tooltip element
      const isSelectOption =
        e.target.tagName === "OPTION" ||
        e.target.closest("select") !== null ||
        e.target.closest('[role="listbox"]') !== null ||
        e.target.closest('[role="option"]') !== null;

      if (!isSelectOption) {
        closeTooltip();
      }
    }
  };

  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(0)";
  });
}

function showLengthResult(result, originalText) {
  const overlay = createOverlay();
  isOverlayInConverterMode = true; // Set converter mode after initial detection

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    max-width: 300px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    pointer-events: auto;
    position: relative;
  `;

  // Show detected length
  const detectedLengthDiv = document.createElement("div");
  detectedLengthDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;
  detectedLengthDiv.textContent = `Detected: ${result.detectedValue || ""}`;

  const conversionsContainer = document.createElement("div");

  if (result.conversions && result.conversions.length > 0) {
    result.conversions.forEach((conv) => {
      const convDiv = document.createElement("div");
      convDiv.style.cssText = "margin-bottom: 8px;";

      const label = document.createElement("div");
      label.style.cssText = `
        font-weight: 500;
        color: #666;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      label.textContent = conv.label;

      const value = document.createElement("div");
      value.style.cssText = `
        color: #d97706;
        font-weight: 600;
        margin-top: 2px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
      `;
      value.textContent = conv.value;

      // Add click-to-copy functionality
      value.addEventListener("click", () => {
        clearTextSelection();
        copyToClipboard(conv.value, value);
      });

      value.addEventListener("mouseenter", () => {
        value.style.backgroundColor = "#fef3c7";
        value.style.padding = "2px 4px";
        value.style.borderRadius = "3px";
        value.style.transform = "translateY(-1px)";
      });

      value.addEventListener("mouseleave", () => {
        value.style.backgroundColor = "";
        value.style.padding = "";
        value.style.borderRadius = "";
        value.style.transform = "";
      });

      convDiv.appendChild(label);
      convDiv.appendChild(value);
      conversionsContainer.appendChild(convDiv);
    });
  }

  tooltip.appendChild(detectedLengthDiv);
  tooltip.appendChild(conversionsContainer);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
    isOverlayInConverterMode = false; // Reset converter mode
  };

  const handleDocumentClick = (e) => {
    if (!tooltip.contains(e.target)) {
      // Special handling for select dropdowns - don't close if clicking on select options
      // Select dropdown options are rendered outside the tooltip element
      const isSelectOption =
        e.target.tagName === "OPTION" ||
        e.target.closest("select") !== null ||
        e.target.closest('[role="listbox"]') !== null ||
        e.target.closest('[role="option"]') !== null;

      if (!isSelectOption) {
        closeTooltip();
      }
    }
  };

  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(0)";
  });
}

function showWeightResult(result, originalText) {
  const overlay = createOverlay();
  isOverlayInConverterMode = true; // Set converter mode after initial detection

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    max-width: 300px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    pointer-events: auto;
    position: relative;
  `;

  // Show detected weight
  const detectedWeightDiv = document.createElement("div");
  detectedWeightDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;
  detectedWeightDiv.textContent = `Detected: ${result.detectedValue || ""}`;

  const conversionsContainer = document.createElement("div");

  if (result.conversions && result.conversions.length > 0) {
    result.conversions.forEach((conv) => {
      const convDiv = document.createElement("div");
      convDiv.style.cssText = "margin-bottom: 8px;";

      const label = document.createElement("div");
      label.style.cssText = `
        font-weight: 500;
        color: #666;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      label.textContent = conv.label;

      const value = document.createElement("div");
      value.style.cssText = `
        color: #d97706;
        font-weight: 600;
        margin-top: 2px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
      `;
      value.textContent = conv.value;

      // Add click-to-copy functionality
      value.addEventListener("click", () => {
        clearTextSelection();
        copyToClipboard(conv.value, value);
      });

      value.addEventListener("mouseenter", () => {
        value.style.backgroundColor = "#fef3c7";
        value.style.padding = "2px 4px";
        value.style.borderRadius = "3px";
        value.style.transform = "translateY(-1px)";
      });

      value.addEventListener("mouseleave", () => {
        value.style.backgroundColor = "";
        value.style.padding = "";
        value.style.borderRadius = "";
        value.style.transform = "";
      });

      convDiv.appendChild(label);
      convDiv.appendChild(value);
      conversionsContainer.appendChild(convDiv);
    });
  }

  tooltip.appendChild(detectedWeightDiv);
  tooltip.appendChild(conversionsContainer);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
    isOverlayInConverterMode = false; // Reset converter mode
  };

  const handleDocumentClick = (e) => {
    if (!tooltip.contains(e.target)) {
      // Special handling for select dropdowns - don't close if clicking on select options
      // Select dropdown options are rendered outside the tooltip element
      const isSelectOption =
        e.target.tagName === "OPTION" ||
        e.target.closest("select") !== null ||
        e.target.closest('[role="listbox"]') !== null ||
        e.target.closest('[role="option"]') !== null;

      if (!isSelectOption) {
        closeTooltip();
      }
    }
  };

  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(0)";
  });
}

function showCurrencyResult(result, originalText) {
  const overlay = createOverlay();
  isOverlayInConverterMode = true; // Set converter mode after initial detection

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    max-width: 320px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    pointer-events: auto;
    position: relative;
  `;

  // Show detected currency
  const detectedCurrencyDiv = document.createElement("div");
  detectedCurrencyDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;
  detectedCurrencyDiv.textContent = `Detected: ${result.detectedValue || ""}`;

  const conversionsContainer = document.createElement("div");

  if (result.conversions && result.conversions.length > 0) {
    result.conversions.forEach((conv) => {
      const convDiv = document.createElement("div");
      convDiv.style.cssText = "margin-bottom: 8px;";

      const label = document.createElement("div");
      label.style.cssText = `
        font-weight: 500;
        color: #666;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
      label.textContent = conv.label;

      const value = document.createElement("div");
      value.style.cssText = `
        color: #d97706;
        font-weight: 600;
        margin-top: 2px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s ease;
      `;
      value.textContent = conv.value;

      // Add click-to-copy functionality
      value.addEventListener("click", () => {
        clearTextSelection();
        copyToClipboard(conv.value, value);
      });

      value.addEventListener("mouseenter", () => {
        value.style.backgroundColor = "#fef3c7";
        value.style.padding = "2px 4px";
        value.style.borderRadius = "3px";
        value.style.transform = "translateY(-1px)";
      });

      value.addEventListener("mouseleave", () => {
        value.style.backgroundColor = "";
        value.style.padding = "";
        value.style.borderRadius = "";
        value.style.transform = "";
      });

      convDiv.appendChild(label);
      convDiv.appendChild(value);
      conversionsContainer.appendChild(convDiv);
    });
  }

  tooltip.appendChild(detectedCurrencyDiv);
  tooltip.appendChild(conversionsContainer);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
    isOverlayInConverterMode = false; // Reset converter mode
  };

  const handleDocumentClick = (e) => {
    if (!tooltip.contains(e.target)) {
      // Special handling for select dropdowns - don't close if clicking on select options
      // Select dropdown options are rendered outside the tooltip element
      const isSelectOption =
        e.target.tagName === "OPTION" ||
        e.target.closest("select") !== null ||
        e.target.closest('[role="listbox"]') !== null ||
        e.target.closest('[role="option"]') !== null;

      if (!isSelectOption) {
        closeTooltip();
      }
    }
  };

  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(0)";
  });
}

function showTimeResult(result, originalText) {
  const overlay = createOverlay();
  isOverlayInConverterMode = true; // Set converter mode after initial detection

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    max-width: 450px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    pointer-events: auto;
    position: relative;
  `;

  // Show detected timezone name
  const detectedZoneDiv = document.createElement("div");
  detectedZoneDiv.style.cssText = `
    font-size: 12px;
    font-weight: 500;
    color: #666;
    margin-bottom: 8px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;

  // Show editable time dropdowns
  const detectedDiv = document.createElement("div");
  detectedDiv.style.cssText = `
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
  `;

  // Get initial values from structured data
  let initialHour = 8;
  let initialMinute = 0;
  let initialAMPM = "PM";
  let initialTimezone = null; // No default timezone

  // Use structured data from result.timeData if available
  if (result.timeData) {
    const { hours, minutes, sourceTimezone } = result.timeData;

    // Convert 24-hour to 12-hour for dropdowns
    if (hours === 0) {
      initialHour = 12;
      initialAMPM = "AM";
    } else if (hours < 12) {
      initialHour = hours;
      initialAMPM = "AM";
    } else if (hours === 12) {
      initialHour = 12;
      initialAMPM = "PM";
    } else {
      initialHour = hours - 12;
      initialAMPM = "PM";
    }

    initialMinute = minutes;

    // Find timezone abbreviation from IANA name
    if (sourceTimezone) {
      // Lookup timezone abbreviation from TIMEZONE_MAP
      const tzAbbr = Object.keys(TIMEZONE_MAP).find(
        (key) => TIMEZONE_MAP[key]?.iana === sourceTimezone
      );
      if (tzAbbr) {
        initialTimezone = tzAbbr;
      }
    }
    // If no sourceTimezone, initialTimezone remains null
  } else {
    // Fallback: try to parse from original text if no structured data
    const originalTimeMatch = originalText.match(
      /(\d{1,2}):(\d{2})\s*([A-Z]{2,4})?/
    );
    if (originalTimeMatch) {
      let hour = parseInt(originalTimeMatch[1]);
      let minute = parseInt(originalTimeMatch[2]);
      let tz = originalTimeMatch[3];

      // Convert 24-hour to 12-hour for dropdowns
      if (hour === 0) {
        initialHour = 12;
        initialAMPM = "AM";
      } else if (hour < 12) {
        initialHour = hour;
        initialAMPM = "AM";
      } else if (hour === 12) {
        initialHour = 12;
        initialAMPM = "PM";
      } else {
        initialHour = hour - 12;
        initialAMPM = "PM";
      }

      initialMinute = minute;
      if (tz) {
        initialTimezone = tz;
      }
      // If no tz detected, initialTimezone remains null
    }
  }

  // Show simple one-line timezone info
  detectedZoneDiv.innerHTML = ""; // Clear existing content
  detectedZoneDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
    text-align: center;
    font-weight: 500;
  `;

  // Function to update simple timezone display
  function updateTimeDataDisplay(result, isSelected = false) {
    detectedZoneDiv.innerHTML = ""; // Clear existing content

    if (result.timeData) {
      const timeData = result.timeData;

      // Get city and country from timezone
      let cityName = "Unknown";
      let countryName = "Unknown";
      let offsetText = "";

      if (timeData.sourceTimezone) {
        // Extract city name from IANA timezone (e.g., "Asia/Hong_Kong" -> "Hong Kong")
        cityName = timeData.sourceTimezone.split("/").pop().replace(/_/g, " ");

        // Try to get city and country from ALL_ZONES
        const timezoneInfo = ALL_ZONES.find(
          (zone) => zone.iana === timeData.sourceTimezone
        );
        if (timezoneInfo) {
          cityName = timezoneInfo.city;
          countryName = timezoneInfo.country;
        }
      }

      // Format offset
      if (timeData.utcOffset !== undefined) {
        const offsetHours = timeData.utcOffset / 60;
        const offsetSign = timeData.utcOffset >= 0 ? "+" : "";
        offsetText = ` (UTC${offsetSign}${offsetHours})`;
      }

      // Create simple one-line display with city, country and offset
      const timezoneText = `${cityName}, ${countryName}${offsetText}`;
      detectedZoneDiv.textContent = timezoneText;
    }
  }

  // Use the function to show initial time data
  updateTimeDataDisplay(result, false);

  // Track if user has manually changed the timezone
  let isManuallySelected = false;

  // Time input (single field like popup)
  const timeInput = document.createElement("input");
  timeInput.type = "time";
  // Convert 12-hour format to 24-hour format for time input
  let hour24 = initialHour;
  if (initialAMPM === "AM" && initialHour === 12) {
    hour24 = 0;
  } else if (initialAMPM === "PM" && initialHour !== 12) {
    hour24 = initialHour + 12;
  }
  timeInput.value = `${String(hour24).padStart(2, "0")}:${String(
    initialMinute
  ).padStart(2, "0")}`;
  timeInput.tabIndex = 0; // Ensure it's focusable
  timeInput.style.cssText = `
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    background: white;
    color: #333;
    width: 100px;
    text-align: center;
    outline: none;
    height: 32px;
    box-sizing: border-box;
  `;
  // Event listeners will be added after autoConvert function is defined

  // Popular/Most Used Timezones (shown first)
  const POPULAR_ZONES = [
    "ET",
    "PT",
    "GMT",
    "CET",
    "IST",
    "HKT",
    "JST",
    "KST",
    "BRT",
    "AEST",
  ];

  // Create timezone dropdown
  const timezoneSelect = document.createElement("select");
  timezoneSelect.style.cssText = `
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    background: white;
    color: #333;
    margin-left: 8px;
    outline: none;
    min-width: 140px;
    max-width: 180px;
    height: 32px;
    box-sizing: border-box;
  `;

  // Add all IANA timezones to dropdown, organized by region
  const regions = {};
  ALL_ZONES.forEach((zone) => {
    if (!regions[zone.region]) {
      regions[zone.region] = [];
    }
    regions[zone.region].push(zone);
  });

  // Helper function to get UTC offset for sorting
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

  // Sort regions and add optgroups
  Object.keys(regions)
    .sort()
    .forEach((regionName) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = regionName;

      // Sort zones within region by UTC offset (ascending: UTC-12 to UTC+14)
      regions[regionName].sort((a, b) => {
        const offsetA = getTimezoneOffsetForSorting(a.iana);
        const offsetB = getTimezoneOffsetForSorting(b.iana);
        return offsetA - offsetB;
      });

      regions[regionName].forEach((zone) => {
        const option = document.createElement("option");
        option.value = zone.iana;

        option.textContent = `${zone.city}, ${zone.country}`;
        optgroup.appendChild(option);
      });

      timezoneSelect.appendChild(optgroup);
    });

  // Set initial value to detected timezone
  if (result.timeData && result.timeData.sourceTimezone) {
    timezoneSelect.value = result.timeData.sourceTimezone;
  }

  // Create container for time input and timezone dropdown
  const inputContainer = document.createElement("div");
  inputContainer.style.cssText = `
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  `;

  inputContainer.appendChild(timeInput);
  inputContainer.appendChild(timezoneSelect);
  detectedDiv.appendChild(inputContainer);

  // Helper function to get current timezone offset in hours
  function getCurrentTimezoneOffset(timezone) {
    const now = new Date();
    const utc1 = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    const utc2 = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
    return (utc2.getTime() - utc1.getTime()) / (1000 * 60 * 60); // Convert to hours
  }

  // Clear text selection when clicking on time input
  timeInput.addEventListener("click", () => {
    window.getSelection().removeAllRanges();
  });

  // Update display text when timezone dropdown changes
  timezoneSelect.addEventListener("change", () => {
    const selectedTimezone = timezoneSelect.value;
    if (selectedTimezone) {
      try {
        // Find the timezone info from ALL_ZONES
        const timezoneInfo = ALL_ZONES.find(
          (zone) => zone.iana === selectedTimezone
        );

        let cityName = "Unknown";
        let countryCode = "Unknown";

        if (timezoneInfo) {
          cityName = timezoneInfo.city;
          countryCode = timezoneInfo.country;
        } else {
          // Fallback: extract city from IANA name
          cityName = selectedTimezone.split("/").pop().replace(/_/g, " ");
        }

        const offset = getCurrentTimezoneOffset(selectedTimezone);
        const offsetSign = offset >= 0 ? "+" : "";
        const offsetText = ` (UTC${offsetSign}${offset})`;
        detectedZoneDiv.textContent = `${cityName}, ${countryCode}${offsetText}`;
      } catch (e) {
        detectedZoneDiv.textContent = selectedTimezone;
      }
    }

    // Refresh timezone conversions when timezone changes
    refreshConversions();
  });

  // Add event listener to refresh conversions when time input changes
  timeInput.addEventListener("input", () => {
    refreshConversions();
  });

  // Load timezone preferences and generate conversions
  const conversionsContainer = document.createElement("div");

  // Helper function to get current timezone offset (needed in refreshConversions)
  function getCurrentTimezoneOffsetMinutes(timezone) {
    const now = new Date();
    const utc1 = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    const utc2 = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
    return (utc2.getTime() - utc1.getTime()) / (1000 * 60); // Convert to minutes
  }

  // Function to refresh timezone conversions (used when user changes inputs)
  function refreshConversions() {
    // Clear existing conversions
    conversionsContainer.innerHTML = "";

    // Get current input values
    const timeValue = timeInput.value; // e.g., "2:30 PM"
    const selectedTimezone = timezoneSelect.value; // e.g., "America/New_York"

    if (timeValue && selectedTimezone) {
      try {
        // Parse time input to get hours and minutes in 24-hour format
        const [time, ampm] = timeValue.split(" ");
        const [hours, minutes] = time.split(":").map(Number);
        let hours24 = hours;

        if (ampm === "PM" && hours !== 12) hours24 += 12;
        if (ampm === "AM" && hours === 12) hours24 = 0;

        const sourceTime = `${String(hours24).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}`;

        // Get UTC offset for the selected timezone (in minutes)
        const sourceUtcOffset =
          getCurrentTimezoneOffsetMinutes(selectedTimezone);

        const conversions = generateTimezoneConversions(
          sourceTime,
          selectedTimezone,
          sourceUtcOffset
        );

        if (conversions && conversions.length > 0) {
          conversions.forEach((conv) => {
            const convDiv = document.createElement("div");
            convDiv.style.cssText = "margin-bottom: 8px;";

            const label = document.createElement("div");
            label.style.cssText = `
              font-weight: 500;
              color: #666;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            `;
            label.textContent = conv.label;

            const value = document.createElement("div");
            value.style.cssText = `
              color: #d97706;
              font-weight: 600;
              margin-top: 2px;
              font-size: 16px;
              cursor: pointer;
              user-select: none;
              transition: all 0.2s ease;
            `;
            value.textContent = conv.value;

            // Add click-to-copy functionality
            value.addEventListener("click", () => {
              clearTextSelection();
              copyToClipboard(conv.value, value);
            });

            value.addEventListener("mouseenter", () => {
              value.style.backgroundColor = "#fef3c7";
              value.style.padding = "2px 4px";
              value.style.borderRadius = "3px";
              value.style.transform = "translateY(-1px)";
            });

            value.addEventListener("mouseleave", () => {
              value.style.backgroundColor = "";
              value.style.padding = "";
              value.style.borderRadius = "";
              value.style.transform = "";
            });

            convDiv.appendChild(label);
            convDiv.appendChild(value);
            conversionsContainer.appendChild(convDiv);
          });
        }
      } catch (e) {
        console.error("Error refreshing conversions:", e);
      }
    }
  }

  // Load preferences and show conversions
  loadTimezonePreferences().then(() => {
    // Generate conversions using timeData if available
    if (
      result.timeData &&
      result.timeData.sourceTimezone &&
      result.timeData.utcOffset !== undefined
    ) {
      const sourceTime = `${String(result.timeData.hours).padStart(
        2,
        "0"
      )}:${String(result.timeData.minutes).padStart(2, "0")}`;
      const conversions = generateTimezoneConversions(
        sourceTime,
        result.timeData.sourceTimezone,
        result.timeData.utcOffset
      );

      if (conversions && conversions.length > 0) {
        conversions.forEach((conv) => {
          const convDiv = document.createElement("div");
          convDiv.style.cssText = "margin-bottom: 8px;";

          const label = document.createElement("div");
          label.style.cssText = `
            font-weight: 500;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          `;
          label.textContent = conv.label;

          const value = document.createElement("div");
          value.style.cssText = `
            color: #d97706;
            font-weight: 600;
            margin-top: 2px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
            transition: all 0.2s ease;
          `;
          value.textContent = conv.value;

          // Add click-to-copy functionality
          value.addEventListener("click", () => {
            clearTextSelection();
            copyToClipboard(conv.value, value);
          });

          value.addEventListener("mouseenter", () => {
            value.style.backgroundColor = "#fef3c7";
            value.style.padding = "2px 4px";
            value.style.borderRadius = "3px";
            value.style.transform = "translateY(-1px)";
          });

          value.addEventListener("mouseleave", () => {
            value.style.backgroundColor = "";
            value.style.padding = "";
            value.style.borderRadius = "";
            value.style.transform = "";
          });

          convDiv.appendChild(label);
          convDiv.appendChild(value);
          conversionsContainer.appendChild(convDiv);
        });
      }
    } else {
      // Fallback to refreshConversions if no timeData available
      refreshConversions();
    }
  });

  tooltip.appendChild(detectedZoneDiv);
  tooltip.appendChild(detectedDiv);
  tooltip.appendChild(conversionsContainer);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
    isOverlayInConverterMode = false; // Reset converter mode
  };

  const handleDocumentClick = (e) => {
    // Don't close if clicking inside the tooltip
    if (!tooltip.contains(e.target)) {
      closeTooltip();
    }
  };

  // Add click listener after a short delay to prevent immediate closing
  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  // Also close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  // Show with animation
  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(0)";

    // Unselect any selected text after overlay is shown
    window.getSelection().removeAllRanges();
  });
}

function showError(error, originalText) {
  const overlay = createOverlay();
  isOverlayInConverterMode = true; // Set converter mode after initial detection

  const tooltip = document.createElement("div");
  tooltip.style.cssText = `
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    max-width: 300px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    pointer-events: auto;
    position: relative;
  `;

  const detectedDiv = document.createElement("div");
  detectedDiv.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
    font-style: italic;
  `;
  detectedDiv.textContent = `Could not parse time format`;

  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
    color: #dc2626;
    font-style: italic;
    margin-bottom: 12px;
  `;
  errorDiv.textContent = `Error: ${error}`;

  tooltip.appendChild(detectedDiv);
  tooltip.appendChild(errorDiv);
  overlay.appendChild(tooltip);

  // Add click-outside-to-close functionality
  const closeTooltip = () => {
    if (overlay.parentNode) {
      overlay.remove();
    }
    document.removeEventListener("click", handleDocumentClick);
    isOverlayInConverterMode = false; // Reset converter mode
  };

  const handleDocumentClick = (e) => {
    // Don't close if clicking inside the tooltip
    if (!tooltip.contains(e.target)) {
      closeTooltip();
    }
  };

  // Add click listener after a short delay to prevent immediate closing
  setTimeout(() => {
    document.addEventListener("click", handleDocumentClick);
  }, 100);

  // Also close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeTooltip();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  // Show with animation
  requestAnimationFrame(() => {
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateX(0)";
  });
}

// Listen for messages from background script

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showConversion") {
    showResult(message.result, message.originalText);
  } else if (message.action === "showError") {
    showError(message.error, message.originalText);
  } else if (message.action === "updateTimeData" && message.result) {
    // Update the time data display if we have an active time overlay
    if (
      isOverlayInConverterMode &&
      typeof updateTimeDataDisplay === "function"
    ) {
      updateTimeDataDisplay(message.result, message.isSelected || false);
    }
  }

  sendResponse({ received: true });
});
