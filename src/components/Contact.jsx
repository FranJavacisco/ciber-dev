import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import emailjs from '@emailjs/browser';
import { CustomCaptcha } from './ui/captcha';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  // Validación del email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Resetear el estado de envío cuando el usuario empieza a escribir de nuevo
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validación del CAPTCHA
    if (!isCaptchaVerified) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    // Validaciones básicas
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Francisco López',
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsCaptchaVerified(false); // Reset CAPTCHA after successful submission
    } catch (error) {
      console.error('Error al enviar el email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('form_email'),
      value: 'panchodev2024@gmail.com',
      href: 'mailto:panchodev2024@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('form_subject'),
      value: '+56 (9) 78738166',
      href: 'tel:+56978738166'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact_subtitle'),
      value: 'Region Metropolitana, Santiago de Chile',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: <Github />, href: 'https://github.com/FranJavacisco', label: 'GitHub' },
    { icon: <Linkedin />, href: 'https://www.linkedin.com/in/francisco-lopez-cl/', label: 'LinkedIn' },
    { icon: <Instagram />, href: 'https://www.instagram.com/francisco.lopez2.0/', label: 'Instagram' }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 transition-colors duration-300
                    dark:bg-gradient-to-b dark:from-blue-950 dark:to-purple-950
                    bg-gradient-to-b from-gray-50 to-purple-50">
        <div className="absolute top-1/4 right-0 w-96 h-96 
                      dark:bg-purple-600/20 bg-purple-300/20 
                      rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 
                      dark:bg-blue-600/20 bg-blue-300/20 
                      rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
            {t('contact_title')}
          </h2>
          <p className="text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            {t('contact_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-8"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start p-4 rounded-xl transition-colors duration-300
                         dark:bg-blue-900/30 bg-white/80 backdrop-blur-sm
                         hover:transform hover:scale-[1.02]
                         dark:hover:bg-blue-900/50 hover:bg-white/90"
              >
                <div className="flex-shrink-0 p-4 rounded-lg
                              dark:bg-purple-600/30 bg-purple-100">
                  {method.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium dark:text-white text-gray-900">
                    {method.title}
                  </h3>
                  <p className="mt-1 dark:text-gray-300 text-gray-600">
                    {method.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <div className="pt-8 border-t dark:border-blue-800/50 border-gray-200">
              <h3 className="text-lg font-medium dark:text-white text-gray-900">
                {t('social_follow')}
              </h3>
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-3 rounded-lg dark:bg-blue-900/30 bg-white/80
                             hover:bg-purple-600/30 dark:hover:bg-purple-600/30
                             transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    {t('form_name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg 
                             dark:bg-blue-900/30 bg-white/80 backdrop-blur-sm
                             dark:text-white text-gray-900
                             border dark:border-blue-800/50 border-gray-200
                             focus:ring-2 focus:ring-purple-500
                             transition-colors duration-300"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    {t('form_email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg 
                             dark:bg-blue-900/30 bg-white/80 backdrop-blur-sm
                             dark:text-white text-gray-900
                             border dark:border-blue-800/50 border-gray-200
                             focus:ring-2 focus:ring-purple-500
                             transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  {t('form_subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg 
                           dark:bg-blue-900/30 bg-white/80 backdrop-blur-sm
                           dark:text-white text-gray-900
                           border dark:border-blue-800/50 border-gray-200
                           focus:ring-2 focus:ring-purple-500
                           transition-colors duration-300"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  {t('form_message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg 
                           dark:bg-blue-900/30 bg-white/80 backdrop-blur-sm
                           dark:text-white text-gray-900
                           border dark:border-blue-800/50 border-gray-200
                           focus:ring-2 focus:ring-purple-500
                           transition-colors duration-300"
                />
              </div>

              {/* CAPTCHA */}
              <div className="mb-6">
                <CustomCaptcha onVerify={(status) => setIsCaptchaVerified(status)} />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !isCaptchaVerified}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 bg-purple-600 text-white 
                         rounded-lg font-medium hover:bg-purple-700
                         disabled:opacity-75 disabled:cursor-not-allowed
                         transition-all duration-300"
              >
                {isSubmitting ? t('form_sending') : t('form_submit')}
              </motion.button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-green-500/20 border 
                           border-green-500/50 text-green-500"
                >
                  {t('form_success')}
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/20 border 
                           border-red-500/50 text-red-500"
                >
                  {t('form_error')}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;