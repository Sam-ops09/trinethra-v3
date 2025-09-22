import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import { FaCheck, FaArrowLeft, FaSearch } from "react-icons/fa";
import { Link, useRoute } from "wouter";

/**
 * TRINETHRA DEFENTECH — Solutions (Segmented Chips + Compare with Mobile Sheet)
 * - No horizontal scroll; chips auto-wrap.
 * - Quick compare: desktop/tablet = two-up grid; mobile = bottom sheet (same page).
 * - a11y: proper roles/labels, keyboard nav, focus management.
 */

/* ---------------- Types ---------------- */
interface Product { name: string; features: string[]; specs: Record<string, string>; }
interface SolutionBase {
    id: string; title: string; description: string; fullDescription: string;
    mainQuestion: string; mainAnswer: string; certifications: string[];
    imagePlaceholder: string; features: string[]; applications: string[];
}
interface EdgeAISolution extends SolutionBase { products: Product[] }
type Solution = EdgeAISolution | SolutionBase;
const isEdgeAISolution = (s: Solution): s is EdgeAISolution =>
    (s.id === "server" || s.id === "storage-solutions" || s.id === "cable-harness" || s.id === "panel-pc") && "products" in s;

/* ---------------- Data (same content) ---------------- */
const solutionDetails: Record<string, Solution> = {
    "cable-harness": {
        id: "cable-harness",
        title: "Cable Harness",
        description: "Rugged interconnect and network distribution assemblies for mission platforms.",
        fullDescription:
            "Our Cable Harness solutions integrate ruggedized switching and connectivity components, ensuring reliable signal and data distribution across harsh operational environments. Leveraging tactical-grade designs, they deliver resilience against shock, vibration, temperature extremes, and electromagnetic interference.",
        mainQuestion: "Is a Cable Harness solution right for you?",
        mainAnswer:
            "If your platform requires secure, reliable, and hardened connectivity for sensors, compute nodes, and tactical networks, our Cable Harness solutions ensure sustained performance in demanding missions.",
        certifications: ["MIL-STD-461G", "MIL-STD-810G", "MIL-STD-1275E", "FIPS 140-2"],
        imagePlaceholder: "Cable Harness System",
        features: [
            "Ruggedized tactical-grade connectivity",
            "Low-loss, EMI-shielded assemblies",
            "Modular harness design for field upgrades",
            "MIL circular & sealed I/O interfaces",
            "Optimized for size, weight & power (SWaP)",
        ],
        applications: [
            "Armored & tactical vehicles",
            "Mobile command nodes",
            "Sensor & ISR pod integration",
            "Unmanned platforms wiring systems",
        ],
        products: [
            {
                name: "Tactical XR-7",
                features: [
                    "Military-grade switch for battlefield communications",
                    "Enhanced Security Protocols",
                    "Military-grade encryption and secure boot capabilities",
                    "Seamlessly integrates with existing defense infrastructure",
                    "Quick setup and configuration for time-critical missions",
                ],
                specs: {
                    "Operating Temperature": "-40°C to +85°C",
                    "Power Input": "9-36V DC with surge protection",
                    Encryption: "AES-256, FIPS 140-2 compliant",
                    Ports: "8x 1G/10G SFP+, 2x 40G QSFP+",
                    "Environmental Rating": "IP67, MIL-STD-810G",
                },
            },
            {
                name: "SecureNet Pro",
                features: [
                    "Encrypted network switch for command centers",
                    "Advanced AES-256 encryption for all traffic",
                    "Integrated intrusion detection and prevention",
                    "Zero-trust network architecture support",
                    "Hardware-based security modules",
                ],
                specs: {
                    "Operating Temperature": "-40°C to +85°C",
                    "Power Input": "9-36V DC with surge protection",
                    Encryption: "AES-256, FIPS 140-2 compliant",
                    Ports: "8x 1G/10G SFP+, 2x 40G QSFP+",
                    "Security Certification": "Common Criteria EAL4+",
                },
            },
            {
                name: "FieldOps Switch",
                features: [
                    "Ruggedized for extreme environmental conditions",
                    "Built to withstand extreme temperatures, shock, and vibration",
                    "EMI/RFI shielding for electromagnetic interference protection",
                    "Dust and waterproof enclosure (IP67 rated)",
                    "Redundant power supplies with hot-swap capability",
                ],
                specs: {
                    "Operating Temperature": "-40°C to +85°C",
                    "Power Input": "9-36V DC with surge protection",
                    Protection: "EMI/EMC MIL-STD-461G compliant",
                    "Vibration/Shock": "MIL-STD-810G certified",
                    "Environmental Rating": "IP67 waterproof",
                },
            },
        ],
    },
    "storage-solutions": {
        id: "storage-solutions",
        title: "Storage Solutions",
        description: "Rugged, secure storage platforms for edge and tactical deployments.",
        fullDescription:
            "Our Storage Solutions portfolio preserves data integrity in contested and extreme environments. With high-capacity removable and encrypted media, these systems enable rapid forensic extraction, long-duration ISR capture, and secure mission playback.",
        mainQuestion: "Do you require mission-resilient storage performance?",
        mainAnswer:
            "If your operations demand secure, high-capacity, and tamper-resistant data handling across temperature and shock extremes, these systems deliver uncompromising reliability.",
        certifications: ["MIL-STD-461F", "MIL-STD-810H", "AES-256", "FIPS 140"],
        imagePlaceholder: "Rugged Storage",
        features: [
            "AES-256 hardware encryption",
            "Wide thermal operating range (-40°C to +85°C)",
            "Removable sealed media options",
            "High sustained write throughput",
            "Shock & vibration isolation mounting",
        ],
        applications: [
            "ISR & sensor data logging",
            "Secure intelligence retention",
            "Deployable command systems",
            "Mission data exfiltration",
        ],
        products: [
            {
                name: "FORTRESS-X1",
                features: [
                    "Military-grade encrypted storage solution for mission-critical data",
                    "MIL-STD-810H certified",
                    "AES-256 bit encryption",
                    "Tamper-resistant hardware",
                    "Operational temperature: -40°C to +85°C",
                ],
                specs: {
                    Certification: "MIL-STD-810H",
                    Encryption: "AES-256 bit",
                    Protection: "IP68 water and dust resistance",
                    Temperature: "-40°C to +85°C",
                    Security: "Tamper-resistant hardware",
                },
            },
        ],
    },
    server: {
        id: "server",
        title: "Server",
        description: "Edge-ready compute platforms optimized for AI inference & secure processing.",
        fullDescription:
            "Our Server-class edge platforms deliver rugged, SWaP-optimized compute designed for onboard analytics, sensor fusion, and secure mission execution. Built for forward-deployed use where latency, reliability, and survivability matter most.",
        mainQuestion: "Is an Edge Server right for you?",
        mainAnswer:
            "If you need real-time, on-platform processing with secure, rugged performance without excess complexity, our Server solutions are engineered for you.",
        certifications: ["MIL-STD-810H", "DO-160G", "MIL-STD-810"],
        imagePlaceholder: "Edge Server",
        features: [
            "Low-latency AI inference",
            "Ruggedized conduction-cooled design",
            "Military-grade encryption",
            "Offline autonomous operation",
            "Modular I/O expansion",
        ],
        applications: [
            "Unmanned system autonomy",
            "On-board sensor fusion",
            "Field ISR analytics",
            "Forward mission planning",
        ],
        products: [
            {
                name: "CAR",
                features: [
                    "Perfect For Atritable Systems, Combining Small Form Factor With High Performance",
                    "2 TB Fixed Storage Or Up To 512 GB Of Removable CFast Storage",
                    "Modular Linux Based Open Architecture",
                    "Standard: 2x 1 GbE",
                    "GNSS/GPS Receiver (W/ Disable Feature)",
                ],
                specs: {
                    "Size / Weight": "1.8\" H x 4.8\" W x 6.8\" D\n2 lbs",
                    Speed: "200 MB/sec",
                    Storage: "2 TB",
                    Interfaces: "2x GbE Audio GPS",
                    Security: "Self Encrypting Drive",
                },
            },
        ],
    },
    "panel-pc": {
        id: "panel-pc",
        title: "Panel PC",
        description: "Rugged human–machine interface (HMI) terminals for situational control.",
        fullDescription:
            "Panel PC solutions provide hardened operator interfaces with sunlight-readable displays, sealed touch input, and integrated compute for command, control, and monitoring functions in mobile and fixed defense environments.",
        mainQuestion: "Is a Panel PC right for your operation?",
        mainAnswer:
            "If you require an integrated, sealed, and mission-resilient interface for operators in harsh environments, a Panel PC enhances usability while maintaining security and durability.",
        certifications: ["MIL-STD-810", "IP65", "EMI Shielded"],
        imagePlaceholder: "Panel PC",
        features: [
            "Sunlight-readable display",
            "Sealed touch input",
            "Shock & vibration resistant",
            "Wide temp operating range",
            "Configurable bezel & mounting",
        ],
        applications: [
            "Vehicle operator consoles",
            "Shipboard control stations",
            "Industrial/military HMIs",
            "Portable mission control kits",
        ],
        products: [
            {
                name: "Sentinel HMI-12",
                features: [
                    '12" 1000 nit sunlight-readable LCD (optically bonded)',
                    "Glove & moisture compatible capacitive touch",
                    "Wide temp operation -40°C to +70°C",
                    "Sealed IP65 front panel with EMI gasketing",
                    "TPM 2.0 & secure boot enabled firmware",
                ],
                specs: {
                    Display: '12" 1000 nit, optical bonding, AR/AG coating',
                    Resolution: "1920 x 1080",
                    Touch: "Projected capacitive (glove capable)",
                    "CPU Module": "Modular ARM / x86 swappable compute",
                    "I/O": "2x GbE, 2x USB 3.0, RS-232/422/485, CAN",
                    Storage: "Removable NVMe (AES-256 options)",
                    Power: "9–36 VDC isolated, surge & reverse protection",
                    Environmental: "MIL-STD-810, IP65 (front), MIL-STD-461 EMI",
                    Security: "TPM 2.0, Secure Boot, Signed FW",
                },
            },
        ],
    },
};

/* ---------------- UI primitives ---------------- */
const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[11px] sm:text-xs font-medium bg-forest/10 text-forest px-2 py-1 rounded-full whitespace-nowrap">
    {children}
  </span>
);
const Divider = () => <div className="h-px w-full bg-gray-200 my-6" aria-hidden="true" />;
const KeyValue = ({ k, v }: { k: string; v: string }) => (
    <div className="py-2 border-b border-gray-200 last:border-0 min-w-0">
        <div className="font-medium text-navy text-[10px] sm:text-[11px] uppercase tracking-wide mb-0.5">{k}</div>
        <div className="text-charcoal/80 whitespace-pre-line text-sm">{v}</div>
    </div>
);
const Section = ({ id, title, children }: { id: string; title?: string; children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-[88px] lg:scroll-mt-[112px] min-w-0">
        {title && (
            <h2 className="font-condensed font-bold mb-4 text-navy leading-snug [text-wrap:balance] text-[clamp(1.1rem,3.5vw,1.6rem)]">
                {title}
            </h2>
        )}
        {children}
    </section>
);

/* ---------------- Segmented Chips + Compare (with Mobile Sheet) ---------------- */
function ProductTabs({ products }: { products: Product[] }) {
    const [active, setActive] = useState(0);
    const [compareMode, setCompareMode] = useState(false);
    const [second, setSecond] = useState<number | null>(null);

    // viewport helper (sm breakpoint)
    const [isMobile, setIsMobile] = useState<boolean>(() =>
        typeof window !== "undefined" ? window.matchMedia("(max-width: 639.98px)").matches : false
    );
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639.98px)");
        const handler = (e: MediaQueryListEvent | MediaQueryList) =>
            setIsMobile("matches" in e ? (e as MediaQueryListEvent).matches : (e as MediaQueryList).matches);
        // initial sync and subscribe
        handler(mq);
        mq.addEventListener?.("change", handler as (e: MediaQueryListEvent) => void);
        return () => mq.removeEventListener?.("change", handler as (e: MediaQueryListEvent) => void);
    }, []);

    const inCompare = compareMode && second !== null;

    // mobile sheet state
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
    const [mobileIdx, setMobileIdx] = useState<0 | 1>(0);
    const firstFocusRef = useRef<HTMLButtonElement | null>(null);

    // open/close sheet based on mode/device
    useEffect(() => {
        if (isMobile && inCompare) {
            setMobileSheetOpen(true);
            setTimeout(() => firstFocusRef.current?.focus(), 0);
            document.body.style.overflow = "hidden";
        } else {
            setMobileSheetOpen(false);
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobile, inCompare]);

    const handlePick = (i: number) => {
        if (!compareMode) {
            setActive(i);
            return;
        }
        if (i === active) return;
        setSecond((prev) => (prev === i ? null : i));
    };

    // keyboard nav for chips
    const onKeyDown = (i: number, e: React.KeyboardEvent) => {
        const n = products.length;
        const go = (j: number) => {
            const next = (j + n) % n;
            if (!compareMode) setActive(next);
            else handlePick(next);
            (document.getElementById(`chip-${next}`) as HTMLButtonElement | null)?.focus();
        };
        switch (e.key) {
            case "ArrowRight": e.preventDefault(); go(i + 1); break;
            case "ArrowLeft":  e.preventDefault(); go(i - 1); break;
            case "Home":       e.preventDefault(); go(0); break;
            case "End":        e.preventDefault(); go(n - 1); break;
        }
    };

    const primary = products[active];
    const secondary = second !== null ? products[second] : null;

    // shared product panel
    const ProductPanel = ({ prod }: { prod: Product }) => (
        <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6 sm:gap-8">
                {/* Media */}
                <div className="flex justify-center items-center bg-gray-50 rounded-md p-4 sm:p-6">
                    <div className="relative w-full max-w-md">
                        <div className="aspect-[4/3] sm:aspect-[16/9] bg-navy/5 rounded-lg grid place-items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-navy/10 grid place-items-center">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="2" y="6" width="20" height="12" rx="2"/>
                                </svg>
                            </div>
                        </div>
                        <h4 className="mt-3 text-center text-[clamp(0.95rem,2.5vw,1.05rem)] font-condensed font-bold text-navy">
                            Image Placeholder
                        </h4>
                    </div>
                </div>

                {/* Text */}
                <div className="min-w-0">
                    <h5 className="font-condensed text-forest font-bold mb-3 uppercase text-[11px] tracking-wide">Key Features</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-6" aria-label="Key product features">
                        {prod.features.slice(0, 6).map((f, idx) => (
                            <li key={idx} className="flex items-start text-[clamp(0.9rem,2.4vw,1rem)]">
                                <span className="text-forest mt-1 mr-2">•</span>
                                <span className="text-charcoal/80">{f}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-gray-50 rounded-md p-4">
                        {Object.entries(prod.specs).map(([k, v]) => (
                            <div key={k} className="py-2 border-b border-gray-200 last:border-0">
                                <div className="font-medium text-[11px] uppercase tracking-wide text-navy">{k}</div>
                                <div className="text-sm text-charcoal/80 whitespace-pre-line">{v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="mb-10 md:mb-14">
            {/* Header + toggle */}
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                <h3 className="font-semibold text-navy text-[clamp(1rem,2.6vw,1.125rem)]">Products</h3>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
                    <input
                        type="checkbox"
                        className="accent-forest h-4 w-4"
                        checked={compareMode}
                        onChange={(e) => { setCompareMode(e.target.checked); setSecond(null); }}
                    />
                    Quick compare
                </label>
            </div>

            {/* Segmented chips (auto-wrap) */}
            <div
                role={compareMode ? "toolbar" : "tablist"}
                aria-label="Choose product"
                className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
                {products.map((p, i) => {
                    const selected = !compareMode ? i === active : (i === active || i === second);
                    return (
                        <button
                            key={i}
                            id={`chip-${i}`}
                            role={compareMode ? undefined : "tab"}
                            aria-selected={!compareMode ? i === active : undefined}
                            aria-pressed={compareMode ? selected : undefined}
                            tabIndex={!compareMode ? (i === active ? 0 : -1) : 0}
                            onKeyDown={(e) => onKeyDown(i, e)}
                            onClick={() => handlePick(i)}
                            className={`px-3 py-2.5 rounded-full text-sm font-medium transition
                inline-flex items-center justify-center gap-2 w-full
                ${selected ? "bg-forest text-white shadow-sm" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
              `}
                            title={p.name}
                        >
                            {compareMode && (
                                <span
                                    className={`h-2.5 w-2.5 rounded-full border ${selected ? "bg-white/90 border-white/90" : "border-gray-400"}`}
                                    aria-hidden
                                />
                            )}
                            <span className="truncate">{p.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* Panels */}
            {!compareMode && (
                <ProductPanel prod={primary} />
            )}

            {/* Desktop/tablet compare: two-up */}
            {compareMode && inCompare && !isMobile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProductPanel prod={primary} />
                    <div className="relative">
                        <button
                            onClick={() => { setActive(second!); setSecond(active); }}
                            className="absolute right-2 top-2 text-xs px-2 py-1 rounded border border-gray-300 bg-white/90 hover:bg-gray-100"
                            aria-label={`Swap ${products[second!].name} with ${products[active].name}`}
                        >
                            Swap
                        </button>
                        <ProductPanel prod={secondary!} />
                    </div>
                </div>
            )}

            {/* Mobile compare: bottom sheet (same page) */}
            {compareMode && inCompare && isMobile && mobileSheetOpen && (
                <div role="dialog" aria-modal="true" aria-label="Compare products" className="fixed inset-0 z-40">
                    {/* Backdrop */}
                    <button
                        aria-label="Close compare"
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileSheetOpen(false)}
                    />
                    {/* Sheet */}
                    <div className="absolute inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white border-t border-gray-200 shadow-xl max-h-[88vh] overflow-auto">
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    ref={firstFocusRef}
                                    onClick={() => setMobileSheetOpen(false)}
                                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                                >
                                    Close
                                </button>
                                <div className="ml-1 text-sm text-gray-700">Quick compare</div>
                            </div>
                            <div className="inline-flex bg-gray-100 p-1 rounded-full">
                                <button
                                    className={`px-3 py-1.5 text-sm rounded-full ${mobileIdx === 0 ? "bg-white shadow" : "opacity-70"}`}
                                    onClick={() => setMobileIdx(0)}
                                    aria-pressed={mobileIdx === 0}
                                >
                                    {primary.name}
                                </button>
                                <button
                                    className={`px-3 py-1.5 text-sm rounded-full ${mobileIdx === 1 ? "bg-white shadow" : "opacity-70"}`}
                                    onClick={() => setMobileIdx(1)}
                                    aria-pressed={mobileIdx === 1}
                                >
                                    {secondary!.name}
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            {mobileIdx === 0 ? (
                                <ProductPanel prod={primary} />
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => { setActive(second!); setSecond(active); setMobileIdx(0); }}
                                        className="absolute right-3 top-3 text-xs px-2 py-1 rounded border border-gray-300 bg-white/90 hover:bg-gray-100"
                                        aria-label={`Make ${secondary!.name} primary`}
                                    >
                                        Make primary
                                    </button>
                                    <ProductPanel prod={secondary!} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---------------- Sticky TOC ---------------- */
function StickyTOC({ sections }: { sections: { id: string; label: string }[] }) {
    const [active, setActive] = useState(sections[0]?.id);
    useEffect(() => {
        const obs = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-60% 0px -35% 0px", threshold: [0, 1] }
        );
        sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, [sections]);

    return (
        <nav aria-label="On this page" className="hidden lg:block lg:sticky lg:top-28">
            <ul className="space-y-1">
                {sections.map((s) => (
                    <li key={s.id}>
                        <a
                            href={`#${s.id}`}
                            aria-current={active === s.id ? "true" : undefined}
                            onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                            className={`block text-sm px-3 py-2 rounded-md transition-colors ${active === s.id ? "bg-forest/10 text-forest" : "text-gray-700 hover:bg-gray-100"}`}
                        >
                            {s.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

/* ---------------- Solution Detail ---------------- */
function SolutionDetail() {
    const [, params] = useRoute("/solutions/:solutionId");
    const reduce = useReducedMotion();
    const legacy: Record<string, string> = { "edge-ai": "server", "data-storage": "storage-solutions", switches: "cable-harness" };
    const rawId = params?.solutionId as string | undefined;
    const mappedId = rawId && legacy[rawId] ? legacy[rawId] : rawId;
    const solution = mappedId ? solutionDetails[mappedId] : undefined;

    if (!solution) {
        return (
            <Layout>
                <div className="py-20 px-4">
                    <h1 className="text-[clamp(1.4rem,4vw,2rem)] font-bold mb-6 text-forest">Solution not found</h1>
                    <Link href="/solutions" className="text-teal hover:text-teal/80 inline-flex items-center font-medium">
                        <FaArrowLeft className="mr-2" /> Back to All Solutions
                    </Link>
                </div>
            </Layout>
        );
    }

    const fade = {
        hidden: { opacity: 0, y: reduce ? 0 : 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    } as const;

    const toc = useMemo(
        () => [
            { id: "overview", label: "Overview" },
            { id: "features", label: "Key Features" },
            { id: "applications", label: "Applications" },
            ...(isEdgeAISolution(solution) ? [{ id: "products", label: "Products" }, { id: "product-details", label: "Product Details" }] : []),
        ],
        [solution]
    );

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: solution.title,
        description: solution.fullDescription,
        brand: { "@type": "Brand", name: "TRINETHRA DEFENTECH" },
        category: "Defense Technology",
        manufacturer: { "@type": "Organization", name: "TRINETHRA DEFENTECH" },
        offers: { "@type": "Offer", url: "https://trinethra-defentech.com/contact", availability: "https://schema.org/InStock" },
        additionalProperty: solution.features.map((value) => ({ "@type": "PropertyValue", name: "Feature", value })),
    };

    return (
        <Layout
            title={`${solution.title} | TRINETHRA DEFENTECH Advanced Defense Technology`}
            description={`${solution.fullDescription.substring(0, 150)}... Engineered for mission-critical defense and security operations.`}
            keywords={`${solution.title}, TRINETHRA DEFENTECH, ${solution.certifications.join(", ")}, defense technology, military-grade solutions`}
            ogType="product"
            structuredData={JSON.stringify(schema)}
            pageType="solution"
            solutionName={solution.title}
            solutionCategory="Defense Technology"
        >
            <section className="bg-gray-50 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20" aria-labelledby="solution-heading">
                <div className="px-4 sm:px-6 md:px-8">
                    <div className="max-w-6xl mx-auto min-w-0">
                        {/* Breadcrumbs */}
                        <div className="mb-4 sm:mb-6" aria-label="Breadcrumb">
                            <ol className="flex items-center text-sm text-gray-600 gap-2 flex-wrap">
                                <li><Link href="/" className="hover:underline">Home</Link></li>
                                <li aria-hidden>›</li>
                                <li><Link href="/solutions" className="hover:underline">Solutions</Link></li>
                                <li aria-hidden>›</li>
                                <li aria-current="page" className="text-gray-900 font-medium">{solution.title}</li>
                            </ol>
                        </div>

                        {/* Top layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] gap-10 min-w-0">
                            <div className="min-w-0">
                                <div id="overview" className="scroll-mt-[88px] lg:scroll-mt-[112px] mb-8 sm:mb-10">
                                    <motion.h1
                                        id="solution-heading"
                                        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fade}
                                        className="font-condensed font-bold text-forest border-l-4 border-forest pl-4 mb-3 sm:mb-4 leading-tight [text-wrap:balance] text-[clamp(1.6rem,6vw,2.6rem)]"
                                    >
                                        {solution.title}
                                    </motion.h1>

                                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                                        {solution.certifications.map((c, i) => <Badge key={i}>{c}</Badge>)}
                                    </div>

                                    <motion.p
                                        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fade}
                                        className="text-[clamp(1rem,2.5vw,1.125rem)] max-w-3xl text-charcoal/80 [text-wrap:pretty]"
                                    >
                                        {solution.fullDescription}
                                    </motion.p>
                                </div>

                                <Divider />

                                <Section id="features" title="Key Features">
                                    <ul className="space-y-3 mb-8 text-charcoal/80">
                                        {solution.features.map((f, idx) => (
                                            <li key={idx} className="flex items-start text-[clamp(0.95rem,2.4vw,1.05rem)]">
                                                <FaCheck className="text-forest mt-1 mr-2 shrink-0" />
                                                <span className="[text-wrap:pretty]">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                <Section id="applications" title="Applications">
                                    <ul className="space-y-3 mb-6 text-charcoal/80">
                                        {solution.applications.map((a, idx) => (
                                            <li key={idx} className="flex items-start text-[clamp(0.95rem,2.4vw,1.05rem)]">
                                                <svg className="h-5 w-5 text-teal mr-2 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22 4 12 14.01 9 11.01" />
                                                </svg>
                                                <span className="[text-wrap:pretty]">{a}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>

                                {isEdgeAISolution(solution) && (
                                    <Section id="products" title="Products">
                                        <ProductTabs products={solution.products} />
                                    </Section>
                                )}

                                <motion.div
                                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fade}
                                    className="bg-[#0D4114] text-cream rounded-lg p-6 sm:p-8 shadow-lg mt-12"
                                >
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                                        <div className="min-w-0">
                                            <h3 className="text-[clamp(1.1rem,3vw,1.5rem)] font-bold mb-2 [text-wrap:balance]">
                                                Ready to implement this solution?
                                            </h3>
                                            <p className="text-sm md:text-base mb-0">
                                                Our specialists can help you deploy a customized version for your specific needs.
                                            </p>
                                        </div>
                                        <Link href="/contact" className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-6 rounded shadow-lg transition-all inline-flex items-center justify-center">
                                            Request Consultation
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right rail */}
                            <aside className="w-full order-first lg:order-none min-w-0">
                                <StickyTOC sections={toc} />
                                <div className="bg-white p-6 rounded-lg shadow-md border border-black/5 mt-6 min-w-0">
                                    <div className="h-16 w-16 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                                        <svg className="h-8 w-8 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <rect x="3" y="4" width="18" height="14" rx="2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[clamp(1.1rem,2.8vw,1.25rem)] font-bold mb-3 text-navy">{solution.title}</h3>
                                    <p className="text-charcoal/80 mb-4 text-sm sm:text-base [text-wrap:pretty]">{solution.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-0">
                                        {solution.certifications.map((c, i) => <Badge key={i}>{c}</Badge>)}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

/* ---------------- Solution List ---------------- */
function SolutionList() {
    const base = useMemo(
        () =>
            Object.values(solutionDetails).map((s) => ({
                id: s.id, title: s.title, description: s.description,
                fullDescription: s.fullDescription.length > 180 ? s.fullDescription.substring(0, 180) + "..." : s.fullDescription,
                certifications: s.certifications, imagePlaceholder: s.imagePlaceholder, features: s.features.slice(0, 3),
            })),
        []
    );

    const [query, setQuery] = useState("");
    const q = query.trim().toLowerCase();
    const results = useMemo(() => {
        if (!q) return base;
        return base.filter((p) => {
            const hay = [p.title, p.description, p.fullDescription, ...p.features, ...p.certifications].join(" ").toLowerCase();
            return hay.includes(q);
        });
    }, [q, base]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "TRINETHRA DEFENTECH Defense Technology Solutions",
        description:
            "Our portfolio of advanced, rugged, and secure defense technology solutions designed for the most demanding defense and national security applications.",
        itemListElement: base.map((p, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@type": "Product", name: p.title, description: p.description, url: `https://trinethra-defentech.com/solutions/${p.id}`, category: "Defense Technology" },
        })),
    };

    const getIcon = (id: string) => (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="14" rx="2" />
        </svg>
    );

    return (
        <Layout
            title="Advanced Defense Solutions | TRINETHRA DEFENTECH"
            description="Explore our portfolio of mission-grade technology solutions including Edge Servers, Storage Solutions, Cable Harness Systems, and Rugged Panel PCs engineered for deployed environments."
            keywords="defense solutions, rugged server, storage solutions, cable harness, panel pc, TRINETHRA DEFENTECH, edge compute, tactical systems, defense-grade hardware"
            ogType="website"
            structuredData={JSON.stringify(schema)}
            pageType="solutions"
        >
            {/* Hero */}
            <section className="bg-[#0D4114] py-16 sm:py-20 lg:py-28 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h1
                        className="text-[clamp(1.6rem,6vw,2.8rem)] font-condensed font-bold mb-4 sm:mb-6 text-cream"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    >
                        Advanced Defense-Grade Solutions
                    </motion.h1>
                    <motion.p
                        className="text-[clamp(1rem,2.8vw,1.25rem)] text-cream/90 mb-8 sm:mb-12"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        Engineered for mission-critical national security applications with military-grade reliability and performance.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                        className="flex flex-wrap justify-center gap-2"
                    >
                        {["MIL-STD-810", "AES-256", "FIPS 140-2", "MIL-STD-461"].map((c, i) => <Badge key={i}>{c}</Badge>)}
                    </motion.div>
                </div>
            </section>

            {/* Search & Cards */}
            <section className="bg-white py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto min-w-0">
                    <div className="mb-6 sm:mb-8 flex items-center gap-3">
                        <div className="relative w-full">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search" value={query} onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search solutions, features, or certifications..."
                                className="w-full pl-9 pr-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
                                aria-label="Search solutions"
                            />
                        </div>
                    </div>

                    <motion.div
                        className="text-center mb-8 sm:mb-12"
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-[clamp(1.4rem,4.5vw,2.25rem)] font-condensed font-bold mb-4 text-navy inline-block border-b-2 border-forest pb-2">
                            Our Defense Technology Solutions
                        </h2>
                        <p className="text-[clamp(1rem,2.6vw,1.125rem)] text-charcoal/80 max-w-3xl mx-auto">
                            Explore our portfolio of advanced, rugged, and secure solutions designed for the most demanding defense and national security applications.
                        </p>
                    </motion.div>

                    {results.length === 0 ? (
                        <div className="text-center text-gray-600">No matching solutions. Try another keyword.</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                            {results.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: i * 0.06 }}
                                    className="flex flex-col h-full min-w-0"
                                >
                                    <div className="bg-white border border-gray-200 rounded-t-xl p-6 flex-grow min-w-0">
                                        <div className="flex flex-col items-center justify-center h-auto aspect-[16/9] mb-6 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-forest/10 flex items-center justify-center">
                                                {getIcon(p.id)}
                                            </div>
                                        </div>
                                        <h3 className="text-[clamp(1.15rem,3vw,1.35rem)] font-condensed font-bold mb-3 text-navy text-center">{p.title}</h3>
                                        <p className="text-charcoal/80 mb-6 text-center">{p.description}</p>
                                        <div className="space-y-3 mb-8">
                                            {p.features.map((f, idx) => (
                                                <div key={idx} className="flex items-start min-w-0">
                                                    <FaCheck className="text-forest mt-1 mr-3 shrink-0" />
                                                    <span className="text-charcoal/80">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border border-gray-200 bg-gray-50 rounded-b-xl p-6">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {p.certifications.slice(0, 2).map((c, j) => <Badge key={j}>{c}</Badge>)}
                                            {p.certifications.length > 2 && (
                                                <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">+{p.certifications.length - 2} more</span>
                                            )}
                                        </div>
                                        <Link href={`/solutions/${p.id}`} className="w-full block text-center bg-forest text-white font-medium py-2.5 px-4 rounded-md hover:bg-forest/90 transition-colors">
                                            Explore Solution
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 bg-white p-8 lg:p-12 rounded-xl shadow-md border border-gray-200"
                    >
                        <div className="lg:w-2/3 min-w-0">
                            <h2 className="text-[clamp(1.2rem,3.5vw,1.6rem)] font-bold mb-4 text-navy">Need a Custom Defense Solution?</h2>
                            <p className="text-charcoal/80 mb-0">
                                Our team of defense technology experts can help you design and implement custom solutions that meet your specific mission requirements and security standards.
                            </p>
                        </div>
                        <div className="lg:w-1/3 flex justify-center lg:justify-end">
                            <Link href="/contact" className="inline-flex items-center justify-center bg-navy hover:bg-navy/90 text-white font-bold py-3 px-6 rounded-md shadow-md transition-colors w-full lg:w-auto">
                                Contact Our Team
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}

/* ---------------- Router ---------------- */
export default function Solutions() {
    const [match] = useRoute("/solutions/:solutionId");
    return match ? <SolutionDetail /> : <SolutionList />;
}
