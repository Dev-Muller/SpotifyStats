import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        accent: {
          DEFAULT: "#7C3AED",
          light: "#A78BFA",
        },
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
