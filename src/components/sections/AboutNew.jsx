import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutNew = ({ isActive, onClose, cardTheme, scrollControlled = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const aboutData = {
    personal: {
      title: "Who Am I?",
      content: "I'm a passionate Full Stack Developer with a deep love for AI/ML and Data Science. Currently pursuing my journey in technology, I combine creativity with analytical thinking to build innovative solutions.",
      icon: "👨‍💻"
    },
    journey: {
      title: "My Journey",
      content: "Started as a curious learner exploring the depths of programming. From building my first 'Hello World' to creating complex applications, every line of code tells a story of growth and determination.",
      icon: "🚀"
    },
    passion: {
      title: "What Drives Me",
      content: "The intersection of technology and human experience fascinates me. I believe in using code not just to solve problems, but to create experiences that make a difference in people's lives.",
      icon: "💡"
    },
    goals: {
      title: "Future Vision",
      content: "Building the future through AI and machine learning. I envision creating intelligent systems that can understand, learn, and adapt to make our world more connected and efficient.",
      icon: "🌟"
    }
  };

  const steps = Object.keys(aboutData);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setCurrentStep(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (showContent && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showContent, currentStep, steps.length]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            background: `radial-gradient(circle at center, ${cardTheme?.color || '#3b82f6'}20 0%, black 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollControlled ? undefined : onClose}
        />

        {/* Card Container */}
        <motion.div
          className="relative w-full max-w-4xl mx-4 h-[80vh] rounded-2xl overflow-hidden"
          style={{
            background: cardTheme?.bgColor || 'rgba(59, 130, 246, 0.3)',
            border: `2px solid ${cardTheme?.color || '#3b82f6'}`,
          }}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.8 
          }}
        >
          {/* Header */}
          <motion.div
            className="relative p-6 border-b"
            style={{ borderColor: cardTheme?.color || '#3b82f6' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors ${scrollControlled ? 'hidden' : ''}`}
              style={{ color: cardTheme?.color || '#3b82f6' }}
            >
              ✕
            </button>
            <h2 
              className="text-3xl font-bold"
              style={{ color: cardTheme?.color || '#3b82f6' }}
            >
              About Me
            </h2>
            <p 
              className="text-lg opacity-80 mt-2"
              style={{ color: cardTheme?.color || '#3b82f6' }}
            >
              Discover my story
            </p>
          </motion.div>

          {/* Content */}
          <div className="p-6 h-full overflow-y-auto">
            <AnimatePresence mode="wait">
              {showContent && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {steps.map((stepKey, index) => {
                    const step = aboutData[stepKey];
                    const isCurrentStep = index <= currentStep;
                    
                    return (
                      <motion.div
                        key={stepKey}
                        className="relative"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={isCurrentStep ? { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1 
                        } : { 
                          opacity: 0.3, 
                          y: 50, 
                          scale: 0.8 
                        }}
                        transition={{ 
                          delay: index * 0.2,
                          duration: 0.8,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <div
                          className="p-6 rounded-xl h-full backdrop-blur-sm border"
                          style={{
                            backgroundColor: isCurrentStep 
                              ? `${cardTheme?.color || '#3b82f6'}20` 
                              : 'rgba(255, 255, 255, 0.05)',
                            borderColor: isCurrentStep 
                              ? cardTheme?.color || '#3b82f6'
                              : 'rgba(255, 255, 255, 0.1)',
                            borderWidth: isCurrentStep ? '2px' : '1px'
                          }}
                        >
                          {/* Icon */}
                          <motion.div
                            className="text-4xl mb-4"
                            animate={isCurrentStep ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0]
                            } : {}}
                            transition={{ 
                              duration: 2,
                              repeat: isCurrentStep ? Infinity : 0,
                              repeatType: "reverse"
                            }}
                          >
                            {step.icon}
                          </motion.div>

                          {/* Title */}
                          <h3 
                            className="text-xl font-bold mb-3"
                            style={{ color: cardTheme?.color || '#3b82f6' }}
                          >
                            {step.title}
                          </h3>

                          {/* Content */}
                          <motion.p 
                            className="text-gray-300 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={isCurrentStep ? { opacity: 1 } : { opacity: 0.6 }}
                            transition={{ delay: index * 0.3 + 0.5 }}
                          >
                            {step.content}
                          </motion.p>

                          {/* Progress indicator */}
                          {isCurrentStep && (
                            <motion.div
                              className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
                              style={{ backgroundColor: cardTheme?.color || '#3b82f6' }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skills Section */}
            <AnimatePresence>
              {showContent && currentStep >= steps.length - 1 && (
                <motion.div
                  className="mt-8 p-6 rounded-xl backdrop-blur-sm border"
                  style={{
                    backgroundColor: `${cardTheme?.color || '#3b82f6'}15`,
                    borderColor: cardTheme?.color || '#3b82f6'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <h4 
                    className="text-lg font-bold mb-4"
                    style={{ color: cardTheme?.color || '#3b82f6' }}
                  >
                    Technical Arsenal
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {['React', 'Python', 'Node.js', 'AI/ML', 'Data Science', 'JavaScript', 'TypeScript', 'TensorFlow'].map((skill, index) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border"
                        style={{
                          backgroundColor: `${cardTheme?.color || '#3b82f6'}25`,
                          borderColor: cardTheme?.color || '#3b82f6',
                          color: cardTheme?.color || '#3b82f6'
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 1.2 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutNew;
