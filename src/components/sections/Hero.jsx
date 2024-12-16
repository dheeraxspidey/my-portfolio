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
          {/* Main Title with Matrix Style */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <TypeAnimation
                sequence={[
                  'Hello World!',
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
                className="text-4xl md:text-6xl font-bold relative z-10 
                          font-mono text-white tracking-wide
                          [text-shadow:_0_0_2px_#fff]
                          style-matrix"
                speed={{ type: 'keyStrokeDelayInMs', value: 100 }}
                deletionSpeed={75}
              />
            </motion.div>
          </div>

          {/* Role/Title with Matrix Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                3000,
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
              className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto 
                        font-mono tracking-[0.2em] text-white/90
                        style-matrix-subtle"
            />
          </motion.div>

          {/* Matrix-style background dots */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
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