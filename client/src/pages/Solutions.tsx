import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { motion, useReducedMotion } from "framer-motion";
import { FaCheck, FaArrowLeft, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { Link, useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
const Badge = ({ children, variant = "secondary", className }: { children: React.ReactNode; variant?: "default" | "secondary" | "destructive" | "outline"; className?: string }) => (
    <UIBadge variant={variant} className={`text-[11px] sm:text-xs font-medium bg-forest/10 text-forest whitespace-nowrap ${className}`}>
        {children}
    </UIBadge>
);

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

/* ---------------- Enhanced Product Tabs with Better Mobile UX ---------------- */
function ProductTabs({ products }: { products: Product[] }) {
    const [compareMode, setCompareMode] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([0]);
    const [compareSheetOpen, setCompareSheetOpen] = useState(false);

    // viewport helper (sm breakpoint)
    const [isMobile, setIsMobile] = useState<boolean>(() =>
        typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
    );
    
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const handler = (e: MediaQueryListEvent | MediaQueryList) =>
            setIsMobile("matches" in e ? (e as MediaQueryListEvent).matches : (e as MediaQueryList).matches);
        handler(mq);
        mq.addEventListener?.("change", handler as (e: MediaQueryListEvent) => void);
        return () => mq.removeEventListener?.("change", handler as (e: MediaQueryListEvent) => void);
    }, []);

    const handleProductSelect = (index: number) => {
        if (!compareMode) {
            setSelectedProducts([index]);
            return;
        }
        
        setSelectedProducts(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else if (prev.length < 2) {
                return [...prev, index];
            } else {
                return [prev[1], index]; // Replace first with new selection
            }
        });
    };

    const toggleCompareMode = () => {
        setCompareMode(!compareMode);
        if (!compareMode) {
            setSelectedProducts([0]); // Reset to first product when entering compare mode
        } else {
            setSelectedProducts([0]); // Reset to single selection when exiting
        }
        setCompareSheetOpen(false);
    };

    const canCompare = compareMode && selectedProducts.length === 2;
    const primaryProduct = products[selectedProducts[0]];
    const secondaryProduct = selectedProducts[1] !== undefined ? products[selectedProducts[1]] : null;

    // Enhanced product panel using Card components
    const ProductPanel = ({ prod, isComparison = false }: { prod: Product; isComparison?: boolean }) => (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6 mb-4">
                    <div className="relative w-full max-w-sm">
                        <div className="aspect-[4/3] bg-navy/5 rounded-lg grid place-items-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-navy/10 grid place-items-center">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="2" y="6" width="20" height="12" rx="2"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <CardTitle className="text-center text-lg font-condensed font-bold text-navy">
                    {prod.name}
                </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
                <div>
                    <h5 className="font-condensed text-forest font-bold mb-3 uppercase text-xs tracking-wide">Key Features</h5>
                    <ul className="space-y-2" aria-label="Key product features">
                        {prod.features.slice(0, isComparison ? 4 : 6).map((f, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                                <FaCheck className="text-forest mt-1 mr-2 shrink-0 text-xs" />
                                <span className="text-charcoal/80">{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <Separator />
                
                <div>
                    <h5 className="font-condensed text-forest font-bold mb-3 uppercase text-xs tracking-wide">Specifications</h5>
                    <div className="space-y-3">
                        {Object.entries(prod.specs).map(([k, v]) => (
                            <div key={k} className="grid grid-cols-3 gap-2 text-sm">
                                <div className="font-medium text-navy text-xs uppercase tracking-wide col-span-1">{k}</div>
                                <div className="text-charcoal/80 whitespace-pre-line col-span-2">{v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="mb-10 md:mb-14">
            {/* Header with improved mobile layout */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="font-semibold text-navy text-xl">Products</h3>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleCompareMode}
                        className={compareMode ? "bg-forest text-white hover:bg-forest/90" : ""}
                    >
                        {compareMode ? "Exit Compare" : "Compare Products"}
                    </Button>
                    {canCompare && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => setCompareSheetOpen(true)}
                            className="bg-forest hover:bg-forest/90"
                        >
                            View Comparison
                        </Button>
                    )}
                </div>
            </div>

            {/* Product selection using Tabs for single mode, buttons for compare mode */}
            {!compareMode ? (
                <Tabs value={selectedProducts[0].toString()} onValueChange={(value) => handleProductSelect(parseInt(value))}>
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 h-auto p-1 bg-gray-100">
                        {products.map((product, index) => (
                            <TabsTrigger
                                key={index}
                                value={index.toString()}
                                className="data-[state=active]:bg-forest data-[state=active]:text-white text-sm py-3 px-4 rounded-md"
                            >
                                {product.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value={selectedProducts[0].toString()} className="mt-6">
                        <ProductPanel prod={primaryProduct} />
                    </TabsContent>
                </Tabs>
            ) : (
                <div className="space-y-6">
                    {/* Compare mode product selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {products.map((product, index) => {
                            const isSelected = selectedProducts.includes(index);
                            return (
                                <Button
                                    key={index}
                                    variant={isSelected ? "default" : "outline"}
                                    onClick={() => handleProductSelect(index)}
                                    className={`h-auto p-4 justify-start ${
                                        isSelected 
                                            ? "bg-forest text-white hover:bg-forest/90" 
                                            : "hover:bg-gray-50"
                                    }`}
                                    disabled={!isSelected && selectedProducts.length >= 2}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full border-2 ${
                                            isSelected 
                                                ? "bg-white border-white" 
                                                : "border-gray-300"
                                        }`} />
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                </Button>
                            );
                        })}
                    </div>

                    {/* Selected products preview */}
                    {selectedProducts.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-navy mb-2">
                                Selected for comparison ({selectedProducts.length}/2):
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedProducts.map((index) => (
                                    <Badge key={index} variant="default">
                                        {products[index].name}
                                        <button
                                            onClick={() => handleProductSelect(index)}
                                            className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                                            aria-label={`Remove ${products[index].name} from comparison`}
                                        >
                                            <FaTimes className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Desktop comparison view */}
                    {canCompare && !isMobile && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ProductPanel prod={primaryProduct} isComparison />
                            <ProductPanel prod={secondaryProduct!} isComparison />
                        </div>
                    )}
                </div>
            )}

            {/* Mobile comparison sheet */}
            <Sheet open={compareSheetOpen} onOpenChange={setCompareSheetOpen}>
                <SheetContent side="bottom" className="h-[90vh]">
                    <SheetHeader>
                        <SheetTitle>Product Comparison</SheetTitle>
                        <SheetDescription>
                            Compare {primaryProduct.name} and {secondaryProduct?.name}
                        </SheetDescription>
                    </SheetHeader>
                    
                    {canCompare && (
                        <div className="mt-6">
                            <Tabs defaultValue="0" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="0">{primaryProduct.name}</TabsTrigger>
                                    <TabsTrigger value="1">{secondaryProduct!.name}</TabsTrigger>
                                </TabsList>
                                <TabsContent value="0" className="mt-4">
                                    <ProductPanel prod={primaryProduct} isComparison />
                                </TabsContent>
                                <TabsContent value="1" className="mt-4">
                                    <ProductPanel prod={secondaryProduct!} isComparison />
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
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

                                <Separator />

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
                                    className="mt-12"
                                >
                                    <Card className="bg-[#0D4114] text-cream border-0 shadow-lg">
                                        <CardContent className="p-6 sm:p-8">
                                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                                                <div className="min-w-0">
                                                    <CardTitle className="text-xl lg:text-2xl font-bold mb-2 text-cream">
                                                        Ready to implement this solution?
                                                    </CardTitle>
                                                    <CardDescription className="text-sm md:text-base mb-0 text-cream/90">
                                                        Our specialists can help you deploy a customized version for your specific needs.
                                                    </CardDescription>
                                                </div>
                                                <Button asChild size="lg" className="bg-teal hover:bg-teal/90 text-white shrink-0">
                                                    <Link href="/contact">
                                                        Request Consultation
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>

                            {/* Right rail */}
                            <aside className="w-full order-first lg:order-none min-w-0">
                                <StickyTOC sections={toc} />
                                <Card className="mt-6 sticky top-28">
                                    <CardHeader>
                                        <div className="h-16 w-16 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                                            <svg className="h-8 w-8 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <rect x="3" y="4" width="18" height="14" rx="2" />
                                            </svg>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-navy">{solution.title}</CardTitle>
                                        <CardDescription className="text-sm sm:text-base text-charcoal/80">
                                            {solution.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {solution.certifications.map((c, i) => (
                                                <Badge key={i} variant="secondary">{c}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
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
                certifications: s.certifications, imagePlaceholder: s.imagePlaceholder, features: s.features.slice(0, 4),
            })),
        []
    );

    // New: category mapping for redesigned filters
    const categoryMap: Record<string, string> = {
        server: "Edge Compute",
        "storage-solutions": "Storage",
        "cable-harness": "Connectivity",
        "panel-pc": "HMI / Operator",
    };

    const categories = Array.from(
        new Set(Object.values(base).map((b) => categoryMap[b.id] || "Other"))
    );

    const [query, setQuery] = useState("");
    const [activeCats, setActiveCats] = useState<Set<string>>(new Set());
    const [view, setView] = useState<"grid" | "list">("grid");

    const toggleCategory = (c: string) => {
        setActiveCats((prev) => {
            const next = new Set(prev);
            if (next.has(c)) next.delete(c); else next.add(c);
            return next;
        });
    };
    const clearFilters = () => setActiveCats(new Set());

    const q = query.trim().toLowerCase();
    const filtered = useMemo(() => {
        let items = base;
        if (activeCats.size) {
            items = items.filter((p) => activeCats.has(categoryMap[p.id] || "Other"));
        }
        if (!q) return items;
        return items.filter((p) => {
            const hay = [p.title, p.description, p.fullDescription, ...p.features, ...p.certifications].join(" ").toLowerCase();
            return hay.includes(q);
        });
    }, [q, base, activeCats]);

    const results = filtered;

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

    // Accessible label helpers
    const resultsLabel = `${results.length} solution${results.length === 1 ? "" : "s"}`;

    return (
        <Layout
            title="Advanced Defense Solutions | TRINETHRA DEFENTECH"
            description="Explore our portfolio of mission-grade technology solutions including Edge Servers, Storage Solutions, Cable Harness Systems, and Rugged Panel PCs engineered for deployed environments."
            keywords="defense solutions, rugged server, storage solutions, cable harness, panel pc, TRINETHRA DEFENTECH, edge compute, tactical systems, defense-grade hardware"
            ogType="website"
            structuredData={JSON.stringify(schema)}
            pageType="solutions"
        >
            {/* Redesigned Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#0D4114] via-[#0D4114] to-[#06220A] py-20 sm:py-24 lg:py-32 px-4 sm:px-6">
                <div className="absolute inset-0 pointer-events-none opacity-[0.12] bg-[radial-gradient(circle_at_30%_30%,#16a34a_0%,transparent_60%)]" aria-hidden />
                <div className="max-w-6xl mx-auto text-center relative">
                    <motion.h1
                        className="text-[clamp(1.75rem,6vw,3rem)] font-condensed font-bold mb-5 text-cream tracking-tight"
                        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}
                    >
                        Mission-Grade Technology Solutions
                    </motion.h1>
                    <motion.p
                        className="text-[clamp(1rem,2.4vw,1.25rem)] text-cream/85 max-w-3xl mx-auto mb-8 sm:mb-10 [text-wrap:pretty]"
                        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
                    >
                        Rugged edge compute, secure storage, resilient connectivity and hardened operator interfaces engineered for deployed defense environments.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
                        className="flex flex-wrap justify-center gap-2"
                    >
                        {["MIL-STD-810", "AES-256", "FIPS 140-2", "MIL-STD-461"].map((c, i) => <Badge key={i}>{c}</Badge>)}
                    </motion.div>
                </div>
            </section>

            {/* Filters + Results */}
            <section className="bg-white py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Mobile Filters Sheet */}
                    <div className="lg:hidden mb-6">
                        <div className="flex gap-3 mb-4">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search solutions..."
                                    className="w-full pl-9 pr-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent text-sm"
                                    aria-label="Search solutions"
                                />
                            </div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm" className="shrink-0">
                                        <FaFilter className="w-4 h-4 mr-2" />
                                        Filters
                                        {activeCats.size > 0 && (
                                            <Badge variant="secondary" className="ml-2 bg-forest text-white">
                                                {activeCats.size}
                                            </Badge>
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-80">
                                    <SheetHeader>
                                        <SheetTitle>Filter Solutions</SheetTitle>
                                        <SheetDescription>
                                            Narrow down solutions by category
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="mt-6 space-y-6">
                                        <div>
                                            <h3 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wide">Categories</h3>
                                            <div className="space-y-2">
                                                {categories.map((c) => {
                                                    const active = activeCats.has(c);
                                                    return (
                                                        <Button
                                                            key={c}
                                                            variant={active ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => toggleCategory(c)}
                                                            className={`w-full justify-start ${
                                                                active ? "bg-forest text-white hover:bg-forest/90" : ""
                                                            }`}
                                                        >
                                                            {c}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                            {activeCats.size > 0 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={clearFilters}
                                                    className="w-full mt-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    Clear all filters
                                                </Button>
                                            )}
                                        </div>
                                        <Card className="p-4">
                                            <CardContent className="p-0">
                                                <p className="text-sm text-gray-600">
                                                    <strong>Tip:</strong> Combine category filters with keyword search to quickly find specific solutions.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-10">
                        {/* Desktop Sidebar Filters */}
                        <aside className="hidden lg:block">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle className="text-lg">Filter Solutions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wide">Search</h3>
                                        <div className="relative">
                                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="search"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Search solutions..."
                                                className="w-full pl-9 pr-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent text-sm"
                                                aria-label="Search solutions"
                                            />
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="text-sm font-semibold text-navy mb-3 uppercase tracking-wide">Categories</h3>
                                        <div className="space-y-2">
                                            {categories.map((c) => {
                                                const active = activeCats.has(c);
                                                return (
                                                    <Button
                                                        key={c}
                                                        variant={active ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => toggleCategory(c)}
                                                        className={`w-full justify-start ${
                                                            active ? "bg-forest text-white hover:bg-forest/90" : ""
                                                        }`}
                                                    >
                                                        {c}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                        {activeCats.size > 0 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={clearFilters}
                                                className="w-full mt-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                Clear all filters
                                            </Button>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="bg-gray-50 rounded-md p-3 text-sm">
                                        <p className="font-medium text-navy mb-2">How to use</p>
                                        <p className="text-gray-600 text-xs leading-relaxed">
                                            Combine category filters with keyword search to quickly narrow down solutions.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Main content */}
                        <div className="min-w-0">

                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-[clamp(1.4rem,4vw,2.2rem)] font-condensed font-bold text-navy leading-tight mb-2">
                                    Our Defense Technology Solutions
                                </h2>
                                <p className="text-sm text-charcoal/70">{resultsLabel}{activeCats.size ? ` • Filtered` : ""}{q ? ` • Matching '${query}'` : ""}</p>
                            </div>
                            <div className="flex items-center gap-3 self-start sm:self-auto">
                                <div className="inline-flex rounded-md border border-gray-300 overflow-hidden" role="group" aria-label="Change results view">
                                    <button
                                        onClick={() => setView("grid")}
                                        className={`px-3 py-2 text-xs font-medium tracking-wide ${view === "grid" ? "bg-forest text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                                        aria-pressed={view === "grid"}
                                    >Grid</button>
                                    <button
                                        onClick={() => setView("list")}
                                        className={`px-3 py-2 text-xs font-medium tracking-wide border-l border-gray-300 ${view === "list" ? "bg-forest text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                                        aria-pressed={view === "list"}
                                    >List</button>
                                </div>
                            </div>
                        </div>

                        {/* Empty State */}
                        {results.length === 0 && (
                            <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-10">
                                <p className="text-navy font-medium mb-2">No matching solutions</p>
                                <p className="text-sm text-charcoal/70 mb-6 max-w-md mx-auto">Try different keywords or remove some category filters to broaden the results.</p>
                                {activeCats.size > 0 || q ? (
                                    <button onClick={() => { clearFilters(); setQuery(""); }} className="bg-forest text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-forest/90">Reset Search</button>
                                ) : null}
                            </div>
                        )}

                        {/* Grid Results */}
                        {results.length > 0 && view === "grid" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {results.map((p, i) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 24 }} 
                                        whileInView={{ opacity: 1, y: 0 }} 
                                        viewport={{ once: true, amount: 0.2 }} 
                                        transition={{ duration: 0.55, delay: i * 0.05 }}
                                    >
                                        <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                            <CardHeader className="pb-4">
                                                <div className="aspect-[16/9] mb-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 grid place-items-center relative overflow-hidden">
                                                    <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center">
                                                        {getIcon(p.id)}
                                                    </div>
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_70%_30%,rgba(13,65,20,0.08),transparent_70%)]" aria-hidden />
                                                </div>
                                                <CardTitle className="text-lg font-condensed font-bold text-navy leading-tight">
                                                    <Link 
                                                        href={`/solutions/${p.id}`} 
                                                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest rounded-sm"
                                                    >
                                                        {p.title}
                                                    </Link>
                                                </CardTitle>
                                                <CardDescription className="text-sm text-charcoal/75 line-clamp-2">
                                                    {p.description}
                                                </CardDescription>
                                            </CardHeader>
                                            
                                            <CardContent className="flex-grow">
                                                <ul className="space-y-2 text-sm text-charcoal/80">
                                                    {p.features.map((f, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <FaCheck className="text-forest mt-0.5 shrink-0 text-xs" />
                                                            <span className="line-clamp-1">{f}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            
                                            <CardFooter className="pt-4 flex items-center justify-between gap-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {p.certifications.slice(0, 2).map((c, j) => (
                                                        <Badge key={j} variant="secondary">{c}</Badge>
                                                    ))}
                                                    {p.certifications.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{p.certifications.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <Button asChild size="sm" className="bg-forest hover:bg-forest/90">
                                                    <Link href={`/solutions/${p.id}`}>
                                                        Explore
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* List Results */}
                        {results.length > 0 && view === "list" && (
                            <div className="space-y-6">
                                {results.map((p, i) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 20 }} 
                                        whileInView={{ opacity: 1, y: 0 }} 
                                        viewport={{ once: true, amount: 0.2 }} 
                                        transition={{ duration: 0.5, delay: i * 0.04 }}
                                    >
                                        <Card className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-6 md:p-8">
                                                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                                    {/* Left side - Image and badges */}
                                                    <div className="md:w-48 shrink-0">
                                                        <div className="aspect-square rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 grid place-items-center mb-4">
                                                            <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center">
                                                                {getIcon(p.id)}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {p.certifications.slice(0, 3).map((c, j) => (
                                                                <Badge key={j} variant="secondary">{c}</Badge>
                                                            ))}
                                                            {p.certifications.length > 3 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{p.certifications.length - 3}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Right side - Content */}
                                                    <div className="flex-grow min-w-0">
                                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                                            <div>
                                                                <CardTitle className="text-xl font-condensed font-bold text-navy leading-tight mb-2">
                                                                    <Link 
                                                                        href={`/solutions/${p.id}`} 
                                                                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest rounded-sm"
                                                                    >
                                                                        {p.title}
                                                                    </Link>
                                                                </CardTitle>
                                                                <CardDescription className="text-sm md:text-base text-charcoal/80 max-w-3xl">
                                                                    {p.fullDescription}
                                                                </CardDescription>
                                                            </div>
                                                            <Button asChild className="bg-forest hover:bg-forest/90 shrink-0">
                                                                <Link href={`/solutions/${p.id}`}>
                                                                    View Details
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                        
                                                        <Separator className="my-4" />
                                                        
                                                        <div>
                                                            <h4 className="font-medium text-navy mb-3 text-sm uppercase tracking-wide">Key Features</h4>
                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-charcoal/85">
                                                                {p.features.map((f, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2">
                                                                        <FaCheck className="text-forest mt-0.5 shrink-0 text-xs" />
                                                                        <span>{f}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true, amount: 0.25 }} 
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="bg-white shadow-lg border-0">
                            <CardContent className="p-8 lg:p-12">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
                                    <div className="lg:w-2/3 min-w-0">
                                        <CardTitle className="text-2xl lg:text-3xl font-bold mb-4 text-navy leading-tight">
                                            Need a Custom Defense Solution?
                                        </CardTitle>
                                        <CardDescription className="text-base text-charcoal/80 mb-0">
                                            Our engineers can help tailor rugged compute, storage, interconnect, or HMI platforms to your mission profile, environmental constraints, and accreditation requirements.
                                        </CardDescription>
                                    </div>
                                    <div className="lg:w-1/3 flex justify-center lg:justify-end">
                                        <Button asChild size="lg" className="bg-navy hover:bg-navy/90 w-full lg:w-auto">
                                            <Link href="/contact">
                                                Contact Our Team
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
