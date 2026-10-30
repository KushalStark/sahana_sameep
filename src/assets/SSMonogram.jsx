import React from 'react';

/**
 * Sahana & Sameep Custom Wedding Monogram Logo
 * Master vector brand asset: intertwining calligraphic S&S with botanical lotus crown
 */
export default function SSMonogram({
  size = 64,
  variant = 'gold', // 'gold' | 'dark' | 'ivory' | 'seal'
  className = '',
  alt = 'Sahana & Sameep Wedding Monogram',
}) {
  const gradientId = `monogramGrad-${variant}-${Math.random().toString(36).substr(2, 5)}`;
  const filterId = `monogramShadow-${variant}-${Math.random().toString(36).substr(2, 5)}`;

  // Color configurations based on theme
  let stops = [
    { offset: '0%', color: '#F7E8CE' },
    { offset: '25%', color: '#E5CCA0' },
    { offset: '55%', color: '#C5A16B' },
    { offset: '85%', color: '#A67C45' },
    { offset: '100%', color: '#7A5624' },
  ];

  if (variant === 'dark') {
    stops = [
      { offset: '0%', color: '#52453E' },
      { offset: '35%', color: '#352C28' },
      { offset: '70%', color: '#241D1A' },
      { offset: '100%', color: '#16110F' },
    ];
  } else if (variant === 'ivory') {
    stops = [
      { offset: '0%', color: '#FFFFFF' },
      { offset: '40%', color: '#FAF6EF' },
      { offset: '80%', color: '#EFE5D5' },
      { offset: '100%', color: '#DFD2BE' },
    ];
  } else if (variant === 'seal') {
    stops = [
      { offset: '0%', color: '#FFF4DF' },
      { offset: '30%', color: '#F5DEB3' },
      { offset: '70%', color: '#D4AF37' },
      { offset: '100%', color: '#A67C45' },
    ];
  }

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`inline-block select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt}
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={gradientId} x1="15%" y1="10%" x2="85%" y2="90%">
          {stops.map((s, idx) => (
            <stop key={idx} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>

      {/* Outer Fine Ornamental Ring */}
      <circle cx="100" cy="100" r="92" stroke={`url(#${gradientId})`} strokeWidth="1.5" />

      {/* Inner Delicate Beaded Ring */}
      <circle
        cx="100"
        cy="100"
        r="86"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        strokeDasharray="2.5 3"
        opacity="0.8"
      />

      {/* Subtle Inner Ring */}
      <circle cx="100" cy="100" r="81" stroke={`url(#${gradientId})`} strokeWidth="0.75" opacity="0.4" />

      {/* Top Lotus Crown Ornament */}
      <g
        transform="translate(100, 16) scale(0.65)"
        stroke={`url(#${gradientId})`}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 -14 C-4 -4, -3 4, 0 14 C3 4, 4 -4, 0 -14 Z" fill={`url(#${gradientId})`} fillOpacity="0.25" />
        <path d="M0 14 C-8 4, -14 -4, -11 -11 C-5 -8, -2 4, 0 14 Z" />
        <path d="M0 14 C8 4, 14 -4, 11 -11 C5 -8, 2 4, 0 14 Z" />
        <circle cx="0" cy="-16" r="1.5" fill={`url(#${gradientId})`} />
      </g>

      {/* Bottom Lotus Finial */}
      <g
        transform="translate(100, 184) scale(0.65) rotate(180)"
        stroke={`url(#${gradientId})`}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 -14 C-4 -4, -3 4, 0 14 C3 4, 4 -4, 0 -14 Z" fill={`url(#${gradientId})`} fillOpacity="0.25" />
        <path d="M0 14 C-8 4, -14 -4, -11 -11 C-5 -8, -2 4, 0 14 Z" />
        <path d="M0 14 C8 4, 14 -4, 11 -11 C5 -8, 2 4, 0 14 Z" />
        <circle cx="0" cy="-16" r="1.5" fill={`url(#${gradientId})`} />
      </g>

      {/* Interlocking S & S Monogram Core (Proper Orientation, Luxury Serif Calligraphy) */}
      <g fill={`url(#${gradientId})`}>
        {/* First 'S' (Sahana) - Centered around x=76, y=92 */}
        <path d="
          M 94 58
          C 90 52, 82 48, 70 48
          C 54 48, 44 57, 44 71
          C 44 83, 56 90, 72 96
          C 90 102, 100 110, 100 124
          C 100 139, 86 148, 68 148
          C 55 148, 44 142, 41 133
          C 40 130, 43 128, 46 130
          C 52 136, 60 141, 69 141
          C 82 141, 93 133, 93 122
          C 93 109, 81 103, 64 97
          C 48 91, 38 82, 38 69
          C 38 53, 52 42, 70 42
          C 82 42, 91 47, 96 54
          C 98 57, 96 60, 94 58
          Z" 
        />
        <circle cx="95" cy="56" r="3.2" />
        <circle cx="43" cy="132" r="3.2" />

        {/* Second 'S' (Sameep) - Offset to the right & down, x=124, y=108 */}
        <path d="
          M 152 70
          C 148 64, 140 60, 128 60
          C 112 60, 102 69, 102 83
          C 102 95, 114 102, 130 108
          C 148 114, 158 122, 158 136
          C 158 151, 144 160, 126 160
          C 113 160, 102 154, 99 145
          C 98 142, 101 140, 104 142
          C 110 148, 118 153, 127 153
          C 140 153, 151 145, 151 134
          C 151 121, 139 115, 122 109
          C 106 103, 96 94, 96 81
          C 96 65, 110 54, 128 54
          C 140 54, 149 59, 154 66
          C 156 69, 154 72, 152 70
          Z"
        />
        <circle cx="153" cy="68" r="3.2" />
        <circle cx="101" cy="144" r="3.2" />

        {/* Romantic Calligraphic Ampersand Knot at Center */}
        <path d="
          M 103 86
          C 106 82, 109 82, 108 86
          C 106 91, 100 96, 95 101
          C 89 108, 86 116, 92 121
          C 97 125, 105 123, 110 116
          C 112 114, 114 116, 113 118
          C 107 127, 95 128, 88 122
          C 82 116, 84 105, 91 97
          C 97 90, 103 85, 103 86
          Z"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}
