/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-350': 'calc(100vh - 350px)',
        'screen-minus-200': 'calc(100vh - 200px)',
      },
    },
  },
  plugins: [],
} 