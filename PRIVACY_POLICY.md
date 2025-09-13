# Privacy Policy for Flash Convert

**Last Updated: September 13, 2024**

## Introduction

Flash Convert ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how our Chrome extension collects, uses, and protects your information when you use our service.

## Information We Collect

### Personal Information

**We do not collect any personal information.** Flash Convert does not require user registration, login credentials, or any personal identification.

### Data We Process

The extension processes the following types of data:

#### Selected Text Data

- **What**: Text you explicitly select on web pages
- **Purpose**: To detect and convert units (times, temperatures, currencies, lengths, weights)
- **Processing**: All processing occurs locally in your browser
- **Storage**: No selected text is stored or transmitted

#### User Preferences

- **What**: Your preferred timezones, currencies, and unit systems
- **Purpose**: To customize conversion results according to your preferences
- **Storage**: Stored locally using Chrome's storage API
- **Scope**: Only conversion preferences, no personal data

#### Browser Information

- **What**: Standard browser extension information (extension ID, version)
- **Purpose**: For extension functionality and updates
- **Storage**: Handled by Chrome's extension system

## How We Use Your Information

### Local Processing

- All conversion calculations are performed locally in your browser
- Selected text is processed immediately and discarded
- No data is sent to external servers except for currency exchange rates

### External API Usage

- **Currency Exchange Rates**: We fetch real-time exchange rates from ExchangeRate-API
- **Data Transmitted**: Only the base currency code (e.g., "USD") to request rates
- **Data Received**: Public exchange rate data only
- **No Personal Data**: No personal information is transmitted to external APIs

### User Preferences

- Preferences are stored locally using Chrome's storage API
- Preferences sync across your Chrome browsers when signed into the same Google account
- Preferences are used solely to customize your conversion experience

## Information Sharing

### We Do Not Share Your Information

- **No Third Parties**: We do not share, sell, or rent your information to third parties
- **No Data Transmission**: Selected text and personal data are never transmitted
- **No Analytics**: We do not use analytics or tracking services

### External Services

- **ExchangeRate-API**: We only request publicly available exchange rate data
- **No User Data**: No user information is shared with external services

## Data Storage and Security

### Local Storage

- All user preferences are stored locally using Chrome's secure storage API
- Selected text is processed in memory and immediately discarded
- No persistent storage of selected text or conversion data

### Security Measures

- All external API requests use HTTPS encryption
- No sensitive data is transmitted over the network
- Extension code is locally bundled with no remote code execution

### Data Retention

- **Selected Text**: Not retained; processed and discarded immediately
- **User Preferences**: Retained locally until you uninstall the extension
- **Conversion Results**: Not stored; displayed temporarily in overlay

## Your Rights and Choices

### Control Over Your Data

- **Delete Preferences**: Uninstall the extension to remove all stored preferences
- **Selective Text**: Only select text you want to convert
- **Disable Extension**: Disable the extension to stop all processing

### Chrome Browser Settings

- Manage extension permissions through Chrome's extension settings
- Control which websites the extension can access
- Revoke permissions at any time

## Children's Privacy

Flash Convert is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.

## International Users

This extension is designed to work globally. All processing occurs locally in your browser, ensuring compliance with international privacy laws including GDPR, CCPA, and other regional privacy regulations.

## Third-Party Services

### ExchangeRate-API

- **Purpose**: Provides real-time currency exchange rates
- **Data Shared**: Only base currency codes (e.g., "USD")
- **Privacy**: ExchangeRate-API's privacy policy applies to their service
- **Alternative**: Extension works without currency rates (using static rates)

## Updates to This Policy

We may update this Privacy Policy from time to time. When we make changes, we will:

- Update the "Last Updated" date at the top of this policy
- Notify users through the Chrome Web Store if significant changes are made
- Continue to protect your privacy according to the updated policy

## Contact Information

If you have any questions about this Privacy Policy or our privacy practices, please contact us through the Chrome Web Store extension page.

## Technical Details

### Permissions Used

- **contextMenus**: To provide conversion options for selected text
- **storage**: To save your conversion preferences locally
- **activeTab**: To enable popup functionality when extension icon is clicked
- **Host Permissions**: To fetch real-time currency exchange rates

### Data Flow

1. **Text Selection**: You select text containing convertible values
2. **Local Processing**: Extension processes text locally in your browser
3. **API Request**: For currency conversions, requests exchange rates (currency code only)
4. **Display Results**: Shows conversion results in overlay
5. **Data Discarded**: Selected text and results are not stored

### No Tracking

- No cookies or tracking technologies used
- No user behavior monitoring
- No data collection for advertising or analytics
- No cross-site tracking

## Compliance

This Privacy Policy complies with:

- **Chrome Web Store Developer Policies**
- **General Data Protection Regulation (GDPR)**
- **California Consumer Privacy Act (CCPA)**
- **Children's Online Privacy Protection Act (COPPA)**

---

**By using Flash Convert, you acknowledge that you have read and understood this Privacy Policy.**
