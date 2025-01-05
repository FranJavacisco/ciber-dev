import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';

const CustomCaptcha = ({ onVerify }) => {
  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState(null);

  // Generate random pattern
  const generatePattern = useCallback(() => {
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['red', 'blue', 'green', 'purple'];
    const sizes = ['small', 'medium', 'large'];

    const newPatterns = Array(6).fill(null).map(() => ({
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      id: Math.random().toString(36).substr(2, 9)
    }));

    // Ensure at least two patterns are similar
    const targetPattern = newPatterns[0];
    newPatterns[1] = { ...targetPattern, id: Math.random().toString(36).substr(2, 9) };
    
    // Shuffle the array
    return newPatterns.sort(() => Math.random() - 0.5);
  }, []);

  const resetCaptcha = useCallback(() => {
    if (isLocked) return;
    setPatterns(generatePattern());
    setSelectedPattern(null);
    setIsVerified(false);
  }, [generatePattern, isLocked]);

  useEffect(() => {
    resetCaptcha();
  }, [resetCaptcha]);

  // Check lockout status
  useEffect(() => {
    if (lockoutEndTime) {
      const interval = setInterval(() => {
        if (new Date() >= new Date(lockoutEndTime)) {
          setIsLocked(false);
          setLockoutEndTime(null);
          setAttempts(0);
          resetCaptcha();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutEndTime, resetCaptcha]);

  const handlePatternSelect = (pattern) => {
    if (isLocked || isVerified) return;

    setSelectedPattern(pattern);
    
    // Check if there's another pattern with the same properties
    const matches = patterns.filter(p => 
      p.shape === pattern.shape && 
      p.color === pattern.color && 
      p.size === pattern.size &&
      p.id !== pattern.id
    );

    if (matches.length > 0) {
      setIsVerified(true);
      onVerify(true);
    } else {
      setAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockoutEndTime(new Date(Date.now() + 30000)); // 30 second lockout
        }
        return newAttempts;
      });
      resetCaptcha();
    }
  };

  const renderShape = (pattern) => {
    const sizeMap = {
      small: 'w-6 h-6',
      medium: 'w-8 h-8',
      large: 'w-10 h-10'
    };

    const baseClass = `${sizeMap[pattern.size]} transition-all duration-300`;

    switch (pattern.shape) {
      case 'circle':
        return <div className={`${baseClass} rounded-full`} style={{ backgroundColor: pattern.color }} />;
      case 'square':
        return <div className={`${baseClass}`} style={{ backgroundColor: pattern.color }} />;
      case 'triangle':
        return (
          <div
            className={baseClass}
            style={{
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${parseInt(sizeMap[pattern.size]) / 2}px solid transparent`,
              borderRight: `${parseInt(sizeMap[pattern.size]) / 2}px solid transparent`,
              borderBottom: `${parseInt(sizeMap[pattern.size])}px solid ${pattern.color}`
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 rounded-lg dark:bg-blue-900/30 bg-white/80 backdrop-blur-sm border dark:border-blue-800/50 border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium dark:text-gray-300 text-gray-700">
          {isLocked 
            ? `Locked for ${Math.ceil((new Date(lockoutEndTime) - new Date()) / 1000)}s` 
            : 'Select matching patterns'}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetCaptcha}
          disabled={isLocked || isVerified}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-blue-800/50 disabled:opacity-50"
        >
          <Shuffle className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {patterns.map((pattern) => (
          <motion.button
            key={pattern.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePatternSelect(pattern)}
            disabled={isLocked || isVerified}
            className={`p-4 rounded-lg flex items-center justify-center
              ${isVerified ? 'cursor-default' : 'cursor-pointer'}
              ${selectedPattern?.id === pattern.id ? 'ring-2 ring-purple-500' : ''}
              hover:bg-gray-50 dark:hover:bg-blue-800/50 disabled:opacity-50`}
          >
            {renderShape(pattern)}
          </motion.button>
        ))}
      </div>

      {isVerified && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-2 text-center text-sm text-green-500 bg-green-500/20 rounded-lg"
        >
          Verification successful!
        </motion.div>
      )}
    </div>
  );
};

export default CustomCaptcha;