const fs = require('fs');
let code = fs.readFileSync('src/pages/LibraryPage.jsx', 'utf8');

code = code.replace(/onClose=\{[^}]+\}/g, "onClose={handleCloseModal}");

fs.writeFileSync('src/pages/LibraryPage.jsx', code);
console.log("Fixed JSX onClose handler!");
