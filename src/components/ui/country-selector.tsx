import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CountryData, COUNTRIES_SAMPLE } from "@/lib/countries-data";

interface CountrySelectorProps {
  value?: string;
  onCountryChange: (country: CountryData) => void;
  defaultCountry?: string;
  className?: string;
}

export function CountrySelector({
  value,
  onCountryChange,
  defaultCountry = "IN",
  className,
}: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(
    () => COUNTRIES_SAMPLE.find(c => c.code === (value || defaultCountry)) || COUNTRIES_SAMPLE[2]
  );

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountry(country);
    onCountryChange(country);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select country"
          className={cn(
            "h-12 justify-between bg-input/50 border-input-border backdrop-blur-sm",
            "hover:bg-input/70 hover:border-accent/50 hover:shadow-glow-accent/20",
            "focus:ring-2 focus:ring-accent focus:border-accent",
            "transition-all duration-200",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label={`${selectedCountry.name} flag`}>
              {selectedCountry.flag}
            </span>
            <span className="hidden sm:inline font-medium">{selectedCountry.name}</span>
            <span className="text-muted-foreground font-mono text-sm">
              {selectedCountry.dialCode}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-80 p-0 bg-popover/90 backdrop-blur-glass border-card-border",
          "shadow-glass"
        )}
        align="start"
      >
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search countries..."
            className="h-12 bg-transparent border-none focus:ring-0"
          />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {COUNTRIES_SAMPLE.map((country) => (
              <CommandItem
                key={country.code}
                value={`${country.name} ${country.dialCode}`}
                onSelect={() => handleCountrySelect(country)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 cursor-pointer",
                  "hover:bg-accent-soft focus:bg-accent-soft",
                  "transition-colors duration-150"
                )}
              >
                <span className="text-xl" role="img" aria-label={`${country.name} flag`}>
                  {country.flag}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{country.name}</div>
                </div>
                <div className="text-muted-foreground font-mono text-sm">
                  {country.dialCode}
                </div>
                <Check
                  className={cn(
                    "ml-2 h-4 w-4",
                    selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}