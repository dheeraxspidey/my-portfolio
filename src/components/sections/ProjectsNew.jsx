import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsNew = ({ isActive, onClose, cardTheme, scrollControlled = false }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const projectsData = [
    {
      id: 1,
      title: "AI-Powered Portfolio",
      subtitle: "Interactive Developer Showcase",
      description: "A modern, interactive portfolio showcasing AI integration with smooth animations and responsive design.",
      technologies: ["React", "Framer Motion", "Three.js", "AI/ML"],
      features: ["3D Animations", "AI Integration", "Responsive Design", "Interactive UI"],
      status: "Completed",
      image: "/p1.png",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Smart Data Analytics Dashboard",
      subtitle: "Real-time Business Intelligence",
      description: "A comprehensive analytics platform with real-time data visualization and machine learning insights.",
      technologies: ["Python", "TensorFlow", "React", "D3.js"],
      features: ["Real-time Analytics", "ML Predictions", "Interactive Charts", "Data Export"],
      status: "In Progress",
      image: "/p2.png",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      subtitle: "Full-Stack Shopping Solution",
      description: "A complete e-commerce solution with modern UI, secure payments, and inventory management.",
      technologies: ["Node.js", "MongoDB", "React", "Stripe"],
      features: ["Payment Integration", "Inventory Management", "User Authentication", "Order Tracking"],
      status: "Completed",
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setCurrentProject(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (showContent) {
      const timer = setInterval(() => {
        setCurrentProject(prev => (prev + 1) % projectsData.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [showContent, projectsData.length]);

  if (!isActive) return null;

  const currentProjectData = projectsData[currentProject];

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
            background: `radial-gradient(circle at center, ${cardTheme?.color || '#f59e0b'}20 0%, black 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollControlled ? undefined : onClose}
        />

        {/* Card Container with proper scrolling */}
        <motion.div
          className="relative w-full max-w-6xl mx-4 h-[85vh] rounded-2xl overflow-hidden"
          style={{
            background: cardTheme?.bgColor || 'rgba(245, 158, 11, 0.2)',
            border: `2px solid ${cardTheme?.color || '#f59e0b'}`,
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
            style={{ borderColor: cardTheme?.color || '#f59e0b' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors ${scrollControlled ? 'hidden' : ''}`}
              style={{ color: cardTheme?.color || '#f59e0b' }}
            >
              ✕
            </button>
            <h2 
              className="text-3xl font-bold"
              style={{ color: cardTheme?.color || '#f59e0b' }}
            >
              My Projects
            </h2>
            <p 
              className="text-lg opacity-80 mt-2"
              style={{ color: cardTheme?.color || '#f59e0b' }}
            >
              Amazing creations & innovations
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
            {/* Project Navigation */}
            <div className="flex justify-center gap-2 mb-6">
              {projectsData.map((_, index) => (
                <motion.button
                  key={index}
                  className="w-3 h-3 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: index === currentProject 
                      ? cardTheme?.color || '#f59e0b'
                      : 'transparent',
                    borderColor: cardTheme?.color || '#f59e0b'
                  }}
                  onClick={() => setCurrentProject(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Project Display */}
            <AnimatePresence mode="wait">
              {showContent && currentProjectData && (
                <motion.div
                  key={currentProject}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Project Image */}
                  <motion.div
                    className="relative rounded-xl overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <img
                      src={currentProjectData.image}
                      alt={currentProjectData.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMUYyOTM3Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwSDI4MFYxODBIMjAwVjEwMFoiIGZpbGw9IiM0QjU1NjMiLz4KPHN2ZyB4PSIxNzAiIHk9IjEyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiM5Q0EzQUYiPgo8cGF0aCBkPSJNMTIgMmwtMy4wOSA2LjI2TDIgOWw1IDQuNzQtMS4xOCA2LjI2TDEyIDE3bDYuMTggMy4yNUwxNyAxNGw1LTQuNzQtNi45MS0uNzRMMTIgMnoiLz4KPHN2Zz4KPHR4dCB4PSIyMDAiIHk9IjIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUNBM0FGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9qZWN0IEltYWdlPC90eHQ+Cjwvc3ZnPgo=';
                      }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      style={{
                        background: `linear-gradient(to top, ${cardTheme?.color || '#f59e0b'}40, transparent)`
                      }}
                    />
                    
                    {/* Status Badge */}
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: currentProjectData.status === 'Completed' 
                          ? '#10b981' 
                          : '#f59e0b',
                        color: 'white'
                      }}
                    >
                      {currentProjectData.status}
                    </div>
                  </motion.div>

                  {/* Project Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col justify-between"
                  >
                    <div>
                      <h3 
                        className="text-2xl font-bold mb-2"
                        style={{ color: cardTheme?.color || '#f59e0b' }}
                      >
                        {currentProjectData.title}
                      </h3>
                      <p 
                        className="text-lg opacity-80 mb-4"
                        style={{ color: cardTheme?.color || '#f59e0b' }}
                      >
                        {currentProjectData.subtitle}
                      </p>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {currentProjectData.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 
                          className="text-sm font-semibold mb-3"
                          style={{ color: cardTheme?.color || '#f59e0b' }}
                        >
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProjectData.technologies.map((tech, index) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border"
                              style={{
                                backgroundColor: `${cardTheme?.color || '#f59e0b'}20`,
                                borderColor: cardTheme?.color || '#f59e0b',
                                color: cardTheme?.color || '#f59e0b'
                              }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 
                          className="text-sm font-semibold mb-3"
                          style={{ color: cardTheme?.color || '#f59e0b' }}
                        >
                          Key Features
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {currentProjectData.features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              className="flex items-center text-sm text-gray-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                            >
                              <span 
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: cardTheme?.color || '#f59e0b' }}
                              />
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <motion.a
                        href={currentProjectData.demoUrl}
                        className="px-6 py-3 rounded-lg font-medium text-white border-2 transition-all"
                        style={{
                          backgroundColor: cardTheme?.color || '#f59e0b',
                          borderColor: cardTheme?.color || '#f59e0b'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={currentProjectData.githubUrl}
                        className="px-6 py-3 rounded-lg font-medium border-2 transition-all"
                        style={{
                          color: cardTheme?.color || '#f59e0b',
                          borderColor: cardTheme?.color || '#f59e0b'
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: `${cardTheme?.color || '#f59e0b'}20`
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Code
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional Projects List */}
            <motion.div
              className="mt-12 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <h4 
                className="text-xl font-bold mb-6"
                style={{ color: cardTheme?.color || '#f59e0b' }}
              >
                🚀 More Projects
              </h4>
              
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="p-4 rounded-lg backdrop-blur-sm border cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: `${cardTheme?.color || '#f59e0b'}10`,
                    borderColor: cardTheme?.color || '#f59e0b'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  onClick={() => setCurrentProject(index)}
                  whileHover={{
                    backgroundColor: `${cardTheme?.color || '#f59e0b'}20`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 
                        className="font-semibold"
                        style={{ color: cardTheme?.color || '#f59e0b' }}
                      >
                        {project.title}
                      </h5>
                      <p className="text-sm text-gray-300 mt-1">{project.subtitle}</p>
                    </div>
                    <div 
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: project.status === 'Completed' ? '#10b981' : '#f59e0b',
                        color: 'white'
                      }}
                    >
                      {project.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectsNew;