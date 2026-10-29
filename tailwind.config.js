/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F4EFE6',
          300: '#EAE1D2',
          400: '#DFD2BE',
        },
        cardBg: '#FFFDF8',
        gold: {
          light: '#EAD9B8',
          DEFAULT: '#C5A16B',
          dark: '#A67C45',
          deep: '#7E5B2D',
          border: '#D8C29D',
        },
        sage: {
          light: '#C7D1BC',
          DEFAULT: '#A8B49A',
          dark: '#738264',
          deep: '#4F5D42',
        },
        blush: {
          light: '#F5ECE8',
          DEFAULT: '#EAD6D0',
          dark: '#CCA79F',
        },
        charcoal: {
          light: '#9E938B',
          DEFAULT: '#786C63',
          dark: '#352C28',
          deep: '#231D1A',
        },
        kumkum: {
          light: '#BA3B3E',
          DEFAULT: '#8B2628',
          dark: '#67191B',
        },
        olive: {
          pale: '#F4F7F2',
          light: '#748768',
          DEFAULT: '#4A5D43',
          dark: '#32402D',
        },
        mint: {
          DEFAULT: '#EBF3EA',
          light: '#F4F8F3',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        kannada: ['"Noto Serif Kannada"', '"Noto Sans Kannada"', 'Georgia', 'serif'],
        kannadaSans: ['"Noto Sans Kannada"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'envelope': '0 25px 50px -12px rgba(60, 45, 30, 0.25), 0 10px 20px -5px rgba(60, 45, 30, 0.15)',
        'card-soft': '0 10px 30px -5px rgba(53, 44, 40, 0.08), 0 4px 6px -2px rgba(53, 44, 40, 0.04)',
        'card-hover': '0 20px 40px -10px rgba(166, 124, 69, 0.18), 0 8px 12px -4px rgba(53, 44, 40, 0.08)',
        'wax': 'inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 8px 18px rgba(130, 50, 30, 0.4), 0 2px 5px rgba(0,0,0,0.2)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.88, transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
