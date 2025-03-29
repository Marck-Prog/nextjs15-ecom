import type { Config } from 'tailwindcss'
import { withUt } from 'uploadthing/tw'

const config: Config = withUt({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '375px',
        md: '425px',
        lg: '768px',
        xl: '1024px',
        '2xl': '1440px',
        '4xl': '2560px',
      },
      colors: {
        background: '#ffffff', // Static light background
        foreground: '#000000', // Static light foreground
        card: {
          DEFAULT: '#f9f9f9',
          foreground: '#000000',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        primary: {
          DEFAULT: '#000000', // Changed from #007bff (blue) to #000000 (black)
          foreground: '#ffffff', // Kept white for contrast
        },
        secondary: {
          DEFAULT: '#6c757d',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#e5e7eb',
          foreground: '#6b7280',
        },
        // accent: {
        //   DEFAULT: '#00b4d8',
        //   foreground: '#ffffff',
        // },
        destructive: {
          DEFAULT: '#dc3545',
          foreground: '#ffffff',
        },
        border: '#d1d5db',
        input: '#e5e7eb',
        ring: '#000000', // Changed from #007bff (blue) to #000000 (black) to match primary
        chart: {
          '1': '#4dabf7',
          '2': '#37b24d',
          '3': '#f76707',
          '4': '#f59f00',
          '5': '#7048e8',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}) satisfies Config

export default config
