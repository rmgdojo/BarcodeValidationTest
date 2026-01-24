/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-mail-red': '#C41E3A',
        'royal-mail-dark-red': '#A01D2E',
        'royal-mail-light-red': '#E63946',
      },
    },
  },
  plugins: [],
}
