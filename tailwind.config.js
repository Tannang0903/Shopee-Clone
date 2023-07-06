/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index/html', './src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        text: 'rgba(0,0,0,.87)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      })
    })
  ]
}
