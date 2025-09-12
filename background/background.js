// Common timezone abbreviations to IANA timezone mapping with UTC offsets
const TIMEZONE_MAP = {
  // North America
  ET: { iana: "America/New_York", offset: null }, // Variable offset (EST/EDT)
  EST: { iana: "America/New_York", offset: -300 }, // -5 hours
  EDT: { iana: "America/New_York", offset: -240 }, // -4 hours
  CT: { iana: "America/Chicago", offset: null }, // Variable offset (CST/CDT)
  CST: { iana: "America/Chicago", offset: -360 }, // -6 hours (Legacy US - conflicts with China)
  CDT: { iana: "America/Chicago", offset: -300 }, // -5 hours
  MT: { iana: "America/Denver", offset: null }, // Variable offset (MST/MDT)
  MST: { iana: "America/Denver", offset: -420 }, // -7 hours
  MDT: { iana: "America/Denver", offset: -360 }, // -6 hours
  PT: { iana: "America/Los_Angeles", offset: null }, // Variable offset (PST/PDT)
  PST: { iana: "America/Los_Angeles", offset: -480 }, // -8 hours
  PDT: { iana: "America/Los_Angeles", offset: -420 }, // -7 hours
  AT: { iana: "America/Halifax", offset: -240 }, // -4 hours (ADT)
  NT: { iana: "America/St_Johns", offset: -210 }, // -3.5 hours (NDT)
  MXT: { iana: "America/Mexico_City", offset: -360 }, // -6 hours (CST)

  // Europe / Middle East
  UTC: { iana: "UTC", offset: 0 }, // 0 hours
  BST: { iana: "Europe/London", offset: 60 }, // +1 hour
  GMT: { iana: "UTC", offset: 0 }, // 0 hours
  CET: { iana: "Europe/Berlin", offset: 60 }, // +1 hour
  EET: { iana: "Europe/Athens", offset: 120 }, // +2 hours
  MSK: { iana: "Europe/Moscow", offset: 180 }, // +3 hours
  WET: { iana: "Europe/Lisbon", offset: 0 }, // 0 hours (WET)
  TRT: { iana: "Europe/Istanbul", offset: 180 }, // +3 hours
  IRST: { iana: "Asia/Tehran", offset: 210 }, // +3.5 hours
  IST_IL: { iana: "Asia/Jerusalem", offset: 120 }, // +2 hours (Israel)
  UA: { iana: "Europe/Kyiv", offset: 120 }, // +2 hours (Ukraine)

  // Asia
  IST: { iana: "Asia/Kolkata", offset: 330 }, // +5.5 hours
  JST: { iana: "Asia/Tokyo", offset: 540 }, // +9 hours
  KST: { iana: "Asia/Seoul", offset: 540 }, // +9 hours
  CST_CN: { iana: "Asia/Shanghai", offset: 480 }, // +8 hours (China Standard Time)
  GST: { iana: "Asia/Dubai", offset: 240 }, // +4 hours
  PKT: { iana: "Asia/Karachi", offset: 300 }, // +5 hours
  ICT: { iana: "Asia/Bangkok", offset: 420 }, // +7 hours
  SGT: { iana: "Asia/Singapore", offset: 480 }, // +8 hours
  HKT: { iana: "Asia/Hong_Kong", offset: 480 }, // +8 hours
  MYT: { iana: "Asia/Kuala_Lumpur", offset: 480 }, // +8 hours
  PHT: { iana: "Asia/Manila", offset: 480 }, // +8 hours
  WIB: { iana: "Asia/Jakarta", offset: 420 }, // +7 hours
  WITA: { iana: "Asia/Makassar", offset: 480 }, // +8 hours
  WIT: { iana: "Asia/Jayapura", offset: 540 }, // +9 hours

  // Oceania
  AEST: { iana: "Australia/Sydney", offset: 600 }, // +10 hours
  AWST: { iana: "Australia/Perth", offset: 480 }, // +8 hours
  NZST: { iana: "Pacific/Auckland", offset: 720 }, // +12 hours
  HST: { iana: "Pacific/Honolulu", offset: -600 }, // -10 hours
  FJT: { iana: "Pacific/Fiji", offset: 720 }, // +12 hours
  PGT: { iana: "Pacific/Port_Moresby", offset: 600 }, // +10 hours

  // South America
  BRT: { iana: "America/Sao_Paulo", offset: -180 }, // -3 hours
  ART: { iana: "America/Argentina/Buenos_Aires", offset: -180 }, // -3 hours
  COT: { iana: "America/Bogota", offset: -300 }, // -5 hours
  PET: { iana: "America/Lima", offset: -300 }, // -5 hours
  CLT: { iana: "America/Santiago", offset: -180 }, // -3 hours (CLST)
  VET: { iana: "America/Caracas", offset: -240 }, // -4 hours

  // Africa
  CAT: { iana: "Africa/Johannesburg", offset: 120 }, // +2 hours
  WAT: { iana: "Africa/Lagos", offset: 60 }, // +1 hour
  EAT: { iana: "Africa/Nairobi", offset: 180 }, // +3 hours
  EET_EG: { iana: "Africa/Cairo", offset: 120 }, // +2 hours
  WET_MA: { iana: "Africa/Casablanca", offset: 0 }, // 0 hours (WET)

  // UTC timezones
  "UTC-12": { iana: "Etc/GMT+12", offset: -720 }, // -12 hours
  "UTC-11": { iana: "Etc/GMT+11", offset: -660 }, // -11 hours
  "UTC-10": { iana: "Etc/GMT+10", offset: -600 }, // -10 hours
  "UTC-9": { iana: "Etc/GMT+9", offset: -540 }, // -9 hours
  "UTC-8": { iana: "Etc/GMT+8", offset: -480 }, // -8 hours
  "UTC-7": { iana: "Etc/GMT+7", offset: -420 }, // -7 hours
  "UTC-6": { iana: "Etc/GMT+6", offset: -360 }, // -6 hours
  "UTC-5": { iana: "Etc/GMT+5", offset: -300 }, // -5 hours
  "UTC-4": { iana: "Etc/GMT+4", offset: -240 }, // -4 hours
  "UTC-3": { iana: "Etc/GMT+3", offset: -180 }, // -3 hours
  "UTC-2": { iana: "Etc/GMT+2", offset: -120 }, // -2 hours
  "UTC-1": { iana: "Etc/GMT+1", offset: -60 }, // -1 hour
  "UTC+1": { iana: "Etc/GMT-1", offset: 60 }, // +1 hour
  "UTC+2": { iana: "Etc/GMT-2", offset: 120 }, // +2 hours
  "UTC+3": { iana: "Etc/GMT-3", offset: 180 }, // +3 hours
  "UTC+4": { iana: "Etc/GMT-4", offset: 240 }, // +4 hours
  "UTC+5": { iana: "Etc/GMT-5", offset: 300 }, // +5 hours
  "UTC+6": { iana: "Etc/GMT-6", offset: 360 }, // +6 hours
  "UTC+7": { iana: "Etc/GMT-7", offset: 420 }, // +7 hours
  "UTC+8": { iana: "Etc/GMT-8", offset: 480 }, // +8 hours
  "UTC+9": { iana: "Etc/GMT-9", offset: 540 }, // +9 hours
  "UTC+10": { iana: "Etc/GMT-10", offset: 600 }, // +10 hours
  "UTC+11": { iana: "Etc/GMT-11", offset: 660 }, // +11 hours
  "UTC+12": { iana: "Etc/GMT-12", offset: 720 }, // +12 hours
};

// Temperature detection and conversion functions
function detectTemperaturePattern(text) {
  const tempPatterns = [
    // Celsius: "25°C", "25 °C", "25c", "25 celsius", "200C"
    /(-?\d+(?:\.\d+)?)\s*°?\s*c(?:elsius)?\b/i,
    // Fahrenheit: "77°F", "77 °F", "77f", "77 fahrenheit", "200F"
    /(-?\d+(?:\.\d+)?)\s*°?\s*f(?:ahrenheit)?\b/i,
    // Degree symbol only: "160°", "25.5°", "-10°"
    /(-?\d+(?:\.\d+)?)\s*°\s*$/,
  ];

  for (let i = 0; i < tempPatterns.length; i++) {
    const match = text.match(tempPatterns[i]);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = i === 0 ? "C" : i === 1 ? "F" : "DEGREE";
      return { value, unit, originalText: match[0].trim() };
    }
  }
  return null;
}

function convertTemperature(temp) {
  const { value, unit } = temp;
  let celsius, fahrenheit;

  switch (unit) {
    case "C":
      celsius = value;
      fahrenheit = (value * 9) / 5 + 32;
      break;
    case "F":
      celsius = ((value - 32) * 5) / 9;
      fahrenheit = value;
      break;
    case "DEGREE":
      // For degree symbol only, treat as both C and F
      celsius = value;
      fahrenheit = (value * 9) / 5 + 32; // If treating as C
      // Also calculate if it were F
      const celsiusFromF = ((value - 32) * 5) / 9;
      const fahrenheitFromC = fahrenheit; // Already calculated above

      return {
        celsius: Math.round(celsius * 100) / 100,
        fahrenheit: Math.round(fahrenheitFromC * 100) / 100,
        celsiusFromF: Math.round(celsiusFromF * 100) / 100,
        fahrenheitOriginal: value, // The original value as F
      };
    default:
      throw new Error("Unknown temperature unit");
  }

  return {
    celsius: Math.round(celsius * 100) / 100,
    fahrenheit: Math.round(fahrenheit * 100) / 100,
  };
}

function detectLengthPattern(text) {
  // First check for compound feet + inches patterns
  const compoundPatterns = [
    // "6 feet 11 inches", "6 foot 11 inches", "6 ft 11 in", "6ft 11in"
    /\b(\d+)\s*(?:feet|foot|ft)\s+(\d+(?:\.\d+)?)\s*(?:inches?|in)\b/i,
    // "6'11\"", "6' 11\"", "6' 11"", "6'11"", "6' 11 inches"
    /\b(\d+)'\s*(\d+(?:\.\d+)?)\s*(?:"|inches?|in)?\b/i,
    // "6 feet 11", "6ft 11" (assuming inches when no unit specified after feet)
    /\b(\d+)\s*(?:feet|foot|ft)\s+(\d+(?:\.\d+)?)\b(?!\s*(?:feet|foot|ft|yd|yards?|mi|miles?))/i,
  ];

  // Check compound patterns first before standalone patterns
  for (const pattern of compoundPatterns) {
    const match = text.match(pattern);
    if (match) {
      const feet = parseFloat(match[1]);
      const inches = parseFloat(match[2]);
      const totalInches = feet * 12 + inches;
      return {
        value: totalInches,
        unit: "IN",
        originalText: match[0].trim(),
        compound: { feet, inches },
      };
    }
  }

  // Special case for standalone feet with apostrophe: "6'"
  const standaloneFootPattern = /\b(\d+(?:\.\d+)?)'(?!\s*\d)/;
  const standaloneFootMatch = text.match(standaloneFootPattern);
  if (standaloneFootMatch) {
    const feet = parseFloat(standaloneFootMatch[1]);
    return {
      value: feet,
      unit: "FT",
      originalText: standaloneFootMatch[0].trim(),
    };
  }

  // Special case for standalone inches with quote: '12"'
  const standaloneInchPattern = /\b(\d+(?:\.\d+)?)"/;
  const standaloneInchMatch = text.match(standaloneInchPattern);
  if (standaloneInchMatch) {
    const inches = parseFloat(standaloneInchMatch[1]);
    return {
      value: inches,
      unit: "IN",
      originalText: standaloneInchMatch[0].trim(),
    };
  }

  // Then check for single unit patterns
  const lengthPatterns = [
    // Metre/Meter: "5m", "5 m", "5 metres", "5 meters", "5.5m" - must not be followed by letters
    /\b(\d+(?:\.\d+)?)\s*(?:m(?![a-z])|metres?|meters?)\b/i,
    // Centimetre: "25cm", "25 cm", "25 centimetres", "25 centimeters"
    /\b(\d+(?:\.\d+)?)\s*(?:cm|centimetres?|centimeters?)\b/i,
    // Millimetre: "10mm", "10 mm", "10 millimetres", "10 millimeters"
    /\b(\d+(?:\.\d+)?)\s*(?:mm|millimetres?|millimeters?)\b/i,
    // Kilometre: "2km", "2 km", "2 kilometres", "2 kilometers"
    /\b(\d+(?:\.\d+)?)\s*(?:km|kilometres?|kilometers?)\b/i,
    // Micrometre: "50μm", "50 μm", "50um", "50 micrometres", "50 micrometers"
    /\b(\d+(?:\.\d+)?)\s*(?:μm|um|micrometres?|micrometers?)\b/i,
    // Inch: "12in", "12 in", "12 inches", "12\""
    /\b(\d+(?:\.\d+)?)\s*(?:in|inches?|")\b/i,
    // Foot: "6ft", "6 ft", "6 feet", "6'"
    /\b(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')\b/i,
    // Yard: "3yd", "3 yd", "3 yards"
    /\b(\d+(?:\.\d+)?)\s*(?:yd|yards?)\b/i,
    // Mile: "5mi", "5 mi", "5 miles"
    /\b(\d+(?:\.\d+)?)\s*(?:mi|miles?)\b/i,
  ];

  const units = ["M", "CM", "MM", "KM", "UM", "IN", "FT", "YD", "MI"];

  for (let i = 0; i < lengthPatterns.length; i++) {
    const match = text.match(lengthPatterns[i]);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = units[i];
      return { value, unit, originalText: match[0].trim() };
    }
  }
  return null;
}

async function convertLengthWithUserPrefs(length) {
  // Get user preferences
  const result = await chrome.storage.sync.get(["preferences"]);
  const prefs = result.preferences || {};
  const lengthPrefs = prefs.length || {};
  const primaryUnit = lengthPrefs.primaryUnit || "feet-inches";
  const secondaryUnits = lengthPrefs.secondaryUnits || [];

  // Create list of all units to show (primary + secondary)
  const unitsToShow = [primaryUnit, ...secondaryUnits];

  const converted = convertLength(length);
  const conversions = [];

  // Define all possible conversions with preference keys
  const unitMap = {
    M: { key: "metres", label: "Metres", symbol: "m", prefKey: "meters" },
    CM: {
      key: "centimetres",
      label: "Centimetres",
      symbol: "cm",
      prefKey: "centimeters",
    },
    MM: {
      key: "millimetres",
      label: "Millimetres",
      symbol: "mm",
      prefKey: "millimeters",
    },
    KM: {
      key: "kilometres",
      label: "Kilometres",
      symbol: "km",
      prefKey: "kilometers",
    },
    IN: { key: "inches", label: "Inches", symbol: "in", prefKey: "inches" },
    FT: { key: "feet", label: "Feet", symbol: "ft", prefKey: "feet" },
    YD: { key: "yards", label: "Yards", symbol: "yd", prefKey: "yards" },
    MI: { key: "miles", label: "Miles", symbol: "mi", prefKey: "miles" },
  };

  const sourceUnit = length.unit;

  // Only add conversions for selected units
  for (const unit in unitMap) {
    if (unit !== sourceUnit) {
      const unitInfo = unitMap[unit];

      // Only include if this unit is in the user's selected units
      if (unitsToShow.includes(unitInfo.prefKey)) {
        // Skip regular feet display if source is already compound feet and inches, or if we'll show compound display
        const isSourceCompound = length.compound && unitInfo.prefKey === "feet";
        const willShowCompound =
          (unitsToShow.includes("feet-inches") ||
            unitsToShow.includes("feet")) &&
          sourceUnit !== "FT" &&
          sourceUnit !== "IN" &&
          !length.compound &&
          unitInfo.prefKey === "feet";
        if (isSourceCompound || willShowCompound) continue;

        const convertedValue = converted[unitInfo.key];

        // Smart formatting based on magnitude
        let displayValue;
        if (convertedValue < 0.001) {
          displayValue = convertedValue.toFixed(6);
        } else if (convertedValue < 1) {
          displayValue = convertedValue.toFixed(4);
        } else if (convertedValue < 1000) {
          displayValue = convertedValue.toFixed(2);
        } else {
          displayValue = convertedValue.toFixed(1);
        }

        // Remove trailing zeros
        displayValue = parseFloat(displayValue).toString();

        conversions.push({
          label: unitInfo.label,
          value: `${displayValue} ${unitInfo.symbol}`,
          prefKey: unitInfo.prefKey,
        });
      }
    }
  }

  // Sort by preference order: primary first, then secondary in order
  conversions.sort((a, b) => {
    const aIndex =
      a.prefKey === primaryUnit ? 0 : secondaryUnits.indexOf(a.prefKey) + 1;
    const bIndex =
      b.prefKey === primaryUnit ? 0 : secondaryUnits.indexOf(b.prefKey) + 1;
    return aIndex - bIndex;
  });

  // Remove prefKey from final result
  const finalConversions = conversions.map(({ label, value }) => ({
    label,
    value,
  }));

  // Add compound feet and inches display if feet-inches is selected and source is not feet/inches or already compound
  // Only show compound display if feet-inches is the primary unit or explicitly in secondary units
  if (
    (unitsToShow.includes("feet-inches") || unitsToShow.includes("feet")) &&
    sourceUnit !== "FT" &&
    sourceUnit !== "IN" &&
    !length.compound
  ) {
    const totalInches = converted.inches;
    const feet = Math.floor(totalInches / 12);
    const remainingInches = totalInches % 12;

    // Only show for reasonable lengths (1 inch to 20 feet)
    if (totalInches >= 1 && totalInches <= 240) {
      const remainingInchesRounded = Math.round(remainingInches); // Round to whole inches

      if (feet > 0 && remainingInchesRounded > 0) {
        finalConversions.push({
          label: "Feet & Inches",
          value: `${feet}' ${remainingInchesRounded}"`,
        });
      } else if (feet > 0 && remainingInchesRounded === 0) {
        finalConversions.push({
          label: "Feet & Inches",
          value: `${feet}'`,
        });
      } else if (remainingInchesRounded > 0) {
        finalConversions.push({
          label: "Feet & Inches",
          value: `${remainingInchesRounded}"`,
        });
      }
    }
  }

  // Handle compound measurements for display
  let detectedUnit;
  if (length.compound) {
    detectedUnit = "Feet and Inches";
  } else {
    detectedUnit = unitMap[sourceUnit]?.label || "Length";
  }

  return {
    detectedValue: length.originalText,
    detectedUnit: detectedUnit,
    conversions: finalConversions,
  };
}

function convertLength(length) {
  const { value, unit } = length;

  // Convert everything to meters first
  let meters;
  switch (unit) {
    case "M":
      meters = value;
      break;
    case "CM":
      meters = value / 100;
      break;
    case "MM":
      meters = value / 1000;
      break;
    case "KM":
      meters = value * 1000;
      break;
    case "UM":
      meters = value / 1000000;
      break;
    case "IN":
      meters = value * 0.0254;
      break;
    case "FT":
      meters = value * 0.3048;
      break;
    case "YD":
      meters = value * 0.9144;
      break;
    case "MI":
      meters = value * 1609.344;
      break;
    default:
      meters = value;
  }

  // Convert from meters to all units
  return {
    metres: meters,
    centimetres: meters * 100,
    millimetres: meters * 1000,
    kilometres: meters / 1000,
    micrometres: meters * 1000000,
    inches: meters / 0.0254,
    feet: meters / 0.3048,
    yards: meters / 0.9144,
    miles: meters / 1609.344,
  };
}

async function convertLengthWithPrefs(length) {
  // Get preferences for decimal precision (reuse temperature precision setting)
  const result = await chrome.storage.sync.get(["preferences"]);
  const prefs = result.preferences || {};
  const tempPrefs = prefs.temperature || {
    showPrecision: 1,
  };
  const precision = tempPrefs.showPrecision || 1;

  const converted = convertLength(length);
  const conversions = [];

  // Add conversions for all units except the source unit
  const unitMap = {
    M: { key: "metres", label: "Metres", symbol: "m" },
    CM: { key: "centimetres", label: "Centimetres", symbol: "cm" },
    MM: { key: "millimetres", label: "Millimetres", symbol: "mm" },
    KM: { key: "kilometres", label: "Kilometres", symbol: "km" },
    IN: { key: "inches", label: "Inches", symbol: "in" },
    FT: { key: "feet", label: "Feet", symbol: "ft" },
    YD: { key: "yards", label: "Yards", symbol: "yd" },
    MI: { key: "miles", label: "Miles", symbol: "mi" },
  };

  // Show most relevant conversions based on source unit
  const allUnits = Object.keys(unitMap);
  const sourceUnit = length.unit;

  // For each unit except source, add conversion
  for (const unit of allUnits) {
    if (unit !== sourceUnit) {
      const unitInfo = unitMap[unit];
      const convertedValue = converted[unitInfo.key];

      // High precision formatting to show exact values
      let displayValue;
      if (convertedValue < 0.0001) {
        displayValue = convertedValue.toFixed(8);
      } else if (convertedValue < 0.001) {
        displayValue = convertedValue.toFixed(6);
      } else if (convertedValue < 1) {
        displayValue = convertedValue.toFixed(4);
      } else if (convertedValue < 1000) {
        displayValue = convertedValue.toFixed(4);
      } else {
        displayValue = convertedValue.toFixed(4);
      }

      // Remove trailing zeros after decimal point for cleaner display
      displayValue = parseFloat(displayValue).toString();

      conversions.push({
        label: unitInfo.label,
        value: `${displayValue} ${unitInfo.symbol}`,
      });
    }
  }

  // Add feet and inches compound display (except when source is already feet or inches)
  if (sourceUnit !== "FT" && sourceUnit !== "IN") {
    const totalInches = converted.inches;
    const feet = Math.floor(totalInches / 12);
    const remainingInches = totalInches % 12;

    // Only show if it's a reasonable height/length (between 1 inch and 20 feet)
    if (totalInches >= 1 && totalInches <= 240) {
      const remainingInchesRounded = Math.round(remainingInches);

      if (feet > 0 && remainingInchesRounded > 0) {
        conversions.push({
          label: "Feet & Inches",
          value: `${feet}' ${remainingInchesRounded}"`,
        });
      } else if (feet > 0) {
        conversions.push({
          label: "Feet & Inches",
          value: `${feet}'`,
        });
      } else if (remainingInchesRounded > 0) {
        conversions.push({
          label: "Feet & Inches",
          value: `${remainingInchesRounded}"`,
        });
      }
    }
  }

  // Handle compound measurements for display
  let detectedValue, detectedUnit;
  if (length.compound) {
    detectedValue = `${length.compound.feet}' ${length.compound.inches}"`;
    detectedUnit = "Feet and Inches";
  } else {
    detectedValue = `${length.value} ${unitMap[sourceUnit].symbol}`;
    detectedUnit = unitMap[sourceUnit].label;
  }

  return {
    detectedValue: detectedValue,
    detectedUnit: detectedUnit,
    conversions: conversions,
  };
}

// Weight/Mass detection and conversion functions
function detectWeightPattern(text) {
  // Compound patterns first - pounds and ounces
  const compoundPatterns = [
    // "5 pounds 8 ounces", "5 lbs 8 oz", "5lb 8oz"
    /\b(\d+(?:\.\d+)?)\s*(?:pounds?|lbs|lb)\s+(\d+(?:\.\d+)?)\s*(?:ounces?|oz)\b/i,
    // "5 stone 8 pounds", "5 st 8 lbs"
    /\b(\d+(?:\.\d+)?)\s*(?:stones?|st)\s+(\d+(?:\.\d+)?)\s*(?:pounds?|lbs|lb)\b/i,
  ];

  for (const pattern of compoundPatterns) {
    const match = text.match(pattern);
    if (match) {
      const first = parseFloat(match[1]);
      const second = parseFloat(match[2]);

      if (pattern.source.includes("stone")) {
        // Stone + pounds: convert to total pounds
        const totalPounds = first * 14 + second;
        return {
          value: totalPounds,
          unit: "LB",
          originalText: match[0].trim(),
          compound: { stone: first, pounds: second },
        };
      } else {
        // Pounds + ounces: convert to total ounces
        const totalOunces = first * 16 + second;
        return {
          value: totalOunces,
          unit: "OZ",
          originalText: match[0].trim(),
          compound: { pounds: first, ounces: second },
        };
      }
    }
  }

  // Single unit patterns
  const weightPatterns = [
    // Metric weights
    /\b(\d+(?:\.\d+)?)\s*(?:mg|milligrams?)\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:g|grams?)\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:kg|kilograms?)\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:tonnes?|tons?|t)\b/i,

    // Imperial weights
    /\b(\d+(?:\.\d+)?)\s*(?:oz|ounces?)\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:pounds?|lbs|lb)\b/i,
    /\b(\d+(?:\.\d+)?)\s*(?:stones?|st)\b/i,
  ];

  const units = ["MG", "G", "KG", "T", "OZ", "LB", "ST"];

  for (let i = 0; i < weightPatterns.length; i++) {
    const match = text.match(weightPatterns[i]);
    if (match) {
      const value = parseFloat(match[1]);
      const unit = units[i];
      return { value, unit, originalText: match[0].trim() };
    }
  }
  return null;
}

function convertWeight(weight) {
  const { value, unit } = weight;

  // Convert everything to grams first
  let grams;
  switch (unit) {
    case "MG":
      grams = value / 1000;
      break;
    case "G":
      grams = value;
      break;
    case "KG":
      grams = value * 1000;
      break;
    case "T":
      grams = value * 1000000;
      break;
    case "OZ":
      grams = value * 28.3495;
      break;
    case "LB":
      grams = value * 453.592;
      break;
    case "ST":
      grams = value * 6350.29; // 14 pounds
      break;
    default:
      grams = value;
  }

  // Convert from grams to all units
  return {
    milligrams: grams * 1000,
    grams: grams,
    kilograms: grams / 1000,
    tonnes: grams / 1000000,
    ounces: grams / 28.3495,
    pounds: grams / 453.592,
    stones: grams / 6350.29,
  };
}

async function convertWeightWithUserPrefs(weight) {
  // Get user preferences
  const result = await chrome.storage.sync.get(["preferences"]);
  const prefs = result.preferences || {};
  const weightPrefs = prefs.weight || {};
  const primaryUnit = weightPrefs.primaryUnit || "pounds";
  const secondaryUnits = weightPrefs.secondaryUnits || [];

  // Create list of all units to show (primary + secondary)
  const unitsToShow = [primaryUnit, ...secondaryUnits];

  const converted = convertWeight(weight);

  // Define all possible conversions with preference keys
  const unitMap = {
    MG: {
      key: "milligrams",
      label: "Milligrams",
      symbol: "mg",
      prefKey: "milligrams",
    },
    G: { key: "grams", label: "Grams", symbol: "g", prefKey: "grams" },
    KG: {
      key: "kilograms",
      label: "Kilograms",
      symbol: "kg",
      prefKey: "kilograms",
    },
    T: { key: "tonnes", label: "Tonnes", symbol: "t", prefKey: "tonnes" },
    OZ: { key: "ounces", label: "Ounces", symbol: "oz", prefKey: "ounces" },
    LB: { key: "pounds", label: "Pounds", symbol: "lb", prefKey: "pounds" },
    ST: { key: "stones", label: "Stones", symbol: "st", prefKey: "stone" },
  };

  const sourceUnit = weight.unit;
  const conversions = [];

  // Only add conversions for selected units
  for (const [unit, unitInfo] of Object.entries(unitMap)) {
    if (unit !== sourceUnit && unitsToShow.includes(unitInfo.prefKey)) {
      const convertedValue = converted[unitInfo.key];

      // Smart formatting based on magnitude
      let displayValue;
      if (convertedValue < 0.001) {
        displayValue = convertedValue.toFixed(6);
      } else if (convertedValue < 1) {
        displayValue = convertedValue.toFixed(4);
      } else if (convertedValue < 1000) {
        displayValue = convertedValue.toFixed(2);
      } else {
        displayValue = convertedValue.toFixed(1);
      }

      // Remove trailing zeros
      displayValue = parseFloat(displayValue).toString();

      conversions.push({
        label: unitInfo.label,
        value: `${displayValue} ${unitInfo.symbol}`,
        prefKey: unitInfo.prefKey,
      });
    }
  }

  // Sort by preference order: primary first, then secondary in order
  conversions.sort((a, b) => {
    const aIndex =
      a.prefKey === primaryUnit ? 0 : secondaryUnits.indexOf(a.prefKey) + 1;
    const bIndex =
      b.prefKey === primaryUnit ? 0 : secondaryUnits.indexOf(b.prefKey) + 1;
    return aIndex - bIndex;
  });

  // Remove prefKey from final result
  const finalConversions = conversions.map(({ label, value }) => ({
    label,
    value,
  }));

  // Add compound displays only if both units are selected by user

  // Add pounds and ounces compound display
  if (
    sourceUnit !== "LB" &&
    sourceUnit !== "OZ" &&
    unitsToShow.includes("pounds") &&
    unitsToShow.includes("ounces")
  ) {
    const totalOunces = converted.ounces;
    const pounds = Math.floor(totalOunces / 16);
    const remainingOunces = totalOunces % 16;

    // Only show for reasonable weights (1 oz to 50 lbs)
    if (totalOunces >= 1 && totalOunces <= 800) {
      const remainingOuncesRounded = Math.round(remainingOunces);

      if (pounds > 0 && remainingOuncesRounded > 0) {
        finalConversions.push({
          label: "Pounds and Ounces",
          value: `${pounds} lb ${remainingOuncesRounded} oz`,
        });
      } else if (pounds > 0) {
        finalConversions.push({
          label: "Pounds and Ounces",
          value: `${pounds} lb`,
        });
      }
    }
  }

  // Add stone and pounds compound display
  if (
    sourceUnit !== "ST" &&
    sourceUnit !== "LB" &&
    unitsToShow.includes("stone") &&
    unitsToShow.includes("pounds")
  ) {
    const totalPounds = converted.pounds;
    const stones = Math.floor(totalPounds / 14);
    const remainingPounds = totalPounds % 14;

    // Only show for human weight range (30 lbs to 400 lbs)
    if (totalPounds >= 30 && totalPounds <= 400) {
      const remainingPoundsRounded = Math.round(remainingPounds);

      if (stones > 0 && remainingPoundsRounded > 0) {
        finalConversions.push({
          label: "Stone and Pounds",
          value: `${stones} st ${remainingPoundsRounded} lb`,
        });
      } else if (stones > 0) {
        finalConversions.push({
          label: "Stone and Pounds",
          value: `${stones} st`,
        });
      }
    }
  }

  return {
    detectedValue: weight.originalText,
    detectedUnit: unitMap[sourceUnit]?.label || "Weight",
    conversions: finalConversions,
  };
}

async function convertWeightWithPrefs(weight) {
  // Get preferences for decimal precision
  const result = await chrome.storage.sync.get(["preferences"]);
  const prefs = result.preferences || {};
  const precision = prefs.weight?.showPrecision || 2;

  const converted = convertWeight(weight);
  const conversions = [];

  // Add conversions for all units except the source unit
  const unitMap = {
    MG: { key: "milligrams", label: "Milligrams", symbol: "mg" },
    G: { key: "grams", label: "Grams", symbol: "g" },
    KG: { key: "kilograms", label: "Kilograms", symbol: "kg" },
    T: { key: "tonnes", label: "Tonnes", symbol: "t" },
    OZ: { key: "ounces", label: "Ounces", symbol: "oz" },
    LB: { key: "pounds", label: "Pounds", symbol: "lb" },
    ST: { key: "stones", label: "Stones", symbol: "st" },
  };

  const allUnits = Object.keys(unitMap);
  const sourceUnit = weight.unit;

  // For each unit except source, add conversion
  for (const unit of allUnits) {
    if (unit !== sourceUnit) {
      const unitInfo = unitMap[unit];
      const convertedValue = converted[unitInfo.key];

      // Smart formatting based on magnitude
      let displayValue;
      if (convertedValue < 0.001) {
        displayValue = convertedValue.toFixed(6);
      } else if (convertedValue < 1) {
        displayValue = convertedValue.toFixed(4);
      } else if (convertedValue < 1000) {
        displayValue = convertedValue.toFixed(2);
      } else {
        displayValue = convertedValue.toFixed(1);
      }

      // Remove trailing zeros
      displayValue = parseFloat(displayValue).toString();

      conversions.push({
        label: unitInfo.label,
        value: `${displayValue} ${unitInfo.symbol}`,
      });
    }
  }

  // Add pounds and ounces compound display for non-imperial sources
  if (sourceUnit !== "LB" && sourceUnit !== "OZ") {
    const totalOunces = converted.ounces;
    const pounds = Math.floor(totalOunces / 16);
    const remainingOunces = totalOunces % 16;

    // Only show for reasonable weights (1 oz to 50 lbs)
    if (totalOunces >= 1 && totalOunces <= 800) {
      const remainingOuncesRounded = Math.round(remainingOunces);

      if (pounds > 0 && remainingOuncesRounded > 0) {
        conversions.push({
          label: "Pounds and Ounces",
          value: `${pounds} lb ${remainingOuncesRounded} oz`,
        });
      } else if (pounds > 0) {
        conversions.push({
          label: "Pounds and Ounces",
          value: `${pounds} lb`,
        });
      }
    }
  }

  // Add stone and pounds compound display for non-UK sources
  if (sourceUnit !== "ST" && sourceUnit !== "LB") {
    const totalPounds = converted.pounds;
    const stones = Math.floor(totalPounds / 14);
    const remainingPounds = totalPounds % 14;

    // Only show for human weight range (30 lbs to 400 lbs)
    if (totalPounds >= 30 && totalPounds <= 400) {
      const remainingPoundsRounded = Math.round(remainingPounds);

      if (stones > 0 && remainingPoundsRounded > 0) {
        conversions.push({
          label: "Stone and Pounds",
          value: `${stones} st ${remainingPoundsRounded} lb`,
        });
      } else if (stones > 0) {
        conversions.push({
          label: "Stone and Pounds",
          value: `${stones} st`,
        });
      }
    }
  }

  // Handle compound measurements for display
  let detectedValue, detectedUnit;
  if (weight.compound) {
    if (weight.compound.stone !== undefined) {
      detectedValue = `${weight.compound.stone} st ${weight.compound.pounds} lb`;
      detectedUnit = "Stone and Pounds";
    } else {
      detectedValue = `${weight.compound.pounds} lb ${weight.compound.ounces} oz`;
      detectedUnit = "Pounds and Ounces";
    }
  } else {
    detectedValue = `${weight.value} ${unitMap[sourceUnit].symbol}`;
    detectedUnit = unitMap[sourceUnit].label;
  }

  return {
    detectedValue: detectedValue,
    detectedUnit: detectedUnit,
    conversions: conversions,
    conversionType: "weight",
  };
}

// Currency detection and conversion (inline implementation)
const CURRENCY_SYMBOLS = {
  $: "USD",
  "€": "EUR",
  "£": "GBP",
  "¥": "JPY",
  "₹": "INR",
  "₩": "KRW",
  "₽": "RUB",
  "¢": "USD", // cents
  C$: "CAD",
  A$: "AUD",
  HK$: "HKD",
  S$: "SGD",
  NZ$: "NZD",
  R$: "BRL",
  CHF: "CHF",
  "CN¥": "CNY",
  "₪": "ILS",
  "₺": "TRY",
  zł: "PLN",
  kr: "NOK", // Could also be SEK or DKK
  "₡": "CRC",
  "₨": "PKR",
  "₦": "NGN",
  "₫": "VND",
  "₴": "UAH",
  "₲": "PYG",
};

const CURRENCY_PATTERNS = [
  // Symbol before number: "$5", "€10.50", "£100"
  /([€£¥₹₩₽¢₪₺₡₨₦₫₴₲]|C\$|A\$|HK\$|S\$|NZ\$|R\$|CN¥)\s*(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)/i,
  // Dollar symbol (needs special handling): "$5", "$10.50", "$1"
  /\$\s*(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)/,
  // Number then currency code: "1 USD", "5 USD", "10.50EUR", "100 GBP", "1 usd"
  // Use negative lookbehind to avoid matching time patterns like "22:30 HKT"
  /(?<!\d:)\b(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)\s*([A-Za-z]{3})(?!\w)/i,
  // Currency code then number: "USD 1", "USD 5", "EUR10.50", "usd 1"
  /([A-Za-z]{3})\s*(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)(?!\s*:\d{2})/i,
  // Special cases with letters: "1 dollar", "5 dollars", "10 euros", "100 pound", "50 baht", etc.
  /(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)\s*(dollars?|euros?|pounds?|yen|yuan|cents?|bahts?|rupees?|wons?|rubles?|francs?|pesos?|reals?|shekels?|liras?|zlotys?|kroner?|kronor?|dirhams?|rands?|ringgits?|dongs?|hryvnias?|guaranis?)\b/i,
  // Abbreviations at end: "5 zloty", "100 kr"
  /(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)\s*(zł|kr|CHF)\b/i,
];

function detectCurrencyPattern(text) {
  // Blacklist of common measurement abbreviations that should NOT be treated as currency
  const MEASUREMENT_BLACKLIST = [
    "lbs",
    "mph",
    "fps",
    "bpm",
    "rpm",
    "psi",
    "dpi",
    "cpu",
    "gpu",
    "ram",
    "ssd",
    "hdd",
    "usb",
    "led",
    "lcd",
    "oled",
    "hdr",
    "uhd",
    "fhd",
    "hdd",
    "stone",
    "stones",
    "pounds",
    "pound",
    "ounces",
    "ounce",
    "grams",
    "kilograms",
  ];

  // Quick check: if text contains common measurement units, skip currency detection
  const lowerText = text.toLowerCase();
  if (MEASUREMENT_BLACKLIST.some((unit) => lowerText.includes(unit))) {
    return null;
  }

  for (const pattern of CURRENCY_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      let amount, currencyCode;

      if (pattern.source.startsWith("\\$")) {
        // Dollar pattern: "$5"
        amount = parseFloat(match[1].replace(/,/g, ""));
        currencyCode = "USD";
      } else if (pattern.source.startsWith("([€£¥")) {
        // Symbol before number: "€10"
        const symbol = match[1];
        amount = parseFloat(match[2].replace(/,/g, ""));
        currencyCode = CURRENCY_SYMBOLS[symbol] || "USD";
      } else if (
        pattern.source.includes("[A-Za-z]{3}") &&
        match[2] &&
        match[2].match(/^\d/)
      ) {
        // Currency code then number: "USD 5"
        currencyCode = match[1];
        amount = parseFloat(match[2].replace(/,/g, ""));
      } else if (pattern.source.includes("[A-Za-z]{3}")) {
        // Number then currency code: "5 USD"
        amount = parseFloat(match[1].replace(/,/g, ""));
        currencyCode = match[2];
      } else if (pattern.source.includes("dollars?|euros?|pounds?")) {
        // Word-based: "5 dollars"
        amount = parseFloat(match[1].replace(/,/g, ""));
        const word = match[2].toLowerCase();
        const wordMap = {
          dollar: "USD",
          dollars: "USD",
          euro: "EUR",
          euros: "EUR",
          pound: "GBP",
          pounds: "GBP",
          yen: "JPY",
          yuan: "CNY",
          cent: "USD",
          cents: "USD",
          baht: "THB",
          bahts: "THB",
          rupee: "INR",
          rupees: "INR",
          won: "KRW",
          wons: "KRW",
          ruble: "RUB",
          rubles: "RUB",
          franc: "CHF",
          francs: "CHF",
          peso: "MXN",
          pesos: "MXN",
          real: "BRL",
          reals: "BRL",
          shekel: "ILS",
          shekels: "ILS",
          lira: "TRY",
          liras: "TRY",
          zloty: "PLN",
          zlotys: "PLN",
          krone: "NOK",
          kroner: "NOK",
          krona: "SEK",
          kronor: "SEK",
          dirham: "AED",
          dirhams: "AED",
          rand: "ZAR",
          rands: "ZAR",
          ringgit: "MYR",
          ringgits: "MYR",
          dong: "VND",
          dongs: "VND",
          hryvnia: "UAH",
          hryvnias: "UAH",
          guarani: "PYG",
          guaranis: "PYG",
        };
        currencyCode = wordMap[word] || "USD";
        if (word.includes("cent")) {
          amount = amount / 100; // Convert cents to dollars
        }
      } else {
        // Abbreviations: "100 kr"
        amount = parseFloat(match[1].replace(/,/g, ""));
        const abbr = match[2];
        currencyCode = CURRENCY_SYMBOLS[abbr] || "USD";
      }

      // Validate amount and currency code
      if (amount > 0 && currencyCode && currencyCode.length === 3) {
        return {
          amount,
          currency: currencyCode.toUpperCase(),
          originalText: match[0].trim(),
        };
      }
    }
  }
  return null;
}

// Cache for exchange rates (valid for 1 hour)
let exchangeRateCache = {
  data: null,
  timestamp: 0,
  baseCurrency: null,
};

async function getExchangeRates(baseCurrency = "HKD") {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  // Return cached data if it's fresh and for the same base currency
  if (
    exchangeRateCache.data &&
    exchangeRateCache.baseCurrency === baseCurrency &&
    now - exchangeRateCache.timestamp < oneHour
  ) {
    return exchangeRateCache.data;
  }

  try {
    // Using free ExchangeRate-API (fallback to v6 if v4 fails)
    let response;
    try {
      response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      );
      if (!response.ok && response.status === 404) {
        // Try v6 API if v4 returns 404
        response = await fetch(
          `https://v6.exchangerate-api.com/v6/latest/${baseCurrency}`
        );
      }
    } catch (error) {
      // Fallback to v6 API
      response = await fetch(
        `https://v6.exchangerate-api.com/v6/latest/${baseCurrency}`
      );
    }

    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status}`);
    }

    const data = await response.json();

    // Handle different API response formats
    const rates = data.rates || data.conversion_rates;
    if (!rates) {
      throw new Error("Invalid API response format");
    }

    // Cache the result
    exchangeRateCache = {
      data: rates,
      timestamp: now,
      baseCurrency: baseCurrency,
    };

    return rates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    // Return cached data if available, even if expired
    if (exchangeRateCache.data) {
      return exchangeRateCache.data;
    }
    throw error;
  }
}

function formatCurrency(amount, currencyCode) {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    KRW: "₩",
    RUB: "₽",
    CAD: "C$",
    AUD: "A$",
    HKD: "HK$",
    SGD: "S$",
    NZD: "NZ$",
    BRL: "R$",
    CHF: "CHF",
    ILS: "₪",
    TRY: "₺",
    PLN: "zł",
    NOK: "kr",
    SEK: "kr",
    DKK: "kr",
  };

  const symbol = currencySymbols[currencyCode] || currencyCode;

  // Format based on currency
  if (currencyCode === "JPY" || currencyCode === "KRW") {
    // No decimals for currencies that don't use subunits
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  } else {
    // Two decimal places for most currencies
    const formatted = amount.toFixed(2);
    const [whole, decimal] = formatted.split(".");
    const wholeFormatted = parseInt(whole).toLocaleString();

    // Currencies that should have symbol in front
    const symbolInFront = [
      "USD",
      "EUR",
      "GBP",
      "CNY",
      "INR",
      "KRW",
      "RUB",
      "CAD",
      "AUD",
      "HKD",
      "SGD",
      "NZD",
      "BRL",
      "ILS",
      "TRY",
    ];

    if (symbolInFront.includes(currencyCode)) {
      return `${symbol} ${wholeFormatted}.${decimal}`;
    } else {
      return `${wholeFormatted}.${decimal} ${symbol}`;
    }
  }
}

function getCurrencyName(currencyCode) {
  const currencyNames = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    KRW: "South Korean Won",
    RUB: "Russian Ruble",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    HKD: "Hong Kong Dollar",
    SGD: "Singapore Dollar",
    NZD: "New Zealand Dollar",
    BRL: "Brazilian Real",
    CHF: "Swiss Franc",
    ILS: "Israeli Shekel",
    TRY: "Turkish Lira",
    PLN: "Polish Zloty",
    NOK: "Norwegian Krone",
    SEK: "Swedish Krona",
    DKK: "Danish Krone",
  };

  return currencyNames[currencyCode] || currencyCode;
}

async function convertCurrencyWithPrefs(currencyData) {
  // Get user preferences for currencies
  const result = await chrome.storage.sync.get(["preferences"]);
  const prefs = result.preferences || {};
  const currencyPrefs = prefs.currency || {
    primaryCurrency: "HKD",
    secondaryCurrencies: [],
  };

  try {
    const { amount, currency } = currencyData;

    // Get exchange rates with the detected currency as base
    const rates = await getExchangeRates(currency);

    const conversions = [];
    const targetCurrencies = [
      currencyPrefs.primaryCurrency,
      ...currencyPrefs.secondaryCurrencies,
    ];

    // Remove the source currency from targets and deduplicate
    const uniqueTargets = [...new Set(targetCurrencies)].filter(
      (c) => c !== currency
    );

    for (const targetCurrency of uniqueTargets) {
      if (rates[targetCurrency]) {
        const convertedAmount = amount * rates[targetCurrency];
        const formattedAmount = formatCurrency(convertedAmount, targetCurrency);

        conversions.push({
          label: getCurrencyName(targetCurrency),
          value: formattedAmount,
          code: targetCurrency,
        });
      }
    }

    const conversionResult = {
      type: "currency",
      detectedValue: formatCurrency(amount, currency),
      detectedUnit: getCurrencyName(currency),
      conversions: conversions,
    };

    return {
      ...conversionResult,
      conversionType: "currency",
    };
  } catch (error) {
    console.error("Currency conversion failed:", error);
    throw new Error(`Currency conversion failed: ${error.message}`);
  }
}

async function convertTemperatureWithPrefs(temp) {
  // Get preferences for decimal precision only
  const result = await chrome.storage.sync.get(["preferences"]);
  const prefs = result.preferences || {};
  const tempPrefs = prefs.temperature || {
    showPrecision: 1,
  };

  const converted = convertTemperature(temp);
  const conversions = [];

  if (temp.unit === "DEGREE") {
    // For degree symbol only, show both interpretations
    conversions.push({
      label: "If Celsius",
      value: `${converted.fahrenheit.toFixed(tempPrefs.showPrecision || 1)}°F`,
    });
    conversions.push({
      label: "If Fahrenheit",
      value: `${converted.celsiusFromF.toFixed(
        tempPrefs.showPrecision || 1
      )}°C`,
    });
  } else if (temp.unit === "C") {
    // Convert Celsius to Fahrenheit
    conversions.push({
      label: "Fahrenheit",
      value: `${converted.fahrenheit.toFixed(tempPrefs.showPrecision || 1)}°F`,
    });
  } else if (temp.unit === "F") {
    // Convert Fahrenheit to Celsius
    conversions.push({
      label: "Celsius",
      value: `${converted.celsius.toFixed(tempPrefs.showPrecision || 1)}°C`,
    });
  }

  return {
    type: "temperature",
    conversions,
    detectedTemp: `${temp.value}°`,
    tempData: temp,
  };
}

// Time conversion functions
function parseTime(text) {
  // Enhanced time patterns with timezone detection
  const timePatterns = [
    // UTC/GMT with offset patterns (most specific first)
    // 12-hour format with UTC/GMT offset: "8 p.m. UTC-12", "3:30 p.m. UTC+5"
    /(\d{1,2})(?::(\d{2}))?\s*([ap]\.?m\.?)\s+(?:UTC|GMT)([+-]\d{1,2}(?::\d{2})?)/i,
    // 12-hour format with UTC/GMT offset (no dots): "3:30 PM UTC+5", "8 PM UTC-12"
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s+(?:UTC|GMT)([+-]\d{1,2}(?::\d{2})?)/i,
    // 24-hour format with UTC/GMT offset: "15:30 UTC-12", "22:15 UTC+5"
    /(\d{1,2}):(\d{2})\s+(?:UTC|GMT)([+-]\d{1,2}(?::\d{2})?)/i,
    // UTC/GMT without offset (fallback to UTC+0)
    // 12-hour format with UTC/GMT: "8 p.m. UTC", "3:30 p.m. GMT"
    /(\d{1,2})(?::(\d{2}))?\s*([ap]\.?m\.?)\s+(?:UTC|GMT)/i,
    // 12-hour format with UTC/GMT (no dots): "3:30 PM UTC", "8 PM GMT"
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s+(?:UTC|GMT)/i,
    // 24-hour format with UTC/GMT: "15:30 UTC", "22:15 GMT"
    /(\d{1,2}):(\d{2})\s+(?:UTC|GMT)/i,
    // 12-hour format with timezone (with dots): "8 p.m. ET", "3:30 p.m. EST"
    /(\d{1,2})(?::(\d{2}))?\s*([ap]\.?m\.?)\s+([A-Za-z]{2,5})/i,
    // 12-hour format with timezone (without dots): "3:30 PM EST", "8 PM ET"
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s+([A-Za-z]{2,5})/i,
    // 24-hour format with timezone: "15:30 EST", "22:15 PST", "17:45 UTC" (exclude AM/PM)
    /(\d{1,2}):(\d{2})\s+(?!AM|PM|am|pm)([A-Za-z]{2,5})/,
    // 12-hour format with numeric offset: "3:30 PM +5", "10:15 AM -8"
    /(\d{1,2}):(\d{2})\s*(AM|PM)\s*([+-]\d{1,2}(?::\d{2})?)/i,
    // 24-hour format with numeric offset: "15:30 +5", "22:15 -8"
    /(\d{1,2}):(\d{2})\s*([+-]\d{1,2}(?::\d{2})?)/,
    // Simple 12-hour format (with dots): "8 p.m.", "3:30 p.m."
    /(\d{1,2})(?::(\d{2}))?\s*([ap]\.?m\.?)/i,
    // Simple 12-hour format (without dots): "3:30 PM", "8 PM"
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i,
    // Simple 24-hour format: "15:30", "22:15"
    /(\d{1,2}):(\d{2})(?!\s*[A-Za-z])/,
    // 24-hour single digit with clear time context: "at 3", "around 15", "by 8"
    /\b(?:at|around|by|until|after|before)\s+(\d{1,2})(?!\s*(?:am|pm|[a-z]{2,}|°|[cfm]|kg|lb|ft|in|cm|mm|-\d))/i,
  ];

  for (let i = 0; i < timePatterns.length; i++) {
    const match = text.match(timePatterns[i]);
    if (match) {
      let hours, minutes, ampm, timezone, offset;

      switch (i) {
        case 0: // 12-hour with UTC/GMT offset (with dots): "8 p.m. UTC-12"
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toLowerCase().replace(/\./g, ""); // Remove dots
          timezone = "UTC";
          offset = match[4];
          break;
        case 1: // 12-hour with UTC/GMT offset (no dots): "8 PM UTC-12"
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toUpperCase();
          timezone = "UTC";
          offset = match[4];
          break;
        case 2: // 24-hour with UTC/GMT offset: "15:30 UTC-12"
          hours = parseInt(match[1]);
          minutes = parseInt(match[2]);
          timezone = "UTC";
          offset = match[3];
          break;
        case 3: // 12-hour with UTC/GMT (no offset): "8 p.m. UTC"
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toLowerCase().replace(/\./g, ""); // Remove dots
          timezone = "UTC";
          offset = "+0";
          break;
        case 4: // 12-hour with UTC/GMT (no offset, no dots): "8 PM UTC"
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toUpperCase();
          timezone = "UTC";
          offset = "+0";
          break;
        case 5: // 24-hour with UTC/GMT (no offset): "15:30 UTC"
          hours = parseInt(match[1]);
          minutes = parseInt(match[2]);
          timezone = "UTC";
          offset = "+0";
          break;
        case 6: // 12-hour with timezone (with dots): "8 p.m. ET"
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toLowerCase().replace(/\./g, ""); // Remove dots
          timezone = match[4].toUpperCase();
          break;
        case 7: // 12-hour with timezone (without dots): "8 PM ET"
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toUpperCase();
          timezone = match[4].toUpperCase();
          break;
        case 8: // 24-hour with timezone
          hours = parseInt(match[1]);
          minutes = parseInt(match[2]);
          timezone = match[3].toUpperCase();
          break;
        case 9: // 12-hour with offset
          hours = parseInt(match[1]);
          minutes = parseInt(match[2]);
          ampm = match[3].toUpperCase();
          offset = match[4];
          break;
        case 10: // 24-hour with offset
          hours = parseInt(match[1]);
          minutes = parseInt(match[2]);
          offset = match[3];
          break;
        case 11: // Simple 12-hour (with dots): "8 p.m."
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toLowerCase().replace(/\./g, ""); // Remove dots
          break;
        case 12: // Simple 12-hour (without dots): "8 PM"
          hours = parseInt(match[1]);
          minutes = match[2] ? parseInt(match[2]) : 0;
          ampm = match[3].toUpperCase();
          break;
        case 13: // Simple 24-hour
          hours = parseInt(match[1]);
          minutes = parseInt(match[2]);
          break;
        case 14: // Single number (hour only)
          hours = parseInt(match[1]);
          minutes = 0;
          // Skip if hour is unreasonable for time (like 50, 100, etc.)
          if (hours > 23) return null;
          break;
      }

      // Convert 12-hour to 24-hour format first
      if (ampm) {
        const isAM = ampm.toUpperCase() === "AM" || ampm.toLowerCase() === "am";
        const isPM = ampm.toUpperCase() === "PM" || ampm.toLowerCase() === "pm";

        // Validate 12-hour format before conversion
        if (hours < 1 || hours > 12) {
          continue;
        }

        if (isAM && hours === 12) {
          hours = 0;
        } else if (isPM && hours !== 12) {
          hours += 12;
        }
      }

      // Validate final time
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        continue;
      }

      const patternNames = [
        "12-hour with UTC offset (dots)",
        "12-hour with UTC offset",
        "24-hour with UTC offset",
        "12-hour with UTC (no offset)",
        "12-hour with UTC (no offset)",
        "24-hour with UTC (no offset)",
        "12-hour with timezone (dots)",
        "12-hour with timezone",
        "24-hour with timezone",
        "12-hour with offset",
        "24-hour with offset",
        "12-hour simple (dots)",
        "12-hour simple",
        "24-hour simple",
        "Context-based single digit",
      ];

      const result = {
        hours,
        minutes,
        timezone: timezone || null,
        offset: offset ? parseOffset(offset) : null,
        originalText: match[0].trim(),
        ampmFormat: !!ampm,
        detectionInfo: {
          patternIndex: i,
          patternName: patternNames[i],
          matchedGroups: match,
          extractedHours: hours,
          extractedMinutes: minutes,
          extractedTimezone: timezone,
          extractedOffset: offset,
          extractedAMPM: ampm,
        },
      };
      return result;
    }
  }
  return null;
}

function parseOffset(offsetStr) {
  if (!offsetStr) return 0;

  const match = offsetStr.match(/([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 0;

  const sign = match[1] === "+" ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = match[3] ? parseInt(match[3], 10) : 0;

  return sign * (hours * 60 + minutes);
}

async function convertTime(text) {
  const timeData = parseTime(text);
  if (!timeData) return null;

  return await convertFromStructured(timeData);
}

async function convertFromStructured(timeData) {
  const { hours, minutes, timezone, offset } = timeData;

  // Get preferences
  const prefsResult = await chrome.storage.sync.get(["preferences"]);
  const prefs = prefsResult.preferences || {};
  const timePrefs = prefs.time || {};
  const primaryZone = timePrefs.primaryZone || "UTC";
  const secondaryZones = timePrefs.secondaryZones || [];

  // Create a date object for "today" with the parsed time
  const now = new Date();
  const baseDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );

  let sourceTimezone = null;
  let sourceOffset = 0;

  // Determine source timezone and offset
  if (timezone === "UTC" && offset !== null) {
    // Handle UTC with offset (e.g., UTC-12, UTC+5)
    const offsetHours = offset / 60;
    if (offsetHours === -12) sourceTimezone = "Etc/GMT+12";
    else if (offsetHours === -11) sourceTimezone = "Etc/GMT+11";
    else if (offsetHours === -10) sourceTimezone = "Etc/GMT+10";
    else if (offsetHours === -9) sourceTimezone = "Etc/GMT+9";
    else if (offsetHours === -8) sourceTimezone = "Etc/GMT+8";
    else if (offsetHours === -7) sourceTimezone = "Etc/GMT+7";
    else if (offsetHours === -6) sourceTimezone = "Etc/GMT+6";
    else if (offsetHours === -5) sourceTimezone = "Etc/GMT+5";
    else if (offsetHours === -4) sourceTimezone = "Etc/GMT+4";
    else if (offsetHours === -3) sourceTimezone = "Etc/GMT+3";
    else if (offsetHours === -2) sourceTimezone = "Etc/GMT+2";
    else if (offsetHours === -1) sourceTimezone = "Etc/GMT+1";
    else if (offsetHours === 0) sourceTimezone = "UTC";
    else if (offsetHours === 1) sourceTimezone = "Etc/GMT-1";
    else if (offsetHours === 2) sourceTimezone = "Etc/GMT-2";
    else if (offsetHours === 3) sourceTimezone = "Etc/GMT-3";
    else if (offsetHours === 4) sourceTimezone = "Etc/GMT-4";
    else if (offsetHours === 5) sourceTimezone = "Etc/GMT-5";
    else if (offsetHours === 6) sourceTimezone = "Etc/GMT-6";
    else if (offsetHours === 7) sourceTimezone = "Etc/GMT-7";
    else if (offsetHours === 8) sourceTimezone = "Etc/GMT-8";
    else if (offsetHours === 9) sourceTimezone = "Etc/GMT-9";
    else if (offsetHours === 10) sourceTimezone = "Etc/GMT-10";
    else if (offsetHours === 11) sourceTimezone = "Etc/GMT-11";
    else if (offsetHours === 12) sourceTimezone = "Etc/GMT-12";
    else sourceTimezone = "UTC";

    sourceOffset = offset;
  } else if (timezone) {
    // Check if it's an IANA timezone (contains '/') or an abbreviation
    if (timezone.includes("/")) {
      // It's an IANA timezone, use it directly
      sourceTimezone = timezone;
      sourceOffset = getTimezoneOffset(sourceTimezone, baseDate);
    } else if (TIMEZONE_MAP[timezone]) {
      // It's an abbreviation, convert to IANA
      const timezoneData = TIMEZONE_MAP[timezone];
      sourceTimezone = timezoneData.iana;

      // Use the stored offset if available, otherwise calculate it
      if (timezoneData.offset !== null) {
        sourceOffset = timezoneData.offset;
      } else {
        sourceOffset = getTimezoneOffset(sourceTimezone, baseDate);
      }
    }
  } else if (offset !== null) {
    sourceOffset = -offset; // Negative because we want the offset FROM UTC
  } else {
    // No timezone specified, use local timezone
    sourceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    sourceOffset = getTimezoneOffset(sourceTimezone, baseDate);
  }

  // Calculate UTC time
  // sourceOffset is now the offset FROM UTC TO the source timezone
  // So to get UTC time, we subtract the offset from the source time
  const utcTime = new Date(baseDate.getTime() - sourceOffset * 60000);

  // Get timezones to show (primary + secondary, excluding source)
  const allZones = [primaryZone, ...secondaryZones];
  const zonesToShow = allZones.filter((zone) => zone !== sourceTimezone);

  const conversions = [];

  // Add conversions for each configured timezone
  for (const tz of zonesToShow) {
    try {
      const convertedTime = formatTime(utcTime, tz);
      conversions.push({
        label: tz.split("/").pop().replace(/_/g, " "),
        value: convertedTime,
        timezone: tz,
      });
    } catch (error) {
      console.warn(`Failed to convert to ${tz}:`, error);
    }
  }

  // Determine the detected unit for display
  let detectedUnit;
  if (timezone) {
    // Explicit timezone was provided in the input
    detectedUnit = timezone;
  } else if (sourceTimezone) {
    // No explicit timezone, using detected local timezone
    // Show the city name with its UTC offset for better debugging
    const cityName = sourceTimezone.split("/").pop().replace(/_/g, " ");
    const offsetHours = sourceOffset / 60;
    const offsetSign = sourceOffset >= 0 ? "+" : "";
    detectedUnit = `${cityName} (${offsetSign}${offsetHours})`;
  } else {
    detectedUnit = "Time";
  }

  const result = {
    detectedValue: timeData.originalText,
    detectedUnit: detectedUnit,
    conversions: conversions,
    conversionType: "time",
    timeData: {
      hours: timeData.hours,
      minutes: timeData.minutes,
      sourceTimezone: sourceTimezone,
      utcOffset: sourceOffset,
    },
    detectionSteps: {
      step1: {
        title: "Text Analysis",
        description: `Parsed "${timeData.originalText}" using pattern: ${timeData.detectionInfo?.patternName}`,
        details: timeData.detectionInfo,
      },
      step2: {
        title: "Time Extraction",
        description: `Extracted ${timeData.hours}:${String(
          timeData.minutes
        ).padStart(2, "0")}${
          timeData.ampmFormat
            ? timeData.hours >= 12
              ? " PM"
              : " AM"
            : " (24-hour)"
        }`,
        details: {
          hours: timeData.hours,
          minutes: timeData.minutes,
          format: timeData.ampmFormat ? "12-hour" : "24-hour",
        },
      },
      step3: {
        title: "Timezone Resolution",
        description: timezone
          ? `Explicit timezone "${timezone}" → ${sourceTimezone}`
          : `No timezone specified → Local timezone: ${sourceTimezone}`,
        details: {
          inputTimezone: timezone,
          resolvedTimezone: sourceTimezone,
          method: timezone ? "explicit" : "local-detection",
          offset: sourceOffset,
        },
      },
      step4: {
        title: "UTC Conversion",
        description: `${timeData.hours}:${String(timeData.minutes).padStart(
          2,
          "0"
        )} ${detectedUnit} → UTC ${sourceOffset > 0 ? "+" : ""}${
          sourceOffset / 60
        }h`,
        details: {
          sourceTime: `${timeData.hours}:${String(timeData.minutes).padStart(
            2,
            "0"
          )}`,
          sourceZone: detectedUnit,
          utcOffset: sourceOffset,
          utcTime: new Date(baseDate.getTime() - sourceOffset * 60000)
            .toISOString()
            .substring(11, 16),
        },
      },
    },
  };

  return result;
}

function getTimezoneOffset(timeZone, date) {
  // Get the offset in minutes for a given timezone using ZoneInfo and utcoffset
  // Returns positive value for timezones ahead of UTC (like +60 for BST)
  // Returns negative value for timezones behind UTC (like -300 for EST)
  try {
    // Method 1: Try using Intl API with timeZoneName (ZoneInfo)
    const timezoneNameOptions = ["longOffset", "shortOffset", "long", "short"];

    for (const option of timezoneNameOptions) {
      try {
        const formatter = new Intl.DateTimeFormat("en", {
          timeZone: timeZone,
          timeZoneName: option,
        });

        const parts = formatter.formatToParts(date);
        const offsetPart = parts.find((part) => part.type === "timeZoneName");

        if (offsetPart && offsetPart.value) {
          // Try to parse various offset formats
          const offsetPatterns = [
            /GMT([+-])(\d{1,2})(?::(\d{2}))?/, // GMT+1, GMT-5:30
            /([+-])(\d{1,2})(?::(\d{2}))?/, // +1, -5:30
            /UTC([+-])(\d{1,2})(?::(\d{2}))?/, // UTC+1, UTC-5:30
          ];

          for (const pattern of offsetPatterns) {
            const match = offsetPart.value.match(pattern);
            if (match) {
              const sign = match[1] === "+" ? 1 : -1;
              const hours = parseInt(match[2], 10);
              const minutes = match[3] ? parseInt(match[3], 10) : 0;
              const totalMinutes = sign * (hours * 60 + minutes);

              return totalMinutes;
            }
          }
        }
      } catch (e) {
        // Continue to next option
        continue;
      }
    }

    // Method 2: Try using Intl API with different locales
    const locales = ["en-US", "en-GB", "en-CA"];
    for (const locale of locales) {
      try {
        const formatter = new Intl.DateTimeFormat(locale, {
          timeZone: timeZone,
          timeZoneName: "longOffset",
        });

        const formatted = formatter.format(date);
        const offsetMatch = formatted.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
        if (offsetMatch) {
          const sign = offsetMatch[1] === "+" ? 1 : -1;
          const hours = parseInt(offsetMatch[2], 10);
          const minutes = offsetMatch[3] ? parseInt(offsetMatch[3], 10) : 0;
          const totalMinutes = sign * (hours * 60 + minutes);

          return totalMinutes;
        }
      } catch (e) {
        continue;
      }
    }

    // Fallback method if ZoneInfo parsing fails
    return getTimezoneOffsetFallback(timeZone, date);
  } catch (error) {
    console.warn(`Failed to get offset for ${timeZone} using ZoneInfo:`, error);
    // Fallback to the previous method
    return getTimezoneOffsetFallback(timeZone, date);
  }
}

// Fallback method using the previous calculation approach
function getTimezoneOffsetFallback(timeZone, date) {
  try {
    // Use a more direct method: create a date in UTC and compare with target timezone
    // Create a date in UTC by using the date's UTC components
    const utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );

    // Get the time in the target timezone for the same UTC moment
    const targetTimeString = utcDate.toLocaleString("en-CA", {
      timeZone: timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Parse the time string: "2025-09-10, 17:00:00"
    const [datePart, timePart] = targetTimeString.split(", ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    // Create a date object in local timezone representing the same moment
    const targetDate = new Date(year, month - 1, day, hour, minute, second);

    // Calculate the offset: difference between target timezone and UTC
    // Positive offset means the timezone is ahead of UTC (like +1 for BST)
    // Negative offset means the timezone is behind UTC (like -5 for EST)
    const offset = (targetDate.getTime() - utcDate.getTime()) / 60000;

    return offset;
  } catch (error) {
    console.warn(`Failed to get offset for ${timeZone}:`, error);
    return 0; // fallback
  }
}

function formatTime(date, timeZone) {
  try {
    const options = {
      timeZone: timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // Always use AM/PM format
    };

    const timeString = new Intl.DateTimeFormat("en-US", options).format(date);
    const zoneString =
      new Intl.DateTimeFormat("en-US", {
        timeZone: timeZone,
        timeZoneName: "short",
      })
        .formatToParts(date)
        .find((part) => part.type === "timeZoneName")?.value || timeZone;

    return `${timeString} ${zoneString}`;
  } catch (error) {
    throw new Error(
      `Failed to format time for timezone ${timeZone}: ${error.message}`
    );
  }
}

// Chrome extension setup
// Extract conversion logic into reusable function
async function performConversion(text, tabId) {
  // Try conversion in order of specificity: currency first (most specific), then length, weight, temperature, time
  let result = null;

  // Try currency conversion first (very specific patterns)
  const currencyData = detectCurrencyPattern(text);
  if (currencyData) {
    result = await convertCurrencyWithPrefs(currencyData);
    return result;
  }

  // Try length conversion
  const lengthData = detectLengthPattern(text);
  if (lengthData) {
    result = await convertLengthWithUserPrefs(lengthData);
    result.conversionType = "length"; // Add type identifier
    return result;
  }

  // Try weight conversion
  const weightData = detectWeightPattern(text);
  if (weightData) {
    result = await convertWeightWithUserPrefs(weightData);
    result.conversionType = "weight"; // Add type identifier
    return result;
  }

  // Try temperature conversion
  const tempData = detectTemperaturePattern(text);
  if (tempData) {
    result = await convertTemperatureWithPrefs(tempData);
    result.conversionType = "temperature"; // Add type identifier
    return result;
  }

  // Try time conversion
  const timeData = parseTime(text);
  if (timeData) {
    result = await convertFromStructured(timeData);
    return result;
  }

  return null;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "smart-convert",
    title: "Convert selection",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "smart-convert" && info.selectionText) {
    try {
      const result = await performConversion(info.selectionText, tab.id);

      if (result) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            action: "showConversion",
            result: result,
            originalText: info.selectionText,
          },
          (response) => {}
        );
      } else {
        throw new Error(
          "Could not detect time, temperature, length, weight, or currency format"
        );
      }
    } catch (error) {
      console.error("Conversion failed:", error);

      chrome.tabs.sendMessage(
        tab.id,
        {
          action: "showError",
          error: error.message || "Conversion failed",
          originalText: info.selectionText,
        },
        (response) => {}
      );
    }
  }
});

// Handle re-conversion and auto-conversion requests from content script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "autoConvert") {
    // Auto-convert selected text
    try {
      const result = await performConversion(message.text, sender.tab.id);

      if (result) {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "showConversion",
          result: result,
          originalText: message.text,
        });
      }
    } catch (error) {
      console.error("Auto-conversion failed:", error);
      // Don't show error overlay for auto-conversion failures to avoid spam
    }
  } else if (message.action === "reconvert") {
    // Handle reconversion requests with structured timeData
    try {
      const result = await convertFromStructured(message.timeData);

      chrome.tabs.sendMessage(sender.tab.id, {
        action: "showConversion",
        result: result,
        originalText: message.originalText,
        isReconversion: true,
      });
    } catch (error) {
      console.error("Re-conversion failed:", error);

      chrome.tabs.sendMessage(sender.tab.id, {
        action: "showError",
        error: error.message || "Re-conversion failed",
        originalText: message.originalText,
      });
    }
    return true; // Keep message channel open for async response
  }
});
