import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CountryData } from "@/lib/countries-data";
import { VALIDATION_RULES } from "@/lib/tourguard-spec";

interface PhoneInputProps {
  country: CountryData;
  onPhoneChange: (phone: string, isValid: boolean) => void;
  value?: string;
  className?: string;
  placeholder?: string;
}

export function PhoneInput({
  country,
  onPhoneChange,
  value = "",
  className,
  placeholder,
}: PhoneInputProps) {
  const [phone, setPhone] = useState(value);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  // Get validation pattern and example for current country
  const countryValidation = VALIDATION_RULES.phoneRegexPatterns[country.code] || {
    pattern: "^\\+\\d{7,15}$", // Fallback E.164 pattern
    example: `${country.dialCode} XXXXXXXXX`,
    description: "Phone number"
  };

  useEffect(() => {
    const validatePhone = () => {
      const fullPhone = phone.startsWith(country.dialCode) ? phone : `${country.dialCode}${phone}`;
      const regex = new RegExp(countryValidation.pattern);
      const valid = regex.test(fullPhone.replace(/\s/g, ''));
      
      setIsValid(valid);
      onPhoneChange(fullPhone, valid);
    };

    if (phone) {
      validatePhone();
    } else {
      setIsValid(false);
      onPhoneChange("", false);
    }
  }, [phone, country, onPhoneChange, countryValidation.pattern]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Remove any non-digit characters except spaces and + (for copy-paste handling)
    const cleaned = input.replace(/[^\d\s+]/g, '');
    
    // If user pastes a number starting with dial code, remove the dial code prefix
    let processedInput = cleaned;
    if (cleaned.startsWith(country.dialCode)) {
      processedInput = cleaned.substring(country.dialCode.length);
    } else if (cleaned.startsWith(`+${country.dialCode.substring(1)}`)) {
      processedInput = cleaned.substring(country.dialCode.length);
    }
    
    setPhone(processedInput);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const getInputStatus = () => {
    if (!touched) return "default";
    if (!phone) return "default";
    return isValid ? "success" : "error";
  };

  const status = getInputStatus();

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span className="font-mono text-sm">{country.dialCode}</span>
        </div>
        <Input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handleBlur}
          placeholder={placeholder || countryValidation.example.replace(country.dialCode, '').trim()}
          className={cn(
            "h-12 pl-20 bg-input/50 border-input-border backdrop-blur-sm",
            "hover:bg-input/70 hover:border-accent/50 hover:shadow-glow-accent/20",
            "focus:ring-2 focus:ring-accent focus:border-accent",
            "transition-all duration-200",
            status === "error" && touched && "border-destructive focus:ring-destructive",
            status === "success" && "border-accent focus:ring-accent",
            className
          )}
          aria-invalid={status === "error"}
          aria-describedby={`phone-help-${country.code}`}
        />
      </div>
      
      {/* Help text and validation */}
      <div className="space-y-1">
        <p 
          id={`phone-help-${country.code}`}
          className="text-xs text-muted-foreground"
        >
          Format: {countryValidation.example}
        </p>
        {touched && !isValid && phone && (
          <p className="text-xs text-destructive">
            Please enter a valid {countryValidation.description}
          </p>
        )}
        {touched && isValid && (
          <p className="text-xs text-accent">
            ✓ Valid phone number
          </p>
        )}
      </div>
    </div>
  );
}