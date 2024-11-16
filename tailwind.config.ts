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
        }
      },
      gridTemplateRows: {
        "dashboard": "auto 1fr",
      },
      gridTemplateColumns: {
        "dashboard": "20rem 1fr",
        "cards": "repeat(auto-fill, minmax(16rem, 1fr))"
      }
    }
  },
  plugins: [typography]
}

export default config
