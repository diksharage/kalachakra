const fs = require('fs');
const path = require('path');

const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('src');
let found = false;
const regex = /t\(['"`][a-zA-Z0-9_.]+['"`]\)\s*\|\|\s*['"`][^'"`]+['"`]/;

files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  if (regex.test(code)) {
    console.log("Found in: " + file);
    found = true;
  }
});

if (!found) console.log("No bad fallbacks found.");
