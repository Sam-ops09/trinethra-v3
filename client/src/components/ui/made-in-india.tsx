import React from "react";

export function MadeInIndia() {
    return (
        <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 via-white to-green-600 w-fit relative overflow-hidden group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center relative">
                    {/* 24 spokes of Ashok Chakra */}
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-4 bg-blue-900"
                            style={{
                                left: '50%',
                                top: '50%',
                                transformOrigin: 'center',
                                transform: `translate(-50%, -50%) rotate(${i * 15}deg) translateY(-1px)`
                            }}
                        />
                    ))}
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-900"></div>
                </div>
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">Made in India</span>
            </div>
        </div>
    );
}