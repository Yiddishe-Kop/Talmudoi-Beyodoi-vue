const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  theme: {
    fontFamily: {
      display: ['Fira Sans', 'sans-serif'],
      body: ['Fira Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: '#e05d04',
        gray: {
          ...colors.gray,
          '50': '#edf2f79c',
          '80': '#edf2f7d9',
        }
      },
    }
  },
  variants: {},
  plugins: []
}
