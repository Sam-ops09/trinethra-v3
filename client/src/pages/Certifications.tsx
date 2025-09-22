import React from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FaBrain, FaNetworkWired, FaCodeBranch } from "react-icons/fa";

/**
 * Certifications — Responsive & Cross‑browser safe
 * - Adds safe top padding for fixed header overlap on small screens
 * - Clamps heading sizes for 320–390 px widths (iPhone SE, older Android)
 * - Replaces fragile viewport margins with intersection `amount`
 * - Uses min-w-0 to prevent overflow in Firefox/Safari
 * - Avoids xs horizontal scroll via overflow-x-hidden on container
 */

export default function Certifications() {
    const prefersReduced = useReducedMotion();

    const fadeInUp = {
        hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    } as const;

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: prefersReduced ? 0 : 0.16 },
        },
    } as const;

    const certifications = [
        {
            icon: <FaBrain className="w-6 h-6" />,
            title: "AI Research Excellence",
            organization: "OpenAI Foundation",
            date: "March 2024",
            description:
                "Advanced certification in tactical artificial intelligence applications for defense systems.",
        },
        {
            icon: <FaNetworkWired className="w-6 h-6" />,
            title: "Neural Network Architecture",
            organization: "Deep Learning Institute",
            date: "January 2024",
            description:
                "Specialized accreditation in developing hardened neural networks for mission-critical applications.",
        },
        {
            icon: <FaCodeBranch className="w-6 h-6" />,
            title: "Open Source Contribution",
            organization: "Global OSS Alliance",
            date: "Ongoing",
            description:
                "Recognition for contributions to secure, hardened open-source frameworks for defense applications.",
        },
    ];

    const industryCertifications = [
        { title: "ISO 9001:2015", description: "Quality Management System" },
        { title: "AS9100D", description: "Aerospace Quality Standard" },
        { title: "ISO/IEC 27001", description: "Information Security Management" },
        { title: "CMMC Level 5", description: "Cybersecurity Maturity Model" },
        { title: "DO-178C", description: "Avionics Software Certification" },
        { title: "MIL-STD Compliance", description: "Multiple Standards Verified" },
    ];

    return (
        <Layout
            title="Professional Certifications | TRINETHRA DEFENTECH"
            description="Our comprehensive professional qualifications and industry certifications ensure we meet the highest standards for defense technology development."
            pageType="certifications"
        >
            <section
                className="bg-white pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20"
                aria-labelledby="certifications-heading"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 overflow-x-hidden">
                    <div className="max-w-6xl mx-auto">
                        {/* Intro */}
                        <motion.div
                            className="text-center mb-10 sm:mb-12 md:mb-16"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.h1
                                id="certifications-heading"
                                className="font-condensed font-bold mb-4 text-navy leading-tight [text-wrap:balance] sm:[text-wrap:pretty] text-[clamp(1.75rem,6vw,2.5rem)] sm:text-[clamp(2rem,4.5vw,3rem)] md:text-[clamp(2.25rem,3.5vw,3.25rem)]"
                                variants={fadeInUp}
                            >
                                Certifications
                            </motion.h1>
                            <motion.p
                                className="text-base sm:text-lg text-charcoal/80 max-w-3xl mx-auto [text-wrap:pretty]"
                                variants={fadeInUp}
                            >
                                Our comprehensive professional qualifications and industry certifications ensure we meet the highest
                                standards for defense technology development.
                            </motion.p>
                        </motion.div>

                        {/* Featured certifications */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                            variants={staggerContainer}
                        >
                            {certifications.map((cert, index) => (
                                <motion.div key={index} variants={fadeInUp} className="min-w-0">
                                    <Card className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 sm:p-6 h-full transition-shadow hover:shadow-md focus-within:shadow-md">
                                        <div className="bg-teal/10 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-5 sm:mb-6 text-teal">
                                            {cert.icon}
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-condensed font-bold mb-2.5 sm:mb-3 text-navy [text-wrap:balance]">
                                            {cert.title}
                                        </h3>
                                        <p className="text-charcoal/80 mb-1.5 text-sm font-medium">{cert.organization}</p>
                                        <p className="text-charcoal/60 text-xs mb-3.5 tracking-wide uppercase">{cert.date}</p>
                                        <p className="text-charcoal/80 text-sm leading-relaxed [text-wrap:pretty]">{cert.description}</p>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Industry certifications grid */}
                        <motion.div
                            className="bg-gray-50 rounded-xl p-6 sm:p-8 md:p-10 shadow-inner border border-black/5"
                            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-condensed font-bold mb-5 sm:mb-6 text-navy leading-snug [text-wrap:balance] text-[clamp(1.125rem,3.8vw,1.5rem)] sm:text-[clamp(1.25rem,2.8vw,1.875rem)] md:text-3xl">
                                Industry Certifications
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                {industryCertifications.map((cert, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 min-w-0">
                                        <div className="font-bold text-navy text-xs sm:text-sm mb-1 tracking-wide uppercase">
                                            {cert.title}
                                        </div>
                                        <div className="text-charcoal/80 text-sm">{cert.description}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

/*
  ✅ If your header height differs, tweak base padding:
     - Change pt-24 → pt-28/pt-32 or expose a CSS var: pt-[var(--header-h,8rem)]
  ✅ Anchor comfort: add scroll-pt-28 to the <section> if you use in-page links.
  ✅ If any custom tokens (text-navy, text-charcoal, bg-teal) are missing, swap for Tailwind defaults.
*/
