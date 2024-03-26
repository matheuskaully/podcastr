import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pod-white': '#FFF',
        'pod-gray-50': '#F7F8FA',
        'pod-gray-100': '#E6E8EB',
        'pod-gray-200': '#AFB2B1',
        'pod-gray-500': '#808080',
        'pod-gray-800': '#494D4B',
        'pod-green-500': '#04D361',
        'pod-purple-300': '#9F75FF',
        'pod-purple-400': '#9164FA',
        'pod-purple-500': '#8257E5',
        'pod-purple-800': '#6F48C9',
      },
      fontFamily: {
        alt: 'var(--font-lexend)',
      },
    },
  },
  plugins: [],
}
export default config
