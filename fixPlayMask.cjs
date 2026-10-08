const fs = require('fs');
let code = fs.readFileSync('src/pages/LevelPlayPage.jsx', 'utf8');

code = code.replace(/mask-radial-faded/g, "");
code = code.replace(/<div className=\{`absolute inset-\[-2rem\] md:inset-\[-4rem\] opacity-30 dark:opacity-20 bg-gradient-to-br \$\{theme\.gradient\} pointer-events-none -z-10 mix-blend-overlay dark:mix-blend-color-burn `\} \/>/, 
`<div className={\`absolute inset-[-2rem] md:inset-[-4rem] opacity-30 dark:opacity-10 bg-gradient-to-br \${theme.gradient} pointer-events-none -z-10 mix-blend-overlay dark:mix-blend-color-burn\`} style={{ maskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)' }} />`);

fs.writeFileSync('src/pages/LevelPlayPage.jsx', code);
console.log("Fixed LevelPlayPage mask style!");
