const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Root Container Mobile height fix
code = code.replace(/<div className="flex flex-col h-\[calc\(100vh-6rem\)\] gap-4 pb-6">/, 
  `<div className="flex flex-col min-h-[calc(100vh-6rem)] md:h-[calc(100vh-6rem)] gap-4 pb-6">`);

// 2. Main layout mobile overflow fix
code = code.replace(/<div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">/, 
  `<div className="flex flex-col md:flex-row gap-6 flex-1 overflow-y-auto md:overflow-hidden">`);

// 3. Make Map container have a minimum height on mobile so it doesn't get crushed
code = code.replace(/<div className=\{"flex-1 relative glass-panel rounded-2xl overflow-hidden border " \+ theme\.border\}>/, 
  `<div className={"flex-1 relative glass-panel rounded-2xl overflow-hidden border min-h-[350px] " + theme.border}>`);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated root layout height constraints for mobile!");
