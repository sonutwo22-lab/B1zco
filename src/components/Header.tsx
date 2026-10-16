import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

interface HeaderProps {
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0 }}
      className="fixed top-0 w-full p-6 md:p-12 flex justify-between items-center z-[100] pointer-events-none mix-blend-difference text-white"
    >
      <div className="pointer-events-auto cursor-pointer" data-cursor="hover">
        <MagneticElement strength={0.2}>
          <Link to="/" aria-label="Bizco Agency Home">
            <img
              src="https://bizco.in/wp-content/uploads/2026/05/Bizco-scaled.webp"
              alt="Bizco Logo"
              className="h-6 md:h-8 w-auto brightness-0 invert"
            />
          </Link>
        </MagneticElement>
      </div>

      <div className="pointer-events-auto">
        <MagneticElement strength={0.3}>
          <button
            onClick={onOpenMenu}
            className="flex items-center gap-3 uppercase font-mono text-[10px] tracking-[0.2em] hover:opacity-70 transition-opacity group cursor-pointer"
            aria-label="Open navigation menu"
          >
            <span className="text-white">Menu</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
              <Menu size={14} />
            </div>
          </button>
        </MagneticElement>
      </div>
    </motion.header>
  );
};
