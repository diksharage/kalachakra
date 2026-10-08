const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// We can run a regex to inject focus classes into buttons that don't have them
// Or just globally add it to className={"..."} strings inside <button
// It's safer to just do a simple replacement.
const btnRegex = /<button([^>]+className=(["'{]))([^>"'}]+)(["'}])/g;
code = code.replace(btnRegex, (match, p1, p2, p3, p4) => {
    if (!p3.includes('focus:outline-none')) {
        return `<button${p1}${p3} focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface${p4}`;
    }
    return match;
});

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Added focus rings to buttons in LevelEngine!");
