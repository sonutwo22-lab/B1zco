import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CinematicTextRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export const CinematicTextReveal: React.FC<CinematicTextRevealProps> = ({
  text,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, damping: 20, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateZ: 5,
      filter: 'blur(10px)',
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em] block pb-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
