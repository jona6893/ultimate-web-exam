/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#36363B',
        secondary:'#F7F7F7',

      }
    },
  },
  plugins: [],
}

