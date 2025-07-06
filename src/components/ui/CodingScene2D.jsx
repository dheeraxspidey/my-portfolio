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
    "// Welcome to my digital world!",
    "const developer = {",
    "  name: 'Dheeraj Kumar',",
    "  role: 'Full Stack Developer',",
    "  passion: 'AI/ML & Data Science',",
    "  skills: ['React', 'Python', 'Node.js'],",
    "  dreams: 'Building the future'",
    "};",
    "",
    "console.log('Ready to explore!');"
  ];

  // Section card configurations
  const sectionCards = [
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'My Journey',
      description: 'Discover my story',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.3)',
      position: { x: 420, y: 130, width: 170, height: 60 }
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Tech Stack',
      description: 'React • Python • AI/ML',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.2)',
      position: { x: 100, y: 100, width: 130, height: 55 }
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'My Work',
      description: 'Amazing creations',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      position: { x: 480, y: 250, width: 140, height: 50 }
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: "Let's Connect",
      description: 'Get in touch',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      position: { x: 90, y: 250, width: 120, height: 45 }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 1000);

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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Desk */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 800 400" className="w-full h-full" style={{ pointerEvents: 'auto' }}>
          {/* Desk surface */}
          <rect x="50" y="300" width="700" height="20" fill="#4a5568" rx="4" />
          
          {/* Desk legs */}
          <rect x="80" y="320" width="15" height="80" fill="#2d3748" rx="2" />
          <rect x="700" y="320" width="15" height="80" fill="#2d3748" rx="2" />
          
          {/* Chair */}
          <rect x="320" y="280" width="80" height="60" fill="#4a5568" rx="8" />
          <rect x="325" y="220" width="70" height="80" fill="#4a5568" rx="8" />
          <rect x="340" y="340" width="10" height="60" fill="#2d3748" rx="2" />
          <rect x="370" y="340" width="10" height="60" fill="#2d3748" rx="2" />
          
          {/* Character (back view) */}
          <g transform="translate(350, 180)">
            {/* Head */}
            <circle cx="20" cy="20" r="18" fill="#fbbf24" />
            
            {/* Hair */}
            <path d="M 5 10 Q 20 0 35 10 Q 35 5 30 5 Q 20 -2 10 5 Q 5 5 5 10" fill="#374151" />
            
            {/* Body */}
            <rect x="8" y="35" width="24" height="40" fill="#3b82f6" rx="4" />
            
            {/* Arms */}
            <motion.rect 
              x="0" 
              y="40" 
              width="12" 
              height="25" 
              fill="#fbbf24" 
              rx="6"
              animate={isTyping ? { 
                rotate: [0, -5, 0, 5, 0],
                y: [40, 38, 40, 38, 40]
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.rect 
              x="28" 
              y="40" 
              width="12" 
              height="25" 
              fill="#fbbf24" 
              rx="6"
              animate={isTyping ? { 
                rotate: [0, 5, 0, -5, 0],
                y: [40, 38, 40, 38, 40]
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            />
            
            {/* Hands */}
            <circle cx="6" cy="70" r="4" fill="#fbbf24" />
            <circle cx="34" cy="70" r="4" fill="#fbbf24" />
          </g>
          
          {/* Monitor */}
          <rect x="200" y="180" width="200" height="120" fill="#1a1a1a" rx="8" />
          <rect x="210" y="190" width="180" height="100" fill="#0f172a" rx="4" />
          
          {/* Monitor stand */}
          <rect x="285" y="300" width="30" height="15" fill="#4a5568" rx="2" />
          <rect x="270" y="315" width="60" height="8" fill="#4a5568" rx="4" />
          
          {/* Keyboard */}
          <rect x="250" y="320" width="120" height="25" fill="#2d3748" rx="4" />
          
          {/* Mouse */}
          <ellipse cx="390" cy="332" rx="8" ry="12" fill="#4a5568" />
          
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
            
            {/* Code lines */}
            {codeLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.text
                key={index}
                x="215"
                y={220 + index * 12}
                fill={
                  line.includes('Dheeraj') || line.includes('Welcome') ? '#4ade80' :
                  line.includes('const') || line.includes('console') ? '#60a5fa' :
                  line.includes("'") ? '#fbbf24' :
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
          
          {/* Floating cards around the character */}
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
                      y: [0, -8 - index * 2, 0],
                      rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                      scale: activeSection === card.id || highlightCard === card.id ? [1, 1.15, 1] : 1
                    }}
                    transition={{ 
                      duration: 3.5 + index * 0.5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
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
                              r: [10, 50, 150],
                              opacity: [0.8, 0.4, 0]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                          
                          {/* Secondary ripple effect */}
                          <motion.circle
                            cx={card.position.x + card.position.width / 2}
                            cy={card.position.y + card.position.height / 2}
                            r="5"
                            fill="none"
                            stroke={card.color}
                            strokeWidth="2"
                            initial={{ r: 5, opacity: 1 }}
                            animate={{ 
                              r: [5, 30, 80],
                              opacity: [1, 0.6, 0],
                              strokeWidth: [2, 1, 0]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          />
                          
                          {/* Particle effects */}
                          {[...Array(8)].map((_, i) => (
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
                                scale: [0, 1, 0],
                                x: Math.cos(i * Math.PI / 4) * 50,
                                y: Math.sin(i * Math.PI / 4) * 50,
                                opacity: [1, 0.5, 0]
                              }}
                              transition={{ 
                                duration: 0.8,
                                delay: 0.3,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    {/* Main card */}
                    <motion.rect 
                      x={card.position.x} 
                      y={card.position.y} 
                      width={card.position.width} 
                      height={card.position.height} 
                      fill={card.bgColor} 
                      stroke={card.color} 
                      strokeWidth={activeSection === card.id || highlightCard === card.id ? "3" : "2"} 
                      rx="10"
                      animate={{
                        strokeWidth: activeSection === card.id || highlightCard === card.id ? [2, 4, 2] : 2,
                        fill: activeSection === card.id || highlightCard === card.id ? 
                          [card.bgColor, card.color.replace(')', ', 0.5)').replace('rgb', 'rgba'), card.bgColor] : 
                          card.bgColor,
                        filter: highlightCard === card.id ? 
                          `drop-shadow(0 0 15px ${card.color})` : 
                          'none'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Card content */}
                    <text 
                      x={card.position.x + card.position.width / 2} 
                      y={card.position.y + 18} 
                      textAnchor="middle" 
                      fill={card.color} 
                      fontSize="11" 
                      fontWeight="bold"
                    >
                      {card.title}
                    </text>
                    <text 
                      x={card.position.x + card.position.width / 2} 
                      y={card.position.y + 33} 
                      textAnchor="middle" 
                      fill={card.color.replace(')', ', 0.8)').replace('rgb', 'rgba')} 
                      fontSize="8"
                    >
                      {card.subtitle}
                    </text>
                    {card.position.height > 50 && (
                      <text 
                        x={card.position.x + card.position.width / 2} 
                        y={card.position.y + 46} 
                        textAnchor="middle" 
                        fill={card.color.replace(')', ', 0.6)').replace('rgb', 'rgba')} 
                        fontSize="7"
                      >
                        {card.description}
                      </text>
                    )}

                    {/* Active section indicator */}
                    {(activeSection === card.id || highlightCard === card.id) && (
                      <motion.circle
                        cx={card.position.x + card.position.width - 10}
                        cy={card.position.y + 10}
                        r="4"
                        fill={card.color}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    {/* Hover effect */}
                    <motion.rect 
                      x={card.position.x} 
                      y={card.position.y} 
                      width={card.position.width} 
                      height={card.position.height} 
                      fill="transparent" 
                      rx="10"
                      whileHover={{ 
                        stroke: card.color,
                        strokeWidth: 3,
                        filter: "drop-shadow(0 0 10px " + card.color + ")"
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.g>
                ))}
              </motion.g>
            )}
          </AnimatePresence>
          
          {/* Floating code symbols */}
          {['{ }', '< />', '( )', '[ ]', '=>', '&&'].map((symbol, index) => (
            <motion.text
              key={symbol}
              x={100 + index * 100}
              y={80 + Math.sin(index) * 20}
              fill="#4ade80"
              fontSize="14"
              fontFamily="monospace"
              opacity="0.3"
              animate={{
                y: [80 + Math.sin(index) * 20, 60 + Math.sin(index) * 20, 80 + Math.sin(index) * 20],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              {symbol}
            </motion.text>
          ))}
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