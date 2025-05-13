import React from "react";
import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLock, FaShieldAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
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

  return (
    <Layout
      title="Contact Us | TRINETHRA DEFENTECH"
      description="Get in touch with our defense technology specialists to discuss your specific needs and requirements. Contact TRINETHRA DEFENTECH for secure, rugged technology solutions."
    >
      <section className="bg-gray-50 py-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mb-16 text-center"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-condensed font-bold mb-6 text-navy"
              >
                Contact TRINETHRA DEFENTECH
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-charcoal/80 max-w-3xl mx-auto"
              >
                Connect with our defense specialists to discuss your mission-critical solutions. 
                All inquiries are treated with the highest level of security and confidentiality.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-4">
                  <FaPhone className="text-navy text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-navy">Call Us</h3>
                <p className="text-charcoal/80 mb-4">Our secure lines are available during business hours</p>
                <a href="tel:+918044556677" className="font-medium text-forest hover:text-forest/80 transition-colors">
                  +91 80 4455 6677
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-4">
                  <FaEnvelope className="text-navy text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-navy">Email Us</h3>
                <p className="text-charcoal/80 mb-4">For secure communication and inquiries</p>
                <a href="mailto:info@trinethra-defentech.com" className="font-medium text-forest hover:text-forest/80 transition-colors">
                  info@trinethra-defentech.com
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-4">
                  <FaMapMarkerAlt className="text-navy text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-navy">Visit Us</h3>
                <p className="text-charcoal/80 mb-4">Our secure headquarters location</p>
                <p className="text-charcoal/80">
                  100 Technology Drive<br />
                  Bengaluru, Karnataka 560001<br />
                  India
                </p>
              </motion.div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <FaLock className="text-forest mr-3 mt-1 text-xl" />
                  <div>
                    <h3 className="font-bold text-navy mb-1">Secure Communications</h3>
                    <p className="text-sm text-charcoal/80">All communications are encrypted and protected according to industry standards.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaShieldAlt className="text-forest mr-3 mt-1 text-xl" />
                  <div>
                    <h3 className="font-bold text-navy mb-1">NDA Available</h3>
                    <p className="text-sm text-charcoal/80">Non-disclosure agreements are available for sensitive discussions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaClock className="text-forest mr-3 mt-1 text-xl" />
                  <div>
                    <h3 className="font-bold text-navy mb-1">Response Time</h3>
                    <p className="text-sm text-charcoal/80">We respond to all inquiries within 24-48 business hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      {/*<ContactForm />*/}
    </Layout>
  );
}
