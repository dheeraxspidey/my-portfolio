import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [currentPath, setCurrentPath] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [encryptionText, setEncryptionText] = useState('');

  // Professional encryption-style paths
  const paths = [
    // Initial security scan
    "M 10 10 H 30 V 30 H 50 V 50",
    // Encryption process
    "M 10 10 H 40 V 40 H 70 V 60 H 90",
    // Authentication check
    "M 10 10 H 90 V 40 H 50 V 70 H 90",
    // Access granted path
    "M 10 10 H 30 V 30 H 50 V 50 H 70 V 70 H 90 V 90"
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

  return (
    <motion.div
      className="fixed inset-0 bg-[#0a192f] z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Professional Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #64ffda11 1px, transparent 1px),
            linear-gradient(to bottom, #64ffda11 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative w-[600px] h-[400px] flex flex-col items-center justify-center">
        {/* Status Display */}
        <motion.div
          className="absolute top-0 left-0 right-0 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-block px-4 py-2 bg-[#112240] rounded-lg border border-[#64ffda]/20">
            <span className="text-[#64ffda] font-mono text-sm">
              {statusMessages[currentPath]}
            </span>
          </div>
        </motion.div>

        {/* Main Animation Container */}
        <div className="relative w-full h-[200px] mb-8">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#64ffda" />
                <stop offset="100%" stopColor="#0a192f" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Security Grid */}
            <g className="opacity-20">
              {[...Array(5)].map((_, i) => (
                <React.Fragment key={i}>
                  <line
                    x1="0" y1={i * 20}
                    x2="100" y2={i * 20}
                    stroke="#64ffda"
                    strokeWidth="0.5"
                  />
                  <line
                    x1={i * 20} y1="0"
                    x2={i * 20} y2="100"
                    stroke="#64ffda"
                    strokeWidth="0.5"
                  />
                </React.Fragment>
              ))}
            </g>

            {/* Animated Paths */}
            {paths.map((path, index) => (
              <motion.path
                key={index}
                d={path}
                stroke="#64ffda"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                strokeLinecap="square"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: currentPath >= index ? 1 : 0,
                  opacity: currentPath === index ? 1 : 0.3
                }}
                transition={{
                  duration: 1.5,
                  ease: "linear"
                }}
              />
            ))}

            {/* Scanning Point */}
            {currentPath < paths.length && (
              <motion.circle
                r="2"
                fill="#64ffda"
                filter="url(#glow)"
              >
                <motion.animateMotion
                  dur="1.5s"
                  path={paths[currentPath]}
                  rotate="auto"
                />
              </motion.circle>
            )}
          </svg>
        </div>

        {/* Encryption Text Display */}
        <div className="text-center mb-8">
          <motion.div
            className="font-mono text-sm text-[#64ffda]/70"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {encryptionText}
          </motion.div>
        </div>

        {/* Professional Progress Bar */}
        <div className="w-64 relative">
          <div className="h-1 w-full bg-[#112240] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#64ffda]"
              initial={{ width: '0%' }}
              animate={{ 
                width: showSuccess ? '100%' : `${(currentPath + 1) * 25}%`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <motion.div
            className="absolute -top-6 left-0 right-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-[#64ffda] text-sm font-mono">
              {Math.round((currentPath + 1) * 25)}%
            </span>
          </motion.div>
        </div>
      </div>

      {/* Success State */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-[#0a192f]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-2xl font-mono"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.7 }}
            >
              <span className="text-[#64ffda]">System Access Granted</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
