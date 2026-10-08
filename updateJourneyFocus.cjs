const fs = require('fs');
let code = fs.readFileSync('src/pages/JourneyPage.jsx', 'utf8');

code = code.replace(/<button([^>]+className=(["'{]))([^>"'}]+)(["'}])/g, (match, p1, p2, p3, p4) => {
    if (!p3.includes('focus:outline-none')) {
        return `<button${p1}${p3} focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface${p4}`;
    }
    return match;
});

// Also add aria-label to Journey Map nodes if they don't have them
// <button key={level.id} onClick={() => handleNodeClick(level)} ... >
const mapNodeRegex = /<button\s*key=\{level\.id\}\s*onClick=\{\(\) => handleNodeClick\(level\)\}/g;
code = code.replace(mapNodeRegex, `<button key={level.id} onClick={() => handleNodeClick(level)} aria-label={\`Level \${level.id}: \${level.title}. \${isCompleted ? 'Completed' : isCurrent ? 'Current' : isUnlocked ? 'Unlocked' : 'Locked'}\`}`);

fs.writeFileSync('src/pages/JourneyPage.jsx', code);
console.log("Added focus rings and ARIA to JourneyPage buttons");
