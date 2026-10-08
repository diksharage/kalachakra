const fs = require('fs');
let code = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

code = code.replace(/Jump In <ArrowRight size=\{16\} \/> </g, 'Jump In <ArrowRight size={16} />');

fs.writeFileSync('src/pages/ProfilePage.jsx', code);
console.log("Fixed Jump In button syntax!");
