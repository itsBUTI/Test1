/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: "#6B0F0F",
          burgundyDark: "#521010",
          burgundySoft: "#F6EAEA",
          blue: "#1C69D4",
          gold: "#C6A96B",
        },
        premium: {
          white: "#FFFFFF",
          pearl: "#F7F7F7",
          grey: "#EFEFEF",
          silver: "#C9C9C9",
          graphite: "#2B2B2B",
          charcoal: "#111111",
        },
        success: "#1F7A4D",
        warning: "#D97706",
        "luxury-accent": "#6B0F0F",
        "luxury-accent-blue": "#1C69D4",
        "luxury-accent-gold": "#C6A96B",
        "luxury-text": "#2B2B2B",
        "luxury-text-secondary": "#666666",
        "luxury-border": "#E2E2E2",
        "luxury-bg": "#F7F7F7",
        "luxury-surface": "#FFFFFF",
        "luxury-surface-alt": "#EFEFEF",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #6B0F0F 0%, #8B1717 55%, #C6A96B 120%)",
        "gradient-brand-soft": "linear-gradient(180deg, rgba(107, 15, 15, 0.08) 0%, rgba(198, 169, 107, 0.03) 100%)",
        "gradient-hero-overlay": "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 40%, rgba(255,255,255,0.18) 78%)",
      },
      boxShadow: {
        luxury: "0 20px 50px rgba(18, 18, 18, 0.08)",
        "luxury-md": "0 24px 60px rgba(18, 18, 18, 0.1)",
        "luxury-soft": "0 12px 32px rgba(18, 18, 18, 0.06)",
        glass: "0 18px 42px rgba(18, 18, 18, 0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
