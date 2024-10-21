/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        artifika: ['Artifika', 'sans-serif'], // Ajouter la police 'Artifika'
      },
      colors: {
        primary: {
          DEFAULT: '#e77816',
          light: '#FFEAD8'
        },
        secondary: '#120812',
        white: {
          DEFAULT: '#fbfbfa',
        },
      },
      width: {
        'custom-lg': '600px',
        'custom-xl': '700px',
      },
    },
  },
  plugins: [],
};
