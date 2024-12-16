import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-xl" />,
      url: "https://linkedin.com/in/your-profile"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-xl" />,
      url: "https://github.com/your-profile"
    }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="glass-card p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-6">Navigation</h3>
              <ul className="space-y-3">
                {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <motion.li 
                    key={item}
                    whileHover={{ x: 5 }}
                    className="transition-all duration-300"
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-primary">•</span>
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-6">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:adheerajkumar1@gmail.com"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <FaEnvelope className="text-primary" />
                    adheerajkumar1@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919390695922"
                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <FaPhone className="text-primary" />
                    +91 9390695922
                  </a>
                </li>
                <li className="text-gray-300 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  Kompally, Hyderabad, India
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-6">Connect</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="button-icon"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pt-8 border-t border-primary/20 text-center"
          >
            <p className="text-gray-400">
              © {currentYear} Dheeraj Kumar. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
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
