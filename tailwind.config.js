/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        newsprint: {
          light: '#FAF7F0',
          DEFAULT: '#F5F0E6',
          aged: '#EFEAD9',
          dark: '#E2DCC8',
          ink: '#141312',
          faded: '#4B4843',
          border: '#3A3833',
        },
        stamp: {
          red: '#9C2525',
          blue: '#1B3B6F',
          green: '#2A5D34',
        },
        vintage: {
          gold: '#B8860B',
          accent: '#7D5A28',
        }
      },
      fontFamily: {
        masthead: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        body: ['"Merriweather"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'paper-float': '0 20px 35px -10px rgba(20, 19, 18, 0.22), 0 10px 15px -8px rgba(20, 19, 18, 0.15)',
        'paper-hover': '0 30px 60px -15px rgba(20, 19, 18, 0.35), 0 15px 25px -10px rgba(20, 19, 18, 0.25)',
        'paper-lifted': '0 40px 80px -20px rgba(20, 19, 18, 0.45), 0 20px 30px -12px rgba(20, 19, 18, 0.3)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'subtle-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.8deg)' },
        }
      }
    },
  },
  plugins: [],
}
