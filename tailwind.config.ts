import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2fc",
          100: "#c0d0f0",
          200: "#a0b8e8",
          300: "#7095dc",
          400: "#4d7ad4",
          500: "#2255cc",
          600: "#1f4dba",
          700: "#183c91",
          800: "#132f70",
          900: "#0e2456",
        },
        dark: {
          50: "#f4f6fb",
          100: "#e0e4ec",
          200: "#c0c5d0",
          300: "#9ea3b0",
          400: "#7c8290",
          500: "#5c6270",
          600: "#404550",
          700: "#2a2e38",
          800: "#1a1e26",
          900: "#0e1116",
        },
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        noto: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;