import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'MongoDB', level: 75 }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                Who I Am
              </h3>
              <p className="text-gray-300 mb-4">
                I'm a passionate web developer with a strong focus on creating 
                beautiful and functional web applications. With several years 
                of experience in full-stack development, I love turning ideas 
                into reality through code.
              </p>
              <p className="text-gray-300 mb-6">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open source projects, or sharing my knowledge
                through technical writing.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors"
              >
                Download CV
              </motion.button>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                My Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-purple-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-8 text-center">
              Experience
            </h3>
            <div className="space-y-8">
              {/* Timeline Item */}
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <div className="w-0.5 h-full bg-purple-500/30" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Senior Developer</h4>
                  <p className="text-purple-400">2020 - Present</p>
                  <p className="text-gray-300 mt-2">
                    Led development of multiple web applications using React and Node.js.
                    Managed team of 5 developers and implemented CI/CD pipelines.
                  </p>
                </div>
              </div>
              
              {/* Add more timeline items as needed */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
