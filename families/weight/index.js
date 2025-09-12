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
      
      if (pattern.source.includes('stone')) {
        // Stone and pounds: convert to total pounds
        const totalPounds = first * 14 + second;
        return {
          value: totalPounds,
          unit: 'LB',
          originalText: match[0].trim(),
          compound: { stone: first, pounds: second }
        };
      } else {
        // Pounds and ounces: convert to total ounces 
        const totalOunces = first * 16 + second;
        return {
          value: totalOunces, 
          unit: 'OZ',
          originalText: match[0].trim(),
          compound: { pounds: first, ounces: second }
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

export const weightFamily = {
  id: 'weight',
  
  detect(candidate) {
    if (!candidate || !candidate.text) return 0;
    
    const text = candidate.text.trim();
    const match = detectWeightPattern(text);
    
    if (!match) return 0;
    
    if (candidate.type === 'weight') return 0.9;
    
    // Higher confidence for specific weight patterns
    if (text.match(/\d+\s*(?:kg|kilograms?|lbs?|pounds?)\b/i)) return 0.8;
    if (text.match(/\d+\s*(?:g|grams?|oz|ounces?)\b/i)) return 0.7;
    if (text.match(/\d+\s*(?:mg|milligrams?|st|stones?)\b/i)) return 0.6;
    
    return 0.1;
  },
  
  parse(candidate) {
    const text = candidate.text.trim();
    const weightData = detectWeightPattern(text);
    
    if (!weightData) return null;
    
    return weightData;
  },
  
  async convert({ result, prefs }) {
    // Get user preferences
    const weightPrefs = prefs?.weight || {};
    const primaryUnit = weightPrefs.primaryUnit || 'pounds';
    const secondaryUnits = weightPrefs.secondaryUnits || ['kilograms', 'grams'];
    
    // Create list of all units to show (primary + secondary)
    const unitsToShow = [primaryUnit, ...secondaryUnits];

    const converted = convertWeight(result);
    
    // Add conversions for all units except the source unit
    const unitMap = {
      MG: { key: "milligrams", label: "Milligrams", symbol: "mg", prefKey: "milligrams" },
      G: { key: "grams", label: "Grams", symbol: "g", prefKey: "grams" },
      KG: { key: "kilograms", label: "Kilograms", symbol: "kg", prefKey: "kilograms" },
      T: { key: "tonnes", label: "Tonnes", symbol: "t", prefKey: "tonnes" },
      OZ: { key: "ounces", label: "Ounces", symbol: "oz", prefKey: "ounces" },
      LB: { key: "pounds", label: "Pounds", symbol: "lb", prefKey: "pounds" },
      ST: { key: "stones", label: "Stones", symbol: "st", prefKey: "stone" },
    };

    const sourceUnit = result.unit;
    
    // Create conversions only for selected units
    const conversions = [];
    
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
          prefKey: unitInfo.prefKey
        });
      }
    }
    
    // Sort by preference order: primary first, then secondary in order
    conversions.sort((a, b) => {
      const aIndex = a.prefKey === primaryUnit ? 0 : secondaryUnits.indexOf(a.prefKey) + 1;
      const bIndex = b.prefKey === primaryUnit ? 0 : secondaryUnits.indexOf(b.prefKey) + 1;
      return aIndex - bIndex;
    });
    
    // Remove prefKey from final result
    const finalConversions = conversions.map(({ label, value }) => ({ label, value }));

    // Add compound displays only if both units are selected by user
    
    // Add pounds and ounces compound display
    if (sourceUnit !== "LB" && sourceUnit !== "OZ" && 
        unitsToShow.includes('pounds') && unitsToShow.includes('ounces')) {
      const totalOunces = converted.ounces;
      const pounds = Math.floor(totalOunces / 16);
      const remainingOunces = totalOunces % 16;
      
      // Only show for reasonable weights (1 oz to 50 lbs)
      if (totalOunces >= 1 && totalOunces <= 800) {
        const remainingOuncesRounded = Math.round(remainingOunces);
        
        if (pounds > 0 && remainingOuncesRounded > 0) {
          finalConversions.push({
            label: "Pounds and Ounces",
            value: `${pounds} lb ${remainingOuncesRounded} oz`
          });
        } else if (pounds > 0) {
          finalConversions.push({
            label: "Pounds and Ounces", 
            value: `${pounds} lb`
          });
        }
      }
    }

    // Add stone and pounds compound display
    if (sourceUnit !== "ST" && sourceUnit !== "LB" && 
        unitsToShow.includes('stone') && unitsToShow.includes('pounds')) {
      const totalPounds = converted.pounds;
      const stones = Math.floor(totalPounds / 14);
      const remainingPounds = totalPounds % 14;
      
      // Only show for human weight range (30 lbs to 400 lbs)
      if (totalPounds >= 30 && totalPounds <= 400) {
        const remainingPoundsRounded = Math.round(remainingPounds);
        
        if (stones > 0 && remainingPoundsRounded > 0) {
          finalConversions.push({
            label: "Stone and Pounds",
            value: `${stones} st ${remainingPoundsRounded} lb`
          });
        } else if (stones > 0) {
          finalConversions.push({
            label: "Stone and Pounds", 
            value: `${stones} st`
          });
        }
      }
    }

    // Handle compound measurements for display
    let detectedValue, detectedUnit;
    if (result.compound) {
      if (result.compound.stone !== undefined) {
        detectedValue = `${result.compound.stone} st ${result.compound.pounds} lb`;
        detectedUnit = "Stone and Pounds";
      } else {
        detectedValue = `${result.compound.pounds} lb ${result.compound.ounces} oz`;
        detectedUnit = "Pounds and Ounces";
      }
    } else {
      detectedValue = `${result.value} ${unitMap[sourceUnit].symbol}`;
      detectedUnit = unitMap[sourceUnit].label;
    }

    return {
      type: 'weight',
      detectedValue: detectedValue,
      detectedUnit: detectedUnit,
      conversions: finalConversions
    };
  }
};