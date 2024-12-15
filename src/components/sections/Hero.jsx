import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0 z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-full"
            style={{
              height: `${200 + i * 50}px`,
              background: `linear-gradient(to bottom, transparent, rgba(79, 209, 197, ${0.05 + i * 0.02}))`,
              filter: 'blur(4px)',
            }}
            animate={{
              y: ['0%', '5%', '0%'],
            }}
            transition={{
              duration: 7 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="wave-text">Dheeraj Kumar</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-400 mb-6 max-w-2xl mx-auto">
            AI/ML Engineer & Full Stack Developer
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto glass-ocean p-6 rounded-xl">
            Specializing in machine learning, web development, and data analytics. 
            Currently pursuing B.Tech in CSE-AIML at VNR Vignana Jyothi Institute.
          </p>
          
          <div className="flex gap-6 justify-center mb-12">
            <motion.a
              href="https://www.linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary-600/80 text-white rounded-full hover:bg-primary-500 transition-all duration-300 glass-ocean"
            >
              View LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-primary-400 text-primary-400 rounded-full hover:bg-primary-400 hover:text-white transition-all duration-300"
            >
              GitHub Profile
            </motion.a>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            {['Python', 'Machine Learning', 'Web Development', 'Data Analytics'].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-4 py-2 bg-primary-500/10 rounded-full text-primary-400 glass-ocean"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </section>
  );
}

export default Hero;