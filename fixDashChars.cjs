const fs = require('fs');
let code = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');

// Use regex to catch all corrupted unicode like ?" or +' or AA
code = code.replace(/Level \{currentLevel\} \?\?" \{levelThemeData.name\}/g, "Level {currentLevel} - {levelThemeData.name}");
code = code.replace(/Level \{currentLevel\} [^{]*\{levelThemeData.name\}/g, "Level {currentLevel} - {levelThemeData.name}");

code = code.replace(/Continue Journey[^']*'/g, "Continue Journey →'");
code = code.replace(/<div className="text-xl mb-3">[^<]*<\/div>/g, '<div className="text-xl mb-3">⚖️</div>');

fs.writeFileSync('src/pages/DashboardPage.jsx', code);
console.log("Fixed garbled text in DashboardPage!");
