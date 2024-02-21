/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Just Another Hand", "cursive"]
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

