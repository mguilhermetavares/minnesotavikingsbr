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
        vikings: {
          purple: "#4F2683",
          "purple-dark": "#2a1147",
          "purple-light": "#6b35b0",
          gold: "#FFC62F",
          "gold-light": "#FFE088",
        },
        brasil: {
          green: "#009C3B",
          yellow: "#FFDF00",
          blue: "#002776",
        },
        surface: {
          DEFAULT: "#111118",
          raised: "#16161f",
          overlay: "#1c1c28",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-oswald)", "sans-serif"],
      },
      backgroundImage: {
        "vikings-gradient": "linear-gradient(135deg, #2a1147 0%, #4F2683 50%, #2a1147 100%)",
        "gold-gradient": "linear-gradient(135deg, #FFC62F 0%, #FFE088 50%, #FFC62F 100%)",
        "dark-gradient": "linear-gradient(180deg, #0a0a0f 0%, #111118 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
