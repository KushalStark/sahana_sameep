import React from 'react';
import { motion } from 'framer-motion';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';
import { Heart } from 'lucide-react';

export default function FamilyMessage({ familyNote }) {
  if (!familyNote) return null;

  return (
    <section className="relative py-16 sm:py-24 bg-[#FAF6EF] overflow-hidden select-none">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            {familyNote.title || "A Note From Our Families"}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            {familyNote.subtitle || "Your love and blessings mean the world to us."}
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold" />
        </div>

        {/* 2 Family Cards Grid (1 Column on Mobile, 2 Columns on Tablet/Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Bride's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FFFDF8] rounded-3xl border border-gold/40 shadow-card-soft p-5 relative"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-dark font-semibold">
                With Warm Blessings
              </span>
              <Heart className="w-4 h-4 text-gold-dark" />
            </div>

            <h3 className="font-serif text-xl text-charcoal-deep font-semibold mb-2">
              {familyNote.brideFamily.title}
            </h3>

            <p className="font-serif text-sm text-charcoal italic leading-relaxed mb-4">
              "{familyNote.brideFamily.message}"
            </p>

            <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-wider text-charcoal-light font-medium">
                {familyNote.brideFamily.names}
              </span>
              <LotusMotif className="w-5 h-5 text-gold/60" />
            </div>
          </motion.div>

          {/* Groom's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#FFFDF8] rounded-3xl border border-gold/40 shadow-card-soft p-5 relative"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-dark font-semibold">
                With Joyful Hearts
              </span>
              <Heart className="w-4 h-4 text-gold-dark" />
            </div>

            <h3 className="font-serif text-xl text-charcoal-deep font-semibold mb-2">
              {familyNote.groomFamily.title}
            </h3>

            <p className="font-serif text-sm text-charcoal italic leading-relaxed mb-4">
              "{familyNote.groomFamily.message}"
            </p>

            <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-wider text-charcoal-light font-medium">
                {familyNote.groomFamily.names}
              </span>
              <LotusMotif className="w-5 h-5 text-gold/60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
