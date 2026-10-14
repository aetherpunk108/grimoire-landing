/** Tailwind config epinoiahorizon.com — solar palette, persis dari config Play CDN yang lama.
 *  Jalankan dari ROOT repo:  npx tailwindcss -c tailwind-build/tailwind.config.js -i tailwind-build/input.css -o assets/tw.min.css --minify
 *  Content mencakup semua halaman ber-Tailwind + safety-net kelas yang di-manipulasi via JS. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main-site/index.html",
    "./tailwind-build/dynamic-safelist.js",
  ],
  safelist: [
    { pattern: /^(bg|text)-solar-(base03|base3|base00|base1)$/ },
    'dark', 'light', 'hidden', 'ok', 'open',
    'translate-y-0', 'translate-y-32', 'opacity-0', 'opacity-100',
    'animate-pulse', 'font-bold', 'font-semibold',
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          base03: '#002b36', base02: '#073642', base01: '#586e75', base00: '#657b83',
          base0: '#839496', base1: '#93a1a1',  base2: '#eee8d5',  base3: '#fdf6e3',
          yellow: '#b58900', orange: '#cb4b16', red: '#dc322f',
          magenta: '#d33682', violet: '#6c71c4', blue: '#268bd2',
          cyan: '#2aa198',   green: '#859900',
        },
      },
    },
  },
  plugins: [],
};
