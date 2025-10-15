import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { integratedSolutions } from '@/content/home';
import { FaArrowRight } from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

export function HomeSolutions() {
  return (
    <section className="py-20 lg:py-32 bg-cream/30" aria-labelledby="solutions-heading">
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
              <div className="w-8 h-px bg-teal" />
              <span className="text-xs font-semibold text-steel tracking-[0.1em] uppercase">
                Integrated Solutions
              </span>
              <div className="w-8 h-px bg-teal" />
            </div>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            id="solutions-heading" 
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-6"
          >
            Mission-Critical
            <span className="block font-semibold">Technology Platforms</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-steel max-w-3xl mx-auto leading-relaxed font-light"
          >
            Engineered for the most demanding operational environments, our solutions 
            deliver uncompromising performance when failure is not an option.
          </motion.p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-steel/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
        >
          {integratedSolutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                variants={fadeInUp}
                className="bg-white p-12 group hover:bg-cream/50 transition-all duration-500 relative overflow-hidden"
              >
                {/* Index Number */}
                <div className="absolute top-6 right-6 text-6xl font-light text-teal/5 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="mb-8 relative z-10">
                  <div className="w-16 h-16 border-2 border-forest/10 flex items-center justify-center group-hover:border-teal/30 transition-colors">
                    <Icon className="text-2xl text-forest group-hover:text-teal transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-charcoal mb-4 leading-tight">
                    {solution.title}
                  </h3>
                  
                  <p className="text-steel text-sm leading-relaxed mb-8 font-light">
                    {solution.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mb-8">
                    <div className="text-xs uppercase tracking-wider text-steel mb-4 font-semibold">
                      Key Capabilities
                    </div>
                    <div className="space-y-2">
                      {solution.capabilities.map((capability) => (
                        <div key={capability} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-teal" />
                          <span className="text-xs text-charcoal font-light">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More Link */}
                  <Link href={solution.link}>
                    <button className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:text-teal transition-colors tracking-wider uppercase group">
                      Learn More
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}