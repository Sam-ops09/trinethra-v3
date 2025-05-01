import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaCheck, FaChevronRight } from "react-icons/fa";

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

export default function Solutions() {
  const productsData = [
    {
      title: "Edge AI Systems",
      description: "Tactical intelligence processing at the network edge, enabling real-time threat detection and response without connectivity dependencies.",
      certifications: ["MIL-STD-810H", "DO-160G"],
      imagePlaceholder: "Edge AI System"
    },
    {
      title: "Rugged Storage Systems",
      description: "Secure, high-capacity data storage solutions hardened against physical and electronic threats with multi-layer encryption.",
      certifications: ["MIL-STD-461F", "AES-256"],
      imagePlaceholder: "Rugged Storage"
    },
    {
      title: "Tactical Network Switches",
      description: "Battlefield-ready networking equipment designed for secure, reliable communications in contested electromagnetic environments.",
      certifications: ["MIL-STD-1275E", "IP67"],
      imagePlaceholder: "Rugged Switches"
    }
  ];

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
                {productsData.map((product, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden card-hover">
                      <div className="w-full h-48 bg-navy/10 flex items-center justify-center">
                        <p className="text-navy font-medium">{product.imagePlaceholder}</p>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-condensed font-bold mb-3 text-navy">{product.title}</h3>
                        <p className="text-charcoal/80 mb-4">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.certifications.map((cert, i) => (
                            <span key={i} className="text-xs font-medium bg-forest/10 text-forest px-2 py-1 rounded-full">
                              {cert}
                            </span>
                          ))}
                        </div>
                        <a href="#" className="inline-flex items-center text-teal font-medium">
                          Technical specifications <FaChevronRight className="ml-1 text-xs" />
                        </a>
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
