import React from 'react';
import { motion } from 'framer-motion';

function WaveBackground() {
  return (
    <div className="fixed inset-0 z-[2] pointer-events-none">
      {/* Animated waves with blue tint */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: `${400 + i * 60}px`,
            background: `linear-gradient(to bottom, transparent, rgba(56, 189, 248, ${0.08 + i * 0.02}))`,
            filter: 'blur(8px)',
            transform: 'translateY(30%)',
            zIndex: 2 + i,
          }}
          animate={{
            y: ['0%', '8%', '0%'],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Enhanced particles with blue colors */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: 'rgba(56, 189, 248, 0.6)',
            boxShadow: '0 0 10px rgba(56, 189, 248, 0.4)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Additional larger glowing orbs with blue tint */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)',
            filter: 'blur(1px)',
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Subtle gradient overlay with blue tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-blue-900/10 z-[1]" />
    </div>
  );
}

export default WaveBackground; 