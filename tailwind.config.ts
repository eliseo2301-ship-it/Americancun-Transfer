import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F4E5C7',
          300: '#EBD19D',
          400: '#DFB86C',
          500: '#D4A343',
          600: '#B88528',
          700: '#8E641B',
          800: '#694814',
          900: '#47310E',
        },
        navy: {
          800: '#0B1528',
          900: '#070D18',
          950: '#03070E',
        },
        caribbean: {
          500: '#00A896',
          600: '#028090',
          700: '#05668D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
