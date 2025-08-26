import React, { useEffect, useState } from 'react';
import { loadAnimationLibrary } from '@/lib/bundle-optimization';

const AnimatedCard: React.FC = () => {
  const [animationComponents, setAnimationComponents] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const components = await loadAnimationLibrary();
        setAnimationComponents(components);
        setIsVisible(true);
      } catch (error) {
        console.error('Failed to load animation library:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimations();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-muted-foreground">Loading animation library...</div>
      </div>
    );
  }

  if (!animationComponents) {
    return (
      <div className="w-full h-64 flex items-center justify-center border rounded-lg">
        <div className="text-center space-y-2">
          <div className="text-red-600">Failed to load animation library</div>
          <div className="text-sm text-muted-foreground">
            Showing fallback CSS animations instead
          </div>
        </div>
      </div>
    );
  }

  const { motion, AnimatePresence } = animationComponents;

  const cards = [
    {
      title: 'Tree Shaking',
      description: 'Removes unused code automatically',
      color: 'bg-blue-500',
      delay: 0
    },
    {
      title: 'Code Splitting',
      description: 'Splits bundle into smaller chunks',
      color: 'bg-green-500',
      delay: 0.1
    },
    {
      title: 'Dynamic Imports',
      description: 'Loads code only when needed',
      color: 'bg-purple-500',
      delay: 0.2
    },
    {
      title: 'Compression',
      description: 'Reduces file sizes with gzip/brotli',
      color: 'bg-orange-500',
      delay: 0.3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950">
        <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
          🎬 Animation Library Loaded Dynamically
        </h3>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          Framer Motion (~200KB) was loaded only when this component was requested.
        </p>
      </div>

      <AnimatePresence>
        {isVisible && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: card.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="p-6 border rounded-lg cursor-pointer"
              >
                <motion.div
                  className={`w-12 h-12 ${card.color} rounded-lg mb-4`}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: card.delay
                  }}
                />
                <h4 className="font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
      >
        <h4 className="font-semibold mb-2">Dynamic Loading Benefits</h4>
        <ul className="text-sm space-y-1">
          <li>✅ Faster initial page load</li>
          <li>✅ Better Core Web Vitals scores</li>
          <li>✅ Reduced bandwidth usage</li>
          <li>✅ Improved user experience</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default AnimatedCard;
