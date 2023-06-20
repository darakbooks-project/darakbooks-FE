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
      },
      animation: {
        slideDown: 'slideDown 300ms ease-out forwards',
        slideUp: 'slideUp 300ms ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: '#67A68A',
        background: '#FFFEF8',
      },
      boxShadow: {
        round: '4px 4px 8px rgba(0, 0, 0, 0.15)',
        roundY: '0px -4px 12px rgba(0, 0, 0, 0.12)',
      },
      dropShadow: {
        around: '0 0 7px rgba(0, 0, 0, 0.25)',
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
