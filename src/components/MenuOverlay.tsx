import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { NavLinkItem } from '../types';

const MENU_LINKS: NavLinkItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Get in touch', path: '/contact' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-overlay"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          exit={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="fixed inset-0 bg-[#050B14] text-[#F4F0EA] z-[200] flex flex-col justify-center px-6 md:px-24 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-12 md:right-12 flex items-center gap-3 uppercase font-mono text-[10px] tracking-[0.2em] hover:opacity-70 transition-opacity z-20 group text-[#F4F0EA] cursor-pointer"
          >
            <span>Close</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-500">
              <X size={14} />
            </div>
          </button>

          {/* Menu links and contact details */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-12 relative z-10">
            <ul className="space-y-2 md:space-y-4">
              {MENU_LINKS.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 50, rotateZ: 5 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: EASE }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="font-serif text-5xl md:text-8xl hover:italic transition-all inline-flex items-center gap-6 group text-outline"
                  >
                    <span className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      0{i + 1}
                    </span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="max-w-xs space-y-12 font-mono text-[10px] uppercase tracking-widest"
            >
              <div>
                <p className="mb-4 font-bold text-[#3A5A80]">Terminal Access</p>
                <a
                  href="mailto:connect@bizco.in"
                  className="block hover:text-[#3A5A80] transition-colors mb-2 text-white"
                >
                  connect@bizco.in
                </a>
                <p className="opacity-60 text-white">+91 93900 37618</p>
              </div>

              <div>
                <p className="mb-4 font-bold text-[#3A5A80]">Socials</p>
                <div className="flex flex-col gap-2 opacity-60 text-white">
                  <a
                    href="https://www.instagram.com/bizco.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 hover:translate-x-2 transition-transform"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="hover:opacity-100 hover:translate-x-2 transition-transform"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
