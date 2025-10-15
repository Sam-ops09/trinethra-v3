import React from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '@/content/home';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

export function HomeProcess() {
  return (
    <section className="py-20 lg:py-32 bg-cream/20" aria-labelledby="process-heading">
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
              <div className="w-8 h-px bg-signal" />
              <span className="text-xs font-semibold text-steel tracking-[0.1em] uppercase">
                Our Process
              </span>
              <div className="w-8 h-px bg-signal" />
            </div>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            id="process-heading" 
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight"
          >
            Precision
            <span className="block font-semibold">Engineering Process</span>
          </motion.h2>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-steel/20 md:transform md:-translate-x-0.5" />

          <motion.div
            className="space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerChildren}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.title}
                  variants={fadeInUp}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-teal transform -translate-x-2 md:-translate-x-2 z-10">
                    <div className="absolute inset-0.5 bg-teal" />
                  </div>

                  {/* Step Number */}
                  <div className={`absolute left-20 md:hidden text-6xl font-light text-teal/10 leading-none`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${
                    isEven ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className="bg-white border border-steel/10 p-8 group hover:border-teal/30 transition-all duration-500 relative overflow-hidden">
                      {/* Large Step Number (Desktop) */}
                      <div className={`hidden md:block absolute top-4 text-6xl font-light text-teal/5 leading-none ${
                        isEven ? 'right-4' : 'left-4'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Icon */}
                      <div className="mb-6 relative z-10">
                        <div className="w-16 h-16 border border-forest/20 flex items-center justify-center group-hover:border-signal/40 transition-colors">
                          <Icon className="text-2xl text-forest group-hover:text-signal transition-colors" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold text-charcoal mb-4 leading-tight">
                          {step.title}
                        </h3>
                        
                        <p className="text-steel leading-relaxed font-light">
                          {step.description}
                        </p>

                        {/* Phase Indicator */}
                        <div className="mt-6 pt-4 border-t border-steel/10">
                          <div className="flex items-center gap-2">
                            <div className="text-xs uppercase tracking-wider text-steel font-semibold">
                              Phase {index + 1}
                            </div>
                            <div className="flex-1 h-px bg-steel/10">
                              <motion.div 
                                className="h-full bg-signal"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(index + 1) * 25}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-signal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Empty space for opposite side on desktop */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-20 pt-16 border-t border-steel/10"
        >
          <p className="text-steel font-light mb-8 max-w-2xl mx-auto">
            From initial concept to deployment and sustainment, we ensure every system 
            meets the highest standards of military precision and reliability.
          </p>
          <div className="flex items-center justify-center gap-8 text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-forest" />
              <span className="text-charcoal font-semibold">Requirements Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-teal" />
              <span className="text-charcoal font-semibold">Systems Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-signal" />
              <span className="text-charcoal font-semibold">Lifecycle Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}