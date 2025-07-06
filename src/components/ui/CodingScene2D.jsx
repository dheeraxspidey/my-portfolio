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

  // Exact card positions in the 2D scene - each card has its specific location
  const sectionCards = [
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'My Journey',
      description: 'Discover my story',
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.3)',
      position: { x: 420, y: 130, width: 120, height: 45 },
      icon: '👨‍💻'
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Tech Stack',
      description: 'React • Python • AI/ML',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.2)',
      position: { x: 100, y: 100, width: 120, height: 45 },
      icon: '⚡'
    },
    {
      id: 'projects',
      title: 'Projects',
      subtitle: 'My Work',
      description: 'Amazing creations',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.2)',
      position: { x: 480, y: 250, width: 120, height: 45 },
      icon: '🚀'
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: "Let's Connect",
      description: 'Get in touch',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.2)',
      position: { x: 90, y: 250, width: 120, height: 45 },
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
      {/* Professional Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Sophisticated grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Ambient particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Professional Workspace Scene */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 800 400" className="w-full h-full" style={{ pointerEvents: 'auto' }}>
          {/* Enhanced gradients and filters */}
          <defs>
            <linearGradient id="deskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="50%" stopColor="#3a4553" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>
            <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.15)" />
              <stop offset="70%" stopColor="rgba(56, 189, 248, 0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Professional desk setup */}
          <ellipse cx="400" cy="325" rx="360" ry="10" fill="rgba(0,0,0,0.15)" />
          <rect x="50" y="300" width="700" height="25" fill="url(#deskGradient)" rx="6" filter="url(#softShadow)" />
          
          {/* Desk legs with better styling */}
          <rect x="80" y="325" width="18" height="75" fill="#2d3748" rx="3" filter="url(#softShadow)" />
          <rect x="700" y="325" width="18" height="75" fill="#2d3748" rx="3" filter="url(#softShadow)" />
          
          {/* Professional chair */}
          <rect x="315" y="275" width="90" height="65" fill="url(#deskGradient)" rx="12" filter="url(#softShadow)" />
          <rect x="320" y="215" width="80" height="85" fill="url(#deskGradient)" rx="12" filter="url(#softShadow)" />
          <rect x="340" y="340" width="12" height="60" fill="#2d3748" rx="3" />
          <rect x="368" y="340" width="12" height="60" fill="#2d3748" rx="3" />
          
          {/* Enhanced character with professional animations */}
          <g transform="translate(350, 180)">
            {/* Head with subtle professional glow */}
            <circle cx="20" cy="20" r="18" fill="#fbbf24" filter="drop-shadow(0 0 2px rgba(251, 191, 36, 0.2))" />
            
            {/* Professional hairstyle */}
            <path d="M 5 10 Q 20 -2 35 10 Q 35 5 30 5 Q 20 -4 10 5 Q 5 5 5 10" fill="#374151" />
            
            {/* Professional attire */}
            <rect x="8" y="35" width="24" height="40" fill="#3b82f6" rx="4" />
            
            {/* Refined typing animation */}
            <motion.rect 
              x="0" 
              y="40" 
              width="12" 
              height="25" 
              fill="#fbbf24" 
              rx="6"
              animate={isTyping ? { 
                rotate: [0, -6, 0, 6, 0],
                y: [40, 38, 40, 38, 40]
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.rect 
              x="28" 
              y="40" 
              width="12" 
              height="25" 
              fill="#fbbf24" 
              rx="6"
              animate={isTyping ? { 
                rotate: [0, 6, 0, -6, 0],
                y: [40, 38, 40, 38, 40]
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
            />
            
            {/* Hands */}
            <circle cx="6" cy="70" r="4" fill="#fbbf24" />
            <circle cx="34" cy="70" r="4" fill="#fbbf24" />
          </g>
          
          {/* Professional monitor setup */}
          <rect x="195" y="175" width="210" height="130" fill="url(#monitorGradient)" rx="10" filter="url(#softShadow)" />
          <rect x="205" y="185" width="190" height="110" fill="#0f172a" rx="6" />
          
          {/* Monitor stand */}
          <rect x="285" y="305" width="35" height="18" fill="#4a5568" rx="3" />
          <rect x="270" y="323" width="65" height="10" fill="#4a5568" rx="5" />
          
          {/* Professional keyboard */}
          <rect x="245" y="320" width="130" height="28" fill="#2d3748" rx="6" filter="url(#softShadow)" />
          {/* Keyboard keys */}
          {[...Array(14)].map((_, i) => (
            <rect key={i} x={250 + i * 8.5} y="324" width="7" height="6" fill="#4a5568" rx="1" />
          ))}
          {[...Array(12)].map((_, i) => (
            <rect key={i} x={255 + i * 8.5} y="332" width="7" height="6" fill="#4a5568" rx="1" />
          ))}
          
          {/* Professional mouse */}
          <ellipse cx="395" cy="335" rx="10" ry="14" fill="#4a5568" filter="url(#softShadow)" />
          
          {/* Screen content */}
          <g clipPath="url(#screenClip)">
            <defs>
              <clipPath id="screenClip">
                <rect x="205" y="185" width="190" height="110" rx="6" />
              </clipPath>
            </defs>
            
            {/* Terminal background */}
            <rect x="205" y="185" width="190" height="110" fill="#1e293b" />
            
            {/* Professional terminal header */}
            <rect x="205" y="185" width="190" height="22" fill="#334155" />
            <circle cx="215" cy="196" r="3" fill="#ef4444" />
            <circle cx="225" cy="196" r="3" fill="#f59e0b" />
            <circle cx="235" cy="196" r="3" fill="#10b981" />
            <text x="250" y="200" fill="#94a3b8" fontSize="8" fontFamily="monospace">terminal</text>
            
            {/* Enhanced code with professional syntax highlighting */}
            {codeLines.slice(0, currentLine + 1).map((line, index) => (
              <motion.text
                key={index}
                x="210"
                y={218 + index * 11}
                fill={
                  line.includes('Dheeraj') || line.includes('Welcome') ? '#4ade80' :
                  line.includes('const') || line.includes('console') ? '#60a5fa' :
                  line.includes("'") ? '#fbbf24' :
                  line.includes('//') ? '#94a3b8' :
                  line.includes(':') ? '#f472b6' :
                  '#e2e8f0'
                }
                fontSize="7"
                fontFamily="monospace"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, ease: "easeOut" }}
              >
                {line}
                {index === currentLine && (
                  <motion.tspan
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    |
                  </motion.tspan>
                )}
              </motion.text>
            ))}
          </g>
          
          {/* Professional floating cards with exact positions */}
          <AnimatePresence>
            {showGreetingState && (
              <motion.g
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              >
                {sectionCards.map((card, index) => (
                  <motion.g
                    key={card.id}
                    animate={{ 
                      y: [0, -4 - index * 1, 0],
                      rotate: [0, index % 2 === 0 ? 1 : -1, 0],
                      scale: activeSection === card.id || highlightCard === card.id ? [1, 1.08, 1] : 1
                    }}
                    transition={{ 
                      duration: 5 + index * 0.3, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15
                    }}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleCardClick(card.id);
                    }}
                  >
                    {/* Professional card transition effects */}
                    <AnimatePresence>
                      {(cardTransition === card.id || highlightCard === card.id) && (
                        <>
                          {/* Main professional transition circle */}
                          <motion.circle
                            cx={card.position.x + card.position.width / 2}
                            cy={card.position.y + card.position.height / 2}
                            r="8"
                            fill={card.color}
                            initial={{ r: 8, opacity: 0.9 }}
                            animate={{ 
                              r: [8, 80, 250],
                              opacity: [0.9, 0.5, 0]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                          />
                          
                          {/* Professional ripple effects */}
                          {[...Array(4)].map((_, i) => (
                            <motion.circle
                              key={`ripple-${i}`}
                              cx={card.position.x + card.position.width / 2}
                              cy={card.position.y + card.position.height / 2}
                              r="4"
                              fill="none"
                              stroke={card.color}
                              strokeWidth="1.5"
                              initial={{ r: 4, opacity: 1 }}
                              animate={{ 
                                r: [4, 50 + i * 15, 120 + i * 20],
                                opacity: [1, 0.6, 0],
                                strokeWidth: [1.5, 0.8, 0]
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ 
                                duration: 2, 
                                ease: "easeOut", 
                                delay: i * 0.15 
                              }}
                            />
                          ))}
                          
                          {/* Professional particle burst */}
                          {[...Array(16)].map((_, i) => (
                            <motion.circle
                              key={`particle-${i}`}
                              cx={card.position.x + card.position.width / 2}
                              cy={card.position.y + card.position.height / 2}
                              r="1.5"
                              fill={card.color}
                              initial={{ 
                                scale: 0,
                                x: 0,
                                y: 0,
                                opacity: 1
                              }}
                              animate={{ 
                                scale: [0, 2, 0],
                                x: Math.cos(i * Math.PI / 8) * 80,
                                y: Math.sin(i * Math.PI / 8) * 80,
                                opacity: [1, 0.8, 0]
                              }}
                              transition={{ 
                                duration: 1.5,
                                delay: 0.2,
                                ease: "easeOut"
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    {/* Professional card design */}
                    <motion.rect 
                      x={card.position.x} 
                      y={card.position.y} 
                      width={card.position.width} 
                      height={card.position.height} 
                      fill={card.bgColor} 
                      stroke={card.color} 
                      strokeWidth={activeSection === card.id || highlightCard === card.id ? "2.5" : "1.5"} 
                      rx="8"
                      filter="drop-shadow(0 6px 12px rgba(0,0,0,0.25))"
                      animate={{
                        strokeWidth: activeSection === card.id || highlightCard === card.id ? [1.5, 3, 1.5] : 1.5,
                        fill: activeSection === card.id || highlightCard === card.id ? 
                          [card.bgColor, card.color.replace(')', ', 0.4)').replace('rgb', 'rgba'), card.bgColor] : 
                          card.bgColor,
                        filter: highlightCard === card.id ? 
                          `drop-shadow(0 0 20px ${card.color})` : 
                          'drop-shadow(0 6px 12px rgba(0,0,0,0.25))'
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    
                    {/* Professional card icon */}
                    <text 
                      x={card.position.x + 12} 
                      y={card.position.y + 20} 
                      fontSize="16"
                    >
                      {card.icon}
                    </text>
                    
                    {/* Professional card title */}
                    <text 
                      x={card.position.x + 32} 
                      y={card.position.y + 18} 
                      fill={card.color} 
                      fontSize="11" 
                      fontWeight="600"
                      fontFamily="system-ui"
                    >
                      {card.title}
                    </text>
                    
                    {/* Professional card subtitle */}
                    <text 
                      x={card.position.x + 32} 
                      y={card.position.y + 32} 
                      fill={card.color.replace(')', ', 0.85)').replace('rgb', 'rgba')} 
                      fontSize="8"
                      fontFamily="system-ui"
                    >
                      {card.subtitle}
                    </text>

                    {/* Professional active indicator */}
                    {(activeSection === card.id || highlightCard === card.id) && (
                      <>
                        <motion.circle
                          cx={card.position.x + card.position.width - 10}
                          cy={card.position.y + 10}
                          r="4"
                          fill={card.color}
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: [0, 1.3, 1],
                            opacity: [0, 1, 0.9]
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        <motion.circle
                          cx={card.position.x + card.position.width - 10}
                          cy={card.position.y + 10}
                          r="6"
                          fill="none"
                          stroke={card.color}
                          strokeWidth="1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.5, 1.2],
                            opacity: [0, 0.8, 0.4]
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </>
                    )}

                    {/* Professional hover effect */}
                    <motion.rect 
                      x={card.position.x} 
                      y={card.position.y} 
                      width={card.position.width} 
                      height={card.position.height} 
                      fill="transparent" 
                      rx="8"
                      whileHover={{ 
                        stroke: card.color,
                        strokeWidth: 2.5,
                        filter: "drop-shadow(0 0 15px " + card.color + ")"
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.g>
                ))}
              </motion.g>
            )}
          </AnimatePresence>
          
          {/* Professional floating code symbols */}
          {['{ }', '< />', '( )', '[ ]', '=>', '&&', 'fn', 'AI'].map((symbol, index) => (
            <motion.text
              key={symbol}
              x={70 + index * 85}
              y={50 + Math.sin(index) * 12}
              fill="#4ade80"
              fontSize="11"
              fontFamily="monospace"
              opacity="0.2"
              animate={{
                y: [50 + Math.sin(index) * 12, 35 + Math.sin(index) * 12, 50 + Math.sin(index) * 12],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 6 + index * 0.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            >
              {symbol}
            </motion.text>
          ))}

          {/* Professional ambient lighting */}
          <ellipse cx="300" cy="240" rx="180" ry="90" fill="url(#ambientGlow)" />
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