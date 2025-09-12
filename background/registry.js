import { timeFamily } from "../families/time/index.js";
import { temperatureFamily } from "../families/temperature/index.js";
import { lengthFamily } from "../families/length/index.js";
import { currencyFamily } from "../families/currency/index.js";
import { weightFamily } from "../families/weight/index.js";

const families = new Map();

export function registerFamily(family) {
  if (!family.id || !family.detect || !family.parse || !family.convert) {
    throw new Error(
      `Family ${family.id || "unknown"} missing required interface methods`
    );
  }
  families.set(family.id, family);
}

export function getAllFamilies() {
  return Array.from(families.values());
}

export function getFamilyById(id) {
  return families.get(id);
}

// Register all available families
registerFamily(timeFamily);
registerFamily(temperatureFamily);
registerFamily(lengthFamily);
registerFamily(currencyFamily);
registerFamily(weightFamily);
