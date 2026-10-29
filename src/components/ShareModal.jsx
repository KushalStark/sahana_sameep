import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, MessageCircle, QrCode, Sparkles } from 'lucide-react';
import SSMonogram from '../assets/SSMonogram';
import { getQrCodeUrl } from '../utils/qrGenerator';

export default function ShareModal({ isOpen, onClose, shareConfig, couple }) {
  const [copied, setCopied] = useState(false);
  const [customGuest, setCustomGuest] = useState('');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : shareConfig.url;
  const personalizedUrl = customGuest.trim()
    ? `${currentUrl}?guest=${encodeURIComponent(customGuest.trim())}`
    : currentUrl;

  const qrImageUrl = getQrCodeUrl(personalizedUrl, 220);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalizedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareConfig.title,
          text: `${couple.bride} & ${couple.groom}'s Wedding Invitation`,
          url: personalizedUrl,
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareConfig.whatsappMessage} ${personalizedUrl}`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/65 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-[370px] bg-[#FFFDF8] rounded-3xl border border-gold/40 shadow-2xl p-5 text-charcoal-deep"
        >
          {/* Close button (min 44px touch) */}
          <button
            onClick={onClose}
            aria-label="Close share dialog"
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-charcoal-light hover:text-charcoal-deep active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex justify-center mb-1.5">
              <SSMonogram size={48} variant="gold" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-0.5">
              Share Invitation
            </h3>
            <p className="font-sans text-[11px] text-charcoal-light">
              Send our wedding card to friends & family
            </p>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-ivory-100/70 border border-gold/30 mb-4">
            <div className="w-36 h-36 rounded-xl overflow-hidden bg-white p-2 border border-gold/20 shadow-sm flex items-center justify-center">
              <img
                src={qrImageUrl}
                alt="QR Code for Wedding Invitation"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-sans text-[10px] text-charcoal-light mt-1.5 flex items-center gap-1">
              <QrCode className="w-3 h-3 text-gold-dark" />
              <span>Scan to open on smartphone</span>
            </span>
          </div>

          {/* Personalize link with guest name */}
          <div className="mb-4">
            <label className="block text-[10px] uppercase tracking-wider font-sans font-semibold text-charcoal-light mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-dark" />
              <span>Personalize for Guest (Optional):</span>
            </label>
            <input
              type="text"
              value={customGuest}
              onChange={(e) => setCustomGuest(e.target.value)}
              placeholder="e.g. Rahul & Priya"
              className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-ivory-50 border border-gold/30 text-base font-sans text-charcoal-deep focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          {/* Action Buttons (Min 44px) */}
          <div className="space-y-2">
            {/* Copy Link */}
            <button
              onClick={handleCopy}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl border border-gold/50 bg-[#FAF6EF] text-charcoal-deep font-sans text-xs uppercase tracking-wider font-semibold active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gold-dark" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {/* WhatsApp Share */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-sans text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share via WhatsApp</span>
            </a>

            {/* Native Share */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full min-h-[44px] py-2 px-4 rounded-xl border border-charcoal/20 text-charcoal-dark font-sans text-xs uppercase tracking-wider font-medium active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Other Share Options</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
