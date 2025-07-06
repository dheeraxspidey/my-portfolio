import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutNew from '../sections/AboutNew';
import SkillsNew from '../sections/SkillsNew';
import ProjectsNew from '../sections/ProjectsNew';
import ContactNew from '../sections/ContactNew';

const CodingScene2D = ({ 
  className = "", 
  activeSection: parentActiveSection, 
  onSectionTransition,
  showGreeting = true,
  highlightCard = null
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showGreetingState, setShowGreetingState] = useState(false);
  const [activeSection, setActiveSection] = useState(parentActiveSection || 'home');
  const [cardTransition, setCardTransition] = useState(null);
  const [activeSectionModal, setActiveSectionModal] = useState(null);

  const codeLines = [
    "// Welcome to my digital workspace!",
    "const developer = {",
    "  name: 'Dheeraj Kumar',",
    "  role: 'Full Stack Developer',",
    "  passion: 'AI/ML & Innovation',",
    "  skills: ['React', 'Python', 'Node.js'],",
    "  mission: 'Building tomorrow today'",
    "};",
    "",
    "console.log('Ready to explore!');"
  ];

  // Standardized card configurations - all cards start from same base position and size
  const baseCardPosition = { x: 300, y: 150, width: 120, height: 45 };
  
  const sectionCards = [
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'My Journey',
      description: 'Discover my story',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.3)',
      position: { ...baseCardPosition, x: baseCardPosition.x + 120, y: baseCardPosition.y - 20 },
      icon: '👨‍💻'
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Tech Stack',
      description: 'React • Python • AI/ML',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.2)',
      position: { ...baseCardPosition, x: baseCardPosition.x - 80, y: baseCardPosition.y - 50 },
      icon: '⚡'
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'My Work',
      description: 'Amazing creations',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      position: { ...baseCardPosition, x: baseCardPosition.x + 180, y: baseCardPosition.y + 100 },
      icon: '🚀'
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: "Let's Connect",
      description: 'Get in touch',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      position: { ...baseCardPosition, x: baseCardPosition.x - 120, y: baseCardPosition.y + 100 },
      icon: '📧'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 1200);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (showGreeting) {
      const greetingTimer = setTimeout(() => {
        setShowGreetingState(true);
      }, 1000);
      return () => clearTimeout(greetingTimer);
    } else {
      setShowGreetingState(false);
    }
  }, [showGreeting]);

  // Update activeSection when parent changes
  useEffect(() => {
    if (parentActiveSection) {
      setActiveSection(parentActiveSection);
    }
  }, [parentActiveSection]);

  // Listen for about modal trigger from navbar
  useEffect(() => {
    const handleOpenAboutModal = () => {
      handleCardClick('about');
    };

    window.addEventListener('openAboutModal', handleOpenAboutModal);
    return () => window.removeEventListener('openAboutModal', handleOpenAboutModal);
  }, []);

  // Handle card click navigation
  const handleCardClick = (sectionId) => {
    if (activeSectionModal === sectionId) return;
    
    setCardTransition(sectionId);
    
    // Call parent callback for transition handling
    if (onSectionTransition) {
      onSectionTransition(sectionId);
    }
    
    // For standalone usage (classic view), show modal
    if (!onSectionTransition) {
      setTimeout(() => {
        setActiveSectionModal(sectionId);
      }, 500);
    }
  };

  // Close section modal
  const closeSectionModal = () => {
    setActiveSectionModal(null);
    setCardTransition(null);
  };

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeSectionModal) {
        closeSectionModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeSectionModal]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Enhanced Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Scene */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 800 400" className="w-full h-full" style={{ pointerEvents: 'auto' }}>
          {/* Enhanced desk with gradient */}
          <defs>
            <linearGradient id="deskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>
            <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
          
          {/* Desk surface with shadow */}
          <ellipse cx="400" cy="320" rx="350" ry="8" fill="rgba(0,0,0,0.2)" />
          <rect x="50" y="300" width="700" height="20" fill="url(#deskGradient)" rx="4" />
          
          {/* Desk legs */}
          <rect x="80" y="320" width="15" height="80" fill="#2d3748" rx="2" />
          <rect x="700" y="320" width="15" height="80" fill="#2d3748" rx="2" />
          
          {/* Enhanced chair */}
          <rect x="320" y="280" width="80" height="60" fill="url(#deskGradient)" rx="8" />
          <rect x="325" y="220" width="70" height="80" fill="url(#deskGradient)" rx="8" />
          <rect x="340" y="340" width="10" height="60" fill="#2d3748" rx="2" />
          <rect x="370" y="340" width="10" height="60" fill="#2d3748" rx="2" />
          
          {/* Enhanced character with better animations */}
          <g transform="translate(350, 180)">
            {/* Head with subtle glow */}
            <circle cx="20" cy="20" r="18" fill="#fbbf24" filter="drop-shadow(0 0 3px rgba(251, 191, 36, 0.3))" />
            
            {/* Hair */}
            <path d="M 5 10 Q 20 0 35 10 Q 35 5 30 5 Q 20 -2 10 5 Q 5 5 5 10" fill="#374151" />
            
            {/* Body */}
            <rect x="8" y="35" width="24" height="40" fill="#3b82f6" rx="4" />
            
            {/* Enhanced arms with better typing animation */}
            <motion.rect 
              x="0" 
              y="40" 
              width="12" 
              height="25" 
              fill="#fbbf24" 
              rx="6"
              animate={isTyping ? { 
                rotate: [0, -8, 0, 8, 0],
                y: [40, 37, 40, 37, 40]
              } : {}}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <motion.rect 
              x="28" 
              y="40" 
              width="12" 
              height="25" 
              fill="#fbbf24" 
              rx="6"
              animate={isTyping ? { 
                rotate: [0, 8, 0, -8, 0],
                y: [40, 37, 40, 37, 40]
              } : {}}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            
            {/* Hands */}
            <circle cx="6" cy="70" r="4" fill="#fbbf24" />
            <circle cx="34" cy="70" r="4" fill="#fbbf24" />
          </g>
          
          {/* Enhanced monitor */}
          <rect x="200" y="180" width="200" height="120" fill="url(#monitorGradient)" rx="8" />
          <rect x="210" y="190" width="180" height="100" fill="#0f172a" rx="4" />
          
          {/* Monitor stand */}
          <rect x="285" y="300" width="30" height="15" fill="#4a5568" rx="2" />
          <rect x="270" y="315" width="60" height="8" fill="#4a5568" rx="4" />
          
          {/* Enhanced keyboard */}
          <rect x="250" y="320" width="120" height="25" fill="#2d3748" rx="4" />
          {/* Keyboard keys */}
          {[...Array(12)].map((_, i) => (
            <rect key={i} x={255 + i * 9} y="323" width="7" height="6" fill="#4a5568" rx="1" />
          ))}
          
          {/* Mouse with subtle glow */}
          <ellipse cx="390" cy="332" rx="8" ry="12" fill="#4a5568" filter="drop-shadow(0 0 2px rgba(74, 85, 104, 0.5))" />
          
          {/* Screen content */}
          <g clipPath="url(#screenClip)">
            <defs>
              <clipPath id="screenClip">
                <rect x="210" y="190" width="180" height="100" rx="4" />
              </clipPath>
            </defs>
            
            {/* Terminal background */}
            <rect x="210" y="190" width="180" height="100" fill="#1e293b" />
            
            {/* Terminal header */}
            <rect x="210" y="190" width="180" height="20" fill="#334155" />
            <circle cx="220" cy="200" r="3" fill="#ef4444" />
            <circle cx="230" cy="200" r="3" fill="#f59e0b" />
            <circle cx="240" cy="200" r="3" fill="#10b981" />
            
            {/* Code lines with better syntax highlighting */}
            {codeLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.text
                key={index}
                x="215"
                y={220 + index * 12}
                fill={
                  line.includes('Dheeraj') || line.includes('Welcome') ? '#4ade80' :
                  line.includes('const') || line.includes('console') ? '#60a5fa' :
                  line.includes("'") ? '#fbbf24' :
                  line.includes('//') ? '#94a3b8' :
                  '#e2e8f0'
                }
                fontSize="8"
                fontFamily="monospace"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {line}
                {index === currentLine && (
                  <motion.tspan
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    |
                  </motion.tspan>
                )}
              </motion.text>
            ))}
          </g>
          
          {/* Floating cards with standardized positions */}
          <AnimatePresence>
            {showGreetingState && (
              <motion.g
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              >
                {sectionCards.map((card, index) => (
                  <motion.g
                    key={card.id}
                    animate={{ 
                      y: [0, -6 - index * 1.5, 0],
                      rotate: [0, index % 2 === 0 ? 1.5 : -1.5, 0],
                      scale: activeSection === card.id || highlightCard === card.id ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      duration: 4 + index * 0.5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleCardClick(card.id);
                    }}
                  >
                    {/* Enhanced card transition overlay effect */}
                    <AnimatePresence>
                      {(cardTransition === card.id || highlightCard === card.id) && (
                        <>
                          {/* Main transition circle */}
                          <motion.circle
                            cx={card.position.x + card.position.width / 2}
                            cy={card.position.y + card.position.height / 2}
                            r="10"
                            fill={card.color}
                            initial={{ r: 10, opacity: 0.8 }}
                            animate={{ 
                              r: [10, 60, 200],
                              opacity: [0.8, 0.4, 0]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                          
                          {/* Multiple ripple effects */}
                          {[...Array(3)].map((_, i) => (
                            <motion.circle
                              key={`ripple-${i}`}
                              cx={card.position.x + card.position.width / 2}
                              cy={card.position.y + card.position.height / 2}
                              r="5"
                              fill="none"
                              stroke={card.color}
                              strokeWidth="2"
                              initial={{ r: 5, opacity: 1 }}
                              animate={{ 
                                r: [5, 40 + i * 20, 100 + i * 30],
                                opacity: [1, 0.6, 0],
                                strokeWidth: [2, 1, 0]
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ 
                                duration: 1.5, 
                                ease: "easeOut", 
                                delay: i * 0.2 
                              }}
                            />
                          ))}
                          
                          {/* Enhanced particle effects */}
                          {[...Array(12)].map((_, i) => (
                            <motion.circle
                              key={`particle-${i}`}
                              cx={card.position.x + card.position.width / 2}
                              cy={card.position.y + card.position.height / 2}
                              r="2"
                              fill={card.color}
                              initial={{ 
                                scale: 0,
                                x: 0,
                                y: 0,
                                opacity: 1
                              }}
                              animate={{ 
                                scale: [0, 1.5, 0],
                                x: Math.cos(i * Math.PI / 6) * 60,
                                y: Math.sin(i * Math.PI / 6) * 60,
                                opacity: [1, 0.7, 0]
                              }}
                              transition={{ 
                                duration: 1.2,
                                delay: 0.3,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    {/* Main card with enhanced styling */}
                    <motion.rect 
                      x={card.position.x} 
                      y={card.position.y} 
                      width={card.position.width} 
                      height={card.position.height} 
                      fill={card.bgColor} 
                      stroke={card.color} 
                      strokeWidth={activeSection === card.id || highlightCard === card.id ? "3" : "2"} 
                      rx="8"
                      filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                      animate={{
                        strokeWidth: activeSection === card.id || highlightCard === card.id ? [2, 4, 2] : 2,
                        fill: activeSection === card.id || highlightCard === card.id ? 
                          [card.bgColor, card.color.replace(')', ', 0.4)').replace('rgb', 'rgba'), card.bgColor] : 
                          card.bgColor,
                        filter: highlightCard === card.id ? 
                          `drop-shadow(0 0 15px ${card.color})` : 
                          'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Card icon */}
                    <text 
                      x={card.position.x + 12} 
                      y={card.position.y + 18} 
                      fontSize="14"
                    >
                      {card.icon}
                    </text>
                    
                    {/* Card title */}
                    <text 
                      x={card.position.x + 30} 
                      y={card.position.y + 16} 
                      fill={card.color} 
                      fontSize="10" 
                      fontWeight="bold"
                    >
                      {card.title}
                    </text>
                    
                    {/* Card subtitle */}
                    <text 
                      x={card.position.x + 30} 
                      y={card.position.y + 28} 
                      fill={card.color.replace(')', ', 0.8)').replace('rgb', 'rgba')} 
                      fontSize="7"
                    >
                      {card.subtitle}
                    </text>

                    {/* Active section indicator */}
                    {(activeSection === card.id || highlightCard === card.id) && (
                      <motion.circle
                        cx={card.position.x + card.position.width - 8}
                        cy={card.position.y + 8}
                        r="3"
                        fill={card.color}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [0, 1.5, 1],
                          opacity: [0, 1, 0.8]
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    {/* Enhanced hover effect */}
                    <motion.rect 
                      x={card.position.x} 
                      y={card.position.y} 
                      width={card.position.width} 
                      height={card.position.height} 
                      fill="transparent" 
                      rx="8"
                      whileHover={{ 
                        stroke: card.color,
                        strokeWidth: 3,
                        filter: "drop-shadow(0 0 12px " + card.color + ")"
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.g>
                ))}
              </motion.g>
            )}
          </AnimatePresence>
          
          {/* Enhanced floating code symbols */}
          {['{ }', '< />', '( )', '[ ]', '=>', '&&', 'fn', 'AI'].map((symbol, index) => (
            <motion.text
              key={symbol}
              x={80 + index * 90}
              y={60 + Math.sin(index) * 15}
              fill="#4ade80"
              fontSize="12"
              fontFamily="monospace"
              opacity="0.25"
              animate={{
                y: [60 + Math.sin(index) * 15, 40 + Math.sin(index) * 15, 60 + Math.sin(index) * 15],
                opacity: [0.25, 0.5, 0.25],
                rotate: [0, 3, -3, 0]
              }}
              transition={{
                duration: 4 + index * 0.3,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              {symbol}
            </motion.text>
          ))}

          {/* Ambient lighting effects */}
          <defs>
            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="300" cy="250" rx="150" ry="80" fill="url(#ambientGlow)" />
        </svg>
      </div>

      {/* Section Modals (for standalone usage) */}
      {!onSectionTransition && (
        <>
          <AboutNew 
            isActive={activeSectionModal === 'about'} 
            onClose={closeSectionModal}
            cardTheme={sectionCards.find(card => card.id === 'about')}
          />
          <SkillsNew 
            isActive={activeSectionModal === 'skills'} 
            onClose={closeSectionModal}
            cardTheme={sectionCards.find(card => card.id === 'skills')}
          />
          <ProjectsNew 
            isActive={activeSectionModal === 'projects'} 
            onClose={closeSectionModal}
            cardTheme={sectionCards.find(card => card.id === 'projects')}
          />
          <ContactNew 
            isActive={activeSectionModal === 'contact'} 
            onClose={closeSectionModal}
            cardTheme={sectionCards.find(card => card.id === 'contact')}
          />
        </>
      )}
    </div>
  );
};

export default CodingScene2D;