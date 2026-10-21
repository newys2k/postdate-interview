/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF4EA",
        ink: "#2E1F28",
        rose: "#A94A63",
        blush: { DEFAULT: "#F4DADD", deep: "#E6B7BF" },
      },
      fontFamily: {
        serif: ["Gloock", "Georgia", "serif"],
        sans: ["Figtree", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
