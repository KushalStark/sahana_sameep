import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CornerFlourish } from '../assets/BotanicalElements';
import SSMonogram from '../assets/SSMonogram';

export default function LoadingScreen({ onComplete, autoDismissDelay = 2200 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation over duration
    const interval = 25;
    const step = 100 / (autoDismissDelay / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoDismissDelay, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6EF] text-charcoal-dark px-4 overflow-hidden select-none"
    >
      {/* Botanical Corner Ornaments */}
      <div className="absolute top-3 left-3">
        <CornerFlourish className="w-16 h-16 text-gold/60" position="top-left" />
      </div>
      <div className="absolute top-3 right-3">
        <CornerFlourish className="w-16 h-16 text-gold/60" position="top-right" />
      </div>
      <div className="absolute bottom-3 left-3">
        <CornerFlourish className="w-16 h-16 text-gold/60" position="bottom-left" />
      </div>
      <div className="absolute bottom-3 right-3">
        <CornerFlourish className="w-16 h-16 text-gold/60" position="bottom-right" />
      </div>

      {/* Outer Fine Double Border */}
      <div className="absolute inset-3 border border-gold/40 rounded-sm pointer-events-none" />
      <div className="absolute inset-4 border border-gold/20 rounded-sm pointer-events-none" />

      {/* Center Monogram & Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex flex-col items-center text-center max-w-[320px] z-10"
      >
        {/* Master S&S Vector Monogram Logo */}
        <div className="mb-4">
          <SSMonogram size={92} variant="gold" />
        </div>

        <h1 className="font-serif text-2xl tracking-[0.2em] font-medium text-charcoal-deep uppercase mt-1 mb-1">
          Sahana & Sameep
        </h1>

        <p className="font-script text-2xl text-gold-dark mb-6">
          A celebration of love
        </p>

        {/* Thin Gold Progress Bar */}
        <div className="w-44 h-[2px] bg-gold/20 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-charcoal-light mt-3">
          Loading...
        </span>

        {/* Accessible Skip Button with 44px min tap area */}
        <button
          onClick={onComplete}
          className="mt-6 min-h-[44px] px-4 py-2 text-xs font-sans text-charcoal-light/80 hover:text-gold-dark transition-colors underline underline-offset-4 tracking-wider focus:outline-none"
        >
          Skip to Invitation
        </button>
      </motion.div>
    </motion.div>
  );
}
