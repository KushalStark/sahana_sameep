import React from 'react';
import { motion } from 'framer-motion';
import { LotusMotif, OrnamentalDivider } from '../assets/BotanicalElements';

/**
 * Mangalsutra / Sacred Wedding Jewellery Kinetic Detail
 * Artistic Indian wedding detail with black & gold beads, filigree cups, and drop pearls.
 * Features realistic metallic specular highlights and gentle pendular sway.
 */
export default function MangalsutraDetail({ enabled = true }) {
  if (!enabled) return null;

  return (
    <section className="relative py-16 bg-[#FFFDF8] border-y border-gold/20 overflow-hidden select-none">
      <div className="max-w-[390px] mx-auto px-6 text-center">
        {/* Caption */}
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold-dark font-semibold mb-1">
          Auspicious Heritage
        </p>

        <h3 className="font-serif text-2xl text-charcoal-deep font-medium mb-2">
          The Sacred Thread
        </h3>

        <p className="font-serif text-xs sm:text-sm text-charcoal-light italic max-w-xs mx-auto mb-6">
          "Woven with love, blessed with sacred mantras, uniting two destinies forever."
        </p>

        {/* Kinetic Jewellery Stage */}
        <div className="relative w-full h-[220px] flex items-center justify-center">
          {/* Pendular Sway Container */}
          <motion.div
            initial={{ rotate: -1.5 }}
            animate={{ rotate: 1.5 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 4.5,
              ease: 'easeInOut',
            }}
            className="w-[280px] h-[200px] flex items-center justify-center"
            style={{ transformOrigin: 'top center' }}
          >
            <svg
              viewBox="0 0 280 200"
              className="w-full h-full drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gold Metallic Bead Gradient */}
                <radialGradient id="goldBead" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFF2D6" />
                  <stop offset="30%" stopColor="#E5CCA0" />
                  <stop offset="70%" stopColor="#C5A16B" />
                  <stop offset="100%" stopColor="#7A5624" />
                </radialGradient>

                {/* Auspicious Black Obsidian Bead Gradient */}
                <radialGradient id="blackBead" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#555555" />
                  <stop offset="40%" stopColor="#222222" />
                  <stop offset="100%" stopColor="#080808" />
                </radialGradient>

                {/* Pearl Drop Gradient */}
                <radialGradient id="pearlDrop" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#F5EFE6" />
                  <stop offset="90%" stopColor="#DFD2C0" />
                  <stop offset="100%" stopColor="#B39E82" />
                </radialGradient>

                {/* Chain Link Shimmer */}
                <linearGradient id="goldChain" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5A16B" />
                  <stop offset="50%" stopColor="#FFF2D6" />
                  <stop offset="100%" stopColor="#A67C45" />
                </linearGradient>
              </defs>

              {/* Draped Gold Chain Arch */}
              <path
                d="M 20 20 Q 140 145 260 20"
                stroke="url(#goldChain)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.9"
              />

              {/* Repeating Black & Gold Seed Beads along Draped Arc */}
              {[
                { cx: 35, cy: 38 },
                { cx: 52, cy: 55 },
                { cx: 70, cy: 72 },
                { cx: 90, cy: 88 },
                { cx: 110, cy: 101 },
                { cx: 130, cy: 110 },
                { cx: 150, cy: 110 },
                { cx: 170, cy: 101 },
                { cx: 190, cy: 88 },
                { cx: 210, cy: 72 },
                { cx: 228, cy: 55 },
                { cx: 245, cy: 38 },
              ].map((b, i) => (
                <g key={i}>
                  {/* Alternating Black and Gold Beads */}
                  <circle
                    cx={b.cx}
                    cy={b.cy}
                    r={i % 2 === 0 ? 3.4 : 2.8}
                    fill={i % 2 === 0 ? 'url(#blackBead)' : 'url(#goldBead)'}
                  />
                  {/* Subtle specular glint */}
                  <circle cx={b.cx - 1} cy={b.cy - 1} r="0.8" fill="#FFFFFF" opacity="0.7" />
                </g>
              ))}

              {/* Center Traditional Dual Wati / Filigree Pendant Cups */}
              <g transform="translate(140, 118)">
                {/* Connector Ring */}
                <circle cx="0" cy="-6" r="3" stroke="url(#goldBead)" strokeWidth="1.2" fill="none" />

                {/* Left Sacred Golden Cup (Wati) */}
                <g transform="translate(-14, 0)">
                  <path
                    d="M 0 0 C 8 0, 14 6, 14 16 C 14 26, 0 32, 0 32 C 0 32, -14 26, -14 16 C -14 6, -8 0, 0 0 Z"
                    fill="url(#goldBead)"
                    stroke="#8C632F"
                    strokeWidth="0.8"
                  />
                  {/* Inner filigree floral engraving */}
                  <circle cx="0" cy="14" r="5" stroke="#F5DFB8" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <circle cx="0" cy="14" r="1.5" fill="#8C632F" />
                  {/* Bottom dangling pearl */}
                  <line x1="0" y1="32" x2="0" y2="38" stroke="url(#goldBead)" strokeWidth="1" />
                  <circle cx="0" cy="42" r="3.5" fill="url(#pearlDrop)" />
                </g>

                {/* Center Auspicious Floral Connector */}
                <circle cx="0" cy="12" r="3.2" fill="url(#goldBead)" />
                <circle cx="0" cy="12" r="1.2" fill="#FFFFFF" opacity="0.8" />

                {/* Right Sacred Golden Cup (Wati) */}
                <g transform="translate(14, 0)">
                  <path
                    d="M 0 0 C 8 0, 14 6, 14 16 C 14 26, 0 32, 0 32 C 0 32, -14 26, -14 16 C -14 6, -8 0, 0 0 Z"
                    fill="url(#goldBead)"
                    stroke="#8C632F"
                    strokeWidth="0.8"
                  />
                  {/* Inner filigree floral engraving */}
                  <circle cx="0" cy="14" r="5" stroke="#F5DFB8" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <circle cx="0" cy="14" r="1.5" fill="#8C632F" />
                  {/* Bottom dangling pearl */}
                  <line x1="0" y1="32" x2="0" y2="38" stroke="url(#goldBead)" strokeWidth="1" />
                  <circle cx="0" cy="42" r="3.5" fill="url(#pearlDrop)" />
                </g>
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
