const fs = require('fs');
let code = fs.readFileSync('src/pages/ExplorePage.jsx', 'utf8');

code = code.replace(
  "navigate('/library');",
  "navigate('/library?item=' + loc.libraryId);"
);

code = code.replace(
  "onClick={() => navigate('/library')}",
  "onClick={() => navigate('/library?item=' + selectedLoc.libraryId)}"
);

fs.writeFileSync('src/pages/ExplorePage.jsx', code);
console.log("Updated navigate targets in ExplorePage!");
