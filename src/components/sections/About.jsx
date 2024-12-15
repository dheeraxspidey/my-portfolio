import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const education = [
    {
      degree: "B.Tech in CSE-AIML",
      institution: "VNR Vignana Jyothi Institute of Engineering & Technology",
      period: "2022 - 2026",
      details: "Current CGPA: 9.0"
    },
    {
      degree: "Intermediate",
      institution: "Narayana Junior College",
      period: "2020 - 2022",
      details: "97.2%, EAMCET Rank 4176"
    }
  ];

  const achievements = [
    "Smart Interviews: Diamond Certified, Ranked 1247/37015",
    "LeetCode Rating: 1605",
    "CodeChef: 2 Stars",
    "Round 2 Finalist in Krithoathon National Hackathon",
    "Completed Google Cloud's GenAI Study Jams"
  ];

  const experience = [
    {
      title: "Infosys SpringBoard",
      role: "AI/ML Engineer Intern",
      period: "Sep 2024 - Present",
      details: [
        "Contributed to AI-driven solutions and implemented machine learning models",
        "Gained hands-on experience with predictive analytics",
        "Worked on real-world projects using cutting-edge AI technologies"
      ]
    },
    {
      title: "CSRBox",
      role: "Cloud ML Engineer",
      period: "Jun 2024 - Jul 2024",
      details: [
        "Deployed cloud-based ML solutions on IBM Cloud",
        "Collaborated with teams to develop scalable applications",
        "Implemented data analytics solutions for social impact projects"
      ]
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
            <span className="wave-text">About Me</span>
          </h2>
          <p className="text-primary-400 max-w-xl mx-auto">
            Passionate about AI/ML and Software Development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-ocean p-6 rounded-xl">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Who I Am</h3>
              <p className="text-gray-300 mb-4">
                Motivated individual with strong expertise in machine learning, web development, 
                and data analytics. Proficient in industry-standard tools and programming languages, 
                committed to delivering innovative AI-driven solutions.
              </p>
              <p className="text-gray-300">
                Currently pursuing B.Tech in CSE-AIML at VNR Vignana Jyothi Institute, 
                focusing on cutting-edge AI and ML technologies while maintaining a strong 
                academic performance.
              </p>
            </div>

            {/* Achievements */}
            <div className="glass-ocean p-6 rounded-xl">
              <h3 className="text-xl font-bold text-primary-400 mb-4">Achievements</h3>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-300 flex items-center space-x-2"
                  >
                    <span className="text-primary-400">•</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-ocean p-6 rounded-xl">
              <h3 className="text-xl font-bold text-primary-400 mb-6">Education Journey</h3>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mb-6 last:mb-0"
                >
                  <h4 className="text-white font-bold">{edu.degree}</h4>
                  <p className="text-primary-400">{edu.institution}</p>
                  <p className="text-gray-400">{edu.period}</p>
                  <p className="text-gray-300 mt-1">{edu.details}</p>
                </motion.div>
              ))}
            </div>

            {/* Download CV Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center"
            >
              <a
                href="/path-to-your-cv.pdf"
                download
                className="inline-block px-8 py-3 bg-primary-600/80 text-white rounded-full hover:bg-primary-500 transition-all duration-300 glass-ocean"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Experience Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-primary-400 mb-12 text-center">
            Professional Experience
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-400/20" />
            
            {experience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                  <div className="w-4 h-4 bg-primary-400 rounded-full" />
                  <div className="absolute w-8 h-8 bg-primary-400/20 rounded-full -translate-x-2 -translate-y-2 animate-pulse" />
                </div>

                {/* Content */}
                <div className={`ml-8 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-[50%] md:pr-12' : 'md:ml-[50%] md:pl-12'
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="glass-ocean p-6 rounded-xl relative"
                  >
                    {/* Triangle Pointer */}
                    <div className={`hidden md:block absolute top-4 ${
                      index % 2 === 0 ? 'right-[-8px]' : 'left-[-8px]'
                    } w-4 h-4 transform ${
                      index % 2 === 0 ? 'rotate-45' : '-rotate-45'
                    } bg-primary-400/10`} />

                    {/* Content */}
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                      <p className="text-primary-400 mb-1">{exp.role}</p>
                      <p className="text-gray-400 mb-4">{exp.period}</p>
                      
                      <ul className="space-y-2">
                        {exp.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-gray-300 flex items-center space-x-2"
                          >
                            <span className="text-primary-400">•</span>
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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

export default About;
