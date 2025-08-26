import { Variants } from 'framer-motion';
import { ANIMATION_CONFIG } from './animation-config';

// Page transition animations
export const pageTransitions: Variants = {
  initial: {
    opacity: 0,
    x: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.98,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
};

// Slide up from bottom
export const slideUpVariants: Variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
    },
  },
};

// Fade variants
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: ANIMATION_CONFIG.duration.normal 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: ANIMATION_CONFIG.duration.fast 
    }
  },
};

// Scale variants for buttons and interactive elements
export const scaleVariants: Variants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: ANIMATION_CONFIG.spring.gentle
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    transition: { duration: ANIMATION_CONFIG.duration.fast }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: ANIMATION_CONFIG.duration.fast }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
};

// Staggered container variants
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.normal,
    },
  },
};

// Children items for staggered animations
export const staggerItem: Variants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
};

// Card hover animations
export const cardHoverVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
};

// Bounce animation for upvotes/reactions
export const bounceVariants: Variants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.4,
      ease: ANIMATION_CONFIG.easing.bouncy,
    }
  },
};

// Pulse animation for notifications
export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Glow effect variants
export const glowVariants: Variants = {
  initial: { 
    boxShadow: "0 0 0 rgba(34, 197, 94, 0)",
    borderColor: "rgba(34, 197, 94, 0.2)",
  },
  animate: { 
    boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
    borderColor: "rgba(34, 197, 94, 0.6)",
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.gentle,
    }
  },
  hover: {
    boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)",
    borderColor: "rgba(34, 197, 94, 0.8)",
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
    }
  }
};

// 3D flip animation for certificates
export const flipVariants: Variants = {
  initial: { rotateY: 0 },
  hover: {
    rotateY: 180,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

// Navbar slide down animation
export const navbarVariants: Variants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
};

// Mobile menu slide animation
export const mobileMenuVariants: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
};

// Form field focus animations
export const formFieldVariants: Variants = {
  initial: { 
    scale: 1,
    borderColor: "rgba(209, 213, 219, 1)",
  },
  focus: {
    scale: 1.02,
    borderColor: "rgba(34, 197, 94, 1)",
    boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)",
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
  error: {
    borderColor: "rgba(239, 68, 68, 1)",
    boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
    x: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.4,
      ease: ANIMATION_CONFIG.easing.gentle,
    },
  },
};
