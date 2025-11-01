import React from "react";

export function MadeInIndia() {
    return (
        <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 via-white to-green-600 w-fit hover:scale-105 transition-transform duration-300">
            <div className="relative flex items-center gap-2">
                {/* Ashoka Chakra rendered via SVG for precise proportions */}
                <svg
                    className="w-5 h-5"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer ring */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="white"
                        stroke="hsl(218 48% 21%)"
                        strokeWidth="6"
                    />
                    {/* 24 spokes */}
                    {Array.from({ length: 24 }).map((_, i) => (
                        <line
                            key={i}
                            x1="50"
                            y1="50"
                            x2="50"
                            y2="5"
                            stroke="hsl(218 48% 21%)"
                            strokeWidth="2.4"
                            transform={`rotate(${i * 15} 50 50)`}
                        />
                    ))}
                    {/* Central hub */}
                    <circle cx="50" cy="50" r="5" fill="hsl(218 48% 21%)" />
                </svg>

                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
          Made in India
        </span>
            </div>
        </div>
    );
}
