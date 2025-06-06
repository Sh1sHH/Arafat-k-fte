/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['KingRimba', 'sans-serif'],
        'kingrimba': ['KingRimba', 'sans-serif'],
        'bulgatti': ['Bulgatti', 'sans-serif'],
        'tuesday': ['Tuesday Lovely', 'cursive'],
        'martha': ['Martha Hayden', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
