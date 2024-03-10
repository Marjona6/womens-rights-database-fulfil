/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './pages/*.{js,ts,tsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: '#404080',
        green: '#42938D',
        white: '#fff',
      },
    },
  },
  plugins: [],
}
