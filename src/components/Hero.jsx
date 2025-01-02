// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Book } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" id="home">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-96 h-96 rounded-full bg-purple-500/30 blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 mb-6"
        >
          {t('hero_title')}
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl dark:text-gray-300 text-gray-600 mb-8"
        >
          {t('hero_subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Projects Button */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white 
                     rounded-full text-lg font-medium hover:bg-purple-700 
                     transition-colors gap-2"
          >
            {t('hero_cta')}
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          {/* Blog Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-3 
                       border-2 border-purple-600 dark:text-white text-gray-900
                       hover:bg-purple-600 hover:text-white
                       rounded-full text-lg font-medium 
                       transition-colors gap-2"
            >
              {t('hero_blog')}
              <Book className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;