import React from 'react';
import { motion } from 'framer-motion';

function WaveBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-ocean overflow-hidden">
      {/* Animated waves */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: `${200 + i * 40}px`,
            background: `linear-gradient(to bottom, transparent, rgba(79, 209, 197, ${0.05 + i * 0.01}))`,
            filter: 'blur(4px)',
            transform: 'translateY(50%)',
          }}
          animate={{
            y: ['0%', '5%', '0%'],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
    </div>
  );
}

export default WaveBackground; 