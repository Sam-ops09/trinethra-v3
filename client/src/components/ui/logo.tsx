import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "light", size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-forest";
  const bgColor = variant === "light" ? "bg-cream" : "bg-forest";
  
  // Size classes
  const containerSize = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  }[size];
  
  const textSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  }[size];
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`${containerSize} ${bgColor} flex items-center justify-center rounded-sm`}>
        <div className={`${textColor} font-bold ${textSize} font-condensed`}>TD</div>
      </div>
      <span className={`font-condensed font-bold ${textSize} tracking-wide ${variant === "light" ? "text-cream" : "text-charcoal"}`}>
        TRINETHRA DEFENTECH
      </span>
    </div>
  );
}
