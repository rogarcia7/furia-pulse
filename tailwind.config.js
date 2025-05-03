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
        gold: '#FFD700', 
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-delay': 'fadeIn 1.5s ease-out',
        'slide-up': 'slideUp 1s ease-out',
        'textHighlight': 'textHighlight 3s linear infinite', 
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        textHighlight: {
          '0%': { backgroundPosition: '0%' },
          '50%': { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '0%' }
        },
      },
    },
  },
}
