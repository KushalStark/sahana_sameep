import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCw, Sparkles, MapPin, Calendar, Clock, Navigation } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { CornerFlourish, LotusMotif, OrnamentalDivider, GaneshaMotif } from '../assets/BotanicalElements';
import { weddingAudio } from '../utils/audioSynth';
import { formatGuestGreeting } from '../utils/guestPersonalization';

/**
 * ====================================================================
 * CINEMATIC WEDDING REVEAL INTRO — SAHANA & SAMEEP
 * ====================================================================
 * Grand physical 3D ivory-and-gold envelope with 5-second grace period:
 * - Sealed envelope displayed on landing with custom gold S&S wax seal
 * - Attractive guest welcome: "WITH LOVE, WE WELCOME" + large guest name
 * - "YOU HAVE A SPECIAL INVITATION" pill above envelope
 * - "Tap the golden seal to open" instruction with 5s countdown timer
 * - Tap immediately cancels timer & opens envelope; otherwise auto-opens after 5s
 * - Flap physically rotates open around top hinge (-180deg)
 * - Invitation emerges vertically out of pocket in 3D
 * - 3D Flip Card: English Front & Kannada Back (ಸಹನ ಮತ್ತು ಸಮೀಪ್)
 * - "DISCOVER OUR WEDDING" button with "Explore our celebration..."
 * - Golden curtain transition on enter website
 */
export default function CinematicIntro({
  wedding,
  guestGreeting,
  onComplete,
}) {
  const prefersReducedMotion = useReducedMotion();

  // Stages: 'SEALED' | 'SEAL_BREAK' | 'FLAP_OPEN' | 'EMERGING' | 'REVEALED' | 'CURTAIN_TRANSITION'
  const [stage, setStage] = useState('SEALED');
  const [countdownSeconds, setCountdownSeconds] = useState(5);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [sealGlimmer, setSealGlimmer] = useState(false);

  const timerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const sequenceTimersRef = useRef([]);

  const greeting = guestGreeting || formatGuestGreeting();

  const clearAllTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    sequenceTimersRef.current.forEach((t) => clearTimeout(t));
    sequenceTimersRef.current = [];
  };

  // Lock body scrolling during intro; restore on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
      clearAllTimers();
    };
  }, []);

  // ==================================================================
  // 5-SECOND CONTROLLED COUNTDOWN GRACE PERIOD
  // ==================================================================
  useEffect(() => {
    if (prefersReducedMotion) {
      setStage('REVEALED');
      return;
    }

    // 1-second interval to update visual countdown badge
    countdownIntervalRef.current = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 5-second automatic opening timer
    timerRef.current = setTimeout(() => {
      handleOpenSequence();
    }, 5000);

    return () => clearAllTimers();
  }, [prefersReducedMotion]);

  // Golden particle burst when seal detaches
  const triggerSealParticles = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { x: 0.5, y: 0.44 },
        colors: ['#D4AF37', '#E5CCA0', '#F7E8CE', '#A67C45', '#FFFDF8'],
        disableForReducedMotion: true,
        ticks: 150,
        gravity: 0.85,
        scalar: 0.85,
      });
    } catch (e) {}
  };

  // Celebration golden shower when invitation card emerges
  const triggerSettledParticles = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.5, y: 0.35 },
        colors: ['#D4AF37', '#E5CCA0', '#F7E8CE', '#C5A16B'],
        disableForReducedMotion: true,
        ticks: 180,
        gravity: 0.65,
        scalar: 0.9,
      });
    } catch (e) {}
  };

  // ==================================================================
  // ENVELOPE OPENING ANIMATION SEQUENCE
  // ==================================================================
  const handleOpenSequence = () => {
    if (stage !== 'SEALED') return;
    clearAllTimers();

    setStage('SEAL_BREAK');
    setSealGlimmer(true);

    // Chime harp notes
    try {
      weddingAudio.playNote(523.25, 0, 1.8, 0.08); // C5
      setTimeout(() => weddingAudio.playNote(659.25, 0.12, 2.0, 0.07), 120); // E5
      setTimeout(() => weddingAudio.playNote(783.99, 0.25, 2.2, 0.06), 250); // G5
      setTimeout(() => weddingAudio.playNote(1046.50, 0.4, 2.5, 0.05), 400); // C6
    } catch (e) {}

    // 0.4s: Seal detaches with golden particles
    const t1 = setTimeout(() => {
      triggerSealParticles();
    }, 400);
    sequenceTimersRef.current.push(t1);

    // 0.75s: Top flap rotates open physically (-180deg)
    const t2 = setTimeout(() => {
      setStage('FLAP_OPEN');
    }, 750);
    sequenceTimersRef.current.push(t2);

    // 1.35s: Invitation card slides vertically upward out of envelope
    const t3 = setTimeout(() => {
      setStage('EMERGING');
    }, 1350);
    sequenceTimersRef.current.push(t3);

    // 2.7s: Card settles in center of viewport
    const t4 = setTimeout(() => {
      setStage('REVEALED');
      triggerSettledParticles();
    }, 2700);
    sequenceTimersRef.current.push(t4);
  };

  // ==================================================================
  // GOLDEN CURTAIN TRANSITION INTO MAIN WEBSITE
  // ==================================================================
  const handleDiscoverWedding = () => {
    if (stage === 'CURTAIN_TRANSITION') return;
    clearAllTimers();

    // Trigger golden curtain sweep
    setStage('CURTAIN_TRANSITION');

    try {
      weddingAudio.playNote(523.25, 0, 2.2, 0.08);
      setTimeout(() => weddingAudio.playNote(659.25, 0.15, 2.2, 0.07), 150);
      setTimeout(() => weddingAudio.playNote(783.99, 0.3, 2.2, 0.06), 300);
    } catch (e) {}

    // Complete transition after curtain animation
    setTimeout(() => {
      onComplete?.();
    }, 1200);
  };

  const handleSkip = () => {
    clearAllTimers();
    onComplete?.();
  };

  const isFlapOpen = stage === 'FLAP_OPEN' || stage === 'EMERGING' || stage === 'REVEALED' || stage === 'CURTAIN_TRANSITION';
  const isCardEmerging = stage === 'EMERGING' || stage === 'REVEALED' || stage === 'CURTAIN_TRANSITION';
  const isCardSettled = stage === 'REVEALED' || stage === 'CURTAIN_TRANSITION';
  const isSealVisible = stage === 'SEALED' || stage === 'SEAL_BREAK';

  // Ambient rose petals
  const petals = [
    { id: 1, left: '12%', delay: 0.1, duration: 7.5, size: 16 },
    { id: 2, left: '32%', delay: 1.4, duration: 8.5, size: 18 },
    { id: 3, left: '62%', delay: 0.6, duration: 7.0, size: 14 },
    { id: 4, left: '82%', delay: 2.0, duration: 8.0, size: 19 },
    { id: 5, left: '94%', delay: 1.0, duration: 9.0, size: 15 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 w-full h-[100svh] min-h-[100svh] bg-[#140F0D] flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: '1400px' }}
      aria-label="Sahana and Sameep Wedding Invitation Reveal"
    >
      {/* Ambient Radial Vignette & Warm Candlelight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(88, 62, 42, 0.75) 0%, rgba(20, 15, 13, 0.98) 75%)',
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

      {/* Top Header Bar: Monogram & Skip Intro */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 pt-[calc(0.75rem+env(safe-area-inset-top,0px))]">
        <div className="flex items-center gap-2.5">
          <SSMonogram size={28} variant="gold" />
          <span className="font-serif text-xs sm:text-sm tracking-[0.22em] text-[#EAD9B8] uppercase font-medium">
            Sahana &amp; Sameep
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip intro and discover full wedding website"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-gold/40 text-gold-light text-[11px] font-sans uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
        </button>
      </header>

      {/* ========================================================
          CENTRAL STAGE CONTAINER (Strictly Mobile-Friendly)
          ======================================================== */}
      <div className="relative z-20 w-full max-w-[420px] px-3.5 flex flex-col items-center justify-center my-auto">

        {/* ========================================================
            ATTRACTIVE PERSONALISED GUEST WELCOME & SPECIAL BANNER
            ======================================================== */}
        <motion.div
          animate={{
            opacity: isCardSettled ? 0 : 1,
            y: isCardSettled ? -20 : 0,
            scale: isCardSettled ? 0.95 : 1,
          }}
          transition={{ duration: 0.5 }}
          className={`w-full flex flex-col items-center text-center mb-3 z-30 px-2 ${
            isCardSettled ? 'pointer-events-none' : ''
          }`}
        >
          {/* Guest Greeting Card Container with fine gold border */}
          <div className="w-full max-w-[340px] px-4 py-2.5 rounded-2xl bg-gradient-to-b from-[#FFFDF8] to-[#FAF4E8] border border-[#C5A16B]/60 shadow-xl text-center mb-2">
            <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-[#8C632F] font-bold block mb-1">
              {greeting.label || 'WITH LOVE, WE WELCOME'}
            </span>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1F1B] tracking-wide leading-tight mb-1">
              {greeting.greeting}
            </h1>

            <OrnamentalDivider className="max-w-[120px] mx-auto text-[#C5A16B] my-1" />

            <p className="font-serif text-[11.5px] text-[#5C4D44] italic">
              {greeting.subtitle || 'You are a cherished part of our celebration.'}
            </p>
          </div>

          {/* "YOU HAVE A SPECIAL INVITATION" pill (Directly above envelope) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1512] border border-[#D4AF37]/50 text-[#EAD9B8] shadow-md text-[10px] font-sans tracking-widest uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>YOU HAVE A SPECIAL INVITATION</span>
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          </div>
        </motion.div>

        {/* ========================================================
            THE GRAND 3D PHYSICAL ENVELOPE RIG
            Width: 320px, Height: 215px
            ======================================================== */}
        <div
          onClick={stage === 'SEALED' ? handleOpenSequence : undefined}
          role="button"
          tabIndex={stage === 'SEALED' ? 0 : -1}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && stage === 'SEALED' && handleOpenSequence()}
          aria-label={stage === 'SEALED' ? 'Tap the golden seal to open invitation' : 'Wedding invitation envelope'}
          className={`relative w-[320px] h-[215px] flex items-center justify-center transition-transform duration-500 ${
            stage === 'SEALED' ? 'cursor-pointer hover:scale-[1.015] active:scale-[0.985]' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          {/* Contact Shadow beneath envelope */}
          <div className="absolute -bottom-6 inset-x-4 h-6 bg-black/60 blur-lg rounded-full pointer-events-none" />

          {/* LAYER 1: BACK WALL & INNER GOLD LINING */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#EBE1D0] border border-[#C5A16B] shadow-2xl overflow-hidden"
            style={{ zIndex: 5 }}
          >
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#A67C45_1.2px,transparent_1.2px)] [background-size:10px_10px]" />
            <div className="absolute inset-1.5 rounded-xl border border-[#C5A16B]/35 pointer-events-none" />

            {/* Inner Crest visible when card emerges */}
            <div className="absolute top-4 inset-x-0 flex flex-col items-center opacity-40">
              <LotusMotif className="w-7 h-7 text-[#A67C45]" strokeWidth={1.2} />
              <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-[#A67C45] mt-0.5">
                Sahana &amp; Sameep
              </span>
            </div>

            {/* Soft Golden Cavity Glow when flap opens */}
            <div
              className={`absolute inset-x-0 top-0 h-28 pointer-events-none transition-opacity duration-1000 ${
                isFlapOpen ? 'opacity-85' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(ellipse at 50% 20%, rgba(212, 175, 55, 0.5) 0%, rgba(197, 161, 107, 0.15) 55%, transparent 80%)',
              }}
            />
          </div>

          {/* LAYER 2: TOP HINGED 3D TRIANGULAR FLAP (Rotates 0deg -> -180deg) */}
          <motion.div
            initial={false}
            animate={
              isFlapOpen
                ? {
                    rotateX: -180,
                    zIndex: 6,
                    transition: {
                      rotateX: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
                      zIndex: { delay: 0.45 },
                    },
                  }
                : {
                    rotateX: 0,
                    zIndex: 30,
                    transition: {
                      rotateX: { duration: 0.75, ease: 'easeOut' },
                      zIndex: { delay: 0.1 },
                    },
                  }
            }
            className="absolute top-0 inset-x-0 h-[118px] pointer-events-none"
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {/* Front Face (Visible when Closed: Ivory triangle) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(0deg)',
              }}
            >
              <svg
                viewBox="0 0 320 118"
                className="w-full h-full drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
              >
                <polygon
                  points="0,0 160,116 320,0"
                  fill="#FDF8EE"
                  stroke="#C5A16B"
                  strokeWidth="1.2"
                />
                <line x1="8" y1="5" x2="160" y2="110" stroke="#D8C29D" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                <line x1="312" y1="5" x2="160" y2="110" stroke="#D8C29D" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
              </svg>
            </div>

            {/* Back / Inner Face (Visible when Open: Darker Champagne lining) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              <svg
                viewBox="0 0 320 118"
                className="w-full h-full drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
              >
                <polygon
                  points="0,0 160,116 320,0"
                  fill="#EDE2CE"
                  stroke="#C5A16B"
                  strokeWidth="1.2"
                />
                <path d="M35 15 L160 102 L285 15" stroke="#C5A16B" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
                <polygon
                  points="0,0 320,0 280,20 40,20"
                  fill="#000000"
                  fillOpacity="0.06"
                />
              </svg>
            </div>
          </motion.div>

          {/* ======================================================
              LAYER 3: INVITATION CARD (Sliding Upward in 3D + Flip)
              ====================================================== */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: isCardSettled ? 'none' : 'inset(-600px -20px 0px -20px)',
              WebkitClipPath: isCardSettled ? 'none' : 'inset(-600px -20px 0px -20px)',
              zIndex: isCardEmerging ? 40 : 15,
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={false}
              animate={
                isCardEmerging
                  ? {
                      y: -190,
                      scale: 1,
                      rotateX: 0,
                      transition: {
                        y: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
                        scale: { duration: 1.1, ease: 'easeOut' },
                        rotateX: { duration: 1.0 },
                      },
                    }
                  : {
                      y: 10,
                      scale: 0.93,
                      rotateX: -3,
                      transition: {
                        y: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
                        scale: { duration: 0.6 },
                      },
                    }
              }
              className="absolute inset-x-2 top-2 h-[410px] sm:h-[420px] rounded-2xl pointer-events-auto [perspective:1400px]"
              style={{
                transformOrigin: 'bottom center',
                willChange: 'transform',
              }}
            >
              {/* 3D Flip Card Container */}
              <motion.div
                animate={{
                  rotateY: isCardFlipped ? 180 : 0,
                }}
                transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
                className="w-full h-full relative"
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                }}
              >
                {/* ====================================================
                    FRONT FACE: ROYAL ENGLISH INVITATION
                    ==================================================== */}
                <div
                  className="w-full h-full bg-[#FFFDF8] rounded-2xl border-2 border-[#C5A16B] shadow-2xl p-4 flex flex-col justify-between text-center text-[#352C28] overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                  }}
                >
                  {/* Corner Flourishes */}
                  <div className="absolute top-1.5 left-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#C5A16B]" position="top-left" />
                  </div>
                  <div className="absolute top-1.5 right-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#C5A16B]" position="top-right" />
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#C5A16B]" position="bottom-left" />
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#C5A16B]" position="bottom-right" />
                  </div>

                  {/* Inner Gold Borders */}
                  <div className="absolute inset-1.5 border border-[#C5A16B]/50 rounded-xl pointer-events-none" />
                  <div className="absolute inset-2 border border-[#C5A16B]/25 rounded-lg pointer-events-none" />

                  {/* Content (Hidden when closed, fades in as card emerges) */}
                  <div
                    className="relative z-10 pt-1 flex flex-col items-center transition-opacity duration-700"
                    style={{ opacity: isCardEmerging ? 1 : 0 }}
                  >
                    {/* Welcome Badge */}
                    <div className="mb-1 flex flex-col items-center">
                      <span className="font-sans text-[7.5px] uppercase tracking-[0.24em] text-[#8C632F] font-bold">
                        {greeting.label || 'WITH LOVE, WE WELCOME'}
                      </span>
                      <span className="font-serif text-[12.5px] font-bold text-[#2A1F1B] tracking-wide">
                        {greeting.greeting}
                      </span>
                    </div>

                    {/* Master S&S Monogram */}
                    <div className="mb-0.5">
                      <SSMonogram size={38} variant="gold" />
                    </div>

                    <p className="font-sans text-[7.5px] uppercase tracking-[0.24em] text-[#5C4D44] font-bold mb-0.5 px-2">
                      WITH THE BLESSINGS OF THE DIVINE AND OUR FAMILIES
                    </p>

                    {/* Names: SAHANA & SAMEEP */}
                    <div className="flex items-center justify-center gap-2 my-0.5">
                      <span className="font-serif text-[22px] tracking-[0.16em] font-bold text-[#2A1F1B]">
                        SAHANA
                      </span>
                      <span className="font-script text-2xl text-[#B89255] font-normal">&amp;</span>
                      <span className="font-serif text-[22px] tracking-[0.16em] font-bold text-[#2A1F1B]">
                        SAMEEP
                      </span>
                    </div>

                    <OrnamentalDivider className="my-1 max-w-[120px] mx-auto text-[#C5A16B]" />

                    <p className="font-serif text-[10.5px] text-[#352C28] italic px-2 leading-tight">
                      Cordially invite you to join us<br />and celebrate our wedding day.
                    </p>

                    {/* Date, Muhurtha & Verified Venue */}
                    <div className="mt-1.5 py-1.5 border-y border-[#C5A16B]/35 w-full max-w-[270px] text-center bg-[#FAF6EF]/70 rounded-lg">
                      <div className="flex items-center justify-center gap-1.5 text-[11px] font-serif font-bold text-[#2A1F1B] tracking-wider uppercase">
                        <Calendar className="w-3.5 h-3.5 text-[#A67C45]" />
                        <span>MONDAY, 08 FEBRUARY 2027</span>
                      </div>
                      <div className="text-[10px] font-sans font-bold text-[#8B2628] mt-0.5 tracking-wide flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-[#8B2628]" />
                        <span>Muhurtha: 12:35 PM</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-[#C5A16B]/20">
                        <div className="font-kannada font-bold text-[12px] text-[#2A1F1B] leading-tight">
                          ವಿಶ್ವಮಾನವ ಸಭಾಭವನ
                        </div>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-[#5C4D44] font-medium">
                          <MapPin className="w-3 h-3 text-[#A67C45] shrink-0" />
                          <span>Sagara Road, Ripponpete</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & "DISCOVER OUR WEDDING" Button */}
                  <div
                    className="relative z-10 pt-1 flex flex-col gap-1.5 transition-opacity duration-700"
                    style={{ opacity: isCardEmerging ? 1 : 0 }}
                  >
                    <motion.button
                      type="button"
                      onClick={handleDiscoverWedding}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full min-h-[48px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#8C632F] via-[#B89255] to-[#8C632F] text-white shadow-lg active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.22em] font-bold">
                        <span>DISCOVER OUR WEDDING</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="font-serif text-[10px] text-[#FFF4DF] tracking-wide opacity-90">
                        Explore our celebration, memories and wedding details.
                      </span>
                    </motion.button>

                    <div className="flex items-center justify-between px-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setIsCardFlipped(true)}
                        className="font-sans font-semibold text-[#8C632F] hover:text-[#5E3E18] flex items-center gap-1 py-1 active:scale-95 transition-transform cursor-pointer"
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
                        <Navigation className="w-3 h-3" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* ====================================================
                    BACK FACE: TRADITIONAL KANNADA INVITATION
                    (All Kannada, zero isolated English labels!)
                    ==================================================== */}
                <div
                  className="w-full h-full bg-[#FAFDF8] rounded-2xl border-2 border-[#4A5D43]/60 shadow-2xl p-4 absolute inset-0 flex flex-col justify-between text-center text-[#352C28] overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Corner Flourishes */}
                  <div className="absolute top-1.5 left-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#4A5D43]" position="top-left" />
                  </div>
                  <div className="absolute top-1.5 right-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#4A5D43]" position="top-right" />
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#4A5D43]" position="bottom-left" />
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 pointer-events-none">
                    <CornerFlourish className="w-7 h-7 text-[#4A5D43]" position="bottom-right" />
                  </div>

                  {/* Inner Borders */}
                  <div className="absolute inset-1.5 border border-[#4A5D43]/40 rounded-xl pointer-events-none" />
                  <div className="absolute inset-2 border border-[#8B2628]/20 rounded-lg pointer-events-none" />

                  {/* Kannada Invocation & Content */}
                  <div className="relative z-10 pt-1 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8B2628]/10 border border-[#8B2628]/30 flex items-center justify-center p-1.5 mb-1 shadow-xs">
                      <GaneshaMotif className="w-7 h-7 text-[#8B2628]" strokeWidth={1.5} />
                    </div>

                    <p className="font-kannada font-bold text-xs tracking-widest text-[#8B2628]">
                      || ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||
                    </p>
                    <p className="font-kannada text-[10px] text-[#4A5D43] font-semibold mt-0.5">
                      ಶ್ರೀ ಮಂಜುನಾಥ ಸ್ವಾಮಿ ಹಾಗೂ ಕುಲದೇವರುಗಳ ಆಶೀರ್ವಾದದೊಂದಿಗೆ
                    </p>

                    <div className="my-1.5">
                      <span className="font-kannada text-[9px] uppercase tracking-[0.2em] text-[#8C632F] font-bold block mb-0.5">
                        ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ
                      </span>
                      {/* VERIFIED KANNADA NAMES: ಸಹನ ಮತ್ತು ಸಮೀಪ್ */}
                      <h2 className="font-kannada font-bold text-2xl text-[#2A1F1B] leading-tight">
                        ಸಹನ ಮತ್ತು ಸಮೀಪ್
                      </h2>
                    </div>

                    <p className="font-kannada text-[11px] text-[#352C28] leading-tight px-1 my-1">
                      ನಮ್ಮ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ತಾವೆಲ್ಲರೂ ಆಗಮಿಸಿ ನವದಂಪತಿಗಳನ್ನು ಆಶೀರ್ವದಿಸಬೇಕಾಗಿ ವಿನಮ್ರ ಪ್ರಾರ್ಥನೆ.
                    </p>

                    {/* Schedule in Kannada */}
                    <div className="mt-1 py-1.5 px-2.5 border-y border-[#4A5D43]/30 w-full max-w-[270px] bg-[#F2F7EF]/80 rounded-lg text-center">
                      <div className="font-kannada font-bold text-[11.5px] text-[#2A1F1B]">
                        ದಿನಾಂಕ: ೦೮-೦೨-೨೦೨೭, ಸೋಮವಾರ
                      </div>
                      <div className="font-kannada font-bold text-[10.5px] text-[#8B2628] mt-0.5">
                        ಶುಭ ಮುಹೂರ್ತ: ಮಧ್ಯಾಹ್ನ ೧೨:೩೫ ಕ್ಕೆ
                      </div>
                      <div className="mt-0.5 pt-0.5 border-t border-[#4A5D43]/20">
                        <div className="font-kannada font-bold text-[12px] text-[#2A1F1B]">
                          ವಿಶ್ವಮಾನವ ಸಭಾಭವನ
                        </div>
                        <div className="font-kannada text-[10.5px] text-[#5C4D44]">
                          ಸಾಗರ ರಸ್ತೆ, ರಿಪ್ಪನ್‌ಪೇಟೆ
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions on Kannada Face */}
                  <div className="relative z-10 pt-1 flex flex-col gap-1.5">
                    <motion.button
                      type="button"
                      onClick={handleDiscoverWedding}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full min-h-[48px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#4A5D43] via-[#5C7453] to-[#4A5D43] text-white shadow-lg active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 font-kannada text-xs font-bold">
                        <span>ನಮ್ಮ ವಿವಾಹ ವಿವರಗಳನ್ನು ನೋಡಿ</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="font-kannada text-[10px] text-[#E8F3E5] opacity-90">
                        ನಮ್ಮ ವಿವಾಹದ ಸಂಭ್ರಮ ಹಾಗೂ ನೆನಪುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.
                      </span>
                    </motion.button>

                    <div className="flex items-center justify-between px-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setIsCardFlipped(false)}
                        className="font-kannada font-semibold text-[#4A5D43] hover:text-[#2E3C29] flex items-center gap-1 py-1 active:scale-95 transition-transform cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-[#4A5D43]" />
                        <span>ಇಂಗ್ಲಿಷ್ ಪತ್ರಿಕೆ (Flip to English)</span>
                      </button>

                      <a
                        href="https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-kannada font-semibold text-[#8B2628] hover:underline flex items-center gap-1 py-1"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>ದಾರಿ ನಕ್ಷೆ</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* LAYER 4: FRONT ENVELOPE POCKET SLEEVE */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            style={{ zIndex: 25 }}
          >
            <svg
              viewBox="0 0 320 215"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
            >
              <polygon
                points="0,0 150,107 0,215"
                fill="#F6EFE3"
                stroke="#C5A16B"
                strokeWidth="1"
              />
              <polygon
                points="320,0 170,107 320,215"
                fill="#F3EBDD"
                stroke="#C5A16B"
                strokeWidth="1"
              />
              <polygon
                points="0,215 160,97 320,215"
                fill="#EDE4D3"
                stroke="#C5A16B"
                strokeWidth="1.2"
              />
              <line x1="0" y1="215" x2="160" y2="97" stroke="#DFCA9E" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
              <line x1="320" y1="215" x2="160" y2="97" stroke="#DFCA9E" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
            </svg>

            <div className="absolute bottom-2.5 inset-x-0 flex justify-center opacity-70">
              <LotusMotif className="w-6 h-6 text-[#A67C45]" strokeWidth={1.2} />
            </div>
          </div>

          {/* LAYER 5: INDEPENDENT 3D WAX SEAL (With 5s Timer & Tap Action) */}
          <AnimatePresence>
            {isSealVisible && (
              <div
                className="absolute top-[72px] left-1/2 -translate-x-1/2 pointer-events-auto"
                style={{ zIndex: 45 }}
              >
                <motion.div
                  key="wax-seal"
                  initial={false}
                  animate={
                    stage === 'SEAL_BREAK'
                      ? {
                          scale: [1, 0.93, 1.15, 1.25],
                          opacity: [1, 1, 0.8, 0],
                          y: [0, 2, -8, -18],
                          filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1.4)', 'brightness(1.6)'],
                          transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
                        }
                      : {
                          scale: [1, 1.03, 1],
                          opacity: 1,
                          y: 0,
                          transition: {
                            scale: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
                          },
                        }
                  }
                  exit={{ opacity: 0, scale: 1.25 }}
                >
                  <button
                    type="button"
                    onClick={handleOpenSequence}
                    aria-label="Gold wax seal with S&S monogram - tap to open invitation"
                    className="w-16 h-16 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform flex items-center justify-center relative group focus:outline-none"
                  >
                    {/* Golden Glimmer travelling ring on tap */}
                    {sealGlimmer && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
                        animate={{ scale: 1.35, opacity: [0, 1, 0], rotate: 180 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full border-2 border-[#FFE8A3] pointer-events-none"
                        style={{
                          boxShadow: '0 0 15px rgba(255, 232, 163, 0.8), inset 0 0 10px rgba(255, 232, 163, 0.6)',
                        }}
                      />
                    )}

                    {/* Organic Wax Seal Surface */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl" shapeRendering="geometricPrecision">
                      <defs>
                        <radialGradient id="royalWaxGrad" cx="35%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#FFF2D6" />
                          <stop offset="25%" stopColor="#D4AF37" />
                          <stop offset="65%" stopColor="#A67C45" />
                          <stop offset="100%" stopColor="#5E3E18" />
                        </radialGradient>
                      </defs>

                      <path
                        d="M50 4 C64 3, 76 10, 85 20 C94 30, 97 44, 95 58 C93 72, 84 84, 72 91 C60 98, 44 97, 30 93 C16 89, 6 78, 4 64 C2 50, 8 36, 17 24 C26 12, 36 5, 50 4 Z"
                        fill="url(#royalWaxGrad)"
                      />
                      <circle cx="50" cy="50" r="38" stroke="#4A3414" strokeWidth="1.2" fill="none" opacity="0.55" />
                      <circle cx="50" cy="50" r="35" stroke="#FFF2D6" strokeWidth="1.2" strokeDasharray="2.5 2.5" fill="none" opacity="0.9" />
                      <circle cx="50" cy="50" r="30" fill="#8C632F" fillOpacity="0.45" />
                    </svg>

                    {/* Master S&S Monogram Center (Correct Orientation!) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <SSMonogram size={38} variant="seal" />
                    </div>
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================
            INSTRUCTION & 5-SECOND COUNTDOWN INDICATOR
            ======================================================== */}
        <AnimatePresence>
          {stage === 'SEALED' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex flex-col items-center gap-1.5 pointer-events-none"
            >
              <div className="flex items-center gap-2 text-xs font-sans text-[#EAD9B8] tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="font-medium">Tap the golden seal to open</span>
              </div>

              {/* 5-Second Grace Countdown Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-[#C5A16B]/30 text-[10px] font-sans text-[#C5A16B] tracking-wider">
                <span>Opening automatically in</span>
                <span className="font-bold text-[#FFFDF8] w-3 text-center">{countdownSeconds}s</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ========================================================
          GOLDEN CURTAIN TRANSITION PANELS
          Gracefully sweep open when "DISCOVER OUR WEDDING" is tapped
          ======================================================== */}
      <AnimatePresence>
        {stage === 'CURTAIN_TRANSITION' && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {/* Left Curtain */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#201915] via-[#3D2D23] to-[#523E30] border-r-2 border-[#D4AF37] shadow-2xl"
            />
            {/* Right Curtain */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#201915] via-[#3D2D23] to-[#523E30] border-l-2 border-[#D4AF37] shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
