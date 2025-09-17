import React, { useState } from "react";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Users, Plane, Shield, Globe } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TripDetails = () => {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState(1);
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Trip details saved! Setting up your safety profile...");
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-glow/5 rounded-full blur-2xl animate-glow-pulse" />
      </div>

      {/* 3D Hero Globe - Right Side */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
        <div className="relative w-80 h-80">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-spin-globe" />
          <div className="absolute inset-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full animate-float">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img 
                src="/src/assets/hero-globe.jpg" 
                alt="TourGuard Global Safety Network" 
                className="w-full h-full object-cover animate-spin-globe opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/10 to-primary/20" />
              
              {/* Floating Safety Indicators */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-accent rounded-full animate-glow-pulse shadow-glow-accent" />
              <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-primary-glow rounded-full animate-glow-pulse shadow-glow-primary" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-accent-glow rounded-full animate-glow-pulse shadow-glow-accent" style={{ animationDelay: "1s" }} />
            </div>
          </div>
          
          {/* Orbiting Safety Rings */}
          <div className="absolute inset-0 border-2 border-accent/20 rounded-full animate-spin-globe" style={{ animationDuration: "30s" }} />
          <div className="absolute inset-8 border border-primary/20 rounded-full animate-spin-globe" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="w-full max-w-2xl mx-auto lg:mr-96">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-glow-primary">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Plan Your Trip
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Share your travel details to activate TourGuard's safety features
            </p>
          </div>

          <GlassmorphismCard className="p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2 text-card-foreground">
                  <MapPin className="w-4 h-4 text-accent" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="Where are you traveling to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-input border-input-border text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20"
                  required
                />
              </div>

              {/* Travel Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-card-foreground">Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-input border-input-border hover:bg-input hover:border-accent",
                          !departureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                        {departureDate ? format(departureDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-card-border">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-input border-input-border hover:bg-input hover:border-accent",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                        {returnDate ? format(returnDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-card-border">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Number of Travelers */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-card-foreground">
                  <Users className="w-4 h-4 text-accent" />
                  Number of Travelers
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-10 h-10 bg-input border-input-border hover:bg-accent hover:text-accent-foreground"
                  >
                    -
                  </Button>
                  <Badge variant="secondary" className="px-4 py-2 text-lg bg-secondary text-secondary-foreground">
                    {travelers}
                  </Badge>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTravelers(travelers + 1)}
                    className="w-10 h-10 bg-input border-input-border hover:bg-accent hover:text-accent-foreground"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Trip Type */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-card-foreground">
                  <Globe className="w-4 h-4 text-accent" />
                  Trip Type
                </Label>
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger className="bg-input border-input-border text-card-foreground focus:border-accent focus:ring-accent/20">
                    <SelectValue placeholder="Select trip type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-card-border">
                    <SelectItem value="business">Business Travel</SelectItem>
                    <SelectItem value="leisure">Leisure/Vacation</SelectItem>
                    <SelectItem value="adventure">Adventure/Outdoor</SelectItem>
                    <SelectItem value="family">Family Trip</SelectItem>
                    <SelectItem value="solo">Solo Travel</SelectItem>
                    <SelectItem value="group">Group Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Accommodation */}
              <div className="space-y-2">
                <Label htmlFor="accommodation" className="text-card-foreground">Accommodation</Label>
                <Input
                  id="accommodation"
                  placeholder="Hotel name or address"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  className="bg-input border-input-border text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20"
                />
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <Label htmlFor="emergency" className="flex items-center gap-2 text-card-foreground">
                  <Shield className="w-4 h-4 text-accent" />
                  Emergency Contact
                </Label>
                <Input
                  id="emergency"
                  placeholder="Name and phone number"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="bg-input border-input-border text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20"
                  required
                />
              </div>

              {/* Special Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-card-foreground">Special Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Medical conditions, dietary restrictions, accessibility needs..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="bg-input border-input-border text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/20 min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-glow-primary hover:shadow-glow-primary/70 transition-all duration-300 transform hover:scale-105"
              >
                <Shield className="mr-2 h-5 w-5" />
                Activate TourGuard Protection
              </Button>
            </form>
          </GlassmorphismCard>

          {/* Safety Features Preview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center p-4 rounded-lg bg-gradient-card backdrop-blur-glass border border-card-border">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">24/7 Monitoring</h3>
              <p className="text-sm text-muted-foreground">Real-time safety tracking</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-card backdrop-blur-glass border border-card-border">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-primary-glow" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">Location-based warnings</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-card backdrop-blur-glass border border-card-border">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-1">Emergency Network</h3>
              <p className="text-sm text-muted-foreground">Instant help access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;