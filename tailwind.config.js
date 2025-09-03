const flowbiteReact = require('flowbite-react/plugin/tailwindcss');

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // or false if you don’t want dark mode at all
  content: [
    // ✅ Page Router lives here
    './pages/**/*.{js,ts,jsx,tsx}', // ✅ Your shared components
    './components/**/*.{js,ts,jsx,tsx}',
    '.flowbite-react/class-list.json'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('flowbite/plugin'), flowbiteReact]
};
