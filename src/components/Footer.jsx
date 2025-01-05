// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { 
      icon: <Github />, 
      href: 'https://github.com/FranJavacisco',
      label: 'GitHub'
    },
    { 
      icon: <Linkedin />, 
      href: 'https://www.linkedin.com/in/francisco-lopez-cl/',
      label: 'LinkedIn'
    },
    { 
      icon: <Instagram />, 
      href: 'https://www.instagram.com/francisco.lopez2.0/',
      label: 'Instagram'
    },
    { 
      icon: <Mail />, 
      href: 'mailto:panchodev2024@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 transition-colors duration-300
                    dark:bg-gradient-to-b dark:from-blue-950 dark:to-purple-950
                    bg-gradient-to-b from-gray-50 to-purple-50">
        <div className="absolute bottom-0 left-0 w-96 h-96 
                      dark:bg-purple-600/10 bg-purple-300/10 
                      rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                       text-transparent bg-clip-text"
            >
              PanchoDev
            </motion.a>
            <p className="mt-2 dark:text-gray-400 text-gray-600">
              © 2024 PanchoDev. {t('')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 rounded-lg dark:bg-blue-900/30 bg-white/80
                         dark:text-gray-300 text-gray-600
                         hover:text-purple-500 dark:hover:text-purple-400
                         transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-8 pt-8 border-t dark:border-blue-800/50 border-gray-200">
          <div className="flex flex-wrap justify-center space-x-4 dark:text-gray-400 text-gray-600">
            <motion.a
              href="#about"
              whileHover={{ y: -2 }}
              className="hover:text-purple-500 dark:hover:text-purple-400"
            >
              {t('nav_about')}
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              className="hover:text-purple-500 dark:hover:text-purple-400"
            >
              {t('nav_projects')}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              className="hover:text-purple-500 dark:hover:text-purple-400"
            >
              {t('nav_contact')}
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;