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
  const [scrollListenersActive, setScrollListenersActive] = useState(true);
  
  // Professional checkpoint configuration
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
      icon: '👨‍💻',
      scenePosition: { x: 420, y: 130, width: 120, height: 45 }
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
      icon: '⚡',
      scenePosition: { x: 100, y: 100, width: 120, height: 45 }
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
      icon: '🚀',
      scenePosition: { x: 480, y: 250, width: 120, height: 45 }
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
      icon: '📧',
      scenePosition: { x: 90, y: 250, width: 120, height: 45 }
    }
  ];

  // Professional smooth scroll to checkpoint
  const scrollToCheckpoint = (checkpointIndex, smooth = true) => {
    if (isTransitioning || !scrollListenersActive) return;
    
    setIsTransitioning(true);
    const container = containerRef.current;
    if (!container) return;

    const targetProgress = checkpoints[checkpointIndex].progress;
    const targetScroll = targetProgress * (container.scrollHeight - container.clientHeight);
    
    container.scrollTo({
      top: targetScroll,
      behavior: smooth ? 'smooth' : 'auto'
    });

    setTimeout(() => {
      setCurrentCheckpoint(checkpointIndex);
      setIsTransitioning(false);
    }, smooth ? 1000 : 100);
  };

  // Navigate to next section
  const goToNextSection = () => {
    if (currentCheckpoint < checkpoints.length - 1) {
      scrollToCheckpoint(currentCheckpoint + 1);
    }
  };

  // Navigate to previous section
  const goToPreviousSection = () => {
    if (currentCheckpoint > 0) {
      scrollToCheckpoint(currentCheckpoint - 1);
    }
  };

  // Close modal and optionally navigate
  const closeModalAndNavigate = (direction = null) => {
    setActiveModal(null);
    setShowHeroScene(true);
    setTransitionPhase('none');
    
    // Navigate after closing modal
    if (direction === 'next' && currentCheckpoint < checkpoints.length - 1) {
      setTimeout(() => {
        scrollToCheckpoint(currentCheckpoint + 1);
      }, 500);
    } else if (direction === 'prev' && currentCheckpoint > 0) {
      setTimeout(() => {
        scrollToCheckpoint(currentCheckpoint - 1);
      }, 500);
    }
  };

  // Disable/Enable scroll listeners when modal is active
  useEffect(() => {
    if (activeModal) {
      setScrollListenersActive(false);
      document.body.style.overflow = 'hidden';
    } else {
      setScrollListenersActive(true);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  // Enhanced professional scroll handler
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = (e) => {
      if (isTransitioning || !scrollListenersActive || activeModal) {
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime;
      
      if (timeSinceLastScroll < 30) return;
      setLastScrollTime(now);

      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollProgress = scrollTop / (scrollHeight - clientHeight);
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        if (isTransitioning || !scrollListenersActive || activeModal) return;
        
        let nearestCheckpoint = 0;
        let minDistance = Math.abs(scrollProgress - checkpoints[0].progress);
        
        checkpoints.forEach((checkpoint, index) => {
          const distance = Math.abs(scrollProgress - checkpoint.progress);
          if (distance < minDistance) {
            minDistance = distance;
            nearestCheckpoint = index;
          }
        });

        if (nearestCheckpoint !== currentCheckpoint && minDistance > 0.03) {
          scrollToCheckpoint(nearestCheckpoint, true);
        }
      }, 120);
    };

    // Professional wheel handling
    const handleWheel = (e) => {
      if (isTransitioning || !scrollListenersActive || activeModal) {
        return;
      }

      e.preventDefault();
      
      const delta = e.deltaY;
      const threshold = 30;
      
      if (Math.abs(delta) > threshold) {
        if (delta > 0 && currentCheckpoint < checkpoints.length - 1) {
          scrollToCheckpoint(currentCheckpoint + 1);
        } else if (delta < 0 && currentCheckpoint > 0) {
          scrollToCheckpoint(currentCheckpoint - 1);
        }
      }
    };

    // Professional keyboard navigation
    const handleKeyDown = (e) => {
      if (isTransitioning || !scrollListenersActive || activeModal) return;
      
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
        case 'Escape':
          if (activeModal) {
            return;
          }
          break;
      }
    };

    const container = containerRef.current;
    if (container && scrollListenersActive) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      container.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(scrollTimeout);
      };
    }
  }, [currentCheckpoint, isTransitioning, lastScrollTime, scrollListenersActive, activeModal]);

  // Professional UI state management
  useEffect(() => {
    const checkpoint = checkpoints[currentCheckpoint];
    
    if (checkpoint.id === 'home') {
      setTransitionPhase('none');
      setActiveModal(null);
      setShowHeroScene(true);
      setTransitionalCard(null);
    } else {
      setTransitionPhase('card-centering');
      setShowHeroScene(true);
      setTransitionalCard(checkpoint);
      setActiveModal(null);
      
      setTimeout(() => {
        setTransitionPhase('card-zooming');
      }, 1000);
      
      setTimeout(() => {
        setTransitionPhase('section-active');
        setShowHeroScene(false);
        setTransitionalCard(null);
        setActiveModal(checkpoint.modal);
      }, 2000);
    }
  }, [currentCheckpoint]);

  // Professional card transition handler
  const handleCardTransition = (sectionId) => {
    if (activeModal) return;
    
    const targetIndex = checkpoints.findIndex(cp => cp.id === sectionId);
    if (targetIndex > 0) {
      scrollToCheckpoint(targetIndex);
    }
  };

  const currentCheckpointData = checkpoints[currentCheckpoint];

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-screen ${activeModal ? 'overflow-hidden' : 'overflow-y-auto'} ${className}`}
      style={{ 
        scrollBehavior: scrollListenersActive ? 'auto' : 'unset',
        pointerEvents: activeModal ? 'none' : 'auto'
      }}
    >
      {/* Professional scroll content */}
      <div className="h-[500vh]">
        <div className="fixed inset-0 flex items-center justify-center">
          
          {/* Professional dynamic background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: showHeroScene 
                ? 'radial-gradient(circle at center, rgba(55, 65, 81, 0.2) 0%, rgba(17, 24, 39, 0.95) 70%)'
                : currentCheckpointData?.bgColor 
                  ? `radial-gradient(circle at center, ${currentCheckpointData.bgColor} 0%, rgba(17, 24, 39, 0.95) 70%)`
                  : 'radial-gradient(circle at center, rgba(55, 65, 81, 0.2) 0%, rgba(17, 24, 39, 0.95) 70%)'
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Professional Hero 2D Scene */}
          <AnimatePresence>
            {showHeroScene && (
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{ pointerEvents: activeModal ? 'none' : 'auto' }}
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

          {/* Professional Transitional Card with exact positioning */}
          <AnimatePresence>
            {transitionalCard && transitionalCard.scenePosition && (transitionPhase === 'card-centering' || transitionPhase === 'card-zooming') && (
              <motion.div
                className="z-30 relative"
                initial={{ 
                  scale: 0.12,
                  x: (transitionalCard.scenePosition.x - 400) * 0.75,
                  y: (transitionalCard.scenePosition.y - 300) * 0.75,
                  opacity: 0.95
                }}
                animate={{
                  scale: transitionPhase === 'card-centering' ? 1.5 : 
                         transitionPhase === 'card-zooming' ? 8 : 1,
                  x: 0,
                  y: 0,
                  opacity: transitionPhase === 'card-zooming' ? 0 : 1,
                  rotateY: transitionPhase === 'card-zooming' ? [0, 180, 360] : 0,
                  rotateX: transitionPhase === 'card-zooming' ? [0, 15, 0] : 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: transitionPhase === 'card-zooming' ? 1.2 : 1,
                  ease: transitionPhase === 'card-zooming' ? "easeIn" : "easeOut"
                }}
                style={{ pointerEvents: 'none' }}
              >
                <div
                  className="p-10 rounded-3xl backdrop-blur-lg border-2 min-w-[380px] text-center relative overflow-hidden"
                  style={{
                    backgroundColor: transitionalCard.bgColor,
                    borderColor: transitionalCard.color,
                    boxShadow: `0 0 100px ${transitionalCard.color}60, inset 0 0 60px ${transitionalCard.color}25`
                  }}
                >
                  <motion.div
                    className="text-5xl mb-6"
                    animate={{
                      scale: transitionPhase === 'card-zooming' ? [1, 1.8, 1] : 1,
                      rotate: transitionPhase === 'card-zooming' ? [0, 360] : 0
                    }}
                    transition={{ duration: 0.8, repeat: transitionPhase === 'card-zooming' ? Infinity : 0 }}
                  >
                    {transitionalCard.icon}
                  </motion.div>

                  <motion.h3 
                    className="text-4xl font-bold mb-4"
                    style={{ color: transitionalCard.color }}
                    animate={{
                      scale: transitionPhase === 'card-zooming' ? [1, 1.4, 1] : 1
                    }}
                    transition={{ duration: 0.5, repeat: transitionPhase === 'card-zooming' ? Infinity : 0 }}
                  >
                    {transitionalCard.title}
                  </motion.h3>
                  <p 
                    className="text-2xl opacity-90 mb-5"
                    style={{ color: transitionalCard.color }}
                  >
                    {transitionalCard.subtitle}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {transitionalCard.description}
                  </p>

                  {transitionPhase === 'card-zooming' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(32)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-6 h-6 rounded-full"
                          style={{
                            backgroundColor: transitionalCard.color,
                            left: '50%',
                            top: '50%'
                          }}
                          animate={{
                            x: Math.cos(i * Math.PI / 16) * 300,
                            y: Math.sin(i * Math.PI / 16) * 300,
                            scale: [0, 3, 0],
                            opacity: [1, 0.9, 0]
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.015
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {transitionPhase === 'card-centering' && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`ripple-${i}`}
                          className="absolute inset-0 rounded-3xl border-2"
                          style={{ borderColor: transitionalCard.color }}
                          animate={{
                            scale: [1, 2.5 + i * 0.8, 5 + i * 1.2],
                            opacity: [0.9, 0.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.25
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Professional Checkpoint Navigation - All dots clickable */}
          {!activeModal && (
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
              <div className="flex flex-col space-y-6">
                {checkpoints.map((checkpoint, index) => (
                  <motion.button
                    key={checkpoint.id}
                    className="w-8 h-8 rounded-full border-2 transition-all relative group cursor-pointer"
                    style={{
                      backgroundColor: index === currentCheckpoint 
                        ? checkpoint.color || '#3b82f6'
                        : 'transparent',
                      borderColor: checkpoint.color || '#3b82f6',
                      boxShadow: index === currentCheckpoint 
                        ? `0 0 25px ${checkpoint.color || '#3b82f6'}70`
                        : `0 0 10px ${checkpoint.color || '#3b82f6'}30`
                    }}
                    onClick={() => scrollToCheckpoint(index)}
                    disabled={isTransitioning}
                    whileHover={{ 
                      scale: 1.6,
                      boxShadow: `0 0 30px ${checkpoint.color || '#3b82f6'}80`
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Enhanced Tooltip */}
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-black/95 text-white px-5 py-4 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg border border-gray-700/50 min-w-[200px]">
                      <div className="flex items-center space-x-4">
                        {checkpoint.icon && <span className="text-2xl">{checkpoint.icon}</span>}
                        <div className="text-left">
                          <div className="font-bold text-lg" style={{ color: checkpoint.color || '#3b82f6' }}>
                            {checkpoint.title || checkpoint.id}
                          </div>
                          {checkpoint.subtitle && (
                            <div className="text-sm opacity-75 mt-1">{checkpoint.subtitle}</div>
                          )}
                          {checkpoint.description && (
                            <div className="text-xs opacity-60 mt-2">{checkpoint.description}</div>
                          )}
                        </div>
                      </div>
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-black/95"></div>
                    </div>
                    
                    {/* Enhanced Active indicators */}
                    {index === currentCheckpoint && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: checkpoint.color || '#3b82f6' }}
                          animate={{
                            scale: [1, 3.2, 1],
                            opacity: [0.9, 0.2, 0.9]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: checkpoint.color || '#3b82f6' }}
                          animate={{
                            scale: [0.6, 1.3, 0.6],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </>
                    )}

                    {/* Clickable indicator */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/20"
                      whileHover={{
                        borderColor: 'white',
                        scale: 1.2
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Professional Progress Bar */}
          {!activeModal && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
              <div className="w-96 h-5 bg-gray-800/70 rounded-full overflow-hidden backdrop-blur-lg border border-gray-700/60">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    backgroundColor: currentCheckpointData?.color || '#3b82f6'
                  }}
                  animate={{
                    width: `${(currentCheckpoint / (checkpoints.length - 1)) * 100}%`
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${currentCheckpointData?.color || '#3b82f6'}90, transparent)`
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              <div className="text-center mt-4 text-sm text-gray-400 font-medium">
                <span style={{ color: currentCheckpointData?.color || '#3b82f6' }} className="text-xl font-bold">
                  {currentCheckpoint + 1}
                </span>
                <span className="mx-3 text-gray-500">/</span>
                <span className="text-gray-300">{checkpoints.length}</span>
                <div className="text-base mt-2 font-bold" style={{ color: currentCheckpointData?.color || '#3b82f6' }}>
                  {currentCheckpointData?.title || 'Home'}
                </div>
              </div>
            </div>
          )}

          {/* Professional Scroll Hint */}
          {currentCheckpoint === 0 && !isTransitioning && !activeModal && (
            <motion.div
              className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center text-gray-400">
                <div className="w-12 h-16 border-2 border-gray-400 rounded-full mx-auto mb-4 relative">
                  <motion.div
                    className="w-4 h-6 bg-gray-400 rounded-full mx-auto mt-3"
                    animate={{ y: [0, 24, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </div>
                <p className="text-lg font-medium">Explore My Portfolio</p>
                <p className="text-sm opacity-75 mt-2">Click dots • Scroll • Use arrow keys</p>
              </div>
            </motion.div>
          )}

          {/* Professional transition indicator */}
          {isTransitioning && !activeModal && (
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
              <div className="flex items-center space-x-4 bg-black/90 px-6 py-3 rounded-full backdrop-blur-lg border border-gray-700/50">
                <motion.div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: currentCheckpointData?.color || '#3b82f6' }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <span className="text-base text-gray-200 font-medium">Transitioning...</span>
              </div>
            </div>
          )}
        </div>

        {/* Professional Section Modals with Navigation Arrows */}
        {checkpoints.slice(1).map((checkpoint) => {
          const SectionComponent = checkpoint.component;
          const isCurrentModal = activeModal === checkpoint.modal;
          const currentIndex = checkpoints.findIndex(cp => cp.modal === checkpoint.modal);
          
          return (
            <div 
              key={checkpoint.id} 
              className="fixed inset-0 z-50"
              style={{ 
                pointerEvents: isCurrentModal ? 'auto' : 'none',
                zIndex: isCurrentModal ? 9999 : -1
              }}
            >
              <SectionComponent
                isActive={isCurrentModal}
                onClose={() => closeModalAndNavigate()}
                cardTheme={checkpoint}
                scrollControlled={true}
              />
              
              {/* Navigation Arrows for Modal */}
              {isCurrentModal && (
                <>
                  {/* Previous Section Arrow */}
                  {currentIndex > 1 && (
                    <motion.button
                      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-[10000] w-16 h-16 rounded-full backdrop-blur-lg border-2 flex items-center justify-center group"
                      style={{
                        backgroundColor: `${checkpoint.color}20`,
                        borderColor: checkpoint.color
                      }}
                      onClick={() => closeModalAndNavigate('prev')}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: `${checkpoint.color}30`
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <svg 
                        className="w-8 h-8 transform group-hover:-translate-x-1 transition-transform"
                        style={{ color: checkpoint.color }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      
                      {/* Tooltip */}
                      <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black/95 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg border border-gray-700/50">
                        Previous: {checkpoints[currentIndex - 1]?.title}
                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black/95"></div>
                      </div>
                    </motion.button>
                  )}

                  {/* Next Section Arrow */}
                  {currentIndex < checkpoints.length - 1 && (
                    <motion.button
                      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-[10000] w-16 h-16 rounded-full backdrop-blur-lg border-2 flex items-center justify-center group"
                      style={{
                        backgroundColor: `${checkpoint.color}20`,
                        borderColor: checkpoint.color
                      }}
                      onClick={() => closeModalAndNavigate('next')}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: `${checkpoint.color}30`
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <svg 
                        className="w-8 h-8 transform group-hover:translate-x-1 transition-transform"
                        style={{ color: checkpoint.color }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      
                      {/* Tooltip */}
                      <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-black/95 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg border border-gray-700/50">
                        Next: {checkpoints[currentIndex + 1]?.title}
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black/95"></div>
                      </div>
                    </motion.button>
                  )}

                  {/* Close and Navigate Options */}
                  <motion.div
                    className="fixed bottom-8 right-8 z-[10000] flex items-center space-x-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    {/* Back to Home */}
                    <motion.button
                      className="px-6 py-3 rounded-full backdrop-blur-lg border-2 flex items-center space-x-2 group"
                      style={{
                        backgroundColor: `${checkpoint.color}15`,
                        borderColor: checkpoint.color
                      }}
                      onClick={() => {
                        setActiveModal(null);
                        setShowHeroScene(true);
                        setTransitionPhase('none');
                        setTimeout(() => scrollToCheckpoint(0), 500);
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: `${checkpoint.color}25`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg 
                        className="w-5 h-5"
                        style={{ color: checkpoint.color }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: checkpoint.color }}
                      >
                        Home
                      </span>
                    </motion.button>
                  </motion.div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollBasedSectionTransition;