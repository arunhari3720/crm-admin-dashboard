/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: "#2B8783",
        peach: "#FFEBD0",

        // better structured palette
        primary: "#2B8783",
        secondary: "#FFEBD0",
      },

      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.25)",
        aqua: "0 0 20px rgba(43,135,131,0.3)",
      },

      backgroundImage: {
        "aqua-glow":
          "radial-gradient(circle at top, rgba(43,135,131,0.2), transparent 60%)",
      },
    },
  },
  plugins: [],
};