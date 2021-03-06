const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        brand: '#345679',
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
