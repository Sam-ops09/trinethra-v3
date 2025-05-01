import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaCheck, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { Link, useRoute } from "wouter";

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

// Detailed data for solution pages
const solutionDetails = {
  "edge-ai": {
    id: "edge-ai",
    title: "Edge AI Systems",
    description: "Essential features to get started with AI-powered systems optimized for field deployment.",
    fullDescription: "Tactical intelligence processing at the network edge, enabling real-time threat detection and response without connectivity dependencies.",
    certifications: ["MIL-STD-810H", "DO-160G"],
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
    ]
  },
  "data-storage": {
    id: "data-storage",
    title: "Rugged Data Storage",
    description: "Advanced capabilities for growing teams with secure, high-performance storage solutions.",
    fullDescription: "Secure, high-capacity data storage solutions hardened against physical and electronic threats with multi-layer encryption.",
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
      <section className="bg-white py-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link href="/solutions" className="text-teal hover:text-teal/80 flex items-center font-medium">
                <FaArrowLeft className="mr-2" /> Back to All Solutions
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-condensed font-bold mb-6 text-navy">
                  {solution.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg mb-8">
                  {solution.fullDescription}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8">
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
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-8">
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
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-navy text-cream rounded-lg p-8 shadow-lg">
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
              
              <div className="w-full md:w-1/3">
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
                    <h4 className="font-bold text-charcoal mb-2">Technical Documentation</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-teal hover:text-teal/80 flex items-center transition-colors text-sm">
                          <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                          Technical Specifications (PDF)
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-teal hover:text-teal/80 flex items-center transition-colors text-sm">
                          <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </svg>
                          Demo Video
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-teal hover:text-teal/80 flex items-center transition-colors text-sm">
                          <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/>
                          </svg>
                          Compliance Documentation
                        </a>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
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
