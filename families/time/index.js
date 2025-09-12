import { formatTime } from "../../core/format.js";

const TIME_PATTERNS = [
  // Patterns with UTC/GMT and offset (most specific first)
  /\b(\d{1,2}):(\d{2})\s*(am|pm|AM|PM)?\s*(?:UTC|GMT)([+-]\d{1,2}(?::\d{2})?)\b/,
  /\b(\d{1,2})\s*(am|pm|AM|PM)\s*(?:UTC|GMT)([+-]\d{1,2}(?::\d{2})?)\b/,
  /\b(\d{1,2}):(\d{2})\s*(?:UTC|GMT)([+-]\d{1,2}(?::\d{2})?)\b/,
  // Patterns with UTC/GMT without offset (fallback to UTC+0)
  /\b(\d{1,2}):(\d{2})\s*(am|pm|AM|PM)?\s*(?:UTC|GMT)\b/,
  /\b(\d{1,2})\s*(am|pm|AM|PM)\s*(?:UTC|GMT)\b/,
  /\b(\d{1,2}):(\d{2})\s*(?:UTC|GMT)\b/,
];

function detectTimePattern(text) {
  for (const pattern of TIME_PATTERNS) {
    const match = text.match(pattern);
    if (match) return match;
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

export const timeFamily = {
  id: "time",

  detect(candidate) {
    if (!candidate || !candidate.text) return 0;

    const text = candidate.text.trim();
    const match = detectTimePattern(text);

    if (!match) return 0;

    if (candidate.type === "time") return 0.9;

    if (text.match(/\b(\d{1,2}):(\d{2})\s*(am|pm|AM|PM)\b/)) return 0.8;
    if (text.match(/\b(\d{1,2})\s*(am|pm|AM|PM)\b/)) return 0.7;
    if (text.match(/\b(\d{1,2}):(\d{2})\b/)) return 0.6;

    return 0.1;
  },

  parse(candidate) {
    const text = candidate.text.trim();
    const match = detectTimePattern(text);

    if (!match) return null;

    let hours,
      minutes,
      isPM = false,
      utcOffset = 0;

    // Determine which pattern matched and extract values accordingly
    const hasAMPM = match[3] && match[3].match(/am|pm/i);

    // Check if this is a pattern with offset (patterns 0-2) or without offset (patterns 3-5)
    const hasOffset = match[4] && match[4].match(/[+-]\d/);

    if (hasAMPM) {
      // Pattern with AM/PM: match[1]=hours, match[2]=minutes, match[3]=AM/PM, match[4]=offset
      if (match[1] && match[2]) {
        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
      } else {
        hours = parseInt(match[1], 10);
        minutes = 0;
      }
      isPM = match[3].toLowerCase() === "pm";
      utcOffset = hasOffset ? parseOffset(match[4]) : 0;
    } else if (match[1] && match[2]) {
      // Pattern with HH:MM: match[1]=hours, match[2]=minutes, match[3]=offset (if present)
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      utcOffset = hasOffset ? parseOffset(match[3]) : 0;
    } else {
      return null;
    }

    // Validation
    if (hours < 1 || (hours > 12 && isPM)) return null;
    if (hours > 23) return null;
    if (minutes < 0 || minutes > 59) return null;

    // Convert to 24-hour format
    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    return {
      hours,
      minutes,
      utcOffset,
      originalText: text,
    };
  },

  async convert({ result, prefs }) {
    const { hours, minutes, utcOffset } = result;

    const today = new Date();
    let sourceDate;

    if (utcOffset !== 0) {
      const utc = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes
      );
      sourceDate = new Date(utc.getTime() - utcOffset * 60 * 1000);
    } else {
      sourceDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes
      );
    }

    const conversions = [];

    try {
      // Get user's local timezone for source display
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Add default conversions if no preferences are set
      if (
        !prefs.primaryZone &&
        (!prefs.secondaryZones || prefs.secondaryZones.length === 0)
      ) {
        // Default timezone conversions
        const defaultZones = [
          "America/New_York",
          "Europe/London",
          "Asia/Tokyo",
        ];
        for (const zone of defaultZones) {
          if (zone !== userTimezone) {
            conversions.push({
              label: zone.split("/").pop().replace(/_/g, " "),
              value: formatTime(sourceDate, zone),
            });
          }
        }
      } else {
        // Use user preferences
        if (prefs.primaryZone && prefs.primaryZone !== userTimezone) {
          conversions.push({
            label: prefs.primaryZone.split("/").pop().replace(/_/g, " "),
            value: formatTime(sourceDate, prefs.primaryZone),
          });
        }

        if (prefs.secondaryZones && Array.isArray(prefs.secondaryZones)) {
          for (const zone of prefs.secondaryZones) {
            if (zone !== userTimezone) {
              conversions.push({
                label: zone.split("/").pop().replace(/_/g, " "),
                value: formatTime(sourceDate, zone),
              });
            }
          }
        }
      }
    } catch (error) {
      throw new Error(`Time conversion failed: ${error.message}`);
    }

    // Determine the source timezone based on UTC offset
    let sourceTimezone, detectedUnit;
    if (result.utcOffset !== 0) {
      // Map UTC offset to timezone identifier
      const offsetHours = result.utcOffset / 60;
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

      detectedUnit = `UTC${offsetHours >= 0 ? "+" : ""}${offsetHours}`;
    } else {
      sourceTimezone = userTimezone;
      // Show city name with UTC offset for better debugging
      const cityName = userTimezone.split("/").pop().replace(/_/g, " ");
      const offsetHours = result.utcOffset / 60;
      const offsetSign = result.utcOffset >= 0 ? "+" : "";
      detectedUnit = `${cityName} (${offsetSign}${offsetHours})`;
    }

    return {
      detectedValue: result.originalText,
      detectedUnit: detectedUnit,
      conversions: conversions,
      conversionType: "time",
      timeData: {
        hours: result.hours,
        minutes: result.minutes,
        sourceTimezone: sourceTimezone,
        utcOffset: result.utcOffset,
      },
      copyValue: sourceDate.toISOString(),
    };
  },
};
