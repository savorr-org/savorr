import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'green': '#69C34A',
        'gray': '#474D41',
        'white': '#FDFDFD',
        'black': '#000000',
        'gray-input-box': '#EAEAEA'
      },
      fontFamily: {
        manrope: ['manrope', 'sans-serif'],
        varela: ['varela', 'sans-serif']
      }
    },
  },
  plugins: [],
}
export default config
