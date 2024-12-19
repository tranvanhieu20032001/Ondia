/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f9831f',
        background: '#f8f9fa',
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}