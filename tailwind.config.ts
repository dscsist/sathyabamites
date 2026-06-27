import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#060816",
        panel: "#0b1120",
        lavender: "#8b5cf6",
        electric: "#38bdf8",
        stroke: "rgba(148, 163, 184, 0.18)"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139, 92, 246, 0.28), 0 24px 80px rgba(76, 29, 149, 0.35)",
        card: "0 18px 50px rgba(2, 6, 23, 0.45)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 32%), radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.18), transparent 28%), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(5, 10, 28, 0.98))"
      }
    }
  },
  plugins: []
};

export default config;
