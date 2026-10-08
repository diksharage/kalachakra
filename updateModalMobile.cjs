const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

code = code.replace(/className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black\/60 backdrop-blur-sm animate-fade-in"/g, 
  `className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"`);

// Adjust the modal inner padding for small screens so it's not too cramped
code = code.replace(/className=\{"glass-panel p-8 rounded-2xl max-w-lg w-full max-h-full overflow-y-auto border shadow-2xl text-center " \+ theme\.border\}/g, 
  `className={"glass-panel p-5 md:p-8 rounded-2xl max-w-lg w-full max-h-full overflow-y-auto border shadow-2xl text-center " + theme.border}`);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated Modals for mobile viewport bounds!");
