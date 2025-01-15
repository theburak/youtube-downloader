/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the components directory
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the app directory
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom background color
        foreground: "var(--foreground)", // Custom foreground color
      },
    },
  },
  plugins: [], // No plugins are used
};
