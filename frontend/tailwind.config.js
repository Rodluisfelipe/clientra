/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light: '#9F67FF'
        },
        secondary: '#5f6368',
        accent: {
          DEFAULT: '#EC4899',
          light: '#F472B6'
        },
        background: {
          DEFAULT: '#F9FAFB',
          dark: '#111827'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'modal-appear': 'modal-appear 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        'modal-appear': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translate(0, 20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translate(0, 0)'
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(-10px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        'shake': {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        },
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.primary.DEFAULT)',
        'neon-hover': '0 0 10px theme(colors.primary.DEFAULT), 0 0 40px theme(colors.primary.DEFAULT)',
        'card': '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundSize: {
        '200%': '200% auto',
      },
    },
  },
  plugins: [],
} 