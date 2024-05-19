/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        aspectRatio: {
          '4/3': '4 / 3',
        },
    },
  },
  plugins: [],
}
