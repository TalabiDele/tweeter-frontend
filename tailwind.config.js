/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light_grey: "#BDBDBD",
        text_blue: "#2D9CDB",
        bg_blue: "#2F80ED",
        dark_grey: "#828282",
        hover: "#2974d4",
        danger: "#F0402C",
        hover_bg: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
