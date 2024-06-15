module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        txtPrimary: "#555",
        txtLight: "#999",
        txtDark: "#222",
        bgPrimary: "#f1f1f1",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["hover", "focus"],
      scale: ["hover"],
      ringColor: ["focus"],
    },
  },
  plugins: [],
};
