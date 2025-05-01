import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaCheck, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { Link, useRoute } from "wouter";

// Animation configuration
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Type definitions
interface Product {
  name: string;
  features: string[];
  specs: Record<string, string>;
}

interface SolutionBase {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  mainQuestion: string;
  mainAnswer: string;
  certifications: string[];
  imagePlaceholder: string;
  features: string[];
  applications: string[];
}

interface EdgeAISolution extends SolutionBase {
  products: Product[];
}

type Solution = EdgeAISolution | SolutionBase;

function isEdgeAISolution(solution: Solution): solution is EdgeAISolution {
  return (solution.id === "edge-ai" || solution.id === "data-storage" || solution.id === "switches") && 'products' in solution;
}

// Detailed data for solution pages
const solutionDetails: Record<string, Solution> = {
  "edge-ai": {
    id: "edge-ai",
    title: "Edge AI Systems",
    description: "Essential features to get started with AI-powered systems optimized for field deployment.",
    fullDescription: "TRINETHRA's Edge AI products are engineered for mission-critical, cost-effective data acquisition. Rugged, secure, and optimized for SWaP-C, they are perfect for ISR, telemetry, and system monitoring in challenging environments.",
    mainQuestion: "Is a Edge AI product right for you?",
    mainAnswer: "If you need secure, rugged data acquisition with essential features at an affordable price, Edge AI products deliver dependable performance without unnecessary complexity.",
    certifications: ["MIL-STD-810H", "DO-160G", "MIL-STD-810"],
    imagePlaceholder: "Edge AI System",
    features: [
      "Ruggedized hardware for extreme conditions",
      "Low-latency inference engines",
      "Military-grade encryption",
      "Offline operation capabilities",
      "Field-upgradable firmware"
    ],
    applications: [
      "Drone-based reconnaissance",
      "Field target identification",
      "Autonomous security systems",
      "Environmental monitoring in hostile areas"
    ],
    products: [
      {
        name: "CAR",
        features: [
          "Perfect For Atritable Systems, Combining Small Form Factor With High Performance",
          "2 TB Fixed Storage Or Up To 512 GB Of Removable CFast Storage",
          "Modular Linux Based Open Architecture",
          "Standard: 2x 1 GbE",
          "GNSS/GPS Receiver (W/ Disable Feature)"
        ],
        specs: {
          "Size / Weight": "1.8\" H x 4.8\" W x 6.8\" D\n2 lbs",
          "Speed": "200 MB/sec",
          "Storage": "2 TB",
          "Interfaces": "2x GbE Audio GPS",
          "Security": "Self Encrypting Drive"
        }
      },
      {
        name: "TuffCORD",
        features: [
          "Removable Storage Capacity Up To 20 TB",
          "Standard Dual 1 GbE Interfaces",
          "Greater Than 250 MB/sec Sustained Network Throughput",
          "Expandability And Flexibility: Customizable I/O Options",
          "Built Rugged, MIL-STD-810 With MIL-STD Connectors"
        ],
        specs: {
          "Size / Weight": "3.6\" H x 4.8\" W x 6.3\" D\n5.5 lbs",
          "Speed": "250 MB/sec",
          "Storage": "20 TB",
          "Interfaces": "2x GbE",
          "Security": "AES 256/FIPS 197 FIPS 140 CSIC"
        }
      }
    ]
  },
  "data-storage": {
    id: "data-storage",
    title: "Rugged Data Storage",
    description: "Advanced capabilities for growing teams with secure, high-performance storage solutions.",
    fullDescription: "Our rugged storage systems are designed to maintain data integrity in the most challenging environments and adverse conditions, from desert heat to arctic cold.",
    mainQuestion: "Is a rugged storage system right for you?",
    mainAnswer: "If you need secure, high-capacity data storage in extreme environments, our rugged storage systems offer unmatched reliability and protection.",
    certifications: ["MIL-STD-461F", "AES-256", "DoD Security Standards"],
    imagePlaceholder: "Rugged Storage",
    features: [
      "IP68-rated enclosures",
      "MIL-STD-810 compliance",
      "AES-256 hardware encryption",
      "Rapid data transfer speeds",
      "Temperature resistant (-40°C to +85°C)"
    ],
    applications: [
      "Field command centers",
      "Secure intelligence storage",
      "Remote operational bases",
      "Vehicle-mounted data systems"
    ],
    products: [
      {
        name: "FORTRESS-X1",
        features: [
          "Military-grade encrypted storage solution for mission-critical data",
          "MIL-STD-810H certified",
          "AES-256 bit encryption",
          "Tamper-resistant hardware",
          "Operational temperature: -40°C to +85°C"
        ],
        specs: {
          "Certification": "MIL-STD-810H",
          "Encryption": "AES-256 bit",
          "Protection": "IP68 water and dust resistance",
          "Temperature": "-40°C to +85°C",
          "Security": "Tamper-resistant hardware"
        }
      },
      {
        name: "OUTPOST-S3",
        features: [
          "Field-deployable server rack with reinforced protection",
          "Ruggedized aluminum chassis",
          "Shock-mounted internal components",
          "EMI/RFI shielding",
          "Redundant power supplies"
        ],
        specs: {
          "Chassis": "Ruggedized aluminum",
          "Components": "Shock-mounted",
          "Shielding": "EMI/RFI",
          "Power": "Redundant supplies",
          "Deployment": "Quick-deploy configuration"
        }
      },
      {
        name: "SENTINEL-D2",
        features: [
          "Secure distributed database solution for sensitive environments",
          "Zero-trust architecture",
          "Real-time replication",
          "FIPS 140-2 compliant",
          "Automatic failover capabilities"
        ],
        specs: {
          "Architecture": "Zero-trust",
          "Replication": "Real-time",
          "Compliance": "FIPS 140-2",
          "Failover": "Automatic capabilities",
          "Monitoring": "24/7 with alert system"
        }
      },
      {
        name: "TERRAIN-HD4",
        features: [
          "Portable hardened drives for extreme field conditions",
          "Drop tested from 3m height",
          "Crush resistance up to 2000 lbs",
          "Built-in hardware encryption",
          "Secure erase capabilities"
        ],
        specs: {
          "Drop Test": "3m height",
          "Crush Resistance": "Up to 2000 lbs",
          "Encryption": "Built-in hardware",
          "Security": "Secure erase capabilities",
          "Configurations": "Available in SSD and HDD"
        }
      }
    ]
  },
  "switches": {
    id: "switches",
    title: "Rugged Switches",
    description: "All features for large scale operations, providing robust networking hardware for reliable operations.",
    fullDescription: "Battlefield-ready networking equipment designed for secure, reliable communications in contested electromagnetic environments.",
    mainQuestion: "Is a rugged switch right for you?",
    mainAnswer: "If you need networking equipment that can survive the harshest field conditions while maintaining security and reliability, our rugged switches deliver uncompromising performance.",
    certifications: ["MIL-STD-461G", "MIL-STD-810G", "MIL-STD-1275E", "NIST FIPS 140-2", "Common Criteria EAL4+"],
    imagePlaceholder: "Rugged Switches",
    features: [
      "Enhanced Security Protocols",
      "Ruggedized Design",
      "Tactical Network Integration",
      "Rapid Deployment",
      "Military-grade encryption"
    ],
    applications: [
      "Tactical field networks",
      "Mobile command vehicles",
      "Forward operating bases",
      "Naval vessel communications"
    ],
    products: [
      {
        name: "Tactical XR-7",
        features: [
          "Military-grade switch for battlefield communications",
          "Enhanced Security Protocols",
          "Military-grade encryption and secure boot capabilities",
          "Seamlessly integrates with existing defense infrastructure",
          "Quick setup and configuration for time-critical missions"
        ],
        specs: {
          "Operating Temperature": "-40°C to +85°C",
          "Power Input": "9-36V DC with surge protection",
          "Encryption": "AES-256, FIPS 140-2 compliant",
          "Ports": "8x 1G/10G SFP+, 2x 40G QSFP+",
          "Environmental Rating": "IP67, MIL-STD-810G"
        }
      },
      {
        name: "SecureNet Pro",
        features: [
          "Encrypted network switch for command centers",
          "Advanced AES-256 encryption for all traffic",
          "Integrated intrusion detection and prevention",
          "Zero-trust network architecture support",
          "Hardware-based security modules"
        ],
        specs: {
          "Operating Temperature": "-40°C to +85°C",
          "Power Input": "9-36V DC with surge protection",
          "Encryption": "AES-256, FIPS 140-2 compliant",
          "Ports": "8x 1G/10G SFP+, 2x 40G QSFP+",
          "Security Certification": "Common Criteria EAL4+"
        }
      },
      {
        name: "FieldOps Switch",
        features: [
          "Ruggedized for extreme environmental conditions",
          "Built to withstand extreme temperatures, shock, and vibration",
          "EMI/RFI shielding for electromagnetic interference protection",
          "Dust and waterproof enclosure (IP67 rated)",
          "Redundant power supplies with hot-swap capability"
        ],
        specs: {
          "Operating Temperature": "-40°C to +85°C",
          "Power Input": "9-36V DC with surge protection",
          "Protection": "EMI/EMC MIL-STD-461G compliant",
          "Vibration/Shock": "MIL-STD-810G certified",
          "Environmental Rating": "IP67 waterproof"
        }
      }
    ]
  }
};

// Tab component for product details
function ProductTabs({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!products || products.length === 0) return null;
  
  // Ensure activeTab is within bounds
  const safeActiveTab = activeTab < products.length ? activeTab : 0;

  return (
    <div className="mb-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap overflow-hidden rounded-t-md shadow-sm mb-6 border-b border-gray-200">
        {products.map((product, index) => (
          <button
            key={index}
            className={`py-3 px-6 font-medium text-center transition-all ${index === safeActiveTab 
              ? 'bg-white text-forest border-t-2 border-forest' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab(index)}
          >
            {product.name}
          </button>
        ))}
      </div>

      {/* Product Image and Summary */}
      <div className="mb-8 bg-white border border-gray-200 rounded-md p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex justify-center items-center bg-gray-50 rounded-md p-6 h-64">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-navy/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-navy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <line x1="6" y1="10" x2="6" y2="10" />
                  <line x1="10" y1="10" x2="10" y2="10" />
                  <line x1="14" y1="10" x2="14" y2="10" />
                  <line x1="18" y1="10" x2="18" y2="10" />
                  <line x1="6" y1="14" x2="6" y2="14" />
                  <line x1="10" y1="14" x2="10" y2="14" />
                  <line x1="14" y1="14" x2="14" y2="14" />
                  <line x1="18" y1="14" x2="18" y2="14" />
                </svg>
              </div>
              <h3 className="text-xl font-condensed font-bold text-navy">{products[safeActiveTab].name}</h3>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {/* Key Features - Summary View */}
            <h3 className="flex items-center font-condensed text-forest font-bold mb-3 uppercase text-sm tracking-wide">
              <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-6">
              {products[safeActiveTab].features.slice(0, 4).map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="text-forest shrink-0 mt-1 mr-2">•</span>
                  <span className="text-charcoal/80 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2">
              <a href="#product-details" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-forest text-white hover:bg-forest/90 transition-colors">
                View Details
                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-forest text-forest hover:bg-forest/10 transition-colors">
                Datasheet
                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full Product Details */}
      <div id="product-details" className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
        <h3 className="text-xl font-condensed font-bold text-navy border-b border-gray-200 pb-4 mb-6">Product Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Full Features List */}
          <div>
            <h3 className="flex items-center font-condensed text-forest font-bold mb-4 uppercase text-sm tracking-wide">
              <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Complete Feature Set
            </h3>
            <ul className="space-y-2">
              {products[safeActiveTab].features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <FaCheck className="text-forest shrink-0 mt-1 mr-2" />
                  <span className="text-charcoal/80">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Technical Specifications */}
          <div>
            <h3 className="flex items-center font-condensed text-forest font-bold mb-4 uppercase text-sm tracking-wide">
              <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Technical Specifications
            </h3>
            <div className="bg-gray-50 rounded-md p-4">
              {Object.entries(products[safeActiveTab].specs).map(([key, value]: [string, any], idx: number) => (
                <div key={idx} className="py-2 border-b border-gray-200 last:border-0">
                  <div className="font-medium text-navy text-sm">{key}</div>
                  <div className="text-charcoal/80 whitespace-pre-line">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-forest text-white hover:bg-forest/90 transition-colors">
              Request Quote
              <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Solution Detail Page
function SolutionDetail() {
  const [, params] = useRoute("/solutions/:solutionId");
  const solutionId = params?.solutionId as keyof typeof solutionDetails;
  const solution = solutionDetails[solutionId];
  
  if (!solution) {
    return (
      <Layout>
        <div className="py-32 px-6 container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Solution not found</h1>
          <Link href="/solutions" className="text-teal hover:text-teal/80 flex items-center font-medium">
            <FaArrowLeft className="mr-2" /> Back to All Solutions
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout
      title={`${solution.title} | TRINETHRA DEFENTECH`}
      description={solution.description}
    >
      <section className="bg-gray-50 py-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link href="/solutions" className="text-teal hover:text-teal/80 flex items-center font-medium">
                <FaArrowLeft className="mr-2" /> Back to All Solutions
              </Link>
            </div>
            
            <div className="mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl md:text-5xl font-bold mb-6 text-forest ${solution.id === "switches" ? "" : "border-l-4 border-forest pl-4"}`}>
                {solution.id === "edge-ai" ? "Edge artificial intelligence" : solution.title}
              </motion.h1>
              
              {solution.id === "switches" && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {solution.certifications.slice(0, 3).map((cert, i) => (
                    <span key={i} className="text-xs font-medium bg-forest/10 text-forest px-2 py-1 rounded-full">
                      {cert}
                    </span>
                  ))}
                  {solution.certifications.length > 3 && (
                    <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      +{solution.certifications.length - 3} more
                    </span>
                  )}
                </div>
              )}
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg mb-8 max-w-3xl">
                {solution.fullDescription}
              </motion.p>
            </div>

            {/* Product Tabs */}
            {isEdgeAISolution(solution) && (
              <ProductTabs products={solution.products} />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {solution.mainQuestion && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-100 p-6 rounded-lg border-l-4 border-forest mb-8">
                    <h2 className="text-xl font-bold mb-2 text-forest">{solution.mainQuestion}</h2>
                    <p className="text-charcoal/80">{solution.mainAnswer}</p>
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  <h2 className="text-2xl font-condensed font-bold mb-4 text-navy">Key Features</h2>
                  <ul className="space-y-3 mb-6 text-charcoal/80">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-forest mt-1 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}>
                  <h2 className="text-2xl font-condensed font-bold mb-4 text-navy">Applications</h2>
                  <ul className="space-y-3 mb-6 text-charcoal/80">
                    {solution.applications.map((application, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-teal mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {application}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              
              <div className="w-full">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`military-card bg-white ${solution.id === "switches" ? "p-5" : "p-6"} rounded-lg shadow-md sticky top-24`}>
                  <div className="h-16 w-16 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {solution.id === "edge-ai" && <path d="M12 2v6m0 12v2M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>}
                      {solution.id === "data-storage" && <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8" /></>}
                      {solution.id === "switches" && <><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-navy">{solution.title}</h3>
                  <p className="text-charcoal/80 mb-4">{solution.description}</p>
                  
                  {solution.id !== "switches" && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.certifications.map((cert, i) => (
                        <span key={i} className="text-xs font-medium bg-forest/10 text-forest px-2 py-1 rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {solution.id === "switches" && (
                    <div className="bg-gray-50 p-3 rounded-md mb-4">
                      <h4 className="text-sm font-medium text-navy mb-2">Key applications:</h4>
                      <ul className="text-sm space-y-1">
                        {solution.applications.slice(0, 3).map((app, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-teal shrink-0 mr-1.5">•</span>
                            <span className="text-charcoal/80">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-bold text-charcoal mb-2">Request Information</h4>
                    <Link href="/contact" className="w-full block text-center bg-forest text-white font-medium py-2 px-4 rounded hover:bg-forest/90 transition-colors mt-4">
                      Contact Us
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-navy text-cream rounded-lg p-8 shadow-lg mt-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to implement this solution?</h3>
                  <p className="mb-0 md:mb-0">Our specialists can help you deploy a customized version for your specific needs.</p>
                </div>
                <Link href="/contact" className="mt-4 md:mt-0 bg-teal hover:bg-teal/90 text-white font-bold py-3 px-6 rounded shadow-lg transition-all duration-300">
                  Request Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Main Solution List
function SolutionList() {
  const productsData = Object.values(solutionDetails).map(solution => ({
    id: solution.id,
    title: solution.title,
    description: solution.description,
    fullDescription: solution.fullDescription.length > 180 ? solution.fullDescription.substring(0, 180) + '...' : solution.fullDescription,
    certifications: solution.certifications,
    imagePlaceholder: solution.imagePlaceholder,
    features: solution.features.slice(0, 3)
  }));

  const features = {
    "edge-ai": [
      "Low-latency inference engines for real-time processing",
      "Ruggedized hardware for extreme battlefield conditions",
      "Military-grade encryption for data security",
      "Offline operation capabilities for disconnected environments"
    ],
    "data-storage": [
      "IP68-rated enclosures for complete dust/water protection",
      "MIL-STD-810 compliant for shock and environmental resistance",
      "AES-256 hardware encryption for secure data storage",
      "Temperature resistant from -40°C to +85°C for all environments"
    ],
    "switches": [
      "Enhanced Security Protocols with military-grade encryption",
      "Ruggedized Design for extreme environmental conditions",
      "Tactical Network Integration with existing defense systems",
      "Rapid Deployment with quick setup for time-critical missions"
    ]
  };

  // Icons for each solution category
  const getSolutionIcon = (id: string) => {
    switch(id) {
      case 'edge-ai':
        return (
          <svg className="w-12 h-12 text-navy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v6m0 12v2M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>
          </svg>
        );
      case 'data-storage':
        return (
          <svg className="w-12 h-12 text-navy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8" />
          </svg>
        );
      case 'switches':
        return (
          <svg className="w-12 h-12 text-navy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      title="Advanced Defense Solutions | TRINETHRA DEFENTECH"
      description="Advanced data systems for national security applications. Rugged, secure, and reliable defense technology."
    >
      {/* Hero Section */}
      <section className="bg-navy py-24 px-6 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-condensed font-bold mb-6 text-cream"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Advanced Defense-Grade Solutions
            </motion.h1>
            
            <motion.p 
              className="text-xl text-cream/90 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Engineered for mission-critical national security applications with 
              military-grade reliability and performance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2">
              {['MIL-STD-810', 'AES-256', 'FIPS 140-2', 'MIL-STD-461'].map((cert, i) => (
                <span key={i} className="text-sm font-medium bg-cream/10 text-cream px-3 py-1 rounded-full">
                  {cert}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Solutions Grid */}
      <section className="bg-white py-16 px-6 md:py-24">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-condensed font-bold mb-6 text-navy inline-block border-b-2 border-forest pb-2">
                Our Defense Technology Solutions
              </h2>
              <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">
                Explore our portfolio of advanced, rugged, and secure solutions designed for 
                the most demanding defense and national security applications.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {productsData.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col h-full"
                >
                  <div className="bg-white border-t border-x border-gray-200 rounded-t-xl p-6 flex-grow">
                    <div className="flex justify-center items-center h-32 mb-6 bg-gray-50 rounded-lg">
                      <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center">
                        {getSolutionIcon(product.id)}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-condensed font-bold mb-3 text-navy text-center">
                      {product.title}
                    </h3>
                    
                    <p className="text-charcoal/80 mb-6 text-center">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <FaCheck className="text-forest mt-1 mr-3 shrink-0" />
                          <span className="text-charcoal/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 bg-gray-50 rounded-b-xl p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.certifications.slice(0, 2).map((cert, i) => (
                        <span key={i} className="text-xs font-medium bg-forest/10 text-forest px-2 py-1 rounded-full">
                          {cert}
                        </span>
                      ))}
                      {product.certifications.length > 2 && (
                        <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          +{product.certifications.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      to={`/solutions/${product.id}`}
                      className="w-full block text-center bg-forest text-white font-medium py-2.5 px-4 rounded-md hover:bg-forest/90 transition-colors"
                    >
                      Explore Solution
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-50 py-16 md:py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 bg-white p-8 md:p-12 rounded-xl shadow-md border border-gray-200"
            >
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy">Need a Custom Defense Solution?</h2>
                <p className="text-charcoal/80 mb-0">
                  Our team of defense technology experts can help you design and implement 
                  custom solutions that meet your specific mission requirements and security standards.
                </p>
              </div>
              
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link href="/contact" className="inline-flex items-center justify-center bg-navy hover:bg-navy/90 text-white font-bold py-3 px-6 rounded-md shadow-md transition-colors w-full md:w-auto">
                  Contact Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Main Router Component
export default function Solutions() {
  const [isDetailsPage] = useRoute("/solutions/:solutionId");
  
  if (isDetailsPage) {
    return <SolutionDetail />;
  }

  return <SolutionList />;
}