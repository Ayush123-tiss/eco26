import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
}

interface CelebrationEffectProps {
  trigger: boolean;
  type?: 'confetti' | 'leaves' | 'stars';
  duration?: number;
  particleCount?: number;
}

/**
 * Celebration effect component with falling particles.
 * Perfect for achievements, awards, and successful actions.
 */
export const CelebrationEffect: React.FC<CelebrationEffectProps> = ({
  trigger,
  type = 'confetti',
  duration = 3000,
  particleCount = 15
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const getEmojis = () => {
    switch (type) {
      case 'leaves':
        return ['🍃', '🌿', '🌱', '🍀'];
      case 'stars':
        return ['⭐', '✨', '🌟', '💫'];
      case 'confetti':
      default:
        return ['🎉', '🎊', '✨', '🌟', '💚', '🌱'];
    }
  };

  useEffect(() => {
    if (trigger) {
      const emojis = getEmojis();
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // percentage
          y: -10,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          delay: Math.random() * 1000,
        });
      }
      
      setParticles(newParticles);
      
      // Clear particles after animation
      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, type, duration, particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}vw`,
              y: "-10vh",
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              y: "110vh",
              rotate: 360,
              scale: [1, 1.2, 0.8, 1],
              opacity: [1, 1, 0.5, 0],
            }}
            transition={{
              duration: 3,
              delay: particle.delay / 1000,
              ease: "linear",
            }}
            className="absolute text-2xl"
            style={{
              left: 0,
              top: 0,
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CelebrationEffect;
