"use client";

import React, { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import {
    FaBrain,
    FaNetworkWired,
    FaCodeBranch,
    FaShieldAlt,
    FaMedal,
    FaCertificate,
    FaRegClock,
    FaCheck,
    FaArrowRight,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

/**
 * TRINETHRA DEFENTECH — Certifications
 * Bento, rule-based, solid colors, responsive to all devices
 *
 * DESIGN RULES APPLIED
 * 1. No gradients, no conic/radial backgrounds, no scan effects.
 * 2. Colors restricted to: navy, charcoal, cream, forest, white, teal accents.
 * 3. All content sits inside a responsive bento grid:
 *    - mobile: 1 col
 *    - md: 2 cols
 *    - lg: 12 cols
 * 4. All tiles: rounded-2xl, border (low opacity), solid background.
 * 5. Tile padding = p-5 sm:p-6 lg:p-7
 * 6. Typography: caps labels with wide tracking; condensed headings.
 * 7. Motion: single fadeUp + stagger, guarded by prefers-reduced-motion.
 */

export default function Certifications() {
    const reduce = useReducedMotion();
    const [segment, setSegment] = useState<"all" | "professional" | "standards">("all");

    // motion
    const fadeUp = useMemo(
        () => ({
            hidden: { opacity: 0, y: reduce ? 0 : 16 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.38, ease: "easeOut" },
            },
        }),
        [reduce]
    );

    const stagger = useMemo(
        () => ({
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: reduce ? 0 : 0.1 },
            },
        }),
        [reduce]
    );

    // data
    const professionalCerts = [
        {
            icon: <FaBrain className="w-6 h-6 text-teal" aria-hidden="true" />,
            title: "AI Research Excellence",
            organization: "OpenAI Foundation",
            date: "Mar 2024",
            description: "Tactical AI for hardened defense systems & ISR workloads.",
            level: "LEVEL IV",
            code: "AI-SEC-024",
        },
        {
            icon: <FaNetworkWired className="w-6 h-6 text-teal" aria-hidden="true" />,
            title: "Neural Network Architecture",
            organization: "Deep Learning Institute",
            date: "Jan 2024",
            description: "Hardened neural networks for mission-critical applications.",
            level: "LEVEL V",
            code: "NN-DEF-124",
        },
        {
            icon: <FaCodeBranch className="w-6 h-6 text-teal" aria-hidden="true" />,
            title: "Open Source Contribution",
            organization: "Global OSS Alliance",
            date: "Ongoing",
            description: "Secure OSS frameworks for defense and aerospace delivery.",
            level: "ACTIVE",
            code: "OSS-CTB-089",
        },
    ] as const;

    const standards = [
        {
            title: "ISO 9001:2015",
            description: "Quality Management System for consistent delivery.",
            code: "QMS-001",
            status: "Verified",
        },
        {
            title: "AS9100D",
            description: "Aerospace grade quality and process discipline.",
            code: "AQS-100",
            status: "Verified",
        },
        {
            title: "ISO/IEC 27001",
            description: "Information Security Management for classified data.",
            code: "ISM-270",
            status: "Verified",
        },
        {
            title: "CMMC Level 5",
            description: "Cybersecurity maturity for US DoD suppliers.",
            code: "CMM-005",
            status: "In Review",
        },
        {
            title: "DO-178C",
            description: "Avionics software qualification and traceability.",
            code: "AVC-178",
            status: "Verified",
        },
        {
            title: "MIL-STD Compliance",
            description: "Multiple MIL-STD tests validated in labs.",
            code: "MIL-STD",
            status: "Verified",
        },
    ] as const;

    const audits = [
        {
            when: "Oct 2025",
            title: "Surveillance Audit",
            desc: "ISO 9001:2015 surveillance completed — zero non-conformities.",
            result: "PASS",
        },
        {
            when: "Jul 2025",
            title: "InfoSec Controls Review",
            desc: "ISO/IEC 27001 risk register, controls re-validation.",
            result: "PASS",
        },
        {
            when: "Feb 2025",
            title: "Process Capability Upgrade",
            desc: "AS9100D process capability raised to aerospace threshold.",
            result: "PASS",
        },
    ] as const;

    const kpis = [
        { label: "Professional", value: professionalCerts.length, hint: "active creds" },
        { label: "Standards", value: standards.length, hint: "industry" },
        { label: "Audits (12 mo)", value: audits.length, hint: "recent" },
        { label: "On-time", value: "100%", hint: "renewals" },
    ] as const;

    const lastUpdated = useMemo(
        () =>
            new Date().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        []
    );

    return (
        <Layout
            title="Certifications & Compliance | TRINETHRA DEFENTECH"
            description="A structured, audit-friendly view of our certifications, standards, and surveillance audits."
            pageType="certifications"
        >
            <main className="min-h-screen bg-cream pt-[max(5.5rem,env(safe-area-inset-top))] pb-16">
                <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 lg:px-10">
                    {/* PAGE HEADER */}
                    <header className="mb-8 sm:mb-10">
                        <p className="uppercase tracking-[0.34em] text-xs sm:text-sm text-forest flex items-center gap-2">
                            <FaShieldAlt className="text-forest" aria-hidden="true" />
                            Certifications & Compliance
                        </p>
                        <h1 className="mt-3 text-[clamp(2rem,4.1vw,3.25rem)] leading-tight font-condensed text-charcoal">
                            Mission-ready credentials, inspection-friendly layout.
                        </h1>
                        <p className="mt-4 max-w-3xl text-charcoal/75 text-sm sm:text-base [text-wrap:pretty]">
                            This registry captures professional qualifications, international standards, and audit
                            cycles that support our defense-technology deliverables. Everything is structured so
                            procurement teams, allied partners, and compliance officers can verify quickly.
                        </p>
                    </header>

                    {/* BENTO GRID */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5"
                    >
                        {/* HERO / OVERVIEW TILE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-7 bg-navy text-cream rounded-2xl border border-navy/40 p-5 sm:p-6 lg:p-7 flex flex-col gap-5"
                            aria-labelledby="cert-hero"
                        >
                            <div className="space-y-3">
                                <p
                                    id="cert-hero"
                                    className="uppercase tracking-[0.35em] text-xs sm:text-sm text-cream/85"
                                >
                                    Mission-aligned certifications
                                </p>
                                <h2 className="text-[clamp(1.5rem,3vw,2.3rem)] font-condensed leading-tight">
                                    Certified to international, aerospace, and defense-grade standards.
                                </h2>
                                <p className="text-sm sm:text-base text-cream/75 max-w-2xl">
                                    Built for scrutiny: every certificate is mapped to an audit cycle, and every audit
                                    feeds back into our process capability models.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-cream/10 px-3 py-1 text-xs tracking-[0.15em]">
                  ISO / AS9100D / 27001
                </span>
                                <span className="inline-flex items-center rounded-full bg-cream/10 px-3 py-1 text-xs tracking-[0.15em]">
                  Mission-critical AI certs
                </span>
                                <span className="inline-flex items-center rounded-full bg-cream/10 px-3 py-1 text-xs tracking-[0.15em]">
                  Audit-ready
                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="w-full sm:w-auto bg-teal hover:bg-teal/90 text-cream font-semibold px-6 py-3">
                                    Request dossier
                                    <FaArrowRight className="ml-2" aria-hidden="true" />
                                </Button>
                                <Button className="w-full sm:w-auto border border-cream/40 bg-transparent text-cream hover:bg-cream/10">
                                    View audit trail
                                </Button>
                            </div>
                        </motion.section>

                        {/* KPI TILE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-5 bg-cream rounded-2xl border border-charcoal/10 p-5 sm:p-6 lg:p-7 flex flex-col"
                            aria-label="Certification KPIs"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-charcoal/70">
                                        Current posture
                                    </p>
                                    <p className="text-sm text-charcoal/55">Snapshot for due diligence</p>
                                </div>
                                <p className="text-[0.7rem] font-mono text-charcoal/40 tracking-wide">
                                    Updated: {lastUpdated}
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                                {kpis.map((kpi) => (
                                    <article
                                        key={kpi.label}
                                        className="rounded-xl border border-charcoal/5 bg-white p-3 sm:p-4 flex flex-col gap-1"
                                    >
                                        <p className="text-[0.55rem] uppercase tracking-[0.22em] text-charcoal/50">
                                            {kpi.label}
                                        </p>
                                        <p className="text-2xl font-condensed text-charcoal">{kpi.value}</p>
                                        <p className="text-xs text-charcoal/55">{kpi.hint}</p>
                                    </article>
                                ))}
                            </div>

                            {/* segment controls */}
                            <div
                                className="mt-5 flex flex-wrap gap-2"
                                role="tablist"
                                aria-label="Filter certification view"
                            >
                                {["all", "professional", "standards"].map((key) => {
                                    const active = segment === key;
                                    return (
                                        <button
                                            key={key}
                                            role="tab"
                                            aria-selected={active}
                                            onClick={() => setSegment(key as typeof segment)}
                                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono tracking-widest 
                        ${
                                                active
                                                    ? "bg-teal/15 border-teal/40 text-teal"
                                                    : "bg-white border-charcoal/10 text-charcoal/80 hover:bg-charcoal/5"
                                            }`}
                                        >
                                            {key.toUpperCase()}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.section>

                        {/* PROFESSIONAL CERTIFICATIONS PANEL */}
                        {(segment === "all" || segment === "professional") && (
                            <motion.section
                                variants={fadeUp}
                                className="lg:col-span-7 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 lg:p-7"
                                aria-labelledby="professional-certs"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                    <div>
                                        <p
                                            id="professional-certs"
                                            className="uppercase tracking-[0.3em] text-xs sm:text-sm text-forest"
                                        >
                                            Professional certifications
                                        </p>
                                        <p className="text-sm text-charcoal/70">
                                            Operator, AI, and mission stack competencies.
                                        </p>
                                    </div>
                                    <p className="text-[0.7rem] font-mono text-charcoal/45 tracking-wide">
                                        Last updated: {lastUpdated}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {professionalCerts.map((cert) => (
                                        <article
                                            key={cert.code}
                                            className="rounded-xl border border-charcoal/10 bg-cream/40 p-4 flex flex-col gap-3"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 rounded bg-teal/10 border border-teal/35 px-2 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-teal">
                          <FaMedal aria-hidden="true" />
                            {cert.level}
                        </span>
                                                <span className="text-[0.6rem] font-mono text-charcoal/40 tracking-wide">
                          {cert.code}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-charcoal/5">
                                                    {cert.icon}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-sm font-condensed text-charcoal leading-tight uppercase">
                                                        {cert.title}
                                                    </h3>
                                                    <p className="text-[0.7rem] text-charcoal/60">{cert.organization}</p>
                                                </div>
                                            </div>
                                            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-teal/80 font-mono">
                                                {cert.date}
                                            </p>
                                            <p className="text-sm text-charcoal/75 leading-relaxed">
                                                {cert.description}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* STANDARDS PANEL */}
                        {(segment === "all" || segment === "standards") && (
                            <motion.section
                                variants={fadeUp}
                                className="lg:col-span-5 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 lg:p-7"
                                aria-labelledby="standards-block"
                            >
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-9 w-9 rounded-full bg-teal/15 border border-teal/40 flex items-center justify-center">
                                            <FaCertificate className="text-teal" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p
                                                id="standards-block"
                                                className="uppercase tracking-[0.3em] text-xs sm:text-sm text-charcoal/90 leading-none"
                                            >
                                                Standards compliance
                                            </p>
                                            <p className="text-[0.7rem] text-charcoal/50">
                                                {String(standards.length).padStart(2, "0")} active
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[0.7rem] font-mono text-charcoal/45 tracking-wide whitespace-nowrap">
                                        For procurement
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {standards.map((std) => (
                                        <article
                                            key={std.code}
                                            className="rounded-xl border border-charcoal/5 bg-cream/50 p-4 flex flex-col gap-2"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-sm font-condensed text-charcoal leading-tight uppercase">
                                                    {std.title}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[0.6rem] font-mono tracking-[0.25em] ${
                                                        std.status === "Verified"
                                                            ? "bg-teal/10 text-teal border border-teal/30"
                                                            : "bg-forest/10 text-forest border border-forest/30"
                                                    }`}
                                                >
                          <FaCheck aria-hidden="true" className="h-3 w-3" />
                                                    {std.status}
                        </span>
                                            </div>
                                            <p className="text-xs text-charcoal/70 leading-relaxed">{std.description}</p>
                                            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-charcoal/40">
                                                CODE: {std.code}
                                            </p>
                                        </article>
                                    ))}
                                </div>

                                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-charcoal/10 pt-4">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-2 w-2 rounded-full bg-teal shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                                        <p className="text-[0.7rem] font-mono tracking-[0.25em] text-charcoal/60">
                                            All systems operational
                                        </p>
                                    </div>
                                    <p className="text-[0.7rem] font-mono text-charcoal/45 tracking-wide flex items-center gap-1">
                                        <FaRegClock aria-hidden="true" />
                                        Last updated: {lastUpdated}
                                    </p>
                                </div>
                            </motion.section>
                        )}

                        {/* AUDIT TIMELINE */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-5 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 lg:p-7"
                            aria-labelledby="audit-timeline"
                        >
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <p
                                        id="audit-timeline"
                                        className="uppercase tracking-[0.3em] text-xs sm:text-sm text-charcoal/90"
                                    >
                                        Audit & surveillance trail
                                    </p>
                                    <p className="text-[0.8rem] text-charcoal/60">last 12 months</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute left-3 top-0 bottom-0 w-px bg-charcoal/10" aria-hidden />
                                <ul className="space-y-3">
                                    {audits.map((audit, idx) => (
                                        <li key={idx} className="relative pl-7">
                                            <span className="absolute left-[0.4rem] top-2 h-2.5 w-2.5 rounded-full bg-teal shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                                            <article className="rounded-xl border border-charcoal/5 bg-cream/40 p-3">
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                                    <p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-teal/80">
                                                        {audit.when}
                                                    </p>
                                                    <span className="inline-flex items-center gap-1 rounded bg-teal/10 border border-teal/30 px-2 py-0.5 text-[0.6rem] font-mono tracking-[0.2em] text-teal">
                            {audit.result}
                          </span>
                                                </div>
                                                <h3 className="text-sm font-condensed text-charcoal leading-tight">
                                                    {audit.title}
                                                </h3>
                                                <p className="text-xs text-charcoal/70 mt-1">{audit.desc}</p>
                                            </article>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.section>

                        {/* FAQ / NOTES */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-7 bg-white rounded-2xl border border-charcoal/10 p-5 sm:p-6 lg:p-7"
                            aria-labelledby="cert-faq"
                        >
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <p
                                        id="cert-faq"
                                        className="uppercase tracking-[0.3em] text-xs sm:text-sm text-charcoal/90"
                                    >
                                        Notes & FAQs
                                    </p>
                                    <p className="text-sm text-charcoal/60">
                                        For procurement, OEM partners, and government entities.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <article className="rounded-xl border border-charcoal/5 bg-cream/30 p-4">
                                    <h3 className="text-sm font-condensed text-charcoal uppercase mb-1">
                                        How often are certifications renewed?
                                    </h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed">
                                        Professional certs → yearly. ISO 9001 → annual surveillance, full
                                        re-certification every 3 years. AS9100D → as per aerospace cadence.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-charcoal/5 bg-cream/30 p-4">
                                    <h3 className="text-sm font-condensed text-charcoal uppercase mb-1">
                                        Can I request proof?
                                    </h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed">
                                        Yes. Authorized stakeholders can request digitally signed PDF copies (under
                                        NDA). Integrate a guarded download route in your app.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-charcoal/5 bg-cream/30 p-4">
                                    <h3 className="text-sm font-condensed text-charcoal uppercase mb-1">
                                        Do you support OEM audits?
                                    </h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed">
                                        We host on-site and remote OEM audits. Our process owners will map your
                                        checklist to our QMS before the session.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-charcoal/5 bg-cream/30 p-4">
                                    <h3 className="text-sm font-condensed text-charcoal uppercase mb-1">
                                        What about export controls?
                                    </h3>
                                    <p className="text-sm text-charcoal/70 leading-relaxed">
                                        Defense exports and controlled tech are handled via separate gated workflow and
                                        partner approvals.
                                    </p>
                                </article>
                            </div>
                        </motion.section>

                        {/* CTA */}
                        <motion.section
                            variants={fadeUp}
                            className="lg:col-span-12 bg-forest text-cream rounded-2xl border border-forest/40 p-6 sm:p-7 text-center"
                            aria-labelledby="cert-cta"
                        >
                            <p
                                id="cert-cta"
                                className="uppercase tracking-[0.32em] text-xs sm:text-sm text-cream/90"
                            >
                                Formal compliance kit
                            </p>
                            <h2 className="mt-3 text-[clamp(1.6rem,3.3vw,2.4rem)] font-condensed leading-tight">
                                Need a consolidated, auditor-friendly dossier?
                            </h2>
                            <p className="mt-3 text-sm sm:text-base text-cream/80 max-w-3xl mx-auto">
                                We can deliver a single pack that includes professional certs, standards, audit
                                results, and attestations — ready to be attached to your RFP/contract workflow.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                                <Button className="w-full sm:w-auto bg-teal hover:bg-teal/90 text-cream px-8 py-3 text-base font-semibold">
                                    Request credentials pack
                                    <FaArrowRight className="ml-2" aria-hidden="true" />
                                </Button>
                                <Button className="w-full sm:w-auto bg-transparent border border-cream/40 text-cream hover:bg-cream/10 px-8 py-3">
                                    Talk to compliance
                                </Button>
                            </div>
                        </motion.section>
                    </motion.div>
                </div>
            </main>
        </Layout>
    );
}