# Smart Converter — Chrome Extension Starter

Smart Converter is a Chrome Extension (Manifest V3) that converts selected text (starting with time values) into your preferred formats. The architecture is built to be modular and extensible, so you can add other unit families later (temperature, length, mass, speed, etc.) with minimal changes.

## 📦 Features (MVP)

- **Context menu action**: Right-click → Convert selection
- **Time conversion**:
  - Detects times like `18:30`, `7:15 pm`, or `18:30 UTC+1`
  - Converts into your configured primary and secondary time zones
  - Displays results in a tooltip overlay on the page
- **Preferences UI**: toolbar popup lets you set your preferred zones
- **Tooltip overlay**: consistent UI shell with copy-to-clipboard support
- **Plug-in architecture**: new "families" (temperature, length, etc.) can be added without changing the core pipeline

## 🚀 Installation (Developer Mode)

1. Clone or unzip this repo.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** → select the `universal_converter_extension` folder.
5. The extension should now appear in your toolbar.

## 🖱 Usage

1. Select a time on any webpage (e.g., `18:30`, `7:15 pm`, `18:30 UTC+1`).
2. Right-click → **Convert selection**.
3. A tooltip will appear (top-right) showing:
   - Primary zone result
   - Any configured secondary zone results
   - Copy button for ISO timestamp

You can configure zones in the toolbar popup.

## 🏗 Architecture Overview

This project is structured around a pipeline that processes user selections in stages:

```
Selection text
   ↓
Tokenizer (split into candidates)
   ↓
Classifier (decide which family handles it)
   ↓
Family Module (parse → convert → render)
   ↓
Tooltip UI
```

Each family module (time, temperature, etc.) plugs into this pipeline.

## 📁 File Structure

```
/extension
  manifest.json              # MV3 config
  /background
    index.js                 # context menu + routing
    registry.js              # registers family modules
  /content
    index.js                 # listens for results, manages overlay
    overlay.js               # tooltip shell renderer
  /core
    tokenize.js              # splits text into candidates
    classify.js              # picks family module
    convert.js               # pipeline orchestrator
    format.js                # shared number/date formatters
    storage.js               # user preferences (chrome.storage)
  /families
    /time                    # working MVP module
      index.js
    /temperature             # stub (for later)
      index.js
  /popup
    popup.html + popup.js    # toolbar UI
  /options
    options.html             # options page
  /styles
    tooltip.css              # Shadow DOM styling
  /icons
    README.md                # icon placeholder instructions
```

## 🔌 The Family Module Interface

Every unit family implements the same interface:

```javascript
export const family = {
  id: 'time' | 'temperature' | 'length' | ...,
  detect(candidate) → number,        // confidence score 0..1
  parse(candidate) → ParseResult?,   // convert raw string into typed data
  convert({ result, prefs }) → ConversionOutput,
  render(out, container)             // optional custom rendering
};
```

This contract ensures that the core pipeline doesn't need to know about family-specific logic. Adding new conversions is just a matter of:

1. Creating a new folder in `/families/<name>/`.
2. Implementing the `detect`, `parse`, and `convert` functions.
3. Registering the module in `/background/registry.js`.

## 🕑 Time Family (MVP)

- **Detect**: looks for `HH:MM`, `h:mm am/pm`, `UTC±HH[:MM]` patterns.
- **Parse**: extracts hours/minutes, interprets UTC offset if present.
- **Convert**:
  - Defaults to today's date.
  - Converts into user's primary and secondary time zones.
  - Uses `Intl.DateTimeFormat` for formatting.
- **Render**: handled by the generic tooltip shell.

### 🌍 Supported Timezones

The extension supports **67 timezones** across all major regions:

#### **North America** (6 timezones)

| ID  | IANA Timezone       | City        | Country | Offset             |
| --- | ------------------- | ----------- | ------- | ------------------ |
| ET  | America/New_York    | New York    | USA     | Variable (EST/EDT) |
| CT  | America/Chicago     | Chicago     | USA     | Variable (CST/CDT) |
| MT  | America/Denver      | Denver      | USA     | Variable (MST/MDT) |
| PT  | America/Los_Angeles | Los Angeles | USA     | Variable (PST/PDT) |
| AT  | America/Halifax     | Halifax     | CAN     | -4 hours (ADT)     |
| NT  | America/St_Johns    | St Johns    | CAN     | -3.5 hours (NDT)   |

#### **Europe** (6 timezones)

| ID  | IANA Timezone | City   | Country | Offset        |
| --- | ------------- | ------ | ------- | ------------- |
| GMT | UTC           | GMT    | UTC     | 0 hours       |
| BST | Europe/London | London | GBR     | +1 hour       |
| CET | Europe/Berlin | Berlin | GER     | +1 hour       |
| EET | Europe/Athens | Athens | GRC     | +2 hours      |
| MSK | Europe/Moscow | Moscow | RUS     | +3 hours      |
| WET | Europe/Lisbon | Lisbon | POR     | 0 hours (WET) |

#### **Asia** (9 timezones)

| ID     | IANA Timezone  | City      | Country | Offset     |
| ------ | -------------- | --------- | ------- | ---------- |
| IST    | Asia/Kolkata   | Mumbai    | IND     | +5.5 hours |
| JST    | Asia/Tokyo     | Tokyo     | JPN     | +9 hours   |
| KST    | Asia/Seoul     | Seoul     | KOR     | +9 hours   |
| CST_CN | Asia/Shanghai  | Shanghai  | CHN     | +8 hours   |
| GST    | Asia/Dubai     | Dubai     | UAE     | +4 hours   |
| PKT    | Asia/Karachi   | Karachi   | PAK     | +5 hours   |
| ICT    | Asia/Bangkok   | Bangkok   | THA     | +7 hours   |
| SGT    | Asia/Singapore | Singapore | SGP     | +8 hours   |
| HKT    | Asia/Hong_Kong | Hong Kong | HKG     | +8 hours   |

#### **Pacific** (4 timezones)

| ID   | IANA Timezone    | City     | Country | Offset    |
| ---- | ---------------- | -------- | ------- | --------- |
| AEST | Australia/Sydney | Sydney   | AUS     | +10 hours |
| AWST | Australia/Perth  | Perth    | AUS     | +8 hours  |
| NZST | Pacific/Auckland | Auckland | NZL     | +12 hours |
| HST  | Pacific/Honolulu | Honolulu | USA     | -10 hours |

#### **South America** (4 timezones)

| ID  | IANA Timezone                  | City         | Country | Offset   |
| --- | ------------------------------ | ------------ | ------- | -------- |
| BRT | America/Sao_Paulo              | São Paulo    | BRA     | -3 hours |
| ART | America/Argentina/Buenos_Aires | Buenos Aires | ARG     | -3 hours |
| COT | America/Bogota                 | Bogotá       | COL     | -5 hours |
| PET | America/Lima                   | Lima         | PER     | -5 hours |

#### **Africa** (3 timezones)

| ID  | IANA Timezone       | City         | Country | Offset   |
| --- | ------------------- | ------------ | ------- | -------- |
| CAT | Africa/Johannesburg | Johannesburg | ZAF     | +2 hours |
| WAT | Africa/Lagos        | Lagos        | NGA     | +1 hour  |
| EAT | Africa/Nairobi      | Nairobi      | KEN     | +3 hours |

#### **Universal UTC** (25 timezones)

| ID     | IANA Timezone | Offset    | Description                |
| ------ | ------------- | --------- | -------------------------- |
| UTC-12 | Etc/GMT+12    | -12 hours | Baker Island Time          |
| UTC-11 | Etc/GMT+11    | -11 hours | Niue Time                  |
| UTC-10 | Etc/GMT+10    | -10 hours | Hawaii-Aleutian Time       |
| UTC-9  | Etc/GMT+9     | -9 hours  | Alaska Time                |
| UTC-8  | Etc/GMT+8     | -8 hours  | Pacific Time               |
| UTC-7  | Etc/GMT+7     | -7 hours  | Mountain Time              |
| UTC-6  | Etc/GMT+6     | -6 hours  | Central Time               |
| UTC-5  | Etc/GMT+5     | -5 hours  | Eastern Time               |
| UTC-4  | Etc/GMT+4     | -4 hours  | Atlantic Time              |
| UTC-3  | Etc/GMT+3     | -3 hours  | Brasília Time              |
| UTC-2  | Etc/GMT+2     | -2 hours  | Mid-Atlantic Time          |
| UTC-1  | Etc/GMT+1     | -1 hour   | Azores Time                |
| UTC    | UTC           | 0 hours   | Coordinated Universal Time |
| UTC+1  | Etc/GMT-1     | +1 hour   | Central European Time      |
| UTC+2  | Etc/GMT-2     | +2 hours  | Eastern European Time      |
| UTC+3  | Etc/GMT-3     | +3 hours  | Moscow Time                |
| UTC+4  | Etc/GMT-4     | +4 hours  | Gulf Time                  |
| UTC+5  | Etc/GMT-5     | +5 hours  | Pakistan Time              |
| UTC+6  | Etc/GMT-6     | +6 hours  | Bangladesh Time            |
| UTC+7  | Etc/GMT-7     | +7 hours  | Indochina Time             |
| UTC+8  | Etc/GMT-8     | +8 hours  | China Time                 |
| UTC+9  | Etc/GMT-9     | +9 hours  | Japan Time                 |
| UTC+10 | Etc/GMT-10    | +10 hours | Australian Eastern Time    |
| UTC+11 | Etc/GMT-11    | +11 hours | Solomon Islands Time       |
| UTC+12 | Etc/GMT-12    | +12 hours | New Zealand Time           |

### 📝 Additional Timezone Abbreviations

The extension also recognizes these legacy abbreviations for backward compatibility:

- **EST/EDT** → ET (Eastern Time)
- **CST/CDT** → CT (Central Time)
- **MST/MDT** → MT (Mountain Time)
- **PST/PDT** → PT (Pacific Time)

**Note**: Variable offset timezones (ET, CT, MT, PT) automatically adjust for Daylight Saving Time using the current IANA timezone data.

## 🌡 Temperature Family (Stub Example)

Included as a stub (`/families/temperature/index.js`) to demonstrate how to extend:

- **Detect**: regex for `25°C`, `77 F`, `300K`.
- **Parse**: extracts numeric value + unit.
- **Convert**: normalize to Kelvin → convert to targets (C, F, K).
- **Render**: piggybacks on generic tooltip.

To enable:

- Import it in `/background/registry.js`
- Add preferences in `/core/storage.js`

## 🧩 Core Components

### Background (`/background`)

- Handles context menu clicks.
- Runs the pipeline (`processSelection`).
- Sends results back to the content script for rendering.

### Content (`/content`)

- Injects a Shadow DOM tooltip overlay.
- Listens for results from background and renders them.

### Core (`/core`)

- `tokenize.js`: prepares selection text for classification.
- `classify.js`: asks each family module for a confidence score.
- `convert.js`: runs detect → parse → convert.
- `storage.js`: stores preferences in `chrome.storage.sync`.

### Families (`/families`)

- Each family (time, temperature, etc.) lives in its own folder.
- Only time is active by default.

### UI (`/popup` and `/styles`)

- Popup for user preferences (primary/secondary zones).
- Tooltip styling with consistent look.

## 🔮 Future Expansion

The architecture supports incremental growth:

1. **Tokenizer improvements**:

   - Split selections like "72°F at 6pm PST we ran 5km" into multiple candidates.

2. **New families**:

   - Add `/families/length`, `/families/mass`, etc.
   - Each defines its own regex + conversion rules.

3. **Tiny classifier (optional)**:

   - If ambiguity arises, add a small ML model for classification.
   - Integrated at the `classify()` stage without touching family code.

4. **Lazy-loading families**:

   - Use `import()` to load only the needed family when detected.

5. **UX enhancements**:
   - Inline tooltip near selection.
   - Tabs for disambiguation (e.g., C = Celsius vs Coulomb).

## ✅ Testing

- **Unit tests**: each family's `parse` and `convert`.
- **E2E tests**: simulate text selection and assert tooltip output.
- **Contract tests**: ensure each family module implements the required interface.

## ⚖️ Design Principles

- **Separation of concerns**: core pipeline vs families vs UI.
- **Extensibility**: add new unit families with no changes to existing ones.
- **Minimal dependencies**: MVP uses only native Web APIs.
- **Privacy**: all parsing and conversion is done locally.
- **Progressive enhancement**: start with rules, add ML later if needed.

## 🛠 Development

1. Make changes to the code.
2. Go to `chrome://extensions` and click the reload button for Smart Converter.
3. Test your changes on any webpage.

## 📝 Adding New Unit Families

1. Create `/families/your-unit/index.js` with the family interface.
2. Import and register it in `/background/registry.js`:
   ```javascript
   import { yourUnitFamily } from "../families/your-unit/index.js";
   registerFamily(yourUnitFamily);
   ```
3. Add default preferences in `/core/storage.js`.
4. Test with text selection on any webpage.

## 🤝 Contributing

This starter is designed to be extended! Some ideas for new families:

- **Length**: miles ↔ kilometers, feet ↔ meters
- **Weight**: pounds ↔ kilograms, ounces ↔ grams
- **Speed**: mph ↔ km/h, knots ↔ m/s
- **Currency**: USD ↔ EUR (with live rates)
- **Coordinates**: decimal degrees ↔ DMS

Each family is self-contained, so you can work on them independently.

---

**Built with ❤️ for extensibility and simplicity.**
