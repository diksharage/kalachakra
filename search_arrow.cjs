const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
for (const f of files) {
  const content = fs.readFileSync('dist/assets/' + f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('ArrowRight')) {
      let idx = -1;
      while ((idx = line.indexOf('ArrowRight', idx + 1)) !== -1) {
         const prevChar = line.substring(idx - 1, idx);
         const nextChar = line.substring(idx + 10, idx + 11);
         if (!['\'', '"', '`', '.', '_'].includes(prevChar) && !['\'', '"', '`', '.', '_', ':'].includes(nextChar)) {
           console.log(f + ':' + i + '  ' + line.substring(Math.max(0, idx - 40), Math.min(line.length, idx + 40)));
         }
      }
    }
  });
}
