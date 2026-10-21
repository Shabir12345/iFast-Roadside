/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './constants.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0B1E36',
          yellow: '#FF5A1F',
          yellowHover: '#E04812',
          gray: '#475569',
        },
        // WhatsApp's own brand green, used only on WhatsApp buttons.
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1EBE5B',
        },
      },
    },
  },
  plugins: [],
};
