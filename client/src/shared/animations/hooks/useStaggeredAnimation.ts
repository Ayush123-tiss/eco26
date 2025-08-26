import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Hook for creating staggered animations for lists of items
 */
export const useStaggeredAnimation = (
  isVisible: boolean,
  itemCount: number,
  staggerDelay = 0.1
) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * staggerDelay,
          duration: 0.5,
          ease: "easeOut",
        },
      }));
    }
  }, [isVisible, controls, staggerDelay]);

  return controls;
};

export default useStaggeredAnimation;
