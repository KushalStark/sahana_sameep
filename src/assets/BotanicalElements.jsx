import React from 'react';

/**
 * Botanical & Ornamental Elements for Sahana & Sameep Wedding Invitation
 * Delicate Indian lotus motifs, floral borders, arches, dividers and wax seals
 */

export const GaneshaMotif = ({ className = "w-12 h-12 text-kumkum", strokeWidth = 1.4 }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
  >
    {/* Sacred Crown / Mukuta */}
    <path d="M44 14 L50 6 L56 14" strokeWidth={strokeWidth} />
    <path d="M42 16 C46 12, 54 12, 58 16" />
    <circle cx="50" cy="5" r="1.5" fill="currentColor" />

    {/* Sacred Forehead & Ears (Graceful traditional curves) */}
    {/* Left Ear */}
    <path d="M42 22 C28 20, 24 30, 30 38 C35 44, 40 38, 42 34" />
    {/* Right Ear */}
    <path d="M58 22 C72 20, 76 30, 70 38 C65 44, 60 38, 58 34" />

    {/* Center Sacred Tilak / Namam */}
    <path d="M50 18 L50 32" strokeWidth="2" />
    <circle cx="50" cy="35" r="2" fill="currentColor" />
    <path d="M46 24 C48 27, 52 27, 54 24" />

    {/* Trunk (Vakratunda curving to left) */}
    <path d="M44 32 C42 42, 40 52, 46 64 C52 74, 38 82, 32 76 C28 72, 32 66, 36 68 C39 70, 38 74, 34 74" strokeWidth={strokeWidth * 1.1} />

    {/* Tusk & Modaka */}
    <path d="M41 42 L36 42" strokeWidth="1.6" /> {/* Small right tusk */}
    <circle cx="28" cy="74" r="2.5" fill="#C5A16B" stroke="currentColor" strokeWidth="0.8" /> {/* Modaka in trunk */}

    {/* Sacred Base Lotus Petal Flourish */}
    <path d="M30 88 C40 82, 60 82, 70 88" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
    <circle cx="50" cy="85" r="1.5" fill="currentColor" opacity="0.8" />
  </svg>
);

export const LotusMotif = ({ className = "w-12 h-12 text-gold", strokeWidth = 1.2 }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Center central lotus petal */}
    <path d="M50 10 C46 30, 42 45, 50 65 C58 45, 54 30, 50 10 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M50 10 C44 26, 38 42, 50 65" />
    
    {/* Inner side petals */}
    <path d="M50 65 C40 45, 26 30, 32 18 C38 25, 44 48, 50 65 Z" fill="currentColor" fillOpacity="0.06" />
    <path d="M50 65 C60 45, 74 30, 68 18 C62 25, 56 48, 50 65 Z" fill="currentColor" fillOpacity="0.06" />
    
    {/* Outer side petals */}
    <path d="M50 65 C34 52, 14 42, 16 30 C25 35, 36 50, 50 65 Z" fill="currentColor" fillOpacity="0.04" />
    <path d="M50 65 C66 52, 86 42, 84 30 C75 35, 64 50, 50 65 Z" fill="currentColor" fillOpacity="0.04" />
    
    {/* Lowest blooming outer petals */}
    <path d="M50 65 C30 60, 8 58, 6 48 C18 48, 34 58, 50 65" />
    <path d="M50 65 C70 60, 92 58, 94 48 C82 48, 66 58, 50 65" />

    {/* Stem / Base pedicel */}
    <path d="M42 66 C46 72, 54 72, 58 66" />
    <path d="M50 66 L50 75" />
    <path d="M45 74 C48 76, 52 76, 55 74" />
    <circle cx="50" cy="8" r="1.5" fill="currentColor" />
  </svg>
);

export const CornerFlourish = ({ className = "w-24 h-24 text-gold", position = "top-left" }) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "scale(1, 1)";
    }
  };

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transformOrigin: "center", transform: getTransform() }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer border corner */}
        <path d="M6 100 L6 14 C6 9.5 9.5 6 14 6 L100 6" strokeOpacity="0.6" strokeWidth="1" />
        <path d="M12 100 L12 18 C12 14.5 14.5 12 18 12 L100 12" strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray="3,3" />

        {/* Delicate vine curves */}
        <path d="M6 6 C28 20, 45 40, 52 70" strokeOpacity="0.8" />
        <path d="M6 6 C20 28, 40 45, 70 52" strokeOpacity="0.8" />

        {/* Blooming lotus in corner */}
        <path d="M30 30 C26 20, 32 12, 40 18 C38 24, 34 28, 30 30 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M30 30 C20 26, 12 32, 18 40 C24 38, 28 34, 30 30 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M30 30 C34 16, 46 22, 40 32 C36 34, 32 32, 30 30 Z" fill="currentColor" fillOpacity="0.15" />

        {/* Leaves along vine */}
        <path d="M42 48 C48 42, 58 44, 56 54 C50 56, 44 52, 42 48 Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M48 42 C42 48, 44 58, 54 56 C56 50, 52 44, 48 42 Z" fill="currentColor" fillOpacity="0.1" />

        {/* Small buds and stipples */}
        <circle cx="16" cy="16" r="2" fill="currentColor" fillOpacity="0.7" />
        <circle cx="56" cy="74" r="1.5" fill="currentColor" fillOpacity="0.6" />
        <circle cx="74" cy="56" r="1.5" fill="currentColor" fillOpacity="0.6" />
      </svg>
    </div>
  );
};

export const ArchFlourish = ({ className = "w-48 h-12 text-gold" }) => (
  <svg
    viewBox="0 0 240 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Arch curve with crest */}
    <path d="M20 48 Q120 -10 220 48" strokeOpacity="0.7" />
    <path d="M40 52 Q120 6 200 52" strokeOpacity="0.4" strokeDasharray="3,3" />

    {/* Center crown motif */}
    <circle cx="120" cy="18" r="2" fill="currentColor" />
    <path d="M120 6 C116 12, 114 16, 120 22 C126 16, 124 12, 120 6 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M112 18 C115 14, 118 16, 120 22" />
    <path d="M128 18 C125 14, 122 16, 120 22" />

    {/* Side scroll flourishes */}
    <path d="M60 44 C50 38, 45 42, 46 48 C48 52, 54 50, 56 46" />
    <path d="M180 44 C190 38, 195 42, 194 48 C192 52, 186 50, 184 46" />

    {/* Little dangling drop beads */}
    <circle cx="80" cy="38" r="1.2" fill="currentColor" />
    <circle cx="160" cy="38" r="1.2" fill="currentColor" />
  </svg>
);

export const OrnamentalDivider = ({ className = "w-full max-w-xs h-6 text-gold" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
    <div className="flex items-center gap-1.5 text-gold">
      <span className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold/20" />
      <LotusMotif className="w-5 h-5 text-gold" strokeWidth={1.5} />
      <span className="w-1.5 h-1.5 rotate-45 border border-gold bg-gold/20" />
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-gold via-gold/60 to-transparent" />
  </div>
);

export const WaxSeal = ({
  size = 76,
  monogram = "S & S",
  interactive = true,
  isBroken = false,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={interactive ? onClick : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => (e.key === "Enter" || e.key === " ") && onClick?.() : undefined}
      aria-label={`Wax seal with monogram ${monogram}`}
      className={`relative select-none flex items-center justify-center transition-all duration-500 ${
        interactive ? "cursor-pointer group hover:scale-105 active:scale-95" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow effect on hover */}
      {interactive && (
        <div
          className="absolute inset-0 rounded-full bg-gold/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "scale(1.2)" }}
        />
      )}

      {/* SVG Wax Seal */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
      >
        <defs>
          {/* Metallic gold & bronze wax gradient */}
          <radialGradient id="waxGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#E6C894" />
            <stop offset="25%" stopColor="#C5A16B" />
            <stop offset="70%" stopColor="#9C743D" />
            <stop offset="100%" stopColor="#6E4D20" />
          </radialGradient>

          {/* Shimmer rim gradient */}
          <linearGradient id="waxRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#C5A16B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4A3414" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Organic irregular wax edge */}
        <path
          d="M50 4 C64 3, 76 10, 85 20 C94 30, 97 44, 95 58 C93 72, 84 84, 72 91 C60 98, 44 97, 30 93 C16 89, 6 78, 4 64 C2 50, 8 36, 17 24 C26 12, 36 5, 50 4 Z"
          fill="url(#waxGrad)"
        />

        {/* Embossed outer ring */}
        <circle cx="50" cy="50" r="39" stroke="url(#waxRim)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="35" stroke="#7A5624" strokeWidth="1" strokeOpacity="0.6" />

        {/* Dotted bead ring */}
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke="#E6C894"
          strokeWidth="1.2"
          strokeDasharray="2.5, 3"
          strokeOpacity="0.8"
        />

        {/* Inner recessed plate */}
        <circle cx="50" cy="50" r="28" fill="#8C632F" fillOpacity="0.4" />

        {/* Embossed Custom S&S Vector Monogram Brand (Intertwined S&S) */}
        <g transform="translate(18, 16) scale(0.32)" fill="#FFF4DF">
          {/* Top Lotus Crown */}
          <g transform="translate(100, 24) scale(0.6)" stroke="#FFF4DF" fill="none" strokeWidth="1.6" strokeLinecap="round">
            <path d="M0 -14 C-4 -4, -3 4, 0 14 C3 4, 4 -4, 0 -14 Z" fill="#FFF4DF" fillOpacity="0.4" />
            <path d="M0 14 C-8 4, -14 -4, -11 -11 C-5 -8, -2 4, 0 14 Z" />
            <path d="M0 14 C8 4, 14 -4, 11 -11 C5 -8, 2 4, 0 14 Z" />
          </g>

          {/* Interlocking Monogram Strokes */}
          {/* S1 - Sahana */}
          <path d="
            M 82 52
            C 94 52, 102 59, 98 71
            C 94 82, 73 88, 67 98
            C 61 108, 64 122, 76 128
            C 87 133, 98 128, 103 120
            C 104 118, 106 120, 105 122
            C 99 133, 85 138, 71 133
            C 57 127, 53 111, 60 97
            C 67 84, 88 80, 92 70
            C 95 61, 88 56, 78 56
            C 69 56, 62 61, 59 66
            C 57 65, 56 63, 58 60
            C 63 54, 71 52, 82 52
            Z" 
          />
          <circle cx="58" cy="62" r="3.2" />
          <circle cx="104" cy="120" r="3.2" />

          {/* S2 - Sameep */}
          <path d="
            M 118 64
            C 130 64, 138 71, 134 83
            C 130 94, 109 100, 103 110
            C 97 120, 100 134, 112 140
            C 123 145, 134 140, 139 132
            C 140 130, 142 132, 141 134
            C 135 145, 121 150, 107 145
            C 93 139, 89 123, 96 109
            C 103 96, 124 92, 128 82
            C 131 73, 124 68, 114 68
            C 105 68, 98 73, 95 78
            C 93 77, 92 75, 94 72
            C 99 66, 107 64, 118 64
            Z"
          />
          <circle cx="94" cy="74" r="3.2" />
          <circle cx="140" cy="132" r="3.2" />

          {/* Ampersand Center Tie */}
          <path d="
            M 98 94
            C 95 91, 93 87, 95 83
            C 97 79, 103 79, 105 83
            C 107 87, 101 93, 96 99
            C 91 105, 87 113, 93 118
            C 98 122, 105 120, 109 114
            C 111 115, 110 117, 107 121
            C 102 126, 93 126, 88 120
            C 83 113, 86 103, 93 96
            C 97 92, 101 88, 100 84
            C 99 82, 95 82, 94 85
            C 93 88, 95 92, 98 94
            Z"
            opacity="0.8"
          />
        </g>
      </svg>
    </div>
  );
};

export const CeremonyAttireArt = ({ className = "w-36 h-48" }) => (
  <svg
    viewBox="0 0 160 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Bride Traditional Lehenga Silhouette */}
    <g transform="translate(15, 20)">
      {/* Head & Dupatta */}
      <circle cx="35" cy="25" r="9" fill="#EAD6D0" fillOpacity="0.4" stroke="#A67C45" />
      <path d="M22 24 C24 12, 46 12, 48 24 C50 36, 42 55, 48 85" stroke="#C5A16B" strokeWidth="1.2" fill="#FAF6EF" fillOpacity="0.3" />
      {/* Choli */}
      <path d="M26 36 L44 36 L40 54 L30 54 Z" fill="#C5A16B" fillOpacity="0.25" stroke="#A67C45" />
      {/* Flared Lehenga Skirt */}
      <path d="M30 55 L40 55 L58 135 C58 135, 35 140, 12 135 Z" fill="#EAD6D0" fillOpacity="0.3" stroke="#A67C45" strokeWidth="1.4" />
      {/* Gold Zari Border on Skirt */}
      <path d="M14 130 C30 134, 40 134, 56 130" stroke="#C5A16B" strokeWidth="2.5" />
      <path d="M16 124 C30 128, 40 128, 54 124" stroke="#C5A16B" strokeWidth="1" strokeDasharray="2,2" />
      {/* Jewelry necklace */}
      <path d="M30 36 C35 41, 35 41, 40 36" stroke="#C5A16B" strokeWidth="1.5" />
    </g>

    {/* Groom Royal Sherwani Silhouette */}
    <g transform="translate(75, 10)">
      {/* Turban / Safa */}
      <path d="M35 18 C30 14, 25 18, 25 24 C25 28, 45 28, 45 24 C45 18, 40 14, 35 18 Z" fill="#C5A16B" fillOpacity="0.3" stroke="#A67C45" />
      <path d="M35 12 L35 18" stroke="#C5A16B" strokeWidth="1.5" />
      <circle cx="35" cy="11" r="1.5" fill="#A67C45" />
      {/* Head */}
      <circle cx="35" cy="27" r="8" fill="#FAF6EF" stroke="#A67C45" />
      {/* Royal Sherwani */}
      <path d="M22 38 L48 38 L52 110 L18 110 Z" fill="#FAF6EF" fillOpacity="0.8" stroke="#A67C45" strokeWidth="1.4" />
      {/* Center Placket / Buttons */}
      <path d="M35 38 L35 108" stroke="#C5A16B" strokeWidth="1.2" />
      <circle cx="35" cy="46" r="1.2" fill="#C5A16B" />
      <circle cx="35" cy="56" r="1.2" fill="#C5A16B" />
      <circle cx="35" cy="66" r="1.2" fill="#C5A16B" />
      <circle cx="35" cy="76" r="1.2" fill="#C5A16B" />
      {/* Churidar / Trousers */}
      <path d="M22 110 L26 148 L32 148 L33 110" stroke="#786C63" />
      <path d="M37 110 L38 148 L44 148 L48 110" stroke="#786C63" />
      {/* Stole / Dupatta drape */}
      <path d="M22 42 C16 65, 16 90, 20 118" stroke="#A8B49A" strokeWidth="2.5" />
    </g>
  </svg>
);

export const ReceptionAttireArt = ({ className = "w-36 h-48" }) => (
  <svg
    viewBox="0 0 160 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Lady in Evening Gown */}
    <g transform="translate(15, 20)">
      {/* Head */}
      <circle cx="35" cy="24" r="8.5" fill="#EAD6D0" fillOpacity="0.4" stroke="#352C28" />
      {/* Evening Gown Bodice */}
      <path d="M27 34 L43 34 L38 58 L32 58 Z" fill="#352C28" fillOpacity="0.15" stroke="#352C28" />
      {/* Flowing Mermaid / A-line Gown */}
      <path d="M32 58 L38 58 L54 135 C54 135, 35 138, 16 135 Z" fill="#352C28" fillOpacity="0.75" stroke="#231D1A" strokeWidth="1.2" />
      {/* Shimmer sparkle */}
      <circle cx="35" cy="85" r="1" fill="#FFFDF8" opacity="0.6" />
      <circle cx="28" cy="105" r="1" fill="#FFFDF8" opacity="0.6" />
      <circle cx="42" cy="115" r="1" fill="#FFFDF8" opacity="0.6" />
    </g>

    {/* Gentleman in Tuxedo */}
    <g transform="translate(75, 15)">
      {/* Head */}
      <circle cx="35" cy="24" r="8.5" fill="#FAF6EF" stroke="#352C28" />
      {/* Bowtie */}
      <polygon points="32,34 38,34 35,37" fill="#352C28" />
      <polygon points="32,40 38,40 35,37" fill="#352C28" />
      {/* Tuxedo Jacket */}
      <path d="M20 36 L50 36 L48 95 L22 95 Z" fill="#231D1A" stroke="#1A1513" strokeWidth="1.4" />
      {/* Crisp White Shirt V-opening & Lapel */}
      <polygon points="35,36 31,65 39,65" fill="#FFFDF8" />
      <path d="M26 36 L31 65 L24 68" stroke="#C5A16B" strokeWidth="1" />
      <path d="M44 36 L39 65 L46 68" stroke="#C5A16B" strokeWidth="1" />
      {/* Trousers */}
      <path d="M24 95 L26 148 L32 148 L34 95" fill="#231D1A" stroke="#1A1513" />
      <path d="M36 95 L38 148 L44 148 L46 95" fill="#231D1A" stroke="#1A1513" />
    </g>
  </svg>
);
