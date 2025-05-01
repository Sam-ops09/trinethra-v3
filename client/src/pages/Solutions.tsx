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
  return solution.id === "edge-ai" && 'products' in solution;
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
    fullDescription: "Secure, high-capacity data storage solutions hardened against physical and electronic threats with multi-layer encryption.",
    mainQuestion: "Is a rugged storage system right for you?",
    mainAnswer: "If you need secure, high-capacity data storage in extreme environments, our rugged storage systems offer unmatched reliability and protection.",
    certifications: ["MIL-STD-461F", "AES-256"],
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
    ]
  },
  "switches": {
    id: "switches",
    title: "Rugged Switches",
    description: "All features for large scale operations, providing robust networking hardware for reliable operations.",
    fullDescription: "Battlefield-ready networking equipment designed for secure, reliable communications in contested electromagnetic environments.",
    mainQuestion: "Is a rugged switch right for you?",
    mainAnswer: "If you need networking equipment that can survive the harshest field conditions while maintaining security and reliability, our rugged switches deliver uncompromising performance.",
    certifications: ["MIL-STD-1275E", "IP67"],
    imagePlaceholder: "Rugged Switches",
    features: [
      "Vibration and shock resistant",
      "Extended temperature range",
      "Network isolation features",
      "EMI/EMP shielding",
      "Redundant power systems"
    ],
    applications: [
      "Tactical field networks",
      "Mobile command vehicles",
      "Forward operating bases",
      "Naval vessel communications"
    ]
  }
};

// Tab component for product details
function ProductTabs({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!products || products.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Tab Navigation */}
      <div className="grid grid-cols-2 mb-6 overflow-hidden rounded-t-md shadow-sm">
        {products.map((product, index) => (
          <button
            key={index}
            className={`py-3 px-4 font-medium text-center transition-colors ${index === activeTab ? 'bg-forest text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab(index)}
          >
            {product.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="border border-gray-200 rounded-b-md p-6 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Features */}
          <div>
            <h3 className="flex items-center font-condensed text-forest font-bold mb-4 uppercase text-sm tracking-wide">
              <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Key Features
            </h3>
            <ul className="space-y-2">
              {products[activeTab].features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="text-teal mr-2">•</span>
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
            <div className="space-y-3">
              {Object.entries(products[activeTab].specs).map(([key, value]: [string, any], idx: number) => (
                <div key={idx} className="grid grid-cols-2 gap-4">
                  <div className="font-medium text-charcoal/80">{key}:</div>
                  <div className="whitespace-pre-line">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <div className="flex space-x-2">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-forest text-white hover:bg-forest/90 transition-colors">
              Product Page
              <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
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
                className="text-4xl md:text-5xl font-bold mb-6 text-forest border-l-4 border-forest pl-4">
                {solution.id === "edge-ai" ? "Edge artificial intelligence" : solution.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg mb-8 max-w-3xl">
                {solution.fullDescription}
              </motion.p>
            </div>

            {/* Product Tabs for Edge AI */}
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
                  className="military-card bg-white p-6 rounded-lg shadow-md sticky top-24">
                  <div className="h-16 w-16 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {solution.id === "edge-ai" && <path d="M12 2v6m0 12v2M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>}
                      {solution.id === "data-storage" && <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8" /></>}
                      {solution.id === "switches" && <><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-navy">{solution.title}</h3>
                  <p className="text-charcoal/80 mb-4">{solution.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {solution.certifications.map((cert, i) => (
                      <span key={i} className="text-xs font-medium bg-forest/10 text-forest px-2 py-1 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-bold text-charcoal mb-2">Request Information</h4>
                    <a href="#contact" className="w-full block text-center bg-forest text-white font-medium py-2 px-4 rounded hover:bg-forest/90 transition-colors mt-4">
                      Contact Us
                    </a>
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
                <a href="#contact" className="mt-4 md:mt-0 bg-teal hover:bg-teal/90 text-white font-bold py-3 px-6 rounded shadow-lg transition-all duration-300">
                  Request Consultation
                </a>
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
    description: solution.fullDescription,
    certifications: solution.certifications,
    imagePlaceholder: solution.imagePlaceholder
  }));

  const features = [
    "Shock/vibration tolerance exceeding MIL-STD-810 requirements",
    "FIPS 140-2 validated cryptographic modules",
    "AES-256 encryption with NSA Type 1 compatibility",
    "Seamless integration with existing tactical networks"
  ];

  return (
    <Layout
      title="Advanced Defense Solutions | TRINETHRA DEFENTECH"
      description="Advanced data systems for national security applications. Rugged, secure, and reliable defense technology."
    >
      <section className="bg-white py-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-condensed font-bold mb-6 text-navy"
                variants={fadeInUp}
              >
                Advanced Data Systems for National Security Applications
              </motion.h1>
              <motion.p 
                className="text-lg text-charcoal/80"
                variants={fadeInUp}
              >
                Engineered solutions that integrate seamlessly into tactical operations 
                while meeting the highest standards for reliability, security, and performance.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 mb-16 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="rounded-lg shadow-md w-full h-56 bg-navy/10 flex items-center justify-center mb-4">
                    <p className="text-navy font-medium">TRINETHRA rugged data recorder</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium bg-teal/10 text-teal px-2 py-1 rounded-full">AES-256</span>
                    <span className="text-xs font-medium bg-teal/10 text-teal px-2 py-1 rounded-full">FIPS 140</span>
                    <span className="text-xs font-medium bg-teal/10 text-teal px-2 py-1 rounded-full">MIL-SPEC</span>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-condensed font-bold mb-4 text-navy">TRINETHRA Rugged Data Recorders</h2>
                  <p className="text-charcoal/80 mb-4">
                    Our flagship rugged data recording systems deliver unparalleled performance across aerospace, 
                    defense, maritime, and space applications. Designed to operate in the most extreme environments, 
                    they maintain complete data integrity while providing real-time encryption.
                  </p>
                  <ul className="text-charcoal/80 space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-forest mt-1 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Product Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h2 className="text-2xl font-condensed font-bold mb-8 text-navy">Defense Technology Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {productsData.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Card className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover h-full">
                      <div className="w-full h-48 bg-navy/10 flex items-center justify-center">
                        <p className="text-navy font-medium">{product.imagePlaceholder}</p>
                      </div>
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-condensed font-bold mb-3 text-navy">{product.title}</h3>
                        <p className="text-charcoal/80 mb-4 flex-grow">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.certifications.map((cert, i) => (
                            <span key={i} className="text-xs font-medium bg-forest/10 text-forest px-2 py-1 rounded-full">
                              {cert}
                            </span>
                          ))}
                        </div>
                        <Link 
                          to={`/solutions/${product.id}`}
                          className="inline-flex items-center text-teal font-medium hover:text-teal/80 transition-colors"
                        >
                          Learn more <FaChevronRight className="ml-1 text-xs" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
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