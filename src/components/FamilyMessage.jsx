import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LotusMotif, OrnamentalDivider, CornerFlourish } from '../assets/BotanicalElements';
import SSMonogram from '../assets/SSMonogram';
import { Heart, Sparkles, Maximize2, X } from 'lucide-react';

/**
 * ====================================================================
 * THE FAMILIES BEHIND OUR CELEBRATION — FAMILY PORTRAITS & BLESSINGS
 * ====================================================================
 * - Full Family Muhurtha ceremony photograph prominently framed in gold
 * - Dedicated Bride's Family card with authentic portrait (/images/bride.png)
 * - Dedicated Groom's Family card with authentic portrait (/images/groom.png)
 * - Natural aspect ratios with zero face/member cropping
 * - Interactive full-screen high-resolution lightbox on tap
 * - Traditional South Indian floral accents, warm ambient lighting & floating gold particles
 */
export default function FamilyMessage({ familyNote }) {
  if (!familyNote) return null;

  const [activeLightbox, setActiveLightbox] = useState(null);
  const [fullFamilyError, setFullFamilyError] = useState(false);
  const [brideImgError, setBrideImgError] = useState(false);
  const [groomImgError, setGroomImgError] = useState(false);

  const fullFamilySrc = familyNote.fullFamilyPhoto || familyNote.photo || '/images/full family.png';
  const brideFamilySrc = familyNote.brideFamily?.photo || familyNote.brideFamilyPhoto || '/images/bride.png';
  const groomFamilySrc = familyNote.groomFamily?.photo || familyNote.groomFamilyPhoto || '/images/groom.png';

  // Golden particle positions for ambient shimmer behind the frame
  const particles = [
    { id: 1, top: '12%', left: '8%', size: 4, delay: 0 },
    { id: 2, top: '22%', right: '10%', size: 5, delay: 1.2 },
    { id: 3, top: '62%', left: '6%', size: 3, delay: 0.8 },
    { id: 4, top: '78%', right: '12%', size: 4, delay: 2.1 },
    { id: 5, top: '42%', left: '4%', size: 5, delay: 1.5 },
  ];

  return (
    <section
      id="family"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-[#F4F8F3] via-[#FAF6EF] to-[#F4F8F3] overflow-hidden select-none"
      aria-label="The Families Behind Our Celebration"
    >
      {/* Ambient Pale Mint-Green Damask Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#4A5D43_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Floating Golden Particles Behind Frame */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -18, 0],
              opacity: [0.3, 0.85, 0.3],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 4.5,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              width: p.size,
              height: p.size,
              backgroundColor: '#D4AF37',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
            }}
            className="absolute rounded-full"
          />
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-[#C5A16B]" strokeWidth={1.2} />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.14em] font-medium text-[#2A1F1B] uppercase mb-1.5">
            {familyNote.heading || "THE FAMILIES BEHIND OUR CELEBRATION"}
          </h2>

          <p className="font-script text-2xl sm:text-3xl text-[#A67C45] mb-2.5">
            {familyNote.subtitle || "Two families, one beautiful beginning."}
          </p>

          <OrnamentalDivider className="max-w-[200px] mx-auto text-[#C5A16B]" />
        </motion.div>

        {/* ========================================================
            1. MAIN PROMINENT FRAMED PORTRAIT: THE FULL FAMILY
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto mb-14"
        >
          {/* Soft Ambient Spotlight Behind Photo */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none opacity-60 blur-xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.45) 0%, rgba(197, 161, 107, 0.18) 50%, transparent 75%)',
            }}
          />

          {/* Traditional Royal Gold Frame */}
          <div
            onClick={() => setActiveLightbox({ src: fullFamilySrc, title: "The Families Behind Our Celebration" })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveLightbox({ src: fullFamilySrc, title: "The Families Behind Our Celebration" })}
            aria-label="Tap to view full resolution family portrait"
            className="group relative rounded-3xl bg-gradient-to-br from-[#EFE5D5] via-[#FFFDF8] to-[#E5CCA0] p-3 sm:p-4 shadow-2xl border-2 border-[#C5A16B] cursor-pointer hover:shadow-[0_20px_40px_rgba(212,175,55,0.25)] transition-all"
          >
            {/* South Indian Corner Flourishes */}
            <div className="absolute top-2 left-2 pointer-events-none z-20">
              <CornerFlourish className="w-8 sm:w-10 h-8 sm:h-10 text-[#8C632F]" position="top-left" />
            </div>
            <div className="absolute top-2 right-2 pointer-events-none z-20">
              <CornerFlourish className="w-8 sm:w-10 h-8 sm:h-10 text-[#8C632F]" position="top-right" />
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none z-20">
              <CornerFlourish className="w-8 sm:w-10 h-8 sm:h-10 text-[#8C632F]" position="bottom-left" />
            </div>
            <div className="absolute bottom-2 right-2 pointer-events-none z-20">
              <CornerFlourish className="w-8 sm:w-10 h-8 sm:h-10 text-[#8C632F]" position="bottom-right" />
            </div>

            {/* Tap to expand badge */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-[#D4AF37]/50 text-[#F5E6C8] text-[10px] font-sans uppercase tracking-widest px-3 py-1 rounded-full shadow-md group-hover:scale-105 transition-transform">
              <Maximize2 className="w-3 h-3 text-[#D4AF37]" />
              <span>Tap to Enlarge</span>
            </div>

            {/* Inner Gold Foil Filigree Inset */}
            <div className="relative rounded-2xl bg-[#FFFDF8] border border-[#C5A16B]/60 p-2 sm:p-2.5 overflow-hidden shadow-inner">
              <div className="relative rounded-xl overflow-hidden bg-[#FAF6EF]">
                {!fullFamilyError ? (
                  <img
                    src={fullFamilySrc}
                    alt="Sahana & Sameep Wedding Full Family Portrait"
                    onError={() => setFullFamilyError(true)}
                    className="w-full h-auto max-h-[500px] object-contain mx-auto rounded-lg shadow-sm group-hover:scale-[1.01] transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFFDF8] to-[#F5EFE6]">
                    <div className="w-20 h-20 rounded-full bg-[#EBF2EA] border-2 border-[#4A5D43]/40 flex items-center justify-center mb-4 shadow-md">
                      <SSMonogram size={56} variant="gold" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1F1B] tracking-wide mb-1">
                      Sahana &amp; Sameep’s Families
                    </h3>
                    <p className="font-serif italic text-sm text-[#8C632F] max-w-sm mb-3">
                      United in love, tradition and lifelong blessings.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Caption Plaque */}
            <div className="mt-3 text-center">
              <p className="font-serif text-sm sm:text-base font-semibold text-[#352C28] tracking-wide">
                United in Tradition, Family &amp; Love
              </p>
              <p className="font-sans text-[11px] text-[#786C63] uppercase tracking-wider mt-0.5">
                Sahana &amp; Sameep with both beloved families
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            2. TWO FAMILY BLESSING CARDS WITH AUTHENTIC PORTRAITS
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Bride's Family Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FFFDF8] rounded-3xl border border-[#C5A16B]/60 shadow-md p-5 sm:p-6 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C632F] font-bold">
                  With Warm Blessings
                </span>
                <Heart className="w-4 h-4 text-[#8B2628]" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl text-[#2A1F1B] font-bold tracking-wide mb-3">
                {familyNote.brideFamily?.title || "THE BRIDE'S FAMILY"}
              </h3>

              {/* Bride Family Portrait Photo Frame */}
              <div
                onClick={() => setActiveLightbox({ src: brideFamilySrc, title: "The Bride's Family" })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveLightbox({ src: brideFamilySrc, title: "The Bride's Family" })}
                aria-label="Tap to view full resolution Bride's family photo"
                className="group relative rounded-2xl bg-gradient-to-b from-[#FAF4E8] to-[#FFFDF8] border border-[#C5A16B]/70 p-2 shadow-sm mb-4 cursor-pointer hover:border-[#D4AF37] transition-all"
              >
                <div className="relative rounded-xl overflow-hidden bg-[#FAF6EF]">
                  {!brideImgError ? (
                    <img
                      src={brideFamilySrc}
                      alt="Sahana (Bride) Family Portrait"
                      onError={() => setBrideImgError(true)}
                      className="w-full h-auto max-h-[260px] object-contain mx-auto rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="py-12 text-center text-xs text-[#8C632F] font-serif">
                      The Bride's Family
                    </div>
                  )}
                  {/* Tap to expand hint */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-[#D4AF37]/50 text-[#F5E6C8] text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm">
                    <Maximize2 className="w-2.5 h-2.5 text-[#D4AF37]" />
                    <span>Enlarge</span>
                  </div>
                </div>
              </div>

              {/* Blessings Message */}
              <p className="font-serif text-sm text-[#4A3D36] italic leading-relaxed mb-4">
                "{familyNote.brideFamily?.message}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#C5A16B]/30 flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#6B5A50] font-semibold">
                {familyNote.brideFamily?.names}
              </span>
              <LotusMotif className="w-5 h-5 text-[#C5A16B]" />
            </div>
          </motion.div>

          {/* Groom's Family Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#FFFDF8] rounded-3xl border border-[#C5A16B]/60 shadow-md p-5 sm:p-6 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C632F] font-bold">
                  With Joyful Hearts
                </span>
                <Heart className="w-4 h-4 text-[#8B2628]" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl text-[#2A1F1B] font-bold tracking-wide mb-3">
                {familyNote.groomFamily?.title || "THE GROOM'S FAMILY"}
              </h3>

              {/* Groom Family Portrait Photo Frame */}
              <div
                onClick={() => setActiveLightbox({ src: groomFamilySrc, title: "The Groom's Family" })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveLightbox({ src: groomFamilySrc, title: "The Groom's Family" })}
                aria-label="Tap to view full resolution Groom's family photo"
                className="group relative rounded-2xl bg-gradient-to-b from-[#FAF4E8] to-[#FFFDF8] border border-[#C5A16B]/70 p-2 shadow-sm mb-4 cursor-pointer hover:border-[#D4AF37] transition-all"
              >
                <div className="relative rounded-xl overflow-hidden bg-[#FAF6EF]">
                  {!groomImgError ? (
                    <img
                      src={groomFamilySrc}
                      alt="Sameep (Groom) Family Portrait"
                      onError={() => setGroomImgError(true)}
                      className="w-full h-auto max-h-[260px] object-contain mx-auto rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="py-12 text-center text-xs text-[#8C632F] font-serif">
                      The Groom's Family
                    </div>
                  )}
                  {/* Tap to expand hint */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-[#D4AF37]/50 text-[#F5E6C8] text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm">
                    <Maximize2 className="w-2.5 h-2.5 text-[#D4AF37]" />
                    <span>Enlarge</span>
                  </div>
                </div>
              </div>

              {/* Blessings Message */}
              <p className="font-serif text-sm text-[#4A3D36] italic leading-relaxed mb-4">
                "{familyNote.groomFamily?.message}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#C5A16B]/30 flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#6B5A50] font-semibold">
                {familyNote.groomFamily?.names}
              </span>
              <LotusMotif className="w-5 h-5 text-[#C5A16B]" />
            </div>
          </motion.div>
        </div>

      </div>

      {/* ============================================================
          3. FULL-SCREEN LIGHTBOX MODAL (Uncropped, Touch-Friendly)
          ============================================================ */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
          >
            {/* Top Bar with Title and Close Button */}
            <div className="w-full max-w-4xl flex items-center justify-between pb-3 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <h4 className="font-serif text-sm sm:text-base tracking-wider uppercase font-semibold text-[#F5E6C8]">
                  {activeLightbox.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                aria-label="Close high-resolution photo view"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-[#D4AF37]/40 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Photo Container (Natural Aspect Ratio, Zero Cropping) */}
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] max-w-[95vw] overflow-hidden rounded-2xl border-2 border-[#D4AF37] shadow-2xl bg-black"
            >
              <img
                src={activeLightbox.src}
                alt={activeLightbox.title}
                className="max-h-[80vh] max-w-[92vw] w-auto h-auto object-contain mx-auto"
              />
            </motion.div>

            <p className="font-sans text-[11px] text-[#EAD9B8]/80 tracking-widest uppercase mt-3">
              Tap anywhere outside or press Esc to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
