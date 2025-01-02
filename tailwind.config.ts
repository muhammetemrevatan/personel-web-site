import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#8892b0",
            a: {
              color: "#64ffda",
              "&:hover": {
                color: "#64ffda80",
              },
            },
            h1: {
              color: "#ccd6f6",
            },
            h2: {
              color: "#ccd6f6",
            },
            h3: {
              color: "#ccd6f6",
            },
            h4: {
              color: "#ccd6f6",
            },
            strong: {
              color: "#ccd6f6",
            },
            code: {
              color: "#64ffda",
              backgroundColor: "#112240",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
