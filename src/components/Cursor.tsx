import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useVelocity, AnimatePresence } from 'framer-motion';

export const AdvancedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view' | 'drag' | 'text'>('default');

  const mouse = {
    x: useSpring(0, { damping: 20, stiffness: 300, mass: 0.5 }),
    y: useSpring(0, { damping: 20, stiffness: 300, mass: 0.5 }),
  };

  const smoothMouse = {
    x: useSpring(0, { damping: 30, stiffness: 150, mass: 0.8 }),
    y: useSpring(0, { damping: 30, stiffness: 150, mass: 0.8 }),
  };

  const velocityX = useVelocity(mouse.x);
  const velocityY = useVelocity(mouse.y);
  const scaleX = useTransform(velocityX, [-1000, 1000], [1.5, 0.5]);
  const scaleY = useTransform(velocityY, [-1000, 1000], [1.5, 0.5]);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
      smoothMouse.x.set(e.clientX);
      smoothMouse.y.set(e.clientY);
    };

    const manageMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewEl = target.closest('[data-cursor="view"]');
      const dragEl = target.closest('[data-cursor="drag"]');
      const inputEl = target.closest('input, textarea, select');
      const clickEl = target.closest('button, a, .cursor-pointer, [role="button"]');

      if (viewEl) {
        setCursorType('view');
        setCursorText(viewEl.getAttribute('data-cursor-text') || 'VIEW');
        setIsHovered(true);
      } else if (dragEl) {
        setCursorType('drag');
        setCursorText('DRAG');
        setIsHovered(true);
      } else if (inputEl) {
        setCursorType('text');
        setIsHovered(true);
      } else if (clickEl) {
        setCursorType('hover');
        setIsHovered(true);
      } else {
        setCursorType('default');
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', manageMouseMove);
    window.addEventListener('mouseover', manageMouseOver);

    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      window.removeEventListener('mouseover', manageMouseOver);
    };
  }, []);

  const getCursorWidth = () => {
    if (!isHovered) return 32;
    if (cursorType === 'text') return 4;
    if (cursorType === 'hover') return 64;
    return 96;
  };

  const getCursorHeight = () => {
    if (!isHovered) return 32;
    if (cursorType === 'text') return 32;
    if (cursorType === 'hover') return 64;
    return 96;
  };

  const getCursorOffset = () => {
    if (!isHovered) return { x: -16, y: -16 };
    if (cursorType === 'text') return { x: -2, y: -16 };
    if (cursorType === 'hover') return { x: -32, y: -32 };
    return { x: -48, y: -48 };
  };

  const offset = getCursorOffset();

  return (
    <div className="hidden md:block pointer-events-none">
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full border border-white/40 pointer-events-none z-[10000] flex items-center justify-center overflow-hidden backdrop-blur-sm"
        style={{
          x: useTransform(smoothMouse.x, (x) => x + offset.x),
          y: useTransform(smoothMouse.y, (y) => y + offset.y),
          scaleX: isHovered && cursorType !== 'text' ? 1 : scaleX,
          scaleY: isHovered && cursorType !== 'text' ? 1 : scaleY,
        }}
        animate={{
          width: getCursorWidth(),
          height: getCursorHeight(),
          borderRadius: cursorType === 'text' ? '2px' : '50%',
          backgroundColor: isHovered
            ? cursorType === 'text'
              ? 'rgba(244, 240, 234, 0.5)'
              : 'rgba(244, 240, 234, 1)'
            : 'transparent',
          mixBlendMode: isHovered ? 'difference' : 'normal',
          borderWidth: cursorType === 'text' ? '0px' : '1px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {isHovered && (cursorType === 'view' || cursorType === 'drag') && (
            <motion.span
              key="cursor-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#050B14] uppercase whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: useTransform(mouse.x, (x) => x - 3),
          y: useTransform(mouse.y, (y) => y - 3),
        }}
        animate={{ opacity: isHovered ? 0 : 1 }}
      />
    </div>
  );
};
