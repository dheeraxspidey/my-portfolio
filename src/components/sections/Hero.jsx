import React from 'react';
import { motion } from 'framer-motion';
import CodingScene2D from '../ui/CodingScene2D';

function Hero() {

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 2D Coding Scene Background */}
      <div className="absolute inset-0 z-0">
        <CodingScene2D className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-transparent to-gray-900/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center"
        >
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.5 }}
            className="mt-8"
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById('projects');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  );
}

export default React.memo(Hero);