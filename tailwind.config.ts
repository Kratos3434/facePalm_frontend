import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'login-xl': '900px',
        'signup-md': '448px',
        'signup-sm': '449px',

        'nav-xl': '1190px',
        'nav-xxl': {max: '1190px'},
        'home-xl': '769px',
        'home-xxl': {max: '768px'},
        'home-lg': '1100px',
        'homeprof-md': '908px',
      }
    },
  },
  plugins: [],
  prefix: 'tw-',
}
export default config
