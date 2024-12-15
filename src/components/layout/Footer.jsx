import React from 'react';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Wave Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, rgba(79, 209, 197, 0.1), transparent)',
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="glass-ocean rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-primary-400 font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-primary-400 font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:adheerajkumar1@gmail.com"
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    adheerajkumar1@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919390695922"
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    +91 9390695922
                  </a>
                </li>
                <li className="text-gray-300">
                  Kompally, Hyderabad, India
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-primary-400 font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://github.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  GitHub
                </motion.a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-primary-500/20 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-gray-400"
            >
              © {currentYear} Dheeraj Kumar. All rights reserved.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </footer>
  );
}

export default Footer;
