import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MagneticElement } from './MagneticElement';

interface FooterProps {
  statusText?: string;
  tagline?: string;
  headline?: React.ReactNode;
  showInitiateButton?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  statusText = 'Bizco Live',
  tagline = "Let's Build Something That Lasts",
  headline = 'INITIATE',
  showInitiateButton = true,
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section
      ref={ref}
      className="relative h-screen bg-[#F4F0EA] text-[#050B14] overflow-hidden z-30"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 h-full bg-[#F4F0EA]"
      >
        {/* Top Header */}
        <div className="w-full flex justify-between items-start pt-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#050B14] rounded-full animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
              {statusText}
            </span>
          </div>
          <div className="text-right">
            <p className="uppercase tracking-widest text-[10px] font-mono mb-2 opacity-50">
              HQ Location
            </p>
            <p className="font-serif text-xl italic leading-tight">
              Banjara Hills,<br />
              Hyderabad, Telangana, India
            </p>
          </div>
        </div>

        {/* Center Headline & Magnetic Action */}
        <div className="text-center relative z-10 w-full flex flex-col items-center justify-center flex-1">
          <p className="font-mono text-sm tracking-widest uppercase mb-6 opacity-60">
            {tagline}
          </p>
          <h2 className="font-serif text-[14vw] leading-none tracking-tighter hover:italic transition-all duration-700 cursor-default select-none">
            {headline}
          </h2>

          {showInitiateButton && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none mt-4">
              <MagneticElement strength={0.6}>
                <Link
                  to="/contact"
                  className="pointer-events-auto relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#050B14] text-[#F4F0EA] flex items-center justify-center group overflow-hidden shadow-2xl"
                  data-cursor="hover"
                >
                  <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] group-hover:scale-110 transition-transform duration-500 flex flex-col items-center gap-2">
                    <ArrowRight
                      size={16}
                      className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"
                    />
                    Let's Talk
                  </span>
                  <div className="absolute inset-0 bg-[#3A5A80] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-[0.16,1,0.3,1] origin-center" />
                </Link>
              </MagneticElement>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest opacity-60 border-t border-black/10 pt-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
            <p>© {new Date().getFullYear()} BIZCO AGENCY</p>
            <span className="hidden md:block opacity-30">|</span>
            <p>
              Built & Managed by tech partner{' '}
              <a
                href="https://scalora.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3A5A80] transition-colors font-bold underline decoration-black/20 underline-offset-4"
              >
                Scalora.in
              </a>
            </p>
          </div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a
              href="https://www.instagram.com/bizco.official"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3A5A80] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#3A5A80] hover:after:w-full after:transition-all after:duration-300"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-[#3A5A80] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#3A5A80] hover:after:w-full after:transition-all after:duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
