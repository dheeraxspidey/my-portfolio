import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SectionTransition = ({ children, isActive, sectionId, transitionColor }) => {
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowTransition(true);
      const timer = setTimeout(() => setShowTransition(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <>
      {children}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, ${transitionColor} 0%, transparent 70%)`
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 2, 20],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 1,
                ease: "easeOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionTransition;
