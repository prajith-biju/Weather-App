import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marqueeText: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-150%)" },
        },
      },
      animation: {
        marqueeText: "marqueeText 7s linear infinite",
      },
      backgroundImage: {
        night: "url('assets/8048.jpg')",
      },
    },
  },
  plugins: [],
};
