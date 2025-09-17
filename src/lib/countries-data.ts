// TourGuard Country Data
// Sample of first 20 countries with E.164 dialing codes

export interface CountryData {
  code: string; // ISO Alpha-2 country code
  name: string;
  dialCode: string; // E.164 dialing code
  flag: string; // Unicode flag emoji
}

export const COUNTRIES_SAMPLE: CountryData[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" }
];

// To expand to full ISO E.164 list:
// 1. Use the official ISO 3166-1 alpha-2 country code list
// 2. Cross-reference with ITU-T E.164 international calling codes
// 3. Include country subdivisions where applicable (US territories, etc.)
// 4. Popular libraries: react-phone-number-input, libphonenumber-js
// 5. API sources: REST Countries API, Country State City API

export const EXPANSION_GUIDE = {
  dataSources: [
    "ISO 3166-1 alpha-2 official list",
    "ITU-T E.164 recommendation", 
    "REST Countries API (restcountries.com)",
    "react-phone-number-input library metadata"
  ],
  implementation: {
    library: "libphonenumber-js",
    reason: "Google's libphonenumber with JavaScript bindings",
    features: ["Full E.164 validation", "Country detection", "Number formatting"]
  },
  totalCountries: "~250 countries and territories"
};