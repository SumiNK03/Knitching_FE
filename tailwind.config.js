/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBrown: '#4A3E3D',
        lightBeige: '#F2EFE9',
        mediumBrown: '#7A7265',
        taupeBrown: '#BCB5A8',
        palBeige: '#EDE8DF',
      },
    },
  },
  plugins: [],
}
