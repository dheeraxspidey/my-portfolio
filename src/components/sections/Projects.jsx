import React from 'react';
import { motion } from 'framer-motion';

function Projects() {
  const projects = [
    {
      title: "RV Security - RBAC Dashboard",
      description: "A frontend security dashboard with role-based access controls, featuring responsive dark-theme UI and real-time analytics.",
      image: `${process.env.PUBLIC_URL}/p2.png`,
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
      image: `${process.env.PUBLIC_URL}/p1.png`,
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
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-glow max-w-xl mx-auto">
            Showcasing my expertise in AI/ML and web development
          </p>
        </motion.div>

        <div className="card-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="project-card"
            >
              <div className="image-modern">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 text-gradient">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h4>
                  <ul className="list-modern">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-300">{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="skill-badge"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.link}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="button"
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating particles with modern effects */}
        {[...Array(10)].map((_, i) => (
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

export default Projects;