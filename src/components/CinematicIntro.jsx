import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCw, Sparkles, MapPin, Calendar, Clock, Navigation } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { ArchFlourish, CornerFlourish, LotusMotif, OrnamentalDivider, GaneshaMotif } from '../assets/BotanicalElements';
import { weddingAudio } from '../utils/audioSynth';

/**
 * ====================================================================
 * CINEMATIC WEDDING REVEAL INTRO — SAHANA & SAMEEP
 * ====================================================================
 * A modern, luxury Indian wedding invitation reveal experience:
 * - 100svh full-viewport responsive layout (mobile, tablet, desktop)
 * - Dark champagne-gold background with ambient candlelight illumination
 * - Royal S&S monogram emblem and floating rose petals
 * - Two modern luminous champagne-gold architectural panels that part in 3D
 * - Complete wedding invitation poster with personalized guest greeting
 * - Interactive 3D flip between Royal English Invitation & Traditional Kannada Patrika
 * - Accessible "Skip Intro" button, body scroll locking, and reduced-motion support
 */
export default function CinematicIntro({
  wedding,
  guestGreeting,
  onComplete,
}) {
  const prefersReducedMotion = useReducedMotion();

  // Intro phase: 'SEALED' -> 'OPENING' -> 'REVEALED'
  const [phase, setPhase] = useState(prefersReducedMotion ? 'REVEALED' : 'SEALED');
  // Card 3D Flip state (Front: English, Back: Kannada)
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Lock body scrolling during intro; restore on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Automatic gentle progression if user doesn't tap immediately
  useEffect(() => {
    if (prefersReducedMotion) return;

    // After 1.6s, begin smooth gatefold separation
    const timer = setTimeout(() => {
      handleOpenReveal();
    }, 1800);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const triggerSparkles = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.45 },
        colors: ['#D4AF37', '#E5CCA0', '#F7E8CE', '#EAD6D0', '#FFFDF8'],
        disableForReducedMotion: true,
        ticks: 160,
        gravity: 0.7,
        scalar: 0.85,
      });
    } catch (e) {}
  };

  const handleOpenReveal = () => {
    if (phase !== 'SEALED') return;
    setPhase('OPENING');

    // Chime harp notes
    try {
      weddingAudio.playNote(523.25, 0, 1.8, 0.08); // C5
      setTimeout(() => weddingAudio.playNote(659.25, 0.12, 2.0, 0.07), 120); // E5
      setTimeout(() => weddingAudio.playNote(783.99, 0.25, 2.2, 0.06), 250); // G5
      setTimeout(() => weddingAudio.playNote(1046.50, 0.4, 2.5, 0.05), 400); // C6
    } catch (e) {}

    setTimeout(() => {
      setPhase('REVEALED');
      triggerSparkles();
    }, 1100);
  };

  const handleSkip = () => {
    onComplete?.();
  };

  // Rose petals floating in ambient space
  const petals = [
    { id: 1, left: '15%', delay: 0.1, duration: 7, size: 16 },
    { id: 2, left: '30%', delay: 1.2, duration: 8, size: 18 },
    { id: 3, left: '60%', delay: 0.5, duration: 6.5, size: 14 },
    { id: 4, left: '80%', delay: 1.8, duration: 7.5, size: 19 },
    { id: 5, left: '92%', delay: 0.8, duration: 8.5, size: 15 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 w-full h-[100svh] min-h-[100svh] bg-[#140F0D] flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: '1400px' }}
      aria-label="Sahana and Sameep Wedding Invitation Reveal"
    >
      {/* Ambient Vignette & Warm Candlelight Radial Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(88, 62, 42, 0.75) 0%, rgba(20, 15, 13, 0.96) 65%, #0D0A08 100%)',
        }}
      />

      {/* Floating Rose Petals */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {petals.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -30, opacity: 0, rotate: 0 }}
              animate={{
                y: '105svh',
                opacity: [0, 0.75, 0.75, 0],
                rotate: 240,
                x: [0, 15, -15, 8],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                left: p.left,
                width: p.size,
                height: p.size * 1.3,
                borderRadius: '60% 40% 60% 0%',
                background: 'linear-gradient(135deg, #F5CDC7 0%, #E2938B 60%, #B84E44 100%)',
                boxShadow: '0 2px 8px rgba(184, 78, 68, 0.3)',
              }}
              className="absolute pointer-events-none"
            />
          ))}
        </div>
      )}

      {/* Top Header Bar: Branding & Subtle "Skip Intro" Control */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 pt-[calc(0.75rem+env(safe-area-inset-top,0px))]">
        <div className="flex items-center gap-2.5">
          <SSMonogram size={28} variant="gold" />
          <span className="font-serif text-xs sm:text-sm tracking-[0.22em] text-[#EAD9B8] uppercase font-medium">
            Sahana &amp; Sameep
          </span>
        </div>

        {/* Top-Right "Skip Intro" Button */}
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip intro and view full wedding website"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-gold/40 text-gold-light text-[11px] font-sans uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
        </button>
      </header>

      {/* ========================================================
          THE INVITATION POSTER STAGE (Centered & Fully Responsive)
          ======================================================== */}
      <div className="relative z-20 w-full max-w-[420px] sm:max-w-[460px] px-4 max-h-[86svh] flex flex-col items-center justify-center my-auto">
        {/* The 3D Flip Card Rig */}
        <div
          className="w-full relative [perspective:1400px]"
          style={{ minHeight: '520px' }}
        >
          <motion.div
            animate={{
              rotateY: isCardFlipped ? 180 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full relative"
            style={{
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
            }}
          >
            {/* ====================================================
                FRONT FACE: ROYAL ENGLISH INVITATION POSTER
                ==================================================== */}
            <div
              className="w-full bg-[#FFFDF8] rounded-3xl border-2 border-[#C5A16B] shadow-2xl p-5 sm:p-6 text-center text-[#352C28] relative flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
                minHeight: '520px',
              }}
            >
              {/* Corner Flourishes */}
              <div className="absolute top-2 left-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#C5A16B]" position="top-left" />
              </div>
              <div className="absolute top-2 right-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#C5A16B]" position="top-right" />
              </div>
              <div className="absolute bottom-2 left-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#C5A16B]" position="bottom-left" />
              </div>
              <div className="absolute bottom-2 right-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#C5A16B]" position="bottom-right" />
              </div>

              {/* Inner Double Gold Border */}
              <div className="absolute inset-1.5 border border-[#C5A16B]/50 rounded-2xl pointer-events-none" />
              <div className="absolute inset-2.5 border border-[#C5A16B]/25 rounded-xl pointer-events-none" />

              {/* Card Header & Personalised Recipient Greeting */}
              <div className="relative z-10 pt-1 flex flex-col items-center">
                {/* Personalised Welcome Badge */}
                <div className="mb-2 px-3.5 py-1 rounded-full bg-[#FAF4E8] border border-[#C5A16B]/50 text-center">
                  <span className="font-sans text-[8.5px] uppercase tracking-[0.25em] text-[#8C632F] font-bold block">
                    {guestGreeting?.label || 'A WARM WELCOME TO'}
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-[#2A1F1B] tracking-wide block">
                    {guestGreeting?.greeting || 'Dear Family & Friends'}
                  </span>
                </div>

                {/* S&S Royal Crest */}
                <div className="mb-1">
                  <SSMonogram size={44} variant="gold" />
                </div>

                <p className="font-sans text-[8px] uppercase tracking-[0.24em] text-[#6B5A50] font-bold mb-1 px-3">
                  WITH THE BLESSINGS OF THE DIVINE AND OUR FAMILIES
                </p>

                {/* Couple Names: SAHANA & SAMEEP */}
                <div className="flex items-center justify-center gap-2 my-1">
                  <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.16em] font-bold text-[#2A1F1B]">
                    SAHANA
                  </h1>
                  <span className="font-script text-3xl sm:text-4xl text-[#B89255] font-normal">&amp;</span>
                  <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.16em] font-bold text-[#2A1F1B]">
                    SAMEEP
                  </h1>
                </div>

                <OrnamentalDivider className="my-1.5 max-w-[140px] mx-auto text-[#C5A16B]" />

                <p className="font-serif text-xs sm:text-sm text-[#352C28] italic px-2 leading-relaxed">
                  Cordially invite you to join us and celebrate our wedding day.
                </p>

                {/* Event Schedule & Verified Venue */}
                <div className="mt-2.5 py-2 px-3 border-y border-[#C5A16B]/40 w-full max-w-[340px] bg-[#FAF6EF]/80 rounded-xl">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-[#2A1F1B] tracking-wider uppercase">
                    <Calendar className="w-3.5 h-3.5 text-[#A67C45]" />
                    <span>MONDAY, 08 FEBRUARY 2027</span>
                  </div>
                  <div className="text-[11px] font-sans font-bold text-[#8B2628] mt-0.5 tracking-wide flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8B2628]" />
                    <span>Muhurtha: 12:35 PM</span>
                  </div>
                  <div className="mt-1 pt-1 border-t border-[#C5A16B]/25">
                    <div className="font-kannada font-bold text-[13px] text-[#2A1F1B] leading-tight">
                      ವಿಶ್ವಮಾನವ ಸಭಾಭವನ
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[10.5px] text-[#5C4D44] font-medium">
                      <MapPin className="w-3 h-3 text-[#A67C45] shrink-0" />
                      <span>Sagara Road, Ripponpete</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Flip Control */}
              <div className="relative z-10 pt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onComplete}
                  className="w-full min-h-[48px] py-3 px-5 rounded-full bg-gradient-to-r from-[#8C632F] via-[#B89255] to-[#8C632F] hover:brightness-105 active:scale-95 text-white font-sans text-xs uppercase tracking-[0.22em] font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ENTER WEDDING WEBSITE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between px-2 pt-1 text-[10.5px]">
                  <button
                    type="button"
                    onClick={() => setIsCardFlipped(true)}
                    className="font-sans font-semibold text-[#8C632F] hover:text-[#5E3E18] flex items-center gap-1.5 py-1 active:scale-95 transition-transform cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#A67C45]" />
                    <span>ಕನ್ನಡ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ (Flip)</span>
                  </button>

                  <a
                    href="https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-semibold text-[#8B2628] hover:underline flex items-center gap-1 py-1"
                  >
                    <Navigation className="w-3 h-3 text-[#8B2628]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ====================================================
                BACK FACE: TRADITIONAL KANNADA INVITATION PATRIKA
                ==================================================== */}
            <div
              className="w-full bg-[#FAFDF8] rounded-3xl border-2 border-[#4A5D43]/60 shadow-2xl p-5 sm:p-6 text-center text-[#352C28] absolute inset-0 flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                minHeight: '520px',
              }}
            >
              {/* Corner Flourishes */}
              <div className="absolute top-2 left-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#4A5D43]" position="top-left" />
              </div>
              <div className="absolute top-2 right-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#4A5D43]" position="top-right" />
              </div>
              <div className="absolute bottom-2 left-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#4A5D43]" position="bottom-left" />
              </div>
              <div className="absolute bottom-2 right-2 pointer-events-none">
                <CornerFlourish className="w-8 h-8 text-[#4A5D43]" position="bottom-right" />
              </div>

              {/* Inner Double Traditional Border */}
              <div className="absolute inset-1.5 border border-[#4A5D43]/40 rounded-2xl pointer-events-none" />
              <div className="absolute inset-2.5 border border-[#8B2628]/20 rounded-xl pointer-events-none" />

              {/* Kannada Invocation & Content */}
              <div className="relative z-10 pt-1 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#8B2628]/10 border border-[#8B2628]/30 flex items-center justify-center p-2 mb-1.5 shadow-xs">
                  <GaneshaMotif className="w-8 h-8 text-[#8B2628]" strokeWidth={1.5} />
                </div>

                <p className="font-kannada font-bold text-xs tracking-widest text-[#8B2628]">
                  || ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||
                </p>
                <p className="font-kannada text-[11px] text-[#4A5D43] font-semibold mt-0.5">
                  ಶ್ರೀ ಮಂಜುನಾಥ ಸ್ವಾಮಿ ಹಾಗೂ ಕುಲದೇವರುಗಳ ಆಶೀರ್ವಾದದೊಂದಿಗೆ
                </p>

                <div className="my-2">
                  <span className="font-sans text-[8.5px] uppercase tracking-[0.24em] text-[#8C632F] font-bold block mb-1">
                    ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ
                  </span>
                  <h2 className="font-kannada font-bold text-2xl sm:text-3xl text-[#2A1F1B] leading-tight">
                    ಸಾಹನಾ ಮತ್ತು ಸಮೀಪ
                  </h2>
                </div>

                <p className="font-kannada text-xs sm:text-[13px] text-[#352C28] leading-relaxed px-2 my-1">
                  ನಮ್ಮ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ತಾವೆಲ್ಲರೂ ಆಗಮಿಸಿ ನವದಂಪತಿಗಳನ್ನು ಆಶೀರ್ವದಿಸಬೇಕಾಗಿ ವಿನಮ್ರ ಪ್ರಾರ್ಥನೆ.
                </p>

                {/* Muhurtha & Venue Block in Kannada */}
                <div className="mt-2 py-2 px-3 border-y border-[#4A5D43]/30 w-full max-w-[340px] bg-[#F2F7EF]/80 rounded-xl text-center">
                  <div className="font-kannada font-bold text-xs text-[#2A1F1B]">
                    ದಿನಾಂಕ: ೦೮-೦೨-೨೦೨೭, ಸೋಮವಾರ
                  </div>
                  <div className="font-kannada font-bold text-[11px] text-[#8B2628] mt-0.5">
                    ಶುಭ ಮುಹೂರ್ತ: ಮಧ್ಯಾಹ್ನ ೧೨:೩೫ ಕ್ಕೆ
                  </div>
                  <div className="mt-1 pt-1 border-t border-[#4A5D43]/20">
                    <div className="font-kannada font-bold text-[13px] text-[#2A1F1B]">
                      ವಿಶ್ವಮಾನವ ಸಭಾಭವನ
                    </div>
                    <div className="font-kannada text-[11px] text-[#5C4D44]">
                      ಸಾಗರ ರಸ್ತೆ, ರಿಪ್ಪನ್‌ಪೇಟೆ
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions on Back Face */}
              <div className="relative z-10 pt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onComplete}
                  className="w-full min-h-[48px] py-3 px-5 rounded-full bg-gradient-to-r from-[#4A5D43] via-[#5C7453] to-[#4A5D43] hover:brightness-105 active:scale-95 text-white font-sans text-xs uppercase tracking-[0.22em] font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ವಧು-ವರರನ್ನು ಆಶೀರ್ವದಿಸಿ (Enter Website)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between px-2 pt-1 text-[10.5px]">
                  <button
                    type="button"
                    onClick={() => setIsCardFlipped(false)}
                    className="font-sans font-semibold text-[#4A5D43] hover:text-[#2E3C29] flex items-center gap-1.5 py-1 active:scale-95 transition-transform cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#4A5D43]" />
                    <span>Flip to English</span>
                  </button>

                  <a
                    href="https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-semibold text-[#8B2628] hover:underline flex items-center gap-1 py-1"
                  >
                    <Navigation className="w-3 h-3 text-[#8B2628]" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================
          TWO LUMINOUS CHAMPAGNE-GOLD 3D ARCHITECTURAL DOORS/PANELS
          Separating gracefully from the center to reveal invitation
          ======================================================== */}
      {/* LEFT PANEL */}
      <motion.div
        initial={false}
        animate={
          phase === 'OPENING' || phase === 'REVEALED'
            ? {
                x: '-105%',
                rotateY: -25,
                opacity: 0,
                transition: { duration: 1.35, ease: [0.22, 1, 0.36, 1] },
              }
            : {
                x: '0%',
                rotateY: 0,
                opacity: 1,
              }
        }
        style={{
          transformOrigin: 'left center',
          background: 'linear-gradient(135deg, #241D1A 0%, #3D2D23 40%, #523E30 80%, #2A1F1A 100%)',
          boxShadow: '10px 0 40px rgba(0, 0, 0, 0.85)',
        }}
        onClick={handleOpenReveal}
        className={`fixed top-0 bottom-0 left-0 w-[51%] z-30 flex items-center justify-end pr-4 border-r-2 border-[#D4AF37]/50 pointer-events-auto ${
          phase === 'SEALED' ? 'cursor-pointer' : 'pointer-events-none'
        }`}
      >
        {/* Decorative Gold Pinstripes & Damask Accents */}
        <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        initial={false}
        animate={
          phase === 'OPENING' || phase === 'REVEALED'
            ? {
                x: '105%',
                rotateY: 25,
                opacity: 0,
                transition: { duration: 1.35, ease: [0.22, 1, 0.36, 1] },
              }
            : {
                x: '0%',
                rotateY: 0,
                opacity: 1,
              }
        }
        style={{
          transformOrigin: 'right center',
          background: 'linear-gradient(225deg, #241D1A 0%, #3D2D23 40%, #523E30 80%, #2A1F1A 100%)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.85)',
        }}
        onClick={handleOpenReveal}
        className={`fixed top-0 bottom-0 right-0 w-[51%] z-30 flex items-center justify-start pl-4 border-l-2 border-[#D4AF37]/50 pointer-events-auto ${
          phase === 'SEALED' ? 'cursor-pointer' : 'pointer-events-none'
        }`}
      >
        {/* Decorative Gold Pinstripes & Damask Accents */}
        <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
      </motion.div>

      {/* CENTER SEAL EMBLEM (Visible when Sealed; Tapping it begins the reveal) */}
      <AnimatePresence>
        {phase === 'SEALED' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleOpenReveal}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
          >
            {/* Luminous Pulsing Glow */}
            <div
              className="absolute w-44 h-44 rounded-full pointer-events-none animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(197, 161, 107, 0.15) 50%, transparent 75%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Emblem Circle */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E5CCA0] via-[#D4AF37] to-[#8C632F] p-1 shadow-2xl flex items-center justify-center border border-[#FFFDF8]/40 hover:scale-105 active:scale-95 transition-transform">
              <div className="w-full h-full rounded-full bg-[#201915] flex items-center justify-center border border-[#D4AF37]/50">
                <SSMonogram size={56} variant="seal" />
              </div>
            </div>

            <motion.div
              animate={{ y: [0, 4, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-gold/40 text-gold-light text-xs font-sans uppercase tracking-[0.2em] font-medium backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>Tap to Open Invitation</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
