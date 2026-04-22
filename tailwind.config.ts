import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        agro: {
          50: "#f3f8f1",
          100: "#e3efdd",
          200: "#c6deba",
          300: "#9fc58c",
          400: "#72a85c",
          500: "#508a3c",
          600: "#3c6e2c",
          700: "#2f5724",
          800: "#26451e",
          900: "#1f391a",
        },
        tierra: {
          100: "#f2e7d9",
          300: "#c9a984",
          500: "#8b5e3c",
          700: "#5d3f28",
        },
        crema: "#faf7f1",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
