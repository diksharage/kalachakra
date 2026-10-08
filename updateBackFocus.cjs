const fs = require('fs');
let code = fs.readFileSync('src/components/common/BackButton.jsx', 'utf8');

code = code.replace(/className={`([^`]+)`}/, (match, p1) => {
    if (!p1.includes('focus:outline-none')) {
        return `className={\`${p1} focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface\`}`;
    }
    return match;
});

fs.writeFileSync('src/components/common/BackButton.jsx', code);
console.log("Added focus rings to BackButton");
