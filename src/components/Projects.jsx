import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      titleKey: 'project_universe_travel',
      image: "/universe-travel.png",
      category: "frontend",
      tech: ["React", "Tailwind", "JavaScript (ES6+)", "Vite"],
      github: "https://github.com/FranJavacisco/universe-travel",
      live: "https://franjavacisco.github.io/universe-travel/",
      icon: <Code className="w-6 h-6" />,
      featured: true
    },
    {
      id: 2,
      titleKey: 'project_fusion_bioart',
      image: "/fusion-bioart.png",
      category: "frontend",
      tech: ["React", "Vite", "Tailwind", "Framer Motion"],
      github: "https://github.com/FranJavacisco/fusion-bioart",
      live: "https://franjavacisco.github.io/fusion-bioart/",
      icon: <Code className="w-6 h-6" />
    },
    {
      id: 3,
      titleKey: 'project_oasis_var',
      image: "/oasis-var.png",
      category: "frontend",
      tech: ["React", "Tailwind", "Vite"],
      github: "https://github.com/FranJavacisco/Oasis-Var",
      live: "https://franjavacisco.github.io/Oasis-Var/",
      icon: <Code className="w-6 h-6" />
    },
    {
      id: 4,
      titleKey: 'project_pet_fashion',
      image: "/petcare.png",
      category: "frontend",
      tech: ["React", "Vite", "Tailwind"],
      github: "https://github.com/FranJavacisco/pawsome-petcare",
      live: "https://franjavacisco.github.io/pawsome-petcare/",
      icon: <Code className="w-6 h-6" />
    }
  ];

  const categories = [
    { value: 'all', label: 'filter_all' },
    { value: 'frontend', label: 'filter_frontend' },
    { value: 'security', label: 'filter_security' },
    { value: 'fullstack', label: 'filter_fullstack' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 transition-colors duration-300
                    dark:bg-gradient-to-b dark:from-blue-950 dark:to-purple-950
                    bg-gradient-to-b from-gray-50 to-purple-50">
        <div className="absolute top-1/4 right-0 w-96 h-96 
                      dark:bg-purple-600/20 bg-purple-300/20 
                      rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 
                      dark:bg-blue-600/20 bg-blue-300/20 
                      rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
            {t('projects_title')}
          </h2>
          <p className="dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            {t('projects_subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === category.value
                  ? 'dark:bg-purple-600 bg-purple-500 text-white shadow-lg'
                  : 'dark:bg-blue-900/50 bg-white/80 dark:text-gray-300 text-gray-600 hover:shadow-md'}`}
            >
              {t(category.label)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Card Background with Gradient */}
              <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-blue-900/50 dark:to-purple-900/50
                           bg-white backdrop-blur-sm transition-colors duration-300"></div>
              
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={t(`${project.titleKey}_title`)}
                  className="w-full h-full object-cover transition-transform duration-500 
                           group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t 
                              dark:from-blue-950/90 dark:to-transparent
                              from-gray-900/90 to-transparent"></div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2
                  ${project.category === 'security' 
                    ? 'dark:bg-purple-600/90 bg-purple-500 text-white' 
                    : project.category === 'frontend'
                    ? 'dark:bg-blue-600/90 bg-blue-500 text-white'
                    : 'dark:bg-green-600/90 bg-green-500 text-white'}`}>
                  {project.icon}
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </span>
              </div>

              {/* Project Content */}
              <div className="relative p-6">
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
                  {t(`${project.titleKey}_title`)}
                </h3>
                <p className="dark:text-gray-300 text-gray-600 mb-4">
                  {t(`${project.titleKey}_desc`)}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm dark:bg-blue-900/50 bg-blue-100
                              dark:text-blue-300 text-blue-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center dark:text-gray-300 text-gray-600
                             hover:text-purple-500 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    {t('view_code')}
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center dark:text-gray-300 text-gray-600
                             hover:text-purple-500 transition-colors duration-300"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t('view_live')}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* More Projects Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/FranJavacisco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border-2
                     dark:border-purple-500 border-purple-400
                     dark:text-purple-400 text-purple-600
                     hover:bg-purple-500 hover:text-white 
                     dark:hover:border-purple-400
                     rounded-full transition-all duration-300
                     transform hover:scale-105"
          >
            <Github className="w-5 h-5 mr-2" />
            {t('view_more')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;