const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(/<div className="w-full md:w-80 flex flex-col gap-4 shrink-0 overflow-y-auto">/g, 
  `<div className="w-full md:w-80 flex flex-col gap-4 shrink-0 max-h-[35vh] md:max-h-none overflow-y-auto hide-scrollbar">`);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Sidebar height constraint for mobile!");
