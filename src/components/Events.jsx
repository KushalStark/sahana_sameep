import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Navigation, HeartHandshake, Wine, RotateCw, CheckCircle2 } from 'lucide-react';
import { LotusMotif, OrnamentalDivider, CornerFlourish } from '../assets/BotanicalElements';

/**
 * ====================================================================
 * WEDDING EVENTS SECTION WITH ACCESSIBLE 3D FLIP CARDS
 * ====================================================================
 * - Full front-and-back 3D rotation with preserve-3d and backface-visibility
 * - Front Face: High-res wedding event photography, title, date, time, venue
 * - Back Face: Detailed ceremony ritual schedule, directions button, attire notes
 * - Works smoothly on mobile touchscreens without hover lock
 * - Hover & focus states on desktop with zero layout shifts
 * - Responsive grid: 1 column on mobile, 2 columns on tablet & desktop
 */
export default function Events({ events }) {
  // Track flip state for each card independently
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (idx) => {
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const ceremonySchedule = [
    { time: '10:00 AM', title: 'Devatha Prarthane & Nandi Pooja' },
    { time: '12:35 PM', title: 'Shubha Muhurtha & Maangalya Dhaarana' },
    { time: '01:15 PM', title: 'Sapthapadi & Grand Wedding Feast' },
  ];

  const receptionSchedule = [
    { time: '07:00 PM', title: 'Stage Welcome & Couple Greetings' },
    { time: '07:45 PM', title: 'Photography & Family Blessings' },
    { time: '08:15 PM', title: 'Celebration Dinner & Festive Music' },
  ];

  return (
    <section id="events" className="relative py-16 sm:py-24 bg-[#F6F0E6] overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            Wedding Events
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            Join us for the celebrations
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold" />
        </div>

        {/* Responsive Events Grid (1 Column on Mobile, 2 Columns on Tablet/Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, idx) => {
            const isFlipped = !!flippedCards[idx];
            const schedule = idx === 0 ? ceremonySchedule : receptionSchedule;

            return (
              <div
                key={event.id || idx}
                role="button"
                tabIndex={0}
                aria-label={`${event.title} - Click or press enter to flip card for details`}
                aria-expanded={isFlipped}
                onClick={() => toggleFlip(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(idx);
                  }
                }}
                className="relative w-full h-[520px] sm:h-[490px] [perspective:1400px] cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-3xl"
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
                      FRONT FACE: EVENT OVERVIEW & PHOTOGRAPHY
                      ================================================== */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-[#FFFDF8] border border-gold/40 shadow-card-soft hover:shadow-xl transition-shadow flex flex-col justify-between overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)]"
                    style={{ zIndex: isFlipped ? 1 : 2 }}
                  >
                    {/* Event Image Banner with Overlay */}
                    <div className="relative h-48 sm:h-44 overflow-hidden shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/30 to-transparent" />

                      {/* Event Type Badge */}
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FFFDF8]/95 backdrop-blur-md border border-gold/40 text-charcoal-deep text-[10.5px] font-serif uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-sm">
                        {idx === 0 ? (
                          <HeartHandshake className="w-3.5 h-3.5 text-gold-dark" />
                        ) : (
                          <Wine className="w-3.5 h-3.5 text-gold-dark" />
                        )}
                        <span>{event.type}</span>
                      </div>

                      {/* Flip Hint Chip on Image */}
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-gold/40 text-gold-light text-[9.5px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                        <RotateCw className="w-3 h-3 text-gold-light" />
                        <span>Flip Card</span>
                      </div>

                      {/* Event Title on Image Gradient */}
                      <div className="absolute bottom-3 inset-x-4">
                        <h3 className="font-serif text-2xl text-white font-semibold leading-tight drop-shadow-sm">
                          {event.title}
                        </h3>
                        {event.titleKannada && (
                          <p className="font-kannada font-bold text-xs text-gold-light mt-0.5">
                            {event.titleKannada}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Body Information */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      {/* Date & Time Highlights */}
                      <div className="space-y-2 py-2 border-b border-gold/20 text-xs text-charcoal font-sans">
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-gold-dark shrink-0" />
                          <div>
                            <span className="font-medium text-charcoal-deep block">{event.date}</span>
                            <span className="font-kannada text-[11px] text-[#4A5D43] block">
                              ೦೮-೦೨-೨೦೨೭, ಸೋಮವಾರ
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-gold-dark shrink-0" />
                          <div>
                            <span className="text-charcoal-deep font-semibold block">{event.time}</span>
                            {event.timeKannada && (
                              <span className="font-kannada text-[11px] text-[#8B2628] block">
                                {event.timeKannada}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                          <div>
                            <p className="font-kannada font-bold text-xs text-charcoal-deep">
                              {event.venueName}
                            </p>
                            <p className="text-charcoal-light text-[11px]">Sagara Road, Ripponpete</p>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Flip Callout Prompt */}
                      <div className="pt-2">
                        <div className="w-full py-2.5 px-4 rounded-xl bg-gold/10 border border-gold/30 text-gold-dark group-hover:bg-gold/20 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors">
                          <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                          <span>Tap to View Schedule &amp; Maps ↻</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                      BACK FACE: DETAILED SCHEDULE, RITUALS & MAPS
                      ================================================== */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-3xl bg-[#FFFDF8] border-2 border-gold/60 shadow-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] text-charcoal-deep"
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
                            Event Guide &amp; Schedule
                          </span>
                          <h4 className="font-serif text-xl font-bold text-charcoal-deep">
                            {event.title}
                          </h4>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Ritual & Event Schedule Timeline */}
                      <div className="space-y-2.5 my-3">
                        <span className="font-sans text-[10px] uppercase tracking-wider text-charcoal-light font-semibold block mb-1">
                          Programme Timings:
                        </span>
                        {schedule.map((item, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2.5 bg-ivory-50/70 p-2 rounded-xl border border-gold/20 text-xs"
                          >
                            <span className="font-mono font-bold text-gold-dark shrink-0 pt-0.5">
                              {item.time}
                            </span>
                            <span className="text-charcoal font-medium leading-snug">
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Dress Code guidance */}
                      {event.dressCode && (
                        <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/20 text-xs font-sans text-charcoal-dark mb-3">
                          <span className="font-semibold text-gold-dark uppercase tracking-wider text-[9.5px] block">
                            Attire Guidance:
                          </span>
                          <span className="text-[11px] text-charcoal font-medium">
                            {event.dressCode}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Back Actions: Google Maps & Flip Return */}
                    <div className="space-y-2 pt-2 border-t border-gold/20">
                      {event.googleMapsUrl && (
                        <a
                          href={event.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                        >
                          <span>Get GPS Navigation</span>
                          <Navigation className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="w-full py-1.5 text-center text-[11px] font-sans uppercase tracking-wider text-charcoal-light hover:text-gold-dark flex items-center justify-center gap-1 transition-colors"
                      >
                        <RotateCw className="w-3 h-3 text-gold-dark" />
                        <span>↺ Flip back to overview</span>
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
