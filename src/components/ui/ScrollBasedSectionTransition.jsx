import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import CodingScene2D from './CodingScene2D';
import AboutNew from '../sections/AboutNew';
import SkillsNew from '../sections/SkillsNew';
import ProjectsNew from '../sections/ProjectsNew';
import ContactNew from '../sections/ContactNew';

const ScrollBasedSectionTransition = ({ className = "" }) => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [transitionPhase, setTransitionPhase] = useState('none');
  const [activeModal, setActiveModal] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHeroScene, setShowHeroScene] = useState(true);
  const [transitionalCard, setTransitionalCard] = useState(null);
  
  // Use regular scroll listener for better control
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

  // Section configuration with enhanced transition points
  const sections = [
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'My Journey',
      description: 'Discover my story',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.3)',
      component: AboutNew,
      scrollRange: [0.1, 0.3]
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Tech Stack',
      description: 'React • Python • AI/ML',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.2)',
      component: SkillsNew,
      scrollRange: [0.3, 0.5]
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'My Work',
      description: 'Amazing creations',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      component: ProjectsNew,
      scrollRange: [0.5, 0.7]
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: "Let's Connect",
      description: 'Get in touch',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      component: ContactNew,
      scrollRange: [0.7, 0.9]
    }
  ];

  // Enhanced scroll-based section detection
  useEffect(() => {
    const progress = scrollProgress;
    
    // Home section - show hero scene
    if (progress < 0.05) {
      setCurrentSection('home');
      setTransitionPhase('none');
      setActiveModal(null);
      setShowHeroScene(true);
      setTransitionalCard(null);
      return;
    }

    // Between sections - show hero scene with transitional card
    let inTransition = false;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const [start, end] = section.scrollRange;
      const nextSection = sections[i + 1];
      
      // Check if we're in the section
      if (progress >= start && progress < end) {
        const sectionProgress = (progress - start) / (end - start);
        
        setCurrentSection(section.id);
        
        if (sectionProgress < 0.15) {
          // Entering section - show hero with card moving to center
          setTransitionPhase('card-centering');
          setShowHeroScene(true);
          setTransitionalCard(section);
          setActiveModal(null);
        } else if (sectionProgress < 0.25) {
          // Card zoom transition
          setTransitionPhase('card-zooming');
          setShowHeroScene(true);
          setTransitionalCard(section);
          setActiveModal(null);
        } else if (sectionProgress < 0.75) {
          // Show section content
          setTransitionPhase('section-active');
          setShowHeroScene(false);
          setTransitionalCard(null);
          setActiveModal(section.id);
        } else {
          // Exiting section - prepare for next or return to hero
          setTransitionPhase('section-exiting');
          setShowHeroScene(true);
          setTransitionalCard(nextSection || null);
          setActiveModal(null);
        }
        
        inTransition = true;
        break;
      }
      
      // Check if we're between sections
      if (i < sections.length - 1) {
        const nextStart = sections[i + 1].scrollRange[0];
        if (progress > end && progress < nextStart) {
          // Between sections - show hero scene
          setCurrentSection('transition');
          setTransitionPhase('between-sections');
          setShowHeroScene(true);
          setTransitionalCard(sections[i + 1]);
          setActiveModal(null);
          inTransition = true;
          break;
        }
      }
    }

    // After all sections - return to hero
    if (!inTransition && progress >= 0.9) {
      setCurrentSection('home');
      setTransitionPhase('none');
      setShowHeroScene(true);
      setTransitionalCard(null);
      setActiveModal(null);
    }
  }, [scrollProgress, sections]);

  // Get current section data
  const getCurrentSection = () => {
    return sections.find(s => s.id === currentSection);
  };

  const currentSectionData = getCurrentSection();

  // Handle card click from 2D scene
  const handleCardTransition = (sectionId) => {
    const targetSection = sections.find(s => s.id === sectionId);
    if (targetSection) {
      setTransitionalCard(targetSection);
      setTransitionPhase('card-centering');
      
      // Scroll to the section after a brief delay
      setTimeout(() => {
        const targetProgress = targetSection.scrollRange[0] + 0.1;
        const container = containerRef.current;
        if (container) {
          const targetScroll = targetProgress * (container.scrollHeight - container.clientHeight);
          container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }, 500);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full h-screen overflow-y-auto ${className}`}>
      {/* Scroll content - creates scrollable height */}
      <div className="h-[600vh]">
        {/* Fixed positioned elements */}
        <div className="fixed inset-0 flex items-center justify-center">
          
          {/* Dynamic background gradient */}
          <motion.div
            className="absolute inset-0 transition-all duration-1000"
            animate={{
              background: showHeroScene 
                ? 'radial-gradient(circle at center, rgba(55, 65, 81, 0.3) 0%, rgba(17, 24, 39, 0.9) 70%)'
                : currentSectionData 
                  ? `radial-gradient(circle at center, ${currentSectionData.bgColor} 0%, rgba(17, 24, 39, 0.9) 70%)`
                  : 'radial-gradient(circle at center, rgba(55, 65, 81, 0.3) 0%, rgba(17, 24, 39, 0.9) 70%)'
            }}
          />

          {/* Hero 2D Scene */}
          <AnimatePresence>
            {showHeroScene && (
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <CodingScene2D 
                  className="w-full h-full"
                  activeSection={currentSection}
                  onSectionTransition={handleCardTransition}
                  showGreeting={currentSection === 'home'}
                  highlightCard={transitionalCard?.id}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Content (shown when at top) */}
          <AnimatePresence>
            {currentSection === 'home' && transitionPhase === 'none' && (
              <motion.div
                className="text-center z-20 relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-6xl font-bold text-white mb-4"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(56, 189, 248, 0.5)",
                      "0 0 30px rgba(56, 189, 248, 0.8)",
                      "0 0 20px rgba(56, 189, 248, 0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Dheeraj Kumar
                </motion.h1>
                <motion.p 
                  className="text-2xl text-blue-400 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Full Stack Developer & AI Enthusiast
                </motion.p>
                <motion.p 
                  className="text-lg text-gray-300 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Scroll down to explore my journey through interactive experiences
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transitional Card (moving from scene to center) */}
          <AnimatePresence>
            {transitionalCard && (transitionPhase === 'card-centering' || transitionPhase === 'card-zooming') && (
              <motion.div
                className="z-30 relative"
                initial={{ 
                  scale: 0.3,
                  x: transitionPhase === 'card-centering' ? 200 : 0,
                  y: transitionPhase === 'card-centering' ? 100 : 0,
                  opacity: 0.8
                }}
                animate={{
                  scale: transitionPhase === 'card-centering' ? 1 : 
                         transitionPhase === 'card-zooming' ? 4 : 1,
                  x: 0,
                  y: 0,
                  opacity: transitionPhase === 'card-zooming' ? 0 : 1,
                  rotateY: transitionPhase === 'card-zooming' ? [0, 180, 360] : 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: transitionPhase === 'card-zooming' ? 1.5 : 1,
                  ease: "easeInOut"
                }}
              >
                <div
                  className="p-8 rounded-2xl backdrop-blur-sm border-2 min-w-[300px] text-center relative overflow-hidden"
                  style={{
                    backgroundColor: transitionalCard.bgColor,
                    borderColor: transitionalCard.color,
                    boxShadow: `0 0 50px ${transitionalCard.color}30`
                  }}
                >
                  {/* Card content */}
                  <motion.h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: transitionalCard.color }}
                    animate={{
                      scale: transitionPhase === 'card-zooming' ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.6, repeat: transitionPhase === 'card-zooming' ? Infinity : 0 }}
                  >
                    {transitionalCard.title}
                  </motion.h3>
                  <p 
                    className="text-lg opacity-80 mb-3"
                    style={{ color: transitionalCard.color }}
                  >
                    {transitionalCard.subtitle}
                  </p>
                  <p className="text-sm text-gray-300">
                    {transitionalCard.description}
                  </p>

                  {/* Zooming effect particles */}
                  {transitionPhase === 'card-zooming' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: transitionalCard.color,
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: Math.cos(i * Math.PI / 8) * 150,
                            y: Math.sin(i * Math.PI / 8) * 150,
                            scale: [0, 1, 0],
                            opacity: [1, 0.5, 0]
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.05
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Ripple effect for centering */}
                  {transitionPhase === 'card-centering' && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2"
                      style={{ borderColor: transitionalCard.color }}
                      animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.8, 0.4, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section Progress Indicator */}
          {currentSection !== 'home' && currentSection !== 'transition' && (
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
                      scale: transitionPhase === 'section-active' ? 1 : 0.3,
                      opacity: transitionPhase === 'section-active' ? 1 : 0.5
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
          {currentSection === 'home' && transitionPhase === 'none' && (
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

          {/* Transition Phase Indicator (for debugging) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-8 right-8 z-40 text-xs text-gray-400 bg-black/50 p-2 rounded">
              <div>Section: {currentSection}</div>
              <div>Phase: {transitionPhase}</div>
              <div>Progress: {(scrollProgress * 100).toFixed(1)}%</div>
              <div>Hero Scene: {showHeroScene ? 'Yes' : 'No'}</div>
              <div>Modal: {activeModal || 'None'}</div>
            </div>
          )}
        </div>

        {/* Section Modals */}
        {sections.map((section) => {
          const SectionComponent = section.component;
          return (
            <div key={section.id} className="fixed inset-0 z-50">
              <SectionComponent
                isActive={activeModal === section.id}
                onClose={() => {}} // Controlled by scroll, not close button
                cardTheme={section}
                scrollControlled={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollBasedSectionTransition;