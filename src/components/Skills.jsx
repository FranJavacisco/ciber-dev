import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Code2, 
  Shield, 
  Database, 
  Cloud,
  Terminal,
  Cpu,
  React as ReactIcon,
  Monitor,
  Lock,
  Key,
  Server,
  Globe,
  Cloud as CloudIcon,
  Box,
  Container,
  Gauge
} from 'lucide-react';

const Skills = () => {
  const { t } = useLanguage();

  const skills = [
    {
      icon: <Code2 size={40} className="dark:text-purple-400 text-purple-600" />,
      title: 'skills_card_1_title',
      desc: 'skills_card_1_desc',
      technologies: [
        { name: 'React', icon: <ReactIcon size={48} /> },
        { name: 'Vue', icon: <Monitor size={48} /> },
        { name: 'Angular', icon: <Globe size={48} /> },
      ],
    },
    {
      icon: <Shield size={40} className="dark:text-purple-400 text-purple-600" />,
      title: 'skills_card_2_title',
      desc: 'skills_card_2_desc',
      technologies: [
        { name: 'OWASP', icon: <Lock size={48} /> },
        { name: 'Auth0', icon: <Key size={48} /> },
        { name: 'JWT', icon: <Shield size={48} /> },
      ],
    },
    {
      icon: <Database size={40} className="dark:text-purple-400 text-purple-600" />,
      title: 'skills_card_3_title',
      desc: 'skills_card_3_desc',
      technologies: [
        { name: 'Node.js', icon: <Server size={48} /> },
        { name: 'Django', icon: <Database size={48} /> },
        { name: 'Laravel', icon: <Globe size={48} /> },
      ],
    },
    {
      icon: <Cloud size={40} className="dark:text-purple-400 text-purple-600" />,
      title: 'skills_card_4_title',
      desc: 'skills_card_4_desc',
      technologies: [
        { name: 'AWS', icon: <CloudIcon size={48} /> },
        { name: 'GCP', icon: <Cloud size={48} /> },
        { name: 'Azure', icon: <Cloud size={48} /> },
      ],
    },
    {
      icon: <Terminal size={40} className="dark:text-purple-400 text-purple-600" />,
      title: 'skills_card_5_title',
      desc: 'skills_card_5_desc',
      technologies: [
        { name: 'Docker', icon: <Box size={48} /> },
        { name: 'Kubernetes', icon: <Container size={48} /> },
        { name: 'Ansible', icon: <Terminal size={48} /> },
      ],
    },
    {
      icon: <Cpu size={40} className="dark:text-purple-400 text-purple-600" />,
      title: 'skills_card_6_title',
      desc: 'skills_card_6_desc',
      technologies: [
        { name: 'Lighthouse', icon: <Gauge size={48} /> },
        { name: 'WebPageTest', icon: <Gauge size={48} /> },
        { name: 'GTmetrix', icon: <Gauge size={48} /> },
      ],
    },
  ];

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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
            {t('skills_title')}
          </h2>
          <p className="text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            {t('skills_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="group transform transition duration-300 hover:scale-102"
            >
              <div className="p-8 rounded-2xl backdrop-blur-sm
                            dark:bg-blue-900/30 bg-white/80
                            border dark:border-blue-800/50 border-gray-200
                            transition duration-300
                            group-hover:dark:bg-blue-900/50 group-hover:bg-white/90">
                <div className="mb-4">
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
                      <div className="dark:text-gray-300 text-gray-600">
                        {tech.icon}
                      </div>
                      <span className="text-sm dark:text-gray-300 text-gray-600">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;