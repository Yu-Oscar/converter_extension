const DEFAULT_PREFERENCES = {
  time: {
    primaryZone: 'America/New_York',
    secondaryZones: ['Europe/London', 'Asia/Tokyo']
  },
  temperature: {
    inputUnits: ['C', 'F', 'K'],
    outputUnits: ['C', 'F']
  },
  currency: {
    primaryCurrency: 'USD',
    secondaryCurrencies: ['EUR', 'GBP', 'JPY', 'CAD']
  }
};

export async function getPreferences() {
  try {
    const result = await chrome.storage.sync.get(['preferences']);
    return { ...DEFAULT_PREFERENCES, ...result.preferences };
  } catch (error) {
    console.warn('Failed to load preferences, using defaults:', error);
    return DEFAULT_PREFERENCES;
  }
}

export async function setPreferences(newPrefs) {
  try {
    await chrome.storage.sync.set({ preferences: newPrefs });
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

export async function getFamilyPreferences(familyId) {
  const prefs = await getPreferences();
  return prefs[familyId] || {};
}

export async function setFamilyPreferences(familyId, familyPrefs) {
  const prefs = await getPreferences();
  prefs[familyId] = familyPrefs;
  return setPreferences(prefs);
}