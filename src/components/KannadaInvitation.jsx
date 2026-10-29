import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation, Heart } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { GaneshaMotif, CornerFlourish, OrnamentalDivider, LotusMotif } from '../assets/BotanicalElements';

/**
 * KannadaInvitation Component
 * ===========================
 * Dedicated traditional Kannada wedding invitation section honoring the
 * authentic Kannada wedding card aesthetic:
 * - Pale mint green & warm ivory floral card texture
 * - Sacred Ganesha motif and || ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ || invocation
 * - Olive-green ornamental double borders (#4A5D43)
 * - Deep kumkum red accents (#8B2628)
 * - Verified Kannada script: ಸಾಹನಾ ಮತ್ತು ಸಮೀಪ, 08-02-2027 ಸೋಮವಾರ, ಮಧ್ಯಾಹ್ನ 12:35
 * - Verified venue: ವಿಶ್ವಮಾನವ ಸಭಾಭವನ, Sagara Road, Ripponpete
 * 
 * All copy is dynamically bound to src/config/wedding.js for easy family edits.
 */
export default function KannadaInvitation() {
  const { kannadaInvitation, venue, couple } = weddingConfig;

  return (
    <section
      id="kannada-invitation"
      className="py-12 px-3 sm:px-4 bg-[#FAF6EF] relative overflow-hidden"
      aria-label="Kannada Wedding Invitation"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#4A5D43_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full max-w-2xl mx-auto relative z-10">
        
        {/* Section Heading Tag */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EA] border border-[#4A5D43]/30 text-[#4A5D43] text-[10px] font-sans uppercase tracking-[0.22em] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B2628]" />
            <span>ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ • TRADITIONAL INVITATION</span>
          </div>
        </motion.div>

        {/* Traditional Invitation Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-b from-[#F7FAF5] via-[#FFFDF8] to-[#F5F8F3] rounded-2xl border-2 border-[#4A5D43]/40 shadow-xl p-5 sm:p-6 text-center overflow-hidden"
        >
          {/* Olive-Green Ornamental Corner Flourishes */}
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

          {/* Double Traditional Inner Borders */}
          <div className="absolute inset-2 border border-[#4A5D43]/25 rounded-xl pointer-events-none" />
          <div className="absolute inset-2.5 border border-[#8B2628]/15 rounded-lg pointer-events-none" />

          {/* Sacred Ganesha Motif & Invocation */}
          <div className="relative z-10 flex flex-col items-center pt-2 mb-3">
            <div className="w-14 h-14 rounded-full bg-[#8B2628]/5 border border-[#8B2628]/20 flex items-center justify-center p-2 mb-1.5 shadow-sm">
              <GaneshaMotif className="w-10 h-10 text-[#8B2628]" strokeWidth={1.5} />
            </div>

            {/* Sacred Invocational Chants */}
            <p className="font-kannada font-bold text-xs sm:text-sm tracking-widest text-[#8B2628]">
              {kannadaInvitation.invocation}
            </p>
            <p className="font-kannada text-[11px] text-[#4A5D43] font-medium tracking-wide mt-0.5">
              {kannadaInvitation.tagline}
            </p>
          </div>

          <div className="relative z-10 my-2">
            <OrnamentalDivider className="w-32 mx-auto text-[#C5A16B]" />
          </div>

          {/* Couple's Names in Kannada */}
          <div className="relative z-10 my-3">
            <h2 className="font-kannada font-bold text-2xl sm:text-[28px] text-[#352C28] tracking-normal leading-tight">
              {kannadaInvitation.couple}
            </h2>
            <p className="font-serif italic text-xs text-[#786C63] mt-1 tracking-wider">
              {couple.bride} &amp; {couple.groom}
            </p>
          </div>

          {/* Auspicious Muhurtha & Date Badge (Kumkum Ribbon) */}
          <div className="relative z-10 my-4 bg-[#8B2628]/8 border border-[#8B2628]/25 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-[#8B2628] font-kannada font-bold text-sm sm:text-base">
              <Clock className="w-4 h-4 text-[#8B2628] shrink-0" />
              <span>{kannadaInvitation.muhurthaLabel}: {kannadaInvitation.muhurthaValue}</span>
            </div>
            <p className="font-sans text-[10px] text-[#786C63] tracking-widest uppercase mt-0.5 font-medium">
              Auspicious Muhurtha: 12:35 PM
            </p>
          </div>

          {/* Key Invitation Details (Date & Venue) */}
          <div className="relative z-10 space-y-3 text-left bg-white/70 backdrop-blur-sm rounded-xl p-3.5 border border-[#4A5D43]/20 shadow-xs">
            {/* Date Row */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EBF2EA] flex items-center justify-center text-[#4A5D43] shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-kannada text-[11px] font-semibold text-[#4A5D43]">
                  {kannadaInvitation.dateLabel}
                </span>
                <span className="font-kannada font-bold text-sm text-[#352C28]">
                  {kannadaInvitation.dateValue}
                </span>
                <span className="block font-sans text-[10px] text-[#786C63]">
                  Monday, 08 February 2027
                </span>
              </div>
            </div>

            <div className="border-t border-[#4A5D43]/15 pt-2 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EBF2EA] flex items-center justify-center text-[#4A5D43] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-kannada text-[11px] font-semibold text-[#4A5D43]">
                  {kannadaInvitation.venueLabel}
                </span>
                <span className="font-kannada font-bold text-base text-[#352C28] leading-tight block">
                  {kannadaInvitation.venueValue}
                </span>
                <span className="font-kannada text-xs text-[#786C63] block mt-0.5">
                  {kannadaInvitation.locationLabel}: {kannadaInvitation.locationValue}
                </span>
              </div>
            </div>
          </div>

          {/* Traditional Welcome Blessing */}
          <div className="relative z-10 my-4 px-2">
            <p className="font-kannada text-xs sm:text-[13px] text-[#4A5D43] leading-relaxed font-medium">
              “{kannadaInvitation.welcomeNote}”
            </p>
          </div>

          {/* Action Button: Google Maps Directions */}
          <div className="relative z-10 pt-2 flex flex-col gap-2">
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-[#4A5D43] text-white font-kannada text-xs font-semibold hover:bg-[#3B4A35] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>ವಿಳಾಸ ಮತ್ತು ಮಾರ್ಗಸೂಚಿ (Google Maps)</span>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-kannada text-[#786C63] pt-1">
              <LotusMotif className="w-3.5 h-3.5 text-[#C5A16B]" />
              <span>ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯೇ ನಮ್ಮ ಸೌಭಾಗ್ಯ</span>
              <LotusMotif className="w-3.5 h-3.5 text-[#C5A16B]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
