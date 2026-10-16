/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

import { Header } from './components/Header';
import { MenuOverlay } from './components/MenuOverlay';
import { AdvancedCursor } from './components/Cursor';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ContactPage } from './pages/ContactPage';

const SmoothScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]);

  return (
    <motion.div
      style={{ skewY: skew }}
      className="origin-center will-change-transform bg-[#050B14] min-h-screen text-[#F4F0EA]"
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  return (
    <BrowserRouter>
      <div className="bg-[#050B14] text-[#F4F0EA] min-h-screen selection:bg-[#3A5A80] selection:text-white relative">
        {/* Advanced Film Grain & Scanlines */}
        <div className="noise-overlay" />
        <div className="scanlines" />

        {/* Kinematic Custom Cursor */}
        <AdvancedCursor />

        {/* Global Navigation Header & Fullscreen Menu */}
        <Header onOpenMenu={() => setMenuOpen(true)} />
        <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* Scroll restoration */}
        <ScrollToTop />

        {/* Main Content with Inertial Skew Physics */}
        <SmoothScrollWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SmoothScrollWrapper>
      </div>
    </BrowserRouter>
  );
}
