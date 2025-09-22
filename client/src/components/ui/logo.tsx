
import React from "react";
import tridentLogo from "../../assets/trident.svg";

interface LogoProps {
    variant?: "light" | "dark";
    size?: "sm" | "md" | "lg";
    showText?: boolean;
}

export function Logo({ variant = "light", size = "md", showText = true }: LogoProps) {
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

    const imageSize = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10"
    }[size];

    return (
        <div className="flex items-center space-x-2">
            <div className={`${containerSize} ${bgColor} flex items-center justify-center rounded-sm overflow-hidden`}>
                <img
                    src={tridentLogo}
                    alt="Trinethra Defentech Logo"
                    className={`${imageSize} object-contain`}
                />
            </div>
            {showText && (
                <span className={`font-condensed font-bold ${textSize} tracking-wide ${variant === "light" ? "text-cream" : "text-charcoal"}`}>
          TRINETHRA DEFENTECH
        </span>
            )}
        </div>
    );
}