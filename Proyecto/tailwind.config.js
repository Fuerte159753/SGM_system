/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      fontSize: {
        'xxs': '0.625rem', // Define el tamaño de letra 'xxs'
        'xxxs': '0.5rem',
        '4xs': '0.4rem'
      },
      display: ['responsive', 'group-hover', 'group-focus'],
      visibility: ['group-hover', 'group-focus'],
    },
  },
  plugins: [],
}

