export function tokenize(text) {
  if (!text || typeof text !== "string") {
    return [];
  }

  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const candidates = [];

  candidates.push({
    text: trimmed,
    start: 0,
    end: trimmed.length,
  });

  const words = trimmed.split(/\s+/);
  if (words.length > 1) {
    words.forEach((word, index) => {
      if (word.length > 0) {
        candidates.push({
          text: word,
          start: index,
          end: index + 1,
          isWord: true,
        });
      }
    });
  }

  const timePattern =
    /\b\d{1,2}:\d{2}(?:\s*(?:am|pm|AM|PM))?\b|\b\d{1,2}\s*(?:am|pm|AM|PM)\b/g;
  let match;
  while ((match = timePattern.exec(trimmed)) !== null) {
    candidates.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
      type: "time",
    });
  }

  const tempPattern =
    /\b\d+(?:\.\d+)?\s*°?[CFK]\b|\b\d+(?:\.\d+)?\s*(?:celsius|fahrenheit|kelvin)\b/gi;
  while ((match = tempPattern.exec(trimmed)) !== null) {
    candidates.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
      type: "temperature",
    });
  }

  // Length pattern matching
  const lengthPattern =
    /\b\d+(?:\.\d+)?\s*(?:mm|cm|m(?![a-z])|km|millimeters?|millimetres?|centimeters?|centimetres?|meters?|metres?|kilometers?|kilometres?|in|inches?|"|ft|feet|foot|'|yd|yards?|mi|miles?)\b/gi;
  while ((match = lengthPattern.exec(trimmed)) !== null) {
    candidates.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
      type: "length",
    });
  }

  // Weight pattern matching - including compound patterns
  const weightPattern =
    /\b\d+(?:\.\d+)?\s*(?:stones?|st)\s+\d+(?:\.\d+)?\s*(?:pounds?|lbs|lb)\b|\b\d+(?:\.\d+)?\s*(?:pounds?|lbs|lb)\s+\d+(?:\.\d+)?\s*(?:ounces?|oz)\b|\b\d+(?:\.\d+)?\s*(?:mg|milligrams?|g|grams?|kg|kilograms?|tonnes?|tons?|t|oz|ounces?|pounds?|lbs|lb|stones?|st)\b/gi;
  while ((match = weightPattern.exec(trimmed)) !== null) {
    candidates.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
      type: "weight",
    });
  }

  return candidates.filter(
    (candidate, index, arr) =>
      arr.findIndex(
        (c) => c.text === candidate.text && c.start === candidate.start
      ) === index
  );
}
