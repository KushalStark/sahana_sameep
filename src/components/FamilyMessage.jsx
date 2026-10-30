import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LotusMotif, OrnamentalDivider, CornerFlourish } from '../assets/BotanicalElements';
import SSMonogram from '../assets/SSMonogram';
import { Heart, Sparkles } from 'lucide-react';

/**
 * ====================================================================
 * THE FAMILIES BEHIND OUR CELEBRATION — FAMILY PORTRAIT & BLESSINGS
 * ====================================================================
 * A dedicated section with traditional Indian wedding aesthetic:
 * - Large, elegant family portrait inside an ornamental traditional gold frame
 * - Delicate South Indian floral corner motifs (#C5A16B & #4A5D43)
 * - Subtle pale mint-green (#F4F8F3) and ivory (#FAF6EF) background inspired by printed invitation
 * - Soft champagne-gold inner border and realistic frame shadows
 * - Small floating golden particles behind the frame & drifting floral petals
 * - Soft spotlight around the family portrait
 * - Aspect-ratio preserving container that never crops family members
 * - Bride's and Groom's parents' heartfelt blessings
 */
export default function FamilyMessage({ familyNote }) {
  if (!familyNote) return null;

  const [imageError, setImageError] = useState(false);
  const photoSrc = familyNote.photo || '/images/family-portrait.jpg';

  // Golden particle positions for ambient shimmer behind the frame
  const particles = [
    { id: 1, top: '15%', left: '10%', size: 4, delay: 0 },
    { id: 2, top: '25%', right: '12%', size: 5, delay: 1.2 },
    { id: 3, top: '65%', left: '8%', size: 3, delay: 0.8 },
    { id: 4, top: '75%', right: '14%', size: 4, delay: 2.1 },
    { id: 5, top: '45%', left: '5%', size: 5, delay: 1.5 },
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
              opacity: [0.3, 0.8, 0.3],
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
            THE GRAND TRADITIONAL FAMILY PHOTOGRAPH FRAME
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto mb-14"
        >
          {/* Soft Ambient Spotlight Behind Photo */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none opacity-60 blur-xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.4) 0%, rgba(197, 161, 107, 0.15) 50%, transparent 75%)',
            }}
          />

          {/* Traditional Triple Frame Construction */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#EFE5D5] via-[#FFFDF8] to-[#E5CCA0] p-3 sm:p-4 shadow-2xl border-2 border-[#C5A16B]">
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

            {/* Inner Gold Foil Filigree Inset */}
            <div className="relative rounded-2xl bg-[#FFFDF8] border border-[#C5A16B]/60 p-2 sm:p-2.5 overflow-hidden shadow-inner">
              <div className="relative rounded-xl overflow-hidden bg-[#FAF6EF]">
                {!imageError ? (
                  <img
                    src={photoSrc}
                    alt="Sahana & Sameep Wedding Family Portrait"
                    onError={() => setImageError(true)}
                    className="w-full h-auto max-h-[480px] object-contain sm:object-cover mx-auto rounded-lg shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  /* Respectful Traditional Indian Heritage Portrait Card (Zero AI Stock People) */
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

                    <div className="flex items-center gap-2 text-xs font-sans text-[#4A5D43] uppercase tracking-widest font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A16B]" />
                      <span>The Families Behind Our Celebration</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A16B]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            TWO FAMILIES' BLESSINGS CARDS (Bride & Groom Families)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {/* Bride's Family Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FFFDF8] rounded-3xl border border-[#C5A16B]/50 shadow-md p-5 sm:p-6 relative hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C632F] font-bold">
                With Warm Blessings
              </span>
              <Heart className="w-4 h-4 text-[#8B2628]" />
            </div>

            <h3 className="font-serif text-xl text-[#2A1F1B] font-bold mb-2">
              {familyNote.brideFamily.title}
            </h3>

            <p className="font-serif text-sm text-[#4A3D36] italic leading-relaxed mb-4">
              "{familyNote.brideFamily.message}"
            </p>

            <div className="pt-3 border-t border-[#C5A16B]/30 flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#6B5A50] font-semibold">
                {familyNote.brideFamily.names}
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
            className="bg-[#FFFDF8] rounded-3xl border border-[#C5A16B]/50 shadow-md p-5 sm:p-6 relative hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8C632F] font-bold">
                With Joyful Hearts
              </span>
              <Heart className="w-4 h-4 text-[#8B2628]" />
            </div>

            <h3 className="font-serif text-xl text-[#2A1F1B] font-bold mb-2">
              {familyNote.groomFamily.title}
            </h3>

            <p className="font-serif text-sm text-[#4A3D36] italic leading-relaxed mb-4">
              "{familyNote.groomFamily.message}"
            </p>

            <div className="pt-3 border-t border-[#C5A16B]/30 flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#6B5A50] font-semibold">
                {familyNote.groomFamily.names}
              </span>
              <LotusMotif className="w-5 h-5 text-[#C5A16B]" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
