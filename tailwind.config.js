/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors: {
      'primary-blue': '#1677FF',
      'darkmod-blue': '#3D317C',            //dark moderate blue
      'desatdark-blue':'#6D7893',            //desaturated dark blue
    },
  },
};
export const plugins = [];
