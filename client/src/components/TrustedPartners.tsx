// filepath: /Users/samanyu/Desktop/TRINETHRA-DEFENTECH-v3/client/src/components/TrustedPartners.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

interface TrustedPartnersProps {
  partners?: string[];
  heading?: string;
  cta?: React.ReactNode;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export function TrustedPartners({
  partners = ["ADE-DRDO", "CABS-DRDO", "GTRE-DRDO", "MTRDC-DRDO", "HAL", "ISRO"],
  heading = "Trusted By India's Elite Defense Organizations",
  cta
}: TrustedPartnersProps) {
  return (
    <section className="bg-navy/5 section-spacing relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20" aria-hidden="true" />
      <div className="section-container px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
        >
          <motion.h2 variants={fadeInUp} className="heading-clamp-2 font-condensed font-bold text-navy mb-4 text-balance">
            {heading}
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-20 h-1 bg-teal mx-auto mb-6 rounded" />
          <motion.p variants={fadeInUp} className="text-charcoal/70 max-w-2xl mx-auto text-lg text-balance">
            Our solutions are deployed across premier defense and research institutions, supporting critical missions and strategic capabilities.
          </motion.p>
        </motion.div>

        {/* Desktop / Tablet Grid */}
        <motion.div
          className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-stretch"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {partners.map((partner) => (
            <motion.div key={partner} variants={fadeInUp} className="group">
              <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-xl text-teal" />
                </div>
                <div className="font-condensed font-bold text-lg text-navy text-center group-hover:text-teal transition-colors duration-300">
                  {partner}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-forest/70">
                  <FaCheckCircle className="text-teal" />
                  <span>Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Marquee */}
        <div className="sm:hidden partner-marquee-wrapper mt-4" aria-label="Partner marquee">
          <div className="partner-marquee-track gap-4 pr-8">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="min-w-[160px] bg-white rounded-lg shadow-sm px-4 py-3 flex flex-col items-center justify-center border border-gray-100">
                <FaShieldAlt className="text-teal mb-2" />
                <span className="text-sm font-semibold text-navy text-center">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {cta && (
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {cta}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default TrustedPartners;

