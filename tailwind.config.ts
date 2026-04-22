import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFF7F5",
        bgSoft: "#FFF1ED",
        primary: "#E11D48",
        secondary: "#F97316",
        textMain: "#1F2937",
        textSoft: "#6B7280",
      },
    },
  },
  plugins: [],
};

export default config;