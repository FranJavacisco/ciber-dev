import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Componente para manejar el scroll al cambiar de ruta
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Componente para las rutas animadas
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

// Configuración inicial de EmailJS
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!publicKey) {
    console.warn('EmailJS Public Key no encontrada en las variables de entorno');
    return;
  }
  
  try {
    emailjs.init(publicKey);
    console.log('EmailJS inicializado correctamente');
    
    // Log de verificación de las variables de entorno (solo en desarrollo)
    if (import.meta.env.DEV) {
      console.log('=== Configuración EmailJS ===');
      console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
      console.log('Public Key:', publicKey);
      console.log('===========================');
    }
  } catch (error) {
    console.error('Error al inicializar EmailJS:', error);
  }
};

function App() {
  // Inicializar EmailJS al montar la aplicación
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            {/* Fondo con gradientes */}
            <div className="fixed inset-0 transition-colors duration-300
                          dark:bg-gradient-to-b dark:from-blue-950 dark:to-purple-950
                          bg-gradient-to-b from-gray-50 to-white">
              {/* Elementos decorativos */}
              <div className="absolute -top-40 -right-40 w-80 h-80 
                           dark:bg-purple-600/20 bg-purple-300/20 
                           rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 
                           dark:bg-blue-600/20 bg-blue-300/20 
                           rounded-full blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative flex flex-col flex-grow z-10">
              <Navbar />
              <ScrollToTopOnMount />
              <main className="flex-grow">
                <AnimatedRoutes />
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;