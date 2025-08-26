import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { bounceVariants } from '../variants';
import { REDUCED_MOTION_CONFIG } from '../animation-config';

interface BounceAnimationProps {
  children: React.ReactNode;
  trigger?: boolean;
  className?: string;
}

/**
 * Bounce animation component for upvotes, reactions, and celebratory actions.
 * Triggers when the trigger prop changes to true.
 */
export const BounceAnimation: React.FC<BounceAnimationProps> = ({ 
  children, 
  trigger = false,
  className = ""
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  const variants = shouldReduceMotion ? REDUCED_MOTION_CONFIG : bounceVariants;

  return (
    <motion.div
      variants={variants}
      animate={trigger ? "animate" : "initial"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default BounceAnimation;
