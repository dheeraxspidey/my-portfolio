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
    console.log(formData);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Get In Touch
          </h2>
          <p className="text-glow max-w-xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Information Card */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gradient mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-primary">📧</span>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:adheerajkumar1@gmail.com" 
                       className="text-white hover:text-primary transition-colors">
                      adheerajkumar1@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-primary">📱</span>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+919390695922" 
                       className="text-white hover:text-primary transition-colors">
                      +91 9390695922
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-primary">📍</span>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">Kompally, Hyderabad, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gradient mb-4">Social Links</h3>
              <div className="flex space-x-4">
                {[
                  { name: 'LinkedIn', url: 'https://linkedin.com/in/your-profile', icon: '💼' },
                  { name: 'GitHub', url: 'https://github.com/your-profile', icon: '💻' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{social.icon}</span>
                    {social.name}
                  </motion.a>
                ))}
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
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-lg space-y-6">
              <div>
                <label htmlFor="name" className="text-sm text-gray-400 block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-modern w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-gray-400 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-modern w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm text-gray-400 block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="input-modern w-full resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="button w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
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
