/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E1B18', paper: '#EDEAE0', plot: '#AE4A31', ochre: '#B48A42', map: '#4C6B71', line: '#C9C4B4',
        forest: { DEFAULT: '#0B3D2E', light: '#14532D', dark: '#06251B' },
        terracotta: { DEFAULT: '#E2725B', light: '#F08A6E', dark: '#C55A45' },
        charcoal: '#141414', cream: '#FAF8F5', gold: '#C9A227', slate: '#6B7280',
      },
      fontFamily: {
        display: ['Inter', 'Arial', 'sans-serif'],
        body: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['"IBM Plex Mono"', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
