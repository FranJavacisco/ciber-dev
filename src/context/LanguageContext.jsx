// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Inicializar el idioma con preferencia del usuario o navegador
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    
    // Si no hay idioma guardado, detectar el idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' || browserLang === 'en' ? browserLang : 'es';
  });

  // Actualizar el atributo lang del HTML cuando cambie el idioma
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  // Función para cambiar el idioma
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Función para cambiar a un idioma específico
  const setLanguageTo = (lang) => {
    if (lang !== 'es' && lang !== 'en') {
      console.warn('Idioma no soportado:', lang);
      return;
    }
    setLanguage(lang);
  };

  // Función de traducción mejorada para manejar claves anidadas y variables
  const t = (key, variables = {}) => {
    try {
      // Dividimos la key por puntos para navegar el objeto
      const keys = key.split('.');
      let translation = translations[language];
      
      // Navegamos por el objeto de traducciones
      for (const k of keys) {
        translation = translation?.[k];
        if (translation === undefined) {
          console.warn(`Missing translation key: ${key} for language: ${language}`);
          // Intentar usar el otro idioma como fallback
          let fallbackTranslation = translations[language === 'es' ? 'en' : 'es'];
          for (const fk of keys) {
            fallbackTranslation = fallbackTranslation?.[fk];
          }
          return formatTranslation(fallbackTranslation || key, variables);
        }
      }
      
      // Procesar variables en la traducción
      return formatTranslation(translation, variables);
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  // Función para verificar si una clave de traducción existe
  const hasTranslation = (key) => {
    try {
      const keys = key.split('.');
      let translation = translations[language];
      for (const k of keys) {
        translation = translation?.[k];
        if (translation === undefined) return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  // Función para formatear números según el idioma
  const formatNumber = (number, options = {}) => {
    try {
      return new Intl.NumberFormat(language, options).format(number);
    } catch (error) {
      console.error('Number formatting error:', error);
      return number.toString();
    }
  };

  // Función para formatear fechas según el idioma
  const formatDate = (date, options = {}) => {
    try {
      return new Intl.DateTimeFormat(language, options).format(date);
    } catch (error) {
      console.error('Date formatting error:', error);
      return date.toString();
    }
  };

  const value = {
    language,
    toggleLanguage,
    setLanguage: setLanguageTo,
    t,
    hasTranslation,
    formatNumber,
    formatDate,
    isSpanish: language === 'es',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado con validación
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Función auxiliar para formatear textos con variables
export const formatTranslation = (text, variables) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
};

// HOC para componentes que necesitan traducciones
export const withTranslation = (WrappedComponent) => {
  return function WithTranslationComponent(props) {
    const languageContext = useLanguage();
    return <WrappedComponent {...props} {...languageContext} />;
  };
};

export default LanguageContext;