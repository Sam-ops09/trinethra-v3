import React from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import { FaShieldAlt, FaUserLock, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/**
 * Responsive + Cross‑browser About page
 * - Eliminates fixed heights; uses aspect‑ratio boxes
 * - Safer text wrapping (balance → pretty fallback)
 * - Grid uses 12‑col layout at ≥lg with min-w-0 to avoid overflow
 * - Animations respect prefers-reduced-motion
 * - Conservative viewport triggers to avoid Safari intersection issues
 */

export default function About() {
    const shouldReduceMotion = useReducedMotion();

    const fadeInUp = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    } as const;

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.16 },
        },
    } as const;

    const specificationData = [
        { label: "Temperature Range", value: "-40°C to +85°C" },
        { label: "Impact Resistance", value: "100G operational" },
        { label: "EMI Protection", value: "MIL-STD-461F" },
        { label: "Vibration Profile", value: "MIL-STD-810G" },
    ];

    return (
        <Layout
            title="Our Mission | Defense Solutions | TRINETHRA DEFENTECH"
            description="Defending freedom through innovation with mission-critical reliability and security clearance certified solutions."
            pageType="about"
        >
            {/* Section wrapper */}
            <section className="bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20" aria-labelledby="about-heading">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-x-hidden">
                    {/* Intro */}
                    <motion.div
                        className="text-center mb-10 sm:mb-12 lg:mb-16"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.h1
                            id="about-heading"
                            className="font-condensed font-bold mb-4 text-navy leading-tight [text-wrap:balance] sm:[text-wrap:pretty] text-[clamp(1.75rem,6vw,2.5rem)] sm:text-[clamp(2rem,4.5vw,3rem)] lg:text-5xl"
                            variants={fadeInUp}
                        >
                            Defending Freedom Through Innovation
                        </motion.h1>
                        <motion.p
                            className="text-base sm:text-lg text-charcoal/80 max-w-3xl mx-auto [text-wrap:pretty]"
                            variants={fadeInUp}
                        >
                            Our mission is to protect personnel and infrastructure through advanced defense technology solutions that
                            deliver uncompromising reliability in mission-critical applications.
                        </motion.p>
                    </motion.div>

                    {/* Content grid */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        {/* Left card */}
                        <motion.div
                            variants={fadeInUp}
                            className="min-w-0 lg:col-span-6 bg-white rounded-xl p-5 sm:p-7 lg:p-8 shadow-sm border border-black/5"
                        >
                            <div className="bg-forest/10 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5">
                                <FaShieldAlt className="text-xl sm:text-2xl text-forest" />
                            </div>
                            <h2 className="font-condensed font-bold mb-3 text-navy [text-wrap:balance] leading-snug text-[clamp(1.125rem,3.8vw,1.5rem)] sm:text-[clamp(1.25rem,2.8vw,1.875rem)] lg:text-3xl">
                                Mission Critical Reliability
                            </h2>
                            <p className="text-charcoal/80 mb-3 sm:mb-4 [text-wrap:pretty]">
                                Our engineering standards exceed industry requirements to withstand high-G impacts, electromagnetic
                                interference, temperature extremes from -40°C to +85°C, and chemical exposure.
                            </p>
                            <p className="text-charcoal/80 [text-wrap:pretty]">
                                Every component undergoes rigorous testing in simulated combat environments to ensure operational
                                reliability when failure is not an option.
                            </p>

                            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                                {specificationData.map((spec, index) => (
                                    <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                                        <div className="font-bold text-navy text-xs sm:text-sm tracking-wide uppercase mb-1">
                                            {spec.label}
                                        </div>
                                        <div className="text-charcoal/80 text-xs sm:text-sm">{spec.value}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right card */}
                        <motion.div
                            variants={fadeInUp}
                            className="min-w-0 lg:col-span-6 bg-white rounded-xl p-5 sm:p-7 lg:p-8 shadow-sm border border-black/5"
                        >
                            <div className="bg-forest/10 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5">
                                <FaUserLock className="text-xl sm:text-2xl text-forest" />
                            </div>
                            <h2 className="font-condensed font-bold mb-3 text-navy [text-wrap:balance] leading-snug text-[clamp(1.125rem,3.8vw,1.5rem)] sm:text-[clamp(1.25rem,2.8vw,1.875rem)] lg:text-3xl">
                                Security Clearance Certified
                            </h2>
                            <p className="text-charcoal/80 mb-3 sm:mb-4 [text-wrap:pretty]">
                                Our team holds top-level security clearances required for defense and intelligence operations, with
                                stringent confidentiality protocols that exceed government requirements.
                            </p>
                            <p className="text-charcoal/80 [text-wrap:pretty]">
                                All manufacturing occurs in secure facilities with compartmentalized information access and regular
                                counter-intelligence assessment.
                            </p>

                            {/* Media area: aspect box instead of fixed height */}
                            <div className="mt-6 sm:mt-8">
                                <div className="relative w-full rounded-lg border border-navy/10 shadow-inner bg-navy/5 overflow-hidden">
                                    <div className="aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] flex items-center justify-center">
                                        <p className="text-navy font-medium text-xs sm:text-sm px-4 text-center">
                                            Secure defense facility image
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        className="mt-10 sm:mt-12 lg:mt-14 flex justify-center"
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/Contact">
                            {/* If your Button supports `asChild`, prefer wrapping Link inside Button with asChild. */}
                            <Button className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-6 sm:px-8 rounded shadow-lg transition-all duration-300 inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600">
                                Contact Our Team <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}

/*
  🛠 Notes
  - Replaced fixed heights with aspect-ratio utility to avoid cropping across browsers.
  - Added min-w-0 on grid children to prevent overflow/ellipsis issues in Firefox/Safari.
  - Used [text-wrap:balance] with pretty fallback for cross-browser safe line breaking.
  - Motion respects prefers-reduced-motion and avoids negative viewport margins (Safari quirk).
  - Spacing uses responsive py/px and max-w-7xl container width for consistent line length.
*/
