import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "spiral": "url('/assets/design/ssspiral.svg')"
      },
      animation: {
        "fade-in": "fadeIn .3s ease-in-out",
        "drag-container": "dragContainer 3s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        dragContainer: {
          "0%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(0.2deg)" },
          "40%": { transform: "rotate(-0.2deg)" },
          "60%": { transform: "rotate(0.2deg)" },
          "80%": { transform: "rotate(-.2deg)" },
          "100%": { transform: "rotate(0deg)" }
        }
      },
      colors: {
        primary: {
          50: "#fef2f4",
          100: "#fde6e9",
          200: "#fbd0d9",
          300: "#f7aab9",
          400: "#f27a93",
          500: "#e63f66",
          600: "#d42a5b",
          700: "#b21e4b",
          800: "#951c45",
          900: "#801b40",
          950: "#470a1f"
        },
        secondary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde58a",
          300: "#fbd24e",
          400: "#fabe25",
          500: "#f49d0c",
          600: "#d87607",
          700: "#bc560a",
          800: "#923f0e",
          900: "#78340f",
          950: "#451a03"
        },
      },
      gridTemplateRows: {
        "dashboard": "auto 1fr",
      },
      gridTemplateColumns: {
        "dashboard": "16rem 1fr",
        "cards": "repeat(auto-fill, minmax(16rem, 1fr))"
      },
      content: {
        empty: "''"
      },
    }
  },
  plugins: [typography]
}

export default config
