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
      borderRadius: {
        '3xl': '20px',
        '4xl': '24px',
      },
      backgroundColor: {
        'custom-1': '#22D3EE',
        'custom-2': '#0E7490',
      },
      maxWidth: {
        '2xl': '636px'
      },
      boxShadow: {
        'box-1': 'box-shadow: 0px 5px 20px 0px #0000001A;',
      },

    },
  },
  plugins: [],
}
export default config
