const fs = require('fs');
let code = fs.readFileSync('src/services/searchService.js', 'utf8');

// Level Route Fix
code = code.replace(/route: '\/journey',/g, "route: `/journey/level/${i}`,");

// Map Route Fix
code = code.replace(/route: '\/explore',/g, "route: `/explore?loc=${loc.id}`,");

// Library Route Fix
code = code.replace(/route: '\/library',/g, "route: `/library?item=${item.id}`,");

fs.writeFileSync('src/services/searchService.js', code);
console.log("Updated search routes!");
