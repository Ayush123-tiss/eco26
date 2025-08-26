// Animation configuration and constants for consistent timing and easing
export const ANIMATION_CONFIG = {
  // Duration presets (in seconds)
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },
  
  // Easing presets
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    bouncy: [0.68, -0.55, 0.265, 1.55],
    gentle: [0.4, 0, 0.2, 1],
    elastic: [0.175, 0.885, 0.32, 1.275],
  },
  
  // Spring configurations
  spring: {
    gentle: { type: "spring", damping: 20, stiffness: 300 },
    bouncy: { type: "spring", damping: 15, stiffness: 400 },
    wobbly: { type: "spring", damping: 10, stiffness: 400 },
    stiff: { type: "spring", damping: 25, stiffness: 500 },
  },
  
  // Delay configurations for staggered animations
  stagger: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.2,
  }
} as const;

// Eco-themed animation variants
export const ECO_ANIMATIONS = {
  // Leaf-like floating animation
  leafFloat: {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  
  // Growth animation for eco elements
  ecoGrow: {
    initial: { scale: 0, rotate: -5 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: ANIMATION_CONFIG.spring.gentle
    },
    exit: { 
      scale: 0, 
      rotate: 5,
      transition: { duration: ANIMATION_CONFIG.duration.fast }
    }
  },
  
  // Eco glow effect
  ecoGlow: {
    initial: { 
      boxShadow: "0 0 0 rgba(34, 197, 94, 0)" 
    },
    animate: { 
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }
} as const;

// Reduced motion variants for accessibility
export const REDUCED_MOTION_CONFIG = {
  duration: 0.01,
  transition: { duration: 0.01 },
} as const;
