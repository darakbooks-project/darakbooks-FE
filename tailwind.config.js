/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8rem)' },
          to: { opacity: '1', transform: 'translateY(-50%)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpModal: {
          from: { opacity: '1', transform: 'translateY(-8rem)' },
          to: { opacity: '1', transform: 'translateY(-50%)' },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms ease-out forwards',
        slideUp: 'slideUp 300ms ease-out forwards',
        slideUpModal: 'slideUpModal 300ms ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: '#60B28D',
        background: '#FFFEF8',
      },
      boxShadow: {
        round: '4px 4px 8px rgba(0, 0, 0, 0.15)',
        roundY: '0px -4px 12px rgba(0, 0, 0, 0.12)',
        around: '0px 0px 9px 0px rgba(0, 0, 0, 0.10)',
      },
      dropShadow: {
        around: '0 0 7px rgba(0, 0, 0, 0.25)',
      },
      fontSize: {
        clampSm: 'clamp(0.75rem, 4vw, 0.875rem)' /**14px */,
        clampBase: 'clamp(0.875rem, 4vw, 1rem)' /**16px */,
        clampLg: 'clamp(0.875rem, 5vw, 1.125rem)' /**18px */,
        clampXl: 'clamp(1.125rem, 5vw, 1.25rem)' /**20px */,
        clamp2xl: 'clamp(18px, 6vw, 1.5rem)' /**24px */,
        clamp3xl: 'clamp(24px, 6vw, 30px)' /**30px */,
      },
    },
    screens: {
      s: '575px',
      xs: { max: '390px' },
      xxs: { max: '280px' },
    },
  },
  plugins: [],
};
