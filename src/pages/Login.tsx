import React, { useState } from "react";
import { MapPin, Shield, Info, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card";
import { CountrySelector } from "@/components/ui/country-selector";
import { PhoneInput } from "@/components/ui/phone-input";
import { DigitalIdInput } from "@/components/ui/digital-id-input";
import { toast } from "@/hooks/use-toast";
import { CountryData } from "@/lib/countries-data";
import heroGlobe from "@/assets/hero-globe.jpg";
import { cn } from "@/lib/utils";

export default function Login() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData>({
    code: "IN",
    name: "India", 
    dialCode: "+91",
    flag: "🇮🇳"
  });
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [digitalId, setDigitalId] = useState("");
  const [shareLocation, setShareLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryChange = (country: CountryData) => {
    setSelectedCountry(country);
    // Reset phone when country changes
    setPhone("");
    setIsPhoneValid(false);
  };

  const handlePhoneChange = (newPhone: string, valid: boolean) => {
    setPhone(newPhone);
    setIsPhoneValid(valid);
  };

  const handleSendOtp = async () => {
    if (!isPhoneValid) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number for the selected country.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "OTP Sent Successfully! ✓",
        description: `Verification code sent to ${phone}`,
        className: "border-accent bg-accent-soft text-foreground",
      });
      
    } catch (error) {
      toast({
        title: "Failed to Send OTP",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = () => {
    toast({
      title: "Email Login",
      description: "Email login feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float" style={{animationDelay: "1s"}} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-glow/10 rounded-full blur-lg animate-glow-pulse" />
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen lg:min-h-[80vh]">
          
          {/* Left side - Login Form */}
          <div className="flex flex-col justify-center space-y-8">
            
            {/* Header */}
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2 rounded-lg bg-gradient-accent shadow-glow-accent">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                  TourGuard
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                Your global travel safety companion. Secure authentication for safer journeys.
              </p>
            </div>

            {/* Login Form Card */}
            <GlassmorphismCard className="p-8 space-y-6 max-w-md mx-auto lg:mx-0 w-full">
              
              {/* Country Selector */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Select Country
                </Label>
                <CountrySelector
                  value={selectedCountry.code}
                  onCountryChange={handleCountryChange}
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone Number</Label>
                <PhoneInput
                  country={selectedCountry}
                  onPhoneChange={handlePhoneChange}
                  value={phone}
                />
              </div>

              {/* Digital ID Input (conditional) */}
              <DigitalIdInput
                country={selectedCountry}
                onIdChange={setDigitalId}
                value={digitalId}
              />

              {/* Location Sharing Consent */}
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent-soft border border-accent/20">
                <Checkbox
                  id="share-location"
                  checked={shareLocation}
                  onCheckedChange={(checked) => setShareLocation(checked === true)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <Label 
                    htmlFor="share-location"
                    className="text-sm font-medium cursor-pointer flex items-center gap-2"
                  >
                    Share live location for safety features
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enable real-time location sharing for emergency assistance and geo-fence safety alerts.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleSendOtp}
                  disabled={!isPhoneValid || isLoading}
                  className="w-full h-12"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Sending OTP...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Send OTP
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleEmailLogin}
                  className="w-full h-12"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Login with Email
                </Button>
              </div>

              {/* Terms and Privacy */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-accent hover:underline font-medium">
                    Terms of Service
                  </a>
                  {" "}and{" "}
                  <a href="#" className="text-accent hover:underline font-medium">
                    Privacy Policy
                  </a>
                </p>
              </div>

            </GlassmorphismCard>
          </div>

          {/* Right side - 3D Hero Globe */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative">
              {/* Main globe image */}
              <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-glow-accent animate-float">
                <img
                  src={heroGlobe}
                  alt="3D Globe with Tourist Hotspots and Safety Geo-fence Rings"
                  className="w-full h-full object-cover animate-spin-globe"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
                
                {/* Animated geo-fence rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-full border-2 border-accent/30 rounded-full animate-glow-pulse" />
                  <div className="absolute w-4/5 h-4/5 border border-accent/20 rounded-full animate-glow-pulse" style={{animationDelay: "0.5s"}} />
                  <div className="absolute w-3/5 h-3/5 border border-accent/10 rounded-full animate-glow-pulse" style={{animationDelay: "1s"}} />
                </div>
              </div>

              {/* Floating safety indicators */}
              <div className="absolute -top-4 -right-4 p-2 bg-gradient-accent rounded-full shadow-glow-accent animate-float">
                <Shield className="h-6 w-6 text-white" />
              </div>
              
              <div className="absolute -bottom-2 -left-2 p-2 bg-gradient-primary rounded-full shadow-glow-primary animate-float" style={{animationDelay: "1.5s"}}>
                <MapPin className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-glow-pulse" />
              <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-glow-pulse" style={{animationDelay: "2s"}} />
              <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-accent-glow rounded-full animate-glow-pulse" style={{animationDelay: "3s"}} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}