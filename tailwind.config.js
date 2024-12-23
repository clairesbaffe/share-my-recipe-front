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
          medium: "#FBD0AA",
          light: "#FFEAD8",
        },
        secondary: "#120812",
      },
      width: {
        "custom-lg": "600px",
        "custom-xl": "700px",
      },
      animation: {
        'smooth-spin': 'spin 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};
