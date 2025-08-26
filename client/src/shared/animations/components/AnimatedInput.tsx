import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { formFieldVariants } from '../variants';
import { REDUCED_MOTION_CONFIG } from '../animation-config';

interface AnimatedInputProps {
  className?: string;
  isFocused?: boolean;
  hasError?: boolean;
  children: React.ReactNode;
}

/**
 * Animated input wrapper with focus and error animations.
 * Provides eco-green glow on focus and error shake animation.
 */
export const AnimatedInput: React.FC<AnimatedInputProps> = ({ 
  className = "",
  isFocused = false,
  hasError = false,
  children
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  const getAnimateState = () => {
    if (hasError) return "error";
    if (isFocused) return "focus";
    return "initial";
  };

  const variants = shouldReduceMotion ? REDUCED_MOTION_CONFIG : formFieldVariants;

  return (
    <motion.div
      variants={variants}
      animate={getAnimateState()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedInput;
