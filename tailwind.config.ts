import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#0F0E17',
        purple: {
          DEFAULT: '#6C63FF',
          dark: '#5A52E0',
          light: '#8B84FF',
        },
        orange: '#FF8906',
        brand: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c4c2ff',
          300: '#a09bff',
          400: '#8B84FF',
          500: '#6C63FF',
          600: '#5A52E0',
          700: '#4840C0',
          800: '#3830A0',
          900: '#2D2B80',
          950: '#1A1933',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0F0E17 0%, #1A1933 50%, #0F0E17 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(108, 99, 255, 0.2)',
        'glow': '0 0 40px rgba(108, 99, 255, 0.3)',
        'glow-lg': '0 0 60px rgba(108, 99, 255, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(108, 99, 255, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
