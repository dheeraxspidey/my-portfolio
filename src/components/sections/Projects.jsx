import React from 'react';
import { motion } from 'framer-motion';

function Projects() {
  const projects = [
    {
      title: "RV Security - RBAC Dashboard",
      description: "A frontend security dashboard with role-based access controls, featuring responsive dark-theme UI and real-time analytics.",
      image: "https://via.placeholder.com/500x300", // Replace with your project image
      tags: ["React", "TailwindCSS", "Vite"],
      achievements: [
        "Reduced vulnerabilities by 40% with role-based access",
        "Decreased bounce rates by 20% with responsive UI",
        "Improved response time by 30% with real-time analytics"
      ],
      link: "#"
    },
    {
      title: "CulinAIry Compass",
      description: "An advanced recipe recommender system using machine learning and neural networks for personalized suggestions.",
      image: "https://via.placeholder.com/500x300", // Replace with your project image
      tags: ["Python", "Flask", "Machine Learning", "HTML/CSS/JS"],
      achievements: [
        "Boosted recommendation accuracy by 35%",
        "Increased user retention by 15%",
        "Improved user engagement by 25%"
      ],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
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
            <span className="wave-text">Featured Projects</span>
          </h2>
          <p className="text-primary-400 max-w-xl mx-auto">
            Showcasing my expertise in AI/ML and web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-ocean rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 wave-text">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary-400 mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm bg-primary-500/10 text-primary-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.link}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-primary-600/80 text-white px-6 py-2 rounded-full hover:bg-primary-500 transition-all duration-300"
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          ))}
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

export default Projects;