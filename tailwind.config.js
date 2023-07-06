/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index/html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        text: 'rgba(0,0,0,.87)'
      }
    }
  },
  plugins: []
}
