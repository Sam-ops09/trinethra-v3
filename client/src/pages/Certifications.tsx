import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FaBrain, FaNetworkWired, FaCodeBranch, FaArrowRight } from "react-icons/fa";

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

export default function Certifications() {
  const certifications = [
    {
      icon: <FaBrain />,
      title: "AI Research Excellence",
      organization: "OpenAI Foundation",
      date: "March 2024",
      description: "Advanced certification in tactical artificial intelligence applications for defense systems."
    },
    {
      icon: <FaNetworkWired />,
      title: "Neural Network Architecture",
      organization: "Deep Learning Institute",
      date: "January 2024",
      description: "Specialized accreditation in developing hardened neural networks for mission-critical applications."
    },
    {
      icon: <FaCodeBranch />,
      title: "Open Source Contribution",
      organization: "Global OSS Alliance",
      date: "Ongoing",
      description: "Recognition for contributions to secure, hardened open-source frameworks for defense applications."
    }
  ];

  const industryCertifications = [
    { title: "ISO 9001:2015", description: "Quality Management System" },
    { title: "AS9100D", description: "Aerospace Quality Standard" },
    { title: "ISO/IEC 27001", description: "Information Security Management" },
    { title: "CMMC Level 5", description: "Cybersecurity Maturity Model" },
    { title: "DO-178C", description: "Avionics Software Certification" },
    { title: "MIL-STD Compliance", description: "Multiple Standards Verified" }
  ];

  return (
    <Layout
      title="Professional Certifications | TRINETHRA DEFENTECH"
      description="Our comprehensive professional qualifications and industry certifications ensure we meet the highest standards for defense technology development."
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
                Certifications
              </motion.h1>
              <motion.p 
                className="text-lg text-charcoal/80"
                variants={fadeInUp}
              >
                Our comprehensive professional qualifications and industry certifications ensure 
                we meet the highest standards for defense technology development.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {certifications.map((cert, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="certification-badge bg-white border border-gray-200 rounded-lg shadow-md p-6 h-full">
                    <div className="bg-teal/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <div className="text-2xl text-teal">{cert.icon}</div>
                    </div>
                    <h3 className="text-xl font-condensed font-bold mb-3 text-navy">{cert.title}</h3>
                    <p className="text-charcoal/80 mb-2">{cert.organization}</p>
                    <p className="text-charcoal/60 text-sm mb-4">{cert.date}</p>
                    <p className="text-charcoal/80">{cert.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-condensed font-bold mb-6 text-navy">Industry Certifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {industryCertifications.map((cert, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="font-bold text-navy mb-1">{cert.title}</div>
                    <div className="text-charcoal/80 text-sm">{cert.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href="#" className="inline-flex items-center text-teal font-medium text-lg">
                View All Certifications <FaArrowRight className="ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
