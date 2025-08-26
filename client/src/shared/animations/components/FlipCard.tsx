import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { flipVariants } from '../variants';
import { REDUCED_MOTION_CONFIG } from '../animation-config';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  autoFlip?: boolean;
  flipDelay?: number;
}

/**
 * 3D flip card component perfect for certificates and achievement badges.
 * Can auto-flip or flip on hover.
 */
export const FlipCard: React.FC<FlipCardProps> = ({ 
  frontContent,
  backContent,
  className = "",
  autoFlip = false,
  flipDelay = 3000
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    if (autoFlip && !shouldReduceMotion) {
      const interval = setInterval(() => {
        setIsFlipped(prev => !prev);
      }, flipDelay);
      
      return () => clearInterval(interval);
    }
  }, [autoFlip, flipDelay, shouldReduceMotion]);

  const variants = shouldReduceMotion ? REDUCED_MOTION_CONFIG : flipVariants;

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {isFlipped ? backContent : frontContent}
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => !autoFlip && setIsFlipped(true)}
      onMouseLeave={() => !autoFlip && setIsFlipped(false)}
    >
      <motion.div
        variants={variants}
        animate={isFlipped ? "hover" : "initial"}
        className="relative w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </div>
        
        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
