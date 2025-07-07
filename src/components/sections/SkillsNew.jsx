import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsNew = ({ isActive, onClose, cardTheme, scrollControlled = false }) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const skillsData = {
    frontend: {
      title: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "React", level: 90, color: "#61DAFB" },
        { name: "JavaScript", level: 85, color: "#F7DF1E" },
        { name: "TypeScript", level: 80, color: "#3178C6" },
        { name: "CSS/SCSS", level: 85, color: "#1572B6" },
        { name: "Tailwind CSS", level: 90, color: "#06B6D4" }
      ]
    },
    backend: {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 85, color: "#339933" },
        { name: "Python", level: 90, color: "#3776AB" },
        { name: "Express.js", level: 80, color: "#000000" },
        { name: "MongoDB", level: 75, color: "#47A248" },
        { name: "PostgreSQL", level: 70, color: "#336791" }
      ]
    },
    aiml: {
      title: "AI/ML & Data Science",
      icon: "🤖",
      skills: [
        { name: "TensorFlow", level: 80, color: "#FF6F00" },
        { name: "PyTorch", level: 75, color: "#EE4C2C" },
        { name: "Pandas", level: 85, color: "#150458" },
        { name: "NumPy", level: 85, color: "#013243" },
        { name: "Scikit-learn", level: 80, color: "#F7931E" }
      ]
    },
    tools: {
      title: "Tools & Technologies",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 85, color: "#F05032" },
        { name: "Docker", level: 70, color: "#2496ED" },
        { name: "AWS", level: 65, color: "#232F3E" },
        { name: "VS Code", level: 90, color: "#007ACC" },
        { name: "Figma", level: 75, color: "#F24E1E" }
      ]
    }
  };

  const categories = Object.keys(skillsData);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setCurrentCategory(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (showContent) {
      const timer = setInterval(() => {
        setCurrentCategory(prev => (prev + 1) % categories.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [showContent, categories.length]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            background: `radial-gradient(circle at center, ${cardTheme?.color || '#10b981'}20 0%, black 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollControlled ? undefined : onClose}
        />

        {/* Card Container with proper scrolling */}
        <motion.div
          className="relative w-full max-w-5xl mx-4 h-[80vh] rounded-2xl overflow-hidden"
          style={{
            background: cardTheme?.bgColor || 'rgba(16, 185, 129, 0.2)',
            border: `2px solid ${cardTheme?.color || '#10b981'}`,
            pointerEvents: 'auto'
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
            className="relative p-6 border-b flex-shrink-0"
            style={{ borderColor: cardTheme?.color || '#10b981' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors ${scrollControlled ? 'hidden' : ''}`}
              style={{ color: cardTheme?.color || '#10b981' }}
            >
              ✕
            </button>
            <h2 
              className="text-3xl font-bold"
              style={{ color: cardTheme?.color || '#10b981' }}
            >
              Technical Skills
            </h2>
            <p 
              className="text-lg opacity-80 mt-2"
              style={{ color: cardTheme?.color || '#10b981' }}
            >
              My technological expertise
            </p>
          </motion.div>

          {/* Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto p-6"
            style={{ 
              maxHeight: 'calc(80vh - 120px)',
              scrollBehavior: 'smooth'
            }}
          >
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((categoryKey, index) => {
                const category = skillsData[categoryKey];
                const isActive = index === currentCategory;
                
                return (
                  <motion.button
                    key={categoryKey}
                    className="px-4 py-2 rounded-lg border transition-all"
                    style={{
                      backgroundColor: isActive 
                        ? `${cardTheme?.color || '#10b981'}25` 
                        : 'rgba(255, 255, 255, 0.05)',
                      borderColor: isActive 
                        ? cardTheme?.color || '#10b981'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: isActive 
                        ? cardTheme?.color || '#10b981'
                        : '#9CA3AF'
                    }}
                    onClick={() => setCurrentCategory(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.title}
                  </motion.button>
                );
              })}
            </div>

            {/* Skills Display */}
            <AnimatePresence mode="wait">
              {showContent && (
                <motion.div
                  key={currentCategory}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData[categories[currentCategory]].skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="p-4 rounded-lg backdrop-blur-sm border"
                        style={{
                          backgroundColor: `${cardTheme?.color || '#10b981'}15`,
                          borderColor: cardTheme?.color || '#10b981'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{skill.name}</h4>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: cardTheme?.color || '#10b981' }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ 
                              delay: index * 0.1 + 0.3,
                              duration: 1,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional Info */}
            {showContent && (
              <motion.div
                className="mt-8 p-6 rounded-xl backdrop-blur-sm border"
                style={{
                  backgroundColor: `${cardTheme?.color || '#10b981'}10`,
                  borderColor: cardTheme?.color || '#10b981'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <h4 
                  className="text-lg font-bold mb-3"
                  style={{ color: cardTheme?.color || '#10b981' }}
                >
                  🎯 Currently Learning
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['GraphQL', 'Kubernetes', 'WebAssembly', 'Rust', 'Go'].map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300 border border-gray-600"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications Section */}
            <motion.div
              className="mt-8 p-6 rounded-xl backdrop-blur-sm border"
              style={{
                backgroundColor: `${cardTheme?.color || '#10b981'}10`,
                borderColor: cardTheme?.color || '#10b981'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h4 
                className="text-lg font-bold mb-4"
                style={{ color: cardTheme?.color || '#10b981' }}
              >
                🏆 Certifications & Achievements
              </h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">🥇</span>
                  <span>Machine Learning Specialization – Coursera</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">🎓</span>
                  <span>Infosys Springboard AI Primer & Gen AI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">☁️</span>
                  <span>Google Cloud Data Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">💎</span>
                  <span>Smart Interviews: Diamond Certified (Rank 1247/37015)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillsNew;