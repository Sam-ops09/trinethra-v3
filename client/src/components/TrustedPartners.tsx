import React from 'react';
import { motion } from 'framer-motion';

interface TrustedPartnersProps {
  partners?: string[];
  heading?: string;
  description?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

export function TrustedPartners({
  partners = ["ADE-DRDO", "CABS-DRDO", "GTRE-DRDO", "MTRDC-DRDO", "HAL", "ISRO"],
  heading = "Strategic Partners",
  description = "Collaborating with leading defense organizations"
}: TrustedPartnersProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-charcoal" aria-labelledby="partners-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-teal" />
            <span className="text-xs font-semibold text-cream/60 tracking-[0.1em] uppercase">
              Partnerships
            </span>
            <div className="w-8 h-px bg-teal" />
          </div>
          
          <h2 id="partners-heading" className="text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-tight mb-4 sm:mb-6">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-steel max-w-2xl mx-auto leading-relaxed font-light">
            {description}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-steel/20"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={partner} 
              variants={fadeInUp} 
              className="group"
            >
              <div className="bg-charcoal hover:bg-navy/50 border-none p-4 sm:p-6 lg:p-8 h-20 sm:h-24 flex items-center justify-center text-center transition-all duration-500 relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Partner Name */}
                <div className="text-cream/80 group-hover:text-cream font-medium text-xs sm:text-sm transition-all duration-300 relative z-10 tracking-wide">
                  {partner}
                </div>
                
                {/* Decorative Corner */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-teal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-steel">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-teal" />
              <span className="text-sm font-light tracking-wide">Certified Partnerships</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-forest" />
              <span className="text-sm font-light tracking-wide">Mission Proven</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-signal" />
              <span className="text-sm font-light tracking-wide">Combat Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TrustedPartners;