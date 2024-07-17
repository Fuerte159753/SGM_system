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
      display: ['responsive', 'group-hover', 'group-focus'],
      visibility: ['group-hover', 'group-focus'],
    },
  },
  plugins: [],
}

