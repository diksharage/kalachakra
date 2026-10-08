const fs = require('fs');
let codeProfile = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

// Fix the template literal className issue
const badClass = /className=\{`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all \$\{audioSettings\.muted \?  focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-\[#171B3A\]'bg-red-900\/20 text-red-400 border border-red-500\/30' : 'bg-surface border border-content\/20 text-content'\}`\}/;

const goodClass = `className={\`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#171B3A] \${audioSettings.muted ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'bg-surface border border-content/20 text-content'}\`}`;

codeProfile = codeProfile.replace(badClass, goodClass);
fs.writeFileSync('src/pages/ProfilePage.jsx', codeProfile);

let codeDash = fs.readFileSync('src/pages/DashboardPage.jsx', 'utf8');
codeDash = codeDash.replace(/onClick=\{\(\) => playSound\('ui'\); navigate\(([^)]+)\)\}/g, "onClick={() => { playSound('ui'); navigate($1); }}");

fs.writeFileSync('src/pages/DashboardPage.jsx', codeDash);

let codeProfileAgain = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');
codeProfileAgain = codeProfileAgain.replace(/onClick=\{\(\) => playSound\('ui'\); navigate\(([^)]+)\)\}/g, "onClick={() => { playSound('ui'); navigate($1); }}");
fs.writeFileSync('src/pages/ProfilePage.jsx', codeProfileAgain);

console.log("Fixed JSX syntax errors!");
