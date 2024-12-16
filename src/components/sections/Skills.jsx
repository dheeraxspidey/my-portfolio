import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTools, FaBrain, FaTrophy, FaCertificate } from 'react-icons/fa';

function Skills() {
  const [activeTab, setActiveTab] = useState('skills');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = {
    programming: {
      title: "Programming Languages",
      icon: <FaCode className="text-2xl" />,
      items: [
        { name: "Python", specialty: ["ML", "Data Analysis", "Automation"] },
        { name: "C", specialty: ["System Programming", "Algorithms"] },
        { name: "R", specialty: ["Statistical Analysis", "Data Visualization"] },
        { name: "JavaScript", specialty: ["Web Development", "Frontend"] },
        { name: "HTML/CSS", specialty: ["Responsive Design", "UI/UX"] }
      ]
    },
    tools: {
      title: "Tools & Technologies",
      icon: <FaTools className="text-2xl" />,
      items: [
        { name: "Tableau", specialty: ["Data Visualization", "Dashboards"] },
        { name: "Power BI", specialty: ["Business Analytics", "Reporting"] },
        { name: "Flask", specialty: ["API Development", "Web Services"] },
        { name: "SQL", specialty: ["Database Design", "Query Optimization"] },
        { name: "Git", specialty: ["Version Control", "Collaboration"] }
      ]
    },
    domains: {
      title: "Domains",
      icon: <FaBrain className="text-2xl" />,
      items: [
        { name: "Machine Learning", specialty: ["Neural Networks", "Deep Learning"] },
        { name: "Web Development", specialty: ["Full Stack", "RESTful APIs"] },
        { name: "Data Analytics", specialty: ["Statistical Analysis", "Visualization"] },
        { name: "AI", specialty: ["NLP", "Computer Vision"] }
      ]
    }
  };

  const certifications = [
    "Machine Learning Specialization – Coursera",
    "Infosys Springboard AI Primer",
    "Infosys Springboard Gen AI",
    "Google Cloud Data Analytics"
  ];

  const competitive = [
    { platform: "Smart Interviews", achievement: "Diamond Certified", rank: "Rank 1247/37015" },
    { platform: "LeetCode", achievement: "Rating: 1605", rank: "Top 10%" },
    { platform: "CodeChef", achievement: "2 Stars", rank: "Active Participant" }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Technical Skills
          </h2>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {['skills', 'certifications', 'competitive'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`button ${activeTab === tab ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Skills Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'skills' && (
            <div className="grid gap-8">
              {Object.entries(skillCategories).map(([key, category]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-primary">{category.icon}</span>
                    <h3 className="text-xl font-bold text-gradient">{category.title}</h3>
                  </div>

                  <div className="grid gap-4">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="relative"
                        onMouseEnter={() => setHoveredSkill(item.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <motion.div
                          className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70
                                   border border-gray-700/50 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{item.name}</span>
                          </div>
                          <div className="h-1 bg-gray-700/30 rounded-full overflow-hidden mt-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1 }}
                              className="h-full bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full"
                            />
                          </div>

                          {/* Expandable details */}
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: hoveredSkill === item.name ? 1 : 0,
                              height: hoveredSkill === item.name ? 'auto' : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-2">
                                {item.specialty.map((spec) => (
                                  <span
                                    key={spec}
                                    className="skill-badge"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {activeTab === 'certifications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-lg flex items-center gap-4"
                >
                  <FaCertificate className="text-2xl text-primary flex-shrink-0" />
                  <span className="text-gray-300">{cert}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Competitive Programming */}
          {activeTab === 'competitive' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {competitive.map((item, index) => (
                <motion.div
                  key={item.platform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-lg text-center"
                >
                  <FaTrophy className="text-3xl text-primary mx-auto mb-4" />
                  <h4 className="text-xl text-gradient mb-2">{item.platform}</h4>
                  <p className="text-gray-300">{item.achievement}</p>
                  <p className="text-sm text-gray-400">{item.rank}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Background Particles */}
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

export default Skills;
