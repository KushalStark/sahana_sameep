import React from 'react';
import { ArrowUp, Heart, Mail } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { OrnamentalDivider } from '../assets/BotanicalElements';

export default function Footer({ couple, thankYou, onOpenEnvelope }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FAF6EF] pt-16 pb-12 overflow-hidden border-t border-gold/30 select-none pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Monogram Brand Crest */}
        <div className="flex justify-center mb-3">
          <SSMonogram size={78} variant="gold" />
        </div>

        {/* Thank You Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.16em] font-medium text-charcoal-deep uppercase mb-1">
          {thankYou.heading || "THANK YOU"}
        </h2>

        {/* Subtitle */}
        <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
          {thankYou.subheading || "We can't wait to celebrate with you"}
        </p>

        <OrnamentalDivider className="max-w-[200px] mx-auto text-gold mb-5" />

        {/* Couple Names */}
        <div className="font-serif text-xl sm:text-2xl tracking-[0.16em] text-charcoal-deep font-semibold uppercase mb-3">
          {couple.bride} &amp; {couple.groom}
        </div>

        <p className="font-serif text-sm text-charcoal-light italic max-w-md mx-auto mb-8 leading-relaxed">
          "{thankYou.closingNote}"
        </p>

        {/* Interactive Actions (Min 44px height) */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full max-w-md mx-auto justify-center">
          <button
            onClick={onOpenEnvelope}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-gold/50 bg-[#FFFDF8] hover:bg-gold/10 text-charcoal-deep text-xs font-sans uppercase tracking-wider font-medium shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-gold-dark" />
            <span>View Invitation</span>
          </button>

          <button
            onClick={scrollToTop}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-gold/50 bg-[#FFFDF8] hover:bg-gold/10 text-charcoal-deep text-xs font-sans uppercase tracking-wider font-medium shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-gold-dark" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gold/20 text-[10px] font-sans text-charcoal-light/70 flex flex-col items-center gap-1">
          <span>
            Crafted with <Heart className="w-3 h-3 text-gold inline mx-0.5 fill-gold" /> for Sahana & Sameep's Wedding
          </span>
          <span>2027 • Official Wedding Invitation</span>
        </div>
      </div>
    </footer>
  );
}
