import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

/**
 * Hook for triggering animations when elements scroll into view
 */
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    once: true, // Only trigger once
  });

  return { ref, isInView };
};

export default useScrollAnimation;
