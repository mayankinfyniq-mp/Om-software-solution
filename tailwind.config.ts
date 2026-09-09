import type { Config } from "tailwindcss";

/**
 * OM Software Solutions — design tokens
 * Primary   #FF671F  (Bhagva — energetic saffron orange)
 * Secondary #1E293B  (corporate slate/navy)
 * Accent    #F8FAFC  (crisp off-white)
 * Ink       #0A0F1C  (deep cinematic background, derived from secondary)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF671F",
        secondary: "#1E293B",
        accent: "#F8FAFC",
        ink: "#0A0F1C",
        inksoft: "#0F1830",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
