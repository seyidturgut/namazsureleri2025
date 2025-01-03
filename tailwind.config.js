/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4B5563', // Gray-600
          dark: '#E5E7EB', // Gray-200
        },
        secondary: {
          light: '#1F2937', // Gray-800
          dark: '#F3F4F6', // Gray-100
        },
        accent: {
          light: '#10B981', // Emerald-500
          dark: '#34D399', // Emerald-400
        },
        background: {
          light: '#F9FAFB', // Gray-50
          dark: '#111827', // Gray-900
        },
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}