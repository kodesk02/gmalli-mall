import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "red-rose": ["var(--font-red-rose)"],
        "aboreto": ["var(--font-aboreto)"],
      },
    },
  },
  plugins: [],
};

export default config;
