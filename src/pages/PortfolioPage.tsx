import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { MagneticElement } from '../components/MagneticElement';
import { WebGLBackground } from '../components/WebGLBackground';
import { Footer } from '../components/Footer';
import { PortfolioItem } from '../types';

const ASSETS = {
  brave_logo:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/24baee79d1b281fb6409a7fa9ec25d86dc86dea01b266ae90625a6c9323967fa.webp',
  brave_poster_1:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot.webp',
  brave_poster_2:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot-1.webp',

  uki_logo:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/images.webp',
  uki_food:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot-2.webp',
  uki_drink:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot-3.webp',

  gehna_logo:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/ef4f5425903423.55474fd31596a.webp',
  gehna_bridal:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot-6.webp',

  label_logo:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/images-1.webp',
  label_poster:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot-7.webp',

  livlife_logo:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot-8.webp',
  livlife_ad:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/Screenshot-9.webp',

  hamstech_logo:
    'https://darksalmon-cat-492810.hostingersite.com/wp-content/uploads/2026/05/unnamed.webp',
};

const EASE = [0.16, 1, 0.3, 1] as const;

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'brave',
    client: 'Brave India',
    category: 'Sports / MMA',
    tagline: 'India get ready for new gods.',
    meta: '#INDIAISBRAVE',
    description:
      'The worlds fastest growing MMA federation. Campaign direction and visual execution.',
    layout: 'collage',
    mainImg: ASSETS.brave_poster_1,
    subImg: ASSETS.brave_poster_2,
    logo: ASSETS.brave_logo,
  },
  {
    id: 'uki',
    client: 'United Kitchens of India',
    category: 'F&B / Hospitality',
    tagline: 'Liquid Happiness.',
    meta: 'MURGH ANGAAR / MOJITO TAIL',
    description:
      'From the kitchens of India. Visual identity, menu design, and social campaigns.',
    layout: 'split',
    mainImg: ASSETS.uki_food,
    subImg: ASSETS.uki_drink,
    logo: ASSETS.uki_logo,
  },
  {
    id: 'gehna',
    client: 'Gehna',
    category: 'Jewellery / Bridal',
    tagline: 'And she found her happily ever after.',
    meta: 'PURE WEDDING VOWS',
    description:
      'A party, dress like it. High-end bridal collection campaign aesthetics.',
    layout: 'single',
    mainImg: ASSETS.gehna_bridal,
    logo: ASSETS.gehna_logo,
  },
  {
    id: 'label',
    client: 'The Label.com',
    category: 'Fashion / E-commerce',
    tagline: 'Guilt-Free Shopping.',
    meta: '136 DESIGNERS. 25 COLLECTIONS. 1 SHOW.',
    description:
      'Designer wear made accessible. Branding and event launch campaign.',
    layout: 'collage',
    mainImg: ASSETS.label_poster,
    subImg: ASSETS.hamstech_logo,
    logo: ASSETS.label_logo,
  },
  {
    id: 'livlife',
    client: 'LivLife Hospitals',
    category: 'Healthcare / Medical',
    tagline: 'In pursuit of good health.',
    meta: 'CUT YOUR RISK HERE.',
    description:
      'Medical campaign focused on trust, risk reduction, and proactive health.',
    layout: 'single',
    mainImg: ASSETS.livlife_ad,
    logo: ASSETS.livlife_logo,
  },
];

const PortfolioHero: React.FC = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleText = useTransform(scrollY, [0, 600], [1, 0.9]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smX = useSpring(mouseX, springConfig);
  const smY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth - 0.5) * 2);
    mouseY.set((e.clientY / innerHeight - 0.5) * 2);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050B14] pt-20"
    >
      {/* Background Interactive Gallery */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Left Image */}
        <motion.div
          style={{
            x: useTransform(smX, [-1, 1], [40, -40]),
            y: useTransform(smY, [-1, 1], [40, -40]),
          }}
          className="absolute top-[10%] left-[5%] md:left-[10%] w-[40vw] md:w-[18vw] aspect-[4/5] rounded-xl overflow-hidden opacity-30 md:opacity-40 grayscale blur-[2px] md:blur-sm transition-all duration-700"
        >
          <img
            src={ASSETS.gehna_bridal}
            alt=""
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Bottom Right Image */}
        <motion.div
          style={{
            x: useTransform(smX, [-1, 1], [-60, 60]),
            y: useTransform(smY, [-1, 1], [-60, 60]),
          }}
          className="absolute bottom-[5%] right-[5%] md:right-[10%] w-[50vw] md:w-[22vw] aspect-[3/2] rounded-xl overflow-hidden opacity-20 md:opacity-30 grayscale blur-[4px] md:blur-md transition-all duration-700"
        >
          <img
            src={ASSETS.uki_food}
            alt=""
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Center Right Image */}
        <motion.div
          style={{
            x: useTransform(smX, [-1, 1], [-30, 30]),
            y: useTransform(smY, [-1, 1], [30, -30]),
          }}
          className="absolute top-[30%] -right-[10%] md:right-[5%] w-[35vw] md:w-[15vw] aspect-[3/4] rounded-xl overflow-hidden opacity-40 grayscale blur-[1px] transition-all duration-700 hidden md:block"
        >
          <img
            src={ASSETS.brave_poster_1}
            alt=""
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Bottom Left Image */}
        <motion.div
          style={{
            x: useTransform(smX, [-1, 1], [50, -50]),
            y: useTransform(smY, [-1, 1], [-50, 50]),
          }}
          className="absolute bottom-[15%] left-[2%] md:left-[8%] w-[30vw] md:w-[14vw] aspect-square rounded-xl overflow-hidden opacity-25 grayscale blur-[3px] transition-all duration-700 hidden md:block"
        >
          <img
            src={ASSETS.label_poster}
            alt=""
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>
      </div>

      {/* Hero Typography */}
      <motion.div
        style={{ y: yText, opacity: opacityText, scale: scaleText }}
        className="relative z-10 flex flex-col items-center pointer-events-none px-4 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#3A5A80] mb-6 md:mb-10 flex items-center gap-4"
        >
          <span className="w-8 md:w-16 h-[1px] bg-[#3A5A80]" />
          The Bizco Archive
          <span className="w-8 md:w-16 h-[1px] bg-[#3A5A80]" />
        </motion.div>

        <h1 className="font-serif text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter text-[#F4F0EA] text-center w-full flex flex-col items-center mix-blend-difference select-none">
          <span className="block overflow-hidden w-full pb-2 md:pb-4">
            <motion.span
              initial={{ y: '100%', rotateZ: 5 }}
              animate={{ y: 0, rotateZ: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
              className="block origin-bottom-left"
            >
              DESIGNED
            </motion.span>
          </span>
          <span className="block overflow-hidden w-full">
            <motion.span
              initial={{ y: '100%', rotateZ: -5 }}
              animate={{ y: 0, rotateZ: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
              className="block italic text-transparent font-light origin-bottom-right"
              style={{ WebkitTextStroke: '1px rgba(244,240,234,0.7)' }}
            >
              TO SCALE.
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 z-20 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F4F0EA]">
          Explore Works
        </span>
        <div className="w-[1px] h-12 md:h-16 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

interface ProjectCardProps {
  project: PortfolioItem;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const isEven = index % 2 === 0;
  const yMain = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const ySub = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`relative py-32 md:py-48 flex flex-col gap-12 ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } items-center`}
    >
      {/* Text Details */}
      <div className="w-full lg:w-1/3 flex flex-col relative z-20">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#3A5A80] mb-6 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#3A5A80]" />{' '}
          {String(index + 1).padStart(2, '0')} — {project.category}
        </div>

        {project.logo && (
          <div className="mb-8 w-32 h-32 relative mix-blend-difference overflow-hidden rounded-lg opacity-80">
            <img
              src={project.logo}
              alt={`${project.client} Logo`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h3 className="font-serif text-5xl md:text-7xl leading-none mb-6 tracking-tighter text-[#F4F0EA]">
          {project.client}
        </h3>

        <p className="font-serif text-2xl italic opacity-80 mb-6 border-l-2 border-white/20 pl-4 text-[#F4F0EA]">
          {project.tagline}
        </p>

        <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-8 max-w-sm leading-relaxed text-[#F4F0EA]">
          {project.meta} <br />
          <br />
          <span className="normal-case opacity-80">{project.description}</span>
        </p>

        <MagneticElement strength={0.2} className="self-start">
          <button
            className="uppercase font-mono text-[10px] tracking-[0.2em] border-b border-white/30 pb-1 hover:text-[#3A5A80] hover:border-[#3A5A80] transition-colors cursor-pointer text-[#F4F0EA]"
            data-cursor="view"
            data-cursor-text="CASE STUDY"
          >
            Explore Case Study
          </button>
        </MagneticElement>
      </div>

      {/* Image Composition */}
      <div
        className="w-full lg:w-2/3 relative h-[60vh] md:h-[80vh] group perspective-[1000px]"
        data-cursor="view"
        data-cursor-text="ARCHIVE"
      >
        {project.layout === 'single' && (
          <motion.div
            style={{ y: yMain }}
            className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
            <img
              src={project.mainImg}
              alt={project.client}
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            />
          </motion.div>
        )}

        {project.layout === 'collage' && (
          <>
            <motion.div
              style={{ y: yMain }}
              className="w-[85%] h-[90%] absolute top-0 right-0 rounded-xl overflow-hidden shadow-2xl z-10"
            >
              <div className="absolute inset-0 bg-[#050B14]/40 z-10 group-hover:bg-transparent transition-colors duration-700" />
              <img
                src={project.mainImg}
                alt={project.client}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
            </motion.div>
            {project.subImg && (
              <motion.div
                style={{ y: ySub }}
                className="w-[45%] h-[55%] absolute bottom-0 left-0 rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-20 border border-white/10"
              >
                <img
                  src={project.subImg}
                  alt={`${project.client} Detail`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            )}
          </>
        )}

        {project.layout === 'split' && (
          <div className="w-full h-full flex gap-4 md:gap-8 relative">
            {project.subImg && (
              <motion.div
                style={{ y: ySub }}
                className="w-1/2 h-[80%] self-end rounded-xl overflow-hidden shadow-2xl z-10 border border-white/5"
              >
                <img
                  src={project.subImg}
                  alt={project.client}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            )}
            <motion.div
              style={{ y: yMain }}
              className="w-1/2 h-[90%] self-start rounded-xl overflow-hidden shadow-2xl z-10 border border-white/5"
            >
              <div className="absolute inset-0 bg-[#050B14]/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
              <img
                src={project.mainImg}
                alt={project.client}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const PortfolioPage: React.FC = () => {
  return (
    <div className="relative z-10">
      <WebGLBackground />
      <PortfolioHero />
      <section className="px-6 md:px-12 relative z-10 max-w-[1400px] mx-auto pb-40">
        <div className="border-t border-white/10 pt-12">
          {PORTFOLIO_DATA.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};
