/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Jura: ['Jura', 'sans-serif'],
        Kotta: ['Kotta One', 'sans-serif'],
      },
    },
  },
  plugins: [],
}