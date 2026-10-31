import React from 'react';
import { motion } from 'framer-motion';
import { LotusMotif } from '../assets/BotanicalElements';

/**
 * ====================================================================
 * LUXURY WEDDING STAGE VELVET CURTAINS & PELMET
 * ====================================================================
 * Authentic theatrical wedding-stage velvet curtains for Sahana & Sameep:
 * - Deep wine-burgundy velvet fabric with realistic vertical pleat folds,
 *   soft specular highlights along raised folds, and deep shadow troughs.
 * - Champagne-gold embroidered lace borders along leading edges.
 * - Braided gold rope & bullion fringe tassel tiebacks.
 * - Grand traditional Indian wedding stage pelmet / scalloped valance.
 * - Warm golden backlight leakage from center stage.
 * - Curtains slide gracefully outward and gather at the sides, framing
 *   the invitation stage without disappearing.
 */

export default function VelvetCurtains({
  isOpen = false,
  isTransitioning = false,
  prefersReducedMotion = false,
}) {
  const openState = prefersReducedMotion ? true : isOpen;

  // Curtain animation transition easing (smooth realistic fabric drag)
  const curtainTransition = prefersReducedMotion
    ? { duration: 0.1 }
    : { duration: 2.2, ease: [0.22, 1, 0.36, 1] };

  const closeTransition = prefersReducedMotion
    ? { duration: 0.1 }
    : { duration: 1.2, ease: [0.32, 0, 0.24, 1] };

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ============================================================
          WARM GOLDEN STAGE BACKLIGHT (Emerges from behind center seam)
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.85 }}
        animate={{
          opacity: openState ? 0 : [0.35, 0.9, 0.45],
          scale: openState ? 1.5 : 1,
        }}
        transition={{
          opacity: { duration: 2.2, repeat: openState ? 0 : Infinity, ease: 'easeInOut' },
          scale: { duration: 1.8 },
        }}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 225, 140, 0.5) 0%, rgba(212, 175, 55, 0.25) 45%, transparent 75%)',
          filter: 'blur(16px)',
        }}
      />

      {/* ============================================================
          LEFT VELVET CURTAIN PANEL
          Covers 0% to 52% when closed; compresses into side drape (0% to 14%) when open
          ============================================================ */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={
          isTransitioning
            ? { scaleX: 1, transition: closeTransition }
            : openState
            ? { scaleX: 0.28, transition: curtainTransition }
            : { scaleX: 1 }
        }
        style={{
          transformOrigin: 'left center',
          willChange: 'transform',
        }}
        className="absolute inset-y-0 left-0 w-[52%] h-full shadow-[16px_0_40px_rgba(0,0,0,0.85)] z-20"
      >
        {/* Champagne-Gold Silk Fabric Folds & Pleat Texture */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at 40% 30%, rgba(255, 235, 175, 0.25) 0%, transparent 60%),
              radial-gradient(ellipse at 30% 75%, rgba(212, 175, 55, 0.2) 0%, transparent 60%),
              repeating-linear-gradient(
                90deg,
                #140C07 0px,
                #23160F 12px,
                #3D2A1E 24px,
                #6E4F32 36px,
                #9E7544 46px,
                #6E4F32 56px,
                #352317 68px,
                #140C07 80px
              )
            `,
            backgroundSize: '100% 100%, 100% 100%, 80px 100%',
          }}
        >
          {/* Subtle Silk Micro-Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

          {/* Vertical Shadow Waves for 3D Fabric Volume */}
          <div
            className="absolute inset-0 opacity-45 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.65) 35px, transparent 70px)',
              backgroundSize: '140px 100%',
            }}
          />
        </div>

        {/* Right Leading Edge: Gold Embroidered Lace Border */}
        <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-5 flex flex-col items-center justify-between overflow-hidden shadow-lg">
          <div
            className="w-full h-full relative"
            style={{
              background: 'linear-gradient(90deg, #7A5320 0%, #D4AF37 32%, #FFF4D0 55%, #C5A16B 80%, #5E3E18 100%)',
              boxShadow: '-2px 0 6px rgba(0,0,0,0.5), 2px 0 4px rgba(255,235,170,0.4)',
            }}
          >
            {/* Repeating Indian Floral Lace Motif */}
            <div className="absolute inset-0 opacity-70 bg-[radial-gradient(#4A3010_1.5px,transparent_1.5px)] [background-size:6px_8px]" />
            <div className="absolute inset-y-0 left-0 w-[1.5px] bg-[#FFECA8] opacity-80" />
            <div className="absolute inset-y-0 right-0 w-[1.5px] bg-[#664315] opacity-90" />
          </div>
        </div>

        {/* Outer Shadow on Seam */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-r from-transparent to-black/60 pointer-events-none" />
      </motion.div>

      {/* ============================================================
          RIGHT VELVET CURTAIN PANEL (Mirrored)
          Covers 48% to 100% when closed; compresses into side drape (86% to 100%) when open
          ============================================================ */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={
          isTransitioning
            ? { scaleX: 1, transition: closeTransition }
            : openState
            ? { scaleX: 0.28, transition: curtainTransition }
            : { scaleX: 1 }
        }
        style={{
          transformOrigin: 'right center',
          willChange: 'transform',
        }}
        className="absolute inset-y-0 right-0 w-[52%] h-full shadow-[-16px_0_40px_rgba(0,0,0,0.85)] z-20"
      >
        {/* Champagne-Gold Silk Fabric Folds & Pleat Texture (Mirrored) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at 60% 30%, rgba(255, 235, 175, 0.25) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 75%, rgba(212, 175, 55, 0.2) 0%, transparent 60%),
              repeating-linear-gradient(
                90deg,
                #140C07 0px,
                #352317 12px,
                #6E4F32 24px,
                #9E7544 34px,
                #6E4F32 44px,
                #3D2A1E 56px,
                #23160F 68px,
                #140C07 80px
              )
            `,
            backgroundSize: '100% 100%, 100% 100%, 80px 100%',
          }}
        >
          {/* Subtle Silk Micro-Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/40 pointer-events-none" />

          {/* Vertical Shadow Waves for 3D Fabric Volume */}
          <div
            className="absolute inset-0 opacity-45 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.65) 35px, transparent 70px)',
              backgroundSize: '140px 100%',
            }}
          />
        </div>

        {/* Left Leading Edge: Gold Embroidered Lace Border */}
        <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-5 flex flex-col items-center justify-between overflow-hidden shadow-lg">
          <div
            className="w-full h-full relative"
            style={{
              background: 'linear-gradient(90deg, #5E3E18 0%, #C5A16B 20%, #FFF4D0 45%, #D4AF37 68%, #7A5320 100%)',
              boxShadow: '2px 0 6px rgba(0,0,0,0.5), -2px 0 4px rgba(255,235,170,0.4)',
            }}
          >
            {/* Repeating Indian Floral Lace Motif */}
            <div className="absolute inset-0 opacity-70 bg-[radial-gradient(#4A3010_1.5px,transparent_1.5px)] [background-size:6px_8px]" />
            <div className="absolute inset-y-0 right-0 w-[1.5px] bg-[#FFECA8] opacity-80" />
            <div className="absolute inset-y-0 left-0 w-[1.5px] bg-[#664315] opacity-90" />
          </div>
        </div>

        {/* Outer Shadow on Seam */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-l from-transparent to-black/60 pointer-events-none" />
      </motion.div>

      {/* ============================================================
          GOLD BRAIDED ROPE & BULLION TASSEL TIEBACKS
          Independent high-res elements positioned on gathered side drapes
          ============================================================ */}
      {/* Left Tieback & Tassel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: openState ? 1 : 0,
          x: openState ? 0 : -20,
        }}
        transition={{ duration: 1.2, delay: openState ? 0.8 : 0 }}
        className="absolute top-[50%] left-6 sm:left-9 w-11 sm:w-14 h-24 pointer-events-none z-30 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
      >
        <svg
          viewBox="0 0 60 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldCordGradL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#A67C45" />
              <stop offset="100%" stopColor="#5E3E18" />
            </linearGradient>
            <radialGradient id="goldBeadGradL" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#E2B755" />
              <stop offset="100%" stopColor="#6E4B18" />
            </radialGradient>
          </defs>

          {/* Braided Rope Loop around gathered drape */}
          <path
            d="M 2 20 C 18 10, 48 16, 52 35 C 50 48, 24 50, 2 40"
            stroke="url(#goldCordGradL)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 6 22 C 20 14, 46 19, 49 35 C 47 46, 26 48, 6 39"
            stroke="#FFF9E6"
            strokeWidth="1.2"
            strokeDasharray="2.5 3"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Gold Tassel Suspension Bead */}
          <circle cx="44" cy="38" r="4.5" fill="url(#goldBeadGradL)" stroke="#4A3414" strokeWidth="0.8" />

          {/* Ornamental Bell Cap */}
          <path
            d="M 37 44 C 37 40, 51 40, 51 44 C 51 49, 53 53, 44 54 C 35 53, 37 49, 37 44 Z"
            fill="url(#goldCordGradL)"
            stroke="#5E3E18"
            strokeWidth="0.8"
          />
          <line x1="38" y1="48" x2="50" y2="48" stroke="#FFECA8" strokeWidth="1" />

          {/* Hanging Bullion Fringe Threads */}
          <path d="M 39 54 L 37 84" stroke="url(#goldCordGradL)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 41 54 L 40 88" stroke="url(#goldCordGradL)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 44 54 L 44 92" stroke="#FFF2D6" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M 47 54 L 48 88" stroke="url(#goldCordGradL)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 49 54 L 51 84" stroke="url(#goldCordGradL)" strokeWidth="1.6" strokeLinecap="round" />

          <circle cx="44" cy="94" r="2" fill="#D4AF37" />
        </svg>
      </motion.div>

      {/* Right Tieback & Tassel (Mirrored) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: openState ? 1 : 0,
          x: openState ? 0 : 20,
        }}
        transition={{ duration: 1.2, delay: openState ? 0.8 : 0 }}
        className="absolute top-[50%] right-6 sm:right-9 w-11 sm:w-14 h-24 pointer-events-none z-30 drop-shadow-[0_4px_10px_rgba(0,0,0,0.75)]"
        style={{ transform: 'scaleX(-1)' }}
      >
        <svg
          viewBox="0 0 60 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 2 20 C 18 10, 48 16, 52 35 C 50 48, 24 50, 2 40"
            stroke="url(#goldCordGradL)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 6 22 C 20 14, 46 19, 49 35 C 47 46, 26 48, 6 39"
            stroke="#FFF9E6"
            strokeWidth="1.2"
            strokeDasharray="2.5 3"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="44" cy="38" r="4.5" fill="url(#goldBeadGradL)" stroke="#4A3414" strokeWidth="0.8" />
          <path
            d="M 37 44 C 37 40, 51 40, 51 44 C 51 49, 53 53, 44 54 C 35 53, 37 49, 37 44 Z"
            fill="url(#goldCordGradL)"
            stroke="#5E3E18"
            strokeWidth="0.8"
          />
          <line x1="38" y1="48" x2="50" y2="48" stroke="#FFECA8" strokeWidth="1" />
          <path d="M 39 54 L 37 84" stroke="url(#goldCordGradL)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 41 54 L 40 88" stroke="url(#goldCordGradL)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 44 54 L 44 92" stroke="#FFF2D6" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M 47 54 L 48 88" stroke="url(#goldCordGradL)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 49 54 L 51 84" stroke="url(#goldCordGradL)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="44" cy="94" r="2" fill="#D4AF37" />
        </svg>
      </motion.div>

      {/* ============================================================
          TOP STAGE VALANCE / DECORATIVE CHAMPAGNE-GOLD PELMET
          (Traditional Indian Wedding Stage Arch)
          ============================================================ */}
      <div className="fixed top-0 inset-x-0 z-30 pointer-events-none flex flex-col items-center">
        <div className="w-full h-11 sm:h-14 relative filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
          <svg
            viewBox="0 0 800 110"
            className="w-full h-full"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pelmetVelvetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E140C" />
                <stop offset="30%" stopColor="#3E2A1C" />
                <stop offset="65%" stopColor="#5E422C" />
                <stop offset="100%" stopColor="#1A120B" />
              </linearGradient>
              <linearGradient id="pelmetGoldTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C632F" />
                <stop offset="25%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#FFF2D6" />
                <stop offset="75%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8C632F" />
              </linearGradient>
            </defs>

            {/* Horizontal Top Pelmet Bar */}
            <rect x="0" y="0" width="800" height="24" fill="#140C07" />
            <rect x="0" y="22" width="800" height="3" fill="url(#pelmetGoldTrimGrad)" />

            {/* 5 Scalloped Velvet Swag Festoons across width */}
            <path
              d="M 0 25 Q 80 80 160 25 Z"
              fill="url(#pelmetVelvetGrad)"
              stroke="url(#pelmetGoldTrimGrad)"
              strokeWidth="2.5"
            />
            <path
              d="M 160 25 Q 240 85 320 25 Z"
              fill="url(#pelmetVelvetGrad)"
              stroke="url(#pelmetGoldTrimGrad)"
              strokeWidth="2.5"
            />
            <path
              d="M 320 25 Q 400 95 480 25 Z"
              fill="url(#pelmetVelvetGrad)"
              stroke="url(#pelmetGoldTrimGrad)"
              strokeWidth="3"
            />
            <path
              d="M 480 25 Q 560 85 640 25 Z"
              fill="url(#pelmetVelvetGrad)"
              stroke="url(#pelmetGoldTrimGrad)"
              strokeWidth="2.5"
            />
            <path
              d="M 640 25 Q 720 80 800 25 Z"
              fill="url(#pelmetVelvetGrad)"
              stroke="url(#pelmetGoldTrimGrad)"
              strokeWidth="2.5"
            />

            {/* Inner Gold Festoon Curves */}
            <path d="M 10 25 Q 80 70 150 25" stroke="#FFECA8" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
            <path d="M 170 25 Q 240 76 310 25" stroke="#FFECA8" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
            <path d="M 330 25 Q 400 84 470 25" stroke="#FFECA8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.9" />
            <path d="M 490 25 Q 560 76 630 25" stroke="#FFECA8" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
            <path d="M 650 25 Q 720 70 790 25" stroke="#FFECA8" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />

            {/* Hanging Golden Tassels at Festoon Intersection Points */}
            <circle cx="160" cy="27" r="3" fill="#D4AF37" />
            <line x1="160" y1="27" x2="160" y2="46" stroke="#FFECA8" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="160" cy="48" r="2" fill="#D4AF37" />

            <circle cx="320" cy="27" r="3.5" fill="#D4AF37" />
            <line x1="320" y1="27" x2="320" y2="50" stroke="#FFECA8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="320" cy="52" r="2.2" fill="#D4AF37" />

            <circle cx="480" cy="27" r="3.5" fill="#D4AF37" />
            <line x1="480" y1="27" x2="480" y2="50" stroke="#FFECA8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="480" cy="52" r="2.2" fill="#D4AF37" />

            <circle cx="640" cy="27" r="3" fill="#D4AF37" />
            <line x1="640" y1="27" x2="640" y2="46" stroke="#FFECA8" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="640" cy="48" r="2" fill="#D4AF37" />
          </svg>
        </div>

        {/* Center Royal Stage Medallion */}
        <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-[#2C1E14] to-[#120B06] border-2 border-[#D4AF37] shadow-xl flex items-center justify-center p-1">
            <LotusMotif className="w-4 h-4 text-[#EAD9B8]" strokeWidth={1.4} />
          </div>
        </div>
      </div>
    </div>
  );
}
