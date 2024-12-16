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
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full"
            style={{
              height: `${400 + i * 50}px`,
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
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-4 px-4">
          {['skills', 'certifications', 'competitive'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm uppercase tracking-wider
                        backdrop-blur-sm transition-all duration-300 ${
                          activeTab === tab 
                          ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50' 
                          : 'text-gray-400 hover:text-white border border-gray-700 hover:border-primary-500/30'
                        }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="backdrop-blur-sm bg-gray-900/50 rounded-xl p-4 md:p-8 border border-gray-700/50">
          {/* Skills Grid */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skillCategories).map(([key, category]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6
                            border border-gray-700/50 hover:border-primary-500/30
                            transition-all duration-300"
                >
                  <div className="flex items-center mb-6 space-x-3">
                    <div className="text-primary-400">{category.icon}</div>
                    <h3 className="text-lg text-gray-200">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="relative">
                        <motion.div
                          className={`transition-all duration-300 ${
                            hoveredSkill === item.name ? 'mb-20' : 'mb-2'
                          }`}
                          onHoverStart={() => setHoveredSkill(item.name)}
                          onHoverEnd={() => setHoveredSkill(null)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{item.name}</span>
                          </div>
                          <div className="h-1 bg-gray-700/30 rounded-full overflow-hidden mt-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 1 }}
                              className="h-full bg-gradient-to-r from-primary-500/40 to-secondary-500/40 rounded-full"
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
                            className="absolute left-0 right-0 mt-2 overflow-hidden"
                          >
                            <div className="bg-gray-800/90 rounded-lg p-3 border border-gray-700/50">
                              <div className="flex flex-wrap gap-2">
                                {item.specialty.map((spec) => (
                                  <span
                                    key={spec}
                                    className="px-2 py-1 text-xs rounded-full
                                             bg-primary-500/10 text-primary-400 
                                             border border-primary-500/20"
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
                  className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg
                            border border-gray-700/50 hover:border-primary-500/30"
                >
                  <FaCertificate className="text-2xl text-primary-400 flex-shrink-0" />
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
                  className="p-6 bg-gray-800/30 rounded-lg text-center
                            border border-gray-700/50 hover:border-primary-500/30"
                >
                  <FaTrophy className="text-3xl text-primary-400 mx-auto mb-4" />
                  <h4 className="text-xl text-gray-200 mb-2">{item.platform}</h4>
                  <p className="text-gray-300">{item.achievement}</p>
                  <p className="text-sm text-gray-400">{item.rank}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;
