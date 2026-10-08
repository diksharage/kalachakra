const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
        const text = fs.readFileSync(file, 'utf8');
        let idx = -1;
        while ((idx = text.indexOf('ArrowRight', idx + 1)) !== -1) {
          const before = text.substring(idx - 1, idx);
          const after = text.substring(idx + 10, idx + 11);
          if (before !== '\'' && before !== '\"' && before !== '\`' && after !== '\'' && after !== '\"' && after !== '\`') {
             const lineStart = text.lastIndexOf('\n', idx);
             let lineEnd = text.indexOf('\n', idx);
             if (lineEnd === -1) lineEnd = text.length;
             const line = text.substring(lineStart, lineEnd).trim();
             if (!line.startsWith('import')) {
                 results.push(file + ':: ' + line);
             }
          }
        }
      }
    }
  });
  return results;
}
console.log(walk('src'));
