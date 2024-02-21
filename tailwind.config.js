/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Just Another Hand", "cursive"],
      },
      colors: {
        contessa: {
          50: "#fbf5f5",
          100: "#f8e9e8",
          200: "#f2d8d6",
          300: "#e8bdb9",
          400: "#d99690",
          500: "#cb7c75",
          600: "#b25850",
          700: "#954740",
          800: "#7c3e38",
          900: "#683834",
          950: "#371b18",
        },
      },
    },
  },
  plugins: [],
};
