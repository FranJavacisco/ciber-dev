import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Lock, Cpu, RefreshCcw, BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: t('about_service_frontend_title'),
      description: t('about_service_frontend_desc')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('about_service_security_title'),
      description: t('about_service_security_desc')
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: t('about_service_code_title'),
      description: t('about_service_code_desc')
    }
  ];

  const specialties = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('about_specialty_protection_title'),
      description: t('about_specialty_protection_desc')
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: t('about_specialty_design_title'),
      description: t('about_specialty_design_desc')
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: t('about_specialty_optimization_title'),
      description: t('about_specialty_optimization_desc')
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t('about_specialty_learning_title'),
      description: t('about_specialty_learning_desc')
    }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden transition-colors duration-300 dark:bg-blue-950 bg-gray-50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 dark:bg-purple-600/30 bg-purple-300/30 rounded-full blur-3xl"/>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 dark:bg-blue-600/30 bg-blue-300/30 rounded-full blur-3xl"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden">
              <img 
                src="/about-image.png"
                alt={t('about_image_alt')}
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr dark:from-blue-950/80 from-gray-100/80 to-transparent"/>
              
              {/* L-shaped Progress Bar */}
              <div className="absolute bottom-2 left-2 z-10">
                {/* Horizontal Bar */}
                <div className="absolute bottom-0 left-0 w-48 h-1.5 bg-purple-600/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear"
                    }}
                    className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-purple-600/50"/>
                </div>
                
                {/* Vertical Bar */}
                <div className="absolute bottom-0 left-0 w-1.5 h-32 bg-purple-600/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                      delay: 0.5
                    }}
                    className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-purple-600 to-transparent"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-purple-600/50"/>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold dark:text-white text-gray-900">
              {t('about_heading_1')}{' '}
              <span className="dark:text-purple-400 text-purple-600">
                {t('about_heading_2')}
              </span>
            </h2>

            <p className="dark:text-gray-300 text-gray-600">
              {t('about_description')}
            </p>

            {/* Services Grid */}
            <div className="grid gap-6 mt-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-4 dark:bg-blue-900/30 bg-white/80 rounded-xl backdrop-blur-sm shadow-lg"
                >
                  <div className="dark:text-purple-400 text-purple-600">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white text-gray-900">
                      {service.title}
                    </h3>
                    <p className="dark:text-gray-300 text-gray-600 mt-1">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What Sets Me Apart */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-4">
                {t('about_specialties_heading')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialties.map((specialty, index) => (
                  <motion.div
                    key={specialty.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 dark:bg-blue-900/30 bg-white/80 rounded-xl backdrop-blur-sm shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="dark:text-purple-400 text-purple-600">
                        {specialty.icon}
                      </div>
                      <h4 className="font-semibold dark:text-white text-gray-900">
                        {specialty.title}
                      </h4>
                    </div>
                    <p className="dark:text-gray-300 text-gray-600 text-sm">
                      {specialty.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors gap-2"
          >
            {t('about_cta')}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;