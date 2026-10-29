import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Heart } from 'lucide-react';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';

export default function Gallery({ gallery }) {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openLightbox = (index) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = useCallback(() => {
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : gallery.items.length - 1));
  }, [gallery.items.length]);

  const nextImage = useCallback(() => {
    setSelectedIdx((prev) => (prev < gallery.items.length - 1 ? prev + 1 : 0));
  }, [gallery.items.length]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, prevImage, nextImage]);

  return (
    <section id="gallery" className="relative py-16 sm:py-24 bg-[#FAF6EF] overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            {gallery.title || "Our Gallery"}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            {gallery.subtitle || "Moments that mean the world to us"}
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold" />
        </div>

        {/* Responsive Editorial Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 max-w-5xl mx-auto">
          {gallery.items.map((item, idx) => {
            const isFeatured = idx === 0 || idx === 3;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(idx)}
                aria-label={`View photo: ${item.title}`}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border border-gold/35 shadow-card-soft bg-[#FFFDF8] active:scale-95 hover:scale-[1.02] transition-transform ${
                  isFeatured ? "col-span-2 aspect-[16/10]" : "col-span-1 aspect-[4/5]"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/70 via-transparent to-transparent opacity-80 flex flex-col justify-end p-3 text-white">
                  <h4 className="font-serif text-xs sm:text-sm font-medium tracking-wide">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#16110F]/95 backdrop-blur-md flex flex-col items-center justify-between p-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-3xl flex items-center justify-between text-white z-50">
              <span className="text-xs text-gold-light font-sans tracking-widest">
                {selectedIdx + 1} / {gallery.items.length}
              </span>
              <button
                onClick={closeLightbox}
                aria-label="Close photo"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Stage */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl flex-1 flex flex-col items-center justify-center my-2"
            >
              <img
                src={gallery.items[selectedIdx].src}
                alt={gallery.items[selectedIdx].title}
                className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-gold/30"
              />
              <div className="text-center mt-3 text-white">
                <h4 className="font-serif text-base text-gold-light font-medium">
                  {gallery.items[selectedIdx].title}
                </h4>
                <p className="font-sans text-[11px] text-ivory-300 font-light mt-0.5">
                  {gallery.items[selectedIdx].description}
                </p>
              </div>
            </div>

            {/* Bottom Nav Controls (Min 48px touch buttons) */}
            <div className="w-full max-w-3xl flex items-center justify-between px-4 z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous photograph"
                className="w-12 h-12 rounded-full bg-black/40 border border-gold/40 text-white flex items-center justify-center active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next photograph"
                className="w-12 h-12 rounded-full bg-black/40 border border-gold/40 text-white flex items-center justify-center active:scale-90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
