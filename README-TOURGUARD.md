# TourGuard - 3D Glassmorphism Login Prototype

A modern, secure, and accessible 3D-styled authentication interface for a global travel safety app.

## 🎨 Design System

### Visual Style
- **3D Glassmorphism**: Semi-transparent cards with backdrop blur and depth shadows
- **Color Palette**: Deep blue primary (#0B3D91), sophisticated teal accents, gradient backgrounds
- **Typography**: Clean sans-serif with high contrast for accessibility
- **3D Effects**: Mouse-tracked card tilting, floating animations, glow effects

### Component Architecture

```
LoginPage
├── GlassmorphismCard (3D tiltable container)
│   ├── CountrySelector (Flag + Name + Dialing Code)
│   ├── PhoneInput (Country-specific validation)
│   ├── DigitalIdInput (Conditional, hidden for India)
│   ├── LocationConsent (Checkbox + Info)
│   └── ActionButtons (Send OTP + Email Login)
└── HeroSection (Animated 3D Globe)
```

## 🔧 Implementation Details

### Core Components

1. **GlassmorphismCard** (`src/components/ui/glassmorphism-card.tsx`)
   - 3D tilt effect on mouse movement (desktop only)
   - Backdrop blur with gradient overlays
   - Responsive mobile-friendly fallback

2. **CountrySelector** (`src/components/ui/country-selector.tsx`)
   - Flag emoji + Country name + E.164 dialing code
   - Searchable dropdown with keyboard navigation
   - Accessibility: ARIA labels, keyboard support

3. **PhoneInput** (`src/components/ui/phone-input.tsx`)
   - Real-time validation based on selected country
   - Visual feedback (error/success states)
   - Auto-formatting with country-specific patterns

4. **DigitalIdInput** (`src/components/ui/digital-id-input.tsx`)
   - Conditional rendering (hidden when country === "IN")
   - Tooltip help text with format examples
   - Optional field with clear labeling

### Data Structures

**Country Data Sample** (First 20 countries)
```json
{
  "code": "US",
  "name": "United States", 
  "dialCode": "+1",
  "flag": "🇺🇸"
}
```

**Validation Rules**
- Phone regex patterns per country
- Digital ID formats and examples
- Error message localization

## 🎯 Accessibility Features

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility (ARIA labels)
- ✅ High contrast mode support
- ✅ Focus indicators on all interactive elements
- ✅ Reduced motion preferences respected
- ✅ Semantic HTML structure

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (320px+) | Single column, simplified interactions |
| Tablet (768px+) | Stacked layout with enhanced spacing |
| Desktop (1024px+) | Two-column with animated 3D globe hero |
| Large (1440px+) | Optimized spacing and proportions |

## 🔐 Security & Validation

### Phone Number Validation
- Country-specific E.164 format validation
- Real-time validation feedback
- Examples: US (+1), UK (+44), India (+91), etc.

### Digital ID Handling
- Optional field for enhanced security
- Country-specific formats (SSN, National Insurance, etc.)
- Secure input handling with help tooltips

## 🎬 Animations & Micro-interactions

- **3D Card Tilt**: Mouse-tracked perspective transforms
- **Globe Animation**: 20-second continuous rotation
- **Floating Elements**: Subtle up-down movements
- **Glow Effects**: Pulsing accent highlights
- **Button Interactions**: Hover scaling and glow effects
- **Toast Notifications**: Success/error feedback

## 🛠️ Technical Specifications

### Built With
- **React 18** + TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Class Variance Authority** for component variants

### Browser Support
- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Mobile-optimized touch interactions

## 📊 Component States

### Form Validation States
- `default` - Initial state
- `focused` - Active input focus
- `error` - Validation failed
- `success` - Valid input
- `loading` - Processing state
- `disabled` - Inactive state

### UX Copy Examples
```typescript
{
  phoneInvalid: "Please enter a valid phone number for the selected country",
  countryRequired: "Please select your country", 
  otpFailed: "Failed to send OTP. Please try again",
  networkError: "Connection failed. Please check your internet and try again"
}
```

## 🌐 Expansion Guide

To implement the full ISO E.164 country list:

1. **Data Source**: Use `libphonenumber-js` for comprehensive validation
2. **API Integration**: REST Countries API for country metadata
3. **Total Coverage**: ~250 countries and territories
4. **Recommended Library**: `react-phone-number-input`

### CSV Sample Export
```csv
code,name,dialCode,flag
US,United States,+1,🇺🇸
GB,United Kingdom,+44,🇬🇧
IN,India,+91,🇮🇳
AU,Australia,+61,🇦🇺
DE,Germany,+49,🇩🇪
```

## 🚀 Deployment Ready

- SEO optimized with semantic meta tags
- Performance optimized with lazy loading
- Accessibility compliant (WCAG 2.1)
- Mobile-first responsive design
- Production build ready

---

*This prototype serves as a Figma-ready implementation with component-level specifications for developer handoff.*