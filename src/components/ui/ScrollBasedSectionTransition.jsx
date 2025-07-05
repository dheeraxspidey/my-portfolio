import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AboutNew from '../sections/AboutNew';
import SkillsNew from '../sections/SkillsNew';
import ProjectsNew from '../sections/ProjectsNew';
import ContactNew from '../sections/ContactNew';

const ScrollBasedSectionTransition = ({ className = "" }) => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [transitionPhase, setTransitionPhase] = useState('none'); // 'none', 'centering', 'zooming', 'detailed', 'shrinking'
  const [activeModal, setActiveModal] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Use regular scroll listener instead of framer-motion's useScroll for better control
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Section configuration
  const sections = [
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'My Journey',
      description: 'Discover my story',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.3)',
      component: AboutNew,
      scrollRange: [0.1, 0.35]
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Tech Stack',
      description: 'React • Python • AI/ML',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.2)',
      component: SkillsNew,
      scrollRange: [0.35, 0.6]
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'My Work',
      description: 'Amazing creations',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      component: ProjectsNew,
      scrollRange: [0.6, 0.85]
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: "Let's Connect",
      description: 'Get in touch',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      component: ContactNew,
      scrollRange: [0.85, 1.0]
    }
  ];

  // Calculate current section and transition phase based on scroll
  useEffect(() => {
    const progress = scrollProgress;
    
    // Home section
    if (progress < 0.1) {
      setCurrentSection('home');
      setTransitionPhase('none');
      setActiveModal(null);
      return;
    }

    // Find current section
    for (const section of sections) {
      const [start, end] = section.scrollRange;
      
      if (progress >= start && progress < end) {
        const sectionProgress = (progress - start) / (end - start);
        
        setCurrentSection(section.id);
        
        // Determine transition phase based on section progress
        if (sectionProgress < 0.2) {
          setTransitionPhase('centering');
          setActiveModal(null);
        } else if (sectionProgress < 0.4) {
          setTransitionPhase('zooming');
          setActiveModal(null);
        } else if (sectionProgress < 0.8) {
          setTransitionPhase('detailed');
          setActiveModal(section.id);
        } else {
          setTransitionPhase('shrinking');
          setActiveModal(null);
        }
        
        break;
      }
    }
  }, [scrollProgress, sections]);

  // Get current section data
  const getCurrentSection = () => {
    return sections.find(s => s.id === currentSection);
  };

  const currentSectionData = getCurrentSection();

  return (
    <div ref={containerRef} className={`relative w-full h-screen overflow-y-auto ${className}`}>
      {/* Scroll content - creates scrollable height */}
      <div className="h-[500vh]">
        {/* Fixed positioned elements */}
        <div className="fixed inset-0 flex items-center justify-center">
          
          {/* Background gradient based on current section */}
          <motion.div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: currentSectionData 
                ? `radial-gradient(circle at center, ${currentSectionData.bgColor} 0%, rgba(17, 24, 39, 0.9) 70%)`
                : 'radial-gradient(circle at center, rgba(55, 65, 81, 0.3) 0%, rgba(17, 24, 39, 0.9) 70%)'
            }}
          />

          {/* Hero Content (shown when at top) */}
          <AnimatePresence>
            {currentSection === 'home' && (
              <motion.div
                className="text-center z-20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl font-bold text-white mb-4">
                  Dheeraj Kumar
                </h1>
                <p className="text-2xl text-blue-400 mb-8">
                  Full Stack Developer & AI Enthusiast
                </p>
                <p className="text-lg text-gray-300 max-w-md mx-auto">
                  Scroll down to explore my journey through interactive experiences
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Card (shown during transitions) */}
          <AnimatePresence>
            {currentSectionData && transitionPhase !== 'none' && transitionPhase !== 'detailed' && (
              <motion.div
                className="z-30 relative"
                initial={{ 
                  scale: 0.5, 
                  opacity: 0,
                  x: transitionPhase === 'centering' ? 200 : 0,
                  y: transitionPhase === 'centering' ? 100 : 0
                }}
                animate={{
                  scale: transitionPhase === 'centering' ? 1 : 
                         transitionPhase === 'zooming' ? 3 : 
                         transitionPhase === 'shrinking' ? 0.5 : 1,
                  opacity: transitionPhase === 'shrinking' ? 0 : 1,
                  x: 0,
                  y: 0,
                  rotateY: transitionPhase === 'zooming' ? [0, 180, 360] : 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: transitionPhase === 'zooming' ? 1.2 : 0.8,
                  ease: "easeInOut"
                }}
              >
                <div
                  className="p-8 rounded-2xl backdrop-blur-sm border-2 min-w-[300px] text-center"
                  style={{
                    backgroundColor: currentSectionData.bgColor,
                    borderColor: currentSectionData.color,
                    boxShadow: `0 0 50px ${currentSectionData.color}30`
                  }}
                >
                  {/* Card content */}
                  <motion.h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: currentSectionData.color }}
                    animate={{
                      scale: transitionPhase === 'zooming' ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.6, repeat: transitionPhase === 'zooming' ? Infinity : 0 }}
                  >
                    {currentSectionData.title}
                  </motion.h3>
                  <p 
                    className="text-lg opacity-80 mb-3"
                    style={{ color: currentSectionData.color }}
                  >
                    {currentSectionData.subtitle}
                  </p>
                  <p className="text-sm text-gray-300">
                    {currentSectionData.description}
                  </p>

                  {/* Zooming effect particles */}
                  {transitionPhase === 'zooming' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: currentSectionData.color,
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: Math.cos(i * Math.PI / 6) * 100,
                            y: Math.sin(i * Math.PI / 6) * 100,
                            scale: [0, 1, 0],
                            opacity: [1, 0.5, 0]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section Progress Indicator */}
          {currentSection !== 'home' && (
            <div className="fixed top-8 left-8 z-40">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full border-2"
                  style={{ borderColor: currentSectionData?.color || '#666' }}
                >
                  <motion.div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: currentSectionData?.color || '#666' }}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: transitionPhase === 'detailed' ? 1 : 0.3,
                      opacity: transitionPhase === 'detailed' ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: currentSectionData?.color || '#666' }}
                >
                  {currentSectionData?.title}
                </span>
              </div>
            </div>
          )}

          {/* Scroll Hint */}
          {currentSection === 'home' && (
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center text-gray-400">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto mb-2">
                  <motion.div
                    className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <p className="text-xs">Scroll to explore</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Section Modals */}
        {currentSectionData && (
          <div className="fixed inset-0 z-50">
            <currentSectionData.component
              isActive={activeModal === currentSectionData.id}
              onClose={() => {}} // Controlled by scroll, not close button
              cardTheme={currentSectionData}
              scrollControlled={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollBasedSectionTransition;
