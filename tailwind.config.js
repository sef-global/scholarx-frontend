/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      'primary-blue': '#1677FF',
      'darkmod-blue': '#3D317C',
    },
    animation: {
      'skeleton': 'skeleton-loading 1.5s infinite',
    },
    keyframes: {
      'skeleton-loading': {
        '0%': { backgroundPosition: '100% 0' },
        '100%': { backgroundPosition: '-100% 0' },
      },
    },
  },
};
export const plugins = [];
