import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 36px rgba(139, 92, 246, 0.28)",
        "soft-glow": "0 18px 60px rgba(88, 28, 135, 0.24)"
      },
      colors: {
        ink: "#070913",
        panel: "rgba(16, 18, 36, 0.72)"
      }
    }
  },
  plugins: []
};

export default config;
