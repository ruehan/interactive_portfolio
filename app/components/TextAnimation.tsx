import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TypingAnimation({ text, className = '' }: TypingAnimationProps) {
  return (
    <span className={`inline-block ${className}`}>
      {text}
      <span className="border-r-2 border-blue-500 animate-pulse">&nbsp;</span>
    </span>
  );
}

interface MultiLanguageTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function MultiLanguageText({ texts, interval = 3000, className = '' }: MultiLanguageTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % texts.length);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, texts.length]);

  return (
    <div className="relative h-[1.5em]">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`absolute ${className}`}
      >
        {texts[currentIndex]}
      </motion.div>
    </div>
  );
}

interface RotatingImageProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

export function RotatingProfileImage({ imageSrc, alt, className = '' }: RotatingImageProps) {
  return (
    <div className={`perspective-800 ${className}`}>
      <motion.div
        className="w-full h-full"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0, -15, 0],
        }}
        transition={{
          rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover rounded-full shadow-lg" />
      </motion.div>
    </div>
  );
}
