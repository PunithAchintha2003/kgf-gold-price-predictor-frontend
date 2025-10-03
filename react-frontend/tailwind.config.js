/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        gold: '#F5D300',
        'gold-dark': '#E6C200',
        'prediction-green': '#26d4b4',
        'prediction-blue': '#0051ff',
        'dark-bg': '#000000',
        'dark-surface': '#111111',
        'dark-border': '#1f1f1f',
        'dark-text': '#FFFFFF',
        'dark-text-secondary': '#cccccc',
        'dark-text-muted': '#888888',
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
