import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../variants';
import { REDUCED_MOTION_CONFIG } from '../animation-config';

interface StaggeredGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * Staggered grid component that animates children with a staggered effect.
 * Perfect for product grids, blog cards, and other grid layouts.
 */
export const StaggeredGrid: React.FC<StaggeredGridProps> = ({ 
  children, 
  className = "",
  staggerDelay 
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = staggerDelay 
    ? {
        ...staggerContainer,
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }
    : staggerContainer;

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={staggerItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredGrid;
