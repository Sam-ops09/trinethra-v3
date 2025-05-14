import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  FaShieldAlt, 
  FaBolt, 
  FaTemperatureHigh, 
  FaSatellite, 
  FaTachometerAlt, 
  FaLock, 
  FaCheckCircle, 
  FaCircle,
  FaArrowRight,
  FaDownload
} from "react-icons/fa";

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

export default function Offerings() {
  const capabilities = [
    {
      icon: <FaShieldAlt />,
      title: "Hardened Encryption",
      description: "Military-grade encryption with FIPS 140-2 validation and AES-256 algorithms ensuring data security in contested environments."
    },
    {
      icon: <FaBolt />,
      title: "EMI/EMP Protection",
      description: "Electromagnetic interference and pulse protection exceeding MIL-STD-461F requirements for operation in high-threat environments."
    },
    {
      icon: <FaTemperatureHigh />,
      title: "Environmental Resilience",
      description: "Operation certified across extreme temperatures (-40°C to +85°C), humidity, altitude, and salt fog exposure per MIL-STD-810 standards."
    },
    {
      icon: <FaSatellite />,
      title: "Satellite Integration",
      description: "Secure integration with military satellite networks providing global coverage with minimal latency and signal dropout resistance."
    },
    {
      icon: <FaTachometerAlt />,
      title: "Real-time Analytics",
      description: "Edge processing capabilities delivering actionable intelligence with sub-millisecond decision making for time-critical applications."
    },
    {
      icon: <FaLock />,
      title: "Zero-Trust Architecture",
      description: "Comprehensive security model requiring verification for every access attempt, eliminating trusted zones vulnerable to exploitation."
    }
  ];

  const specifications = [
    {
      title: "Production Capacity",
      items: [
        "ISO 9001:2015 certified facilities",
        "100% automated testing",
        "5,000+ units annual capacity",
        "Secure supply chain with redundancy"
      ]
    },
    {
      title: "Compliance Standards",
      items: [
        "MIL-STD-810G/H environmental",
        "MIL-STD-461F/G EMI/EMC",
        "DO-160G avionics certification",
        "FIPS 140-2 cryptographic validation"
      ]
    },
    {
      title: "Research Capabilities",
      items: [
        "Advanced materials laboratory",
        "Environmental test chambers",
        "Signal intelligence research team",
        "Quantum encryption development"
      ]
    }
  ];

  const deploymentScenarios = [
    "Tactical field operations with limited infrastructure",
    "Maritime defense systems requiring salt water resistance",
    "Airborne reconnaissance with high-altitude certification",
    "Command center integration with legacy systems",
    "Space-based operations with radiation hardening"
  ];

  return (
    <Layout
      title="Strategic Offerings | TRINETHRA Defense | TRINETHRA DEFENTECH"
      description="Our defense technology portfolio delivers mission-critical capabilities with uncompromising reliability and security."
    >
      <section className="bg-gray-50 py-32 px-6">
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
                Strategic Offerings
              </motion.h1>
              <motion.p 
                className="text-lg text-charcoal/80"
                variants={fadeInUp}
              >
                Our defense technology portfolio delivers mission-critical capabilities 
                with uncompromising reliability and security.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 mb-16 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-condensed font-bold mb-4 text-navy">Mission Overview</h2>
              <p className="text-charcoal/80 mb-6">
                TRINETHRA data recorders provide real-time encryption and data integrity across air, land, sea, 
                and space platforms. Our systems integrate seamlessly with existing infrastructure while 
                maintaining the highest levels of security certification.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="rounded w-full h-64 bg-navy/10 flex items-center justify-center">
                    <p className="text-navy font-medium">Image can be added here</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Deployment Scenarios</h3>
                  <ul className="text-charcoal/80 space-y-3">
                    {deploymentScenarios.map((scenario, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-forest mt-1 mr-2" />
                        <span>{scenario}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Core Capabilities */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h2 className="text-2xl font-condensed font-bold mb-8 text-navy">Core Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {capabilities.map((capability, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="bg-white p-6 rounded-lg shadow-sm h-full">
                      <div className="flex items-center mb-4">
                        <div className="bg-forest/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                          {capability.icon}
                        </div>
                        <h3 className="text-xl font-condensed font-bold text-navy">{capability.title}</h3>
                      </div>
                      <p className="text-charcoal/80">{capability.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Technical Specifications */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h2 className="text-2xl font-condensed font-bold mb-8 text-navy">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {specifications.map((spec, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="bg-white p-6 rounded-lg shadow-sm h-full">
                      <h3 className="text-xl font-condensed font-bold mb-4 text-navy">{spec.title}</h3>
                      <ul className="text-charcoal/80 space-y-2">
                        {spec.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <FaCircle className="text-xs text-forest mt-1.5 mr-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/contact">
                <Button className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-8 rounded shadow-lg transition-all duration-300 inline-flex items-center justify-center">
                  Request Consultation <FaArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="bg-transparent hover:bg-navy/5 border-2 border-navy text-navy font-bold py-3 px-8 rounded transition-all duration-300 inline-flex items-center justify-center"
              >
                Download Capabilities <FaDownload className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
