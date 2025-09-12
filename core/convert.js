import { tokenize } from "./tokenize.js";
import { classify } from "./classify.js";
import { getPreferences } from "./storage.js";

export async function processSelection(selectionText) {
  if (!selectionText || typeof selectionText !== "string") {
    throw new Error("No text selected");
  }

  const candidates = tokenize(selectionText);
  if (candidates.length === 0) {
    throw new Error("No convertible content found");
  }

  const prefs = await getPreferences();

  for (const candidate of candidates) {
    const classification = await classify(candidate);

    if (classification && classification.confidence > 0.3) {
      try {
        const parseResult = await classification.family.parse(candidate);
        if (parseResult) {
          const conversionResult = await classification.family.convert({
            result: parseResult,
            prefs: prefs[classification.family.id] || {},
          });

          if (conversionResult && conversionResult.conversions) {
            return conversionResult;
          }
        }
      } catch (error) {
        console.warn(
          `Conversion failed for family ${classification.family.id}:`,
          error
        );
        continue;
      }
    }
  }

  throw new Error("Unable to convert the selected text");
}
