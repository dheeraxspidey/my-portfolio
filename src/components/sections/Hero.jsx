import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

function Hero() {
  // Memoize the background particles
  const BackgroundParticles = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `var(--primary)`,
            opacity: 0.2,
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
    </div>
  ), []);

  const titleSequence = useMemo(() => [
    'Hello World!',
    400,
    'Hi there!',
    1000,
    'Hi, I am Dheeraj',
    1000,
    'Hi, I am Dheeraj Kumar',
    2000,
  ], []);

  const roleSequence = useMemo(() => [
    3000,
    'AI/ML Engineer',
    2000,
    'Full Stack Developer',
    2000,
    'Data Scientist',
    2000,
  ], []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Glass Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 mb-8 inline-block"
          >
            <TypeAnimation
              sequence={titleSequence}
              wrapper="h1"
              cursor={true}
              repeat={Infinity}
              className="text-4xl md:text-6xl font-bold text-gradient"
              speed={{ type: 'keyStrokeDelayInMs', value: 100 }}
              deletionSpeed={75}
            />
          </motion.div>

          {/* Role/Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card p-6 inline-block"
          >
            <TypeAnimation
              sequence={roleSequence}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              className="text-xl md:text-2xl text-glow"
            />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
          >
            <motion.a
              href="#projects"
              className="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Background Effects */}
          {BackgroundParticles}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  );
}

export default React.memo(Hero);