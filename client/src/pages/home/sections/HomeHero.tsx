import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { HeroCarousel } from '@/components/HeroCarousel';
import { heroStats } from '@/content/home';
import { FaArrowRight } from 'react-icons/fa';
import { fadeInUp, staggerChildren } from '../motion-presets';

export function HomeHero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden" aria-label="Hero Section">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--navy)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--navy)) 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerChildren}
            className="text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center gap-3 bg-cream px-5 py-2 border border-forest/10">
                <div className="w-2 h-2 bg-teal" />
                <span className="text-xs font-semibold text-charcoal tracking-[0.1em] uppercase">
                  Defense Technology Leader
                </span>
              </div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-[0.9] mb-6 sm:mb-8 tracking-tight"
            >
              Advanced
              <span className="block font-semibold">Defense Systems</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg text-steel leading-relaxed mb-8 sm:mb-10 lg:mb-12 max-w-xl font-light"
            >
              Engineering mission-critical solutions for over a decade. 
              Specialized in aerospace systems, tactical computing, 
              and defense-grade hardware platforms.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16"
            >
              <Link href="/solutions">
                <Button className="bg-forest hover:bg-forest/90 text-cream px-10 py-6 text-sm font-medium transition-all duration-200 inline-flex items-center group border-none tracking-wide">
                  EXPLORE SOLUTIONS
                  <FaArrowRight className="ml-3 text-xs group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="bg-transparent hover:bg-charcoal hover:text-cream border border-charcoal/20 hover:border-charcoal text-charcoal px-10 py-6 text-sm font-medium transition-all duration-200 inline-flex items-center tracking-wide"
                >
                  GET CONSULTATION
                </Button>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-steel/10"
            >
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="text-left">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-teal mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-steel uppercase tracking-wider font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative frame - Hidden on mobile */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-teal/20 z-0 hidden sm:block" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-forest/20 z-0 hidden sm:block" />
              
              {/* Carousel Container */}
              <div className="relative bg-white border border-steel/10 overflow-hidden z-10">
                <HeroCarousel 
                  showIndicators={true}
                  showControls={false}
                  showCaptions={true}
                  className="aspect-[4/3] sm:aspect-[4/3]"
                  autoPlay={true}
                  autoPlayInterval={6000}
                />
              </div>
              
              {/* Floating Data Points - Responsive positioning */}
              <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 bg-cream border border-teal/20 p-3 sm:p-4 z-20">
                <div className="text-xs text-steel uppercase tracking-wider mb-1">Mission Ready</div>
                <div className="text-sm sm:text-lg font-semibold text-charcoal">100%</div>
              </div>
              
              <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-white border border-forest/20 p-3 sm:p-4 z-20">
                <div className="text-xs text-steel uppercase tracking-wider mb-1">Systems Deployed</div>
                <div className="text-sm sm:text-lg font-semibold text-charcoal">250+</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}