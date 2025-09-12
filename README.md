# Flash Convert — Chrome Extension Starter

Flash Convert is a Chrome Extension (Manifest V3) that converts selected text (starting with time values) into your preferred formats. The architecture is built to be modular and extensible, so you can add other unit families later (temperature, length, mass, speed, etc.) with minimal changes.

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
4. Click **Load unpacked** → select the `converter_extension` folder.
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

This project uses a streamlined architecture that processes user selections directly:

```
Selection text
   ↓
Background Script (detect → parse → convert)
   ↓
Content Script (render tooltip overlay)
   ↓
User Interface (copy to clipboard)
```

The extension supports multiple unit types (time, temperature, length, weight, currency) with all conversion logic centralized in the background script.

## 📁 File Structure

```
/converter_extension
  manifest.json              # MV3 config
  /background
    background.js            # service worker with all conversion logic
  /content
    content.js               # content script with overlay rendering
  /popup
    popup.html               # toolbar popup UI
    popup.js                 # popup logic and preferences
  /styles
    tooltip.css              # tooltip styling
  /icons
    icon16.png               # 16x16 extension icon
    icon48.png               # 48x48 extension icon
    icon64.png               # 64x64 extension icon
    icon128.png              # 128x128 extension icon
```

## 🔧 Supported Conversions

The extension currently supports these unit types:

- **Time**: Timezone conversions with 67+ supported timezones
- **Temperature**: Celsius, Fahrenheit, and Kelvin conversions
- **Length**: Metric and imperial length conversions
- **Weight**: Metric and imperial weight conversions
- **Currency**: Real-time currency conversions with 50+ currencies

## 🕑 Time Conversion Features

- **Detection**: Recognizes `HH:MM`, `h:mm am/pm`, `UTC±HH[:MM]` patterns
- **Parsing**: Extracts hours/minutes and interprets UTC offsets
- **Conversion**:
  - Defaults to today's date
  - Converts to user's primary and secondary time zones
  - Uses `Intl.DateTimeFormat` for accurate formatting
- **Display**: Shows results in a clean tooltip overlay

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

## 🧩 Core Components

### Background Script (`/background/background.js`)

- Handles context menu clicks and text selection
- Contains all conversion logic for time, temperature, length, weight, and currency
- Processes user selections and sends results to content script
- Manages user preferences and settings

### Content Script (`/content/content.js`)

- Injects tooltip overlays on web pages
- Listens for conversion results from background script
- Renders conversion results in clean, copyable tooltips
- Handles user interactions (copy to clipboard)

### Popup UI (`/popup/`)

- Provides user interface for setting preferences
- Allows configuration of time zones, temperature units, etc.
- Clean, responsive design for extension management

### Styling (`/styles/tooltip.css`)

- Consistent tooltip appearance across all web pages
- Responsive design that works on any website
- Clean, modern styling with proper contrast

## 🔮 Future Expansion

The extension can be enhanced with:

1. **Multi-unit detection**:

   - Parse complex selections like "72°F at 6pm PST we ran 5km"
   - Show multiple conversion results in organized tabs

2. **Additional unit types**:

   - Speed conversions (mph ↔ km/h)
   - Area conversions (sq ft ↔ sq m)
   - Volume conversions (gallons ↔ liters)
   - Energy conversions (calories ↔ joules)

3. **Enhanced UX**:

   - Inline tooltips positioned near selections
   - Keyboard shortcuts for quick access
   - Customizable tooltip themes

4. **Advanced features**:
   - Historical currency rates
   - Offline conversion capabilities
   - Custom unit definitions

## ✅ Testing

- **Manual testing**: Select text on any webpage and verify conversion results
- **Cross-browser testing**: Ensure compatibility with Chrome, Edge, and other Chromium-based browsers
- **Unit testing**: Test individual conversion functions with various inputs
- **Integration testing**: Verify end-to-end workflow from selection to tooltip display

## ⚖️ Design Principles

- **Simplicity**: All conversion logic centralized in background script
- **Performance**: Minimal overhead with efficient text processing
- **Privacy**: All parsing and conversion done locally (except currency rates)
- **Accessibility**: Clean, readable tooltips with proper contrast
- **Reliability**: Robust error handling and fallback mechanisms

## 🛠 Development

1. Make changes to the code in your preferred editor
2. Go to `chrome://extensions` and click the reload button for Flash Convert
3. Test your changes by selecting text on any webpage
4. Use browser developer tools to debug any issues

## 📝 Adding New Conversion Types

To add new unit conversions:

1. Add detection logic in `background/background.js`
2. Implement conversion functions for the new unit type
3. Add UI handling in `content/content.js` for the new conversion type
4. Update the popup preferences if needed
5. Test thoroughly with various input formats

## 🤝 Contributing

This extension is designed to be easily extended! Some ideas for new conversion types:

- **Speed**: mph ↔ km/h, knots ↔ m/s
- **Area**: square feet ↔ square meters, acres ↔ hectares
- **Volume**: gallons ↔ liters, cubic feet ↔ cubic meters
- **Energy**: calories ↔ joules, BTUs ↔ kilowatt-hours
- **Coordinates**: decimal degrees ↔ DMS (degrees, minutes, seconds)

The codebase is well-organized and documented, making it easy to add new features.

---

**Built with ❤️ for simplicity and usability.**
