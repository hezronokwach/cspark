/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E1B18', paper: '#EDEAE0', plot: '#AE4A31', ochre: '#B48A42', map: '#4C6B71', line: '#C9C4B4',
      },
      fontFamily: {
        display: ['"Roboto Slab"', 'Rockwell', 'Georgia', 'serif'],
        body: ['Inter', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
