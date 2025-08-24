/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a'
        },
        secondary: {
          100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95'
        },
        accent: {
          100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#f59e0b', 500: '#d97706', 600: '#b45309', 700: '#92400e', 800: '#78350f', 900: '#451a03'
        },
        dark: {
          900: '#0b1220',
          950: '#050a16'
        }
      }
    }
  },
  plugins: []
}
