import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface HeroCarouselProps {
  showIndicators?: boolean;
  showControls?: boolean;
  showCaptions?: boolean;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const carouselData = [
  {
    image: '/assets/products/edge-server.jpg',
    title: 'Advanced Tactical Computing',
    description: 'Ruggedized edge servers delivering real-time processing in demanding environments',
    specs: ['MIL-STD-810H Certified', 'IP67 Rating', 'EMI/EMC Compliant']
  },
  {
    image: '/assets/carousel1.jpg',
    title: 'Defense Communication Systems',
    description: 'Secure, high-bandwidth communication platforms for mission-critical operations',
    specs: ['FIPS 140-2 Encryption', 'Multi-band Support', 'Mesh Networking']
  },
  {
    image: '/assets/products/panel-pc.png',
    title: 'Aerospace Integration',
    description: 'Lightweight, high-performance systems designed for aerospace applications',
    specs: ['DO-178C Compliant', 'Vibration Resistant', 'Temperature Hardened']
  }
];

export function HeroCarousel({
  showIndicators = true,
  showControls = true,
  showCaptions = true,
  className = '',
  autoPlay = false,
  autoPlayInterval = 5000
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative bg-white overflow-hidden ${className}`} aria-label="Hero Carousel">
      {/* Main Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="relative w-full h-full">
              <img
                src={carouselData[currentIndex].image}
                alt={carouselData[currentIndex].title}
                className="w-full h-full object-cover sm:object-center object-top"
                style={{ filter: 'grayscale(20%) brightness(1.1)' }}
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-charcoal/40 sm:via-transparent sm:to-transparent" />
              
              {/* Geometric Accent Lines - Hidden on mobile, visible on larger screens */}
              <div className="hidden sm:block absolute top-4 left-4 w-8 lg:w-16 h-px bg-teal" />
              <div className="hidden sm:block absolute top-4 left-4 w-px h-8 lg:h-16 bg-teal" />
              <div className="hidden sm:block absolute bottom-4 right-4 w-8 lg:w-16 h-px bg-forest" />
              <div className="hidden sm:block absolute bottom-4 right-4 w-px h-8 lg:h-16 bg-forest" />
            </div>

            {/* Data Overlay Points - Responsive positioning and sizing */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white/90 backdrop-blur-sm border border-teal/20 p-2 sm:p-3 min-w-[100px] sm:min-w-[120px]">
              <div className="text-xs text-steel uppercase tracking-wider mb-1">System Status</div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-charcoal">OPERATIONAL</span>
              </div>
            </div>

            <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-3 sm:left-6 bg-cream/95 backdrop-blur-sm border border-forest/20 p-2 sm:p-3 min-w-[110px] sm:min-w-[140px]">
              <div className="text-xs text-steel uppercase tracking-wider mb-1">Mission Ready</div>
              <div className="text-base sm:text-lg font-semibold text-charcoal">
                {currentIndex === 0 && '98.7%'}
                {currentIndex === 1 && '99.9%'}
                {currentIndex === 2 && '100%'}
              </div>
            </div>

            {/* Caption Overlay - Fully responsive */}
            {showCaptions && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-steel/10 p-3 sm:p-4 md:p-6"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-charcoal mb-1 sm:mb-2 leading-tight">
                  {carouselData[currentIndex].title}
                </h3>
                <p className="text-steel text-xs sm:text-sm md:text-base mb-3 sm:mb-4 font-light max-w-full sm:max-w-md lg:max-w-lg">
                  {carouselData[currentIndex].description}
                </p>
                
                {/* Specifications - Responsive layout */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {carouselData[currentIndex].specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-1 sm:gap-2">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-teal flex-shrink-0" />
                      <span className="text-xs sm:text-xs md:text-sm text-charcoal font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls - Touch-friendly on mobile */}
        {showControls && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white border border-steel/20 hover:border-teal/40 flex items-center justify-center transition-all duration-200 group z-10 touch-manipulation"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-charcoal group-hover:text-teal text-xs sm:text-sm" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white border border-steel/20 hover:border-teal/40 flex items-center justify-center transition-all duration-200 group z-10 touch-manipulation"
              aria-label="Next image"
            >
              <FaChevronRight className="text-charcoal group-hover:text-teal text-xs sm:text-sm" />
            </button>
          </>
        )}

        {/* Indicators - Responsive sizing and positioning */}
        {showIndicators && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-8 sm:w-12 h-1 transition-all duration-300 touch-manipulation ${
                  index === currentIndex
                    ? 'bg-teal'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar - Responsive height */}
        {autoPlay && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20">
            <motion.div
              className="h-full bg-teal"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: autoPlayInterval / 1000,
                ease: 'linear',
                repeat: Infinity
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}