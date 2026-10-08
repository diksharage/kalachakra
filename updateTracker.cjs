const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// Update 5-stage tracker container
const oldTracker = /<div className="flex flex-wrap md:flex-nowrap items-stretch justify-between gap-2 text-xs font-bold uppercase tracking-wider">/;
const newTracker = `<div className="flex overflow-x-auto snap-x md:overflow-visible items-stretch md:justify-between gap-2 text-xs font-bold uppercase tracking-wider pb-2 hide-scrollbar">`;

code = code.replace(oldTracker, newTracker);

// Update buttons inside tracker to snap and not shrink
code = code.replace(/className=\{"flex-1 flex flex-col md:flex-row items-center justify-center gap-2 p-2 rounded-lg border transition-all min-w-\[4rem\] md:min-w-\[8rem\] "/g, 
`className={"flex-1 shrink-0 snap-center flex flex-col md:flex-row items-center justify-center gap-2 p-2 rounded-lg border transition-all min-w-[4.5rem] md:min-w-[8rem] "`);

// Hide the arrow on very small screens or make it shrink-0
code = code.replace(/<ArrowRight className="hidden md:block w-4 h-4 my-auto opacity-30 text-content shrink-0" \/>/g, 
`<ArrowRight className="hidden lg:block w-4 h-4 my-auto opacity-30 text-content shrink-0" />`);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Stage Tracker responsiveness!");
