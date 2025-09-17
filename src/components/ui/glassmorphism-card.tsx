import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  enableTilt?: boolean;
  className?: string;
}

const GlassmorphismCard = React.forwardRef<HTMLDivElement, GlassmorphismCardProps>(
  ({ className, children, enableTilt = true, ...props }, ref) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableTilt || isMobile || !cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / centerY * -15;
      const tiltY = (x - centerX) / centerX * 15;

      setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          // Base glassmorphism styles
          "relative overflow-hidden rounded-xl border border-card-border",
          "bg-gradient-card backdrop-blur-glass",
          "shadow-glass",
          // 3D transform styles
          "transform-gpu transition-all duration-300 ease-out",
          "hover:shadow-card hover:shadow-glow-accent/10",
          className
        )}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-soft via-transparent to-primary/5 opacity-50" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-75">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-glow-pulse" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    );
  }
);

GlassmorphismCard.displayName = "GlassmorphismCard";

export { GlassmorphismCard };