"use client";

import React from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaShieldAlt,
    FaLock,
    FaClock,
} from "react-icons/fa";

/**
 * CONTACT — TRINETHRA DEFENTECH (Alt Version)
 *
 * Differences from previous:
 * - Left-aligned intro band (navy) + right contact form (white)
 * - Below: 4-tile bento for phone, mail, visits, security
 * - Final band for operational hours + escalation note
 *
 * Rules kept:
 * - No gradients
 * - Same palette: navy, charcoal, cream, forest, white, teal
 * - All tiles rounded-2xl, border, consistent padding
 * - 1 → 2 → 12 responsive layout
 * - Motion respects prefers-reduced-motion
 */

export default function Contact() {
    const reduce = useReducedMotion();

    const fadeUp = {
        hidden: { opacity: 0, y: reduce ? 0 : 14 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.38, ease: "easeOut" },
        },
    } as const;

    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: reduce ? 0 : 0.1 },
        },
    } as const;

    return (
        <Layout
            title="Contact | TRINETHRA DEFENTECH"
            description="Securely contact TRINETHRA DEFENTECH for defense, ruggedization, and mission technology engagements."
            pageType="contact"
        >
            <main className="min-h-screen bg-cream pt-[max(5.5rem,env(safe-area-inset-top))] pb-16">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-10">
                    {/* TOP STRIP */}
                    <header className="mb-8 sm:mb-10">
                        <h1 className="mt-3 text-[clamp(2rem,4.1vw,3.1rem)] leading-tight font-condensed text-charcoal">
                            Get routed to the correct mission team.
                        </h1>
                        <p className="mt-4 max-w-3xl text-charcoal/75 text-sm sm:text-base [text-wrap:pretty]">
                            Use the secure form for classified / restricted / coalition work.
                            Use phone/mail for standard defense technology queries. We will match your request to
                            integration, rugged compute, or procurement.
                        </p>
                    </header>

                    {/* FIRST ROW — TWO BIG TILES */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mb-5"
                    >
                        {/* LEFT: MISSION CONTACT SUMMARY */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-5 bg-navy text-cream rounded-2xl border border-navy/40 p-5 sm:p-6 lg:p-7 flex flex-col gap-5"
                            aria-labelledby="mission-contact"
                        >
                            <div>
                                <p
                                    id="mission-contact"
                                    className="uppercase tracking-[0.3em] text-xs sm:text-sm text-cream/85"
                                >
                                    Mission contact matrix
                                </p>
                                <h2 className="mt-2 text-[clamp(1.5rem,2.8vw,2.1rem)] font-condensed leading-tight">
                                    For defense, aerospace, and critical infrastructure operators.
                                </h2>
                                <p className="mt-3 text-sm sm:text-base text-cream/75">
                                    Tell us: area of ops, clearance constraints, and deadlines — we will reply with a
                                    secure channel or a field-integration call.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="rounded-xl border border-cream/25 bg-navy/15 p-4">
                                    <p className="text-[0.6rem] uppercase tracking-[0.25em] text-cream/60">
                                        Primary line (India HQ)
                                    </p>
                                    <a
                                        href="tel:+918044556677"
                                        className="mt-2 inline-flex text-lg font-condensed text-cream underline-offset-4 hover:underline"
                                    >
                                        +91 80 4455 6677
                                    </a>
                                    <p className="mt-1 text-xs text-cream/50">Mon–Fri, 09:30–18:30 IST</p>
                                </div>
                                <div className="rounded-xl border border-cream/25 bg-navy/15 p-4">
                                    <p className="text-[0.6rem] uppercase tracking-[0.25em] text-cream/60">
                                        Operations mail (secured)
                                    </p>
                                    <a
                                        href="mailto:info@trinethra-defentech.com"
                                        className="mt-2 inline-flex text-sm sm:text-base text-cream underline-offset-4 hover:underline break-all"
                                    >
                                        info@trinethra-defentech.com
                                    </a>
                                    <p className="mt-1 text-xs text-cream/50">PGP / S/MIME: on request</p>
                                </div>
                            </div>

                            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-cream/50">
                                All external communication is logged for audit and trace.
                            </p>
                        </motion.section>

                        {/* RIGHT: CONTACT FORM (STRUCTURAL) */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-7 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 lg:p-7"
                            aria-labelledby="contact-form"
                        >
                            <div className="flex items-center justify-between gap-3 mb-5">
                                <div>
                                    <p
                                        id="contact-form"
                                        className="uppercase tracking-[0.3em] text-xs sm:text-sm text-charcoal/85"
                                    >
                                        Secure enquiry
                                    </p>
                                    <p className="text-sm text-charcoal/60">
                                        Use for RFPs, integrations, or sensitive capability discussions.
                                    </p>
                                </div>
                                <p className="text-[0.65rem] font-mono text-charcoal/35 tracking-[0.25em]">
                                    RESPONSE: 24–48H
                                </p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="flex flex-col gap-2">
                  <span className="uppercase text-[0.6rem] tracking-[0.3em] text-charcoal/70">
                    Full name / Rank
                  </span>
                                    <input
                                        type="text"
                                        required
                                        className="rounded-lg bg-cream/30 border border-charcoal/10 px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40"
                                        placeholder="e.g. Lt. Cdr. Menon"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                  <span className="uppercase text-[0.6rem] tracking-[0.3em] text-charcoal/70">
                    Official email
                  </span>
                                    <input
                                        type="email"
                                        required
                                        className="rounded-lg bg-cream/30 border border-charcoal/10 px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40"
                                        placeholder="name@command.gov"
                                    />
                                </label>
                                <label className="flex flex-col gap-2 md:col-span-1">
                  <span className="uppercase text-[0.6rem] tracking-[0.3em] text-charcoal/70">
                    Priority
                  </span>
                                    <select className="rounded-lg bg-cream/30 border border-charcoal/10 px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40">
                                        <option>Standard (24–48h)</option>
                                        <option>High (same day)</option>
                                        <option>Critical (call back)</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2 md:col-span-1">
                  <span className="uppercase text-[0.6rem] tracking-[0.3em] text-charcoal/70">
                    Region / Theater
                  </span>
                                    <input
                                        type="text"
                                        className="rounded-lg bg-cream/30 border border-charcoal/10 px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40"
                                        placeholder="e.g. South Asia, Indo-Pacific"
                                    />
                                </label>
                                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="uppercase text-[0.6rem] tracking-[0.3em] text-charcoal/70">
                    Brief your mission / requirement
                  </span>
                                    <textarea
                                        rows={4}
                                        className="rounded-lg bg-cream/30 border border-charcoal/10 px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40 resize-y"
                                        placeholder="Describe the platform, urgency, and any classification constraints…"
                                    />
                                </label>
                            </form>

                            <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-lg bg-forest text-cream px-5 py-2.5 text-sm font-semibold hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest/40"
                                >
                                    Submit secure request
                                </button>
                                <p className="text-xs text-charcoal/55">
                                    We can move to NDA / gated link if information is classified.
                                </p>
                            </div>
                        </motion.section>
                    </motion.div>

                    {/* SECOND ROW — 4 BENTO TILES */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={stagger}
                        viewport={{ once: true, amount: 0.25 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5"
                    >
                        {/* DIRECT CALL TILE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-3 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 flex gap-4 items-start"
                        >
                            <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                                <FaPhone className="text-navy" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-sm font-condensed text-charcoal uppercase">Call (HQ)</h3>
                                <p className="text-sm text-charcoal/70">Mon–Fri, 09:30–18:30 IST</p>
                                <a
                                    href="tel:+918044556677"
                                    className="mt-1 inline-flex text-sm text-forest underline-offset-4 hover:underline break-all"
                                >
                                    +91 80 4455 6677
                                </a>
                            </div>
                        </motion.section>

                        {/* EMAIL TILE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-3 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 flex gap-4 items-start"
                        >
                            <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                                <FaEnvelope className="text-navy" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-sm font-condensed text-charcoal uppercase">Email (secure)</h3>
                                <p className="text-sm text-charcoal/70">For formal project / RFP traffic.</p>
                                <a
                                    href="mailto:info@trinethra-defentech.com"
                                    className="mt-1 inline-flex text-sm text-forest underline-offset-4 hover:underline break-all"
                                >
                                    info@trinethra-defentech.com
                                </a>
                            </div>
                        </motion.section>

                        {/* VISIT TILE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-3 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 flex gap-4 items-start"
                        >
                            <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                                <FaMapMarkerAlt className="text-navy" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-sm font-condensed text-charcoal uppercase">
                                    On-site (By clearance)
                                </h3>
                                <p className="text-sm text-charcoal/70 leading-relaxed">
                                    100 Technology Drive
                                    <br />
                                    Bengaluru, Karnataka 560001
                                </p>
                            </div>
                        </motion.section>

                        {/* SECURITY TILE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-3 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 flex gap-4 items-start"
                        >
                            <div className="h-10 w-10 rounded-full bg-forest/10 flex items-center justify-center">
                                <FaShieldAlt className="text-forest" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-sm font-condensed text-charcoal uppercase">
                                    Security posture
                                </h3>
                                <p className="text-sm text-charcoal/70">
                                    NDA available, encrypted mail, logged comms.
                                </p>
                            </div>
                        </motion.section>
                    </motion.div>

                    {/* FINAL BAND — HOURS / SLA */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeUp}
                        viewport={{ once: true, amount: 0.2 }}
                        className="mt-6 bg-charcoal text-cream rounded-2xl border border-charcoal/40 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-cream/10 flex items-center justify-center shrink-0">
                                <FaClock aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-cream/80">
                                    Operating hours (India)
                                </p>
                                <p className="text-sm text-cream">
                                    Mon–Fri: 09:30–18:30 IST • Sat/Sun: On-call for mission ops
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-cream/70">
                            For joint / coalition emergencies, mention “critical” in subject — we will trigger a
                            callback inside 4 hours.
                        </p>
                    </motion.section>
                </div>
            </main>
        </Layout>
    );
}