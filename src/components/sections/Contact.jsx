import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full"
            style={{
              height: `${300 + i * 50}px`,
              background: `linear-gradient(to bottom, transparent, rgba(79, 209, 197, ${0.03 + i * 0.01}))`,
              filter: 'blur(4px)',
              bottom: `-${i * 20}px`,
            }}
            animate={{
              y: ['0%', '5%', '0%'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="wave-text">Get In Touch</span>
          </h2>
          <p className="text-primary-400 max-w-xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-ocean p-6 rounded-xl">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="mailto:adheerajkumar1@gmail.com" className="text-primary-400 hover:text-primary-300">
                    adheerajkumar1@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <a href="tel:+919390695922" className="text-primary-400 hover:text-primary-300">
                    +91 9390695922
                  </a>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-primary-400">
                    Kompally, Hyderabad, India
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-ocean p-6 rounded-xl">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Social Links</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="text-primary-400 hover:text-primary-300"
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://github.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="text-primary-400 hover:text-primary-300"
                >
                  GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-ocean p-6 rounded-xl space-y-6">
              <div>
                <label htmlFor="name" className="text-primary-400 block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800/50 border border-primary-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-primary-400 block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-800/50 border border-primary-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="text-primary-400 block mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full bg-gray-800/50 border border-primary-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary-600/80 text-white py-3 rounded-lg hover:bg-primary-500 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
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
      </div>
    </section>
  );
}

export default Contact;
