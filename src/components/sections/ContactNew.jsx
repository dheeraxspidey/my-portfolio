import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactNew = ({ isActive, onClose, cardTheme, scrollControlled = false }) => {
  const [showContent, setShowContent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "dheeraj@example.com",
      description: "Drop me a line anytime",
      action: () => window.open('mailto:dheeraj@example.com')
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "Connect with me",
      description: "Professional networking",
      action: () => window.open('https://linkedin.com/in/dheeraj', '_blank')
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "View my code",
      description: "Open source projects",
      action: () => window.open('https://github.com/dheeraj', '_blank')
    },
    {
      icon: "🐦",
      title: "Twitter",
      value: "Follow updates",
      description: "Tech thoughts & updates",
      action: () => window.open('https://twitter.com/dheeraj', '_blank')
    }
  ];

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setFormData({ name: '', email: '', message: '' });
    }
  }, [isActive]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    
    // Show success message (you can implement this)
    alert('Message sent successfully!');
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            background: `radial-gradient(circle at center, ${cardTheme?.color || '#a855f7'}20 0%, black 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollControlled ? undefined : onClose}
        />

        {/* Card Container with proper scrolling */}
        <motion.div
          className="relative w-full max-w-5xl mx-4 h-[85vh] rounded-2xl overflow-hidden"
          style={{
            background: cardTheme?.bgColor || 'rgba(168, 85, 247, 0.2)',
            border: `2px solid ${cardTheme?.color || '#a855f7'}`,
            pointerEvents: 'auto'
          }}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.8 
          }}
        >
          {/* Header */}
          <motion.div
            className="relative p-6 border-b flex-shrink-0"
            style={{ borderColor: cardTheme?.color || '#a855f7' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors ${scrollControlled ? 'hidden' : ''}`}
              style={{ color: cardTheme?.color || '#a855f7' }}
            >
              ✕
            </button>
            <h2 
              className="text-3xl font-bold"
              style={{ color: cardTheme?.color || '#a855f7' }}
            >
              Let's Connect
            </h2>
            <p 
              className="text-lg opacity-80 mt-2"
              style={{ color: cardTheme?.color || '#a855f7' }}
            >
              Ready to start our conversation?
            </p>
          </motion.div>

          {/* Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto p-6"
            style={{ 
              maxHeight: 'calc(85vh - 120px)',
              scrollBehavior: 'smooth'
            }}
          >
            <AnimatePresence>
              {showContent && (
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Contact Methods */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <h3 
                      className="text-xl font-bold mb-6"
                      style={{ color: cardTheme?.color || '#a855f7' }}
                    >
                      Get in Touch
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      {contactMethods.map((method, index) => (
                        <motion.div
                          key={method.title}
                          className="p-4 rounded-lg backdrop-blur-sm border cursor-pointer transition-all hover:scale-105"
                          style={{
                            backgroundColor: `${cardTheme?.color || '#a855f7'}15`,
                            borderColor: cardTheme?.color || '#a855f7'
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          onClick={method.action}
                          whileHover={{
                            backgroundColor: `${cardTheme?.color || '#a855f7'}25`
                          }}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-4">{method.icon}</span>
                            <div>
                              <h4 
                                className="font-semibold"
                                style={{ color: cardTheme?.color || '#a855f7' }}
                              >
                                {method.title}
                              </h4>
                              <p className="text-sm text-gray-300">
                                {method.description}
                              </p>
                              <p 
                                className="text-sm font-medium mt-1"
                                style={{ color: cardTheme?.color || '#a855f7' }}
                              >
                                {method.value}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Availability */}
                    <motion.div
                      className="p-4 rounded-lg backdrop-blur-sm border"
                      style={{
                        backgroundColor: `${cardTheme?.color || '#a855f7'}10`,
                        borderColor: cardTheme?.color || '#a855f7'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <h4 
                        className="font-semibold mb-2"
                        style={{ color: cardTheme?.color || '#a855f7' }}
                      >
                        🕒 Availability
                      </h4>
                      <p className="text-sm text-gray-300">
                        Available for freelance projects and full-time opportunities. 
                        Usually respond within 24 hours.
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <h3 
                      className="text-xl font-bold mb-6"
                      style={{ color: cardTheme?.color || '#a855f7' }}
                    >
                      Send a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.4 }}
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                          style={{
                            borderColor: cardTheme?.color || '#a855f7',
                            '--tw-ring-color': cardTheme?.color || '#a855f7'
                          }}
                          placeholder="Your name"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.4 }}
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                          style={{
                            borderColor: cardTheme?.color || '#a855f7',
                            '--tw-ring-color': cardTheme?.color || '#a855f7'
                          }}
                          placeholder="your.email@example.com"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none"
                          style={{
                            borderColor: cardTheme?.color || '#a855f7',
                            '--tw-ring-color': cardTheme?.color || '#a855f7'
                          }}
                          placeholder="Tell me about your project or just say hello!"
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: cardTheme?.color || '#a855f7'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.4 }}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </div>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional Contact Information */}
            <motion.div
              className="mt-12 p-6 rounded-xl backdrop-blur-sm border"
              style={{
                backgroundColor: `${cardTheme?.color || '#a855f7'}10`,
                borderColor: cardTheme?.color || '#a855f7'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <h4 
                className="text-lg font-bold mb-4"
                style={{ color: cardTheme?.color || '#a855f7' }}
              >
                📍 Let's Meet
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h5 className="font-semibold text-white mb-2">Location</h5>
                  <p className="text-sm">Kompally, Hyderabad, India</p>
                  <p className="text-sm opacity-75">Available for remote work worldwide</p>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">Response Time</h5>
                  <p className="text-sm">Usually within 24 hours</p>
                  <p className="text-sm opacity-75">Faster response during business hours (IST)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactNew;