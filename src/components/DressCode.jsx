import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, RotateCw, Check, Shirt, Sparkle } from 'lucide-react';
import { LotusMotif, OrnamentalDivider, CeremonyAttireArt, ReceptionAttireArt, CornerFlourish } from '../assets/BotanicalElements';

/**
 * ====================================================================
 * DRESS CODE SECTION WITH ACCESSIBLE 3D FLIP CARDS
 * ====================================================================
 * - Front Face: Attire artwork, event tag, description, and suggested color chips
 * - Back Face: Fabric guidance, men & women styling recommendations, etiquette
 * - Zero layout shift with responsive grid across mobile, tablet, and desktop
 */
export default function DressCode({ dressCode }) {
  const [flippedCards, setFlippedCards] = useState({});

  if (!dressCode || !dressCode.enabled) return null;

  const toggleFlip = (idx) => {
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const stylingTips = [
    {
      // Ceremony
      women: 'Traditional Kanjeevaram, Banarasi or Mysore Silk sarees with delicate gold accents.',
      men: 'Traditional Silk Kurta with Dhoti (Panche) or elegant Kurta-Churidar in auspicious festive tones.',
      accessories: 'Comfortable slip-on ethnic footwear for temple traditions; authentic floral gajras.',
    },
    {
      // Reception
      women: 'Rich designer lehengas, silk sarees, or contemporary Indo-Western gowns with statement jewelry.',
      men: 'Modern Bandhgala, Sherwani, or formal tailored suits in celebratory rich evening colors.',
      accessories: 'Festive footwear and elegant accessories suitable for dancing and photography.',
    },
  ];

  return (
    <section id="dress-code" className="relative py-16 sm:py-24 bg-[#FAF6EF] overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            {dressCode.title || "Dress Code"}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            {dressCode.subtitle || "Come dressed in your best!"}
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold" />
        </div>

        {/* Responsive Dress Code Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {dressCode.events.map((event, idx) => {
            const isFlipped = !!flippedCards[idx];
            const tips = stylingTips[idx] || stylingTips[0];

            return (
              <div
                key={event.id || idx}
                role="button"
                tabIndex={0}
                aria-label={`${event.title} Dress Code - Click or press enter to flip card for styling guide`}
                aria-expanded={isFlipped}
                onClick={() => toggleFlip(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(idx);
                  }
                }}
                className="relative w-full h-[540px] sm:h-[500px] [perspective:1400px] cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-3xl"
              >
                {/* 3D Flipper Container */}
                <div
                  className="w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d]"
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* ==================================================
                      FRONT FACE: ATTIRE ARTWORK & COLOR PALETTE
                      ================================================== */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-[#FFFDF8] border border-gold/40 shadow-card-soft hover:shadow-xl transition-shadow p-5 sm:p-6 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)]"
                    style={{ zIndex: isFlipped ? 1 : 2 }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-dark font-semibold">
                          Attire Guide
                        </span>
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-gold/40 text-gold-light text-[9.5px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                          <RotateCw className="w-3 h-3 text-gold-light" />
                          <span>Flip Guide</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl text-charcoal-deep font-semibold">
                        {event.title}
                      </h3>

                      <p className="font-serif text-base text-gold-dark italic font-medium mb-2">
                        {event.tag}
                      </p>

                      <p className="font-sans text-xs text-charcoal-light leading-relaxed mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Couple Illustration Art */}
                      <div className="flex justify-center items-center py-2 bg-ivory-100/60 rounded-2xl border border-gold/20 mb-3">
                        {idx === 0 ? (
                          <CeremonyAttireArt className="w-24 h-36 text-gold-dark" />
                        ) : (
                          <ReceptionAttireArt className="w-24 h-36 text-charcoal-deep" />
                        )}
                      </div>
                    </div>

                    {/* Bottom: Color Palette Swatches & Flip Prompt */}
                    <div>
                      <div className="pt-2.5 border-t border-gold/20 mb-3">
                        <span className="font-sans text-[9.5px] uppercase tracking-wider text-charcoal-light font-medium block mb-1.5 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-gold-dark" />
                          <span>Recommended Color Tones:</span>
                        </span>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {event.palette.map((color) => (
                            <div
                              key={color.name}
                              className="flex items-center gap-1.5 bg-ivory-50 px-2.5 py-1 rounded-full border border-gold/20 text-[10.5px] text-charcoal"
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shrink-0"
                                style={{ backgroundColor: color.hex }}
                              />
                              <span>{color.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-full py-2 px-3 rounded-xl bg-gold/10 border border-gold/30 text-gold-dark group-hover:bg-gold/20 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Tap for Styling Tips &amp; Fabrics ↻</span>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                      BACK FACE: STYLING RECOMMENDATIONS & FABRICS
                      ================================================== */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-[#FFFDF8] border-2 border-gold/60 shadow-xl p-6 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] text-charcoal-deep"
                    style={{ zIndex: isFlipped ? 2 : 1 }}
                  >
                    {/* Corner Flourishes */}
                    <div className="absolute top-2 left-2 pointer-events-none">
                      <CornerFlourish className="w-7 h-7 text-gold/40" position="top-left" />
                    </div>
                    <div className="absolute top-2 right-2 pointer-events-none">
                      <CornerFlourish className="w-7 h-7 text-gold/40" position="top-right" />
                    </div>

                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-3">
                        <div>
                          <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-dark font-semibold block">
                            Wardrobe Recommendations
                          </span>
                          <h4 className="font-serif text-xl font-bold text-charcoal-deep">
                            {event.title} Attire Guide
                          </h4>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark">
                          <Shirt className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Styling Advice Cards */}
                      <div className="space-y-3 my-2 text-xs">
                        <div className="p-3 rounded-xl bg-ivory-50 border border-gold/25">
                          <span className="font-sans font-bold text-gold-dark uppercase tracking-wider text-[10px] block mb-1">
                            For Women:
                          </span>
                          <p className="text-charcoal leading-relaxed">
                            {tips.women}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-ivory-50 border border-gold/25">
                          <span className="font-sans font-bold text-gold-dark uppercase tracking-wider text-[10px] block mb-1">
                            For Men:
                          </span>
                          <p className="text-charcoal leading-relaxed">
                            {tips.men}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/20 text-[11px]">
                          <span className="font-sans font-semibold text-charcoal-deep block mb-0.5">
                            Comfort &amp; Footwear Note:
                          </span>
                          <p className="text-charcoal-light">
                            {tips.accessories}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back Actions: Return */}
                    <div className="pt-2 border-t border-gold/20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 active:scale-95 shadow-sm transition-all"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>↺ Flip back to attire art</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
