/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        'background-color': '#f4f4f4'
      }
    },
  },
  plugins: [],
}

