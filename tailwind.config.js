/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  // App Router対応
  ],
  theme: {
    extend: {
      fontSize: {
        '9pt': '9pt',
        '12pt': '12pt',
      },
    },
  },
  plugins: [],
}

