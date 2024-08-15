/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/*.{js,ts,tsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: '#404080',
        lightpurple: '#6060a0',
        green: '#42938D',
        white: '#fff',
      },
    },
  },
  plugins: [],
}
