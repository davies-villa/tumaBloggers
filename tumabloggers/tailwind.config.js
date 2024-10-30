/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 70%)',
        'main-gradient' : 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.9));'
        
      },
      colors: {
        'main': '#1E1F21', 
        'paragraph': '#5F6065',
        'background' : '#0ABF5D',
      }, 
    },
  },
  plugins: [],
}
