import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  const skills = [
    {
      icon: <Icon icon="vscode-icons:file-type-js-official" width="40" height="40" />,
      title: 'skills_card_1_title',
      desc: 'skills_card_1_desc',
      technologies: [
        { name: 'React', icon: 'logos:react' },
        { name: 'Vue', icon: 'logos:vue' },
        { name: 'Angular', icon: 'logos:angular-icon' },
      ],
    },
    {
      icon: <Icon icon="mdi:shield-outline" width="40" height="40" />,
      title: 'skills_card_2_title',
      desc: 'skills_card_2_desc',
      technologies: [
        { name: 'OWASP', icon: 'simple-icons:owasp' }, 
        { name: 'Auth0', icon: 'logos:auth0' },
        { name: 'JWT', icon: 'logos:jwt' },
      ],
    },
    {
      icon: <Icon icon="ant-design:database-outlined" width="40" height="40" />,
      title: 'skills_card_3_title',
      desc: 'skills_card_3_desc',
      technologies: [
        { name: 'Node.js', icon: 'logos:nodejs-icon' },
        { name: 'Django', icon: 'logos:django-icon' },
        { name: 'Laravel', icon: 'logos:laravel' },
      ],
    },
    {
      icon: <Icon icon="mdi:cloud-outline" width="40" height="40" />,
      title: 'skills_card_4_title',
      desc: 'skills_card_4_desc',
      technologies: [
        { name: 'AWS', icon: 'logos:aws' },
        { name: 'GCP', icon: 'logos:google-cloud' },  
        { name: 'Azure', icon: 'logos:microsoft-azure' },
      ],
    },
    {
      icon: <Icon icon="mdi:console" width="40" height="40" />,
      title: 'skills_card_5_title',
      desc: 'skills_card_5_desc',
      technologies: [
        { name: 'Docker', icon: 'logos:docker-icon' },
        { name: 'Kubernetes', icon: 'logos:kubernetes' },
        { name: 'Ansible', icon: 'logos:ansible' },  
      ],
    },
    {
      icon: <Icon icon="mdi:chip" width="40" height="40" />,
      title: 'skills_card_6_title',
      desc: 'skills_card_6_desc',
      technologies: [
        { name: 'Lighthouse', icon: 'logos:lighthouse' },
        { name: 'WebPageTest', icon: 'material-symbols:speed' },
        { name: 'GTmetrix', icon: 'material-symbols:analytics-outline' },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 dark:bg-blue-950 bg-gray-50">
        <div className="absolute -top-40 -right-40 w-80 h-80 
                      dark:bg-purple-600/20 bg-purple-300/20 
                      rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 
                      dark:bg-blue-600/20 bg-blue-300/20 
                      rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
            {t('skills_title')}
          </h2>
          <p className="text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            {t('skills_subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="p-8 rounded-2xl backdrop-blur-sm
                            dark:bg-blue-900/30 bg-white/80
                            border dark:border-blue-800/50 border-gray-200
                            transition duration-300
                            group-hover:dark:bg-blue-900/50 group-hover:bg-white/90">
                <div className="dark:text-purple-400 text-purple-600 mb-4">
                  {skill.icon}
                </div>
                
                <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">
                  {t(skill.title)}
                </h3>

                <p className="text-base dark:text-gray-300 text-gray-600 mb-6">
                  {t(skill.desc)}
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  {skill.technologies.map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center gap-2">
                      <Icon icon={tech.icon} width="48" height="48" />
                      <span className="text-sm dark:text-gray-300 text-gray-600">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;