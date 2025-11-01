"use client";

import React from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import {
    FaShieldAlt,
    FaSatelliteDish,
    FaMicrochip,
    FaHandshake,
    FaArrowRight,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

/**
 * ABOUT — TRINETHRA DEFENTECH
 * Bento, rule-based, no gradients
 *
 * Layout rules used:
 * 1. All tiles use the same radius → rounded-2xl
 * 2. All tiles use solid backgrounds only (navy, charcoal, cream, forest, white)
 * 3. All tiles use consistent padding → p-5 sm:p-6 lg:p-7
 * 4. Tiles sit on a 12-col layout at ≥1024px
 * 5. Mobile-first collapse → 1 col → 2 col (md) → 12 col (lg)
 * 6. Max container width locked at max-w-screen-2xl
 */

type ReadinessMetric = {
    label: string;
    value: string;
    detail: string;
};

type Capability = {
    icon: React.ReactNode;
    title: string;
    copy: string;
};

type TimelineItem = {
    year: string;
    headline: string;
    desc: string;
};

type Leader = {
    name: string;
    role: string;
    bio: string;
};

export default function About() {
    const reduce = useReducedMotion();

    // shared motion variants
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

    // data (could be extracted to /lib/trinethra.ts)
    const readiness: ReadinessMetric[] = [
        { label: "Operational Programs", value: "52+", detail: "Active allied deployments" },
        { label: "Mission Assurance", value: "99.98%", detail: "System uptime across theaters" },
        { label: "Security Audits", value: "Quarterly", detail: "Multi-agency certifications" },
        { label: "Response Window", value: "< 4 hrs", detail: "Tier-1 escalation SLA" },
    ];

    const capabilityMatrix: Capability[] = [
        {
            icon: <FaShieldAlt className="text-teal text-lg" aria-hidden="true" />,
            title: "Mission Integrity",
            copy: "MIL-STD validated stacks, line-item traceability, lifecycle hardening.",
        },
        {
            icon: <FaMicrochip className="text-teal text-lg" aria-hidden="true" />,
            title: "Edge Compute",
            copy: "Rugged, EMI-aware compute for ISR / EW / autonomous assets.",
        },
        {
            icon: <FaSatelliteDish className="text-teal text-lg" aria-hidden="true" />,
            title: "Secure Connectivity",
            copy: "Encrypted data fabric for joint, allied and maritime-land-air missions.",
        },
        {
            icon: <FaHandshake className="text-teal text-lg" aria-hidden="true" />,
            title: "Allied Partnerships",
            copy: "Embedded engineers with coalition units for forward deployments.",
        },
    ];

    const timeline: TimelineItem[] = [
        {
            year: "2014",
            headline: "Doctrine established",
            desc: "Mandate to harden digital and comms infra for frontline units.",
        },
        {
            year: "2017",
            headline: "Platform integration",
            desc: "Modular harnessing across armored and naval platforms.",
        },
        {
            year: "2020",
            headline: "Secure edge compute",
            desc: "Autonomous ISR coordination at the tactical edge.",
        },
        {
            year: "2023",
            headline: "Allied fusion network",
            desc: "Cross-domain data fabric to speed coalition decision cycles.",
        },
    ];

    const leadership: Leader[] = [
        {
            name: "Commander Arjun Rao (Retd.)",
            role: "Founder & Chief Strategist",
            bio: "Special operations background. Converts doctrine into resilient product lifecycles.",
        },
        {
            name: "Dr. Kavya Menon",
            role: "Chief Technology Officer",
            bio: "30+ patented innovations in rugged compute and AI inference for ISR/EW.",
        },
        {
            name: "Rhea Kapoor",
            role: "Director, Secure Supply Chains",
            bio: "Leads zero-compromise procurement with encrypted traceability.",
        },
        {
            name: "Lt. Col. Vikram Singh (Retd.)",
            role: "Head, Field Integration",
            bio: "Owns operator feedback loops and rapid deployment playbooks with allied forces.",
        },
    ];

    return (
        <Layout
            title="About | TRINETHRA DEFENTECH"
            description="Mission-critical, clearance-aligned defense technology for allied and coalition partners."
            pageType="about"
        >
            {/* PAGE BACKGROUND — no gradient, just cream */}
            <main className="min-h-screen bg-cream pt-[max(5.5rem,env(safe-area-inset-top))] pb-16">
                {/* CONTAINER */}
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-10">
                    {/* PAGE INTRO */}
                    <header className="mb-8 sm:mb-10">
                        <p className="uppercase tracking-[0.34em] text-xs sm:text-sm text-forest">
                            Trinethra Defentech
                        </p>
                        <h1 className="mt-3 text-[clamp(2.1rem,4.2vw,3.4rem)] leading-tight font-condensed text-charcoal">
                            Guardian systems engineered for decisive missions.
                        </h1>
                        <p className="mt-4 max-w-3xl text-charcoal/75 text-sm sm:text-base [text-wrap:pretty]">
                            We partner with defense, aerospace, and critical infrastructure operators to deliver
                            ruggedized, interoperable, and audit-ready technology stacks that perform in
                            contested, signal-dense, and climate-stressed theaters.
                        </p>
                    </header>

                    {/* BENTO GRID — rule based */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5"
                    >
                        {/* TILE 1 — HERO / ENGAGE (primary) */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-7 bg-navy text-cream rounded-2xl border border-navy/45 p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-5"
                            aria-labelledby="mission-block"
                        >
                            <div>
                                <p
                                    id="mission-block"
                                    className="uppercase tracking-[0.35em] text-xs sm:text-sm text-cream/90"
                                >
                                    Mission pedigree
                                </p>
                                <h2 className="mt-3 text-[clamp(1.6rem,3.2vw,2.3rem)] leading-tight font-condensed">
                                    Defense-grade products, field-proven with coalition units.
                                </h2>
                                <p className="mt-4 text-sm sm:text-base text-cream/75 max-w-2xl [text-wrap:pretty]">
                                    Clearance-ready engineers, rugged hardware, encrypted transport layers, and
                                    round-the-clock integration support so operators stay protected, informed, and
                                    empowered.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/contact">
                                    <Button className="w-full sm:w-auto bg-teal hover:bg-teal/90 text-cream font-semibold px-6 py-3">
                                        Engage our mission team
                                        <FaArrowRight className="ml-2" aria-hidden="true" />
                                    </Button>
                                </Link>
                                <Link href="/solutions">
                                    <Button
                                        variant="secondary"
                                        className="w-full sm:w-auto bg-transparent border border-cream/35 text-cream hover:bg-cream/10"
                                    >
                                        View mission stacks
                                    </Button>
                                </Link>
                            </div>
                        </motion.section>

                        {/* TILE 2 — READINESS METRICS */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-5 bg-cream rounded-2xl border border-charcoal/10 p-5 sm:p-6 lg:p-7 flex flex-col"
                            aria-labelledby="readiness-block"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p
                                        id="readiness-block"
                                        className="uppercase tracking-[0.25em] text-xs sm:text-sm text-charcoal/75"
                                    >
                                        Mission readiness
                                    </p>
                                    <p className="mt-2 text-sm text-charcoal/70">
                                        Performance baselines for live deployments.
                                    </p>
                                </div>
                                <span className="hidden sm:inline-block text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/35">
                  Updated quarterly
                </span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                                {readiness.map((item) => (
                                    <article
                                        key={item.label}
                                        className="rounded-xl border border-charcoal/5 bg-white p-3 sm:p-4"
                                    >
                                        <p className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.22em] text-charcoal/50">
                                            {item.label}
                                        </p>
                                        <p className="mt-2 text-xl sm:text-2xl font-condensed text-charcoal">
                                            {item.value}
                                        </p>
                                        <p className="mt-1 text-xs sm:text-sm text-charcoal/60">{item.detail}</p>
                                    </article>
                                ))}
                            </div>
                        </motion.section>

                        {/* TILE 3 — DOCTRINE / PRINCIPLES */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-4 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 flex flex-col gap-4"
                            aria-labelledby="doctrine-block"
                        >
                            <div>
                                <p
                                    id="doctrine-block"
                                    className="uppercase tracking-[0.3em] text-xs sm:text-sm text-forest"
                                >
                                    Our doctrine
                                </p>
                                <h3 className="mt-2 text-charcoal text-[1.05rem] font-condensed leading-tight">
                                    The mission is sacred. Every system protects lives.
                                </h3>
                            </div>
                            <ul className="space-y-3 text-sm text-charcoal/80">
                                <li className="flex gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-forest" aria-hidden="true" />
                                    Zero-failure posture in contested, GPS-denied, and signal-dense theaters.
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-forest" aria-hidden="true" />
                                    Operator-first engineering with rapid field feedback loops.
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-forest" aria-hidden="true" />
                                    Interoperable by design for joint, allied, and coalition deployments.
                                </li>
                            </ul>
                            <p className="mt-auto text-[0.65rem] uppercase tracking-[0.22em] text-charcoal/45">
                                Trusted by: allied commands, Tier-1 primes
                            </p>
                        </motion.section>

                        {/* TILE 4 — CAPABILITY MATRIX */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-8 bg-navy text-cream rounded-2xl border border-charcoal/45 p-5 sm:p-6 lg:p-7"
                            aria-labelledby="capabilities-block"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <p
                                        id="capabilities-block"
                                        className="uppercase tracking-[0.3em] text-xs sm:text-sm text-cream/85"
                                    >
                                        Capability matrix
                                    </p>
                                    <h3 className="mt-2 text-[1.3rem] font-condensed">
                                        Field-ready, interoperable, and clearance-aligned.
                                    </h3>
                                    <p className="mt-2 text-sm text-cream/65 max-w-xl">
                                        These are the pillars we deploy with partner commands to accelerate mission
                                        readiness.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                {capabilityMatrix.map((cap) => (
                                    <article
                                        key={cap.title}
                                        className="rounded-xl border border-cream/10 bg-charcoal/30 p-4 flex flex-col gap-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-navy/40 flex items-center justify-center">
                                                {cap.icon}
                                            </div>
                                            <h4 className="text-sm font-condensed">{cap.title}</h4>
                                        </div>
                                        <p className="text-xs sm:text-sm text-cream/75 leading-relaxed">{cap.copy}</p>
                                        <p className="text-[0.55rem] uppercase tracking-[0.2em] text-cream/40">
                                            Mission stack
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </motion.section>

                        {/* TILE 5 — OPERATIONAL TIMELINE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-4 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6"
                            aria-labelledby="timeline-block"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p
                                        id="timeline-block"
                                        className="uppercase tracking-[0.3em] text-xs sm:text-sm text-forest"
                                    >
                                        Operational timeline
                                    </p>
                                    <p className="mt-2 text-sm text-charcoal/75">
                                        A decade of reinforcing frontline resilience.
                                    </p>
                                </div>
                            </div>
                            <ol className="mt-4 space-y-4 border-l border-charcoal/10 pl-4">
                                {timeline.map((item, idx) => (
                                    <li key={item.year} className="relative">
                                        <span className="absolute -left-[0.55rem] top-1 h-2 w-2 rounded-full bg-teal" />
                                        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/50">
                                            {item.year}
                                        </p>
                                        <h4 className="text-sm text-charcoal font-semibold">{item.headline}</h4>
                                        <p className="text-xs text-charcoal/65 mt-1">{item.desc}</p>
                                        {idx !== timeline.length - 1 && (
                                            <span className="absolute -left-px top-5 h-5 w-px bg-charcoal/10" />
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </motion.section>

                        {/* TILE 6 — LEADERSHIP */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-8 bg-navy text-cream rounded-2xl border border-navy/45 p-5 sm:p-6 lg:p-7"
                            aria-labelledby="leadership-block"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <p
                                        id="leadership-block"
                                        className="uppercase tracking-[0.3em] text-xs sm:text-sm text-cream/85"
                                    >
                                        Leadership cohort
                                    </p>
                                    <h3 className="mt-2 text-[1.3rem] font-condensed">
                                        Combat-seasoned leadership, engineering-driven vision.
                                    </h3>
                                    <p className="mt-2 text-sm text-cream/70 max-w-xl">
                                        Doctrine meets product discipline, so every release maps to an operational
                                        reality.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                {leadership.map((person) => (
                                    <article
                                        key={person.name}
                                        className="rounded-xl border border-cream/20 bg-navy/15 p-4 flex flex-col gap-2"
                                    >
                                        <p className="text-[0.55rem] uppercase tracking-[0.25em] text-cream/60">
                                            {person.role}
                                        </p>
                                        <h4 className="text-base font-condensed">{person.name}</h4>
                                        <p className="text-xs text-cream/75 leading-relaxed">{person.bio}</p>
                                    </article>
                                ))}
                            </div>
                        </motion.section>

                        {/* TILE 7 — CTA */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-12 bg-forest text-cream rounded-2xl border border-forest/40 p-6 sm:p-7 text-center"
                            aria-labelledby="cta-block"
                        >
                            <p
                                id="cta-block"
                                className="uppercase tracking-[0.32em] text-xs sm:text-sm text-cream/90"
                            >
                                Sustained readiness
                            </p>
                            <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)] font-condensed leading-tight">
                                Deploy clearance-certified, mission-ready solutions.
                            </h3>
                            <p className="mt-3 text-sm sm:text-base text-cream/80 max-w-2xl mx-auto [text-wrap:pretty]">
                                Architect, deploy, and sustain end-to-end defense technology ecosystems with
                                TRINETHRA DEFENTECH — from encrypted edge compute to interoperable data fabrics.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/contact">
                                    <Button className="w-full sm:w-auto bg-teal hover:bg-teal/90 text-cream px-8 py-3 text-base font-semibold">
                                        Brief our specialists
                                        <FaArrowRight className="ml-2" aria-hidden="true" />
                                    </Button>
                                </Link>
                                <Link href="/solutions">
                                    <Button className="w-full sm:w-auto bg-transparent border border-cream/40 text-cream hover:bg-cream/10 px-8 py-3">
                                        Explore solutions
                                    </Button>
                                </Link>
                            </div>
                        </motion.section>
                    </motion.div>
                </div>
            </main>
        </Layout>
    );
}