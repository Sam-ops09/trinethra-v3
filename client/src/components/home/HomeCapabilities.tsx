import React from 'react';
import { motion } from 'framer-motion';
import { capabilities } from '@/content/home';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

export function HomeCapabilities() {
  return (
    <section className="py-20 lg:py-32 bg-white" aria-labelledby="capabilities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-forest" />
              <span className="text-xs font-semibold text-steel tracking-[0.1em] uppercase">
                Core Capabilities
              </span>
              <div className="w-8 h-px bg-forest" />
            </div>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            id="capabilities-heading" 
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight"
          >
            Engineering
            <span className="block font-semibold">Excellence</span>
          </motion.h2>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.title}
                variants={fadeInUp}
                className="group"
              >
                <div className="flex items-start gap-6">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 border border-steel/20 flex items-center justify-center group-hover:border-teal/40 transition-all duration-500">
                      <Icon className="text-2xl text-forest group-hover:text-teal transition-colors duration-500" />
                    </div>
                    
                    {/* Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-cream border border-teal/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-charcoal">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-charcoal mb-4 leading-tight">
                      {capability.title}
                    </h3>
                    
                    <p className="text-steel leading-relaxed font-light">
                      {capability.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="h-px bg-steel/10 relative overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-teal"
                          initial={{ width: 0 }}
                          whileInView={{ width: '90%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-20 pt-16 border-t border-steel/10"
        >
          <p className="text-steel font-light mb-8">
            Experience the difference that precision engineering makes
          </p>
          <div className="inline-flex items-center gap-8 text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal" />
              <span className="text-charcoal font-semibold">MIL-STD Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-forest" />
              <span className="text-charcoal font-semibold">NATO Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-signal" />
              <span className="text-charcoal font-semibold">FIPS Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}