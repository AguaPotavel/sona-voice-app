const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/_shared/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      primary: colors.indigo,

      blue: colors.blue,
      red: colors.red,

      error: colors.red,
      warning: colors.yellow,
      success: colors.green,
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
