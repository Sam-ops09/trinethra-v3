import React from "react";
import { Layout } from "@/components/Layout";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLock, FaShieldAlt, FaClock } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Contact — Responsive & Cross‑browser safe
 * - Adds safe top padding for fixed header overlap (iPhone SE etc.)
 * - Clamps heading sizes for 320–390 px widths
 * - Removes fragile viewport margins; uses `amount` for intersection
 * - Prevents horizontal scroll via overflow-x-hidden and min-w-0 on grid children
 * - Respects prefers-reduced-motion
 */

export default function Contact() {
    const reduce = useReducedMotion();

    const fadeInUp = {
        hidden: { opacity: 0, y: reduce ? 0 : 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    } as const;

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: reduce ? 0 : 0.16 },
        },
    } as const;

    return (
        <Layout
            title="Contact Us | TRINETHRA DEFENTECH"
            description="Get in touch with our defense technology specialists to discuss your specific needs and requirements. Contact TRINETHRA DEFENTECH for secure, rugged technology solutions."
            pageType="contact"
        >
            <section
                className="bg-gray-50 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 scroll-pt-28"
                aria-labelledby="contact-heading"
            >
                <div className="section-container px-4 sm:px-6 md:px-8 overflow-x-hidden">
                    <div className="max-w-6xl mx-auto min-w-0">
                        {/* Intro */}
                        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-10 sm:mb-12 md:mb-16">
                            <motion.h1
                                id="contact-heading"
                                variants={fadeInUp}
                                className="font-condensed font-bold mb-4 text-navy leading-tight [text-wrap:balance] sm:[text-wrap:pretty] text-[clamp(1.75rem,6vw,2.5rem)] sm:text-[clamp(2rem,4.5vw,3rem)]"
                            >
                                Contact TRINETHRA DEFENTECH
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-charcoal/80 max-w-3xl mx-auto [text-wrap:pretty]">
                                Connect with our defense specialists to discuss your mission-critical solutions. All inquiries are treated with the highest level of security and confidentiality.
                            </motion.p>
                        </motion.div>

                        {/* Primary contact cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 sm:mb-14" role="list" aria-label="Primary contact methods">
                            {[
                                {
                                    icon: <FaPhone className="text-navy text-xl" />,
                                    title: "Call Us",
                                    body: "Our secure lines are available during business hours",
                                    action: (
                                        <a href="tel:+918044556677" className="font-medium text-forest hover:text-forest/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest-600">
                                            +91 80 4455 6677
                                        </a>
                                    ),
                                },
                                {
                                    icon: <FaEnvelope className="text-navy text-xl" />,
                                    title: "Email Us",
                                    body: "For secure communication and inquiries",
                                    action: (
                                        <a href="mailto:info@trinethra-defentech.com" className="font-medium text-forest hover:text-forest/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-forest-600">
                                            info@trinethra-defentech.com
                                        </a>
                                    ),
                                },
                                {
                                    icon: <FaMapMarkerAlt className="text-navy text-xl" />,
                                    title: "Visit Us",
                                    body: "Our secure headquarters location",
                                    action: (
                                        <address className="not-italic text-charcoal/80 text-sm leading-relaxed">
                                            100 Technology Drive
                                            <br />
                                            Bengaluru, Karnataka 560001
                                            <br />
                                            India
                                        </address>
                                    ),
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.45, delay: i * 0.05 }}
                                    className="min-w-0 bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-sm border border-black/5 flex flex-col items-center text-center"
                                    role="listitem"
                                >
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy/10 rounded-full flex items-center justify-center mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-navy [text-wrap:balance]">{item.title}</h3>
                                    <p className="text-charcoal/80 mb-4 text-sm sm:text-base [text-wrap:pretty]">{item.body}</p>
                                    {item.action}
                                </motion.div>
                            ))}
                        </div>

                        {/* Security & communication info */}
                        {/*<div className="bg-white rounded-xl shadow-sm border border-black/5 p-6 sm:p-8 mb-12 sm:mb-14" aria-labelledby="security-info-heading">*/}
                        {/*    <h2 id="security-info-heading" className="font-condensed font-bold mb-5 sm:mb-6 text-navy leading-snug [text-wrap:balance] text-[clamp(1.125rem,3.8vw,1.5rem)] sm:text-[clamp(1.25rem,2.8vw,1.875rem)] md:text-3xl">*/}
                        {/*        Security & Communication Assurance*/}
                        {/*    </h2>*/}
                        {/*    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">*/}
                        {/*        {[*/}
                        {/*            {*/}
                        {/*                icon: <FaLock className="text-forest text-lg sm:text-xl" />,*/}
                        {/*                title: "Secure Communications",*/}
                        {/*                desc: "All communications are encrypted and protected according to industry standards.",*/}
                        {/*            },*/}
                        {/*            {*/}
                        {/*                icon: <FaShieldAlt className="text-forest text-lg sm:text-xl" />,*/}
                        {/*                title: "NDA Available",*/}
                        {/*                desc: "Non-disclosure agreements are available for sensitive discussions.",*/}
                        {/*            },*/}
                        {/*            {*/}
                        {/*                icon: <FaClock className="text-forest text-lg sm:text-xl" />,*/}
                        {/*                title: "Response Time",*/}
                        {/*                desc: "We respond to all inquiries within 24–48 business hours.",*/}
                        {/*            },*/}
                        {/*        ].map((f, i) => (*/}
                        {/*            <div key={i} className="min-w-0 flex items-start gap-3" role="group" aria-label={f.title}>*/}
                        {/*                <div aria-hidden>{f.icon}</div>*/}
                        {/*                <div>*/}
                        {/*                    <h3 className="font-bold text-navy mb-1 text-xs sm:text-sm tracking-wide uppercase">{f.title}</h3>*/}
                        {/*                    <p className="text-sm text-charcoal/80 [text-wrap:pretty]">{f.desc}</p>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

/*
  Notes
  - If your header is taller, raise base padding: pt-28/pt-32 or use a CSS var: pt-[var(--header-h,8rem)].
  - Add safe-area support for iOS notch (optional): supports-[padding:max(0px)]:pt-[max(8rem,env(safe-area-inset-top))].
  - If `text-navy`, `text-charcoal`, `bg-forest` tokens are missing, replace with Tailwind defaults.
*/
