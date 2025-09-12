import { formatLength } from '../../core/format.js';

const LENGTH_PATTERNS = [
  // Metric patterns
  /\b(\d+(?:\.\d+)?)\s*(?:mm|millimeters?|millimetres?)\b/i,
  /\b(\d+(?:\.\d+)?)\s*(?:cm|centimeters?|centimetres?)\b/i,
  /\b(\d+(?:\.\d+)?)\s*(?:m(?![a-z])|meters?|metres?)\b/i,
  /\b(\d+(?:\.\d+)?)\s*(?:km|kilometers?|kilometres?)\b/i,
  
  // Imperial patterns
  /\b(\d+(?:\.\d+)?)\s*(?:in|inches?|")\b/i,
  /\b(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')\b/i,
  /\b(\d+(?:\.\d+)?)\s*(?:yd|yards?)\b/i,
  /\b(\d+(?:\.\d+)?)\s*(?:mi|miles?)\b/i,
];

const UNIT_MAP = {
  'mm': { unit: 'millimeter', toMeters: 0.001 },
  'millimeter': { unit: 'millimeter', toMeters: 0.001 },
  'millimeters': { unit: 'millimeter', toMeters: 0.001 },
  'millimetre': { unit: 'millimeter', toMeters: 0.001 },
  'millimetres': { unit: 'millimeter', toMeters: 0.001 },
  
  'cm': { unit: 'centimeter', toMeters: 0.01 },
  'centimeter': { unit: 'centimeter', toMeters: 0.01 },
  'centimeters': { unit: 'centimeter', toMeters: 0.01 },
  'centimetre': { unit: 'centimeter', toMeters: 0.01 },
  'centimetres': { unit: 'centimeter', toMeters: 0.01 },
  
  'm': { unit: 'meter', toMeters: 1 },
  'meter': { unit: 'meter', toMeters: 1 },
  'meters': { unit: 'meter', toMeters: 1 },
  'metre': { unit: 'meter', toMeters: 1 },
  'metres': { unit: 'meter', toMeters: 1 },
  
  'km': { unit: 'kilometer', toMeters: 1000 },
  'kilometer': { unit: 'kilometer', toMeters: 1000 },
  'kilometers': { unit: 'kilometer', toMeters: 1000 },
  'kilometre': { unit: 'kilometer', toMeters: 1000 },
  'kilometres': { unit: 'kilometer', toMeters: 1000 },
  
  'in': { unit: 'inch', toMeters: 0.0254 },
  'inch': { unit: 'inch', toMeters: 0.0254 },
  'inches': { unit: 'inch', toMeters: 0.0254 },
  '"': { unit: 'inch', toMeters: 0.0254 },
  
  'ft': { unit: 'foot', toMeters: 0.3048 },
  'foot': { unit: 'foot', toMeters: 0.3048 },
  'feet': { unit: 'foot', toMeters: 0.3048 },
  "'": { unit: 'foot', toMeters: 0.3048 },
  
  'yd': { unit: 'yard', toMeters: 0.9144 },
  'yard': { unit: 'yard', toMeters: 0.9144 },
  'yards': { unit: 'yard', toMeters: 0.9144 },
  
  'mi': { unit: 'mile', toMeters: 1609.344 },
  'mile': { unit: 'mile', toMeters: 1609.344 },
  'miles': { unit: 'mile', toMeters: 1609.344 }
};

function detectLengthPattern(text) {
  for (const pattern of LENGTH_PATTERNS) {
    const match = text.match(pattern);
    if (match) return match;
  }
  return null;
}

function extractUnit(text) {
  const unitMatch = text.match(/(?:mm|cm|m(?![a-z])|km|millimeters?|millimetres?|centimeters?|centimetres?|meters?|metres?|kilometers?|kilometres?|in|inches?|"|ft|feet|foot|'|yd|yards?|mi|miles?)/i);
  return unitMatch ? unitMatch[0].toLowerCase() : null;
}

export const lengthFamily = {
  id: 'length',
  
  detect(candidate) {
    if (!candidate || !candidate.text) return 0;
    
    const text = candidate.text.trim();
    const match = detectLengthPattern(text);
    
    if (!match) return 0;
    
    if (candidate.type === 'length') return 0.9;
    
    // Higher confidence for specific length patterns
    if (text.match(/\b\d+(?:\.\d+)?\s*(?:mm|cm|km|in|ft|yd|mi)\b/i)) return 0.8;
    if (text.match(/\b\d+(?:\.\d+)?\s*(?:millimeters?|centimeters?|meters?|inches?|feet|yards?|miles?)\b/i)) return 0.7;
    if (text.match(/\b\d+(?:\.\d+)?\s*[m"']\b/)) return 0.6;
    
    return 0.1;
  },
  
  parse(candidate) {
    const text = candidate.text.trim();
    const match = detectLengthPattern(text);
    
    if (!match) return null;
    
    const value = parseFloat(match[1]);
    const unitText = extractUnit(text);
    
    if (isNaN(value) || !unitText) return null;
    
    const unitInfo = UNIT_MAP[unitText];
    if (!unitInfo) return null;
    
    return {
      value,
      unit: unitInfo.unit,
      toMeters: unitInfo.toMeters,
      originalText: text
    };
  },
  
  async convert({ result, prefs }) {
    const { value, unit, toMeters } = result;
    
    try {
      // Convert to meters first
      const meters = value * toMeters;
      
      // Get user preferences
      const lengthPrefs = prefs?.length || {};
      const primaryUnit = lengthPrefs.primaryUnit || 'feet';
      const secondaryUnits = lengthPrefs.secondaryUnits || ['meters', 'centimeters'];
      
      // Create list of all units to show (primary + secondary)
      const unitsToShow = [primaryUnit, ...secondaryUnits];
      
      // Define all possible conversions
      const allConversions = [
        { key: 'millimeters', label: 'Millimetres', value: formatLength(meters * 1000, 'mm') },
        { key: 'centimeters', label: 'Centimetres', value: formatLength(meters * 100, 'cm') },
        { key: 'meters', label: 'Metres', value: formatLength(meters, 'm') },
        { key: 'kilometers', label: 'Kilometres', value: formatLength(meters / 1000, 'km') },
        { key: 'inches', label: 'Inches', value: formatLength(meters / 0.0254, 'in') },
        { key: 'feet', label: 'Feet', value: formatLength(meters / 0.3048, 'ft') },
        { key: 'yards', label: 'Yards', value: formatLength(meters / 0.9144, 'yd') },
        { key: 'miles', label: 'Miles', value: formatLength(meters / 1609.344, 'mi') }
      ];
      
      // Map original unit keys to preference keys
      const unitKeyMap = {
        'millimeter': 'millimeters',
        'centimeter': 'centimeters', 
        'meter': 'meters',
        'kilometer': 'kilometers',
        'inch': 'inches',
        'foot': 'feet',
        'yard': 'yards',
        'mile': 'miles'
      };
      
      const originalUnitKey = unitKeyMap[unit] || unit;
      
      // Filter to only show selected units, excluding the original unit
      const conversions = allConversions
        .filter(conv => unitsToShow.includes(conv.key) && conv.key !== originalUnitKey)
        .sort((a, b) => {
          // Sort by preference order: primary first, then secondary in order
          const aIndex = a.key === primaryUnit ? 0 : secondaryUnits.indexOf(a.key) + 1;
          const bIndex = b.key === primaryUnit ? 0 : secondaryUnits.indexOf(b.key) + 1;
          return aIndex - bIndex;
        })
        .map(({ label, value }) => ({ label, value }));
      
      return {
        type: 'length',
        conversions,
        detectedValue: `${value} ${unit}`,
        copyValue: `${value} ${unit} = ${formatLength(meters, 'm')}`
      };
    } catch (error) {
      throw new Error(`Length conversion failed: ${error.message}`);
    }
  }
};