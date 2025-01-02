import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const WalkingStickman = ({ isWalking, onComplete, direction = 'right', startX, endX }) => {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      initial={{ x: startX }}
      animate={{ x: endX }}
      onAnimationComplete={onComplete}
      transition={{ duration: 2, ease: "linear" }}
      className="absolute bottom-0 text-black dark:text-white"
      style={{ 
        transformOrigin: 'center',
        transform: `scaleX(${direction === 'left' ? -1 : 1})`
      }}
    >
      <motion.g
        animate={isWalking ? {
          y: [-1, 1, -1],
          rotate: [-5, 5, -5]
        } : {}}
        transition={{ repeat: Infinity, duration: 0.6 }}
      >
        {/* Cabeza */}
        <circle cx="12" cy="8" r="3.5" fill="currentColor" />
        {/* Cuerpo */}
        <motion.line
          x1="12"
          y1="11"
          x2="12"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Piernas */}
        <motion.g
          animate={isWalking ? {
            rotate: [-20, 20, -20]
          } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          <line
            x1="12"
            y1="18"
            x2="10"
            y2="22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="18"
            x2="14"
            y2="22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
        {/* Brazos */}
        <motion.g
          animate={isWalking ? {
            rotate: [20, -20, 20]
          } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          <line
            x1="12"
            y1="14"
            x2="9"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="14"
            x2="15"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animation, setAnimation] = useState('idle');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector('nav');
    const hero = document.querySelector('#hero, .hero, header, [role="banner"]');
    if (hero && navbar) {
      setHeroHeight(hero.offsetHeight + navbar.offsetHeight);
    } else {
      setHeroHeight(window.innerHeight * 0.4);
    }
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setIsVisible(winScroll > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleElevatorReached = () => {
    setAnimation('entering');

    const sequence = [
      { state: 'ascending', delay: 1000 },
      { state: 'arrived', delay: 3000 },
      { state: 'exiting', delay: 1000 },
      { state: 'walkingAway', delay: 1500 },
      { state: 'idle', delay: 4000 }
    ];

    let timeoutSum = 0;
    sequence.forEach(({ state, delay }) => {
      timeoutSum += delay;
      setTimeout(() => {
        setAnimation(state);
        if (state === 'ascending') {
          window.scrollTo({
            top: heroHeight,
            behavior: 'smooth'
          });
        }
      }, timeoutSum);
    });
  };

  const startAnimation = () => {
    if (animation === 'idle') {
      setAnimation('walking');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-8 bottom-8 z-50 flex flex-col items-center">
          <AnimatePresence>
            {animation !== 'idle' && (
              <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '100vh' }}
                  className="absolute right-10 bottom-24 w-32 z-50"
                >
                  <div className="absolute left-12 h-full w-0.5 bg-purple-200 dark:bg-purple-700" />
                  <div className="absolute right-12 h-full w-0.5 bg-purple-200 dark:bg-purple-700" />
                  
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500" />
                  
                  {animation === 'walking' && (
                    <WalkingStickman 
                      isWalking={true}
                      onComplete={handleElevatorReached}
                      direction="right"
                      startX={-100}
                      endX={0}
                    />
                  )}
                  
                  {(animation === 'entering' || animation === 'ascending' || animation === 'arrived' || animation === 'exiting') && (
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ 
                        y: animation === 'ascending' ? `-${heroHeight}px` : 0
                      }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="relative w-14 h-16 bg-purple-500 rounded-t-lg flex items-center justify-center">
                        {animation !== 'exiting' && (
                          <motion.svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="text-white"
                          >
                            <circle cx="12" cy="8" r="3.5" fill="currentColor" />
                            <line x1="12" y1="11" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="12" y1="18" x2="10" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="12" y1="18" x2="14" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="12" y1="14" x2="9" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="12" y1="14" x2="15" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </motion.svg>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {(animation === 'walkingAway' || animation === 'exiting') && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: animation === 'walkingAway' ? 0 : 1 }}
                      transition={{ duration: 1, delay: 2 }}
                      className="absolute w-14 h-16 bg-purple-500 rounded-t-lg"
                      style={{ 
                        top: `calc(${heroHeight}px - 4rem)`,
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                    />
                  )}

                  {animation === 'walkingAway' && (
                    <motion.div 
                      initial={{ 
                        x: 0,
                        y: heroHeight - 64
                      }}
                      animate={{
                        x: [-20, -300],
                        y: [heroHeight - 64, heroHeight - 64]
                      }}
                      transition={{
                        duration: 2,
                        times: [0, 1],
                        ease: "linear"
                      }}
                      className="absolute right-24"
                    >
                      <WalkingStickman 
                        isWalking={true}
                        direction="left"
                        startX={0}
                        endX={0}
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="relative"
          >
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="fill-none stroke-purple-200 dark:stroke-purple-900"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                className="fill-none stroke-purple-600"
                strokeWidth="4"
                strokeDasharray={175}
                strokeDashoffset={175 - (175 * scrollProgress) / 100}
                strokeLinecap="round"
              />
            </svg>
            
            <motion.button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         bg-purple-600 dark:bg-purple-600 text-white
                         p-3 rounded-full shadow-lg 
                         hover:bg-purple-700 dark:hover:bg-purple-700
                         transition-colors duration-300"
              onClick={startAnimation}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Volver arriba"
              disabled={animation !== 'idle'}
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;