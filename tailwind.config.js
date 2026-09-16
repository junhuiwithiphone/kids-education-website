/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 可爱风格配色
        primary: {
          pink: '#FFB6C1',
          blue: '#87CEEB',
          yellow: '#FFE4B5',
          green: '#98FB98',
          purple: '#DDA0DD',
          orange: '#FFDAB9',
        },
        dark: {
          text: '#4A4A4A',
          subtitle: '#7A7A7A',
        },
      },
      fontFamily: {
        cute: ['"Noto Sans SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'cute': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'cute-hover': '0 6px 16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
