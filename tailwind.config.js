/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0a090c',
        ink: '#110e16',
        surface: '#1a1622',
        'surface-2': '#241f2e',
        line: '#322b3d',
        bone: '#ece5d8',
        ash: '#9b938a',
        gold: '#c9a24b',
        'gold-soft': '#e6cd8c',
        blood: '#8c2f39',
        wine: '#5e1f2a',
        violet: '#7c5cbf',
        emerald: '#3f8a76',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        title: ['Cinzel', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        occult: ['UnifrakturMaguntia', 'Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};
