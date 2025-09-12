// Currency detection and conversion functions
const CURRENCY_SYMBOLS = {
  $: "USD",
  "€": "EUR",
  "£": "GBP",
  "¥": "JPY",
  "₹": "INR",
  "₩": "KRW",
  "₽": "RUB",
  C$: "CAD",
  A$: "AUD",
  HK$: "HKD",
  S$: "SGD",
  NZ$: "NZD",
  R$: "BRL",
  CHF: "CHF",
  "CN¥": "CNY",
  "₪": "ILS",
  "₺": "TRY",
  zł: "PLN",
  kr: "NOK", // Could also be SEK or DKK
  "₡": "CRC",
  "₨": "PKR",
  "₦": "NGN",
  "₫": "VND",
  "₴": "UAH",
  "₲": "PYG",
};

const CURRENCY_PATTERNS = [
  // Symbol before number: "$5", "€10.50", "£100"
  /([€£¥₹₩₽¢₪₺₡₨₦₫₴₲]|C\$|A\$|HK\$|S\$|NZ\$|R\$|CN¥)\s*(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)/i,
  // Dollar symbol (needs special handling): "$5", "$10.50", "$1"
  /\$\s*(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)/,
  // Number then currency code: "1 USD", "5 USD", "10.50EUR", "100 GBP", "1 usd"
  // Use negative lookbehind to avoid matching time patterns like "22:30 HKT"
  /(?<!\d:)\b(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)\s*([A-Za-z]{3})(?!\w)/i,
  // Currency code then number: "USD 1", "USD 5", "EUR10.50", "usd 1"
  /([A-Za-z]{3})\s*(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)(?!\s*:\d{2})/i,
  // Special cases with letters: "1 dollar", "5 dollars", "10 euros", "100 pound" (singular only)
  /(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)\s*(dollars?|euros?|pound|yen|yuan|cents?)\b/i,
  // Abbreviations at end: "5 zloty", "100 kr"
  /(\d+(?:[,.\s]?\d{3})*(?:\.\d{1,2})?)\s*(zł|kr|CHF)\b/i,
];

function detectCurrencyPattern(text) {
  for (const pattern of CURRENCY_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      let amount, currencyCode;

      if (pattern.source.startsWith("\\$")) {
        // Dollar pattern: "$5"
        amount = parseFloat(match[1].replace(/,/g, ""));
        currencyCode = "USD";
      } else if (pattern.source.startsWith("([€£¥")) {
        // Symbol before number: "€10"
        const symbol = match[1];
        amount = parseFloat(match[2].replace(/,/g, ""));
        currencyCode = CURRENCY_SYMBOLS[symbol] || "USD";
      } else if (
        pattern.source.includes("[A-Za-z]{3}") &&
        match[2] &&
        match[2].match(/^\d/)
      ) {
        // Currency code then number: "USD 5"
        currencyCode = match[1];
        amount = parseFloat(match[2].replace(/,/g, ""));
      } else if (pattern.source.includes("[A-Za-z]{3}")) {
        // Number then currency code: "5 USD"
        amount = parseFloat(match[1].replace(/,/g, ""));
        currencyCode = match[2];
      } else if (pattern.source.includes("dollars?")) {
        // Word-based: "5 dollars"
        amount = parseFloat(match[1].replace(/,/g, ""));
        const word = match[2].toLowerCase();
        const wordMap = {
          dollar: "USD",
          dollars: "USD",
          euro: "EUR",
          euros: "EUR",
          pound: "GBP",
          yen: "JPY",
          yuan: "CNY",
          baht: "THB",
          bahts: "THB",
          rupee: "INR",
          rupees: "INR",
          won: "KRW",
          wons: "KRW",
          ruble: "RUB",
          rubles: "RUB",
          franc: "CHF",
          francs: "CHF",
          peso: "MXN",
          pesos: "MXN",
          real: "BRL",
          reals: "BRL",
          shekel: "ILS",
          shekels: "ILS",
          lira: "TRY",
          liras: "TRY",
          zloty: "PLN",
          zlotys: "PLN",
          krone: "NOK",
          kroner: "NOK",
          krona: "SEK",
          kronor: "SEK",
          dirham: "AED",
          dirhams: "AED",
          rand: "ZAR",
          rands: "ZAR",
          ringgit: "MYR",
          ringgits: "MYR",
          dong: "VND",
          dongs: "VND",
          hryvnia: "UAH",
          hryvnias: "UAH",
          guarani: "PYG",
          guaranis: "PYG",
        };
        currencyCode = wordMap[word] || "USD";
        if (word.includes("cent")) {
          amount = amount / 100; // Convert cents to dollars
        }
      } else {
        // Abbreviations: "100 kr"
        amount = parseFloat(match[1].replace(/,/g, ""));
        const abbr = match[2];
        currencyCode = CURRENCY_SYMBOLS[abbr] || "USD";
      }

      // Validate amount and currency code
      if (amount > 0 && currencyCode && currencyCode.length === 3) {
        return {
          amount,
          currency: currencyCode.toUpperCase(),
          originalText: match[0].trim(),
        };
      }
    }
  }
  return null;
}

// Cache for exchange rates (valid for 1 hour)
let exchangeRateCache = {
  data: null,
  timestamp: 0,
  baseCurrency: null,
};

async function getExchangeRates(baseCurrency = "USD") {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  // Return cached data if it's fresh and for the same base currency
  if (
    exchangeRateCache.data &&
    exchangeRateCache.baseCurrency === baseCurrency &&
    now - exchangeRateCache.timestamp < oneHour
  ) {
    return exchangeRateCache.data;
  }

  try {
    // Using free ExchangeRate-API (fallback to v6 if v4 fails)
    let response;
    try {
      response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      );
      if (!response.ok && response.status === 404) {
        // Try v6 API if v4 returns 404
        response = await fetch(
          `https://v6.exchangerate-api.com/v6/latest/${baseCurrency}`
        );
      }
    } catch (error) {
      // Fallback to v6 API
      response = await fetch(
        `https://v6.exchangerate-api.com/v6/latest/${baseCurrency}`
      );
    }

    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status}`);
    }

    const data = await response.json();

    // Handle different API response formats
    const rates = data.rates || data.conversion_rates;
    if (!rates) {
      throw new Error("Invalid API response format");
    }

    // Cache the result
    exchangeRateCache = {
      data: rates,
      timestamp: now,
      baseCurrency: baseCurrency,
    };

    return rates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    // Return cached data if available, even if expired
    if (exchangeRateCache.data) {
      return exchangeRateCache.data;
    }
    throw error;
  }
}

function formatCurrency(amount, currencyCode) {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "CN¥",
    INR: "₹",
    KRW: "₩",
    RUB: "₽",
    CAD: "C$",
    AUD: "A$",
    HKD: "HK$",
    SGD: "S$",
    NZD: "NZ$",
    BRL: "R$",
    CHF: "CHF",
    ILS: "₪",
    TRY: "₺",
    PLN: "zł",
    NOK: "kr",
    SEK: "kr",
    DKK: "kr",
  };

  const symbol = currencySymbols[currencyCode] || currencyCode;

  // Format based on currency
  if (currencyCode === "JPY" || currencyCode === "KRW") {
    // No decimals for currencies that don't use subunits
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  } else {
    // Two decimal places for most currencies
    const formatted = amount.toFixed(2);
    const [whole, decimal] = formatted.split(".");
    const wholeFormatted = parseInt(whole).toLocaleString();

    if (symbol.length === 1 && symbol !== "CHF") {
      return `${symbol}${wholeFormatted}.${decimal}`;
    } else {
      return `${wholeFormatted}.${decimal} ${symbol}`;
    }
  }
}

function getCurrencyName(currencyCode) {
  const currencyNames = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    KRW: "South Korean Won",
    RUB: "Russian Ruble",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    HKD: "Hong Kong Dollar",
    SGD: "Singapore Dollar",
    NZD: "New Zealand Dollar",
    BRL: "Brazilian Real",
    CHF: "Swiss Franc",
    ILS: "Israeli Shekel",
    TRY: "Turkish Lira",
    PLN: "Polish Zloty",
    NOK: "Norwegian Krone",
    SEK: "Swedish Krona",
    DKK: "Danish Krone",
  };

  return currencyNames[currencyCode] || currencyCode;
}

export const currencyFamily = {
  id: "currency",

  detect(candidate) {
    if (!candidate || !candidate.text) return 0;

    const text = candidate.text.trim();
    const match = detectCurrencyPattern(text);

    if (!match) return 0;

    if (candidate.type === "currency") return 0.9;

    // Higher confidence for specific currency patterns
    if (text.match(/\$\d+/)) return 0.8;
    if (text.match(/[€£¥₹₩₽]\d+/)) return 0.8;
    if (text.match(/\d+\s*[A-Z]{3}\b/i)) return 0.7;
    if (text.match(/\d+\s*(?:dollars?|euros?|yen|yuan)/i)) return 0.6;

    return 0.1;
  },

  parse(candidate) {
    const text = candidate.text.trim();
    const currencyData = detectCurrencyPattern(text);

    if (!currencyData) return null;

    return {
      amount: currencyData.amount,
      currency: currencyData.currency,
      originalText: currencyData.originalText,
    };
  },

  async convert({ result, prefs }) {
    // Get user preferences for currencies
    const currencyPrefs = prefs || {
      primaryCurrency: "USD",
      secondaryCurrencies: ["EUR", "GBP", "JPY", "CAD"],
    };

    try {
      const { amount, currency } = result;

      // Get exchange rates with the detected currency as base
      const rates = await getExchangeRates(currency);

      const conversions = [];
      const targetCurrencies = [
        currencyPrefs.primaryCurrency,
        ...currencyPrefs.secondaryCurrencies,
      ];

      // Remove the source currency from targets and deduplicate
      const uniqueTargets = [...new Set(targetCurrencies)].filter(
        (c) => c !== currency
      );

      for (const targetCurrency of uniqueTargets) {
        if (rates[targetCurrency]) {
          const convertedAmount = amount * rates[targetCurrency];
          const formattedAmount = formatCurrency(
            convertedAmount,
            targetCurrency
          );

          conversions.push({
            label: getCurrencyName(targetCurrency),
            value: formattedAmount,
            code: targetCurrency,
          });
        }
      }

      return {
        type: "currency",
        detectedValue: formatCurrency(amount, currency),
        detectedUnit: getCurrencyName(currency),
        conversions: conversions,
      };
    } catch (error) {
      console.error("Currency conversion failed:", error);
      throw new Error(`Currency conversion failed: ${error.message}`);
    }
  },
};
