/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          blue: '#0B1E36', // Dark Navy Blue
          white: '#FFFFFF',
          green: '#00B489', // Vibrant Teal
          light: '#E0F2F1', // Light pastel teal
          red: '#DC2626'
        }
      },
    },
  },
  plugins: [],
};
