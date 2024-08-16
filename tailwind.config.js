/** @type {import('tailwindcss').Config} */

import screens from './src/styles/tailwind/screens';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens,
    },
  },
  plugins: [],
};
