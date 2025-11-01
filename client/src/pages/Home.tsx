"use client";

import React from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/HeroCarousel";
import {
    homeSeo,
    homeStructuredData,
    partners,
    heroStats,
    integratedSolutions,
    capabilities,
    processSteps,
    assuranceHighlights,
    certificationStandards,
} from "@/content/home";
import { FaArrowRight, FaEnvelope, FaPhone } from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/* DESIGN PALETTE (from your current colors, normalized)                      */
/* -------------------------------------------------------------------------- */
const COLORS = {
    // brand core
    navy: "#0f172a", // your dark defense/navy bg
    navySoft: "#16213b",
    cream: "#f8f3eb",
    white: "#ffffff",

    // accents
    teal: "#14b8a6", // primary accent
    forest: "#0f766e", // secondary / CTA
    tealSoft: "rgba(20, 184, 166, 0.12)",

    // neutrals
    charcoal: "#1f2937",
    steel: "#6b7280",
    borderLight: "rgba(15, 118, 110, 0.12)",
    surface: "rgba(255, 255, 255, 0.75)",
};

/* -------------------------------------------------------------------------- */
/* ANIMATION PRESETS                                                          */
/* -------------------------------------------------------------------------- */
const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
};

/* -------------------------------------------------------------------------- */
/* HERO (asymmetrical, using palette)                                         */
/* -------------------------------------------------------------------------- */
function HomeHero() {
    const prefersReduced = useReducedMotion();

    return (
        <section
            className="relative isolate overflow-x-clip"
            aria-label="Hero Section"
            style={{
                background: `linear-gradient(140deg, ${COLORS.white} 100%, ${COLORS.navy} 55%, ${COLORS.cream} 100%)`,
            }}
        >
            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-14 sm:px-6 sm:pt-22 md:pt-24 lg:px-8 lg:pt-28">
                {/* TOP: asymmetrical grid (stacks on mobile) */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                    className="grid gap-10 lg:grid-cols-12 lg:items-start"
                >
                    {/* LEFT COLUMN — main narrative */}
                    <div className="min-w-0 space-y-6 lg:col-span-7">
                        {/* tag */}
                        <motion.div variants={fadeInUp}>
                            <div
                                className="inline-flex items-center gap-3 rounded-xl px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] shadow-sm sm:text-xs"
                                style={{
                                    backgroundColor: COLORS.cream,
                                    border: `1px solid rgba(15,118,110,0.12)`,
                                    color: COLORS.navy,
                                }}
                            >
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.navy }} />
                                Defense Technology Leader
                            </div>
                        </motion.div>

                        {/* heading + desc */}
                        <motion.div variants={fadeInUp} className="space-y-3">
                            <h1
                                className="text-[clamp(2.3rem,5.2vw,4rem)] leading-[1.03] tracking-tight"
                                style={{ color: COLORS.navy }}
                            >
                                Next-Generation
                                <span className="mt-1 block font-semibold" style={{ color: COLORS.navy }}>
                                  Mission Systems
                                </span>
                            </h1>
                            <p
                                className="max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg"
                                style={{ color: "#0f172a" }}
                            >
                                Tactical, aerospace, and communication platforms engineered for zero downtime and
                                sovereign deployments. Built to interoperate with DRDO, HAL, and ISRO ecosystems.
                            </p>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col gap-4 sm:flex-row sm:items-center"
                        >
                            <Link href="/solutions">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-medium tracking-wide shadow-md transition-all duration-200 sm:px-9 sm:text-base"
                                    style={{ backgroundColor: COLORS.forest, color: COLORS.cream, border: "none" }}
                                >
                                    EXPLORE SOLUTIONS
                                    <FaArrowRight className="text-xs" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    variant="outline"
                                    className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-medium tracking-wide transition-all duration-200 sm:px-9 sm:text-base"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: COLORS.charcoal,
                                        border: "1px solid #0f172a",
                                    }}
                                >
                                    GET CONSULTATION
                                </Button>
                            </Link>
                        </motion.div>

                        {/* micro trust line */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center gap-3 text-[0.66rem] uppercase tracking-[0.14em] sm:text-[0.7rem]"
                            style={{ color: "#0f172a" }}
                        >
                          <span className="flex items-center gap-1">
                            <span
                                className="h-1.5 w-1.5 animate-pulse rounded-full"
                                style={{ backgroundColor: "#22c55e" }}
                            />
                            Operational SLA 99.99%
                          </span>
                            <span
                                className="hidden h-px w-6 sm:inline-block"
                                aria-hidden
                                style={{ backgroundColor: "rgba(107,114,128,0.35)" }}
                            />
                            <span className="flex items-center gap-1">India-first supply chain</span>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN — vertical info rail */}
                    <div className="min-w-0 space-y-4 lg:col-span-5 lg:pl-7">
                        {/* status card */}
                        <motion.div
                            variants={fadeInUp}
                            className="rounded-2xl p-4 shadow-sm backdrop-blur-sm md:p-5"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.85)",
                                border: "1px solid #0f172a",
                            }}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <p
                                        className="text-[0.6rem] uppercase tracking-[0.12em]"
                                        style={{ color: "rgba(100,116,139,1)" }}
                                    >
                                        System Status
                                    </p>
                                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold" style={{ color: COLORS.charcoal }}>
                                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                                        OPERATIONAL
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className="mb-1 text-[0.6rem] uppercase tracking-[0.12em]"
                                        style={{ color: "rgba(100,116,139,1)" }}
                                    >
                                        Readiness
                                    </p>
                                    <p className="text-2xl font-semibold leading-none" style={{ color: COLORS.navy }}>
                                        99.8%
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                                <motion.div
                                    className="h-full"
                                    style={{
                                        backgroundImage: `linear-gradient(90deg, ${COLORS.navy} 0%, ${COLORS.forest} 100%)`,
                                    }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: prefersReduced ? "85%" : "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.1, ease: "easeOut" }}
                                />
                            </div>
                            <p className="mt-3 text-[0.6rem]" style={{ color: "rgba(100,116,139,1)" }}>
                                Validated against aerospace + tactical mission profiles.
                            </p>
                        </motion.div>

                        {/* program cards - responsive */}
                        <motion.div
                            variants={fadeInUp}
                            className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-2"
                        >
                            <div
                                className="rounded-2xl p-3 sm:p-4"
                                style={{ backgroundColor: "#11111", border: "1px solid #0f172a" }}
                            >
                                <p
                                    className="mb-1 text-[0.6rem] uppercase tracking-[0.12em]"
                                    style={{ color: "rgba(100,116,139,1)" }}
                                >
                                    Tactical Edge
                                </p>
                                <p className="text-sm font-semibold" style={{ color: COLORS.charcoal }}>
                                    Rugged Compute
                                </p>
                                <p className="mt-1 text-[0.6rem]" style={{ color: "rgba(100,116,139,1)" }}>
                                    MIL-STD-810H
                                </p>
                            </div>
                            <div
                                className="rounded-2xl p-3 sm:p-4"
                                style={{ backgroundColor: COLORS.white, border: "1px solid #0f172a" }}
                            >
                                <p
                                    className="mb-1 text-[0.6rem] uppercase tracking-[0.12em]"
                                    style={{ color: "rgba(100,116,139,1)" }}
                                >
                                    Secure Comms
                                </p>
                                <p className="text-sm font-semibold" style={{ color: COLORS.charcoal }}>
                                    FIPS / Mesh
                                </p>
                                <p className="mt-1 text-[0.6rem]" style={{ color: "rgba(100,116,139,1)" }}>
                                    Real-time links
                                </p>
                            </div>
                            <div
                                className="col-span-2 rounded-2xl p-3 sm:p-4 md:col-span-1 lg:col-span-2"
                                style={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #0f172a" }}
                            >
                                <p
                                    className="mb-1 text-[0.6rem] uppercase tracking-[0.12em]"
                                    style={{ color: "rgba(100,116,139,1)" }}
                                >
                                    Aerospace
                                </p>
                                <p className="text-sm font-semibold" style={{ color: COLORS.charcoal }}>
                                    DO-178C compliant
                                </p>
                                <p className="mt-1 text-[0.6rem]" style={{ color: "rgba(100,116,139,1)" }}>
                                    Vibration & temp hardened
                                </p>
                            </div>
                        </motion.div>

                        {/* contact chip */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center gap-4 rounded-2xl p-4"
                            style={{ backgroundColor: "rgba(255,255,255,0.65)", border: "1px solid #0f172a" }}
                        >
                            <div
                                className="flex h-11 w-11 items-center justify-center rounded-xl"
                                style={{ backgroundColor: "rgba(20,184,166,0.12)", color: COLORS.navy }}
                            >
                                <FaEnvelope className="text-base" />
                            </div>
                            <div className="flex-1 min-w-[160px]">
                                <p
                                    className="mb-0.5 text-[0.6rem] uppercase tracking-[0.14em]"
                                    style={{ color: "rgba(100,116,139,1)" }}
                                >
                                    Direct Mission Desk
                                </p>
                                <p className="text-sm font-medium" style={{ color: COLORS.charcoal }}>
                                    info@trinethra-defentech.com
                                </p>
                            </div>
                            <Link href="/contact">
                                <button
                                    className="rounded-lg px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] transition"
                                    style={{ backgroundColor: COLORS.navy, color: COLORS.white }}
                                >
                                    Engage
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* BOTTOM: carousel — unchanged */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 }}
                    className="mt-12"
                >
                    <HeroCarousel />
                </motion.div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* SOLUTIONS – REFINED, using palette                                         */
/* -------------------------------------------------------------------------- */
function HomeSolutions() {
    return (
        <section
            className="py-16 lg:py-24"
            aria-labelledby="solutions-heading"
            style={{ backgroundColor: "rgba(248,243,235,0.6)" }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-90px" }}
                    variants={staggerChildren}
                    className="mb-12 flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between"
                >
                    <div className="flex-1">
                        <motion.p variants={fadeInUp} className="mb-3 inline-flex items-center gap-2">
                            <span className="h-px w-9" style={{ backgroundColor: COLORS.teal }} />
                            <span
                                className="text-xs font-semibold uppercase tracking-[0.14em]"
                                style={{ color: COLORS.teal }}
                            >
                Integrated Solutions
              </span>
                        </motion.p>
                        <motion.h2
                            variants={fadeInUp}
                            id="solutions-heading"
                            className="text-3xl font-light leading-tight sm:text-4xl lg:text-[2.6rem]"
                            style={{ color: COLORS.charcoal }}
                        >
                            Mission-Critical
                            <span className="block font-semibold" style={{ color: COLORS.navy }}>
                Technology Platforms
              </span>
                        </motion.h2>
                    </div>
                    <motion.p
                        variants={fadeInUp}
                        className="max-w-xl text-sm leading-relaxed md:text-right"
                        style={{ color: "rgba(107,114,128,1)" }}
                    >
                        Built for contested, high-risk, or classified deployments. Modular, interoperable, and
                        secure-by-design.
                    </motion.p>
                </motion.div>

                {/* grid */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-70px" }}
                    variants={staggerChildren}
                >
                    {integratedSolutions.map((solution, index) => {
                        const Icon = solution.icon;
                        return (
                            <motion.article
                                key={solution.title}
                                variants={fadeInUp}
                                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    backgroundColor: COLORS.white,
                                    border: "1px solid rgba(226,232,240,0.7)",
                                }}
                            >
                                {/* corner index */}
                                <div
                                    className="pointer-events-none absolute right-6 top-6 text-4xl font-semibold tracking-tight"
                                    style={{ color: "rgba(20,184,166,0.06)" }}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                {/* icon + title */}
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                                        style={{
                                            backgroundColor: "rgba(20,184,166,0.05)",
                                            border: "1px solid rgba(20,184,166,0.2)",
                                            color: COLORS.teal,
                                        }}
                                    >
                                        <Icon className="text-xl" aria-hidden />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold" style={{ color: COLORS.charcoal }}>
                                            {solution.title}
                                        </h3>
                                        <p
                                            className="text-[0.68rem] uppercase tracking-[0.12em] mt-1"
                                            style={{ color: "rgba(107,114,128,1)" }}
                                        >
                                            {solution.category ?? "Defense Platform"}
                                        </p>
                                    </div>
                                </div>

                                {/* description */}
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(71,85,105,1)" }}>
                                    {solution.description}
                                </p>

                                {/* capabilities */}
                                <div
                                    className="rounded-xl p-3"
                                    style={{ backgroundColor: "rgba(248,250,252,0.5)" }}
                                >
                                    <p
                                        className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em]"
                                        style={{ color: "rgba(100,116,139,1)" }}
                                    >
                                        Key Capabilities
                                    </p>
                                    <ul className="flex flex-wrap gap-2">
                                        {solution.capabilities.slice(0, 4).map((cap) => (
                                            <li
                                                key={cap}
                                                className="rounded-full px-3 py-1 text-[0.6rem] font-medium shadow-sm"
                                                style={{ backgroundColor: COLORS.white, color: COLORS.charcoal }}
                                            >
                                                {cap}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* footer CTA */}
                                <Link href={solution.link}>
                                    <button
                                        className="mt-auto inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200"
                                        style={{ color: COLORS.teal }}
                                    >
                                        Learn More
                                        <FaArrowRight className="text-[0.6rem]" />
                                    </button>
                                </Link>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* CAPABILITIES – using same palette                                          */
/* -------------------------------------------------------------------------- */
function HomeCapabilities() {
    return (
        <section className="pb-6 lg:pb-14" aria-labelledby="capabilities-heading" style={{ backgroundColor: COLORS.white }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerChildren}
                    className="mb-12 text-center"
                >
                    <motion.p variants={fadeInUp} className="mb-4 inline-flex items-center gap-2">
                        <span className="h-px w-9" style={{ backgroundColor: "rgba(15,118,110,0.7)" }} />
                        <span
                            className="text-xs font-semibold uppercase tracking-[0.12em]"
                            style={{ color: "rgba(15,118,110,0.9)" }}
                        >
                          Core Capabilities
                        </span>
                        <span className="h-px w-9" style={{ backgroundColor: "rgba(15,118,110,0.7)" }} />
                    </motion.p>
                    <motion.h2
                        variants={fadeInUp}
                        id="capabilities-heading"
                        className="text-3xl font-light leading-tight sm:text-4xl lg:text-[2.55rem]"
                        style={{ color: COLORS.charcoal }}
                    >
                        Engineering
                        <span className="block font-semibold" style={{ color: COLORS.navy }}>
                          Excellence
                        </span>
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed"
                        style={{ color: "rgba(107,114,128,0.95)" }}
                    >
                        Full-stack defense engineering from rugged hardware to secure communications, with
                        lifecycle validation.
                    </motion.p>
                </motion.div>

                {/* two column layout */}
                <div className="grid gap-10 lg:grid-cols-[0.6fr,1.4fr]">
                    {/* left rail */}
                    <div
                        className="rounded-2xl p-6 shadow-sm"
                        style={{
                            backgroundColor: "rgba(248,243,235,0.5)",
                            border: "1px solid rgba(248,243,235,0.95)",
                        }}
                    >
                        <p
                            className="text-xs font-semibold uppercase tracking-[0.12em] mb-3"
                            style={{ color: "rgba(100,116,139,1)" }}
                        >
                            Delivery Metrics
                        </p>
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-semibold" style={{ color: COLORS.teal }}>
                                    99.4%
                                </p>
                                <p
                                    className="text-xs uppercase tracking-[0.1em]"
                                    style={{ color: "rgba(100,116,139,1)" }}
                                >
                                    Acceptance Rate
                                </p>
                            </div>
                            <div>
                                <p className="text-3xl font-semibold" style={{ color: COLORS.navy }}>
                                    15+
                                </p>
                                <p
                                    className="text-xs uppercase tracking-[0.1em]"
                                    style={{ color: "rgba(100,116,139,1)" }}
                                >
                                    Years Expertise
                                </p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(71,85,105,1)" }}>
                            All capabilities adhere to Indian defense procurement guidelines and NATO-compatible
                            standards. Platform-ready documentation and test artefacts supplied.
                        </p>
                    </div>

                    {/* capability cards */}
                    <motion.div
                        className="grid grid-cols-1 gap-7 md:grid-cols-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-70px" }}
                        variants={staggerChildren}
                    >
                        {capabilities.map((capability, index) => {
                            const Icon = capability.icon;
                            return (
                                <motion.div
                                    key={capability.title}
                                    variants={fadeInUp}
                                    className="group flex gap-5 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1"
                                    style={{ backgroundColor: COLORS.white, border: "1px solid rgba(226,232,240,1)" }}
                                >
                                    {/* icon + index */}
                                    <div className="relative flex-shrink-0">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200"
                                            style={{
                                                backgroundColor: COLORS.cream,
                                                border: "1px solid rgba(226,232,240,1)",
                                                color: COLORS.forest,
                                            }}
                                        >
                                            <Icon className="text-xl" aria-hidden />
                                        </div>
                                        <div
                                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[0.55rem] font-semibold shadow-sm"
                                            style={{ backgroundColor: COLORS.white, color: COLORS.charcoal }}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                    </div>

                                    {/* text content */}
                                    <div className="flex-1">
                                        <h3 className="mb-2 text-base font-semibold" style={{ color: COLORS.charcoal }}>
                                            {capability.title}
                                        </h3>
                                        <p className="mb-4 text-sm" style={{ color: "rgba(71,85,105,1)" }}>
                                            {capability.description}
                                        </p>
                                        {/* mini progress */}
                                        <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                                            <motion.div
                                                className="h-full"
                                                style={{
                                                    backgroundImage: `linear-gradient(90deg, ${COLORS.teal} 0%, ${COLORS.forest} 100%)`,
                                                }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* TRUSTED PARTNERS – dark, using navy + teal                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* TRUSTED PARTNERS — Auto-scrolling strip                                    */
/* -------------------------------------------------------------------------- */
function TrustedPartnersSection() {
    const partnerList =
        partners && partners.length > 0
            ? partners
            : ["ADE-DRDO", "CABS-DRDO", "GTRE-DRDO", "MTRDC-DRDO", "HAL", "ISRO"];

    // duplicate to create illusion of infinite scroll
    const scrollingPartners = [...partnerList, ...partnerList];

    return (
        <section
            className="py-14 sm:py-16 lg:py-20"
            aria-labelledby="partners-heading"
            style={{ backgroundColor: COLORS.navy }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* header */}
                <div className="mb-7 flex flex-col gap-3 text-center md:mb-10 md:flex-row md:items-center md:justify-between md:text-left">
                    <div>
                        <p className="mb-3 inline-flex items-center gap-2">
                            <span className="h-px w-8" style={{ backgroundColor: "rgba(20,184,166,0.7)" }} />
                            <span
                                className="text-xs font-semibold uppercase tracking-[0.12em]"
                                style={{ color: "rgba(20,184,166,0.9)" }}
                            >
                Strategic Partnerships
              </span>
                        </p>
                        <h2
                            id="partners-heading"
                            className="text-3xl font-light leading-tight sm:text-4xl"
                            style={{ color: COLORS.cream }}
                        >
                            Trusted by Indian
                            <span className="block font-semibold" style={{ color: COLORS.white }}>
                Defense &amp; Space Agencies
              </span>
                        </h2>
                    </div>
                    <p
                        className="text-sm leading-relaxed md:max-w-md"
                        style={{ color: "rgba(226,232,240,0.7)" }}
                    >
                        Continuous collaboration, integration support, and lifecycle sustainment with Tier-I
                        institutions.
                    </p>
                </div>

                {/* auto-scrolling track */}
                <div
                    className="relative isolate overflow-hidden rounded-2xl border"
                    style={{
                        borderColor: "rgba(20,184,166,0.12)",
                        background:
                            "radial-gradient(circle, rgba(20,184,166,0.08), rgba(15,23,42,0))",
                    }}
                >
                    {/* gradient fades */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[#0f172a] to-transparent"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#0f172a] to-transparent"
                    />

                    <div
                        className="group flex gap-4 py-6"
                        /* pause on hover */
                    >
                        <div
                            className="flex min-w-full items-center gap-4 animate-partner-scroll group-hover:[animation-play-state:paused]"
                        >
                            {scrollingPartners.map((partner, idx) => (
                                <PartnerBadge key={partner + idx} name={partner} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* keyframes inlined for simplicity */}
            <style jsx>{`
        @keyframes partner-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-partner-scroll {
          animation: partner-scroll 26s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-partner-scroll {
            animation-duration: 20s;
          }
        }
      `}</style>
        </section>
    );
}

/* partner pill — defense styling */
function PartnerBadge({ name }: { name: string }) {
    return (
        <div
            className="relative flex h-[82px] min-w-[160px] items-center justify-center rounded-xl px-4 text-center transition-transform duration-200 hover:-translate-y-1"
            style={{
                backgroundColor: "rgba(15,23,42,0.35)",
                border: "1px solid rgba(20,184,166,0.28)",
                boxShadow: "0 12px 22px rgba(0,0,0,0.15)",
            }}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200"
                style={{
                    background:
                        "radial-gradient(circle, rgba(20,184,166,0.18), rgba(15,23,42,0))",
                }}
            />
            <div className="z-[1] flex flex-col items-center gap-1">
        <span
            className="text-[0.7rem] font-semibold tracking-wide"
            style={{ color: COLORS.white }}
        >
          {name}
        </span>
                <span
                    className="rounded-full px-3 py-1 text-[0.55rem] uppercase tracking-[0.1em]"
                    style={{ backgroundColor: "rgba(15,23,42,0.4)", color: "rgba(226,232,240,0.85)" }}
                >
          Active
        </span>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* ASSURANCE – using white + navy + teal                                      */
/* -------------------------------------------------------------------------- */
function HomeAssurance() {
    return (
        <section className="py-6 lg:py-14" aria-labelledby="assurance-heading" style={{ backgroundColor: COLORS.white }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerChildren}
                    className="mb-12 flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between"
                >
                    <div className="flex-1">
                        <motion.p variants={fadeInUp} className="mb-4 inline-flex items-center gap-2">
                            <span className="h-px w-8" style={{ backgroundColor: "rgba(15,118,110,0.7)" }} />
                            <span
                                className="text-xs font-semibold uppercase tracking-[0.12em]"
                                style={{ color: "rgba(15,118,110,0.9)" }}
                            >
                Quality & Compliance
              </span>
                        </motion.p>
                        <motion.h2
                            variants={fadeInUp}
                            id="assurance-heading"
                            className="text-3xl font-light leading-tight sm:text-4xl lg:text-[2.6rem]"
                            style={{ color: COLORS.charcoal }}
                        >
                            Uncompromising
                            <span className="block font-semibold" style={{ color: COLORS.navy }}>
                Standards
              </span>
                        </motion.h2>
                    </div>
                    <motion.p
                        variants={fadeInUp}
                        className="max-w-lg text-sm leading-relaxed md:text-right"
                        style={{ color: "rgba(71,85,105,1)" }}
                    >
                        Every delivery is validated, integrated, and rehearsed against mission profiles before
                        sign-off.
                    </motion.p>
                </motion.div>

                {/* assurance cards */}
                <motion.div
                    className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-70px" }}
                    variants={staggerChildren}
                >
                    {assuranceHighlights.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                variants={fadeInUp}
                                className="relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-200 hover:-translate-y-1"
                                style={{ backgroundColor: COLORS.white, border: "1px solid rgba(226,232,240,1)" }}
                            >
                                <div className="absolute right-0 top-0 h-20 w-20 opacity-5">
                                    <Icon className="h-full w-full" style={{ color: COLORS.teal }} />
                                </div>
                                <div
                                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                                    style={{ backgroundColor: "rgba(20,184,166,0.12)", color: COLORS.teal }}
                                >
                                    <Icon className="text-xl" aria-hidden />
                                </div>
                                <h3 className="mb-2 text-base font-semibold" style={{ color: COLORS.charcoal }}>
                                    {item.title}
                                </h3>
                                <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(71,85,105,1)" }}>
                                    {item.description}
                                </p>
                                <div>
                                    <p
                                        className="mb-2 flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.12em]"
                                        style={{ color: "rgba(100,116,139,1)" }}
                                    >
                                        <span>Compliance Level</span>
                                        <span style={{ color: COLORS.teal }}>100%</span>
                                    </p>
                                    <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                                        <motion.div
                                            className="h-full"
                                            style={{
                                                backgroundImage: `linear-gradient(90deg, ${COLORS.teal} 0%, ${COLORS.forest} 100%)`,
                                            }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.1, delay: index * 0.1 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* certifications block */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={staggerChildren}
                    className="relative overflow-hidden rounded-3xl p-7 sm:p-9 lg:p-11"
                    style={{ backgroundColor: COLORS.navy }}
                >
                    <div className="pointer-events-none absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                                backgroundSize: "38px 38px",
                            }}
                        />
                    </div>
                    <div className="relative">
                        <motion.h3
                            variants={fadeInUp}
                            className="mb-3 text-center text-2xl font-light"
                            style={{ color: COLORS.cream }}
                        >
                            Industry <span className="font-semibold">Certifications</span>
                        </motion.h3>
                        <motion.p
                            variants={fadeInUp}
                            className="mx-auto mb-8 max-w-2xl text-center text-sm"
                            style={{ color: "rgba(226,232,240,0.85)" }}
                        >
                            Adherence to MIL-STD, FIPS, NATO-compatible frameworks and Indian defense procurement
                            standards.
                        </motion.p>

                        <motion.div
                            variants={staggerChildren}
                            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                        >
                            {certificationStandards.map((standard) => (
                                <motion.div
                                    key={standard}
                                    variants={fadeInUp}
                                    className="rounded-xl px-3 py-3 text-center text-xs font-semibold transition-all duration-150 sm:px-4 sm:py-4 sm:text-sm"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(148,163,184,0.3)",
                                        color: COLORS.white,
                                    }}
                                >
                                    {standard}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* telemetry */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-10 grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-3"
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        >
                            <div className="text-center">
                                <p className="mb-1 text-3xl font-light" style={{ color: COLORS.teal }}>
                                    100%
                                </p>
                                <p
                                    className="text-[0.6rem] uppercase tracking-[0.14em]"
                                    style={{ color: "rgba(226,232,240,0.8)" }}
                                >
                                    Compliance rate
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="mb-1 text-3xl font-light" style={{ color: COLORS.teal }}>
                                    15+
                                </p>
                                <p
                                    className="text-[0.6rem] uppercase tracking-[0.14em]"
                                    style={{ color: "rgba(226,232,240,0.8)" }}
                                >
                                    Years experience
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="mb-1 text-3xl font-light" style={{ color: COLORS.teal }}>
                                    0
                                </p>
                                <p
                                    className="text-[0.6rem] uppercase tracking-[0.14em]"
                                    style={{ color: "rgba(226,232,240,0.8)" }}
                                >
                                    Mission failures
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* CTA – EXECUTIVE, dark navy                                                 */
/* -------------------------------------------------------------------------- */
function HomeCTA() {
    return (
        <section
            className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
            aria-label="Call to Action"
            style={{ backgroundColor: COLORS.navy }}
        >
            <div className="pointer-events-none absolute inset-0 opacity-[0.018]" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mx-auto max-w-4xl text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={staggerChildren}
                >
                    <motion.p
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] ring-1"
                        style={{
                            backgroundColor: "rgba(15,118,110,0.04)",
                            color: "rgba(255,255,255,0.75)",
                            borderColor: "rgba(255,255,255,0.1)",
                        }}
                    >
                        Engage with TRINETHRA
                    </motion.p>
                    <motion.h2
                        variants={fadeInUp}
                        className="mt-5 text-3xl font-light leading-tight sm:text-4xl lg:text-[2.7rem]"
                        style={{ color: COLORS.white }}
                    >
                        Ready for a defense-grade deployment?
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base"
                        style={{ color: "rgba(226,232,240,0.6)" }}
                    >
                        Tell us the theatre, the payload and the timeframe — we’ll map it to an existing
                        certified platform. Rapid, defensible, and secure delivery.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
                    >
                        <Link href="/contact">
                            <Button
                                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 sm:text-sm"
                                style={{ backgroundColor: COLORS.teal, color: COLORS.white }}
                            >
                                Start your project
                                <FaArrowRight className="text-xs" />
                            </Button>
                        </Link>
                        <Link href="/solutions">
                            <Button
                                variant="outline"
                                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 sm:text-sm"
                                style={{
                                    backgroundColor: "transparent",
                                    border: "1px solid rgba(255,255,255,0.25)",
                                    color: COLORS.white,
                                }}
                            >
                                View solution catalog
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="mt-10 flex flex-wrap items-center justify-center gap-5 text-left"
                    >
                        <div className="flex items-center gap-3" style={{ color: "rgba(226,232,240,0.55)" }}>
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em]">DRDO, HAL, ISRO</p>
                                <p className="text-[0.6rem]">Engagements delivered in India</p>
                            </div>
                        </div>
                        <div className="h-px w-10" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                        <div style={{ color: "rgba(226,232,240,0.55)" }}>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em]">15+ years</p>
                            <p className="text-[0.6rem]">No mission failures</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */
export default function Home() {
    return (
        <Layout
            title={homeSeo.title}
            description={homeSeo.description}
            ogType={homeSeo.ogType}
            keywords={homeSeo.keywords}
            structuredData={JSON.stringify(homeStructuredData)}
        >
            <div className="relative min-h-screen" style={{ backgroundColor: COLORS.white }}>
                <HomeHero />
                {/*<HomeSolutions />*/}
                <HomeCapabilities />
                <TrustedPartnersSection />
                <HomeAssurance />
                <HomeCTA />
            </div>
        </Layout>
    );
}