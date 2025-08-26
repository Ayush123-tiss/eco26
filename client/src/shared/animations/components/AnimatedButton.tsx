import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { scaleVariants, glowVariants } from '../variants';
import { REDUCED_MOTION_CONFIG } from '../animation-config';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'eco' | 'glow';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Animated button component with scale and glow effects.
 * Includes eco-themed glow animation for primary actions.
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className = "",
  variant = 'default',
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  const getVariants = () => {
    if (shouldReduceMotion) return REDUCED_MOTION_CONFIG;
    
    switch (variant) {
      case 'glow':
        return glowVariants;
      case 'eco':
        return {
          ...scaleVariants,
          hover: {
            ...scaleVariants.hover,
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
          }
        };
      default:
        return scaleVariants;
    }
  };

  return (
    <motion.button
      variants={getVariants()}
      initial="initial"
      animate="animate"
      whileHover={!disabled && !shouldReduceMotion ? "hover" : undefined}
      whileTap={!disabled && !shouldReduceMotion ? "tap" : undefined}
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
