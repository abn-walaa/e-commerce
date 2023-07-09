/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primer": "#2C3333",
        "2th": "#395B64",
        "3th": "#E7F6F2"
      },
      boxShadow: {
        "log": "-19px 15px 0 0px #6b8080",
        "box": "-7px 9px 0px 5px #171c22"
      },
      screens: {
        '2xl': { 'max': '1535px' },
        // => @media (max-width: 1535px) { ... }

        'xl': { 'max': '1279px' },
        // => @media (max-width: 1279px) { ... }
        "xlMin": { "min": "1020px" },
        'lg': { 'max': '1023px' },
        // => @media (max-width: 1023px) { ... }

        'md': { 'max': '767px' },
        // => @media (max-width: 767px) { ... }

        'sm': { 'max': '639px' },
        // => @media (max-width: 639px) { ... }
      }
    },
  },
  plugins: [],
}

