/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border, rgba(0, 0, 0, 0.12))',
        input: 'var(--input, rgba(0, 0, 0, 0.12))',
        ring: 'var(--ring, #5B4DE8)',
        background: 'var(--background, #FBFBFA)',
        foreground: 'var(--foreground, #1A1A1A)',
        primary: {
          DEFAULT: 'var(--primary, #1A1A1A)',
          foreground: 'var(--primary-foreground, #FFFFFF)',
        },
        secondary: {
          DEFAULT: 'var(--secondary, #F5F4F1)',
          foreground: 'var(--secondary-foreground, #1A1A1A)',
        },
        destructive: {
          DEFAULT: 'var(--destructive, #FF4D6D)',
          foreground: 'var(--destructive-foreground, #FFFFFF)',
        },
        muted: {
          DEFAULT: 'var(--muted, #F5F4F1)',
          foreground: 'var(--muted-foreground, #6B6B6B)',
        },
        accent: {
          DEFAULT: 'var(--accent, #5B4DE8)',
          foreground: 'var(--accent-foreground, #FFFFFF)',
        },
        popover: {
          DEFAULT: 'var(--popover, #FFFFFF)',
          foreground: 'var(--popover-foreground, #1A1A1A)',
        },
        card: {
          DEFAULT: 'var(--card, #FFFFFF)',
          foreground: 'var(--card-foreground, #1A1A1A)',
        },
        'spektr-cyan-50': 'var(--spektr-cyan-50, #06b6d4)',
      },
      borderRadius: {
        lg: 'var(--radius, 0.5rem)',
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--radius, 0.5rem) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
