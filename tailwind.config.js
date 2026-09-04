/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nyt: {
          bg: '#FCFBF9',
          white: '#FFFFFF',
          ink: '#121212',
          body: '#2F2F2F',
          muted: '#727272',
          caption: '#8A8A8A',
          border: '#E2E2E2',
          'border-dark': '#121212',
          blue: '#103B75',
          red: '#A31D1D',
          hover: '#F7F6F3',
        },
      },
      fontFamily: {
        masthead: ['"UnifrakturMaguntia"', 'serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'nyt-paper': '0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 25px -5px rgba(0, 0, 0, 0.08)',
        'nyt-hover': '0 4px 8px rgba(0, 0, 0, 0.08), 0 20px 40px -8px rgba(0, 0, 0, 0.16)',
        'nyt-lifted': '0 8px 16px rgba(0, 0, 0, 0.12), 0 28px 56px -10px rgba(0, 0, 0, 0.24)',
      },
      letterSpacing: {
        'nyt-headline': '-0.02em',
        'nyt-kicker': '0.08em',
      },
    },
  },
  plugins: [],
}
