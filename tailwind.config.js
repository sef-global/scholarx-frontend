/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    colors:{
      navbar_font_colour: "#6D7893",
      primary_font_colour: "#32325D",
      secondary_font_colour: "#1D1D1F",
      primary_btn_colour: "#1677FF",
      stat_container_colour: "#F7F8FA",
      testimonial_title_colour: "#3D317C",
      success_stories_container_colour: "#F8FDFF",
      secondary_btn_colour: "#172B4D"
    }
  },
};
export const plugins = [];
