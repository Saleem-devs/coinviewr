/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        bgColor: "#3E4045",
        darkerBgColor: "#14161a",
        primary: "#98D82C",
        whiteShade: "#C6C6C6",
        customGreen: "rgb(14, 203, 129)",
      },
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
      },
      fontSize: {
        "5xl": "3.5rem",
      },
      lineHeight: {
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.5rem",
        10: "3.75rem",
      },
    },
  },
  plugins: [],
};
