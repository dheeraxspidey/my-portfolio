import React from 'react';
import { motion } from 'framer-motion';

function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "C", level: 85 },
        { name: "R", level: 80 },
        { name: "JavaScript", level: 75 },
        { name: "HTML/CSS", level: 85 }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Tableau", level: 85 },
        { name: "Power BI", level: 80 },
        { name: "Flask", level: 85 },
        { name: "SQL", level: 80 },
        { name: "Git", level: 75 }
      ]
    },
    {
      title: "Domains",
      skills: [
        { name: "Machine Learning", level: 90 },
        { name: "Web Development", level: 85 },
        { name: "Data Analytics", level: 85 },
        { name: "AI", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated wave background */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="wave-text">Technical Skills</span>
          </h2>
          <p className="text-primary-400 max-w-xl mx-auto">
            Expertise in various programming languages, tools, and technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="glass-ocean rounded-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-primary-400 mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-primary-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-primary-400 mb-6 text-center">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Machine Learning Specialization – Coursera",
              "Infosys Springboard AI Primer",
              "Infosys Springboard Gen AI",
              "Google Cloud Data Analytics"
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-ocean p-4 rounded-lg text-center hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <p className="text-gray-300">{cert}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitive Programming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-primary-400 mb-6">Competitive Programming</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { title: "Smart Interviews", desc: "Diamond Certified, Rank 1247/37015" },
              { title: "LeetCode", desc: "Rating: 1605" },
              { title: "CodeChef", desc: "2 Stars" }
            ].map((platform, index) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-ocean p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <p className="text-primary-400 font-bold">{platform.title}</p>
                <p className="text-gray-300">{platform.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
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

export default Skills;
