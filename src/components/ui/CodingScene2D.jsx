import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodingScene2D = ({ className = "" }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);

  const codeLines = [
    "// Hi, I am Dheeraj Kumar!",
    "const developer = {",
    "  name: 'Dheeraj Kumar',",
    "  role: 'Full Stack Developer',",
    "  passion: 'AI/ML & Data Science',",
    "  skills: ['React', 'Python', 'Node.js'],",
    "  dreams: 'Building the future'",
    "};",
    "",
    "console.log('Welcome to my portfolio!');"
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
    const greetingTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 3000);

    return () => clearTimeout(greetingTimer);
  }, []);

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
        <svg viewBox="0 0 800 400" className="w-full h-full">
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
                  line.includes('Dheeraj') ? '#4ade80' :
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
            {showGreeting && (
              <motion.g
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              >
                {/* "Hi, I am Dheeraj" card - Made larger and more prominent */}
                <motion.g
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <rect x="420" y="130" width="170" height="50" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" rx="10" />
                  <text x="505" y="150" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Hi, I am Dheeraj</text>
                  <text x="505" y="165" textAnchor="middle" fill="#60a5fa" fontSize="9">Full Stack Developer</text>
                  <text x="505" y="178" textAnchor="middle" fill="#93c5fd" fontSize="8">Building amazing things</text>
                </motion.g>
                
                {/* Skills card */}
                <motion.g
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, -2, 2, 0]
                  }}
                  transition={{ 
                    duration: 3.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <rect x="100" y="100" width="120" height="50" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1" rx="8" />
                  <text x="160" y="115" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Skills</text>
                  <text x="160" y="128" textAnchor="middle" fill="#34d399" fontSize="7">React • Python</text>
                  <text x="160" y="140" textAnchor="middle" fill="#34d399" fontSize="7">AI/ML • Node.js</text>
                </motion.g>
                
                {/* Passion card */}
                <motion.g
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 3, -1, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <rect x="480" y="250" width="130" height="35" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="1" rx="8" />
                  <text x="545" y="265" textAnchor="middle" fill="#a855f7" fontSize="9" fontWeight="bold">Data Science</text>
                  <text x="545" y="278" textAnchor="middle" fill="#c084fc" fontSize="7">Building the future</text>
                </motion.g>
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
    </div>
  );
};

export default CodingScene2D;
