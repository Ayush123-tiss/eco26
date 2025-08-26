import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cardHoverVariants } from '../variants';
import { REDUCED_MOTION_CONFIG } from '../animation-config';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  onClick?: () => void;
}

/**
 * Animated card component with hover effects and entry animations.
 * Perfect for blog cards, product items, and thread cards.
 */
export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = "",
  enableHover = true,
  onClick 
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  const variants = shouldReduceMotion ? REDUCED_MOTION_CONFIG : cardHoverVariants;
  
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileHover={enableHover && !shouldReduceMotion ? "hover" : undefined}
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
