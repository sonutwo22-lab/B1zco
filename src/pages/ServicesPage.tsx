import React, { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, MessageSquare } from 'lucide-react';
import { MagneticElement } from '../components/MagneticElement';
import { CinematicTextReveal } from '../components/CinematicTextReveal';
import { Footer } from '../components/Footer';
import { ServiceItem } from '../types';

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES_DATA: ServiceItem[] = [
  {
    id: '01',
    title: 'Marketing',
    description:
      "Strategy. Campaigns. Growth direction. We don't just run ads; we engineer market-dominating narratives that position your brand ahead of the curve.",
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/1.webp',
  },
  {
    id: '02',
    title: 'Social Media',
    description:
      'Content that stops, engages, and builds influence. We transform passive scrollers into active community members through highly intentional visual and textual assets.',
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/3.webp',
  },
  {
    id: '03',
    title: 'Branding',
    description:
      'Identities that people remember and trust. Before we design a logo, we define the cognitive moat. We build brands that justify premium positioning.',
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/4.webp',
  },
  {
    id: '04',
    title: 'BDM',
    subtitle: '(Sales Systems)',
    description:
      'Predictable acquisition engines and structured sales methodologies engineered to scale your narrative and convert attention into revenue.',
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/2.webp',
  },
  {
    id: '05',
    title: 'Setup Guidance',
    subtitle: 'Company Registration +',
    description:
      'Seamless administrative and legal structuring. We lay the foundational architecture so you can focus entirely on scaling operations.',
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/5.webp',
  },
  {
    id: '06',
    title: 'Events',
    description:
      'Experiences that create real brand impact. From conceptualization to execution, we craft physical spaces and moments that leave lasting psychological imprints.',
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/6.webp',
  },
  {
    id: '07',
    title: 'Web Development',
    description:
      'Websites built to convert, not just look good. We merge high-end aesthetic logic with ruthless performance mechanics.',
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/7.webp',
  },
  {
    id: '08',
    title: 'CRM',
    subtitle: '(with Scalora)',
    description:
      'Track. Manage. Close. Scale. Advanced customer relationship management systems integrated smoothly into your daily operational flow.',
    placeholderImg: 'https://bizco.in/wp-content/uploads/2026/05/8.webp',
  },
];

const ServicesHero: React.FC = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 200]);
  const yImg = useTransform(scrollY, [0, 1000], [0, 350]);
  const scaleImg = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden bg-[#050B14]">
      {/* Abstract Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-40 mix-blend-overlay pointer-events-none" />

      {/* Hero Text */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-4 md:mt-10 pointer-events-none flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#3A5A80] mb-8 md:mb-10 flex items-center gap-4"
        >
          <span className="w-12 md:w-20 h-[1px] bg-[#3A5A80]" />
          The Arsenal
          <span className="w-12 md:w-20 h-[1px] bg-[#3A5A80]" />
        </motion.div>

        <h1 className="font-serif text-[28vw] md:text-[23vw] leading-[0.8] tracking-tighter text-[#F4F0EA] pointer-events-auto flex flex-col items-center w-full select-none">
          <span className="block overflow-hidden w-full pb-2 md:pb-4">
            <motion.span
              initial={{ y: '100%', rotateZ: 5 }}
              animate={{ y: 0, rotateZ: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
              className="block origin-bottom"
            >
              WHAT
            </motion.span>
          </span>
          <span className="block overflow-hidden w-full">
            <motion.span
              initial={{ y: '100%', rotateZ: -5 }}
              animate={{ y: 0, rotateZ: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
              className="block italic text-transparent origin-bottom"
              style={{ WebkitTextStroke: '3px rgba(244,240,234,0.9)' }}
            >
              WE DO?
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: EASE }}
          className="max-w-2xl mt-16 md:mt-20 pointer-events-auto relative z-30"
        >
          <p className="text-sm md:text-base font-light opacity-80 leading-relaxed bg-[#050B14]/40 backdrop-blur-sm p-4 rounded-xl border border-white/5 drop-shadow-xl text-[#F4F0EA]">
            We don't offer isolated services. We build interconnected ecosystems of
            meaning and performance that embed your brand into the psychological
            infrastructure of your market.
          </p>
        </motion.div>
      </motion.div>

      {/* Hero Image */}
      <div className="absolute top-[80%] md:top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] md:w-[65vw] h-[65vh] md:h-[85vh] z-20 pointer-events-none flex items-start justify-center">
        <motion.div style={{ y: yImg, scale: scaleImg }} className="w-full h-full">
          <img
            src="https://bizco.in/wp-content/uploads/2026/05/wmyb.webp"
            alt="What We Do"
            className="w-full h-full object-cover object-top drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

const MethodologyBreak: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={ref}
      className="py-32 px-6 md:px-12 bg-[#F4F0EA] text-[#050B14] relative overflow-hidden rounded-t-[3rem] -mt-12 z-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative z-10">
          <CinematicTextReveal
            text="What We Bring to the Table?"
            className="font-serif text-5xl md:text-7xl leading-[1.1] mb-8"
          />
          <p className="text-lg font-light leading-relaxed opacity-80 max-w-md mb-12">
            This isn’t our beginning; it’s our return, sharper and more intentional than ever.
            <br />
            <br />
            Forget the "agency" model—we're a team that minds your business like our
            own. We trade noise for clarity, delivering purposeful work designed to
            drive outcomes.
            <br />
            <br />
            We’ve been here before, we’ve done the work, and now we’re back in action.
          </p>
          <MagneticElement strength={0.2} className="self-start inline-block">
            <a
              href="#services-list"
              className="uppercase font-mono text-[10px] tracking-[0.2em] border-b border-black/30 pb-1 hover:text-[#3A5A80] hover:border-[#3A5A80] transition-colors"
              data-cursor="hover"
            >
              Explore Core Offerings
            </a>
          </MagneticElement>
        </div>

        <div
          className="w-full md:w-1/2 h-[60vh] md:h-[85vh] relative group flex justify-center items-center pointer-events-none"
          data-cursor="view"
          data-cursor-text="METHOD"
        >
          <motion.img
            style={{ y: yImg, scale: 1.1 }}
            src="https://bizco.in/wp-content/uploads/2026/05/Gemini_Generated_Image_tro617tro617tro6.webp"
            alt="What We Bring"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

interface ServiceAccordionItemProps {
  data: ServiceItem;
  expanded: number | false;
  onClick: (index: number) => void;
  index: number;
}

const ServiceAccordionItem: React.FC<ServiceAccordionItemProps> = ({
  data,
  expanded,
  onClick,
  index,
}) => {
  const isExpanded = expanded === index;

  return (
    <div className="w-full border-b border-white/10 overflow-hidden">
      <button
        onClick={() => onClick(index)}
        className="w-full py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer hover:bg-white/[0.02] transition-colors px-4 md:px-0 text-left"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-16 w-full md:w-auto">
          <span className="font-mono text-sm md:text-base opacity-40 group-hover:text-[#3A5A80] group-hover:opacity-100 transition-colors">
            {data.id}
          </span>
          <div className="flex flex-col items-start text-left">
            {data.subtitle && (
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
                {data.subtitle}
              </span>
            )}
            <h2 className="font-serif text-4xl md:text-7xl group-hover:italic transition-all duration-500 text-[#F4F0EA]">
              {data.title}
            </h2>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-colors duration-500 ml-auto">
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Plus size={20} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="px-4 md:px-0"
          >
            <div className="pb-12 md:pb-16 flex flex-col md:flex-row gap-8 md:gap-16 pt-4">
              {/* Left Text Detail */}
              <div className="w-full md:w-1/3 md:ml-24 flex flex-col">
                <p className="text-lg md:text-xl font-light leading-relaxed opacity-80 border-l-2 border-[#3A5A80] pl-6 mb-8 text-[#F4F0EA]">
                  {data.description}
                </p>
                <MagneticElement strength={0.2} className="self-start">
                  <Link
                    to="/contact"
                    className="group/btn flex items-center gap-2 uppercase font-mono text-[10px] tracking-[0.2em] border-b border-white/30 pb-1 hover:text-[#3A5A80] hover:border-[#3A5A80] transition-colors text-[#F4F0EA]"
                    data-cursor="hover"
                  >
                    <span>Talk to us</span>
                    <div className="relative w-3 h-3 overflow-hidden flex items-center justify-center">
                      <ArrowRight
                        size={12}
                        className="absolute inset-0 -rotate-45 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4"
                      />
                      <MessageSquare
                        size={12}
                        className="absolute inset-0 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                      />
                    </div>
                  </Link>
                </MagneticElement>
              </div>

              {/* Right Image/Visual */}
              <div
                className="w-full md:w-2/3 h-[40vh] md:h-[60vh] relative rounded-xl overflow-hidden shadow-2xl group/img"
                data-cursor="view"
                data-cursor-text="PREVIEW"
              >
                <div className="absolute inset-0 bg-black/20 z-10 group-hover/img:bg-transparent transition-colors duration-700" />
                <img
                  src={data.placeholderImg}
                  alt={data.title}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-1000"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(0);

  const toggleAccordion = (index: number) => {
    setExpanded(expanded === index ? false : index);
  };

  return (
    <section
      id="services-list"
      className="px-6 md:px-12 relative z-10 max-w-[1400px] mx-auto pb-32 md:pb-48 pt-24 md:pt-32 bg-[#050B14]"
    >
      <div className="border-t border-white/10 w-full" />
      <div className="mt-4 md:mt-8 flex flex-col">
        {SERVICES_DATA.map((service, i) => (
          <ServiceAccordionItem
            key={service.id}
            data={service}
            index={i}
            expanded={expanded}
            onClick={toggleAccordion}
          />
        ))}
      </div>
    </section>
  );
};

export const ServicesPage: React.FC = () => {
  return (
    <div className="relative z-10">
      <ServicesHero />
      <MethodologyBreak />
      <ServicesSection />
      <Footer />
    </div>
  );
};
