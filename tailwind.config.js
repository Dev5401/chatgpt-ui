/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        hovergrey: '#303030',
      },
    },
  },
  plugins: [],
};
