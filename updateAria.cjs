const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldButton = /<button \s*onClick=\{\(\) => isLocked && showLock\(`Complete \$\{s\.reqMsg\} to unlock \$\{s\.label\}\.`\)\}\s*className=/;

const newButton = `<button 
                       onClick={() => isLocked && showLock(\`Complete \${s.reqMsg} to unlock \${s.label}.\`)}
                       aria-current={isActive ? 'step' : undefined}
                       aria-label={\`Stage \${s.id}: \${s.label}. \${isComplete ? 'Completed' : isLocked ? 'Locked' : 'Current active stage'}. Progress: \${s.current} of \${s.max}\`}
                       className=`;

code = code.replace(oldButton, newButton);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Added aria-labels to stage progress bar!");
