import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LotusMotif, ArchFlourish, OrnamentalDivider } from '../assets/BotanicalElements';
import { Clock, Heart } from 'lucide-react';

export default function Countdown({
  targetDate,
  timeZone = "Asia/Kolkata",
  subtitle = "We can't wait to celebrate with you",
  quote = "Good people, good food, great memories.",
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
    isValid: true,
  });

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft((prev) => ({ ...prev, isValid: false }));
      return;
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();

      if (isNaN(target)) {
        setTimeLeft((prev) => ({ ...prev, isValid: false }));
        return;
      }

      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
          isValid: true,
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isPassed: false,
          isValid: true,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, timeZone]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-16 sm:py-24 bg-[#FAF6EF] overflow-hidden select-none">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Arch Flourish & Header */}
        <div className="flex justify-center mb-1">
          <ArchFlourish className="w-44 h-7 text-gold" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
          The Countdown
        </h2>

        <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
          {subtitle}
        </p>

        <OrnamentalDivider className="max-w-[200px] mx-auto text-gold mb-8" />

        {/* Invalid or Passed State */}
        {!timeLeft.isValid ? (
          <div className="p-6 bg-[#FFFDF8] rounded-2xl border border-gold/30 shadow-card-soft max-w-md mx-auto">
            <Clock className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="font-serif text-lg text-charcoal-deep">Counting down to our special day</p>
          </div>
        ) : timeLeft.isPassed ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-[#FFFDF8] rounded-2xl border border-gold/40 shadow-xl max-w-md mx-auto"
          >
            <Heart className="w-8 h-8 text-gold-dark mx-auto mb-2 animate-pulse" />
            <h3 className="font-serif text-2xl text-charcoal-deep mb-1">
              Today is the Celebration!
            </h3>
            <p className="font-serif text-sm text-charcoal italic">
              "Two souls, one heart. The celebration has begun."
            </p>
          </motion.div>
        ) : (
          /* 4 Compact Cards in a row */
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md sm:max-w-xl mx-auto">
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#FFFDF8] rounded-2xl p-2.5 sm:p-3 border border-gold/35 shadow-card-soft relative group overflow-hidden flex flex-col items-center justify-center"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />

                <span
                  style={{ fontSize: 'clamp(1.5rem, 6.5vw, 2.2rem)' }}
                  className="font-serif font-light text-charcoal-deep block leading-tight mt-1 mb-0.5"
                >
                  {String(unit.value).padStart(2, '0')}
                </span>

                <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-charcoal-light font-medium block">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Auspicious Muhurtha Target Info */}
        <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-charcoal-deep text-[11px] font-sans">
          <Clock className="w-3.5 h-3.5 text-gold-dark" />
          <span>Muhurtha: <strong>12:35 PM IST</strong> (08 February 2027)</span>
        </div>

        {/* Romantic Italic Quote Below */}
        {quote && (
          <div className="mt-6">
            <p className="font-script text-2xl text-gold-dark font-normal">
              "{quote}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
