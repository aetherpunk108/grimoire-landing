/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["/home/nxelleai/grimoire-landing/index.html"],
  theme: {
    extend: {
      colors: {
        gold: { 200:'#fef08a',300:'#fde047',400:'#facc15',500:'#eab308',600:'#ca8a04',700:'#a16207' },
        horizon: { bg:'#030208',card:'#080614',border:'#2d1e4e',cyan:'#06b6d4',purple:'#8b5cf6',amber:'#f59e0b' }
      },
      fontFamily: {
        title: ['Cinzel Decorative','serif'],
        heading: ['Cinzel','serif'],
        body: ['Inter','sans-serif'],
        mono: ['JetBrains Mono','monospace'],
      }
    }
  },
  plugins: [],
};
