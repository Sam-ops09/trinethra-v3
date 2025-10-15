import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaEnvelope, FaPhone } from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

export function HomeCTA() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-navy" aria-label="Call to Action">
      {/* Minimal grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
        >
          {/* Main Content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white/5 px-5 py-2 border border-white/10">
                <div className="w-2 h-2 bg-teal" />
                <span className="text-xs font-semibold text-white/80 tracking-[0.1em] uppercase">
                  Ready to Deploy
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight mb-8"
            >
              Mission-Critical
              <span className="block font-semibold mt-2">Systems Await</span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto font-light"
            >
              Partner with TRINETHRA DEFENTECH for defense-grade technology solutions 
              engineered for operational superiority and mission success.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/contact">
                <Button className="bg-teal hover:bg-teal/90 text-white font-medium px-10 py-6 transition-all duration-200 inline-flex items-center text-sm tracking-wide group border-none">
                  START YOUR PROJECT
                  <FaArrowRight className="ml-3 text-xs group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-white hover:text-navy border border-white/20 hover:border-white text-white font-medium px-10 py-6 transition-all duration-200 inline-flex items-center text-sm tracking-wide"
                >
                  VIEW SOLUTIONS
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div 
            variants={fadeInUp}
            className="grid sm:grid-cols-2 gap-px bg-white/5"
          >
            <div className="bg-navy/30 backdrop-blur-sm border border-white/10 p-8 flex items-center gap-4 group hover:bg-navy/50 transition-colors">
              <div className="w-14 h-14 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-teal/40 transition-colors">
                <FaEnvelope className="text-teal text-lg" />
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">Direct Email</div>
                <div className="text-sm text-white font-light">info@trinethra-defentech.com</div>
              </div>
            </div>
            <div className="bg-navy/30 backdrop-blur-sm border border-white/10 p-8 flex items-center gap-4 group hover:bg-navy/50 transition-colors">
              <div className="w-14 h-14 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-teal/40 transition-colors">
                <FaPhone className="text-teal text-lg" />
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">24/7 Support</div>
                <div className="text-sm text-white font-light">Technical Assistance</div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={fadeInUp}
            className="mt-16 pt-12 border-t border-white/10 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-light text-teal mb-2">15+</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-light text-teal mb-2">100%</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Mission Success</div>
              </div>
              <div>
                <div className="text-3xl font-light text-teal mb-2">24/7</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Support Available</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}