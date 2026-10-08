const fs = require('fs');
const files = fs.readdirSync('src/data').filter(f => f.includes('Challenges.js'));
files.forEach(f => {
  const content = fs.readFileSync('src/data/' + f, 'utf8');
  const count = (content.match(/id:\s*['"].*?['"]/g) || []).length;
  console.log(f + ': ' + count);
});
