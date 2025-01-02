// src/components/LanguageToggle.jsx
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg dark:bg-blue-900/20 bg-gray-100
                dark:hover:bg-blue-900/30 hover:bg-gray-200
                transition-colors duration-200"
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'es' ? 'EN' : 'ES'}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;