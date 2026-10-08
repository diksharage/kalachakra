const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(/className=\{"flex flex-col items-center justify-center w-36 h-36 rounded-2xl/g, 
  `className={"flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-2xl`);

code = code.replace(/<span className=\{"text-5xl mb-2 transition-transform " \+ \(!isDiscovered \? 'opacity-50 grayscale' : ''\)\}>/g, 
  `<span className={"text-4xl md:text-5xl mb-1 md:mb-2 transition-transform " + (!isDiscovered ? 'opacity-50 grayscale' : '')}>`);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Map Nodes for mobile scaling!");
