/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      },
      backgroundColor: {
        card: '#f7f7f7'
      },
      height: {
        300: '420px'
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light']
  }
}
