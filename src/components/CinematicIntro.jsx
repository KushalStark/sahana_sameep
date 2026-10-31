import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCw, Sparkles, MapPin, Calendar, Clock, Navigation } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { CornerFlourish, LotusMotif, OrnamentalDivider, GaneshaMotif } from '../assets/BotanicalElements';
import VelvetCurtains from './VelvetCurtains';
import { weddingAudio } from '../utils/audioSynth';
import { formatGuestGreeting } from '../utils/guestPersonalization';

/**
 * ====================================================================
 * CINEMATIC WEDDING STAGE INTRO — SAHANA & SAMEEP
 * ====================================================================
 * Grand Royal Indian Wedding Stage Experience:
 * - Full-screen deep wine-burgundy velvet curtains with vertical pleats
 * - Gold embroidered lace leading borders & braided bullion tassel tiebacks
 * - Traditional Indian stage pelmet (scalloped valance) across top
 * - Warm golden backlight leakage pulsing from center stage
 * - Curtains slide gracefully apart (2.2s) and gather at the sides,
 *   elegantly framing the invitation stage without disappearing
 * - Unified stage composition:
 *   1. Custom S&S Monogram & Wedding Branding
 *   2. Floating Ivory Welcome Plaque with personalized guest name
 *   3. "YOU HAVE A SPECIAL INVITATION" gold badge
 *   4. Physical 3D Ivory Envelope with S&S Gold Wax Seal
 *   5. "Tap the golden seal to open" with 5s countdown timer
 *   6. Realistic 3D opening: seal breaks, flap rotates, card emerges
 *   7. 3D Flip Card: English Front & Kannada Back (ಸಹನ ಮತ್ತು ಸಮೀಪ್)
 *   8. "DISCOVER OUR WEDDING" button triggering velvet curtain close
 * - Mobile-first layout designed for 320px–430px viewports (100svh)
 */
export default function CinematicIntro({
  wedding,
  guestGreeting,
  onComplete,
}) {
  const prefersReducedMotion = useReducedMotion();

  // Curtains state: open/closed & transition
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Envelope Stages: 'SEALED' | 'SEAL_BREAK' | 'FLAP_OPEN' | 'EMERGING' | 'REVEALED'
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
  // CINEMATIC CURTAIN OPENING & 5-SECOND COUNTDOWN SEQUENCE
  // ==================================================================
  useEffect(() => {
    if (prefersReducedMotion) {
      setCurtainsOpen(true);
      setStage('REVEALED');
      return;
    }

    // Step 1: Curtains begin separating after a brief dramatic pause (450ms)
    const curtainTimer = setTimeout(() => {
      setCurtainsOpen(true);
    }, 450);

    // Step 2: 5-second countdown timer starts as curtains begin opening
    countdownIntervalRef.current = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Step 3: Automatic opening sequence fires if no interaction within 5.5s
    timerRef.current = setTimeout(() => {
      handleOpenSequence();
    }, 5500);

    return () => {
      clearTimeout(curtainTimer);
      clearAllTimers();
    };
  }, [prefersReducedMotion]);

  // Golden particle burst when seal detaches
  const triggerSealParticles = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { x: 0.5, y: 0.48 },
        colors: ['#D4AF37', '#FFE8A3', '#F7E8CE', '#A67C45', '#FFFDF8'],
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
        particleCount: 55,
        spread: 75,
        origin: { x: 0.5, y: 0.38 },
        colors: ['#D4AF37', '#FFE8A3', '#F7E8CE', '#C5A16B'],
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
  // VELVET CURTAIN CLOSE TRANSITION INTO MAIN WEBSITE
  // ==================================================================
  const handleDiscoverWedding = () => {
    if (isTransitioning) return;
    clearAllTimers();

    // Trigger velvet curtains drawing closed
    setIsTransitioning(true);

    try {
      weddingAudio.playNote(523.25, 0, 2.2, 0.08);
      setTimeout(() => weddingAudio.playNote(659.25, 0.15, 2.2, 0.07), 150);
      setTimeout(() => weddingAudio.playNote(783.99, 0.3, 2.2, 0.06), 300);
    } catch (e) {}

    // Complete transition after curtains close
    setTimeout(() => {
      onComplete?.();
    }, 1250);
  };

  const handleSkip = () => {
    clearAllTimers();
    onComplete?.();
  };

  const isFlapOpen = stage === 'FLAP_OPEN' || stage === 'EMERGING' || stage === 'REVEALED';
  const isCardEmerging = stage === 'EMERGING' || stage === 'REVEALED';
  const isCardSettled = stage === 'REVEALED';
  const isSealVisible = stage === 'SEALED' || stage === 'SEAL_BREAK';

  // Ambient floating golden dust particles
  const goldDustParticles = [
    { id: 1, left: '15%', delay: 0.2, duration: 8.5, size: 3.5 },
    { id: 2, left: '28%', delay: 1.6, duration: 9.0, size: 4.5 },
    { id: 3, left: '42%', delay: 0.8, duration: 7.8, size: 3.0 },
    { id: 4, left: '58%', delay: 2.2, duration: 8.2, size: 4.0 },
    { id: 5, left: '72%', delay: 1.2, duration: 9.5, size: 3.2 },
    { id: 6, left: '85%', delay: 0.4, duration: 7.4, size: 4.2 },
    { id: 7, left: '35%', delay: 2.8, duration: 8.8, size: 3.8 },
    { id: 8, left: '65%', delay: 3.2, duration: 9.2, size: 4.8 },
  ];

  return (
    <div
      className="fixed inset-0 z-50 w-full h-[100svh] min-h-[100svh] bg-[#140407] flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: '1400px' }}
      aria-label="Sahana and Sameep Wedding Invitation Stage"
    >
      {/* ============================================================
          WARM ROYAL STAGE BACKDROP & AMBIENT SPOTLIGHT
          ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 46%, rgba(142, 22, 39, 0.42) 0%, rgba(58, 8, 16, 0.85) 55%, rgba(18, 3, 6, 0.98) 85%),
            radial-gradient(circle at 50% 20%, rgba(255, 230, 160, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle Indian Damask Jali Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

      {/* Soft Floating Golden Dust Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {goldDustParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: '105svh', opacity: 0, scale: 0.6 }}
              animate={{
                y: '-10svh',
                opacity: [0, 0.85, 0.85, 0],
                scale: [0.6, 1.2, 0.8],
                x: [0, 12, -12, 6],
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
                height: p.size,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FFF6DA 0%, #D4AF37 60%, rgba(212,175,55,0) 100%)',
                boxShadow: '0 0 8px rgba(255, 230, 160, 0.8)',
              }}
              className="absolute pointer-events-none"
            />
          ))}
        </div>
      )}

      {/* Top Header Bar: Monogram & Skip Intro */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-3.5 sm:px-8 py-2.5 pt-[calc(0.5rem+env(safe-area-inset-top,0px))]">
        <div className="flex items-center gap-2">
          <SSMonogram size={24} variant="gold" />
          <span className="font-serif text-[11px] sm:text-xs tracking-[0.16em] text-[#F3E5C8] uppercase font-medium drop-shadow-sm truncate max-w-[125px] sm:max-w-none">
            Sahana &amp; Sameep
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip intro and discover full wedding website"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/65 active:scale-95 backdrop-blur-md border border-[#D4AF37]/50 text-[#F5E6C8] text-[10.5px] font-sans uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      </header>

      {/* ============================================================
          CENTRAL REVEALED INVITATION STAGE (Strictly Mobile-Friendly)
          ============================================================ */}
      <div className="relative z-20 w-full max-w-[420px] px-3.5 flex flex-col items-center justify-center my-auto pt-6 sm:pt-8">

        {/* ========================================================
            ELEGANT FLOATING INVITATION PLAQUE (Guest Welcome Card)
            Warm Ivory Paper, Double Champagne-Gold Border, Corner Flourishes
            ======================================================== */}
        <motion.div
          animate={{
            opacity: stage === 'SEALED' ? 1 : 0,
            y: stage === 'SEALED' ? 0 : -28,
            scale: stage === 'SEALED' ? 1 : 0.9,
          }}
          transition={{ duration: 0.45 }}
          className={`w-full flex flex-col items-center text-center mb-2.5 z-30 px-2 ${
            stage === 'SEALED' ? '' : 'pointer-events-none'
          }`}
        >
          {/* Welcome Plaque Box */}
          <div className="w-full max-w-[340px] relative px-4 py-3 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#F5EEDD] border border-[#D4AF37]/80 shadow-[0_12px_30px_rgba(0,0,0,0.65),0_0_15px_rgba(212,175,55,0.15)] text-center mb-2 overflow-hidden">
            {/* Inner Double Gold Border */}
            <div className="absolute inset-1.5 rounded-xl border border-[#C5A16B]/40 pointer-events-none" />

            {/* Corner Floral Flourishes */}
            <CornerFlourish className="absolute top-1 left-1 w-4 h-4 text-[#C5A16B] opacity-75" />
            <CornerFlourish className="absolute top-1 right-1 w-4 h-4 text-[#C5A16B] opacity-75 rotate-90" />
            <CornerFlourish className="absolute bottom-1 left-1 w-4 h-4 text-[#C5A16B] opacity-75 -rotate-90" />
            <CornerFlourish className="absolute bottom-1 right-1 w-4 h-4 text-[#C5A16B] opacity-75 rotate-180" />

            {/* Top Delicate Lotus Motif */}
            <div className="flex justify-center mb-0.5">
              <LotusMotif className="w-5 h-5 text-[#C5A16B]" strokeWidth={1.3} />
            </div>

            {/* Sub-label: WITH LOVE, WE WELCOME */}
            <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#8C632F] font-bold block mb-1">
              {greeting.label || 'WITH LOVE, WE WELCOME'}
            </span>

            {/* PERSONALISED GUEST NAME (Most Prominent Feature) */}
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1F1B] tracking-wide leading-tight py-0.5 drop-shadow-xs">
              {greeting.greeting}
            </h1>

            <OrnamentalDivider className="max-w-[120px] mx-auto text-[#C5A16B] my-1" />

            {/* Subtitle */}
            <p className="font-serif text-[11.5px] text-[#5C4D44] italic">
              {greeting.subtitle || 'You are a cherished part of our celebration.'}
            </p>
          </div>

          {/* "YOU HAVE A SPECIAL INVITATION" pill (Directly above envelope) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0307]/85 backdrop-blur-md border border-[#D4AF37]/65 text-[#F5E6C8] shadow-md text-[10px] font-sans tracking-widest uppercase font-semibold">
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
          <div className="absolute -bottom-6 inset-x-4 h-6 bg-black/75 blur-xl rounded-full pointer-events-none" />

          {/* Soft Golden Halo behind Envelope */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />

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
                      y: -215,
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
              className="absolute inset-x-2 top-2 h-[400px] sm:h-[415px] rounded-2xl pointer-events-auto [perspective:1400px]"
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
                  className="absolute inset-0 w-full h-full bg-[#FFFDF8] rounded-2xl border-2 border-[#C5A16B] shadow-2xl p-3.5 sm:p-4 flex flex-col justify-between text-center text-[#352C28] overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                  }}
                >
                  {/* Corner Flourishes */}
                  <CornerFlourish className="absolute top-1 left-1 w-5 h-5 text-[#C5A16B]" />
                  <CornerFlourish className="absolute top-1 right-1 w-5 h-5 text-[#C5A16B] rotate-90" />
                  <CornerFlourish className="absolute bottom-1 left-1 w-5 h-5 text-[#C5A16B] -rotate-90" />
                  <CornerFlourish className="absolute bottom-1 right-1 w-5 h-5 text-[#C5A16B] rotate-180" />

                  {/* Header */}
                  <div>
                    <div className="flex justify-center mb-1">
                      <GaneshaMotif className="w-8 h-8 text-[#A67C45]" strokeWidth={1.3} />
                    </div>
                    <p className="font-kannada text-[11px] text-[#A67C45] tracking-widest font-semibold">
                      || ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ||
                    </p>
                    <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#8C632F] font-bold mt-1">
                      TOGETHER WITH OUR FAMILIES
                    </p>
                  </div>

                  {/* Couple Names */}
                  <div className="my-auto py-1">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B2628] tracking-wide leading-tight">
                      Sahana
                    </h2>
                    <span className="font-serif italic text-sm text-[#A67C45] my-0.5 block">&amp;</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B2628] tracking-wide leading-tight">
                      Sameep
                    </h2>
                    <OrnamentalDivider className="max-w-[130px] mx-auto text-[#C5A16B] my-1" />
                    <p className="font-serif text-xs text-[#5C4D44] italic">
                      Cordially invite you to celebrate our wedding
                    </p>
                  </div>

                  {/* Date & Venue Pill Box */}
                  <div className="bg-[#FAF4E8] rounded-xl border border-[#C5A16B]/40 p-2 sm:p-2.5 space-y-1 text-left text-xs">
                    <div className="flex items-center gap-2 text-[#352C28]">
                      <Calendar className="w-3.5 h-3.5 text-[#A67C45] shrink-0" />
                      <span className="font-semibold text-[11px] sm:text-xs">Monday, 08 February 2027</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5C4D44] text-[10.5px] sm:text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#A67C45] shrink-0" />
                      <span>Muhurtha: 12:35 PM</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#5C4D44] text-[10.5px] sm:text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#A67C45] shrink-0 mt-0.5" />
                      <span className="leading-tight">Vishwamanava Sabhabhavana, Sagara Road, Ripponpete</span>
                    </div>
                  </div>

                  {/* Action Row: Flip Card & Enter Website */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#C5A16B]/30">
                    <button
                      type="button"
                      onClick={() => setIsCardFlipped(true)}
                      className="px-2.5 py-1 rounded-full bg-[#FAF4E8] hover:bg-[#F3EADB] border border-[#C5A16B]/60 text-[10px] font-sans font-semibold text-[#8C632F] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>ಕನ್ನಡ ಲಗ್ನ ಪತ್ರಿಕೆ</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDiscoverWedding}
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8B2628] to-[#6E1C1E] hover:from-[#A12E30] hover:to-[#8B2628] text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <span>DISCOVER OUR WEDDING</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ====================================================
                    BACK FACE: TRADITIONAL KANNADA INVITATION
                    ==================================================== */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#FFFDF8] rounded-2xl border-2 border-[#C5A16B] shadow-2xl p-4 flex flex-col justify-between text-center text-[#352C28] overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <CornerFlourish className="absolute top-1 left-1 w-5 h-5 text-[#C5A16B]" />
                  <CornerFlourish className="absolute top-1 right-1 w-5 h-5 text-[#C5A16B] rotate-90" />
                  <CornerFlourish className="absolute bottom-1 left-1 w-5 h-5 text-[#C5A16B] -rotate-90" />
                  <CornerFlourish className="absolute bottom-1 right-1 w-5 h-5 text-[#C5A16B] rotate-180" />

                  {/* Sacred Kannada Invocation */}
                  <div>
                    <div className="flex justify-center mb-1">
                      <GaneshaMotif className="w-8 h-8 text-[#A67C45]" strokeWidth={1.3} />
                    </div>
                    <p className="font-kannada text-xs font-bold text-[#8B2628] tracking-wide">
                      || ಶ್ರೀ ಮಹಾಗಣಪತಯೇ ನಮಃ ||
                    </p>
                    <p className="font-kannada text-[11px] text-[#A67C45] font-semibold mt-0.5">
                      ಶುಭ ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ
                    </p>
                  </div>

                  {/* Couple Kannada Names */}
                  <div className="my-auto py-1">
                    <h2 className="font-kannada text-2xl sm:text-3xl font-bold text-[#8B2628] leading-tight">
                      ಸಹನ
                    </h2>
                    <span className="font-kannada text-xs text-[#A67C45] my-0.5 block font-semibold">ಮತ್ತು</span>
                    <h2 className="font-kannada text-2xl sm:text-3xl font-bold text-[#8B2628] leading-tight">
                      ಸಮೀಪ್
                    </h2>
                    <OrnamentalDivider className="max-w-[130px] mx-auto text-[#C5A16B] my-1" />
                    <p className="font-kannada text-xs text-[#5C4D44]">
                      ಇವರ ಶುಭ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ತಮಗೆಲ್ಲರಿಗೂ ಆದರದ ಸುಸ್ವಾಗತ
                    </p>
                  </div>

                  {/* Kannada Event Details */}
                  <div className="bg-[#FAF4E8] rounded-xl border border-[#C5A16B]/40 p-2.5 space-y-1 text-left font-kannada text-xs">
                    <p className="font-semibold text-[#352C28]">
                      ದಿನಾಂಕ: ೦೮-೦೨-೨೦೨೭, ಸೋಮವಾರ
                    </p>
                    <p className="text-[#5C4D44] text-[11px]">
                      ಮುಹೂರ್ತ: ಮಧ್ಯಾಹ್ನ: ೧೨:೩೫
                    </p>
                    <p className="text-[#5C4D44] text-[11px] leading-tight">
                      ಸ್ಥಳ: ವಿಶ್ವಮಾನವ ಸಭಾಭವನ, ಸಾಗರ ರಸ್ತೆ, ರಿಪ್ಪನ್ ಪೇಟೆ
                    </p>
                  </div>

                  {/* Flip Back & Maps Row */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#C5A16B]/30">
                    <button
                      type="button"
                      onClick={() => setIsCardFlipped(false)}
                      className="px-2.5 py-1 rounded-full bg-[#FAF4E8] hover:bg-[#F3EADB] border border-[#C5A16B]/60 text-[10px] font-sans font-semibold text-[#8C632F] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>English Card</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-kannada font-semibold text-[#8B2628] hover:underline flex items-center gap-1 py-1 text-xs"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>ದಾರಿ ನಕ್ಷೆ</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleDiscoverWedding}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#8B2628] to-[#6E1C1E] text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        <span>ಮುಂದುವರಿಯಿರಿ</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
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

                    {/* Organic Royal Gold Wax Seal Surface */}
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

                    {/* Master S&S Monogram Center (Correct Vector Orientation) */}
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
              className="mt-3.5 flex flex-col items-center gap-1.5 pointer-events-none"
            >
              <div className="flex items-center gap-2 text-xs font-sans text-[#F5E6C8] tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="font-medium">Tap the golden seal to open</span>
              </div>

              {/* 5-Second Grace Countdown Badge */}
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-[#D4AF37]/40 text-[10px] font-sans text-[#EAD9B8] tracking-wider shadow-sm">
                <span>Opening automatically in</span>
                <span className="font-bold text-[#FFE8A3] w-3 text-center">{countdownSeconds}s</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================
            BOTTOM STAGE FOOTER: Date, Venue & Blessing
            ======================================================== */}
        <motion.div
          animate={{
            opacity: stage === 'SEALED' ? 0.85 : 0,
            y: stage === 'SEALED' ? 0 : 12,
          }}
          transition={{ duration: 0.35 }}
          className="mt-3 flex flex-col items-center text-center pointer-events-none"
        >
          <p className="font-serif text-[10.5px] text-[#EAD9B8] tracking-widest uppercase">
            08 February 2027 • Vishwamanava Sabhabhavana, Sagara Road, Ripponpete
          </p>
        </motion.div>

      </div>

      {/* ============================================================
          LUXURY WEDDING STAGE VELVET CURTAINS & PELMET OVERLAY
          ============================================================ */}
      <VelvetCurtains
        isOpen={curtainsOpen}
        isTransitioning={isTransitioning}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  );
}
