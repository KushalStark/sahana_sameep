import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, Send, User, Phone, MessageSquare, HeartHandshake } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';

export default function RSVP({ rsvpConfig, couple, guestName = '' }) {
  const [formData, setFormData] = useState({
    fullName: guestName || '',
    phone: '',
    attending: 'yes',
    message: '',
  });

  useEffect(() => {
    if (guestName && !formData.fullName) {
      setFormData((prev) => ({ ...prev, fullName: guestName }));
    }
  }, [guestName]);

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Supports both .env (VITE_RSVP_ENDPOINT) and config file (weddingConfig.rsvp.endpoint)
  const endpoint = (import.meta.env.VITE_RSVP_ENDPOINT || rsvpConfig?.endpoint || '').trim();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        newErrors.phone = 'Please provide a valid phone number.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#C5A16B', '#EAD9B8', '#A8B49A', '#EAD6D0', '#786C63'],
      });
    } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || status === 'submitting') return;

    setStatus('submitting');
    setFeedbackMessage('');

    const submissionPayload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString(),
    };

    if (endpoint && endpoint.trim().length > 0) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionPayload),
          mode: 'no-cors',
        });
        setStatus('success');
        setFeedbackMessage('Thank you! Your RSVP has been confirmed and recorded.');
        triggerCelebration();
      } catch (err) {
        setStatus('error');
        setFeedbackMessage(
          'Failed to submit RSVP to the server. Please check your connection or contact the couple directly.'
        );
      }
    } else {
      // Demo Mode
      setTimeout(() => {
        setStatus('success');
        setFeedbackMessage(
          'RSVP Simulated (Demo Mode): Submissions validate and record cleanly.'
        );
        triggerCelebration();
      }, 700);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      attending: 'yes',
      message: '',
    });
    setStatus('idle');
    setFeedbackMessage('');
  };

  return (
    <section id="rsvp" className="relative py-16 sm:py-24 bg-[#F6F0E6] overflow-hidden select-none">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-2">
            <LotusMotif className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.14em] font-medium text-charcoal-deep uppercase mb-1">
            {rsvpConfig.title || "Kindly RSVP"}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-gold-dark mb-3">
            {rsvpConfig.subtitle || "Let us know if you'll join us"}
          </p>
          <OrnamentalDivider className="max-w-[200px] mx-auto text-gold mb-2" />
          {rsvpConfig.deadline && (
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-charcoal-light font-medium">
              {rsvpConfig.deadline}
            </p>
          )}
        </div>

        {/* Card Container */}
        <div className="bg-[#FFFDF8] rounded-3xl border border-gold/40 shadow-xl p-5 sm:p-8 max-w-xl mx-auto relative">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 px-2"
              >
                {/* Master S&S Monogram */}
                <div className="mb-3 flex justify-center">
                  <SSMonogram size={68} variant="gold" />
                </div>

                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h3 className="font-serif text-2xl text-charcoal-deep font-semibold mb-1">
                  RSVP Received
                </h3>

                <p className="font-serif text-base text-charcoal italic mb-3">
                  "Thank you {formData.fullName}. We are delighted and look forward to celebrating together!"
                </p>

                <p className="font-sans text-[11px] text-charcoal-light mb-6 bg-gold/10 p-3 rounded-xl border border-gold/20">
                  {feedbackMessage}
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="min-h-[44px] px-6 py-2.5 rounded-full border border-gold/50 text-gold-dark hover:bg-gold hover:text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all active:scale-95"
                >
                  Submit Another Response
                </button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Demo Mode Notice */}
                {!endpoint && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl text-[10px] font-sans text-amber-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>Demo Mode: Submissions validate and simulate locally.</span>
                  </div>
                )}

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-sans text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {/* Full Name (16px font-size to prevent iOS zoom) */}
                <div>
                  <label htmlFor="fullName" className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-charcoal mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    placeholder="e.g. Rahul & Priya"
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-ivory-50 border border-gold/30 text-base font-sans text-charcoal-deep placeholder:text-charcoal-light/40 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-600 font-sans">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-charcoal mb-1">
                    Phone Number <span className="text-charcoal-light/60 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: null });
                    }}
                    placeholder="+91 98765 43210"
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl bg-ivory-50 border border-gold/30 text-base font-sans text-charcoal-deep placeholder:text-charcoal-light/40 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-600 font-sans">{errors.phone}</p>
                  )}
                </div>

                {/* Attendance Radio Cards */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-charcoal mb-1.5">
                    Will you attend? <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`min-h-[48px] flex items-center justify-center p-2 rounded-xl border cursor-pointer text-center text-xs font-sans transition-all ${
                        formData.attending === 'yes'
                          ? 'border-gold bg-gold/15 text-charcoal-deep font-semibold ring-1 ring-gold'
                          : 'border-gold/30 bg-ivory-50 text-charcoal-light'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formData.attending === 'yes'}
                        onChange={() => setFormData({ ...formData, attending: 'yes' })}
                        className="sr-only"
                      />
                      <span>Yes, attending!</span>
                    </label>

                    <label
                      className={`min-h-[48px] flex items-center justify-center p-2 rounded-xl border cursor-pointer text-center text-xs font-sans transition-all ${
                        formData.attending === 'no'
                          ? 'border-charcoal-light bg-charcoal/10 text-charcoal-deep font-semibold ring-1 ring-charcoal-light'
                          : 'border-gold/30 bg-ivory-50 text-charcoal-light'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={formData.attending === 'no'}
                        onChange={() => setFormData({ ...formData, attending: 'no' })}
                        className="sr-only"
                      />
                      <span>Regretfully decline</span>
                    </label>
                  </div>
                </div>

                {/* Wishes / Message */}
                <div>
                  <label htmlFor="message" className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-charcoal mb-1">
                    Wishes for Sahana & Sameep (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your blessings..."
                    className="w-full px-3.5 py-2 rounded-xl bg-ivory-50 border border-gold/30 text-base font-sans text-charcoal-deep placeholder:text-charcoal-light/40 focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>

                {/* Submit button (Min 48px touch target) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-white font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Confirming...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Confirm Attendance</span>
                        <Send className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
