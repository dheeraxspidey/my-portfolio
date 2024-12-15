import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[120px] md:pt-0">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Title with Enhanced Animation */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <TypeAnimation
                sequence={[
                  'Hello World!', // Initial greeting
                  400,
                  'Hi there!',
                  1000,
                  'Hi, I am Dheeraj',
                  1000,
                  'Hi, I am Dheeraj Kumar',
                  2000,
                  () => console.log('Done typing!'),
                ]}
                wrapper="h1"
                cursor={true}
                repeat={Infinity}
                style={{
                  fontSize: '2.5rem',
                  display: 'inline-block',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #ffffff, #88ccff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                speed={{ type: 'keyStrokeDelayInMs', value: 100 }}
                deletionSpeed={75}
                className="text-4xl md:text-6xl font-bold relative z-10"
              />
              
              {/* Glowing effect behind text */}
              <motion.div
                className="absolute inset-0 -z-10 blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          </div>

          {/* Role/Title with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                3000, // Initial delay
                'AI/ML Engineer',
                2000,
                'Full Stack Developer',
                2000,
                'Data Scientist',
                2000,
              ]}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              style={{
                fontSize: '1.5rem',
                background: 'linear-gradient(to right, #38bdf8, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Optional: Add floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;