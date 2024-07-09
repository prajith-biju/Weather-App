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
        loadingAnim: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marqueeText: "marqueeText 7s linear infinite",
        loadingAnim: "loadingAnim 2s linear infinite",
      },
      backgroundImage: {
        night: "url('assets/bg.png')",
        day: "url('assets/sky.png')",
      },
    },
  },
  plugins: [],
};
