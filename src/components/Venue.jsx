import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Car, Compass, QrCode, ExternalLink, Maximize2, X } from 'lucide-react';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';

export default function Venue({ venue }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="venue" className="relative py-16 sm:py-24 bg-[#F6F0E6] overflow-hidden select-none">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            {venue.title || "Venue & Location"}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            {venue.subtitle || "We look forward to celebrating with you"}
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold" />
        </div>

        {/* Venue Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.35 }}
          className="bg-[#FFFDF8] rounded-3xl border border-gold/40 shadow-card-soft p-5 sm:p-8 overflow-hidden flex flex-col space-y-5 max-w-3xl mx-auto"
        >
          {/* Venue Preview Image with Natural 16:9 Aspect Ratio & Crisp Contrast */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsLightboxOpen(true)}
            aria-label="Tap to view full resolution wedding venue photo"
            className="group relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-gold/30 shadow-md cursor-pointer active:scale-[0.98] transition-transform"
          >
            <img
              src="/images/venue.jpg"
              alt={venue.nameKannada || venue.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
              }}
              loading="lazy"
            />
            {/* Subtle Gradient that preserves building visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Tap to expand hint */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-gold/40 text-gold-light text-[9.5px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              <Maximize2 className="w-3 h-3 text-gold-light" />
              <span>Expand</span>
            </div>

            {/* Venue Location Badge on Image */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-sans uppercase tracking-widest bg-black/65 px-2.5 py-1 rounded-full backdrop-blur-sm border border-gold/30 font-medium">
              <span className="truncate">ವಿಶ್ವಮಾನವ ಸಭಾಭವನ • Ripponpete</span>
            </div>
          </div>

          {/* Venue Name & Address (Bilingual: Kannada & English) */}
          <div className="flex items-start gap-2.5 pt-1">
            <MapPin className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
            <div>
              {venue.nameKannada && (
                <h3 className="font-kannada text-xl text-charcoal-deep font-bold leading-snug">
                  {venue.nameKannada}
                </h3>
              )}
              <h4 className="font-serif text-base text-gold-dark font-semibold leading-tight">
                {venue.nameEnglish || venue.name}
              </h4>
              <p className="font-sans text-xs text-charcoal font-medium mt-1">
                {venue.addressLine1 || venue.locality}
              </p>
              <p className="font-sans text-[11px] text-charcoal-light">
                {venue.addressLine2 || venue.talukDistrict}
              </p>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="relative h-48 rounded-2xl overflow-hidden border border-gold/30 shadow-inner bg-[#EFE9DD] flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#786C63] p-4 text-center pointer-events-none">
              <MapPin className="w-6 h-6 text-gold-dark mb-1 opacity-70" />
              <span className="font-serif text-xs font-semibold text-charcoal-deep">
                {venue.nameKannada || "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ"}
              </span>
              <span className="text-[10px] font-sans text-charcoal-light">
                {venue.locality || "Sagara Road, Ripponpete"}
              </span>
            </div>
            <iframe
              title="Vishwa Maanava Sabha Bhavana Venue Map"
              src={venue.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full relative z-10 grayscale-[15%]"
            />
          </div>

          {/* Scan for Location QR Card */}
          <div className="bg-[#FAF6EF] rounded-2xl border border-gold/30 p-3.5 flex items-center gap-3.5 shadow-xs">
            <div className="w-20 h-20 bg-white rounded-xl border border-gold/40 p-1.5 shrink-0 flex items-center justify-center shadow-xs">
              <img
                src={venue.qrCodeImage || "/images/venue-qr.svg"}
                alt="Scan QR code for Google Maps directions"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1 text-[9.5px] font-sans font-bold uppercase tracking-wider text-gold-dark bg-gold/15 px-2 py-0.5 rounded-full mb-1">
                <QrCode className="w-3 h-3 text-gold-dark" />
                <span>Scan For Location</span>
              </div>
              <p className="font-serif text-xs font-semibold text-charcoal-deep leading-snug">
                Scan with phone camera for instant Google Maps GPS navigation.
              </p>
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-[#8B2628] hover:underline mt-1"
              >
                <span>Direct Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Parking & Travel Notes */}
          <div className="space-y-2 py-2 border-t border-gold/20 text-[11px] font-sans text-charcoal">
            {venue.parkingNote && (
              <div className="flex items-start gap-2">
                <Car className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                <span>{venue.parkingNote}</span>
              </div>
            )}
            {venue.travelNote && (
              <div className="flex items-start gap-2">
                <Compass className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                <span className="text-charcoal-light">{venue.travelNote}</span>
              </div>
            )}
          </div>

          {/* Directions Button (min 48px touch target) */}
          {venue.googleMapsUrl && (
            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] py-3.5 px-5 rounded-2xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Get Driving Directions</span>
              <Navigation className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Full-Screen Venue Architectural Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 backdrop-blur-md cursor-zoom-out"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white z-10 pt-[env(safe-area-inset-top,8px)]">
              <div>
                <h3 className="font-kannada text-base font-bold text-gold-light">
                  {venue.nameKannada || "ವಿಶ್ವಮಾನವ ಸಭಾಭವನ"}
                </h3>
                <p className="font-sans text-xs text-ivory-200">
                  {venue.nameEnglish || venue.name}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(false);
                }}
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 active:scale-90 transition-transform cursor-pointer"
                aria-label="Close photo lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Resolution Photo Display */}
            <div className="my-auto flex items-center justify-center w-full">
              <motion.img
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.92 }}
                src="/images/venue.jpg"
                alt={venue.nameEnglish || venue.name}
                className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-gold/30"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Lightbox Footer */}
            <div className="text-center pb-[env(safe-area-inset-bottom,8px)] z-10">
              <p className="font-sans text-xs text-gold-light">
                {venue.addressLine1 || "Sagara Road, Ripponpete"}
              </p>
              <p className="font-sans text-[10px] text-ivory-300">
                Tap anywhere outside or the X to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}