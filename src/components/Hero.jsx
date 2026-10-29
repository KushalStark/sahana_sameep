import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Clock, MapPin, Mail, ArrowDown, Sparkles } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { ArchFlourish } from '../assets/BotanicalElements';

export default function Hero({ couple, dateFormats, muhurtha, venue, onOpenInvitation, onViewDetails }) {
  // Real-time live countdown to Muhurtha: 8 February 2027 at 12:35 PM IST
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2027-02-08T12:35:00+05:30").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden select-none">
      {/* Background Cinematic Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-mandap.jpg"
          alt="Sahana & Sameep Wedding Floral Pavilion"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Warm Editorial Overlays (Champagne / Espresso Vignette) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#221B17]/80 via-[#221B17]/50 to-[#221B17]/90" />
        <div className="absolute inset-0 bg-radial-gradient opacity-35 mix-blend-overlay" />
      </div>

      {/* Floating Center Content (Responsive max-w-2xl) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 pt-24 sm:pt-28 text-center text-white flex flex-col items-center">
        {/* Animated Master Monogram Brand Mark with Luxury Breathing Halo */}
        <div className="relative mb-2 group cursor-pointer">
          {/* Ambient Golden Radial Halo Glow */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 -m-3 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(197, 161, 107, 0.2) 50%, transparent 75%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Gentle Floating Motion with Shimmer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 1 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10"
          >
            <SSMonogram size={78} variant="gold" />
          </motion.div>
        </div>

        {/* Delicate Arch Flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-1"
        >
          <ArchFlourish className="w-44 h-7 text-gold-light/80" />
        </motion.div>

        {/* Subtitle / Invitation tagline */}
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold-light font-medium mb-3"
        >
          {couple.invitationSubtitle || "A Celebration of Love"}
        </motion.p>

        {/* Main Title: SAHANA & SAMEEP */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          style={{ fontSize: 'clamp(2.1rem, 9.5vw, 3.2rem)' }}
          className="font-serif tracking-[0.14em] font-semibold text-[#FFFDF8] drop-shadow-md leading-[1.15] mb-2"
        >
          {couple.bride.toUpperCase()}
          <span className="font-script text-3xl sm:text-4xl text-gold-light font-normal block my-0">
            &
          </span>
          {couple.groom.toUpperCase()}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-base sm:text-lg text-ivory-100/90 italic font-normal tracking-wide max-w-[280px] mb-4 leading-relaxed"
        >
          "{couple.tagline}"
        </motion.p>

        {/* Official Wedding Details Badge (The Box) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-1.5 text-xs font-sans text-ivory-200/95 bg-black/45 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-gold/35 mb-3.5 w-full max-w-md shadow-lg"
        >
          {/* Wedding Date */}
          <div className="flex items-center gap-1.5 font-serif text-sm tracking-wider font-semibold uppercase text-gold-light">
            <Calendar className="w-3.5 h-3.5 text-gold-light shrink-0" />
            <span>{dateFormats?.hero || "MONDAY, 08 FEBRUARY 2027"}</span>
          </div>

          {/* Muhurtha */}
          <div className="flex items-center gap-1.5 text-[11px] font-sans text-ivory-100 font-medium">
            <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>Muhurtha: <strong>{muhurtha || "12:35 PM"}</strong></span>
          </div>

          {/* Divider */}
          <div className="w-28 h-[1px] bg-gold/30 my-0.5" />

          {/* Venue in Kannada & Sagara Road, Ripponpete */}
          <div className="flex flex-col items-center text-center">
            <span className="font-kannada text-sm sm:text-base font-semibold text-gold-light tracking-wide">
              {venue?.nameKannada || "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ"}
            </span>
            <span className="flex items-center gap-1 text-[11px] sm:text-xs text-ivory-300 font-sans mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-gold-light shrink-0" />
              <span>{venue?.locality || "Sagara Road, Ripponpete"}</span>
            </span>
          </div>
        </motion.div>

        {/* Live Countdown Timer (Merged Below the Box, Above 'Open Our Invitation') */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="w-full max-w-md mb-5"
        >
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-black/50 backdrop-blur-md border border-gold/35 rounded-xl py-2.5 px-1.5 flex flex-col items-center justify-center shadow-md relative overflow-hidden group"
              >
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />
                <span className="font-serif text-xl sm:text-3xl font-light text-gold-light leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-sans text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.16em] text-ivory-200/80 font-medium mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center"
        >
          {/* Primary Button: Open Our Invitation */}
          <button
            type="button"
            onClick={onOpenInvitation}
            className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-lg active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>{couple.heroPrimaryAction || "Open Our Invitation"}</span>
          </button>

          {/* Secondary Button: View Wedding Details */}
          <button
            type="button"
            onClick={onViewDetails}
            className="w-full min-h-[46px] py-3 px-6 rounded-full bg-white/10 text-white font-sans text-xs uppercase tracking-[0.2em] font-medium border border-gold/40 backdrop-blur-md active:scale-95 transition-all text-center flex items-center justify-center gap-2 hover:bg-white/20 cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5 text-gold-light" />
            <span>{couple.heroSecondaryAction || "View Wedding Details"}</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={onViewDetails}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        aria-label="Scroll to wedding details"
        className="absolute bottom-3 z-10 text-gold-light/80 flex flex-col items-center gap-0.5 cursor-pointer"
      >
        <span className="font-sans text-[8.5px] uppercase tracking-[0.3em] font-medium">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
