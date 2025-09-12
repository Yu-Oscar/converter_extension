import { getAllFamilies } from '../background/registry.js';

export async function classify(candidate) {
  const families = getAllFamilies();
  let bestMatch = null;
  let highestScore = 0;
  
  for (const family of families) {
    try {
      const score = await family.detect(candidate);
      if (score > highestScore && score > 0.1) {
        highestScore = score;
        bestMatch = family;
      }
    } catch (error) {
      console.warn(`Family ${family.id} detection failed:`, error);
    }
  }
  
  return bestMatch ? {
    family: bestMatch,
    confidence: highestScore
  } : null;
}