/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1C74BB',
        primaryLight: '#E4F3FF',
        normal: '#02ABEF',
      },
    },
  },
  plugins: [],
};
