/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          50: '#FAF7F5',
          100: '#F2EAE4',
          200: '#E1D1C5',
          300: '#C9AF9D',
          400: '#9F765E',
          500: '#77513C',
          600: '#5A3A29',
          700: '#42281B',
          800: '#2C1810',
          900: '#1A0D08',
          950: '#0E0604',
        },
        caramel: {
          50: '#FDF9F3',
          100: '#FAF0E4',
          200: '#F3DDC3',
          300: '#E8C49A',
          400: '#D9A76E',
          500: '#C68B59',
          600: '#A86D3C',
          700: '#86512A',
          800: '#643B1D',
          900: '#432612',
          DEFAULT: '#C68B59',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FDFBF7',
          200: '#F7F2EB',
          300: '#EFE6DA',
          400: '#DFD3C3',
          500: '#CBBBA8',
          DEFAULT: '#F7F2EB',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      backgroundImage: {
        'caramel-gradient': 'linear-gradient(135deg, #F3DDC3 0%, #C68B59 50%, #86512A 100%)',
        'espresso-gradient': 'linear-gradient(180deg, #1A0D08 0%, #2C1810 50%, #0E0604 100%)',
      },
    },
  },
  plugins: [],
};
