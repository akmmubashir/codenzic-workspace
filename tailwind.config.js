/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--cz-bg) / <alpha-value>)',
        surface: 'rgb(var(--cz-surface) / <alpha-value>)',
        border: 'rgb(var(--cz-border) / <alpha-value>)',
        content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
        muted: 'rgb(var(--cz-muted) / <alpha-value>)',
        primary: 'rgb(var(--cz-primary) / <alpha-value>)',
        secondary: 'rgb(var(--cz-secondary) / <alpha-value>)',
        accent: 'rgb(var(--cz-accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
      },
    },
  },
  plugins: [],
};
