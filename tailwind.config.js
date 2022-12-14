/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tertiary: "#2b2d84",
        secondary: "#0772bf",
        primary: "#29acdf",
        main_bg: "#0d1117",
        main_accent: "#161b22",
      },
      fontFamily: {
        apple: "Helvetica Neue,sans-serif",
        roboto: ["Roboto, sans-serif"],
        georgia: ["GEORGIA, serif"],
      },
      spacing: {
        68: "17rem",
        128: "32rem",
        140: "35rem",
        160: "40rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwindcss-hyphens")],
};
