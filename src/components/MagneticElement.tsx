import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  className = '',
  strength = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPos({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
