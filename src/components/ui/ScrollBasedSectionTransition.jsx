import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import CodingScene2D from './CodingScene2D';
import AboutNew from '../sections/AboutNew';
import SkillsNew from '../sections/SkillsNew';
import ProjectsNew from '../sections/ProjectsNew';
import ContactNew from '../sections/ContactNew';

const ScrollBasedSectionTransition = ({ className = "" }) => {
  const containerRef = useRef(null);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('none');
  const [activeModal, setActiveModal] = useState(null);
  const [showHeroScene, setShowHeroScene] = useState(true);
  const [transitionalCard, setTransitionalCard] = useState(null);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [cardStartPosition, setCardStartPosition] = useState(null);
  
  // Checkpoint configuration - 5 main checkpoints
  const checkpoints = [
    {
      id: 'home',
      title: 'Home',
      progress: 0,
      showHero: true,
      modal: null,
      card: null
    },
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'My Journey',
      description: 'Discover my story',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.3)',
      progress: 0.25,
      showHero: false,
      modal: 'about',
      card: 'about',
      component: AboutNew,
      icon: '👨‍💻'
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Tech Stack',
      description: 'React • Python • AI/ML',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.2)',
      progress: 0.5,
      showHero: false,
      modal: 'skills',
      card: 'skills',
      component: SkillsNew,
      icon: '⚡'
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'My Work',
      description: 'Amazing creations',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      progress: 0.75,
      showHero: false,
      modal: 'projects',
      card: 'projects',
      component: ProjectsNew,
      icon: '🚀'
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: "Let's Connect",
      description: 'Get in touch',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      progress: 1,
      showHero: false,
      modal: 'contact',
      card: 'contact',
      component: ContactNew,
      icon: '📧'
    }
  ];

  // Calculate card start positions based on 2D scene layout
  const getCardStartPosition = (cardId) => {
    const basePosition = { x: 300, y: 150, width: 120, height: 45 };
    const positions = {
      'about': { ...basePosition, x: basePosition.x + 120, y: basePosition.y - 20 },
      'skills': { ...basePosition, x: basePosition.x - 80, y: basePosition.y - 50 },
      'projects': { ...basePosition, x: basePosition.x + 180, y: basePosition.y + 100 },
      'contact': { ...basePosition, x: basePosition.x - 120, y: basePosition.y + 100 }
    };
    return positions[cardId] || basePosition;
  };

  // Smooth scroll to checkpoint
  const scrollToCheckpoint = (checkpointIndex, smooth = true) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const container = containerRef.current;
    if (!container) return;

    const targetProgress = checkpoints[checkpointIndex].progress;
    const targetScroll = targetProgress * (container.scrollHeight - container.clientHeight);
    
    container.scrollTo({
      top: targetScroll,
      behavior: smooth ? 'smooth' : 'auto'
    });

    // Update checkpoint after scroll animation
    setTimeout(() => {
      setCurrentCheckpoint(checkpointIndex);
      setIsTransitioning(false);
    }, smooth ? 800 : 100);
  };

  // Enhanced scroll handler with checkpoint snapping
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = (e) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime;
      
      // Throttle scroll events
      if (timeSinceLastScroll < 50) return;
      setLastScrollTime(now);

      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollProgress = scrollTop / (scrollHeight - clientHeight);
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set timeout to snap to nearest checkpoint after scroll stops
      scrollTimeout = setTimeout(() => {
        if (isTransitioning) return;
        
        // Find nearest checkpoint
        let nearestCheckpoint = 0;
        let minDistance = Math.abs(scrollProgress - checkpoints[0].progress);
        
        checkpoints.forEach((checkpoint, index) => {
          const distance = Math.abs(scrollProgress - checkpoint.progress);
          if (distance < minDistance) {
            minDistance = distance;
            nearestCheckpoint = index;
          }
        });

        // Only snap if we're not already at the checkpoint
        if (nearestCheckpoint !== currentCheckpoint && minDistance > 0.05) {
          scrollToCheckpoint(nearestCheckpoint, true);
        }
      }, 150); // Snap after 150ms of no scrolling
    };

    // Wheel event for better control
    const handleWheel = (e) => {
      if (isTransitioning) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      
      const delta = e.deltaY;
      const threshold = 50;
      
      if (Math.abs(delta) > threshold) {
        if (delta > 0 && currentCheckpoint < checkpoints.length - 1) {
          // Scroll down
          scrollToCheckpoint(currentCheckpoint + 1);
        } else if (delta < 0 && currentCheckpoint > 0) {
          // Scroll up
          scrollToCheckpoint(currentCheckpoint - 1);
        }
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          if (currentCheckpoint < checkpoints.length - 1) {
            scrollToCheckpoint(currentCheckpoint + 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentCheckpoint > 0) {
            scrollToCheckpoint(currentCheckpoint - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToCheckpoint(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToCheckpoint(checkpoints.length - 1);
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: false });
      container.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(scrollTimeout);
      };
    }
  }, [currentCheckpoint, isTransitioning, lastScrollTime]);

  // Update UI based on current checkpoint
  useEffect(() => {
    const checkpoint = checkpoints[currentCheckpoint];
    
    if (checkpoint.id === 'home') {
      setTransitionPhase('none');
      setActiveModal(null);
      setShowHeroScene(true);
      setTransitionalCard(null);
      setCardStartPosition(null);
    } else {
      // Set card start position from 2D scene
      const startPos = getCardStartPosition(checkpoint.id);
      setCardStartPosition(startPos);
      
      // Transition sequence for sections
      setTransitionPhase('card-centering');
      setShowHeroScene(true);
      setTransitionalCard(checkpoint);
      setActiveModal(null);
      
      // Card zoom phase
      setTimeout(() => {
        setTransitionPhase('card-zooming');
      }, 800);
      
      // Show section content
      setTimeout(() => {
        setTransitionPhase('section-active');
        setShowHeroScene(false);
        setTransitionalCard(null);
        setActiveModal(checkpoint.modal);
      }, 1600);
    }
  }, [currentCheckpoint]);

  // Handle card click from 2D scene
  const handleCardTransition = (sectionId) => {
    const targetIndex = checkpoints.findIndex(cp => cp.id === sectionId);
    if (targetIndex > 0) {
      scrollToCheckpoint(targetIndex);
    }
  };

  const currentCheckpointData = checkpoints[currentCheckpoint];

  return (
    <div ref={containerRef} className={`relative w-full h-screen overflow-y-auto ${className}`}>
      {/* Scroll content - creates scrollable height */}
      <div className="h-[500vh]">
        {/* Fixed positioned elements */}
        <div className="fixed inset-0 flex items-center justify-center">
          
          {/* Enhanced dynamic background gradient */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: showHeroScene 
                ? 'radial-gradient(circle at center, rgba(55, 65, 81, 0.3) 0%, rgba(17, 24, 39, 0.9) 70%)'
                : currentCheckpointData?.bgColor 
                  ? `radial-gradient(circle at center, ${currentCheckpointData.bgColor} 0%, rgba(17, 24, 39, 0.9) 70%)`
                  : 'radial-gradient(circle at center, rgba(55, 65, 81, 0.3) 0%, rgba(17, 24, 39, 0.9) 70%)'
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Hero 2D Scene */}
          <AnimatePresence>
            {showHeroScene && (
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <CodingScene2D 
                  className="w-full h-full"
                  activeSection={currentCheckpointData?.id}
                  onSectionTransition={handleCardTransition}
                  showGreeting={currentCheckpoint === 0}
                  highlightCard={transitionalCard?.id}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Transitional Card (moving from exact scene position to center) */}
          <AnimatePresence>
            {transitionalCard && cardStartPosition && (transitionPhase === 'card-centering' || transitionPhase === 'card-zooming') && (
              <motion.div
                className="z-30 relative"
                initial={{ 
                  scale: 0.15, // Start very small to match SVG scale
                  x: (cardStartPosition.x - 400) * 0.8, // Convert SVG coordinates to screen coordinates
                  y: (cardStartPosition.y - 300) * 0.8,
                  opacity: 0.9
                }}
                animate={{
                  scale: transitionPhase === 'card-centering' ? 1.2 : 
                         transitionPhase === 'card-zooming' ? 6 : 1,
                  x: 0,
                  y: 0,
                  opacity: transitionPhase === 'card-zooming' ? 0 : 1,
                  rotateY: transitionPhase === 'card-zooming' ? [0, 180, 360] : 0,
                  rotateX: transitionPhase === 'card-zooming' ? [0, 20, 0] : 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: transitionPhase === 'card-zooming' ? 1 : 0.8,
                  ease: transitionPhase === 'card-zooming' ? "easeIn" : "easeOut"
                }}
              >
                <div
                  className="p-8 rounded-2xl backdrop-blur-sm border-2 min-w-[340px] text-center relative overflow-hidden"
                  style={{
                    backgroundColor: transitionalCard.bgColor,
                    borderColor: transitionalCard.color,
                    boxShadow: `0 0 80px ${transitionalCard.color}50, inset 0 0 40px ${transitionalCard.color}20`
                  }}
                >
                  {/* Card icon */}
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{
                      scale: transitionPhase === 'card-zooming' ? [1, 1.5, 1] : 1,
                      rotate: transitionPhase === 'card-zooming' ? [0, 360] : 0
                    }}
                    transition={{ duration: 0.6, repeat: transitionPhase === 'card-zooming' ? Infinity : 0 }}
                  >
                    {transitionalCard.icon}
                  </motion.div>

                  {/* Card content */}
                  <motion.h3 
                    className="text-3xl font-bold mb-3"
                    style={{ color: transitionalCard.color }}
                    animate={{
                      scale: transitionPhase === 'card-zooming' ? [1, 1.3, 1] : 1
                    }}
                    transition={{ duration: 0.4, repeat: transitionPhase === 'card-zooming' ? Infinity : 0 }}
                  >
                    {transitionalCard.title}
                  </motion.h3>
                  <p 
                    className="text-xl opacity-90 mb-4"
                    style={{ color: transitionalCard.color }}
                  >
                    {transitionalCard.subtitle}
                  </p>
                  <p className="text-gray-300 text-lg">
                    {transitionalCard.description}
                  </p>

                  {/* Enhanced zooming effect particles */}
                  {transitionPhase === 'card-zooming' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(24)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: transitionalCard.color,
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: Math.cos(i * Math.PI / 12) * 250,
                            y: Math.sin(i * Math.PI / 12) * 250,
                            scale: [0, 2, 0],
                            opacity: [1, 0.8, 0]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.02
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Enhanced ripple effect for centering */}
                  {transitionPhase === 'card-centering' && (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={`ripple-${i}`}
                          className="absolute inset-0 rounded-2xl border-2"
                          style={{ borderColor: transitionalCard.color }}
                          animate={{
                            scale: [1, 2 + i * 0.5, 4 + i],
                            opacity: [0.8, 0.4, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Checkpoint Navigation */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
            <div className="flex flex-col space-y-6">
              {checkpoints.map((checkpoint, index) => (
                <motion.button
                  key={checkpoint.id}
                  className="w-5 h-5 rounded-full border-2 transition-all relative group"
                  style={{
                    backgroundColor: index === currentCheckpoint 
                      ? checkpoint.color || '#3b82f6'
                      : 'transparent',
                    borderColor: checkpoint.color || '#3b82f6',
                    boxShadow: index === currentCheckpoint 
                      ? `0 0 15px ${checkpoint.color || '#3b82f6'}50`
                      : 'none'
                  }}
                  onClick={() => scrollToCheckpoint(index)}
                  disabled={isTransitioning}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Enhanced Tooltip */}
                  <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-gray-700">
                    <div className="flex items-center space-x-2">
                      {checkpoint.icon && <span>{checkpoint.icon}</span>}
                      <span>{checkpoint.title || checkpoint.id}</span>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black/90"></div>
                  </div>
                  
                  {/* Enhanced Active indicator */}
                  {index === currentCheckpoint && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: checkpoint.color || '#3b82f6' }}
                        animate={{
                          scale: [1, 2.2, 1],
                          opacity: [0.8, 0.2, 0.8]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: checkpoint.color || '#3b82f6' }}
                        animate={{
                          scale: [0.8, 1.1, 0.8],
                          opacity: [0.6, 0.9, 0.6]
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
            <div className="w-80 h-3 bg-gray-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  backgroundColor: currentCheckpointData?.color || '#3b82f6'
                }}
                animate={{
                  width: `${(currentCheckpoint / (checkpoints.length - 1)) * 100}%`
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Progress glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${currentCheckpointData?.color || '#3b82f6'}80, transparent)`
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            <div className="text-center mt-3 text-sm text-gray-400 font-medium">
              <span style={{ color: currentCheckpointData?.color || '#3b82f6' }}>
                {currentCheckpoint + 1}
              </span>
              <span className="mx-2">/</span>
              <span>{checkpoints.length}</span>
              <div className="text-xs mt-1 opacity-75">
                {currentCheckpointData?.title || 'Home'}
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Hint (only on home) */}
          {currentCheckpoint === 0 && !isTransitioning && (
            <motion.div
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div className="text-center text-gray-400">
                <div className="w-8 h-12 border-2 border-gray-400 rounded-full mx-auto mb-3 relative">
                  <motion.div
                    className="w-2 h-4 bg-gray-400 rounded-full mx-auto mt-2"
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <p className="text-sm font-medium">Scroll to explore</p>
                <p className="text-xs opacity-75 mt-1">Use mouse wheel or arrow keys</p>
              </div>
            </motion.div>
          )}

          {/* Transition loading indicator */}
          {isTransitioning && (
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
              <div className="flex items-center space-x-3 bg-black/80 px-4 py-2 rounded-full backdrop-blur-sm">
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: currentCheckpointData?.color || '#3b82f6' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <span className="text-sm text-gray-300">Transitioning...</span>
              </div>
            </div>
          )}
        </div>

        {/* Section Modals */}
        {checkpoints.slice(1).map((checkpoint) => {
          const SectionComponent = checkpoint.component;
          return (
            <div key={checkpoint.id} className="fixed inset-0 z-50">
              <SectionComponent
                isActive={activeModal === checkpoint.modal}
                onClose={() => {}} // Controlled by checkpoints, not close button
                cardTheme={checkpoint}
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