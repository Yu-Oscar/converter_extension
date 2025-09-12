import { formatTemperature } from "../../core/format.js";

const TEMP_PATTERNS = [
  /(-?\d+(?:\.\d+)?)\s*°([CFK])\b/i,
  /(-?\d+(?:\.\d+)?)\s*(celsius|fahrenheit|kelvin)\b/i,
  /(-?\d+(?:\.\d+)?)\s*([CFK])\b/i,
];

function detectTempPattern(text) {
  for (const pattern of TEMP_PATTERNS) {
    const match = text.match(pattern);
    if (match) return match;
  }
  return null;
}

function convertToKelvin(value, unit) {
  const num = parseFloat(value);
  if (isNaN(num)) throw new Error("Invalid temperature value");

  switch (unit.toLowerCase()) {
    case "c":
    case "celsius":
      return num + 273.15;
    case "f":
    case "fahrenheit":
      return ((num - 32) * 5) / 9 + 273.15;
    case "k":
    case "kelvin":
      return num;
    default:
      throw new Error(`Unknown temperature unit: ${unit}`);
  }
}

function convertFromKelvin(kelvin, unit) {
  switch (unit.toLowerCase()) {
    case "c":
    case "celsius":
      return kelvin - 273.15;
    case "f":
    case "fahrenheit":
      return ((kelvin - 273.15) * 9) / 5 + 32;
    case "k":
    case "kelvin":
      return kelvin;
    default:
      throw new Error(`Unknown temperature unit: ${unit}`);
  }
}

export const temperatureFamily = {
  id: "temperature",

  detect(candidate) {
    if (!candidate || !candidate.text) return 0;

    const text = candidate.text.trim();
    const match = detectTempPattern(text);

    if (!match) return 0;

    if (candidate.type === "temperature") return 0.9;

    if (text.match(/-?\d+(?:\.\d+)?\s*°[CFK]\b/i)) return 0.8;
    if (text.match(/-?\d+(?:\.\d+)?\s*(celsius|fahrenheit|kelvin)\b/i))
      return 0.7;
    if (text.match(/-?\d+(?:\.\d+)?\s*[CFK]\b/i)) return 0.6;

    return 0.1;
  },

  parse(candidate) {
    const text = candidate.text.trim();
    const match = detectTempPattern(text);

    if (!match) return null;

    const value = parseFloat(match[1]);
    const unit = match[2];

    if (isNaN(value)) return null;
    if (!unit) return null;

    const normalizedUnit = unit.toLowerCase();
    if (
      !["c", "f", "k", "celsius", "fahrenheit", "kelvin"].includes(
        normalizedUnit
      )
    ) {
      return null;
    }

    return {
      value,
      unit: normalizedUnit,
      originalText: text,
    };
  },

  async convert({ result, prefs }) {
    const { value, unit } = result;

    try {
      const kelvin = convertToKelvin(value, unit);

      const outputUnits = prefs.outputUnits || ["c", "f"];
      const conversions = [];

      for (const outputUnit of outputUnits) {
        if (outputUnit.toLowerCase() !== unit.toLowerCase()) {
          const convertedValue = convertFromKelvin(kelvin, outputUnit);
          const unitLabel =
            outputUnit.toUpperCase() === "C"
              ? "Celsius"
              : outputUnit.toUpperCase() === "F"
              ? "Fahrenheit"
              : "Kelvin";

          conversions.push({
            label: unitLabel,
            value: formatTemperature(convertedValue, outputUnit),
          });
        }
      }

      conversions.push({
        label: "Kelvin",
        value: formatTemperature(kelvin, "K"),
      });

      return {
        conversions,
        copyValue: `${value}°${unit.toUpperCase()} = ${formatTemperature(
          kelvin,
          "K"
        )}`,
      };
    } catch (error) {
      throw new Error(`Temperature conversion failed: ${error.message}`);
    }
  },
};
