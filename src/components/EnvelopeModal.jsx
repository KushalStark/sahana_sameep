import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCcw, Sparkles, MapPin, Calendar, Navigation } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { CornerFlourish, LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';
import { weddingAudio } from '../utils/audioSynth';
import { formatGuestGreeting } from '../utils/guestPersonalization';

/**
 * ====================================================================
 * GRAND 3D PHYSICAL WEDDING ENVELOPE & INVITATION REVEAL
 * ====================================================================
 * 
 * Strict Fixes Implemented:
 * 1. ZERO data leakage when closed:
 *    - Card content has opacity: 0 when closed.
 *    - Bottom of card is strictly clipped at envelope bottom fold via clip-path.
 *    - Not a single word, date, or button extends outside the envelope when sealed.
 * 2. Real CSS 3D top flap rotation:
 *    - Physical hinge at top center rotating 0deg -> -180deg.
 *    - Inside of flap shows rich champagne lining (#EDE2CE) with fold shading.
 *    - Golden cavity glow illuminates inside the envelope when flap opens.
 * 3. Independent 3D wax seal (z-index: 45):
 *    - Directly clickable, never blocked by lower layers.
 *    - Reacts on tap: presses inward, sweeps golden shimmer ring, lifts, and
 *      dissolves into golden sparkle particles before the flap swings open.
 * 4. Card emergence:
 *    - Starts submerged inside the physical pocket sleeve.
 *    - Slides vertically upwards out of the pocket in 3D once flap is open.
 *    - Settles in foreground with staggered typographic reveal.
 *    - Prominent "ENTER WEDDING WEBSITE" button.
 * 5. Dynamic Personalized Greeting:
 *    - Safely derived from ?guest=... with fallback to "Dear Family & Friends".
 * 6. Repositioned Hierarchy:
 *    - "YOU HAVE A SPECIAL INVITATION" immediately above envelope.
 *    - "Tap the golden seal to open" immediately below seal/envelope.
 */
export default function EnvelopeModal({ wedding, guestName, guestGreeting, onEnterWebsite }) {
  // State machine: 'CLOSED' | 'SEAL_BREAK' | 'FLAP_OPEN' | 'INVITATION_REVEAL' | 'READY' | 'CLOSING'
  const [stage, setStage] = useState('CLOSED');
  const [sealGlimmer, setSealGlimmer] = useState(false);
  const timersRef = useRef([]);

  const greetingData = guestGreeting || formatGuestGreeting(guestName);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autoOpen') === '1' || params.get('open') === 'true') {
        const t = setTimeout(() => {
          handleOpen();
        }, 400);
        timersRef.current.push(t);
      }
    }
    return () => clearAllTimers();
  }, []);

  // Golden particle burst when seal detaches
  const triggerSealParticles = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { x: 0.5, y: 0.44 },
        colors: ['#D4AF37', '#E5CCA0', '#F7E8CE', '#A67C45', '#FFFDF8'],
        disableForReducedMotion: true,
        ticks: 150,
        gravity: 0.85,
        scalar: 0.85,
      });
    } catch (e) {}
  };

  // Celebration golden shower when card settles
  const triggerSettledParticles = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 65,
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
  // CINEMATIC OPENING SEQUENCE
  // ==================================================================
  const handleOpen = (e) => {
    e?.stopPropagation?.();
    if (stage !== 'CLOSED') return;
    clearAllTimers();

    // 0.0s: Seal activates & harp chime
    setStage('SEAL_BREAK');
    setSealGlimmer(true);

    try {
      weddingAudio.playNote(523.25, 0, 1.8, 0.08); // C5
      setTimeout(() => weddingAudio.playNote(659.25, 0.12, 2.0, 0.07), 120); // E5
      setTimeout(() => weddingAudio.playNote(783.99, 0.25, 2.2, 0.06), 250); // G5
      setTimeout(() => weddingAudio.playNote(1046.50, 0.4, 2.5, 0.05), 400); // C6
    } catch (e) {}

    // 0.40s: Seal detaches with golden burst
    const t1 = setTimeout(() => {
      triggerSealParticles();
    }, 400);
    timersRef.current.push(t1);

    // 0.75s: Top flap rotates open physically (-180deg)
    const t2 = setTimeout(() => {
      setStage('FLAP_OPEN');
    }, 750);
    timersRef.current.push(t2);

    // 1.30s: Invitation card slides vertically upward out of envelope
    const t3 = setTimeout(() => {
      setStage('INVITATION_REVEAL');
    }, 1300);
    timersRef.current.push(t3);

    // 2.65s: Card settles in center of screen; website button pulses
    const t4 = setTimeout(() => {
      setStage('READY');
      triggerSettledParticles();
    }, 2650);
    timersRef.current.push(t4);
  };

  // ==================================================================
  // REVERSE CLOSING SEQUENCE (RE-SEAL)
  // ==================================================================
  const handleClose = (e) => {
    e?.stopPropagation?.();
    if (stage !== 'READY' && stage !== 'INVITATION_REVEAL') return;
    clearAllTimers();

    setStage('CLOSING');

    const t = setTimeout(() => {
      setStage('CLOSED');
      setSealGlimmer(false);
    }, 1200);
    timersRef.current.push(t);
  };

  const isFlapOpen = stage === 'FLAP_OPEN' || stage === 'INVITATION_REVEAL' || stage === 'READY';
  const isCardEmerging = stage === 'INVITATION_REVEAL' || stage === 'READY';
  const isCardSettled = stage === 'READY';
  const isSealVisible = stage === 'CLOSED' || stage === 'SEAL_BREAK';
  const isBusy = stage === 'SEAL_BREAK' || stage === 'FLAP_OPEN' || stage === 'CLOSING';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#191310] flex justify-center items-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Mobile-Centred Stage Column (strictly max-w-[390px]) */}
      <div className="w-full max-w-[390px] h-full min-h-[100dvh] flex flex-col items-center justify-between px-3 py-3 relative overflow-hidden select-none touch-manipulation">
        {/* Ambient Vignette & Warm Candlelight Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(78, 56, 38, 0.65) 0%, rgba(20, 15, 12, 0.98) 75%)',
          }}
        />

        {/* Top Header Bar: Monogram, Title & Skip Button */}
        <header className="w-full flex items-center justify-between z-50 pt-[env(safe-area-inset-top,8px)] px-1">
          <div className="flex items-center gap-2">
            <SSMonogram size={26} variant="gold" />
            <span className="font-serif text-xs tracking-[0.22em] text-[#EAD9B8] uppercase font-medium">
              Sahana &amp; Sameep
            </span>
          </div>

          <button
            type="button"
            onClick={onEnterWebsite}
            aria-label="Skip to wedding website"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF8] text-[#352C28] text-[10px] font-sans uppercase tracking-widest font-semibold border border-[#C5A16B] shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <span>Skip</span>
            <ArrowRight className="w-3 h-3 text-[#A67C45]" />
          </button>
        </header>

        {/* ========================================================
            PERSONALIZED WELCOME GREETING & SPECIAL INVITATION BANNER
            ======================================================== */}
        <motion.div
          animate={{
            opacity: isFlapOpen ? 0 : 1,
            y: isFlapOpen ? -14 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center text-center mt-1 mb-2 z-40 px-2 pointer-events-none"
        >
          {/* Personalized Guest Greeting Badge */}
          <div className="mb-1.5">
            <span className="font-sans text-[8.5px] uppercase tracking-[0.24em] text-[#C5A16B] font-bold block mb-0.5">
              {greetingData.label}
            </span>
            <h1 className="font-serif text-lg text-[#FFFDF8] font-semibold tracking-wide leading-tight">
              {greetingData.greeting}
            </h1>
            <p className="font-serif text-[11px] text-[#D8C29D] italic mt-0.5">
              {greetingData.subtitle}
            </p>
          </div>

          {/* Special Invitation Pill (Immediately Above Envelope) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF8]/95 border border-[#C5A16B]/60 text-[#352C28] shadow-md text-[10px] font-sans tracking-widest uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-[#C5A16B] animate-pulse" />
            <span>YOU HAVE A SPECIAL INVITATION</span>
            <Sparkles className="w-3 h-3 text-[#C5A16B] animate-pulse" />
          </div>
        </motion.div>

        {/* ========================================================
            3D STAGE CONTAINER (Strict Perspective 1200px)
            ======================================================== */}
        <div
          className="relative w-full max-w-[360px] flex-1 flex flex-col items-center justify-center my-auto"
          style={{
            perspective: '1200px',
            WebkitPerspective: '1200px',
          }}
        >
          {/* ========================================================
              THE GRAND 3D ENVELOPE RIG
              Width: 316px, Height: 215px
              ======================================================== */}
        <div
          onClick={stage === 'CLOSED' ? handleOpen : undefined}
          role="button"
          tabIndex={stage === 'CLOSED' ? 0 : -1}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && stage === 'CLOSED' && handleOpen()}
          aria-label={stage === 'CLOSED' ? 'Tap to open invitation envelope' : 'Invitation card'}
          className={`relative w-[316px] h-[215px] flex items-center justify-center transition-transform duration-500 ${
            stage === 'CLOSED' ? 'cursor-pointer hover:scale-[1.015] active:scale-[0.985]' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          {/* Contact Shadow Beneath Envelope */}
          <div className="absolute -bottom-6 inset-x-4 h-6 bg-black/55 blur-lg rounded-full pointer-events-none" />

          {/* ======================================================
              LAYER 1: BACK WALL & INNER GOLD LINING (zIndex: 5)
              ====================================================== */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#EBE1D0] border border-[#C5A16B] shadow-2xl overflow-hidden"
            style={{ zIndex: 5 }}
          >
            {/* Subtle Damask Pattern inside */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#A67C45_1.2px,transparent_1.2px)] [background-size:10px_10px]" />
            <div className="absolute inset-1.5 rounded-xl border border-[#C5A16B]/35 pointer-events-none" />

            {/* Inner Crest visible when card emerges */}
            <div className="absolute top-4 inset-x-0 flex flex-col items-center opacity-40">
              <LotusMotif className="w-7 h-7 text-[#A67C45]" strokeWidth={1.2} />
              <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-[#A67C45] mt-0.5">
                Sahana &amp; Sameep
              </span>
            </div>

            {/* Soft Golden Cavity Glow when Flap Opens */}
            <div
              className={`absolute inset-x-0 top-0 h-28 pointer-events-none transition-opacity duration-1000 ${
                isFlapOpen ? 'opacity-85' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(ellipse at 50% 20%, rgba(212, 175, 55, 0.5) 0%, rgba(197, 161, 107, 0.15) 55%, transparent 80%)',
              }}
            />
          </div>

          {/* ======================================================
              LAYER 2: TOP HINGED 3D FLAP (Rotates 0deg -> -180deg)
              Transform Origin: top center (actual physical hinge)
              When Closed: zIndex 30
              When Open: zIndex 6 (behind card, in front of back wall)
              ====================================================== */}
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
                      rotateX: { duration: 0.75, delay: stage === 'CLOSING' ? 0.45 : 0, ease: 'easeOut' },
                      zIndex: { delay: stage === 'CLOSING' ? 0.45 : 0 },
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
            {/* FRONT FACE (Visible when Closed: Ivory triangle pointing down) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(0deg)',
              }}
            >
              <svg
                viewBox="0 0 316 118"
                className="w-full h-full drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
              >
                <polygon
                  points="0,0 158,116 316,0"
                  fill="#FDF8EE"
                  stroke="#C5A16B"
                  strokeWidth="1.2"
                />
                <line x1="8" y1="5" x2="158" y2="110" stroke="#D8C29D" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                <line x1="308" y1="5" x2="158" y2="110" stroke="#D8C29D" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
              </svg>
            </div>

            {/* BACK / INNER FACE (Visible when Open: Darker Champagne lining pointing up) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              <svg
                viewBox="0 0 316 118"
                className="w-full h-full drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
              >
                <polygon
                  points="0,0 158,116 316,0"
                  fill="#EDE2CE"
                  stroke="#C5A16B"
                  strokeWidth="1.2"
                />
                <path d="M35 15 L158 102 L281 15" stroke="#C5A16B" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
                <polygon
                  points="0,0 316,0 280,20 36,20"
                  fill="#000000"
                  fillOpacity="0.06"
                />
              </svg>
            </div>
          </motion.div>

          {/* ======================================================
              LAYER 3: INVITATION CARD SLEEVE & EMERGING CARD
              - Strict bottom clipping prevents any details from showing outside when closed.
              - Content has opacity: 0 when closed to guarantee zero data overlap.
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
                      y: -180,
                      scale: 1,
                      rotateX: 0,
                      transition: {
                        y: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
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
              className="absolute inset-x-2.5 top-2 h-[352px] bg-[#FFFDF8] rounded-2xl border-2 border-[#C5A16B] shadow-2xl p-3.5 flex flex-col justify-between text-center text-[#352C28] overflow-hidden pointer-events-auto"
              style={{
                transformOrigin: 'bottom center',
                willChange: 'transform',
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

              {/* Double Gold Inner Border */}
              <div className="absolute inset-1.5 border border-[#C5A16B]/50 rounded-xl pointer-events-none" />
              <div className="absolute inset-2 border border-[#C5A16B]/25 rounded-lg pointer-events-none" />

              {/* Card Main Typography (Strictly hidden when closed, fades in smoothly as card rises) */}
              <div
                className="relative z-10 pt-0.5 flex flex-col items-center transition-opacity duration-700"
                style={{ opacity: isCardEmerging ? 1 : 0 }}
              >
                {/* Dynamic Personalized Guest Greeting at Card Top */}
                <div className="mb-1 flex flex-col items-center">
                  <span className="font-sans text-[7.5px] uppercase tracking-[0.22em] text-[#8C632F] font-bold">
                    {greetingData.label}
                  </span>
                  <span className="font-serif text-[12px] font-bold text-[#2A1F1B] tracking-wide">
                    {greetingData.greeting}
                  </span>
                </div>

                {/* Master S&S Monogram Logo */}
                <div className="mb-0.5">
                  <SSMonogram size={38} variant="gold" />
                </div>

                <p className="font-sans text-[8px] uppercase tracking-[0.24em] text-[#5C4D44] font-bold mb-0.5 px-2">
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
                  Cordially invite you to join us<br />and bless us on our wedding day.
                </p>

                {/* Wedding Date, Muhurtha & Verified Venue */}
                <div className="mt-1.5 py-1.5 border-y border-[#C5A16B]/35 w-full max-w-[260px] text-center bg-[#FAF6EF]/60 rounded-lg">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-serif font-bold text-[#2A1F1B] tracking-wider uppercase">
                    <Calendar className="w-3.5 h-3.5 text-[#A67C45]" />
                    <span>MONDAY, 8 FEBRUARY 2027</span>
                  </div>
                  <div className="text-[10px] font-sans font-bold text-[#8B2628] mt-0.5 tracking-wide">
                    Muhurtha: 12:35 PM
                  </div>
                  <div className="mt-0.5">
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

              {/* Bottom Card Actions: Enter Website Button */}
              <div
                className="relative z-10 pt-1 flex flex-col gap-1.5 transition-opacity duration-700"
                style={{ opacity: isCardEmerging ? 1 : 0 }}
              >
                <motion.button
                  type="button"
                  onClick={onEnterWebsite}
                  initial={false}
                  animate={{
                    scale: isCardSettled ? [1, 1.025, 1] : 1,
                    boxShadow: isCardSettled
                      ? '0 10px 25px -4px rgba(140, 99, 47, 0.5)'
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
                  }}
                  transition={{
                    duration: 2,
                    repeat: isCardSettled ? Infinity : 0,
                    repeatType: 'reverse',
                  }}
                  className="w-full min-h-[48px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#8C632F] via-[#B89255] to-[#8C632F] text-white shadow-lg active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.22em] font-bold">
                    <span>DISCOVER OUR WEDDING</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-[10px] text-[#FFF4DF] tracking-wide opacity-90">
                    Explore our celebration, memories and wedding details.
                  </span>
                </motion.button>

                <div className="flex items-center justify-between px-1 text-[9.5px]">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isBusy}
                    className="font-sans uppercase tracking-wider text-[#786C63] hover:text-[#A67C45] py-0.5 flex items-center gap-1 active:scale-95 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-[#C5A16B]" />
                    <span>Fold &amp; Close</span>
                  </button>

                  <a
                    href="https://www.google.com/maps?ll=14.002067,75.256803&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15410651585215520925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans uppercase tracking-wider text-[#A67C45] hover:underline py-0.5 flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ======================================================
              LAYER 4: FRONT ENVELOPE POCKET (Left, Right, Bottom)
              zIndex: 25 (Creates physical sleeve concealing the card)
              ====================================================== */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            style={{ zIndex: 25 }}
          >
            <svg
              viewBox="0 0 316 215"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
            >
              {/* Left Flap */}
              <polygon
                points="0,0 148,107 0,215"
                fill="#F6EFE3"
                stroke="#C5A16B"
                strokeWidth="1"
              />

              {/* Right Flap */}
              <polygon
                points="316,0 168,107 316,215"
                fill="#F3EBDD"
                stroke="#C5A16B"
                strokeWidth="1"
              />

              {/* Bottom Triangular Pocket Flap */}
              <polygon
                points="0,215 158,97 316,215"
                fill="#EDE4D3"
                stroke="#C5A16B"
                strokeWidth="1.2"
              />

              {/* Subtle Gold Crease Dashes */}
              <line x1="0" y1="215" x2="158" y2="97" stroke="#DFCA9E" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
              <line x1="316" y1="215" x2="158" y2="97" stroke="#DFCA9E" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.75" />
            </svg>

            {/* Bottom Pocket Lotus Emblem */}
            <div className="absolute bottom-2.5 inset-x-0 flex justify-center opacity-70">
              <LotusMotif className="w-6 h-6 text-[#A67C45]" strokeWidth={1.2} />
            </div>
          </div>

          {/* ======================================================
              LAYER 5: INDEPENDENT 3D WAX SEAL (Explicit zIndex: 45)
              Always on top when closed; clickable; detaches & dissolves
              ====================================================== */}
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
                          scale: [1, 0.93, 1.14, 1.25],
                          opacity: [1, 1, 0.8, 0],
                          y: [0, 2, -8, -18],
                          filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1.4)', 'brightness(1.6)'],
                          transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
                        }
                      : {
                          scale: 1,
                          opacity: 1,
                          y: 0,
                          filter: 'brightness(1)',
                        }
                  }
                  exit={{ opacity: 0, scale: 1.25 }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Clickable Gold Wax Seal Button */}
                  <button
                    type="button"
                    onClick={handleOpen}
                    aria-label="Gold wax seal with S&S monogram - tap to open invitation"
                    className="w-16 h-16 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform flex items-center justify-center relative group focus:outline-none"
                  >
                    {/* Golden Glimmer Travelling Ring on tap */}
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

                    {/* Organic Gold Wax Seal Surface */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl" shapeRendering="geometricPrecision">
                      <defs>
                        <radialGradient id="royalWaxGrad" cx="35%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#FFF2D6" />
                          <stop offset="25%" stopColor="#D4AF37" />
                          <stop offset="65%" stopColor="#A67C45" />
                          <stop offset="100%" stopColor="#5E3E18" />
                        </radialGradient>
                      </defs>

                      {/* Scalloped Wax Boundary */}
                      <path
                        d="M50 4 C64 3, 76 10, 85 20 C94 30, 97 44, 95 58 C93 72, 84 84, 72 91 C60 98, 44 97, 30 93 C16 89, 6 78, 4 64 C2 50, 8 36, 17 24 C26 12, 36 5, 50 4 Z"
                        fill="url(#royalWaxGrad)"
                      />
                      <circle cx="50" cy="50" r="38" stroke="#4A3414" strokeWidth="1.2" fill="none" opacity="0.55" />
                      <circle cx="50" cy="50" r="35" stroke="#FFF2D6" strokeWidth="1.2" strokeDasharray="2.5 2.5" fill="none" opacity="0.9" />
                      <circle cx="50" cy="50" r="30" fill="#8C632F" fillOpacity="0.45" />
                    </svg>

                    {/* Embossed S&S Monogram Center */}
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
            INSTRUCTION PROMPT (Directly Beneath Envelope & Seal)
            ======================================================== */}
        <AnimatePresence>
          {stage === 'CLOSED' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex items-center gap-2 text-xs font-sans text-[#EAD9B8] tracking-wider pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-medium">Tap the golden seal to open</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        {/* Bottom Footer Details */}
        <footer className="w-full max-w-[390px] text-center pb-[env(safe-area-inset-bottom,8px)] z-40">
          {stage === 'CLOSED' ? (
            <p className="font-sans text-[11px] text-[#C5A16B] tracking-wider">
              Vishwa Maanava Sabha Bhavana, Ripponpete • Feb 8, 2027
            </p>
          ) : (
            <p className="font-sans text-[11px] text-[#EAD9B8] tracking-wider">
              Sahana &amp; Sameep • Official Wedding Invitation
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}
