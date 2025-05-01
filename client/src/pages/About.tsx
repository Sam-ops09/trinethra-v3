import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUserLock, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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

export default function About() {
  const specificationData = [
    { label: "Temperature Range", value: "-40°C to +85°C" },
    { label: "Impact Resistance", value: "100G operational" },
    { label: "EMI Protection", value: "MIL-STD-461F" },
    { label: "Vibration Profile", value: "MIL-STD-810G" }
  ];

  return (
    <Layout
      title="Our Mission | Defense Solutions | TRINETHRA DEFENTECH"
      description="Defending freedom through innovation with mission-critical reliability and security clearance certified solutions."
    >
      <section className="py-32 px-6 bg-gray-50">
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
                Defending Freedom Through Innovation
              </motion.h1>
              <motion.p 
                className="text-lg text-charcoal/80"
                variants={fadeInUp}
              >
                Our mission is to protect personnel and infrastructure through advanced defense technology solutions 
                that deliver uncompromising reliability in mission-critical applications.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <FaShieldAlt className="text-2xl text-forest" />
                </div>
                <h2 className="text-2xl font-condensed font-bold mb-4 text-navy">Mission Critical Reliability</h2>
                <p className="text-charcoal/80 mb-4">
                  Our engineering standards exceed industry requirements to withstand high-G impacts, 
                  electromagnetic interference, temperature extremes from -40°C to +85°C, and chemical exposure.
                </p>
                <p className="text-charcoal/80">
                  Every component undergoes rigorous testing in simulated combat environments to ensure 
                  operational reliability when failure is not an option.
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {specificationData.map((spec, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-bold text-navy mb-1">{spec.label}</div>
                      <div className="text-charcoal/80">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <FaUserLock className="text-2xl text-forest" />
                </div>
                <h2 className="text-2xl font-condensed font-bold mb-4 text-navy">Security Clearance Certified</h2>
                <p className="text-charcoal/80 mb-4">
                  Our team holds top-level security clearances required for defense and intelligence operations, 
                  with stringent confidentiality protocols that exceed government requirements.
                </p>
                <p className="text-charcoal/80">
                  All manufacturing occurs in secure facilities with compartmentalized information access 
                  and regular counter-intelligence assessment.
                </p>
                
                <div className="mt-8">
                  <div className="rounded-lg shadow-lg w-full h-64 bg-navy/10 flex items-center justify-center">
                    <p className="text-navy font-medium">Secure defense facility image</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="#contact">
                <Button className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-8 rounded shadow-lg transition-all duration-300 inline-flex items-center justify-center">
                  Contact Our Team <FaArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
