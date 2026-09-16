const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        paper: "#f5f0e8",
        bone: "#e8dfd1",
        charcoal: "#191919",
        ash: "#b7b0a6",
        signal: "#ff3b1f"
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"]
      },
      letterSpacing: {
        exhibit: "0.12em"
      },
      boxShadow: {
        hard: "10px 10px 0 rgba(255,255,255,0.12)"
      }
    }
  },
  plugins: []
};

export default config;
