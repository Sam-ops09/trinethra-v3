import { type Variants } from 'framer-motion';

// Basic fade in from bottom
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  }
};

// Fade in without movement
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: 'easeOut' 
    } 
  }
};

// Fade in with scale
export const fadeInScale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.7, 
      ease: 'easeOut' 
    } 
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.7, 
      ease: 'easeOut' 
    } 
  }
};

// Container for staggered children animations
export const staggerChildren: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.1 
    }
  }
};

// Fast staggered children for grids
export const fastStaggered: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: 0.03 
    }
  }
};

// Slow reveal for hero sections
export const slowReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, 
      ease: 'easeOut' 
    } 
  }
};

// Scale in with bounce
export const scaleInBounce: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.34, 1.56, 0.64, 1] 
    } 
  }
};