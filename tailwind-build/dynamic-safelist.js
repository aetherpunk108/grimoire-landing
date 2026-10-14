// Safety-net scanner: string JS yang direferensikan kelas dinamis (duplicate content file — Tailwind regex-extracts class-like tokens dari sini juga)
const dynamicClassStrings = `
  classList.add('dark') classList.remove('light') classList.remove('bg-solar-base3', 'text-solar-base00')
  classList.add('bg-solar-base03', 'text-solar-base1') classList.add('light') classList.remove('dark')
  classList.remove('bg-solar-base03', 'text-solar-base1') classList.add('bg-solar-base3', 'text-solar-base00')
  classList.toggle('hidden') classList.remove('hidden') classList.add('hidden')
  classList.remove('translate-y-32', 'opacity-0') classList.add('translate-y-0', 'opacity-100')
  classList.remove('translate-y-0', 'opacity-100') classList.add('translate-y-32', 'opacity-0')
  classList.add('ok') classList.remove('ok') classList.toggle('open') classList.remove('open')
  className = 'fa-solid fa-pause' className = 'fa-solid fa-play'
  className = 'studio-model-btn px-2.5 py-1 rounded bg-solar-cyan text-solar-base03 font-bold text-[11px]'
  className = 'studio-model-btn px-2.5 py-1 rounded bg-solar-base02 text-solar-base1 hover:text-solar-cyan text-[11px]'
  className = 'text-solar-violet animate-pulse font-bold' className = 'text-solar-green'
  className = 'fa-solid fa-volume-high text-solar-cyan' className = 'fa-solid fa-volume-xmark text-solar-base0'
  className = 'fa-solid fa-sun text-solar-yellow' className = 'fa-solid fa-moon text-solar-blue'
  badgeStyle = 'text-solar-cyan' badgeStyle = 'text-solar-yellow' badgeStyle = 'text-solar-blue'
  badgeStyle = 'text-solar-magenta' badgeStyle = 'text-solar-green font-semibold'
`;
module.exports = dynamicClassStrings;
