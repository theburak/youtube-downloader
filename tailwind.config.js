module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Next.js için
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Yeni App Router desteği (Next.js 13+)
    "./src/**/*.{html,js,ts,jsx,tsx,vue}", // React, Vue, HTML için
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
