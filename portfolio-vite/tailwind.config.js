/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#4FD1C5',
          500: '#38B2AC',
          600: '#319795',
          700: '#2C7A7B',
        },
        secondary: {
          400: '#63B3ED',
          500: '#4299E1',
          600: '#3182CE',
          700: '#2B6CB0',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        scan: 'scan 2s linear infinite',
        flicker: 'flicker 0.2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(79 209 197 / 0.5), 0 0 20px rgb(79 209 197 / 0.3)' },
          '100%': { boxShadow: '0 0 10px rgb(79 209 197 / 0.8), 0 0 40px rgb(79 209 197 / 0.5)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        },
      },
      fontFamily: {
        future: ['Orbitron', 'sans-serif'],
        'future-secondary': ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
