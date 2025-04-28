/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Russo One', 'sans-serif'],
      },
      colors: {
        gold: '#FFD700', // Aqui você define a cor dourada
      },
    },
  },
}
