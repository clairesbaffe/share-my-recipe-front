/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        artifika: ["Artifika", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#e77816",
          light: "#FFEAD8",
        },
        secondary: "#120812",
      },
      width: {
        "custom-lg": "600px",
        "custom-xl": "700px",
      },
    },
  },
  plugins: [],
};
