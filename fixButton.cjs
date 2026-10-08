const fs = require('fs');
let code = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

code = code.replace(/Jump In <ArrowRight size=\{16\} \/>\/button>/g, 'Jump In <ArrowRight size={16} /></button>');

fs.writeFileSync('src/pages/ProfilePage.jsx', code);
console.log("Fixed button syntax!");
