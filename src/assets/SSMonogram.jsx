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

      {/* Interlocking S & S Monogram Core (Crisp Vector, Zero Raster Blur) */}
      <g fill={`url(#${gradientId})`}>
        {/* First 'S' (Sahana) */}
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

        {/* Second 'S' (Sameep) */}
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
        <path
          d="
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
  );
}
