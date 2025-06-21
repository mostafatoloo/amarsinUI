/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-500': 'calc(100vh - 500px)',
        'screen-minus-400': 'calc(100vh - 400px)',
        'screen-minus-300': 'calc(100vh - 300px)',
        'screen-minus-260': 'calc(100vh - 260px)',
        'screen-minus-200': 'calc(100vh - 200px)',
      },
    },
  },
  plugins: [],
} 