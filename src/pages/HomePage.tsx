import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { Play, X } from 'lucide-react';
import { CinematicTextReveal } from '../components/CinematicTextReveal';

const ASSETS = {
  logoMain: 'https://bizco.in/wp-content/uploads/2026/05/Bizco-scaled.webp',
  stairs: 'https://bizco.in/wp-content/uploads/2026/04/blue_stairs.webp',
  grid: 'https://bizco.in/wp-content/uploads/2026/04/blue_Grid.webp',
  flow1: 'https://bizco.in/wp-content/uploads/2026/04/Blue_flow1.webp',
  flow2: 'https://bizco.in/wp-content/uploads/2026/04/Blue_flow2.webp',
  case1:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
  case2:
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600',
  case3:
    'https://bizco.in/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-00.57.20.jpeg',
};

const EASE = [0.16, 1, 0.3, 1] as const;

const BRANDS = [
  {
    src: 'https://bizco.in/wp-content/uploads/2026/06/gehna-logo-1024.webp',
    invert: true,
  },
  {
    src: 'https://bizco.in/wp-content/uploads/2026/06/hamstech-logo.webp',
    invert: false,
  },
  {
    src: 'https://bizco.in/wp-content/uploads/2026/06/logo-mtv-1.webp',
    invert: true,
  },
  {
    src: 'https://bizco.in/wp-content/uploads/2026/06/logo-02.webp',
    invert: false,
  },
  {
    src: 'https://bizco.in/wp-content/uploads/2026/06/images-Photoroom.webp',
    invert: true,
  },
  {
    src: 'https://bizco.in/wp-content/uploads/2026/06/b-blunt_owler_20170706_201317_original-Photoroom.webp',
    invert: true,
  },
  {
    src: 'https://bizco.in/wp-content/uploads/2026/06/Scalora-logo-Photoroom.png',
    invert: false,
  },
];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 2;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{
        clipPath: 'inset(0% 0% 100% 0%)',
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
      }}
      className="fixed inset-0 z-[99999] bg-[#050B14] text-[#F4F0EA] flex flex-col justify-center p-6 md:p-12"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <img
              src={ASSETS.logoMain}
              alt="Bizco Logo"
              className="h-10 md:h-14 w-auto brightness-0 invert mb-6"
            />
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="font-serif text-2xl md:text-3xl italic opacity-80 tracking-wide text-center"
          >
            We Mind Your Business.
          </motion.p>
        </div>
        <div className="w-full flex items-center gap-4">
          <span className="font-mono text-xs w-12 text-right">
            {Math.min(progress, 100)}%
          </span>
          <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFinished, setIsFinished] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.95]);
  const scrollBlur = useTransform(scrollY, [0, 600], [0, 10]);

  useEffect(() => {
    let isMounted = true;
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.warn('Autoplay caught:', e));
    }
    const timer = setTimeout(() => {
      if (isMounted) setIsFinished(true);
    }, 12000);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.section
      style={{
        opacity,
        scale,
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
      className="relative w-screen h-screen overflow-hidden flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 z-10"
    >
      {/* Background Video - Edge-to-Edge 100% full screen cover */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block overflow-hidden"
        animate={{
          filter: isFinished ? 'blur(20px)' : 'blur(0px)',
          opacity: isFinished ? 0.35 : 0.8,
        }}
        transition={{ duration: 2, ease: EASE }}
      >
        <video
          ref={videoRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          className="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none"
          autoPlay
          muted
          playsInline
          onEnded={() => setIsFinished(true)}
          src="https://bizco.in/wp-content/uploads/2026/05/IMG_9498.webm"
        />
      </motion.div>

      {/* Hero Typography & Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-12">
        <motion.div
          className="max-w-5xl"
          style={{
            filter: useTransform(scrollBlur, (blur) => `blur(${blur}px)`),
          }}
        >
          <div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1, ease: EASE }}
              className="h-[1px] w-24 bg-white/30 mb-8 origin-left"
            />
            <h2 className="font-serif text-[3.5rem] md:text-[6.5rem] leading-[0.85] tracking-tight text-[#F4F0EA]">
              <span className="block overflow-hidden pb-4">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                  className="block"
                >
                  We Mind
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                  className="block flex items-center gap-4 md:gap-8"
                >
                  <span
                    className="italic text-transparent"
                    style={{
                      WebkitTextStroke: '1.5px rgba(244, 240, 234, 0.8)',
                    }}
                  >
                    Your Business.
                  </span>
                </motion.span>
              </span>
            </h2>
          </div>
        </motion.div>
        <div className="max-w-sm mb-4 md:mb-8 flex flex-col items-start md:items-end text-left md:text-right">
          <CinematicTextReveal
            text="We build brands that earn attention, retain trust, and compound over time."
            delay={0.8}
            className="text-sm md:text-base font-light opacity-80 leading-relaxed justify-start md:justify-end"
          />
        </div>
      </div>
    </motion.section>
  );
};

const ManifestoSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const text =
    "The market isn't suffering from a lack of brands. It's suffering from a lack of meaning. Every day, thousands of messages compete for the same attention. Most disappear. A few become remembered.";
  const words = text.split(' ');

  return (
    <section
      ref={containerRef}
      className="py-40 px-6 md:px-32 bg-[#050B14] relative overflow-hidden flex items-center min-h-[120vh] z-10"
    >
      <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 flex items-center gap-4 text-[#F4F0EA]">
          <span className="w-8 h-[1px] bg-white/40" /> Thesis 001
        </div>
        <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.2] tracking-tight text-[#F4F0EA]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <motion.span
                key={i}
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [start * 0.8, end * 0.8],
                    [0.1, 1]
                  ),
                  filter: useTransform(
                    scrollYProgress,
                    [start * 0.8, end * 0.8],
                    ['blur(10px)', 'blur(0px)']
                  ),
                }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            );
          })}
        </h3>
      </motion.div>
    </section>
  );
};

const TheTruthSection: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={targetRef}
      className="py-32 md:py-48 px-6 md:px-12 bg-[#F4F0EA] relative overflow-hidden rounded-t-[2rem] md:rounded-t-[4rem] -mt-12 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#050B14] opacity-50 mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#050B14]/40" /> Our Philosophy
        </div>
        <div className="relative flex items-center justify-center py-12 md:py-24">
          <motion.h2
            style={{ y: y1 }}
            className="font-serif text-[22vw] md:text-[14vw] leading-[0.85] tracking-tighter relative z-10 text-[#050B14] text-center w-full whitespace-nowrap pointer-events-none select-none"
          >
            BEYOND <br />
            <span className="italic">THE NOISE.</span>
          </motion.h2>
        </div>
        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 items-center">
          <div className="md:col-span-6 text-[#050B14]">
            <h3 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
              Your business doesn't need more content. <br />
              <span className="italic text-[#3A5A80]">It needs clarity.</span>
            </h3>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <motion.div
              style={{ y: imageY }}
              className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <img
                src={ASSETS.case3}
                alt="Philosophy"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BrandMarquee: React.FC = () => {
  const duplicatedBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <section className="pt-24 pb-12 bg-[#050B14] relative z-20 overflow-hidden">
      <div className="mb-12 font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 flex items-center gap-4 px-6 md:px-12 text-[#F4F0EA]">
        <span className="w-8 h-[1px] bg-white/40" /> Our Partners
      </div>
      <div className="relative w-full flex items-center py-8">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#050B14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#050B14] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track gap-16 md:gap-32">
          {duplicatedBrands.map((brand, i) => (
            <img
              key={i}
              src={brand.src}
              alt={`Brand Partner ${i}`}
              className={`h-8 md:h-12 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-pointer ${
                brand.invert ? 'brightness-0 invert' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardData {
  title: string;
  sub: string;
  img: string;
  desc: string;
}

const StickyServices: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const services: ServiceCardData[] = [
    {
      title: 'Branding & Identity',
      sub: 'Cognitive Anchoring',
      img: 'https://bizco.in/wp-content/uploads/2026/05/ChatGPT-10.webp',
      desc: 'We design highly memorable visual and verbal identity setups from logos that carry deep meaning to comprehensive collateral assets that reliably build brand affinity.',
    },
    {
      title: 'Marketing & Strategy',
      sub: 'Market Positioning',
      img: 'https://bizco.in/wp-content/uploads/2026/05/ChatGPT-8.webp',
      desc: 'Formulating calculated high-performance marketing models and intentional campaign frameworks that provide unambiguous direction to maximize real conversion paths.',
    },
    {
      title: 'Growth & Visibility',
      sub: 'Performance Mechanics',
      img: 'https://bizco.in/wp-content/uploads/2026/05/ChatGPT-7.webp',
      desc: 'Architecting predictable acquisition structures, stopping social ecosystems, and engineering unified corporate deployment spaces built to move project parameters reliably.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050B14] pb-[10vh] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]"
    >
      <div className="pt-32 pb-16 px-6 md:px-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-6 flex items-center gap-4 text-[#F4F0EA]">
          <span className="w-8 h-[1px] bg-white/40" /> 02. Capabilities
        </div>
        <CinematicTextReveal
          text="What We Bring To The Table."
          className="font-serif text-6xl md:text-8xl text-[#F4F0EA]"
        />
      </div>
      <div className="relative mt-12">
        {services.map((svc, i) => {
          const targetScale = 1 - (services.length - 1 - i) * 0.04;
          const scale = useTransform(
            scrollYProgress,
            [i / services.length, 1],
            [1, targetScale]
          );
          const cardRef = useRef<HTMLDivElement>(null);
          const [rotateX, setRotateX] = useState(0);
          const [rotateY, setRotateY] = useState(0);

          const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            setRotateX(
              -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 4
            );
            setRotateY(
              ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4
            );
          };

          return (
            <div
              key={i}
              className="h-screen sticky top-0 flex items-center justify-center p-6 md:p-12 perspective-[2000px]"
            >
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  setRotateX(0);
                  setRotateY(0);
                }}
                style={{
                  scale,
                  top: `calc(${i * 20}px)`,
                  rotateX: useSpring(rotateX, { stiffness: 150, damping: 20 }),
                  rotateY: useSpring(rotateY, { stiffness: 150, damping: 20 }),
                }}
                className="w-full max-w-6xl h-[75vh] bg-[#1a2639] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl origin-top border border-white/10 relative will-change-transform"
              >
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between h-full relative z-10 bg-[#1a2639]">
                  <div>
                    <h3 className="font-serif text-4xl md:text-6xl leading-none text-white">
                      {svc.title}
                    </h3>
                  </div>
                  <p className="text-base font-light leading-relaxed max-w-md opacity-90 mt-8 md:mt-0 text-white">
                    {svc.desc}
                  </p>
                </div>
                <div className="w-full md:w-1/2 h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#3A5A80]/20 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
                  <motion.img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                </div>
                <motion.div
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [i / services.length, 1],
                      [0, 0.6]
                    ),
                  }}
                  className="absolute inset-0 bg-black pointer-events-none z-30"
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const WorkSection: React.FC = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#050B14] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 mb-16 flex items-center gap-4 text-white">
          <span className="w-8 h-[1px] bg-white/40" /> 03. Execution
        </div>

        <img
          src="https://bizco.in/wp-content/uploads/2026/05/Market.webp"
          alt="Market Desktop"
          className="w-full max-w-5xl rounded-2xl shadow-2xl hidden lg:block"
        />

        <img
          src="https://bizco.in/wp-content/uploads/2026/06/11.webp"
          alt="Market Mobile"
          className="w-full max-w-5xl rounded-2xl shadow-2xl block lg:hidden"
        />
      </div>
    </section>
  );
};

const HomeFooter: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
    }
  };

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
        <div className="w-full flex justify-between items-start pt-12">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-[#050B14] rounded-full animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
              Systems Online
            </span>
          </div>
          <div className="text-right">
            <p className="uppercase tracking-widest text-[10px] font-mono mb-2 opacity-50">
              HQ Location
            </p>
            <p className="font-serif text-xl italic">Banjara Hills, Hyd</p>
          </div>
        </div>

        <div className="text-center relative z-10 w-full flex flex-col items-center justify-center flex-1">
          <AnimatePresence mode="wait">
            {!showVideo ? (
              <motion.div
                key="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center relative"
              >
                <h2 className="font-serif text-[15vw] leading-none tracking-tighter hover:italic transition-all duration-700 cursor-default select-none">
                  INITIATE
                </h2>
                <button
                  onClick={() => setShowVideo(true)}
                  className="mt-8 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#050B14] text-[#F4F0EA] flex items-center justify-center group overflow-hidden shadow-2xl cursor-pointer"
                  data-cursor="hover"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] group-hover:scale-110 transition-transform duration-500 flex flex-col items-center gap-2">
                    <Play size={16} className="ml-1" fill="currentColor" /> Start
                  </span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative w-full max-w-4xl aspect-video bg-[#050B14] overflow-hidden shadow-2xl cursor-pointer group rounded-xl"
                onClick={togglePlayPause}
              >
                <video
                  ref={videoRef}
                  src="https://bizco.in/wp-content/uploads/2026/05/IMG_9498.webm"
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideo(false);
                  }}
                  className="absolute top-4 right-4 text-white bg-black/60 p-2 rounded-full backdrop-blur-sm z-20 hover:bg-black/90 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest opacity-60 border-t border-black/10 pt-6">
          <p>© {new Date().getFullYear()} BIZCO AGENCY</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a
              href="https://www.instagram.com/bizco.official"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3A5A80] transition-colors"
            >
              Instagram
            </a>
            <a href="#" className="hover:text-[#3A5A80] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative z-10">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <HeroSection />
      <ManifestoSection />
      <TheTruthSection />
      <BrandMarquee />
      <StickyServices />
      <WorkSection />
      <HomeFooter />
    </div>
  );
};
