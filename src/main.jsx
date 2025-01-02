import React from 'react';
import ReactDOM from 'react-dom/client';
import emailjs from '@emailjs/browser';
import App from './App.jsx';
import './index.css';

// Inicializar EmailJS
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

// Inicializar EmailJS antes de renderizar la aplicación
initEmailJS();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);