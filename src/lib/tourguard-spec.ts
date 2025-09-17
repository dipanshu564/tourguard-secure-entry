// TourGuard Component Specification
// JSON-like component spec for developers

export interface TourGuardComponentSpec {
  name: string;
  description: string;
  props?: Record<string, {
    type: string;
    required: boolean;
    default?: any;
    description: string;
  }>;
  states?: string[];
  accessibility: string[];
  validation?: Record<string, string>;
}

export const TOURGUARD_COMPONENTS: Record<string, TourGuardComponentSpec> = {
  // Main Login Page
  LoginPage: {
    name: "LoginPage",
    description: "Main 3D glassmorphism login/signup page with hero animation",
    states: ["default", "loading", "error", "success"],
    accessibility: [
      "keyboard navigation support",
      "screen reader labels",
      "high contrast mode",
      "focus indicators",
      "aria-describedby for form fields"
    ]
  },

  // Country Selector Component  
  CountrySelector: {
    name: "CountrySelector", 
    description: "Dropdown with flag, country name, and E.164 dialing code",
    props: {
      onCountryChange: {
        type: "(country: CountryData) => void",
        required: true,
        description: "Callback when country selection changes"
      },
      defaultCountry: {
        type: "string",
        required: false,
        default: "IN",
        description: "Default selected country code"
      }
    },
    states: ["default", "open", "focused", "disabled", "error"],
    accessibility: [
      "aria-expanded for dropdown state",
      "aria-label for country selection",
      "keyboard arrow navigation",
      "escape key to close"
    ]
  },

  // Phone Input Component
  PhoneInput: {
    name: "PhoneInput",
    description: "Phone number input with country-specific validation", 
    props: {
      countryCode: {
        type: "string",
        required: true,
        description: "Selected country code for validation"
      },
      onPhoneChange: {
        type: "(phone: string, isValid: boolean) => void", 
        required: true,
        description: "Callback with phone number and validation status"
      }
    },
    states: ["default", "focused", "error", "success", "disabled"],
    validation: {
      "US": "^\\+1[2-9]\\d{2}[2-9]\\d{2}\\d{4}$",
      "GB": "^\\+44[1-9]\\d{8,9}$",
      "IN": "^\\+91[6-9]\\d{9}$",
      "AU": "^\\+61[2-478]\\d{8}$",
      "DE": "^\\+49[1-9]\\d{10,11}$"
    },
    accessibility: [
      "aria-invalid for error states",
      "aria-describedby for validation messages",
      "placeholder with country format example"
    ]
  },

  // Digital ID Component
  DigitalIdInput: {
    name: "DigitalIdInput",
    description: "Conditional digital ID input (hidden for India)",
    props: {
      countryCode: {
        type: "string", 
        required: true,
        description: "Country code to determine field visibility and format"
      },
      onIdChange: {
        type: "(id: string) => void",
        required: true, 
        description: "Callback when digital ID changes"
      }
    },
    states: ["default", "focused", "hidden", "error"],
    accessibility: [
      "conditional rendering with proper ARIA",
      "help text for format explanation",
      "optional field clearly indicated"
    ]
  },

  // 3D Glass Card Component
  GlassmorphismCard: {
    name: "GlassmorphismCard",
    description: "3D tiltable glassmorphism card with mouse tracking",
    props: {
      children: {
        type: "React.ReactNode",
        required: true,
        description: "Card content"
      },
      enableTilt: {
        type: "boolean",
        required: false, 
        default: true,
        description: "Enable 3D tilt effect on mouse move"
      }
    },
    states: ["default", "tilted", "mobile"],
    accessibility: [
      "reduced motion respect",
      "keyboard focus preservation",
      "semantic card structure"
    ]
  }
};

// Validation Rules by Country
export const VALIDATION_RULES = {
  phoneRegexPatterns: {
    "US": {
      pattern: "^\\+1[2-9]\\d{2}[2-9]\\d{2}\\d{4}$",
      example: "+1 (555) 123-4567",
      description: "10-digit US phone number"
    },
    "GB": {
      pattern: "^\\+44[1-9]\\d{8,9}$", 
      example: "+44 20 7946 0958",
      description: "UK phone number"
    },
    "IN": {
      pattern: "^\\+91[6-9]\\d{9}$",
      example: "+91 98765 43210", 
      description: "10-digit Indian mobile number"
    },
    "AU": {
      pattern: "^\\+61[2-478]\\d{8}$",
      example: "+61 2 1234 5678",
      description: "Australian phone number"
    },
    "DE": {
      pattern: "^\\+49[1-9]\\d{10,11}$",
      example: "+49 30 12345678",
      description: "German phone number"
    }
  },
  digitalIdFormats: {
    "US": {
      label: "SSN (optional)",
      placeholder: "XXX-XX-XXXX",
      helpText: "Social Security Number (optional)"
    },
    "GB": {
      label: "National Insurance (optional)", 
      placeholder: "AB 12 34 56 C",
      helpText: "National Insurance number (optional)"
    },
    "AU": {
      label: "Tax File Number (optional)",
      placeholder: "123 456 789", 
      helpText: "Australian Tax File Number (optional)"
    },
    "DE": {
      label: "Personalausweis (optional)",
      placeholder: "T22000129",
      helpText: "German ID card number (optional)"
    }
  }
};

// UX Copy for Error States
export const ERROR_MESSAGES = {
  phoneInvalid: "Please enter a valid phone number for the selected country",
  countryRequired: "Please select your country",
  networkError: "Connection failed. Please check your internet and try again",
  otpFailed: "Failed to send OTP. Please try again", 
  phoneRequired: "Phone number is required",
  termsRequired: "Please accept the terms and privacy policy"
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: "320px",
  tablet: "768px", 
  desktop: "1024px",
  large: "1440px"
};