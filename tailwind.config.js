/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F4",
        ink: "#1E1A16",
        cyan: "#00B1B7",
        flame: "#FF8021",
        teal: "#E8F5F5",
      },
      fontFamily: {
        display: ["var(--font-anton)"],
        body: ["var(--font-space-grotesk)"],
      },
    },
  },
  plugins: [],
};
