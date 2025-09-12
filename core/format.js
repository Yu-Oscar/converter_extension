export function formatTime(date, timeZone) {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid date provided");
  }

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

export function formatTemperature(value, unit) {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Invalid temperature value");
  }

  const roundedValue = Math.round(value * 10) / 10;

  switch (unit.toLowerCase()) {
    case "c":
    case "celsius":
      return `${roundedValue}°C`;
    case "f":
    case "fahrenheit":
      return `${roundedValue}°F`;
    case "k":
    case "kelvin":
      return `${roundedValue}K`;
    default:
      return `${roundedValue}°${unit.toUpperCase()}`;
  }
}

export function formatLength(value, unit) {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Invalid length value");
  }

  // Smart formatting based on magnitude
  let displayValue;
  if (Math.abs(value) < 0.001) {
    displayValue = value.toFixed(6);
  } else if (Math.abs(value) < 1) {
    displayValue = value.toFixed(3);
  } else if (Math.abs(value) < 10) {
    displayValue = value.toFixed(2);
  } else if (Math.abs(value) < 100) {
    displayValue = value.toFixed(1);
  } else {
    displayValue = value.toFixed(0);
  }

  // Remove trailing zeros after decimal point
  displayValue = parseFloat(displayValue).toString();

  return `${displayValue} ${unit}`;
}

export function getTimeZoneDisplayName(timeZone) {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      timeZoneName: "long",
    }).formatToParts(now);

    const longName = parts.find((part) => part.type === "timeZoneName")?.value;
    const shortName = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      timeZoneName: "short",
    })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value;

    return longName || shortName || timeZone;
  } catch (error) {
    return timeZone;
  }
}
