import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About'; 
import Skills from '../components/Skills'; // Nuevo import
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
 const { scrollYProgress } = useScroll();
 const scaleX = useSpring(scrollYProgress, {
   stiffness: 100,
   damping: 30,
   restDelta: 0.001
 });

 useEffect(() => {
   const handleHashChange = () => {
     const hash = window.location.hash;
     if (hash) {
       const element = document.querySelector(hash);
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
       }
     }
   };

   handleHashChange();
   window.addEventListener('hashchange', handleHashChange);
   return () => window.removeEventListener('hashchange', handleHashChange);
 }, []);

 return (
   <>
     <motion.div
       className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
       style={{ scaleX }}
     />

     <main className="relative">
       <div className="fixed inset-0 pointer-events-none">
         <div className="absolute -top-40 -right-40 w-80 h-80 
                      dark:bg-purple-600/20 bg-purple-300/20 
                      rounded-full blur-3xl"></div>
         <div className="absolute -bottom-40 -left-40 w-80 h-80 
                      dark:bg-blue-600/20 bg-blue-300/20 
                      rounded-full blur-3xl"></div>
       </div>

       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
       >
         <Hero />
       </motion.div>

       <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5 }}
       >
         <About />
       </motion.div>

       {/* Nueva sección de Skills */}
       <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5 }}
       >
         <Skills />
       </motion.div>

       <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5 }}
       >
         <Projects />
       </motion.div>

       <motion.div
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5 }}
       >
         <Contact />
       </motion.div>

       <ScrollToTop />
     </main>
   </>
 );
};

export default Home;