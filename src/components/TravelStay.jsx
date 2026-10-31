import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Building2, ExternalLink } from 'lucide-react';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';

const travelIcons = {
  airport: Plane,
  railway: Train,
  stay: Building2,
};

export default function TravelStay({ travel }) {
  if (!travel || !travel.enabled) return null;

  return (
    <section id="travel" className="relative py-16 sm:py-24 bg-[#F6F0E6] overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            {travel.title || "Travel & Stay"}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            {travel.subtitle || "Helpful information for your visit"}
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold" />
        </div>

        {/* 3 Travel Cards Grid (1 Col Mobile, 3 Cols Tablet/Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {travel.cards.map((card, idx) => {
            const IconComponent = travelIcons[card.id] || Building2;
            return (
              <motion.div
                key={card.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FFFDF8] rounded-2xl border border-gold/35 shadow-card-soft p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
                      <IconComponent className="w-4 h-4 text-gold-dark" />
                    </div>
                    <div>
                      <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-dark font-medium block">
                        Transit
                      </span>
                      <h3 className="font-serif text-base text-charcoal-deep font-semibold">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-sans text-xs font-medium text-charcoal mb-0.5">
                    {card.name}
                  </p>

                  <p className="font-sans text-[11px] text-gold-dark font-medium mb-2">
                    {card.distance}
                  </p>

                  {card.note && (
                    <p className="font-sans text-[11px] text-charcoal-light leading-relaxed mb-3">
                      {card.note}
                    </p>
                  )}
                </div>

                {card.link && (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] py-2 px-3 rounded-xl border border-gold/40 text-gold-dark hover:bg-gold/10 font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
