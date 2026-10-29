import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Sparkles, Gem } from 'lucide-react';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';

const iconMap = {
  heart: Heart,
  coffee: Coffee,
  sparkles: Sparkles,
  gem: Gem,
};

export default function Story({ story }) {
  return (
    <section id="story" className="relative py-16 sm:py-24 bg-[#FAF6EF] overflow-hidden select-none">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            {story.title}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            {story.subtitle}
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold" />
        </div>

        {/* Editorial Photo & Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-14 max-w-4xl mx-auto">
          {/* Editorial Photo Frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-2 border border-gold/30 rounded-2xl rotate-1 pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFFDF8]">
              <img
                src={story.image}
                alt="Sahana & Sameep"
                className="w-full h-[320px] sm:h-[380px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white font-serif text-sm italic tracking-wide">
                Sahana &amp; Sameep • Sunset Promises
              </div>
            </div>
          </motion.div>

          {/* Story Narrative Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
              The Journey of Us
            </span>
            <p className="font-serif text-lg sm:text-xl text-charcoal leading-relaxed italic mb-4">
              "{story.leadParagraph}"
            </p>
            <p className="font-sans text-xs sm:text-sm text-charcoal-light leading-relaxed font-light">
              We believe that the best love stories are written not in grand proclamations, but in
              the quiet moments shared — inside jokes, spontaneous road trips, and the comforting
              assurance of having found home in each other.
            </p>
          </motion.div>
        </div>

        {/* Vertical Timeline Ribbon */}
        <div className="relative border-l-2 border-gold/30 ml-4 sm:ml-auto max-w-xl mx-auto pl-6 sm:pl-8 space-y-7">
          {story.timeline.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Heart;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-[#FFFDF8] rounded-2xl p-4 border border-gold/35 shadow-card-soft"
              >
                {/* Node on vertical timeline bar */}
                <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-gold-dark">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-gold-dark font-semibold block mb-0.5">
                  {item.period}
                </span>

                <h3 className="font-serif text-lg font-semibold text-charcoal-deep mb-1">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-charcoal-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
