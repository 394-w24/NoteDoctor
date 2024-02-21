const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],

  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": { "background-position": "9% 0%" },
          "50%": { "background-position": "92% 100%" },
          "100%": { "background-position": "9% 0%" },
        },
      },
      animation: {
        gradient: "gradient 15s ease infinite",
      },
      backgroundSize: {
        huge: "600% 600%",
      },
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
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },

  plugins: [
    require("flowbite/plugin"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
