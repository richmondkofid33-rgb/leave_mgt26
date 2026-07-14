/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Cambria', 'Georgia', 'serif'],
      },
      colors: {
        charcoal: {
          950: '#141312',
          900: '#1C1B19',
          800: '#28261F',
          700: '#3A3626',
        },
        signal: {
          DEFAULT: '#FFD60A',
          dim: '#C9A400',
        },
        approve: '#4C9A6A',
        pending: '#D9A441',
        reject: '#C1554B',
      },
    },
  },
  plugins: [],
}
