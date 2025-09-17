import React, { useState, useEffect } from "react";
import { CreditCard, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CountryData } from "@/lib/countries-data";
import { VALIDATION_RULES } from "@/lib/tourguard-spec";

interface DigitalIdInputProps {
  country: CountryData;
  onIdChange: (id: string) => void;
  value?: string;
  className?: string;
}

export function DigitalIdInput({
  country,
  onIdChange,
  value = "",
  className,
}: DigitalIdInputProps) {
  const [digitalId, setDigitalId] = useState(value);
  const [touched, setTouched] = useState(false);

  // Hide for India as specified in requirements
  const shouldHide = country.code === "IN";

  // Get format information for current country
  const countryFormat = VALIDATION_RULES.digitalIdFormats[country.code] || {
    label: "Digital ID / Govt ID (optional)",
    placeholder: "Enter your government ID",
    helpText: "Government-issued digital ID (optional)"
  };

  useEffect(() => {
    onIdChange(digitalId);
  }, [digitalId, onIdChange]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDigitalId(e.target.value);
    if (!touched) setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  // Don't render if country is India
  if (shouldHide) return null;

  return (
    <div className={cn("space-y-3 animate-fade-in", className)}>
      <div className="flex items-center gap-2">
        <Label 
          htmlFor={`digital-id-${country.code}`}
          className="text-sm font-medium text-foreground flex items-center gap-2"
        >
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          {countryFormat.label}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-accent transition-colors cursor-help" />
            </TooltipTrigger>
            <TooltipContent 
              side="top"
              className="bg-popover/90 backdrop-blur-glass border-card-border text-sm max-w-xs"
            >
              <p>{countryFormat.helpText}</p>
              <p className="text-xs text-muted-foreground mt-1">
                This information helps us verify your identity for enhanced safety features.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="space-y-2">
        <Input
          id={`digital-id-${country.code}`}
          type="text"
          value={digitalId}
          onChange={handleIdChange}
          onBlur={handleBlur}
          placeholder={countryFormat.placeholder}
          className={cn(
            "h-12 bg-input/50 border-input-border backdrop-blur-sm",
            "hover:bg-input/70 hover:border-accent/50 hover:shadow-glow-accent/20",
            "focus:ring-2 focus:ring-accent focus:border-accent",
            "transition-all duration-200"
          )}
          aria-describedby={`digital-id-help-${country.code}`}
        />
        
        <p 
          id={`digital-id-help-${country.code}`}
          className="text-xs text-muted-foreground"
        >
          {countryFormat.helpText}
        </p>
      </div>
    </div>
  );
}