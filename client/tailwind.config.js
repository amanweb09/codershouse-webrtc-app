/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,html}',
    './src/components/**/*.{js,jsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        body: '#121212',
        card: '#1d1d1d',
        'gray-t': '#c4c5c5',
        blue: { normal: '#0077ff', hover: '#014a9c' },
        green: { normal: "#20bd5f", hover: "#0f6632" }
      }
    },
  },
  plugins: [],
}
