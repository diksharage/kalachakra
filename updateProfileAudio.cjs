const fs = require('fs');
let code = fs.readFileSync('src/pages/ProfilePage.jsx', 'utf8');

code = code.replace(/onClick=\{\(\) => navigate\([^}]+\)\}/, (match) => {
    return match.replace("navigate(", "playSound('ui'); navigate(");
});
code = code.replace(/onClick=\{\(\) => navigate\(`\/journey\/level\/\$\{currentLevel\}\/play`\)\}/, "onClick={() => { playSound('ui'); navigate(`/journey/level/${currentLevel}/play`); }}");

fs.writeFileSync('src/pages/ProfilePage.jsx', code);
console.log("Added audio to ProfilePage!");
