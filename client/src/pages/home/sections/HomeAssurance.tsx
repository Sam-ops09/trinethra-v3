import React from 'react';
import { motion } from 'framer-motion';
import { assuranceHighlights, certificationStandards } from '@/content/home';
import { fadeInUp, staggerChildren } from '../motion-presets';

export function HomeAssurance() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white" aria-labelledby="assurance-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-forest" />
              <span className="text-xs font-semibold text-steel tracking-[0.1em] uppercase">
                Quality Assurance
              </span>
              <div className="w-8 h-px bg-forest" />
            </div>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            id="assurance-heading" 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-4 sm:mb-6"
          >
            Uncompromising
            <span className="block font-semibold">Standards</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg text-steel max-w-3xl mx-auto leading-relaxed font-light"
          >
            Every system undergoes rigorous testing and validation to ensure mission success 
            in the most challenging operational environments.
          </motion.p>
        </motion.div>

        {/* Assurance Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-steel/5 mb-12 sm:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
        >
          {assuranceHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                variants={fadeInUp}
                className="bg-white p-6 sm:p-8 lg:p-10 group hover:bg-cream/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 opacity-5">
                  <Icon className="w-full h-full text-teal" />
                </div>

                {/* Icon */}
                <div className="mb-6 sm:mb-8 relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border border-teal/20 flex items-center justify-center group-hover:border-teal/40 transition-colors">
                    <Icon className="text-xl sm:text-2xl text-teal" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold text-charcoal mb-3 sm:mb-4 leading-tight">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-steel text-sm sm:text-base leading-relaxed font-light">
                    {highlight.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-4 sm:mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                        Compliance Level
                      </span>
                      <span className="text-xs font-semibold text-teal">100%</span>
                    </div>
                    <div className="h-1 bg-steel/10 relative overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-teal"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
          className="bg-charcoal text-cream p-6 sm:p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-light text-cream mb-3 sm:mb-4">
                Industry <span className="font-semibold">Certifications</span>
              </h3>
              <p className="text-sm sm:text-base text-steel font-light">
                Adherence to the most stringent defense and quality standards
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8"
            >
              {certificationStandards.map((standard, index) => (
                <motion.div
                  key={standard}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="border border-steel/30 hover:border-teal/50 p-3 sm:p-4 transition-all duration-300 bg-white/5 hover:bg-white/10">
                    <div className="text-xs sm:text-sm font-semibold text-cream group-hover:text-teal transition-colors">
                      {standard}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-steel/20"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-teal mb-2">100%</div>
                <div className="text-xs uppercase tracking-wider text-steel">
                  Compliance Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-teal mb-2">15+</div>
                <div className="text-xs uppercase tracking-wider text-steel">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-light text-teal mb-2">Zero</div>
                <div className="text-xs uppercase tracking-wider text-steel">
                  Mission Failures
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}