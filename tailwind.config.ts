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
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#E3FF00",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(72px, 14vw, 220px)", { lineHeight: "0.88", letterSpacing: "-0.04em", fontWeight: "800" }],
        "claim": ["clamp(36px, 5vw, 72px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(48px, 7vw, 100px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-3": ["clamp(36px, 5vw, 72px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "title": ["clamp(22px, 2.5vw, 36px)", { lineHeight: "1.2" }],
        "body-l": ["17px", { lineHeight: "1.6" }],
        "body-m": ["13px", { lineHeight: "1.6" }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          md: "40px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
