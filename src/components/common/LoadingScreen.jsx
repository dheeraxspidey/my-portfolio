import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [currentPath, setCurrentPath] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [encryptionText, setEncryptionText] = useState('');

  // Professional encryption-style paths
  const paths = [
    "M 10 10 H 40 V 40",
    "M 10 10 H 90 V 50",
    "M 10 10 H 50 V 90"
  ];

  // Encryption text animation
  useEffect(() => {
    const characters = '0123456789ABCDEF';
    let interval;

    if (currentPath < paths.length) {
      interval = setInterval(() => {
        let result = '';
        for (let i = 0; i < 8; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setEncryptionText(result);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [currentPath]);

  useEffect(() => {
    const animationSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentPath(1);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentPath(2);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentPath(3);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLoadingComplete();
    };

    animationSequence();
  }, [onLoadingComplete]);

  const statusMessages = [
    "Initializing Security Protocol",
    "Verifying Encryption Keys",
    "Authenticating Access",
    "Establishing Secure Connection"
  ];

  // Optimize animation performance
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "linear" },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-[#0a192f] z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Simplified grid background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, #64ffda11 1px, transparent 1px)',
          backgroundSize: '40px 40px' // Increased grid size
        }}
      />

      <div className="relative w-[300px] h-[300px]"> {/* Reduced size */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Simplified paths */}
          {paths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke="#64ffda"
              strokeWidth="2"
              fill="none"
              variants={pathVariants}
              initial="initial"
              animate={currentPath >= index ? "animate" : "initial"}
            />
          ))}
        </svg>

        {/* Simplified loading text */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <div className="text-[#64ffda] font-mono text-sm mb-4">
            Loading...
          </div>
          
          {/* Simplified progress bar */}
          <div className="h-1 w-48 mx-auto bg-[#112240] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#64ffda]"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentPath + 1) * 33.33}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
