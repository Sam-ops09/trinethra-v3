"use client";

import React, { useState, useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaTimes, FaShieldAlt } from "react-icons/fa";

interface ProductDisplayProps {
    className?: string;
}

/* ----------------------------------------------------------------------------
   DATA
----------------------------------------------------------------------------- */
const productData = [
    {
        id: 1,
        image: "/assets/products/edge-server.jpg",
        title: "Advanced Tactical Computing",
        description:
            "Ruggedized edge servers delivering real-time processing in demanding environments",
        specs: ["MIL-STD-810H Certified", "IP67 Rating", "EMI/EMC Compliant"],
        readiness: "98.7",
        category: "TACTICAL EDGE",
        accentColor: "#14b8a6",
    },
    {
        id: 2,
        image: "/assets/carousel1.jpg",
        title: "Defense Communication Systems",
        description:
            "Secure, high-bandwidth communication platforms for mission-critical operations",
        specs: ["FIPS 140-2 Encryption", "Multi-band Support", "Mesh Networking"],
        readiness: "99.9",
        category: "COMMUNICATIONS",
        accentColor: "#10b981",
    },
    {
        id: 3,
        image: "/assets/products/panel-pc.png",
        title: "Aerospace Integration",
        description: "Lightweight, high-performance systems designed for aerospace applications",
        specs: ["DO-178C Compliant", "Vibration Resistant", "Temperature Hardened"],
        readiness: "100",
        category: "AEROSPACE",
        accentColor: "#06b6d4",
    },
    {
        id: 4,
        image: "/assets/products/panel-pc.png",
        title: "Aerospace Integration",
        description: "Lightweight, high-performance systems designed for aerospace applications",
        specs: ["DO-178C Compliant", "Vibration Resistant", "Temperature Hardened"],
        readiness: "100",
        category: "AEROSPACE",
        accentColor: "#06b6d4",
    },
];

/* ----------------------------------------------------------------------------
   IMAGE TILE (RESPONSIVE + MOTION-SAFE)
----------------------------------------------------------------------------- */
function ImageTile({
                       product,
                       index,
                       onOpen,
                   }: {
    product: (typeof productData)[number];
    index: number;
    onOpen: () => void;
}) {
    const prefersReduced = useReducedMotion();
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const rotateX = useSpring(
        prefersReduced ? 0 : useTransform(my, [-0.5, 0.5], [6, -6]),
        { stiffness: 100, damping: 15 }
    );
    const rotateY = useSpring(
        prefersReduced ? 0 : useTransform(mx, [-0.5, 0.5], [-6, 6]),
        { stiffness: 100, damping: 15 }
    );

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReduced || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mx.set(x);
        my.set(y);
    };

    const handleLeave = () => {
        mx.set(0);
        my.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            onMouseMove={handleMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleLeave}
            onClick={onOpen}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full overflow-hidden rounded-2xl border border-[#0f172a] bg-slate-950/5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-teal-400/45 focus:outline-none focus:ring-2 focus:ring-teal-400/80"
        >
            {/* force aspect so all look uniform across breakpoints */}
            <div className="aspect-[4/3] w-full min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
                {/* IMAGE */}
                <motion.img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                    animate={{ scale: isHovered && !prefersReduced ? 1.06 : 1 }}
                    transition={{ duration: 0.4 }}
                    loading="lazy"
                    decoding="async"
                />

                {/* TOP BAR (CATEGORY + READINESS) */}
                <div className="pointer-events-none absolute top-2 left-2 flex gap-1 sm:top-3 sm:left-3">
                    <div
                        className="rounded-md bg-slate-950/65 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm sm:text-[0.6rem]"
                        style={{ transform: "translateZ(15px)" }}
                    >
                        {product.category}
                    </div>
                </div>
                <div
                    className="pointer-events-none absolute top-2 right-2 rounded-md bg-slate-950/65 px-2 py-1 text-[0.55rem] font-bold text-white/90 backdrop-blur-sm sm:top-3 sm:right-3 sm:text-[0.6rem]"
                    style={{ transform: "translateZ(15px)" }}
                >
                    <span style={{ color: product.accentColor }}>{product.readiness}%</span>
                </div>

                {/* BOTTOM HOVER LABEL — small, non-intrusive */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 12,
                    }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none absolute inset-x-2 bottom-2 rounded-xl bg-slate-950/55 px-3 py-2 text-xs text-white/90 backdrop-blur-md"
                    style={{ transform: "translateZ(15px)" }}
                >
                    <div className="flex items-center justify-between gap-3">
                        <p className="line-clamp-1 text-[0.6rem] font-medium tracking-wide sm:text-[0.65rem]">
                            {product.title}
                        </p>
                        <span className="text-[0.55rem] uppercase text-teal-200/90">View</span>
                    </div>
                </motion.div>

                {/* SHINE — desktop only, motion safe */}
                {!prefersReduced && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 hidden md:block"
                        style={{
                            background: `radial-gradient(circle at ${(mx.get() + 0.5) * 100}% ${
                                (my.get() + 0.5) * 100
                            }%, rgba(255,255,255,0.28) 0%, transparent 55%)`,
                        }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </div>
        </motion.div>
    );
}

/* ----------------------------------------------------------------------------
   MODAL (SCROLLABLE, MOBILE-SAFE)
----------------------------------------------------------------------------- */
function ProductModal({
                          product,
                          onClose,
                      }: {
    product: (typeof productData)[number] | null;
    onClose: () => void;
}) {
    const prefersReduced = useReducedMotion();
    if (!product) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 p-3 sm:p-4 md:p-6 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: prefersReduced ? 1 : 0.94, opacity: 0, y: prefersReduced ? 0 : 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: prefersReduced ? 0.2 : 0.45 }}
                className="relative flex max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={product.title}
            >
                {/* close (44x44 min) */}
                <button
                    onClick={onClose}
                    className="group absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-lg transition-all duration-200 hover:bg-slate-100 sm:right-4 sm:top-4"
                    aria-label="Close"
                >
                    <FaTimes className="text-base text-slate-700 transition-transform duration-200 group-hover:rotate-90" />
                </button>

                {/* scrollable container */}
                <div className="grid max-h-[92vh] w-full grid-cols-1 overflow-y-auto md:grid-cols-5">
                    {/* image side */}
                    <div className="relative h-52 min-h-[210px] md:col-span-2 md:h-auto md:min-h-[420px]">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />

                        {/* floating status */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="rounded-xl bg-white/95 p-3 backdrop-blur-md shadow-xl">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-[0.6rem] uppercase tracking-[0.14em] text-slate-500">
                                            System Status
                                        </p>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                            <span className="text-xs font-semibold text-slate-900">OPERATIONAL</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className="text-2xl font-bold leading-none"
                                            style={{ color: product.accentColor }}
                                        >
                                            {product.readiness}%
                                        </p>
                                        <p className="text-[0.6rem] text-slate-500">Readiness</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* content side */}
                    <div className="flex flex-col gap-4 p-6 xs:p-7 sm:p-8 md:col-span-3 md:p-10 lg:p-12">
                        {/* badge */}
                        <div className="inline-flex items-center gap-2 self-start rounded-lg bg-slate-100 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-slate-800 sm:text-xs">
                            <FaShieldAlt className="text-xs" style={{ color: product.accentColor }} />
                            {product.category}
                        </div>

                        <h3 className="text-xl font-bold leading-tight text-slate-900 xs:text-2xl sm:text-3xl md:text-4xl">
                            {product.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                            {product.description}
                        </p>

                        <div>
                            <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
                                Technical Specifications
                            </p>
                            <div className="grid gap-2 sm:gap-3">
                                {product.specs.map((spec, idx) => (
                                    <motion.div
                                        key={spec}
                                        initial={{ opacity: 0, x: prefersReduced ? 0 : -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + idx * 0.05 }}
                                        className="flex items-center gap-3 rounded-lg bg-slate-50 p-2.5 sm:rounded-xl sm:p-3"
                                    >
                                        <div
                                            className="flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10"
                                            style={{ backgroundColor: `${product.accentColor}22` }}
                                        >
                                            <FaCheckCircle className="text-sm" style={{ color: product.accentColor }} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-800">{spec}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                            <a
                                href="/contact"
                                className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg sm:rounded-xl sm:py-3.5"
                                style={{ backgroundColor: product.accentColor }}
                            >
                                Request Information
                                <FaArrowRight className="text-xs" />
                            </a>
                            <button
                                className="w-full rounded-lg border-2 px-5 py-3 text-sm font-semibold transition-all hover:bg-slate-100 sm:rounded-xl sm:py-3.5"
                                style={{ borderColor: "product.accentColor", color: product.accentColor }}
                            >
                                Download Specs
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ----------------------------------------------------------------------------
   EXPORTED COMPONENT
   - 1 col: phones
   - 2 col: small tablets / big phones
   - 3 col: normal desktops
   - 4 col: wide monitors
----------------------------------------------------------------------------- */
export function HeroCarousel({ className = "" }: ProductDisplayProps) {
    const [activeProduct, setActiveProduct] = useState<(typeof productData)[number] | null>(null);

    return (
        <div className={`relative ${className}`}>
            {/* responsive container */}
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {productData.map((product, index) => (
                    <ImageTile
                        key={product.id}
                        product={product}
                        index={index}
                        onOpen={() => setActiveProduct(product)}
                    />
                ))}
            </div>

            {/* modal */}
            {activeProduct && (
                <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
            )}
        </div>
    );
}