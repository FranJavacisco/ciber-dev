import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: t('nav_home'), path: '/', hash: '', exact: true },
    { name: t('nav_about'), path: '/', hash: '#about' },
    { name: t('nav_skills'), path: '/', hash: '#skills' },
    { name: t('nav_projects'), path: '/', hash: '#projects' },
    { name: t('nav_contact'), path: '/', hash: '#contact' },
  ];

  const handleClick = (item) => {
    setIsOpen(false);
    
    // Si es el home, asegurarse de que se vaya al inicio
    if (item.exact && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Para las demás secciones
    if (location.pathname === item.path && item.hash) {
      setTimeout(() => {
        const element = document.querySelector(item.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const isActiveLink = (item) => {
    if (item.exact) {
      return location.pathname === item.path && !location.hash;
    }
    return location.pathname === item.path && (!item.hash || location.hash === item.hash);
  };

  const BlogButton = ({ className = '' }) => (
    <Link
      to="/blog" 
      onClick={() => setIsOpen(false)}
      className={`bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md 
                text-base font-medium transition-colors duration-200 inline-flex items-center
                justify-center ${className}`}
    >
      {t('nav_blog')}
    </Link>
  );

  const NavLink = ({ item, className = '' }) => (
    <Link
      to={item.path + item.hash}
      onClick={() => handleClick(item)}
      className={`text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 
                px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                ${isActiveLink(item) ? 'text-purple-600 dark:text-purple-400' : ''} ${className}`}
    >
      {item.name}
    </Link>
  );

  return (
    <nav className="fixed w-full z-50 bg-opacity-90 dark:bg-blue-950 bg-white backdrop-blur-sm border-b dark:border-blue-800/50 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text"
            >
              PanchoDev
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {navigationItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
            
            {/* Blog Button */}
            <BlogButton />

            {/* Theme and Language Toggles */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md 
                       text-gray-600 dark:text-gray-300
                       hover:text-purple-600 dark:hover:text-purple-400 
                       focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? 'Cerrar menú' : 'Abrir menú'}
              </span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? 
          { height: 'auto', opacity: 1, display: 'block' } : 
          { height: 0, opacity: 0, transitionEnd: { display: 'none' } }
        }
        transition={{ duration: 0.3 }}
        className="sm:hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 dark:bg-blue-950 bg-white">
          {navigationItems.map((item) => (
            <NavLink 
              key={item.name} 
              item={item} 
              className="block w-full"
            />
          ))}
          
          {/* Blog Button en mobile */}
          <BlogButton className="w-full mt-2" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;