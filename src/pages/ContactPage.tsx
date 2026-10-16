import React, { useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MagneticElement } from '../components/MagneticElement';
import { CinematicTextReveal } from '../components/CinematicTextReveal';
import { Footer } from '../components/Footer';
import { ContactFormData } from '../types';

const EASE = [0.16, 1, 0.3, 1] as const;

const ContactHero: React.FC = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 250]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative pt-40 md:pt-56 pb-20 px-6 md:px-12 w-full max-w-[1600px] mx-auto min-h-[60vh] flex flex-col justify-center">
      <motion.div style={{ y: yText, opacity: opacityText }} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#3A5A80] mb-8 flex items-center gap-4"
        >
          <span className="w-8 md:w-16 h-[1px] bg-[#3A5A80]" />
          Connect
        </motion.div>

        <h1 className="font-serif text-[18vw] md:text-[12vw] leading-[0.85] tracking-tighter text-[#F4F0EA] select-none">
          <span className="block overflow-hidden pb-2">
            <motion.span
              initial={{ y: '100%', rotateZ: 2 }}
              animate={{ y: 0, rotateZ: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
              className="block origin-bottom-left"
            >
              START THE
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%', rotateZ: -2 }}
              animate={{ y: 0, rotateZ: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
              className="block italic text-transparent origin-bottom-right"
              style={{ WebkitTextStroke: '1px rgba(244,240,234,0.9)' }}
            >
              CONVERSATION.
            </motion.span>
          </span>
        </h1>
      </motion.div>
    </section>
  );
};

const ContactGrid: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate reliable dispatch network transmission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
  };

  return (
    <section className="px-6 md:px-12 w-full max-w-[1600px] mx-auto pb-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 border-t border-white/10 pt-16">
        {/* Left Column: Direct Comm & Intel */}
        <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <CinematicTextReveal
              className="font-serif text-3xl md:text-5xl leading-tight mb-12 text-[#F4F0EA]"
              text="We selectively partner with brands ready to scale."
            />

            <div className="space-y-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] mb-4">
                  Direct Comm
                </p>
                <a
                  href="mailto:connect@bizco.in"
                  className="font-serif text-3xl md:text-4xl hover:italic transition-all duration-300 block mb-2 cursor-pointer w-max text-[#F4F0EA]"
                >
                  connect@bizco.in
                </a>
                <p className="font-mono text-sm opacity-60 text-[#F4F0EA]">
                  +91 93900 37618
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] mb-4">
                  Headquarters
                </p>
                <p className="font-serif text-2xl md:text-3xl leading-snug text-[#F4F0EA]">
                  Banjara Hills,
                  <br />
                  <span className="italic opacity-80">
                    Hyderabad, Telangana,
                    <br />
                    India
                  </span>
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] mb-4">
                  Networks
                </p>
                <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest">
                  <MagneticElement className="self-start" strength={0.1}>
                    <a
                      href="https://www.instagram.com/bizco.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#3A5A80] transition-colors flex items-center gap-2 group text-[#F4F0EA]"
                    >
                      Instagram{' '}
                      <ArrowRight
                        className="-rotate-45 group-hover:rotate-0 transition-transform"
                        size={12}
                      />
                    </a>
                  </MagneticElement>
                  <MagneticElement className="self-start" strength={0.1}>
                    <a
                      href="#"
                      className="hover:text-[#3A5A80] transition-colors flex items-center gap-2 group text-[#F4F0EA]"
                    >
                      LinkedIn{' '}
                      <ArrowRight
                        className="-rotate-45 group-hover:rotate-0 transition-transform"
                        size={12}
                      />
                    </a>
                  </MagneticElement>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center bg-white/[0.02] border border-white/5 rounded-2xl p-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="w-20 h-20 rounded-full border border-green-500/30 flex items-center justify-center mb-8 text-green-500 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                >
                  <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.polyline
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                      points="20 6 9 17 4 12"
                    />
                  </motion.svg>
                </motion.div>
                <h3 className="font-serif text-4xl md:text-5xl mb-6 text-[#F4F0EA]">
                  Let's See Where This Leads.
                </h3>
                <p className="font-mono text-sm opacity-60 max-w-md mx-auto leading-loose text-[#F4F0EA]">
                  Every meaningful partnership starts with a conversation.
                  <br />
                  We're reviewing your message
                  <br />
                  <br />
                  and will be in touch soon.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormState({
                      name: '',
                      email: '',
                      company: '',
                      interest: '',
                      message: '',
                    });
                  }}
                  className="mt-12 uppercase font-mono text-[10px] tracking-[0.2em] border-b border-white/30 pb-1 hover:text-green-500 hover:border-green-500 transition-colors cursor-pointer text-[#F4F0EA]"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <label
                      htmlFor="name"
                      className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] -translate-y-full pb-2 transition-opacity duration-300"
                    >
                      01. Identification
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      className="w-full bg-transparent border-b border-white/20 pb-4 text-lg md:text-xl font-serif italic outline-none focus:border-[#F4F0EA] transition-colors placeholder:text-white/30 placeholder:not-italic text-[#F4F0EA]"
                    />
                  </div>
                  <div className="relative group">
                    <label
                      htmlFor="email"
                      className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] -translate-y-full pb-2 transition-opacity duration-300"
                    >
                      02. Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className="w-full bg-transparent border-b border-white/20 pb-4 text-lg md:text-xl font-serif italic outline-none focus:border-[#F4F0EA] transition-colors placeholder:text-white/30 placeholder:not-italic text-[#F4F0EA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <label
                      htmlFor="company"
                      className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] -translate-y-full pb-2 transition-opacity duration-300"
                    >
                      03. Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder="Company Name (Optional)"
                      className="w-full bg-transparent border-b border-white/20 pb-4 text-lg md:text-xl font-serif italic outline-none focus:border-[#F4F0EA] transition-colors placeholder:text-white/30 placeholder:not-italic text-[#F4F0EA]"
                    />
                  </div>
                  <div className="relative group">
                    <label
                      htmlFor="interest"
                      className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] -translate-y-full pb-2 transition-opacity duration-300"
                    >
                      04. Objective
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={formState.interest}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-4 text-lg md:text-xl font-serif italic outline-none focus:border-[#F4F0EA] transition-colors text-white/80 appearance-none cursor-pointer"
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#050B14] not-italic text-white/50"
                      >
                        Select Area of Interest *
                      </option>
                      <option value="Branding" className="bg-[#050B14]">
                        Branding & Identity
                      </option>
                      <option value="Marketing" className="bg-[#050B14]">
                        Marketing & Strategy
                      </option>
                      <option value="Web Development" className="bg-[#050B14]">
                        Web Development
                      </option>
                      <option value="General Inquiry" className="bg-[#050B14]">
                        General Inquiry
                      </option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-white">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative group mt-4">
                  <label
                    htmlFor="message"
                    className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-widest text-[#3A5A80] -translate-y-full pb-2 transition-opacity duration-300"
                  >
                    05. Intelligence
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, or timeline... *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-lg md:text-xl font-serif italic outline-none focus:border-[#F4F0EA] transition-colors placeholder:text-white/30 placeholder:not-italic resize-none text-[#F4F0EA]"
                  />
                </div>

                <div className="mt-8 flex justify-end">
                  <MagneticElement strength={0.4}>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 flex items-center justify-center group overflow-hidden cursor-pointer ${
                        status === 'submitting' ? 'opacity-50 cursor-wait' : ''
                      }`}
                      data-cursor="hover"
                    >
                      <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] group-hover:text-[#050B14] transition-colors duration-500 flex flex-col items-center gap-2 text-[#F4F0EA]">
                        {status === 'submitting' ? (
                          <div className="w-4 h-4 border-2 border-t-transparent border-[#F4F0EA] group-hover:border-[#050B14] rounded-full animate-spin" />
                        ) : (
                          <>
                            <ArrowRight
                              className="-rotate-45 group-hover:rotate-0 transition-transform duration-500"
                              size={16}
                            />
                            Send Enquiry
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-[#F4F0EA] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-[0.16,1,0.3,1] origin-center" />
                    </button>
                  </MagneticElement>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="relative z-10">
      <ContactHero />
      <ContactGrid />
      <Footer
        statusText="Active"
        tagline="Status: Active"
        headline={
          <span>
            WE ARE <span className="italic">READY.</span>
          </span>
        }
        showInitiateButton={false}
      />
    </div>
  );
};
