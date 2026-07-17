/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a090c",
        ink: "#141018",
        surface: "#1c1825",
        bone: "#ece7de",
        ash: "#8b8494",
        gold: "#c9a24b",
        "gold-soft": "#e6cd8c",
        blood: "#8c2f39",
        line: "#2a2438",
        emerald: "#2d7a55",
      },
      fontFamily: {
        display: ["Cinzel", "Georgia", "serif"],
        occult: ['"Cinzel Decorative"', "Georgia", "serif"],
        title: ["system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
