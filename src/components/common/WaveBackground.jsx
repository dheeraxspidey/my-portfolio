import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { optimizePerformance } from '../../utils/performance';

const WaveBackground = () => {
  const { isLowEndDevice } = optimizePerformance();

  // Memoize wave paths to prevent recalculation
  const wavePaths = useMemo(() => {
    // Simpler path for low-end devices
    if (isLowEndDevice) {
      return [
        "M0 50 Q 25 30, 50 50 T 100 50",
        "M0 50 Q 25 70, 50 50 T 100 50"
      ];
    }
    // Complex path for high-end devices
    return [
      "M0 50 Q 25 30, 50 50 T 100 50 T 150 50 T 200 50",
      "M0 50 Q 25 70, 50 50 T 100 50 T 150 50 T 200 50"
    ];
  }, [isLowEndDevice]);

  return (
    <div className="fixed inset-0 z-0 opacity-30">
      {!isLowEndDevice ? (
        // Full animation for powerful devices
        <motion.div
          className="absolute inset-0"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {wavePaths.map((path, index) => (
            <svg
              key={index}
              className="absolute w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={path}
                fill="none"
                stroke="rgba(100, 255, 218, 0.2)"
                strokeWidth="0.5"
              />
            </svg>
          ))}
        </motion.div>
      ) : (
        // Static gradient for low-end devices
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(100,255,218,0.1) 0%, rgba(100,255,218,0) 100%)'
          }}
        />
      )}
    </div>
  );
};

export default React.memo(WaveBackground); 