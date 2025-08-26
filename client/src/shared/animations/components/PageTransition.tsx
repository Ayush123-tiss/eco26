import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { pageTransitions } from '../variants';
import { REDUCED_MOTION_CONFIG } from '../animation-config';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  key?: string | number;
}

/**
 * Page transition wrapper component that provides smooth page transitions
 * with fade and slide effects. Respects user's reduced motion preferences.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "",
  key 
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  const variants = shouldReduceMotion ? REDUCED_MOTION_CONFIG : pageTransitions;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
